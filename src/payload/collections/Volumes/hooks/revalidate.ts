import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Volume } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

export const revalidateLabVolume: CollectionAfterChangeHook<Volume> = ({ doc }) => {
  revalidateTag(CACHE_TAGS.GET_LAB_VOLUMES)
  revalidateTag(CACHE_TAGS.GET_LAB_VOLUMES_BY_SLUG + doc.slug)
  revalidateTag(CACHE_TAGS.GET_LAB_STATS)

  return doc
}
