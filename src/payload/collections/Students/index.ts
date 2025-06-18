import { CollectionConfig } from 'payload'
import { STUDENT_SLUG, USER_SLUG } from '../constants'

export const Students: CollectionConfig = {
  slug: STUDENT_SLUG,
  labels: {
    singular: 'Student',
    plural: 'Students',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'currentLevel', 'goalLevel'],
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
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the student',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Student email address',
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
      name: 'age',
      type: 'number',
      required: true,
      min: 13,
      max: 25,
      admin: {
        description: 'Student age',
      },
    },
    {
      name: 'currentLevel',
      type: 'select',
      required: true,
      options: [
        { label: 'AAA Bantam', value: 'aaa-bantam' },
        { label: 'AAA Midget', value: 'aaa-midget' },
        { label: 'Junior A', value: 'junior-a' },
        { label: 'Junior B', value: 'junior-b' },
        { label: 'USHL', value: 'ushl' },
        { label: 'NAHL', value: 'nahl' },
        { label: 'BCHL', value: 'bchl' },
        { label: 'High School Varsity', value: 'high-school-varsity' },
        { label: 'Prep School', value: 'prep-school' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Current level of play',
      },
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      options: [
        { label: 'Left Wing', value: 'left-wing' },
        { label: 'Right Wing', value: 'right-wing' },
        { label: 'Center', value: 'center' },
        { label: 'Left Defense', value: 'left-defense' },
        { label: 'Right Defense', value: 'right-defense' },
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
      name: 'goalLevel',
      type: 'select',
      required: true,
      options: [
        { label: 'Division 1 (D1)', value: 'd1' },
        { label: 'Division 3 (D3)', value: 'd3' },
        { label: 'ACHA', value: 'acha' },
        { label: 'Junior Hockey', value: 'junior' },
        { label: 'Professional', value: 'professional' },
        { label: 'Not Sure Yet', value: 'not-sure' },
      ],
      admin: {
        description: 'Goal level of play',
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
  ],
} as const

export default Students
