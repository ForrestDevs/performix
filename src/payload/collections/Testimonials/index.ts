import { CollectionConfig } from 'payload'
import { MEDIA_SLUG, TESTIMONIALS_SLUG, VIDEOS_SLUG } from '../constants'
import { revalidateTestimonials } from './hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: TESTIMONIALS_SLUG,
  admin: {
    useAsTitle: 'name',
    group: 'Website',
    defaultColumns: ['type', 'featured', 'name'],
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
      name: 'type',
      label: 'Testimonial Type',
      type: 'select',
      options: [
        {
          label: 'Standard',
          value: 'standard',
        },
        {
          label: 'Parent',
          value: 'parent',
        },
        {
          label: 'Video',
          value: 'video',
        },
        {
          label: 'Screenshot',
          value: 'screenshot',
        },
      ],
      defaultValue: 'standard',
      required: true,
    },
    {
      name: 'video',
      type: 'relationship',
      relationTo: VIDEOS_SLUG,
      admin: {
        condition: (data) => data.type === 'video',
      },
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        condition: (data) => data.type === 'standard' || data.type === 'parent' || data.type === 'video',
      },
    },
    {
      name: 'progression',
      type: 'text',
      admin: {
        condition: (data) => data.type === 'video',
      },
    },
    {
      name: 'parentOf',
      type: 'text',
      admin: {
        condition: (data) => data.type === 'parent',
      },
    },
    {
      name: 'message',
      type: 'text',
      admin: {
        condition: (data) => data.type === 'standard' || data.type === 'parent' || data.type === 'video',
      },
    },
    {
      name: 'image',
      label:
        'Image of player/ person reviewing for standard testimonial or screenshot of review for screenshot testimonial',
      type: 'upload',
      relationTo: MEDIA_SLUG,
      admin: {
        condition: (data) => data.type === 'standard' || data.type === 'screenshot',
      },
    },
    {
      name: 'team',
      label: 'Team of player/ person reviewing',
      type: 'text',
      admin: {
        condition: (data) => data.type === 'standard',
      },
    },
    {
      name: 'position',
      label: 'Position of player/ person reviewing',
      type: 'text',
      admin: {
        condition: (data) => data.type === 'standard',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured testimonial on homepage',
      admin: {
        condition: (data) => data.type === 'standard',
      },
    },
  ],
} as const

export default Testimonials
