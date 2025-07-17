import { CollectionConfig } from 'payload'
import { LESSONS_SLUG, PROGRESS_SLUG } from '../constants'
import { USER_SLUG } from '../constants'
import { admin } from '@/payload/access'
import { revalidateLabProgress } from './hooks/revalidate'

export const Progress: CollectionConfig = {
  slug: PROGRESS_SLUG,
  admin: {
    useAsTitle: 'id',
    group: 'Learning',
    defaultColumns: ['lesson', 'user', 'completed', 'completionDate'],
  },
  access: {
    create: admin,
    read: admin,
    update: admin,
    delete: admin,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          if (data.status === 'completed' && !data.completion_date) {
            data.completionDate = new Date()
          }
        }
        return data
      },
    ],
    afterChange: [revalidateLabProgress],
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
      name: 'lesson',
      type: 'relationship',
      relationTo: LESSONS_SLUG,
      required: true,
      hasMany: false,
    },
    {
      name: 'completed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'completionDate',
      type: 'date',
      admin: {
        condition: (data) => data?.status === 'completed',
      },
    },
  ],
  timestamps: true,
}
