import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Lesson } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'
import { MODULES_SLUG } from '../../constants'

export const revalidateLabLesson: CollectionAfterChangeHook<Lesson> = async ({ doc, req }) => {
  revalidateTag(CACHE_TAGS.GET_LAB_LESSONS)
  revalidateTag(CACHE_TAGS.GET_LAB_LESSON_BY_SLUG + doc.slug)
  revalidateTag(CACHE_TAGS.GET_LAB_LESSON_BY_ID + doc.id)
  revalidateTag(CACHE_TAGS.GET_LAB_STATS)

  if (doc.volume) {
    const volumeId = typeof doc.volume === 'object' ? doc.volume.id : (doc.volume as number)
    revalidateTag(CACHE_TAGS.GET_LAB_LESSONS_BY_VOLUME + volumeId.toString())
  }

  if (doc.module) {
    const moduleId = typeof doc.module === 'object' ? doc.module.id : (doc.module as number)
    const moduleSlug =
      typeof doc.module === 'object' && doc.module.slug
        ? doc.module.slug
        : await req.payload
            .findByID({
              collection: MODULES_SLUG,
              id: moduleId,
              depth: 0,
            })
            .then((moduleDoc) => moduleDoc?.slug)
            .catch(() => undefined)

    revalidateTag(CACHE_TAGS.GET_LAB_MODULE_BY_ID + moduleId)

    if (moduleSlug) {
      revalidateTag(CACHE_TAGS.GET_LAB_MODULE_BY_SLUG + moduleSlug)
    }
  }

  return doc
}
