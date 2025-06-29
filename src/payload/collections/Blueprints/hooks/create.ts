import type { CollectionBeforeValidateHook } from 'payload'
import { APIError } from 'payload'
import { stripeClient } from '@/lib/stripe'

export const createNewInStripe: CollectionBeforeValidateHook = async (args) => {
  const { collection, data, operation, req, originalDoc } = args

  const payload = req?.payload

  const dataRef = data || {}

  if (process.env.NODE_ENV === 'test') {
    dataRef.stripeID = 'test'
    return dataRef
  }

  if (payload) {
    if (data?.skipSync || data?.isPaid === false) {
      payload.logger.info(`Bypassing collection-level hooks.`)
    } else {
      // initialize as 'false' so that all Payload admin events sync to Stripe
      // then conditionally set to 'true' to for events that originate from webhooks
      // this will prevent webhook events from triggering an unnecessary sync / infinite loop
      dataRef.skipSync = false

      const { slug: collectionSlug } = collection || {}

      if (operation === 'update') {
        payload.logger.info(
          `A '${collectionSlug}' document has changed in Payload with ID: '${originalDoc?.id}', syncing with Stripe...`,
        )

        // NOTE: the Stripe document will be created in the "afterChange" hook, so create a new stripe document here if no stripeID exists
        if (!dataRef.stripeProductId) {
          try {
            const stripeResource = await stripeClient.products.create({
              name: dataRef?.title || 'N/A',
              description: dataRef?.description || '',
              active: true,
              default_price_data: {
                currency: 'USD',
                unit_amount: (dataRef?.price || 0) * 100,
              },
            })

            payload.logger.info(
              `✅ Successfully created new 'blueprints' resource in Stripe with ID: '${stripeResource.id}'.`,
            )

            dataRef.stripeProductId = stripeResource.id
            dataRef.stripePriceId =
              typeof stripeResource.default_price === 'string'
                ? stripeResource.default_price
                : stripeResource.default_price?.id

            // NOTE: this is to prevent sync in the "afterChange" hook
            dataRef.skipSync = true
          } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : error
            payload.logger.error(`- Error creating Stripe document: ${msg}`)
          }
        }
      }

      if (operation === 'create') {
        payload.logger.info(
          `A new '${collectionSlug}' document was created in Payload with ID: '${originalDoc?.id}', syncing with Stripe...`,
        )

        try {
          payload.logger.info(`- Creating new 'product' resource in Stripe...`)

          const stripeResource = await stripeClient.products.create({
            name: dataRef?.title || 'N/A',
            description: dataRef?.description || '',
            active: true,
            default_price_data: {
              currency: 'USD',
              unit_amount: (dataRef?.price || 0) * 100,
            },
          })

          payload.logger.info(
            `✅ Successfully created new 'products' resource in Stripe with ID: '${stripeResource.id}'.`,
          )

          dataRef.stripeProductId = stripeResource.id
          dataRef.stripePriceId =
            typeof stripeResource.default_price === 'string'
              ? stripeResource.default_price
              : stripeResource.default_price?.id

          // IMPORTANT: this is to prevent sync in the "afterChange" hook
          dataRef.skipSync = true
        } catch (error: unknown) {
          const msg = error instanceof Error ? error.message : error
          throw new APIError(`Failed to create new 'products' resource in Stripe: ${msg}`)
        }
      }
    }
  }

  return dataRef
}
