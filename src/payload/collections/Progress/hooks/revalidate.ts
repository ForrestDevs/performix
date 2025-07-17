import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Lesson, Progress } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

export const revalidateLabProgress: CollectionAfterChangeHook<Progress> = ({ doc }) => {
  const userId = typeof doc.user === 'object' ? doc.user.id : doc.user
  revalidateTag(CACHE_TAGS.GET_LAB_PROGRESS + userId)

  return doc
}
