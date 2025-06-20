'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Clock,
  Heart,
  BookOpen,
  FileText,
  PlayCircle,
  Lock,
  Star,
  Download,
  Users,
  Eye,
} from 'lucide-react'
import { Media } from '@/components/Media'
import type { UnifiedResource } from '@/lib/data/resources'
import { cn } from '@/lib/utilities/ui'
import { useResourceViewMode } from './view-mode-context'

interface UnifiedResourcesGridProps {
  resources: UnifiedResource[]
  showLeadMagnet?: boolean
}

export default function UnifiedResourcesGrid({
  resources,
  showLeadMagnet = false,
}: UnifiedResourcesGridProps) {
  const [favoriteIds, setFavoriteIds] = useState(new Set<string>())
  const { viewMode } = useResourceViewMode()

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

  const getResourceIcon = (type: string, className = 'h-4 w-4') => {
    switch (type) {
      case 'article':
        return <FileText className={className} />
      case 'blueprint':
        return <Download className={className} />
      case 'course':
        return <PlayCircle className={className} />
      default:
        return <BookOpen className={className} />
    }
  }

  const getResourceTypeLabel = (type: string) => {
    switch (type) {
      case 'article':
        return 'Article'
      case 'blueprint':
        return 'Blueprint'
      case 'course':
        return 'Course'
      default:
        return 'Resource'
    }
  }

  const getResourceTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'blueprint':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'course':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Type guard for media objects
  const isMediaObject = (media: any) => {
    return typeof media === 'object' && media !== null && 'url' in media
  }

  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {resources.map((resource) => (
          <ResourceListCard
            key={`${resource.type}-${resource.id}`}
            resource={resource}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            formatDate={formatDate}
            getResourceIcon={getResourceIcon}
            getResourceTypeLabel={getResourceTypeLabel}
            getResourceTypeColor={getResourceTypeColor}
            isMediaObject={isMediaObject}
            showLeadMagnet={showLeadMagnet}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {resources.map((resource) => (
        <ResourceGridCard
          key={`${resource.type}-${resource.id}`}
          resource={resource}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          formatDate={formatDate}
          getResourceIcon={getResourceIcon}
          getResourceTypeLabel={getResourceTypeLabel}
          getResourceTypeColor={getResourceTypeColor}
          isMediaObject={isMediaObject}
          showLeadMagnet={showLeadMagnet}
        />
      ))}
    </div>
  )
}

interface ResourceCardProps {
  resource: UnifiedResource
  favoriteIds: Set<string>
  onToggleFavorite: (id: string) => void
  formatDate: (date: string) => string
  getResourceIcon: (type: string, className?: string) => React.ReactNode
  getResourceTypeLabel: (type: string) => string
  getResourceTypeColor: (type: string) => string
  isMediaObject: (media: any) => boolean
  showLeadMagnet: boolean
}

function ResourceGridCard({
  resource,
  favoriteIds,
  onToggleFavorite,
  formatDate,
  getResourceIcon,
  getResourceTypeLabel,
  getResourceTypeColor,
  isMediaObject,
  showLeadMagnet,
}: ResourceCardProps) {
  const isGated = showLeadMagnet && resource.isPaid

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer h-full">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          {resource.thumbnail && isMediaObject(resource.thumbnail) ? (
            <Media
              resource={resource.thumbnail}
              alt={resource.thumbnail.alt || resource.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 flex items-center justify-center">
              {getResourceIcon(resource.type, 'h-12 w-12 text-[#0891B2]/40')}
            </div>
          )}

          {/* Overlays */}
          <div className="absolute top-4 left-4">
            <Badge className={cn('text-xs font-medium', getResourceTypeColor(resource.type))}>
              {getResourceIcon(resource.type, 'h-3 w-3 mr-1')}
              {getResourceTypeLabel(resource.type)}
            </Badge>
          </div>

          <div className="absolute top-4 right-4 flex space-x-2">
            {isGated && (
              <div className="p-1 bg-yellow-500 rounded-full">
                <Lock className="h-3 w-3 text-white" />
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onToggleFavorite(resource.id)
              }}
              className="p-1 bg-white/80 hover:bg-white"
            >
              <Heart
                className={`h-4 w-4 transition-colors duration-200 ${
                  favoriteIds.has(resource.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                }`}
              />
            </Button>
          </div>

          {resource.isPaid && (
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-green-500 text-white">${resource.price || 0}</Badge>
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <Link href={isGated ? '#' : resource.url} className="block">
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0891B2] transition-colors duration-200 line-clamp-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
            </Link>

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {resource.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{resource.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              {resource.readTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{resource.readTime} min</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span>4.8</span>
              </div>
            </div>
            <span>{formatDate(resource.publishedAt || resource.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ResourceListCard({
  resource,
  favoriteIds,
  onToggleFavorite,
  formatDate,
  getResourceIcon,
  getResourceTypeLabel,
  getResourceTypeColor,
  isMediaObject,
  showLeadMagnet,
}: ResourceCardProps) {
  const isGated = showLeadMagnet && resource.isPaid

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start space-x-6">
          <div className="relative w-32 h-24 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-lg overflow-hidden flex-shrink-0">
            {resource.thumbnail && isMediaObject(resource.thumbnail) ? (
              <Media
                resource={resource.thumbnail}
                alt={resource.thumbnail.alt || resource.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                {getResourceIcon(resource.type, 'h-8 w-8 text-[#0891B2]/40')}
              </div>
            )}

            {isGated && (
              <div className="absolute top-2 right-2 p-1 bg-yellow-500 rounded-full">
                <Lock className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={cn('text-xs font-medium', getResourceTypeColor(resource.type))}>
                    {getResourceIcon(resource.type, 'h-3 w-3 mr-1')}
                    {getResourceTypeLabel(resource.type)}
                  </Badge>
                  {resource.isPaid && (
                    <Badge className="bg-green-500 text-white text-xs">
                      ${resource.price || 0}
                    </Badge>
                  )}
                </div>

                <Link href={isGated ? '#' : resource.url}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0891B2] transition-colors duration-200">
                    {resource.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-3">{resource.description}</p>

                {/* Tags */}
                {resource.tags && resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {resource.tags.slice(0, 4).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{resource.tags.length - 4}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  onToggleFavorite(resource.id)
                }}
                className="p-2"
              >
                <Heart
                  className={`h-5 w-5 transition-colors duration-200 ${
                    favoriteIds.has(resource.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                  }`}
                />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                {resource.readTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{resource.readTime} min</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>1.2k views</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {formatDate(resource.publishedAt || resource.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
