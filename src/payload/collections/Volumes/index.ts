import type { CollectionConfig } from 'payload'
import { VOLUMES_SLUG, MODULES_SLUG, VIDEOS_SLUG, LESSONS_SLUG, MEDIA_SLUG } from '../constants'
import { slugField } from '@/payload/fields/slug'
import { anyone, isAdminOrProducer } from '@/payload/access'
import { revalidateLabVolume } from './hooks/revalidate'

const Volumes: CollectionConfig = {
  slug: VOLUMES_SLUG,
  labels: {
    singular: 'Volume',
    plural: 'Volumes',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Lab',
    defaultColumns: ['title', 'module', 'order'],
    description: 'Volumes are chapters within modules that group related lessons.',
    preview: (data) => {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/lab/volume/${data.slug}`
    },
    livePreview: {
      url: (data) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/lab/volume/${data.data.slug}`
      },
    },
  },
  access: {
    read: anyone,
    create: isAdminOrProducer,
    update: isAdminOrProducer,
    delete: isAdminOrProducer,
  },
  hooks: {
    afterChange: [revalidateLabVolume],
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
                description: 'The title of the volume (e.g., "Speed Foundations")',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              admin: {
                description:
                  'The subtitle of the volume (e.g., "Master the art of speed development")',
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
              name: 'lessons',
              type: 'join',
              on: 'volume',
              label: 'Lessons',
              collection: LESSONS_SLUG,
            },
          ],
        },
      ],
    },
    {
      name: 'module',
      type: 'relationship',
      relationTo: MODULES_SLUG,
      admin: {
        position: 'sidebar',
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
        description: 'Order within the module (0 = first)',
      },
    },
  ],
  timestamps: true,
} as const

export default Volumes
