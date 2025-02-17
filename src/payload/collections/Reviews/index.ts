import { CollectionConfig } from 'payload'
import { anyone, admins } from '@/payload/access'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'id',
    group: 'Learning',
    defaultColumns: ['user', 'course', 'rating', 'created_at'],
  },
  access: {
    read: anyone,
    // create: ({ req: { user } }) => {
    //   if (!user) return false
    //   return {
    //     user: {
    //       equals: user.id,
    //     },
    //   }
    // },
    // update: ({ req: { user } }) => {
    //   if (!user) return false
    //   if (user.role === 'admin') return true
    //   return {
    //     user: {
    //       equals: user.id,
    //     },
    //   }
    // },
    delete: admins,
  },
  fields: [
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      hasMany: false,
    },
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
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create' || operation === 'update') {
          // Update course average rating
          const courseReviews = await req.payload.find({
            collection: 'reviews',
            where: {
              course: {
                equals: doc.course,
              },
            },
          })

          const totalRating = courseReviews.docs.reduce((sum, review) => sum + review.rating, 0)
          const averageRating = totalRating / courseReviews.docs.length

          await req.payload.update({
            collection: 'courses',
            id: doc.course,
            data: {
              // averageRating: Math.round(averageRating * 10) / 10,
              // totalReviews: courseReviews.docs.length,
            },
          })
        }
      },
    ],
  },
  timestamps: true,
}
