import { admin, anyone, isAdminOrProducer } from '@/payload/access'
import { slugField } from '@/payload/fields/slug'
import { CollectionConfig } from 'payload'
import { MEDIA_SLUG, MODULES_SLUG, VOLUMES_SLUG, VIDEOS_SLUG } from '../constants'
import { revalidateLabLesson } from './hooks/revalidate'
import { beforeChangeLabLesson } from './hooks/beforeChange'

const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
    group: 'Lab',
    defaultColumns: ['title', 'subtitle'],
    description: 'Lessons are the individual units of content within volumes.',
  },
  access: {
    read: admin,
    create: admin,
    update: admin,
    delete: admin,
  },
  lockDocuments: false,
  hooks: {
    beforeValidate: [beforeChangeLabLesson],
    afterChange: [revalidateLabLesson],
  },
  fields: [
    ...slugField('title'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Meta',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'The title of the lesson',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              admin: {
                description: 'The subtitle of the lesson',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'richText',
              type: 'richText',
              admin: {
                description: 'Rich text content for the lesson',
              },
            },
            {
              name: 'downloads',
              type: 'upload',
              relationTo: MEDIA_SLUG,
              hasMany: true,
              admin: {
                description: 'Downloadable resources for the lesson',
              },
            },
            {
              name: 'videos',
              type: 'relationship',
              relationTo: VIDEOS_SLUG,
              hasMany: true,
              admin: {
                description: 'Videos associated with this lesson',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'The order of the lesson within the volume',
      },
    },
    {
      name: 'module',
      type: 'relationship',
      relationTo: MODULES_SLUG,
      required: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      validate: (value, { siblingData }) => {
        if (siblingData?.volume) {
          return true
        }

        return Boolean(value) || 'Module is required'
      },
    },
    {
      name: 'volume',
      type: 'relationship',
      relationTo: VOLUMES_SLUG,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isPreview',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Whether this lesson is available as a preview without subscription',
      },
    },
    {
      name: 'estimatedDuration',
      type: 'number',
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'Estimated duration in minutes',
      },
    },
  ],
  timestamps: true,
} as const

export default Lessons
