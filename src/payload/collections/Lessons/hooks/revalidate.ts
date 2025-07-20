import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Lesson } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

export const revalidateLabLesson: CollectionAfterChangeHook<Lesson> = ({ doc, operation }) => {
  revalidateTag(CACHE_TAGS.GET_LAB_LESSONS)
  revalidateTag(CACHE_TAGS.GET_LAB_LESSONS_BY_SLUG + doc.slug)
  revalidateTag(CACHE_TAGS.GET_LAB_STATS)

  return doc
}
