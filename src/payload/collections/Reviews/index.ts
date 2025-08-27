import { CollectionConfig } from 'payload'
import { anyone, admins } from '@/payload/access'

const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'id',
    group: 'Learning',
    defaultColumns: ['user', 'course', 'rating', 'created_at'],
  },
  access: {
    read: anyone,
    delete: admins,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        step: 1,
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          // Verify that the user is enrolled in the course
          const enrollment = await req.payload.find({
            collection: 'enrollments',
            where: {
              AND: [
                {
                  user: {
                    equals: data.user,
                  },
                },
                {
                  course: {
                    equals: data.course,
                  },
                },
                {
                  status: {
                    equals: 'active',
                  },
                },
              ],
            },
          })

          if (!enrollment.docs.length) {
            throw new Error('You must be enrolled in the course to leave a review')
          }

          // Check if user has already reviewed this course
          const existingReview = await req.payload.find({
            collection: 'reviews',
            where: {
              AND: [
                {
                  user: {
                    equals: data.user,
                  },
                },
                {
                  course: {
                    equals: data.course,
                  },
                },
              ],
            },
          })

          if (existingReview.docs.length) {
            throw new Error('You have already reviewed this course')
          }
        }

        return data
      },
    ],
  },
  timestamps: true,
} as const

export default Reviews
