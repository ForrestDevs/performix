import type { CollectionConfig } from 'payload'
import { VIDEOS_SLUG } from '../constants'

const Videos: CollectionConfig = {
  slug: VIDEOS_SLUG,
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'source',
      type: 'select',
      options: ['youtube', 'loom', 'drive', 'vimeo', 'mux'],
    },
    {
      name: 'source_id',
      type: 'text',
    },
  ],
} as const

export default Videos
