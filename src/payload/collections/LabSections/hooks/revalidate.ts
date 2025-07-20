import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { LabSection, Volume } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

export const revalidateLabSection: CollectionAfterChangeHook<LabSection> = ({ doc }) => {
  revalidateTag(CACHE_TAGS.GET_LAB_SECTIONS)

  return doc
}
