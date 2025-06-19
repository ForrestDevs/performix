import { anyone, isAdminOrProducer } from '@/payload/access'
import { slugField } from '@/payload/fields/slug'
import { CollectionConfig, ValidateOptions } from 'payload'
import { COURSES_SLUG, MEDIA_SLUG } from '../constants'

const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
    group: 'Products',
    defaultColumns: ['title'],
    description: 'Lessons are the individual units of content within a chapter or course.',
  },
  access: {
    read: anyone,
    create: anyone,
    update: anyone,
    delete: anyone,
  },
  lockDocuments: false,
  fields: [
    ...slugField('title'),
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
              admin: {
                description: 'The title of the lesson',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'The description of the lesson',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'richText',
              type: 'richText',
            },
            {
              name: 'downloads',
              type: 'upload',
              relationTo: MEDIA_SLUG,
              hasMany: true,
              admin: {
                description: 'The downloads for the lesson',
              },
            },
            {
              name: 'videos',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'The order of the lesson in the chapter/course',
      },
      validate: async (value, ctx): Promise<string | true> => {
        if (!value) return 'Order is required'
        if (value < 0) return 'Order must be greater than 0'
        // Get the course to check its structure type
        const courseId = typeof ctx.data?.course === 'object' ? ctx.data.course.id : ctx.data.course
        if (!courseId) return 'Course is required to validate order'
        const course = await ctx.req.payload.findByID({
          collection: 'courses',
          id: courseId,
        })
        if (!course) return 'Course not found'
        // Check for conflicts based on course structure type
        if (course.structureType === 'flat') {
          // For flat courses, check all lessons in the course
          const existingLessons = await ctx.req.payload.find({
            collection: 'lessons',
            where: {
              and: [
                { course: { equals: courseId } },
                { order: { equals: value } },
                ...(ctx.id ? [{ id: { not_equals: ctx.id } }] : []), // Exclude current lesson if updating
              ],
            },
          })
          if (existingLessons.totalDocs > 0) {
            return `Order ${value} is already used by another lesson in this course`
          }
        } else if (course.structureType === 'hierarchical') {
          // For hierarchical courses, check lessons in the same chapter
          const chapterId =
            typeof ctx.data?.chapter === 'object' ? ctx.data.chapter.id : ctx.data.chapter
          if (!chapterId) return 'Chapter is required for hierarchical courses'
          const existingLessons = await ctx.req.payload.find({
            collection: 'lessons',
            where: {
              and: [
                { chapter: { equals: chapterId } },
                { order: { equals: value } },
                ...(ctx.id ? [{ id: { not_equals: ctx.id } }] : []), // Exclude current lesson if updating
              ],
            },
          })
          if (existingLessons.totalDocs > 0) {
            return `Order ${value} is already used by another lesson in this chapter`
          }
        }
        return true
      },
    },

    {
      name: 'course',
      type: 'relationship',
      relationTo: COURSES_SLUG,
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'chapter',
      type: 'relationship',
      relationTo: 'chapters',
      hasMany: false,
      admin: {
        position: 'sidebar',
        condition: (data) => data.course?.structureType === 'hierarchical',
      },
      filterOptions: ({ data }) => {
        return {
          course: {
            equals: data?.course,
          },
        }
      },
    },
    {
      name: 'isPreview',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'estimatedDuration',
      type: 'number',
      min: 0,
      admin: {
        position: 'sidebar',
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
} as const

export default Lessons
