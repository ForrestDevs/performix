import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Module } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

export const revalidateLabModule: CollectionAfterChangeHook<Module> = ({ doc, operation }) => {
  revalidateTag(CACHE_TAGS.GET_LAB_MODULES)
  revalidateTag(CACHE_TAGS.GET_LAB_MODULES_BY_SLUG + doc.slug)
  revalidateTag(CACHE_TAGS.GET_LAB_MODULES_BY_ID + doc.id)
  revalidateTag(CACHE_TAGS.GET_LAB_STATS)

  return doc
}
