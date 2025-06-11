import { CollectionConfig } from 'payload'
import { STUDENT_SLUG } from '../constants'

export const Students: CollectionConfig = {
  slug: STUDENT_SLUG,
  labels: {
    singular: 'Student',
    plural: 'Students',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
} as const

export default Students
