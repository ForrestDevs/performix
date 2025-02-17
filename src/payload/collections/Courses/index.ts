import { isAdminOrProducer, admins, anyone } from '@/payload/access'
import { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'producer', 'status', 'price'],
  },
  access: {
    read: anyone,
    create: isAdminOrProducer,
    update: isAdminOrProducer,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'producer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
      validate: (value, ctx) => {
        if (ctx.req.user?.role === 'producer' && value !== ctx.req.user?.id) {
          return 'As a producer, you can only create courses for yourself'
        }
        return true
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        position: 'sidebar',
        step: 0.01,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      fields: [
        {
          name: 'requirement',
          type: 'text',
        },
      ],
    },
    {
      name: 'whatYouWillLearn',
      type: 'array',
      fields: [
        {
          name: 'learning',
          type: 'text',
        },
      ],
    },
    {
      name: 'structureType',
      type: 'select',
      required: true,
      defaultValue: 'flat',
      options: [
        { label: 'Flat', value: 'flat' },
        { label: 'Hierarchical', value: 'hierarchical' },
      ],
    },
    {
      name: 'chapters',
      type: 'join',
      on: 'course',
      collection: 'chapters',
    },
    {
      name: 'lessons',
      type: 'join',
      on: 'course',
      collection: 'lessons',
    },
  ],
  timestamps: true,
}
