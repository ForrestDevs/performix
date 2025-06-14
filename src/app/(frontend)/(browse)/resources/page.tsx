import { Suspense } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Star, Eye } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utilities/ui'
import { resourcesSearchParamsCache } from '@/lib/searchParamsCache'
import { getArticles, getArticleTags } from '@/lib/data/articles'
import {
  ResourcesSearch,
  ResourcesFilters,
  ResourcesGrid,
  ResourcesPagination,
  ResourcesViewControls,
} from '@/components/layout/resources'

interface ResourcesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const params = resourcesSearchParamsCache.parse(await searchParams)

  // Fetch data in parallel
  const [articlesResult, tags] = await Promise.all([
    getArticles({
      search: params.search,
      tags: params.tags,
      page: params.page,
      sort: params.sort,
      limit: 12,
    }),
    getArticleTags(),
  ])

  const { articles, totalCount, totalPages, currentPage, pageSize } = articlesResult

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
              The Path to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                Elite Performance
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Insights, tips, and stories from D1+ mentors and athletes to accelerate your hockey
              development
            </p>

            {/* Search Bar */}
            <Suspense
              fallback={
                <div className="h-16 bg-gray-100 rounded-xl animate-pulse max-w-2xl mx-auto mb-8" />
              }
            >
              <ResourcesSearch />
            </Suspense>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {tags.slice(0, 6).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="px-4 py-2 cursor-pointer hover:bg-[#0891B2] hover:text-white hover:border-[#0891B2] transition-all duration-300 hover:scale-105"
                >
                  {tag.title}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-[#0891B2]" />
                <span>{totalCount} Articles & Guides</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>4.9 Average Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-[#0891B2]" />
                <span>50K+ Monthly Views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse" />}>
                <ResourcesFilters tags={tags} className="sticky top-4" />
              </Suspense>
            </div>

            {/* Main Articles */}
            <div className="lg:col-span-3">
              {/* Controls */}
              <Suspense
                fallback={<div className="h-16 bg-gray-100 rounded-lg animate-pulse mb-8" />}
              >
                <ResourcesViewControls totalCount={totalCount} />
              </Suspense>

              {/* Articles Grid/List */}
              <Suspense fallback={<div className="h-96 bg-gray-100 rounded-lg animate-pulse" />}>
                <ResourcesGrid articles={articles} viewMode={params.view} />
              </Suspense>

              {/* Pagination */}
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

              {/* Load More Button for smaller screens */}
              {articles.length > 0 && totalPages > currentPage && (
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
                    Load More Articles
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0891B2] to-[#0E7490]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Take Your Game to the Next Level?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Connect with elite mentors who can provide personalized guidance for your hockey journey
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
          </div>
        </div>
      </section>
    </div>
  )
}
