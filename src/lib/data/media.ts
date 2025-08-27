'use server'

import { getPayload } from '@/lib/utilities/getPayload'
import { cache } from '@/lib/utilities/cache'
import { CACHE_TAGS } from '../cache/contants'
import { MEDIA_SLUG } from '@/payload/collections/constants'

export async function getMediaById(mediaId?: number | null) {
  if (!mediaId) return undefined

  const mediaCache = cache(
    async (mediaId: number) => {
      const payload = await getPayload()

      const media = await payload.find({
        collection: MEDIA_SLUG,
        where: { id: { equals: mediaId } },
        limit: 1,
      })

      return media.docs[0]
    },
    {
      tags: (mediaId: number) => [CACHE_TAGS.GET_MEDIA_BY_ID + mediaId],
    },
  )

  return mediaCache(mediaId)
}
