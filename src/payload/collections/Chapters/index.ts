import { CollectionConfig } from 'payload'
import { anyone, isAdminOrProducer } from '@/payload/access'
import { CHAPTERS_SLUG, COURSES_SLUG, PRODUCT_CATEGORY_SLUG } from '../constants'
import { slugField } from '@/payload/fields/slug'
import getDescendants from './utils/getDescendants'
import { beforeChange } from './hooks/beforeChange'
import { afterChange } from './hooks/afterChange'
import { beforeDelete } from './hooks/beforeDelete'
import { revalidateChapter } from './hooks/revalidate-chapter'

const Chapters: CollectionConfig = {
  slug: 'chapters',
  admin: {
    useAsTitle: 'title',
    group: 'Products',
    defaultColumns: ['title', 'course', 'order', 'depth'],
  },
  access: {
    read: anyone,
    create: isAdminOrProducer,
    update: isAdminOrProducer,
    delete: isAdminOrProducer,
  },
  hooks: {
    beforeChange: [beforeChange],
    afterChange: [afterChange, revalidateChapter],
    beforeDelete: [beforeDelete],
  },
  fields: [
    ...slugField('title'),
    {
      name: 'fullSlug',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description:
          'The full URL path for this chapter, computed from the parent chain (e.g.: course/chapter/subchapter).',
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
              label: 'Title',
              admin: {
                description: 'The title of the chapter',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'A short description of the chapter',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'lessons',
              type: 'join',
              on: 'course',
              collection: 'lessons',
            },
          ],
        },
      ],
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: COURSES_SLUG,
      required: true,
      hasMany: false,
      filterOptions: () => {
        return {
          structureType: { equals: 'hierarchical' },
        }
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: CHAPTERS_SLUG,
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'The parent chapter of this chapter.',
      },
      validate: async (value, { id, req }) => {
        // If no parent is selected, this is a root chapter.
        if (!value) return true

        const parentId = typeof value === 'object' ? value.value : value
        if (parentId === id) return 'A chapter cannot be its own parent.'

        // Walk upward to ensure there are no circular references.
        let currentParent = await req.payload.findByID({
          collection: CHAPTERS_SLUG,
          id: parentId,
        })

        const traversedIds = new Set([id])
        while (currentParent?.parent) {
          const ancestorId =
            typeof currentParent.parent === 'object'
              ? currentParent.parent.id
              : currentParent.parent
          if (traversedIds.has(ancestorId)) {
            return 'Circular reference detected in category hierarchy.'
          }
          traversedIds.add(ancestorId)
          currentParent = await req.payload.findByID({
            collection: CHAPTERS_SLUG,
            id: ancestorId,
          })
        }

        return true
      },
      filterOptions: async ({ id, req, data }) => {
        // Initialize empty filter object
        const filter: Record<string, any> = {}

        if (!id) {
          return filter
        }

        try {
          filter.and = [{ id: { not_equals: id } }, { course: { equals: data?.course } }]

          // Get all descendants to prevent circular references
          const descendants = await getDescendants(req, id)
          if (descendants.length > 0) {
            filter.and.push({
              id: { not_in: descendants.map((desc) => desc.id) },
            })
          }
        } catch (error) {
          // Ensure at minimum we prevent self-selection
          return { id: { not_equals: id } }
        }

        return filter
      },
    },
    {
      name: 'isLeaf',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Indicates if the chapter is a leaf (i.e. has no children).',
        readOnly: true,
        position: 'sidebar',
        hidden: true,
      },
    },
    // used as a debug field
    {
      name: 'children',
      type: 'join',
      collection: CHAPTERS_SLUG,
      on: 'parent',
      label: 'Children',
      admin: {
        position: 'sidebar',
        allowCreate: false,
        defaultColumns: ['title'],
      },
    },
  ],
  timestamps: true,
} as const

export default Chapters
