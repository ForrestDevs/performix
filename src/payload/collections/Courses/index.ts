import { isAdminOrProducer, admins, anyone } from '@/payload/access'
import { CollectionConfig } from 'payload'
import { CHAPTERS_SLUG, COURSES_SLUG, LESSONS_SLUG, MEDIA_SLUG } from '../constants'
import { slugField } from '@/payload/fields/slug'

const Courses: CollectionConfig = {
  slug: COURSES_SLUG,
  admin: {
    useAsTitle: 'title',
    group: 'Products',
    defaultColumns: ['title', 'producer', 'status', 'price'],
  },
  access: {
    read: anyone,
    create: isAdminOrProducer,
    update: isAdminOrProducer,
    delete: admins,
  },
  fields: [
    ...slugField('title'),
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
      type: 'tabs',
      tabs: [
        {
          label: 'Meta',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: MEDIA_SLUG,
              required: true,
              admin: {
                description: 'Upload a thumbnail for the course',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'A short description of the course',
              },
            },
            {
              name: 'richText',
              label: 'Content',
              admin: {
                description: 'The content of the course',
              },
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'chapters',
              type: 'join',
              on: 'course',
              collection: CHAPTERS_SLUG,
              admin: {
                condition: (data) => data.structureType === 'hierarchical',
              },
            },
            {
              name: 'lessons',
              type: 'join',
              on: 'course',
              collection: LESSONS_SLUG,
              admin: {
                condition: (data) => data.structureType === 'flat',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'freePreview',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'If enabled, the course structure (chapters or lessons) will be visable',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'The price of the course, leave 0 for free courses',
      },
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
      admin: {
        position: 'sidebar',
        description:
          'The structure type of the course, flat or hierarchical. Flat is for courses with a single level of lessons, hierarchical is for courses with multiple levels of chapters and lessons within those chapters',
      },
    },
  ],
  timestamps: true,
} as const

export default Courses
