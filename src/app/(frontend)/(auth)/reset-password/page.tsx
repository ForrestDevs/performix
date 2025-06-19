import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React, { Suspense } from 'react'

import { ResetPasswordForm } from './reset-form.client'

export default function ResetPassword() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">Please enter a new password below to secure your account.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <Suspense
            fallback={
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0891B2]"></div>
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Reset Password | Performix',
    description: 'Enter a new password.',
    openGraph: mergeOpenGraph({
      title: 'Reset Password',
      url: '/reset-password',
    }),
  }
}
