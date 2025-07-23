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
    preview: (data) => {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/lab/lesson/${data.slug}`
    },
    livePreview: {
      url: (data) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/lab/lesson/${data.data.slug}`
      },
    },
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
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'The module this lesson belongs to. Autopopulated when volume is set.',
      },
    },
    {
      name: 'volume',
      type: 'relationship',
      relationTo: VOLUMES_SLUG,
      admin: {
        position: 'sidebar',
        description: 'The volume this lesson belongs to. Autopopulated when module is set.',
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
  ],
  timestamps: true,
} as const

export default Lessons
