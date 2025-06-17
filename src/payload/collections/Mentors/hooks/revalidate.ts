import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Mentor } from '@/payload-types'

export const revalidateMentors: CollectionAfterChangeHook<Mentor> = ({ doc }) => {
  revalidatePath('/mentors')
  if (doc.featured) {
    revalidateTag(`get-featured-mentors`)
  }
  revalidateTag(`get-mentor-${doc.slug}`)
  revalidateTag(`get-mentors`)

  return doc
}
