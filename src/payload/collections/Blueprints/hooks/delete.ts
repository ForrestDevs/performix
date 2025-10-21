import type { CollectionAfterDeleteHook, CollectionConfig } from 'payload'

import { APIError } from 'payload'
import { stripeClient } from '@/lib/stripe'
import type { Blueprint } from '@/payload-types'

export const deleteFromStripe: CollectionAfterDeleteHook<Blueprint> = async (args) => {
  const { collection, doc, req } = args

  const { payload } = req
  const { slug: collectionSlug } = collection || {}

  payload.logger.info(
    `Document with ID: '${doc?.id}' in collection: '${collectionSlug}' has been deleted, deleting from Stripe...`,
  )

  if (
    process.env.NODE_ENV !== 'test' &&
    doc.isPaid === true &&
    doc.stripeProductId &&
    doc.stripePriceId
  ) {
    payload.logger.info(`- Deleting Stripe document with ID: '${doc.stripeProductId}'...`)

    try {
      const found = await stripeClient.products.retrieve(doc.stripeProductId)

      if (found) {
        await stripeClient.products.update(doc.stripeProductId, {
          active: false,
        })

        await stripeClient.prices.update(doc.stripePriceId, {
          active: false,
        })

        payload.logger.info(
          `✅ Successfully deleted Stripe document with ID: '${doc.stripeProductId}'.`,
        )
      } else {
        payload.logger.info(
          `- Stripe document with ID: '${doc.stripeProductId}' not found, skipping...`,
        )
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : error
      throw new APIError(
        `Failed to delete Stripe document with ID: '${doc.stripeProductId}': ${msg}`,
      )
    }
  }
}
