import type { CollectionConfig } from 'payload'
import { FORM_RESPONSES_SLUG } from '../constants'
import { admin } from '@/payload/access'

const FormResponses: CollectionConfig = {
  slug: FORM_RESPONSES_SLUG,
  admin: {
    useAsTitle: 'formName',
    group: 'Website',
    defaultColumns: ['formName', 'userName', 'userEmail', 'userPhone'],
    description: 'Website form submissions.',
  },
  access: {
    read: admin,
    create: admin,
    update: admin,
    delete: admin,
  },
  fields: [
    {
      name: 'formName',
      type: 'text',
      required: true,
      admin: {
        description: 'The name of the form this response came from.',
      },
    },
    {
      name: 'userName',
      type: 'text',
      admin: {
        description: 'The name of the user who submitted the form.',
      },
    },
    {
      name: 'userPhone',
      type: 'text',
      admin: {
        description: 'The phone number of the user who submitted the form.',
      },
    },
    {
      name: 'userEmail',
      type: 'text',
      admin: {
        description: 'The email of the user who submitted the form.',
      },
    },
    {
      name: 'response',
      type: 'json',
    },
  ],
  timestamps: true,
} as const

export default FormResponses
