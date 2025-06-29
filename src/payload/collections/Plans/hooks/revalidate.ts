import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Plan } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

export const revalidatePlans: CollectionAfterChangeHook<Plan> = ({ doc }) => {
  revalidateTag(CACHE_TAGS.GET_PLANS)

  return doc
}
