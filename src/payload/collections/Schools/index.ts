import { CollectionConfig } from 'payload'
import { MEDIA_SLUG, SCHOOLS_SLUG } from '../constants'

const Schools: CollectionConfig = {
  slug: SCHOOLS_SLUG,
  admin: {
    useAsTitle: 'name',
    group: 'Website',
    defaultColumns: ['name'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: MEDIA_SLUG,
      required: true,
    },
  ],
} as const

export default Schools
