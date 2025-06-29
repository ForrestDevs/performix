'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

const pathToTitle = {
  '/': 'Home',
  '/mentors': 'Mentors',
  '/plans': 'Plans',
  '/testimonials': 'Testimonials',
  '/contact': 'Contact',
}

export default function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const title = segments
    .map((segment) => pathToTitle[segment as keyof typeof pathToTitle])
    .join(' / ')

  return (
    segments.length > 1 && (
      <>
        <ChevronRight className="h-4 w-4 text-gray-400" />
        <span className="text-gray-600">{title}</span>
      </>
    )
  )
}
