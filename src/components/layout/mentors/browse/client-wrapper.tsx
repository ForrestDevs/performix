'use client'

import { SearchAndFilters } from './search-and-filters'
import { MentorsControls } from './mentors-controls'
import { MentorsGrid } from './mentors-grid'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

interface ClientWrapperProps {
  mentors: any[]
  searchParams: {
    q?: string
    position?: string
    view?: string
    sort?: string
  }
}

export function ClientWrapper({ mentors, searchParams }: ClientWrapperProps) {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <>
      <section className="relative bg-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SearchAndFilters mentorCount={mentors.length} />
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MentorsControls mentorCount={mentors.length} />
          <MentorsGrid mentors={mentors} isVisible={isVisible} />
        </div>
      </section>
    </>
  )
}
