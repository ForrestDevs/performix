'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { MentorCard } from './mentor-card'
import { MentorGridCard } from './mentor-grid-card'
import { useQueryState } from 'nuqs'

interface MentorsGridProps {
  mentors: any[]
  isVisible: (id: string) => boolean
}

export function MentorsGrid({ mentors, isVisible }: MentorsGridProps) {
  const [viewMode] = useQueryState('view', { defaultValue: 'grid' })

  return (
    <div
      id="mentor-grid"
      data-scroll-animate
      className={`transition-all duration-1000 ${isVisible('mentor-grid') ? 'opacity-100' : 'opacity-0'}`}
    >
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <MentorGridCard key={mentor.id} mentor={mentor} index={index} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {mentors.map((mentor, index) => (
            <MentorCard key={mentor.id} mentor={mentor} isVisible={isVisible} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
