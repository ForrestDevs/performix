import type { CollectionConfig } from 'payload'
import { BLUEPRINTS_SLUG, MEDIA_SLUG } from '../constants'
import { slugField } from '@/payload/fields/slug'
import { admin, anyone } from '@/payload/access'
import { stripeLinkField } from '@/payload/fields/stripeLink'
import { deleteFromStripe } from './hooks/delete'
import { createNewInStripe } from './hooks/create'
import { syncExistingWithStripe } from './hooks/update'

const Blueprints: CollectionConfig = {
  slug: BLUEPRINTS_SLUG,
  admin: {
    group: 'Products',
    useAsTitle: 'title',
    description: 'Blueprints are a collection of resources.',
  },
  access: {
    read: anyone,
    create: admin,
    update: admin,
    delete: admin,
  },
  hooks: {
    beforeValidate: [createNewInStripe],
    beforeChange: [syncExistingWithStripe],
    afterDelete: [deleteFromStripe],
  },
  fields: [
    ...slugField('title'),
    ...stripeLinkField('stripeProductId', 'products', false),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Meta',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'thumbnail',
              label: 'Thumbnail',
              admin: {
                description: 'Upload a thumbnail for the blueprint',
              },
              type: 'upload',
              relationTo: MEDIA_SLUG,
            },
            {
              name: 'description',
              label: 'Description',
              admin: {
                description: 'A short description of the blueprint',
              },
              type: 'textarea',
            },
            {
              label: 'Content',
              admin: {
                description: 'The content of the blueprint',
              },
              name: 'richText',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'files',
              label: 'Files',
              admin: {
                description: 'Upload files to the blueprint (PDF, DOCX, Images)',
              },
              type: 'upload',
              hasMany: true,
              relationTo: MEDIA_SLUG,
            },
            {
              name: 'videos',
              label: 'Videos',
              admin: {
                description: 'Add videos to the blueprint (YouTube, Vimeo, etc.)',
              },
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'isPaid',
      label: 'Is Paid',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'skipSync',
      type: 'checkbox',
      admin: {
        condition: (data) => data.isPaid,
        position: 'sidebar',
        readOnly: false,
      },
      label: 'Skip Sync',
    },
    {
      name: 'stripeProductId',
      type: 'text',
      admin: {
        condition: (data) => data.isPaid,
        readOnly: false,
        position: 'sidebar',
      },
    },
    {
      name: 'stripePriceId',
      type: 'text',
      admin: {
        condition: (data) => data.isPaid,
        readOnly: false,
        position: 'sidebar',
      },
    },
    {
      name: 'price',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        condition: (data) => data.isPaid,
        position: 'sidebar',
      },
    },
  ],
} as const

export default Blueprints
