import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Enrollment } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

export const revalidateEnrollments: CollectionAfterChangeHook<Enrollment> = ({ doc }) => {
  const userId = typeof doc.user === 'object' ? doc.user.id : doc.user
  if (doc.enrolledBlueprint) {
    const tag = CACHE_TAGS.GET_ENROLLED_BLUEPRINTS + userId.toString()
    revalidateTag(tag)
  }

  if (doc.enrolledPlan) {
    const userTag = CACHE_TAGS.IS_ENROLLED_IN_ANY_PLAN + userId.toString()
    revalidateTag(userTag)
    const planId = typeof doc.enrolledPlan === 'object' ? doc.enrolledPlan.id : doc.enrolledPlan
    const tag = CACHE_TAGS.IS_ENROLLED_PLAN + planId.toString() + userId.toString()
    revalidateTag(tag)
  }

  return doc
}
