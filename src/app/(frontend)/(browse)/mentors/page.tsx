import { Suspense } from 'react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { Badge } from '@/components/ui/badge'
import { Users, Star, Award, TrendingUp, Search } from 'lucide-react'
import { mentorsSearchParamsCache } from '@/lib/searchParamsCache'
import { getMentorsWithFilters } from '@/lib/data/mentors'
import { MentorsSearchBar } from '@/components/layout/mentors/browse/mentors-search-bar'
import { MentorsFilters } from '@/components/layout/mentors/browse/mentors-filters'
import { MentorsControls } from '@/components/layout/mentors/browse/mentors-controls'
import { MentorsGrid } from '@/components/layout/mentors/browse/mentors-grid'
import { MentorViewModeProvider } from '@/components/layout/mentors/browse/view-mode-context'

interface BrowseMentorsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/**
 * Server Component for browsing mentors
 */
export default async function BrowseMentorsPage({ searchParams }: BrowseMentorsPageProps) {
  const params = mentorsSearchParamsCache.parse(await searchParams)

  const mentorsData = await getMentorsWithFilters({
    search: params.search,
    position: params.position,
    levelOfPlay: params.levelOfPlay,
    skills: params.skills,
    sports: params.sports,
    featured: params.featured,
    sort: params.sort,
    page: params.page,
    limit: 1000,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-white py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
              <TrendingUp className="h-4 w-4 mr-2" />
              Elite Hockey Mentorship Hub
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-['Space_Grotesk']">
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                Perfect Mentor
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Connect with elite D1+ players and coaches. Get personalized guidance to elevate your
              game and achieve your hockey goals.
            </p>

            <Suspense
              fallback={
                <div className="h-16 bg-gray-100 rounded-xl animate-pulse max-w-2xl mx-auto mb-8" />
              }
            >
              <MentorsSearchBar className="mb-8" />
            </Suspense>

            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 text-sm lg:text-base text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-[#0891B2]" />
                <span>{mentorsData.totalCount} Active Mentors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-[#0891B2]" />
                <span>100% Athlete Improvement</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {mentorsData.filters.positions.map((position) => (
                <Link
                  key={position.value}
                  href={`/mentors?position=${position.value}`}
                  className={cn(
                    'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105',
                    params.position.includes(position.value as 'forward' | 'defence' | 'goalie')
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
                  )}
                >
                  {position.value === 'forward'
                    ? 'Forwards'
                    : position.value === 'defence'
                      ? 'Defence'
                      : position.value === 'goalie'
                        ? 'Goalies'
                        : position.value}{' '}
                  ({position.count})
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#0891B2]/10 to-transparent rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/10 to-transparent rounded-full translate-y-32 -translate-x-32" />
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:hidden mb-6">
            <Suspense fallback={<div className="h-12 bg-gray-100 rounded-lg animate-pulse" />}>
              <MentorsFilters filtersData={mentorsData.filters} isMobile={true} />
            </Suspense>
          </div>

          <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-8">
            <div className="lg:col-span-1 hidden lg:block">
              <Suspense fallback={<div className="h-96 bg-gray-100 rounded-lg animate-pulse" />}>
                <MentorsFilters filtersData={mentorsData.filters} className="sticky top-4" />
              </Suspense>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 xl:col-span-4">
              {(params.search ||
                params.position.length > 0 ||
                params.levelOfPlay.length > 0 ||
                params.skills.length > 0 ||
                params.sports.length > 0 ||
                params.featured !== 'all') && (
                <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Showing {mentorsData.mentors.length} of {mentorsData.totalCount} mentors
                        {params.search && (
                          <span>
                            {' '}
                            for &ldquo;
                            <span className="font-medium text-gray-900">{params.search}</span>
                            &rdquo;
                          </span>
                        )}
                      </p>

                      {/* Active Filters Summary */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {params.position.map((pos) => (
                          <Badge key={pos} variant="secondary" className="text-xs">
                            {pos}
                          </Badge>
                        ))}
                        {params.levelOfPlay.map((level) => (
                          <Badge key={level} variant="secondary" className="text-xs">
                            {level}
                          </Badge>
                        ))}
                        {params.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {params.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{params.skills.length - 3} more skills
                          </Badge>
                        )}
                        {params.featured !== 'all' && (
                          <Badge variant="secondary" className="text-xs">
                            {params.featured}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Link
                      href="/mentors"
                      className="text-sm text-[#0891B2] hover:text-[#0E7490] transition-colors duration-200"
                    >
                      Clear all filters
                    </Link>
                  </div>
                </div>
              )}

              <MentorViewModeProvider>
                <MentorsControls
                  mentorCount={mentorsData.mentors.length}
                  totalCount={mentorsData.totalCount}
                />
                <MentorsGrid mentors={mentorsData.mentors} />
              </MentorViewModeProvider>

              {mentorsData.mentors.length === 0 && (
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No mentors found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We couldn&apos;t find any mentors matching your criteria. Try adjusting your
                    filters or search terms.
                  </p>
                  <Link
                    href="/mentors"
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white',
                    )}
                  >
                    View All Mentors
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#0891B2] to-[#0E7490]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Can&apos;t Find the Perfect Match?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let us help you find the ideal mentor based on your specific goals and preferences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://calendly.com/mateodixon/d1-mentorship-call"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-white text-[#0891B2] hover:bg-gray-100 px-8',
              )}
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/get-started"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-white text-[#0891B2] hover:bg-white hover:text-[#0891B2] px-8',
              )}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
