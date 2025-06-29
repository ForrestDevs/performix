'use server'

import { getPayload } from '@/lib/utilities/getPayload'
import {
  BLUEPRINTS_SLUG,
  COURSES_SLUG,
  TRANSACTIONS_SLUG,
  ENROLLMENTS_SLUG,
  PLANS_SLUG,
} from '@/payload/collections/constants'
import { stripeClient } from '@/lib/stripe'

export async function handleSuccessfulPayment(sessionId: string) {
  try {
    const payload = await getPayload()

    // Retrieve the checkout session from Stripe
    const session = await stripeClient.checkout.sessions.retrieve(sessionId)

    if (session.status !== 'complete' || session.payment_status !== 'paid') {
      throw new Error('Payment not completed')
    }

    // Create enrollment for the user
    const { productId, productType, userId } = session.metadata as {
      productId: string
      productType: 'blueprints' | 'courses' | 'plans'
      userId: string
    }

    const transaction = await fetchTransaction(sessionId)

    if (!transaction) {
      throw new Error('Transaction not found')
    }

    if (transaction.status === 'completed') {
      return { success: true, session: session }
    } else if (transaction.status === 'pending') {
      await completeTransaction(transaction.id, (session.amount_total || 0) / 100)
      let type: string = ''
      let enrolled: any = {}

      switch (productType) {
        case 'blueprints':
          type = 'blueprint'
          enrolled = {
            enrolledBlueprint: parseInt(productId),
          }
          break
        case 'courses':
          type = 'course'
          enrolled = {
            enrolledCourse: parseInt(productId),
          }
          break
        case 'plans':
          type = 'plan'
          enrolled = {
            enrolledPlan: parseInt(productId),
          }
          break
      }

      await payload.create({
        collection: ENROLLMENTS_SLUG,
        data: {
          user: parseInt(userId),
          type: type as 'blueprint' | 'course' | 'plan',
          ...enrolled,
          status: 'active',
        },
      })
      return { success: true, session: session }
    }
  } catch (error) {
    console.error('Error handling successful payment:', error)
    return { success: false, error: 'Failed to process payment' }
  }
}

export async function getUserPurchases(userId: number) {
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: ENROLLMENTS_SLUG,
    where: {
      and: [{ user: { equals: userId } }, { status: { equals: 'active' } }],
    },
    depth: 2,
  })

  return docs
}

export async function fetchTransaction(sessionId: string) {
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: TRANSACTIONS_SLUG,
    where: { stripePaymentId: { equals: sessionId } },
    depth: 1,
  })

  return docs[0] || null
}

export async function completeTransaction(transactionId: number, total: number) {
  const payload = await getPayload()

  await payload.update({
    collection: TRANSACTIONS_SLUG,
    id: transactionId,
    data: { status: 'completed', total },
  })
}
