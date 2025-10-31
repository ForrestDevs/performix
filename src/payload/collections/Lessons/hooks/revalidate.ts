import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Lesson } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

export const revalidateLabLesson: CollectionAfterChangeHook<Lesson> = ({ doc, operation }) => {
  revalidateTag(CACHE_TAGS.GET_LAB_LESSONS)
  revalidateTag(CACHE_TAGS.GET_LAB_LESSON_BY_SLUG + doc.slug)
  revalidateTag(CACHE_TAGS.GET_LAB_LESSON_BY_ID + doc.id)
  revalidateTag(CACHE_TAGS.GET_LAB_STATS)

  if (doc.volume) {
    const volumeId = typeof doc.volume === 'object' ? doc.volume.id : (doc.volume as number)
    revalidateTag(CACHE_TAGS.GET_LAB_LESSONS_BY_VOLUME + volumeId.toString())
  }

  return doc
}
