import { anyone, isAdminOrProducer } from '@/payload/access'
import { CollectionConfig } from 'payload'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'course', 'contentType', 'isPreview'],
  },
  access: {
    read: anyone,
    create: anyone,
    update: anyone,
    delete: anyone,
  },
  lockDocuments: false,
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
      name: 'chapter',
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
      name: 'order',
      type: 'number',
      required: true,
    },
    {
      name: 'displayOrder',
      type: 'text',
      admin: {
        description: 'e.g., "1.2.3" for hierarchical or "1" for flat',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Article', value: 'article' },
        { label: 'Mixed', value: 'mixed' },
      ],
    },
    {
      name: 'content',
      type: 'group',
      fields: [
        {
          name: 'primaryContent',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Video', value: 'video' },
                { label: 'Rich Text', value: 'rich_text' },
              ],
            },
            {
              name: 'videoData',
              type: 'group',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'video',
              },
              fields: [
                {
                  name: 'videoUrl',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'videoProvider',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Vimeo', value: 'vimeo' },
                    { label: 'Custom', value: 'custom' },
                  ],
                },
                {
                  name: 'videoThumbnail',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'duration',
                  type: 'number',
                  min: 0,
                  admin: {
                    description: 'Duration in minutes',
                  },
                },
              ],
            },
            {
              name: 'richTextData',
              type: 'richText',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'rich_text',
              },
            },
          ],
        },
        {
          name: 'additionalResources',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'PDF', value: 'pdf' },
                { label: 'Link', value: 'link' },
                { label: 'File', value: 'file' },
                { label: 'Embed', value: 'embed' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (data, siblingData) => ['link', 'embed'].includes(siblingData?.type),
              },
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, siblingData) => ['pdf', 'file'].includes(siblingData?.type),
              },
            },
          ],
        },
        {
          name: 'attachments',
          type: 'array',
          fields: [
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'downloads',
          type: 'array',
          fields: [
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'isPreview',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'estimatedDuration',
      type: 'number',
      min: 0,
      admin: {
        description: 'Estimated duration in minutes',
      },
    },
  ],
  hooks: {
    // beforeChange: [
    //   async ({ data, req }) => {
    //     // Calculate display order based on chapter hierarchy
    //     if (data.chapter) {
    //       const chapter = await req.payload.findByID({
    //         collection: 'chapters',
    //         id: data.chapter,
    //       })
    //       let prefix = String(data.order)
    //       let currentChapter = chapter
    //       while (currentChapter?.parentChapter) {
    //         const parentChapter = await req.payload.findByID({
    //           collection: 'chapters',
    //           id: currentChapter.parentChapter,
    //         })
    //         prefix = `${parentChapter.order}.${prefix}`
    //         currentChapter = parentChapter
    //       }
    //       data.displayOrder = prefix
    //     } else {
    //       data.displayOrder = String(data.order)
    //     }
    //     return data
    //   },
    // ],
  },
  timestamps: true,
}
