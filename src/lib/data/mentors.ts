import { cache } from '../utilities/cache'
import { getPayload } from '../utilities/getPayload'
import { MENTOR_SLUG } from '@/payload/collections/constants'

export async function getFeaturedMentors() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()
      const mentors = await payload.find({
        collection: MENTOR_SLUG,
        where: { featured: { equals: true } },
        limit: 4,
        depth: 3,
      })

      return mentors.docs
    },
    {
      tags: ['get-featured-mentors'],
    },
    [],
  )

  return cacheFn()
}

export async function getMentors() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()
      const mentors = await payload.find({
        collection: MENTOR_SLUG,
        depth: 3,
      })

      return mentors.docs
    },
    {
      tags: ['get-mentors'],
    },
    [],
  )

  return cacheFn()
}

export async function getMentor(slug: string) {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()
      const mentor = await payload.find({
        collection: MENTOR_SLUG,
        where: {
          slug: { equals: slug },
        },
      })
      return mentor.docs[0]
    },
    {
      tags: [`get-mentor-${slug}`],
    },
    [slug],
  )

  return cacheFn()
}
