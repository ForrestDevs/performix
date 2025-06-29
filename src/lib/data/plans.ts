'use server'

import { ENROLLMENTS_SLUG, PLANS_SLUG } from '@/payload/collections/constants'
import { cache } from '../utilities/cache'
import { getPayload } from '../utilities/getPayload'
import { CACHE_TAGS } from '../cache/contants'

export async function getPlans() {
  const payload = await getPayload()

  const cacheFn = cache(
    async () => {
      const plans = await payload.find({
        collection: PLANS_SLUG,
        sort: 'price',
        limit: 100,
      })

      return plans.docs
    },
    {
      tags: [CACHE_TAGS.GET_PLANS],
    },
  )

  return cacheFn()
}

export async function isEnrolled(userId: number, planId: number) {
  const payload = await getPayload()

  const tag = CACHE_TAGS.IS_ENROLLED_PLAN + planId.toString() + userId.toString()

  const cacheFn = cache(
    async (userId: number, planId: number) => {
      const { docs } = await payload.find({
        collection: ENROLLMENTS_SLUG,
        where: { and: [{ user: { equals: userId } }, { enrolledPlan: { equals: planId } }] },
      })

      return docs.length > 0
    },
    {
      tags: [tag],
    },
  )

  return cacheFn(userId, planId)
}

export async function isEnrolledInAnyPlan(userId: number) {
  const payload = await getPayload()

  const cacheFn = cache(
    async () => {
      const { docs } = await payload.find({
        collection: ENROLLMENTS_SLUG,
        where: { and: [{ user: { equals: userId } }, { type: { equals: 'plan' } }] },
      })

      return docs.length > 0
    },
    {
      tags: [CACHE_TAGS.IS_ENROLLED_IN_ANY_PLAN + userId.toString()],
    },
    [userId.toString()],
  )

  return cacheFn()
}

export async function getEnrolledPlan(userId: number) {
  const payload = await getPayload()

  const tag = CACHE_TAGS.GET_ENROLLED_PLAN + userId.toString()
  const cacheFn = cache(
    async (userId: number) => {
      const { docs } = await payload.find({
        collection: ENROLLMENTS_SLUG,
        where: { and: [{ user: { equals: userId } }, { type: { equals: 'plan' } }] },
      })

      if (docs[0]?.enrolledPlan) {
        const planId =
          typeof docs[0].enrolledPlan === 'object' ? docs[0].enrolledPlan.id : docs[0].enrolledPlan
        const plan = await payload.find({
          collection: PLANS_SLUG,
          where: { id: { equals: planId } },
        })

        return plan.docs[0]
      }

      return undefined
    },
    {
      tags: [tag],
    },
  )

  return cacheFn(userId)
}
