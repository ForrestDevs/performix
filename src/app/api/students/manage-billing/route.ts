import { stripeClient } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { customerId } = await request.json()

  console.log('customerId', customerId)

  const config = await stripeClient.billingPortal.configurations.create({
    features: {
      invoice_history: {
        enabled: true,
      },
      customer_update: {
        enabled: true,
        allowed_updates: ['email', 'address', 'phone'],
      },
      payment_method_update: {
        enabled: true,
      },
      subscription_cancel: {
        enabled: true,
      },
    },
  })

  const session = await stripeClient.billingPortal.sessions.create({
    customer: customerId,
    return_url: 'http://localhost:3000/student',
  })

  console.log('config', session)

  return Response.json({ url: session.url })
}
