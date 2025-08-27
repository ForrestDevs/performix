'use client'

import { createAuthClient } from 'better-auth/react'
import { stripeClient } from '@better-auth/stripe/client'

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}`,
  fetchOptions: {
    onRequest(e) {
      console.log('onRequest', e, new Date().toISOString())
    },
    onError(e) {
      if (e.error.status === 429) {
        console.log('onError', e, new Date().toISOString())
        // toast.error('Too many requests. Please try again later.')
      }
    },
  },
  plugins: [stripeClient()],
})
