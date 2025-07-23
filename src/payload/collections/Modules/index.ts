import type { CollectionConfig } from 'payload'
import { LESSONS_SLUG, MEDIA_SLUG, MODULES_SLUG, VIDEOS_SLUG, VOLUMES_SLUG } from '../constants'
import { slugField } from '@/payload/fields/slug'
import { admin, anyone, isAdminOrProducer } from '@/payload/access'
import { revalidateLabModule } from './hooks/revalidate'

export const Modules: CollectionConfig = {
  slug: MODULES_SLUG,
  labels: {
    singular: 'Module',
    plural: 'Modules',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Lab',
    defaultColumns: ['title', 'subtitle', 'topics'],
    preview: (data) => {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/lab/module/${data.slug}`
    },
    livePreview: {
      url: (data) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/lab/module/${data.data.slug}`
      },
    },
  },
  access: {
    read: anyone,
    create: admin,
    update: admin,
    delete: admin,
  },
  hooks: {
    afterChange: [revalidateLabModule],
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
                description: 'The title of the module (e.g., "Speed Development Mastery")',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              admin: {
                description:
                  'The subtitle of the module (e.g., "Master the art of speed development")',
              },
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: MEDIA_SLUG,
              label: 'Thumbnail',
            },
            {
              name: 'topics',
              type: 'array',
              fields: [
                {
                  name: 'topic',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'introVideo',
              type: 'relationship',
              relationTo: VIDEOS_SLUG,
              label: 'Intro Video',
              hasMany: false,
            },
            {
              name: 'richText',
              type: 'richText',
              label: 'Overview',
            },
          ],
        },
        {
          label: 'Children',
          fields: [
            {
              name: 'volumes',
              type: 'join',
              on: 'module',
              label: 'Volumes',
              collection: VOLUMES_SLUG,
            },
            {
              name: 'lessons',
              type: 'join',
              on: 'module',
              label: 'Lessons',
              collection: LESSONS_SLUG,
            },
          ],
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'Order in which this module appears (0 = first)',
      },
    },
  ],
  timestamps: true,
}
