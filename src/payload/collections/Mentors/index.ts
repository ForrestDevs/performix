import { CollectionConfig } from 'payload'
import { MENTOR_SLUG } from '../constants'

export const Mentors: CollectionConfig = {
  slug: MENTOR_SLUG,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'currentTeam',
      type: 'text',
    },
    {
      name: 'position',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'age',
      type: 'number',
    },
    {
      name: 'school',
      type: 'text',
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
