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

interface ResourceListCardProps {
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

export function ResourceListCard({ resource, showLeadMagnet }: ResourceListCardProps) {
  const isGated = showLeadMagnet && resource.isPaid

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start space-x-6">
          <div className="relative w-32 h-24 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-lg overflow-hidden flex-shrink-0">
            {resource.thumbnail && isMediaObject(resource.thumbnail) ? (
              <MediaComponent
                resource={resource.thumbnail}
                alt={(resource.thumbnail as Media).alt || resource.title}
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

                <Link href={resource.url}>
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                {resource.readTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{resource.readTime} min</span>
                  </div>
                )}
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
