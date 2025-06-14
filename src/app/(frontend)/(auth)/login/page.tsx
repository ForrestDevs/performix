import React from 'react'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Login | Performix',
    description: 'Login or create an account to get started.',
  }
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
        <p className="text-center text-gray-600">Login functionality coming soon...</p>
      </div>
    </div>
  )
}
