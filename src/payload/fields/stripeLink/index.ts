import type { UIField } from 'payload'

type Overrides = {
  stripeLinkOverrides?: Partial<UIField>
}

type StripeLink = (
  fieldToUse?: string,
  resourceType?: string,
  isTestKey?: boolean,
  overrides?: Overrides,
) => [UIField]

export const stripeLinkField: StripeLink = (
  fieldToUse = 'stripeProductId',
  resourceType = 'products',
  isTestKey = false,
  overrides = {},
) => {
  const { stripeLinkOverrides } = overrides

  const docUrlField: UIField = {
    name: 'stripeLink',
    type: 'ui',
    label: 'Stripe Link',
    ...(stripeLinkOverrides || {}),
    admin: {
      components: {
        Field: '@/payload/fields/stripeLink/stripe-link#LinkToDoc',
      },
      custom: {
        isTestKey: isTestKey,
        nameOfIDField: fieldToUse,
        stripeResourceType: resourceType,
      },
      position: 'sidebar',
    },
  }

  return [docUrlField]
}
