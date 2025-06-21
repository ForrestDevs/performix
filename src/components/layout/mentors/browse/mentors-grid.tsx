'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { MentorCard } from './mentor-card'
import { MentorGridCard } from './mentor-grid-card'
import { useMentorViewMode } from './view-mode-context'
import { Mentor } from '@/payload-types'

interface EnhancedMentorsGridProps {
  mentors: Mentor[]
}

export function MentorsGrid({ mentors }: EnhancedMentorsGridProps) {
  const { viewMode } = useMentorViewMode()
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  if (mentors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No mentors found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Try adjusting your search criteria or filters to find the perfect mentor for your journey.
        </p>
      </div>
    )
  }

  return (
    <div
      id="mentor-grid"
      data-scroll-animate
      className={`transition-all duration-1000 ${isVisible('mentor-grid') ? 'opacity-100' : 'opacity-0'}`}
    >
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <MentorGridCard key={`mentor-${mentor.id}`} mentor={mentor} index={index} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {mentors.map((mentor, index) => (
            <MentorCard key={`mentor-${mentor.id}`} mentor={mentor} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
