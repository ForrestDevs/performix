import Stripe from 'stripe'

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  // @ts-ignore
  apiVersion: '2025-05-28.basil',
})
