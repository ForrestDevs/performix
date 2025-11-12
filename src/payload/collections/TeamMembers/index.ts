import type { CollectionConfig } from 'payload'
import { MEDIA_SLUG, TEAM_MEMBERS_SLUG } from '../constants'
import { admin, anyone } from '@/payload/access'
import { revalidateTeamMembers } from './hooks/revalidate'

const TeamMembers: CollectionConfig = {
  slug: TEAM_MEMBERS_SLUG,
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    description: 'Team members are the people who are part of the team.',
  },
  access: {
    read: anyone,
    create: admin,
    update: admin,
    delete: admin,
  },
  hooks: {
    afterChange: [revalidateTeamMembers],
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
      relationTo: MEDIA_SLUG,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'credentials',
      type: 'array',
      fields: [
        {
          name: 'credential',
          type: 'text',
        },
      ],
      minRows: 1,
    },
    {
      name: 'bio',
      type: 'text',
    },
  ],
} as const

export default TeamMembers
