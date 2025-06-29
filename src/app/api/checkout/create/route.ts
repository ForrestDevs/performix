import { stripeClient } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import { CreateCheckoutSessionRequest } from '@/lib/types/checkout'
import { getPayload } from '@/lib/utilities/getPayload'
import {
  BLUEPRINTS_SLUG,
  COURSES_SLUG,
  PLANS_SLUG,
  TRANSACTIONS_SLUG,
} from '@/payload/collections/constants'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = (await req.json()) as CreateCheckoutSessionRequest

  // check for existing checkout session for this user
  const existingSession = await checkForExistingSession(
    data.productId,
    data.userId,
    data.productType,
  )

  if (existingSession) {
    return NextResponse.json({
      clientSecret: existingSession.stripeClientSecret,
    })
  }

  try {
    // Create the stripe checkout session first
    const session = await stripeClient.checkout.sessions.create({
      ui_mode: 'custom',
      customer: data.customerId,
      line_items: [
        {
          price: data.stripePriceId,
          quantity: 1,
        },
      ],
      mode: data.mode,
      return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
      customer_update: {
        address: 'auto',
      },
      metadata: {
        productId: data.productId,
        productType: data.productType,
        userId: data.userId,
      },
    })

    // Double-check for existing session after Stripe session creation
    // This handles the race condition case
    const doubleCheckSession = await checkForExistingSession(
      data.productId,
      data.userId,
      data.productType,
    )
    if (doubleCheckSession) {
      console.log(
        'Found existing session during double-check, using existing and cleaning up Stripe session',
      )
      // Clean up the Stripe session we just created since we found an existing one
      try {
        await stripeClient.checkout.sessions.expire(session.id)
      } catch (expireError) {
        console.warn('Failed to expire duplicate Stripe session:', expireError)
      }
      return NextResponse.json({
        clientSecret: doubleCheckSession.stripeClientSecret,
      })
    }

    const payload = await getPayload()

    let type: string = ''
    let product: any = {}

    switch (data.productType) {
      case 'blueprints':
        type = 'blueprint'
        product = {
          relationTo: BLUEPRINTS_SLUG,
          value: parseInt(data.productId),
        }
        break
      case 'courses':
        type = 'course'
        product = {
          relationTo: COURSES_SLUG,
          value: parseInt(data.productId),
        }
        break
      case 'plans':
        type = 'plan'
        product = {
          relationTo: PLANS_SLUG,
          value: parseInt(data.productId),
        }
        break
    }

    // Create the transaction
    await payload.create({
      collection: TRANSACTIONS_SLUG,
      data: {
        user: parseInt(data.userId),
        status: 'pending',
        total: (session.amount_total || 0) / 100,
        type: type as 'blueprint' | 'course' | 'plan',
        product,
        stripePaymentId: session.id,
        stripeCustomerId: data.customerId,
        currency: 'USD',
        expiresAt: session.expires_at,
        stripeClientSecret: session.client_secret,
      },
    })

    return NextResponse.json({
      clientSecret: session.client_secret,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)

    // If this is a database constraint error (duplicate), try to find the existing session
    if (
      (error instanceof Error && error.message.includes('duplicate')) ||
      error.message.includes('constraint')
    ) {
      console.log('Detected duplicate constraint error, attempting to find existing session')
      const existingAfterError = await checkForExistingSession(
        data.productId,
        data.userId,
        data.productType,
      )
      if (existingAfterError) {
        return NextResponse.json({
          clientSecret: existingAfterError.stripeClientSecret,
        })
      }
    }

    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

async function checkForExistingSession(productId: string, userId: string, productType: string) {
  const payload = await getPayload()

  try {
    const { docs } = await payload.find({
      collection: TRANSACTIONS_SLUG,
      where: {
        and: [
          {
            user: {
              equals: parseInt(userId),
            },
          },
          {
            'product.value': {
              equals: parseInt(productId),
            },
          },
          {
            status: {
              equals: 'pending',
            },
          },
          {
            expiresAt: {
              greater_than: Math.round(Date.now() / 1000),
            },
          },
        ],
      },
      limit: 1,
      sort: '-createdAt',
    })

    return docs[0] || null
  } catch (error) {
    console.error('Error checking for existing session:', error)
    return null
  }
}
