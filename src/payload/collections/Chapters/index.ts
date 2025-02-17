import { CollectionConfig } from 'payload'
import { anyone, isAdminOrProducer } from '@/payload/access'

export const Chapters: CollectionConfig = {
  slug: 'chapters',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'course', 'order', 'depth'],
  },
  access: {
    read: anyone,
    create: isAdminOrProducer,
    update: isAdminOrProducer,
    delete: isAdminOrProducer,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      hasMany: false,
    },
    {
      name: 'lessons',
      type: 'join',
      on: 'course',
      collection: 'lessons',
    },
    {
      name: 'parentChapter',
      type: 'relationship',
      relationTo: 'chapters',
      hasMany: false,
      filterOptions: ({ data }) => {
        return {
          course: {
            equals: data?.course,
          },
        }
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        description: 'Order within the current level',
      },
    },
    {
      name: 'depth',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: '0 for main chapters, 1+ for subchapters',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Calculate depth based on parent chapter
        if (data.parentChapter) {
          const parentChapter = await req.payload.findByID({
            collection: 'chapters',
            id: data.parentChapter,
          })
          data.depth = (parentChapter.depth || 0) + 1
        } else {
          data.depth = 0
        }
        return data
      },
    ],
  },
  timestamps: true,
}
