import { BLUEPRINTS_SLUG, ENROLLMENTS_SLUG } from '@/payload/collections/constants'
import { getPayload } from '../utilities/getPayload'
import { CACHE_TAGS } from '../cache/contants'
import { cache } from '../utilities/cache'

export async function getEnrolledBlueprints(userId: number) {
  const payload = await getPayload()

  const tag = CACHE_TAGS.GET_ENROLLED_BLUEPRINTS + userId.toString()

  const cacheFn = cache(
    async (userId: number) => {
      const { docs } = await payload.find({
        collection: ENROLLMENTS_SLUG,
        where: { and: [{ user: { equals: userId } }, { type: { equals: 'blueprint' } }] },
      })

      if (docs.length === 0) return null

      const blueprintIds = docs
        .map((doc) => {
          const blueprintId =
            typeof doc.enrolledBlueprint === 'object'
              ? doc.enrolledBlueprint?.id
              : doc.enrolledBlueprint
          return blueprintId
        })
        .filter((id) => id !== undefined)

      const blueprints = await payload.find({
        collection: BLUEPRINTS_SLUG,
        where: { id: { in: blueprintIds } },
      })

      return blueprints.docs
    },
    {
      tags: [tag],
    },
  )

  return cacheFn(userId)
}
