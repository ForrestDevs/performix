import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { TeamMember } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

export const revalidateTeamMembers: CollectionAfterChangeHook<TeamMember> = ({
  doc,
  previousDoc,
}) => {
  if (doc !== previousDoc) {
    revalidateTag(CACHE_TAGS.GET_TEAM_MEMBERS)
  }
}
