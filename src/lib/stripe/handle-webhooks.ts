import type { BasePayload, Config, PayloadRequest } from 'payload'
import Stripe from 'stripe'
import { handleSuccessfulPayment } from '../actions/checkout'

export async function handleWebhooks(
  event: Stripe.Event,
  stripe: Stripe,
  config: Config,
  payload: BasePayload,
  req: PayloadRequest,
) {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    await handleSuccessfulPayment(session.id)
  }
}
