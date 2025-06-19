import { CollectionConfig } from 'payload'
import { TESTIMONIALS_SLUG } from '../constants'
import { revalidateTestimonials } from './hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: TESTIMONIALS_SLUG,
  admin: {
    useAsTitle: 'name',
    group: 'Website',
    defaultColumns: ['name', 'position', 'team', 'featured'],
  },
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  hooks: {
    afterChange: [revalidateTestimonials],
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
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
} as const

export default Testimonials
