import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Testimonial } from '@/payload-types'
import { CACHE_TAGS } from '@/lib/cache/contants'

function revalidateTestimonialsByType(type: 'standard' | 'parent' | 'video' | 'screenshot') {
  switch (type) {
    case 'standard':
      revalidateTag(CACHE_TAGS.GET_STANDARD_REVIEWS)
      break
    case 'video':
      revalidateTag(CACHE_TAGS.GET_VIDEO_REVIEWS)
      break
    case 'screenshot':
      revalidateTag(CACHE_TAGS.GET_SCREENSHOT_REVIEWS)
      break
    case 'parent':
      revalidateTag(CACHE_TAGS.GET_PARENT_REVIEWS)
      break
  }
}

export const revalidateTestimonials: CollectionAfterChangeHook<Testimonial> = ({
  doc,
  previousDoc,
  operation,
}) => {
  const prevType = previousDoc?.type ?? undefined
  const newType = doc?.type
  const isFeatured = doc?.featured

  if (isFeatured) {
    revalidateTag(CACHE_TAGS.GET_FEATURED_TESTIMONIALS)
  }

  revalidateTestimonialsByType(newType)
  if (operation === 'update') {
    revalidateTestimonialsByType(prevType)
  }
}
