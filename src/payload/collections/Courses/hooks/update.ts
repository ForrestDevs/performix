import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { APIError } from 'payload'
import { stripeClient } from '@/lib/stripe'

export const syncExistingWithStripe: CollectionBeforeChangeHook = async (args) => {
  const { collection, data, operation, originalDoc, req, originalDoc: original } = args

  const { payload } = req

  const { slug: collectionSlug } = collection || {}

  console.log('update', data, original)

  if (process.env.NODE_ENV !== 'test' && !data.skipSync) {
    if (operation === 'update') {
      payload.logger.info(
        `A '${collectionSlug}' document has changed in Payload with ID: '${original?.id}', syncing with Stripe...`,
      )

      if (!data.stripeProductId) {
        payload.logger.error(`- There is no Stripe ID for this document, skipping.`)
      } else {
        payload.logger.info(`- Syncing to Stripe resource with ID: '${data.stripeProductId}'...`)

        try {
          const stripeResource = await stripeClient.products.update(data.stripeProductId, {
            name: data.title || 'N/A',
            description: data.description || '',
            active: true,
          })

          if (data.price !== originalDoc.price) {
            const newPrice = await stripeClient.prices.create({
              product: originalDoc.stripeProductId,
              currency: 'USD',
              unit_amount: (data.price || 0) * 100,
            })

            await stripeClient.products.update(originalDoc.stripeProductId, {
              default_price: newPrice.id,
            })

            await stripeClient.prices.update(originalDoc.stripePriceId, {
              active: false,
            })

            Object.assign(data, {
              stripePriceId: newPrice.id,
            })
          }

          payload.logger.info(
            `✅ Successfully synced Stripe resource with ID: '${stripeResource.id}'.`,
          )
        } catch (error: unknown) {
          const msg = error instanceof Error ? error.message : error
          throw new APIError(`Failed to sync document with ID: '${original?.id}' to Stripe: ${msg}`)
        }
      }
    }
  }

  // Set back to 'false' so that all changes continue to sync to Stripe, see note in './createNewInStripe.ts'
  data.skipSync = false

  return data
}
