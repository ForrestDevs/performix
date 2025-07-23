import type { CollectionConfig } from 'payload'
import { LAB_SECTIONS_SLUG, MODULES_SLUG, VOLUMES_SLUG, LESSONS_SLUG } from '../constants'
import { admin } from '@/payload/access'
import { revalidateLabSection } from './hooks/revalidate'

const LabSections: CollectionConfig = {
  slug: LAB_SECTIONS_SLUG,
  admin: {
    useAsTitle: 'title',
    group: 'Lab',
    defaultColumns: ['title', 'order', 'contentType'],
    description:
      'Organize lab content into flexible sections that can contain modules, volumes, or lessons directly.',
    preview: (data) => {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/lab`
    },
    livePreview: {
      url: (data) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/lab`
      },
    },
  },
  access: {
    read: admin,
    create: admin,
    update: admin,
    delete: admin,
  },
  hooks: {
    afterChange: [revalidateLabSection],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description:
          'The title of this lab section (e.g., "Getting Started", "Advanced Techniques")',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Optional subtitle or description for this section',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'Order in which this section appears on the lab page (0 = first)',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Modules', value: 'modules' },
        { label: 'Volumes', value: 'volumes' },
        { label: 'Lessons', value: 'lessons' },
        { label: 'Mixed Content', value: 'mixed' },
      ],
      admin: {
        description: 'The type of content this section will display',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'modules',
              type: 'relationship',
              relationTo: MODULES_SLUG,
              hasMany: true,
              admin: {
                condition: (data) => data.contentType === 'modules' || data.contentType === 'mixed',
                description: 'Select modules to include in this section',
              },
            },
            {
              name: 'volumes',
              type: 'relationship',
              relationTo: VOLUMES_SLUG,
              hasMany: true,
              admin: {
                condition: (data) => data.contentType === 'volumes' || data.contentType === 'mixed',
                description: 'Select volumes to include in this section',
              },
            },
            {
              name: 'lessons',
              type: 'relationship',
              relationTo: LESSONS_SLUG,
              hasMany: true,
              admin: {
                condition: (data) => data.contentType === 'lessons' || data.contentType === 'mixed',
                description: 'Select lessons to include in this section',
              },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
} as const

export default LabSections
