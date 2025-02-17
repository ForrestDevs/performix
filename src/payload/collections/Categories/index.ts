import type { CollectionConfig } from 'payload'
import { slugField } from '@/payload/fields/slug'
import { anyone } from '@/payload/access'
import { authenticated } from '@/payload/access'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
