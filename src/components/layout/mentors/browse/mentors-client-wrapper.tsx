'use client'

import { MentorViewModeProvider } from './view-mode-context'
import { EnhancedMentorsSearch } from './enhanced-mentors-search'
import { EnhancedMentorsFilters } from './enhanced-mentors-filters'
import { EnhancedMentorsControls } from './enhanced-mentors-controls'
import { EnhancedMentorsGrid } from './enhanced-mentors-grid'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { MentorsResponse } from '@/lib/data/mentors'
import { Badge } from '@/components/ui/badge'
import { Users, Star, Award } from 'lucide-react'

interface MentorsClientWrapperProps {
  mentorsData: MentorsResponse
}

export function MentorsClientWrapper({ mentorsData }: MentorsClientWrapperProps) {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <MentorViewModeProvider>
      {/* Hero Section with Search */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#0891B2]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                Perfect Mentor
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Browse elite D1+ players ready to guide your journey to excellence
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <EnhancedMentorsSearch />
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {mentorsData.filters.positions.map((position) => (
                <Badge
                  key={position.value}
                  variant="outline"
                  className="px-4 py-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[#0891B2] hover:text-white hover:border-[#0891B2]"
                >
                  {position.value === 'forward'
                    ? 'Forwards'
                    : position.value === 'defence'
                      ? 'Defence'
                      : position.value === 'goalie'
                        ? 'Goalies'
                        : position.value}{' '}
                  ({position.count})
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-[#0891B2]" />
                <span>{mentorsData.totalCount} Active Mentors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>4.9 Average Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-[#0891B2]" />
                <span>100% Athlete Improvement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <EnhancedMentorsFilters filtersData={mentorsData.filters} />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filters and Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                {/* Mobile Filters Button */}
                <div className="lg:hidden">
                  <EnhancedMentorsFilters filtersData={mentorsData.filters} isMobile />
                </div>

                {/* Controls for both mobile and desktop */}
                <div className="w-full lg:w-auto">
                  <EnhancedMentorsControls
                    mentorCount={mentorsData.mentors.length}
                    totalCount={mentorsData.totalCount}
                  />
                </div>
              </div>

              {/* Mentors Grid */}
              <EnhancedMentorsGrid mentors={mentorsData.mentors} isVisible={isVisible} />

              {/* Load More */}
              {mentorsData.hasMore && (
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                    Showing {mentorsData.mentors.length} of {mentorsData.totalCount} mentors
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MentorViewModeProvider>
  )
}
