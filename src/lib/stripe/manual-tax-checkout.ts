import 'server-only'

import { stripeClient } from '@/lib/stripe'
import { getServerSideURL } from '@/lib/utilities/getURL'

const HST_13_TAX_RATE_ID = process.env.STRIPE_TAX_RATE_HST_13 || 'txr_1U492iBF6AGmnpvwbHG619jl'

export type ManualTaxCheckoutPlan = {
  name: string
  priceId: string | undefined
}

export const manualTaxCheckoutPlans = {
  'elite-mentor': {
    name: 'Elite Mentor Canada',
    priceId: process.env.STRIPE_PRICE_ELITE_MENTOR_CAD || 'price_1U6zotBF6AGmnpvwwARXsFVI',
  },
  'd1-bound': {
    name: 'D1 Bound Canada',
    priceId: process.env.STRIPE_PRICE_D1_BOUND_CAD || 'price_1U6zszBF6AGmnpvwHbfYz3F9',
  },
  'performer-package': {
    name: 'Performer Package Canada',
    priceId: process.env.STRIPE_PRICE_PERFORMER_PACKAGE_CAD || 'price_1U6zq6BF6AGmnpvwryqFnbRX',
  },
  'd1-accelerator': {
    name: 'D1 Accelerator Canada',
    priceId: process.env.STRIPE_PRICE_D1_ACCELERATOR_CAD || 'price_1U6ztSBF6AGmnpvwbXTwnDxn',
  },
} satisfies Record<string, ManualTaxCheckoutPlan>

export type ManualTaxCheckoutPlanSlug = keyof typeof manualTaxCheckoutPlans

export function getManualTaxCheckoutPlan(slug: string) {
  return manualTaxCheckoutPlans[slug as ManualTaxCheckoutPlanSlug] || null
}

export function getManualTaxCheckoutPlanSlugs() {
  return Object.keys(manualTaxCheckoutPlans)
}

export async function createManualTaxSubscriptionCheckout({
  planSlug,
  customerEmail,
}: {
  planSlug: string
  customerEmail?: string
}) {
  const plan = getManualTaxCheckoutPlan(planSlug)
  const taxRateId = HST_13_TAX_RATE_ID

  if (!plan) {
    throw new Error(`Unknown manual-tax checkout plan: ${planSlug}`)
  }

  if (!plan.priceId) {
    throw new Error(`Missing Stripe price ID for manual-tax checkout plan: ${planSlug}`)
  }

  if (!taxRateId) {
    throw new Error('Missing STRIPE_TAX_RATE_HST_13')
  }

  const baseUrl = getServerSideURL()

  const session = await stripeClient.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: plan.priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      default_tax_rates: [taxRateId],
      metadata: {
        checkoutFlow: 'manual_hst_canada',
        planSlug,
        planName: plan.name,
      },
    },
    automatic_tax: {
      enabled: false,
    },
    billing_address_collection: 'required',
    customer_email: customerEmail,
    metadata: {
      checkoutFlow: 'manual_hst_canada',
      planSlug,
      planName: plan.name,
    },
    success_url: `${baseUrl}/checkout/canada/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/checkout/canada/cancel?plan=${encodeURIComponent(planSlug)}`,
  })

  if (!session.url) {
    throw new Error('Stripe did not return a hosted checkout URL')
  }

  return {
    id: session.id,
    url: session.url,
  }
}
