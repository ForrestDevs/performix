'use server'

import { TESTIMONIALS_SLUG } from '@/payload/collections/constants'
import { getPayload } from '../utilities/getPayload'
import { cache } from '@/lib/utilities/cache'
import { CACHE_TAGS } from '../cache/contants'

export async function getFeaturedTestimonials() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()

      const testimonials = await payload.find({
        collection: TESTIMONIALS_SLUG,
        where: {
          and: [
            {
              type: { equals: 'standard' },
            },
            {
              featured: {
                equals: true,
              },
            },
          ],
        },
        sort: 'createdAt',
        depth: 2,
      })

      return testimonials.docs
    },
    {
      tags: [CACHE_TAGS.GET_FEATURED_TESTIMONIALS],
    },
    [],
  )

  return cacheFn()
}

export async function getStandardReviews() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()
      const reviews = await payload.find({
        collection: TESTIMONIALS_SLUG,
        where: {
          type: { equals: 'standard' },
        },
        sort: 'createdAt',
        depth: 2,
      })
      return reviews.docs
    },
    {
      tags: [CACHE_TAGS.GET_STANDARD_REVIEWS],
    },
  )

  return cacheFn()
}

export async function getVideoReviews() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()

      const reviews = await payload.find({
        collection: TESTIMONIALS_SLUG,
        where: {
          type: { equals: 'video' },
        },
        sort: 'createdAt',
        depth: 2,
      })
      return reviews.docs
    },
    {
      tags: [CACHE_TAGS.GET_VIDEO_REVIEWS],
    },
  )

  return cacheFn()
}

export async function getScreenshotReviews() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()
      const reviews = await payload.find({
        collection: TESTIMONIALS_SLUG,
        where: {
          type: { equals: 'screenshot' },
        },
        sort: 'createdAt',
        depth: 2,
      })
      return reviews.docs
    },
    {
      tags: [CACHE_TAGS.GET_SCREENSHOT_REVIEWS],
    },
  )

  return cacheFn()
}

export async function getParentReviews() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()
      const reviews = await payload.find({
        collection: TESTIMONIALS_SLUG,
        where: {
          type: { equals: 'parent' },
        },
        sort: 'createdAt',
        depth: 2,
      })
      return reviews.docs
    },
    {
      tags: [CACHE_TAGS.GET_PARENT_REVIEWS],
    },
  )

  return cacheFn()
}
