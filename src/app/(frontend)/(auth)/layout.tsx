import React from 'react'
import { getCurrentUser } from '@/lib/data/auth'
import { redirect } from 'next/navigation'
import Header from '@/components/layout/header'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (user) {
    redirect('/')
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
