import { Suspense } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Star, Eye, Users, TrendingUp, Filter } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utilities/ui'
import { resourcesSearchParamsCache } from '@/lib/searchParamsCache'
import { getResources, getResourcesTags } from '@/lib/data/resources'
import EnhancedResourcesSearch from '@/components/layout/resources/enhanced-resources-search'
import EnhancedResourcesFilters from '@/components/layout/resources/enhanced-resources-filters'
import { ResourcesPagination, ResourcesClientWrapper } from '@/components/layout/resources'

interface ResourcesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const params = resourcesSearchParamsCache.parse(await searchParams)

  // Fetch data in parallel
  const [resourcesResult, tags] = await Promise.all([
    getResources({
      search: params.search,
      tags: params.tags,
      types: params.types,
      access: params.access,
      page: params.page,
      sort: params.sort,
      limit: 12,
    }),
    getResourcesTags(),
  ])

  const { resources, totalCount, totalPages, currentPage, pageSize, counts } = resourcesResult

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-white py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
              <TrendingUp className="h-4 w-4 mr-2" />
              Ultimate Hockey Resource Hub
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-['Space_Grotesk']">
              Master Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                Hockey Journey
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Access premium articles, training blueprints, and courses from D1+ mentors. Everything
              you need to take your game to the next level.
            </p>

            <Suspense
              fallback={
                <div className="h-16 bg-gray-100 rounded-xl animate-pulse max-w-2xl mx-auto mb-8" />
              }
            >
              <EnhancedResourcesSearch className="mb-8" />
            </Suspense>

            {/* <div className="flex flex-wrap justify-center gap-6 lg:gap-8 text-sm lg:text-base text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-[#0891B2]" />
                <span>{counts.total} Resources</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-[#0891B2]" />
                <span>5,000+ Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>4.9 Average Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-[#0891B2]" />
                <span>50K+ Monthly Views</span>
              </div>
            </div> */}

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={`/resources?types=article`}
                className={cn(
                  'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105',
                  params.types.includes('article')
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
                )}
              >
                Articles ({counts.articles})
              </Link>
              <Link
                href={`/resources?types=blueprint`}
                className={cn(
                  'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105',
                  params.types.includes('blueprint')
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-green-50 text-green-700 hover:bg-green-100',
                )}
              >
                Blueprints ({counts.blueprints})
              </Link>
              <Link
                href={`/resources?types=course`}
                className={cn(
                  'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105',
                  params.types.includes('course')
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100',
                )}
              >
                Courses ({counts.courses})
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#0891B2]/10 to-transparent rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/10 to-transparent rounded-full translate-y-32 -translate-x-32" />
      </section>

      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:hidden mb-6">
            <Suspense fallback={<div className="h-12 bg-gray-100 rounded-lg animate-pulse" />}>
              <EnhancedResourcesFilters tags={tags} counts={counts} isMobile={true} />
            </Suspense>
          </div>

          <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-8">
            <div className="lg:col-span-1 hidden lg:block">
              <Suspense fallback={<div className="h-96 bg-gray-100 rounded-lg animate-pulse" />}>
                <EnhancedResourcesFilters tags={tags} counts={counts} className="sticky top-4" />
              </Suspense>
            </div>

            <div className="lg:col-span-3 xl:col-span-4">
              {(params.search ||
                params.tags.length > 0 ||
                params.types.length > 0 ||
                params.access !== 'all') && (
                <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Showing {resources.length} of {totalCount} resources
                        {params.search && (
                          <span>
                            {' '}
                            for &ldquo;
                            <span className="font-medium text-gray-900">{params.search}</span>
                            &rdquo;
                          </span>
                        )}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {params.types.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                        {params.access !== 'all' && (
                          <Badge variant="secondary" className="text-xs">
                            {params.access}
                          </Badge>
                        )}
                        {params.tags.slice(0, 3).map((tag) => {
                          const tagObj = tags.find((t) => (t.slug || t.id.toString()) === tag)
                          return tagObj ? (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tagObj.title}
                            </Badge>
                          ) : null
                        })}
                        {params.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{params.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Link
                      href="/resources"
                      className="text-sm text-[#0891B2] hover:text-[#0E7490] transition-colors duration-200"
                    >
                      Clear all filters
                    </Link>
                  </div>
                </div>
              )}

              <ResourcesClientWrapper
                resources={resources}
                totalCount={totalCount}
                showLeadMagnet={true}
              />

              {totalPages > 1 && (
                <Suspense
                  fallback={<div className="h-16 bg-gray-100 rounded-lg animate-pulse mt-8" />}
                >
                  <ResourcesPagination
                    totalPages={totalPages}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    pageSize={pageSize}
                  />
                </Suspense>
              )}

              {resources.length > 0 && totalPages > currentPage && (
                <div className="text-center mt-12 lg:hidden">
                  <Link
                    href={`/resources?${new URLSearchParams({
                      ...Object.fromEntries(
                        Object.entries(params).map(([key, value]) => [
                          key,
                          Array.isArray(value) ? value.join(',') : value.toString(),
                        ]),
                      ),
                      page: (currentPage + 1).toString(),
                    }).toString()}`}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white px-8',
                    )}
                  >
                    Load More Resources
                  </Link>
                </div>
              )}

              {resources.length === 0 && (
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No resources found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We couldn&apos;t find any resources matching your criteria. Try adjusting your
                    filters or search terms.
                  </p>
                  <Link
                    href="/resources"
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white',
                    )}
                  >
                    View All Resources
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
            Ready to Accelerate Your Hockey Development?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get personalized mentorship from elite players and coaches who&apos;ve played at the
            highest levels
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mentors"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-white text-[#0891B2] hover:bg-gray-100 px-8',
              )}
            >
              Find Your Mentor
            </Link>
            <Link
              href="/get-started"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-white text-[#0891B2] hover:text-[#0891B2] px-8',
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
