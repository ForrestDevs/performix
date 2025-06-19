import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { CHAPTERS_SLUG } from '../../constants'

// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
// Only revalidate existing docs that are published
// Don't scope to `operation` in order to purge static demo pages
export const revalidateChapter: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req: { payload },
}) => {
  if (operation === 'update') {
    console.log('revalidating path', doc.fullSlug)
    revalidateTag(`${CHAPTERS_SLUG}_${doc.slug}`)
    revalidatePath(`/course/${doc.fullSlug}`)
  }

  return doc
}
