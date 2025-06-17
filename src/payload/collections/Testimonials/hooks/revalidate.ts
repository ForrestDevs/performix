import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Testimonial } from '@/payload-types'

export const revalidateTestimonials: CollectionAfterChangeHook<Testimonial> = ({ doc }) => {
  revalidatePath('/')
  revalidateTag(`get-testimonials`)

  return doc
}
