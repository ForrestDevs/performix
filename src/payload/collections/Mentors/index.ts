import { CollectionConfig } from 'payload'
import { MEDIA_SLUG, MENTOR_SLUG, SCHOOLS_SLUG } from '../constants'
import { slugField } from '@/payload/fields/slug'
import { revalidateMentors } from './hooks/revalidate'

const Mentors: CollectionConfig = {
  slug: MENTOR_SLUG,
  admin: {
    useAsTitle: 'name',
    group: 'Website',
    defaultColumns: ['name', 'featured'],
  },
  hooks: {
    afterChange: [revalidateMentors],
  },
  fields: [
    ...slugField('name'),
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      label: 'Intro',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'The short intro that goes in the mentor card and at the top of the profile. (Perferably written in the third person).',
      },
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      admin: {
        description:
          'The bio is a longer description of the mentor and can be written in the first person.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'location',
          label: 'Location',
          type: 'text',
          required: true,
        },
        {
          name: 'age',
          label: 'Age',
          type: 'number',
        },
      ],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: MEDIA_SLUG,
      admin: {
        description: 'Upload/ Select a profile picture for the mentor',
      },
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
      type: 'select',
      options: [
        {
          label: 'Forward',
          value: 'forward',
        },
        {
          label: 'Defence',
          value: 'defence',
        },
        {
          label: 'Goalie',
          value: 'goalie',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'levelOfPlay',
      type: 'select',
      options: [
        {
          label: 'D1',
          value: 'd1',
        },
        {
          label: 'Pro',
          value: 'pro',
        },
        {
          label: 'USports',
          value: 'usports',
        },
      ],
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
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Hockey',
          value: 'hockey',
        },
        {
          label: 'Soccer',
          value: 'soccer',
        },
        {
          label: 'Baseball',
          value: 'baseball',
        },
        {
          label: 'Basketball',
          value: 'basketball',
        },
        {
          label: 'Volleyball',
          value: 'volleyball',
        },
      ],
      defaultValue: 'hockey',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      required: true,
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
          name: 'instagram',
          type: 'text',
        },
      ],
    },
    {
      name: 'skills',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Defensive Awareness',
          value: 'defensive-awareness',
        },
        {
          label: 'Defending the Rush',
          value: 'defending-the-rush',
        },
        {
          label: 'Offensive Production',
          value: 'offensive-production',
        },
        {
          label: 'Breaking Out',
          value: 'breaking-out',
        },
        {
          label: 'Winning Battles',
          value: 'winning-battles',
        },
        {
          label: 'Playmaking',
          value: 'playmaking',
        },
        {
          label: 'Skating Ability',
          value: 'skating-ability',
        },
        {
          label: 'Puck Handling',
          value: 'puck-handling',
        },
        {
          label: 'Reaction Speed',
          value: 'reaction-speed',
        },
        {
          label: 'Agility',
          value: 'agility',
        },
        {
          label: 'Physicality',
          value: 'physicality',
        },
        {
          label: 'Goal Scoring',
          value: 'goal-scoring',
        },
        {
          label: 'Speed',
          value: 'speed',
        },
        {
          label: 'Wallplay',
          value: 'wallplay',
        },
        {
          label: 'Stickhandling',
          value: 'stickhandling',
        },
        {
          label: 'Hockey IQ',
          value: 'hockey-iq',
        },
        {
          label: 'Teamwork',
          value: 'teamwork',
        },
        {
          label: 'Leadership',
          value: 'leadership',
        },
      ],
    },
  ],
  timestamps: true,
  versions: false,
} as const

export default Mentors
