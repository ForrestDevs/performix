import { CollectionConfig } from 'payload'
import { MENTOR_SLUG, SCHOOLS_SLUG } from '../constants'
import { slugField } from '@/payload/fields/slug'

export const Mentors: CollectionConfig = {
  slug: MENTOR_SLUG,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    ...slugField('name'),
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'age',
      type: 'number',
    },
    {
      name: 'currentTeam',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'position',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'school',
      type: 'relationship',
      relationTo: SCHOOLS_SLUG,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sports',
      type: 'array',
      fields: [
        {
          name: 'sport',
          type: 'text',
        },
      ],
    },
    {
      name: 'agesServed',
      type: 'array',
      fields: [
        {
          name: 'age',
          type: 'text',
        },
      ],
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          name: 'eliteProspects',
          type: 'text',
        },
        {
          name: 'tiktok',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        {
          name: 'skill',
          type: 'text',
        },
      ],
    },
  ],
}
