import type { CollectionConfig } from 'payload'
import { slugField } from '@/payload/fields/slug'
import { anyone } from '@/payload/access'
import { authenticated } from '@/payload/access'
import { ARTICLE_TAG_SLUG } from '../constants'

const ArticleTags: CollectionConfig = {
  slug: ARTICLE_TAG_SLUG,
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
} as const

export default ArticleTags
