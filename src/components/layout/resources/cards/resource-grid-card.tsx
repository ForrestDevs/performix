'use client'

import { Media as MediaComponent } from '@/components/Media'
import { Card, CardContent } from '@/components/ui/card'
import { Resource } from '@/lib/types/resources'
import { isMediaObject } from '@/lib/utilities/isMedia'
import { BookOpen, Clock, Download, FileText, Lock, PlayCircle } from 'lucide-react'
import type { Media } from '@/payload-types'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { formatDate } from '@/lib/utilities/formatDateTime'

interface ResourceGridCardProps {
  resource: Resource
  showLeadMagnet: boolean
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

export function ResourceGridCard({ resource, showLeadMagnet }: ResourceGridCardProps) {
  const isGated = showLeadMagnet && resource.isPaid

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer h-full">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          {resource.thumbnail && isMediaObject(resource.thumbnail) ? (
            <MediaComponent
              resource={resource.thumbnail}
              alt={(resource.thumbnail as Media).alt || resource.title}
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
          </div>

          {resource.isPaid && (
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-green-500 text-white">${resource.price || 0}</Badge>
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <Link href={resource.url} className="block">
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
            </div>
            <span>{formatDate(resource.publishedAt || resource.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
