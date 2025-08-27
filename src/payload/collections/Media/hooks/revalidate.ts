import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Media } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

export const revalidateMedia: CollectionAfterChangeHook<Media> = ({ doc, operation }) => {
  revalidateTag(CACHE_TAGS.GET_MEDIA_BY_ID + doc.id)

  return doc
}
