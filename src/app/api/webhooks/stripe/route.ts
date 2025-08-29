import { handleSuccessfulPayment } from '@/lib/actions/checkout'
import { NextRequest } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    if (body.event.type === 'checkout.session.completed') {
      const session = body.event.data.object as Stripe.Checkout.Session
      await handleSuccessfulPayment(session.id)
    }
  } catch (error) {
    console.error('Error handling Stripe webhook:', error)
    return new Response('Error', { status: 500 })
  }
  return new Response('OK')
}
