'use server'

import { TEAM_MEMBERS_SLUG } from '@/payload/collections/constants'
import { cache } from '../utilities/cache'
import { getPayload } from '../utilities/getPayload'
import { CACHE_TAGS } from '../cache/contants'

export async function getTeamMembers() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()
      const teamMembers = await payload.find({
        collection: TEAM_MEMBERS_SLUG,
        limit: 100,
      })

      return teamMembers.docs
    },
    {
      tags: [CACHE_TAGS.GET_TEAM_MEMBERS],
    },
    [],
  )

  return cacheFn()
}
