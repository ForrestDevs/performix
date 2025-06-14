'use client'

import { Mentor } from '@/payload-types'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { cn } from '@/lib/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import { MentorCard } from './mentor-card'

export function FeaturedMentorsClient({ mentors }: { mentors: Mentor[] }) {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <section id="mentors" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="mentors-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('mentors-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet Your Future Mentors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from elite athletes who&apos;ve achieved what you&apos;re working toward
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mentors.map((mentor, index) => (
            <MentorCard key={mentor.id} mentor={mentor} index={index} isVisible={isVisible} />
          ))}
        </div>
        <div
          id="mentors-cta"
          data-scroll-animate
          className={`text-center transition-all duration-1000 ${
            isVisible('mentors-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href="/mentors"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8',
            )}
          >
            Browse All Mentors
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
