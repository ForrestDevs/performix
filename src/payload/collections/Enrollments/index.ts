import { CollectionConfig } from 'payload'
import {
  BLUEPRINTS_SLUG,
  COURSES_SLUG,
  ENROLLMENTS_SLUG,
  PLANS_SLUG,
  USER_SLUG,
} from '../constants'
// import { admin, anyone } from '@/payload/access'

const Enrollments: CollectionConfig = {
  slug: ENROLLMENTS_SLUG,
  admin: {
    useAsTitle: 'user',
    group: 'Admin',
    defaultColumns: ['user', 'type', 'enrolledIn', 'status'],
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: USER_SLUG,
      required: true,
      hasMany: false,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Course', value: 'course' },
        { label: 'Blueprint', value: 'blueprint' },
        { label: 'Plan', value: 'plan' },
      ],
    },
    {
      name: 'enrolledCourse',
      type: 'relationship',
      label: 'Enrolled Course',
      relationTo: COURSES_SLUG,
      hasMany: false,
      admin: {
        condition: (data) => data.type === 'course',
      },
    },
    {
      name: 'enrolledBlueprint',
      type: 'relationship',
      label: 'Enrolled Blueprint',
      relationTo: BLUEPRINTS_SLUG,
      hasMany: false,
      admin: {
        condition: (data) => data.type === 'blueprint',
      },
    },
    {
      name: 'enrolledPlan',
      type: 'relationship',
      label: 'Enrolled Plan',
      relationTo: PLANS_SLUG,
      hasMany: false,
      admin: {
        condition: (data) => data.type === 'plan',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
  ],
  timestamps: true,
} as const

export default Enrollments
