import { CollectionConfig } from 'payload'

export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  admin: {
    useAsTitle: 'id',
    group: 'Learning',
    defaultColumns: ['user', 'course', 'status', 'purchased_at'],
  },
  //   access: {
  //     read: ({ req: { user } }) => {
  //       if (!user) return false
  //       if (user.role === 'admin') return true
  //       if (user.role === 'producer') {
  //         return {
  //           'course.producer': {
  //             equals: user.id,
  //           },
  //         }
  //       }
  //       return {
  //         user: {
  //           equals: user.id,
  //         },
  //       }
  //     },
  //     create: ({ req: { user } }) => {
  //       if (!user) return false
  //       return {
  //         user: {
  //           equals: user.id,
  //         },
  //       }
  //     },
  //     update: ({ req: { user } }) => {
  //       if (!user) return false
  //       if (user.role === 'admin') return true
  //       if (user.role === 'producer') {
  //         return {
  //           'course.producer': {
  //             equals: user.id,
  //           },
  //         }
  //       }
  //       return {
  //         user: {
  //           equals: user.id,
  //         },
  //       }
  //     },
  //     delete: isAdmin,
  //   },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      hasMany: false,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    {
      name: 'progress',
      type: 'json',
      admin: {
        description: 'Lesson completion status and progress data',
      },
    },
    {
      name: 'purchased_at',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'completed_at',
      type: 'date',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          data.purchased_at = new Date()
        }
        if (data.status === 'completed' && !data.completed_at) {
          data.completed_at = new Date()
        }
        return data
      },
    ],
  },
  timestamps: true,
}
