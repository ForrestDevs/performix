import { createSchema } from '@better-fetch/fetch'
import { z } from 'zod'

export interface CreateCheckoutSessionRequest {
  mode: 'payment' | 'subscription'
  stripeProductId: string
  stripePriceId: string
  customerId: string
  productId: string
  productType: string
  userId: string
}

export interface CreateCheckoutSessionResponse {
  clientSecret: string
}

export interface ProductData {
  id: string
  slug: string
  type: 'blueprints' | 'courses' | 'plans'
  title: string
  description?: string
  price: number
  thumbnail?: any
  stripeProductId: string
  stripePriceId: string
  mode: 'payment' | 'subscription'
}

export const createCheckoutSessionSchema = createSchema({
  '/api/checkout/create': {
    input: z.object({
      mode: z.enum(['payment', 'subscription']),
      stripeProductId: z.string(),
      stripePriceId: z.string(),
    }),
    output: z.object({
      clientSecret: z.string(),
    }),
  },
})
