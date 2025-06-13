import React from 'react'
import { getCurrentUser } from '@/lib/data/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (user) {
    redirect('/')
  }

  return <div>{children}</div>
}
