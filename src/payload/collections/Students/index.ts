import { CollectionConfig } from 'payload'
import { STUDENT_SLUG, USER_SLUG } from '../constants'

export const Students: CollectionConfig = {
  slug: STUDENT_SLUG,
  labels: {
    singular: 'Student',
    plural: 'Students',
  },
  admin: {
    useAsTitle: 'firstName',
    group: 'Admin',
    defaultColumns: ['firstName', 'lastName', 'currentLevel', 'position'],
  },
  access: {
    // Students can only see their own profile
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      if (req.user?.role === 'student') {
        return {
          user: {
            equals: req.user.id,
          },
        }
      }
      return false
    },
    update: ({ req }) => {
      if (req.user?.role === 'admin') return true
      if (req.user?.role === 'student') {
        return {
          user: {
            equals: req.user.id,
          },
        }
      }
      return false
    },
    create: ({ req }) => {
      return req.user?.role === 'student' || req.user?.role === 'admin'
    },
    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: USER_SLUG,
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
      admin: {
        description: 'First name of the student',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: {
        description: 'Last name of the student',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Phone number',
      },
    },
    {
      name: 'birthDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Birth date of the student',
      },
    },
    {
      name: 'currentLevel',
      type: 'text',
      required: true,
      admin: {
        description: 'Current level of play',
      },
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      options: [
        { label: 'Forward', value: 'forward' },
        { label: 'Defence', value: 'defence' },
        { label: 'Goalie', value: 'goalie' },
      ],
      admin: {
        description: 'Primary position',
      },
    },
    {
      name: 'currentTeam',
      type: 'text',
      required: true,
      admin: {
        description: 'Current team name',
      },
    },
    {
      name: 'goals',
      type: 'textarea',
      admin: {
        description: 'Personal goals and aspirations',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Personal biography',
      },
    },
    {
      name: 'profileCompleted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Whether the student has completed their profile setup',
      },
    },
    {
      name: 'isParent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Whether this profile is a parent of another student',
      },
    },
  ],
} as const

export default Students
