import Header from '@/components/layout/header'
import React from 'react'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
