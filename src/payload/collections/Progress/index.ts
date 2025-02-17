import { CollectionConfig } from 'payload'

export const Progress: CollectionConfig = {
  slug: 'progress',
  admin: {
    useAsTitle: 'id',
    group: 'Learning',
    defaultColumns: ['enrollment', 'lesson', 'status', 'completion_date'],
  },
  //   access: {
  //     read: ({ req: { user } }) => {
  //       if (!user) return false
  //       if (user.role === 'admin') return true
  //       if (user.role === 'producer') {
  //         return {
  //           'enrollment.course.producer': {
  //             equals: user.id,
  //           },
  //         }
  //       }
  //       return {
  //         'enrollment.user': {
  //           equals: user.id,
  //         },
  //       }
  //     },
  //     create: ({ req: { user } }) => {
  //       if (!user) return false
  //       return {
  //         'enrollment.user': {
  //           equals: user.id,
  //         },
  //       }
  //     },
  //     update: ({ req: { user } }) => {
  //       if (!user) return false
  //       if (user.role === 'admin') return true
  //       return {
  //         'enrollment.user': {
  //           equals: user.id,
  //         },
  //       }
  //     },
  //     delete: ({ req: { user } }) => {
  //       if (!user) return false
  //       if (user.role === 'admin') return true
  //       return {
  //         'enrollment.user': {
  //           equals: user.id,
  //         },
  //       }
  //     },
  //   },
  fields: [
    {
      name: 'enrollment',
      type: 'relationship',
      relationTo: 'enrollments',
      required: true,
      hasMany: false,
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
      hasMany: false,
      //   filterOptions: ({ data }) => {
      //     if (data?.enrollment) {
      //       return {
      //         course: {
      //           relationTo: 'enrollments',
      //           value: data.enrollment,
      //           equals: true,
      //         },
      //       }
      //     }
      //     return {}
      //   },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'not_started',
      options: [
        { label: 'Not Started', value: 'not_started' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
      ],
    },
    {
      name: 'completion_date',
      type: 'date',
      admin: {
        condition: (data) => data?.status === 'completed',
      },
    },
    {
      name: 'last_accessed',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          data.last_accessed = new Date()

          if (data.status === 'completed' && !data.completion_date) {
            data.completion_date = new Date()
          }
        }
        return data
      },
    ],
    // afterChange: [
    //   async ({ doc, operation, req }) => {
    //     if (operation === 'create' || operation === 'update') {
    //       // Update enrollment progress
    //       const enrollment = await req.payload.findByID({
    //         collection: 'enrollments',
    //         id: doc.enrollment,
    //       })

    //       const allProgress = await req.payload.find({
    //         collection: 'progress',
    //         where: {
    //           enrollment: {
    //             equals: doc.enrollment,
    //           },
    //         },
    //       })

    //       const totalLessons = await req.payload.find({
    //         collection: 'lessons',
    //         where: {
    //           course: {
    //             equals: enrollment.course,
    //           },
    //         },
    //       })

    //       const completedLessons = allProgress.docs.filter(
    //         (progress) => progress.status === 'completed',
    //       )

    //       const progress = {
    //         total: totalLessons.totalDocs,
    //         completed: completedLessons.length,
    //         percentage: Math.round((completedLessons.length / totalLessons.totalDocs) * 100),
    //       }

    //       await req.payload.update({
    //         collection: 'enrollments',
    //         id: doc.enrollment,
    //         data: {
    //           progress,
    //           ...(progress.percentage === 100
    //             ? { status: 'completed', completed_at: new Date() }
    //             : {}),
    //         },
    //       })
    //     }
    //   },
    // ],
  },
  timestamps: true,
}
