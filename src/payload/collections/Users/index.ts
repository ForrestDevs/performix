import { admins, anyone, authenticated } from '@/payload/access'
import { CollectionConfig } from 'payload'
import { USER_SLUG } from '../constants'

export const Users: CollectionConfig = {
  slug: USER_SLUG,
  auth: true,
  admin: {
    useAsTitle: 'name',
    group: 'Core',
  },
  access: {
    admin: admins,
    create: anyone,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      hasMany: true,
      defaultValue: ['consumer'],
      options: [
        { label: 'Consumer', value: 'consumer' },
        { label: 'Producer', value: 'producer' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        read: admins,
        update: admins,
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          validate: (value) => {
            try {
              const url = new URL(value)
              if (!url.protocol) {
                return 'Please enter a valid URL'
              }
              return true
            } catch (error) {
              return 'Please enter a valid URL'
            }
          },
        },
      ],
    },
  ],
  timestamps: true,
}
