import { CollectionConfig } from 'payload'
import { MEDIA_SLUG, PLANS_SLUG } from '../constants'
import { slugField } from '@/payload/fields/slug'
import { stripeLinkField } from '@/payload/fields/stripeLink'
import { createNewInStripe } from './hooks/create'
import { syncExistingWithStripe } from './hooks/update'
import { deleteFromStripe } from './hooks/delete'
import { admins, anyone } from '@/payload/access'
import { revalidatePlans } from './hooks/revalidate'

const Plans: CollectionConfig = {
  slug: PLANS_SLUG,
  admin: {
    group: 'Products',
    useAsTitle: 'title',
  },
  access: {
    create: admins,
    read: anyone,
    update: admins,
    delete: admins,
  },
  hooks: {
    beforeValidate: [createNewInStripe],
    beforeChange: [syncExistingWithStripe],
    afterDelete: [deleteFromStripe],
    afterChange: [revalidatePlans],
  },
  fields: [
    ...slugField('title'),
    ...stripeLinkField('stripeProductId', 'products', false),
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description: 'The title of the plan',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      admin: {
        description: 'The description of the plan',
      },
    },
    {
      name: 'mostPopular',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether the plan is the most popular',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: MEDIA_SLUG,
      admin: {
        description: 'The thumbnail of the plan',
      },
    },
    {
      name: 'bestFor',
      type: 'text',
      label: 'Best For',
      admin: {
        description: 'Who the plan is best for',
      },
    },
    {
      name: 'includes',
      label: 'Includes',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
        },
      ],
      admin: {
        description: 'What the plan includes',
      },
    },
    {
      name: 'skipSync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: false,
      },
      label: 'Skip Sync',
    },
    {
      name: 'stripeProductId',
      type: 'text',
      admin: {
        readOnly: false,
        position: 'sidebar',
      },
    },
    {
      name: 'stripePriceId',
      type: 'text',
      admin: {
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
        position: 'sidebar',
      },
    },
    {
      name: 'period',
      type: 'select',
      defaultValue: 'monthly',
      options: ['monthly', 'yearly'],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
} as const

export default Plans
