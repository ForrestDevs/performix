import { CollectionConfig } from 'payload'
import { TESTIMONIALS_SLUG } from '../constants'

export const Testimonials: CollectionConfig = {
  slug: TESTIMONIALS_SLUG,
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'message',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'team',
      type: 'text',
    },
    {
      name: 'position',
      type: 'text',
    },
  ],
} as const

export default Testimonials
