import { CollectionConfig } from 'payload'
import {
  BLUEPRINTS_SLUG,
  COURSES_SLUG,
  PLANS_SLUG,
  TRANSACTIONS_SLUG,
  USER_SLUG,
} from '../constants'

const Transactions: CollectionConfig = {
  slug: TRANSACTIONS_SLUG,
  admin: {
    useAsTitle: 'id',
    group: 'Commerce',
    defaultColumns: ['user', 'total', 'status'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: USER_SLUG,
      required: true,
      hasMany: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: [BLUEPRINTS_SLUG, COURSES_SLUG, PLANS_SLUG],
      hasMany: true,
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Blueprint', value: 'blueprint' },
        { label: 'Course', value: 'course' },
        { label: 'Plan', value: 'plan' },
      ],
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        readOnly: true,
        description: 'Amount in USD (not cents)',
      },
    },
    {
      name: 'currency',
      type: 'text',
      defaultValue: 'USD',
      admin: {
        readOnly: true,
        description: 'Transaction currency',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'stripePaymentId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Stripe checkout session ID or payment intent ID',
      },
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: {
        description: 'Stripe customer ID for this transaction',
        readOnly: true,
      },
    },
    {
      name: 'stripeClientSecret',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Stripe client secret for this transaction',
      },
    },
    {
      name: 'expiresAt',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Date and time when the transaction will expire',
      },
    },
  ],
  timestamps: true,
} as const

export default Transactions
