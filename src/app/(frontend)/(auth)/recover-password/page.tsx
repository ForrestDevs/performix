import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React from 'react'

import { RecoverPasswordForm } from './recover-form.client'

export default async function RecoverPassword() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background">
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="border-0 shadow-2xl rounded-lg bg-white">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Recover Password</h1>
                  <p className="text-gray-600">
                    Enter your email address to recover your password.
                  </p>
                </div>
                <RecoverPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: 'Recover Password | Performix',
//     description: 'Enter your email address to recover your password.',
//     openGraph: mergeOpenGraph({
//       title: 'Recover Password',
//       url: '/recover-password',
//     }),
//   }
// }
