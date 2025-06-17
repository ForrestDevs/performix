import { TESTIMONIALS_SLUG } from '@/payload/collections/constants'
import { getPayload } from '../utilities/getPayload'
import { cache } from '@/lib/utilities/cache'

export async function getFeaturedTestimonials() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()

      const testimonials = await payload.find({
        collection: TESTIMONIALS_SLUG,
        where: {
          featured: {
            equals: true,
          },
        },
        sort: 'createdAt',
        depth: 1,
      })

      return testimonials.docs
    },
    {
      tags: ['get-testimonials'],
    },
    [],
  )

  return cacheFn()
}
