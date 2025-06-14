'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Heart, BookOpen } from 'lucide-react'
import { Media } from '@/components/Media'
import type { Article, Media as MediaType } from '@/payload-types'

interface ResourcesGridProps {
  articles: Article[]
  viewMode?: 'grid' | 'list'
}

export default function ResourcesGrid({ articles, viewMode = 'grid' }: ResourcesGridProps) {
  const [favoriteIds, setFavoriteIds] = useState(new Set<string>())

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const getReadTime = (content: any): number => {
    // Simple read time calculation based on content
    const text = JSON.stringify(content)
    const wordsPerMinute = 200
    const wordCount = text.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  // Type guard for media objects
  const isMediaObject = (media: any): media is MediaType => {
    return typeof media === 'object' && media !== null && 'url' in media
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative w-32 h-24 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-lg overflow-hidden flex-shrink-0">
                    {article.meta?.image && isMediaObject(article.meta.image) ? (
                      <Media
                        resource={article.meta.image}
                        alt={article.meta.image.alt || article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-[#0891B2]/40" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {article.tags?.map((tag) => {
                            if (typeof tag === 'object' && tag !== null) {
                              return (
                                <Badge key={tag.id} variant="outline" className="text-xs">
                                  {tag.title}
                                </Badge>
                              )
                            }
                            return null
                          })}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0891B2] transition-colors duration-200">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{article.meta?.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          toggleFavorite(article.id.toString())
                        }}
                        className="p-2"
                      >
                        <Heart
                          className={`h-5 w-5 transition-colors duration-200 ${
                            favoriteIds.has(article.id.toString())
                              ? 'text-red-500 fill-current'
                              : 'text-gray-400'
                          }`}
                        />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {article.populatedAuthors?.[0] && (
                            <span className="text-sm text-gray-600">
                              {article.populatedAuthors[0].name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{getReadTime(article.content)} min</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {article.publishedAt
                          ? formatDate(article.publishedAt)
                          : formatDate(article.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Link key={article.id} href={`/articles/${article.slug}`}>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer h-full">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                {article.meta?.image && isMediaObject(article.meta.image) ? (
                  <Media
                    resource={article.meta.image}
                    alt={article.meta.image.alt || article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-[#0891B2]/40" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      toggleFavorite(article.id.toString())
                    }}
                    className="p-1 bg-white/80 hover:bg-white"
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors duration-200 ${
                        favoriteIds.has(article.id.toString())
                          ? 'text-red-500 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  </Button>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags?.slice(0, 2).map((tag) => {
                    if (typeof tag === 'object' && tag !== null) {
                      return (
                        <Badge key={tag.id} variant="outline" className="text-xs">
                          {tag.title}
                        </Badge>
                      )
                    }
                    return null
                  })}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0891B2] transition-colors duration-200 flex-1">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {article.meta?.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {article.populatedAuthors?.[0] && (
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {article.populatedAuthors[0].name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{getReadTime(article.content)} min</span>
                    </div>
                  </div>
                  <span>
                    {article.publishedAt
                      ? formatDate(article.publishedAt)
                      : formatDate(article.createdAt)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
