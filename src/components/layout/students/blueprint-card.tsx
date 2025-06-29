'use client'

import { Media as MediaComponent } from '@/components/Media'
import { Card, CardContent } from '@/components/ui/card'
import { isMediaObject } from '@/lib/utilities/isMedia'
import { BookOpen, Clock, Download, FileText, Lock, PlayCircle } from 'lucide-react'
import type { Blueprint, Media } from '@/payload-types'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { formatDate } from '@/lib/utilities/formatDateTime'

interface BlueprintCardProps {
  blueprint: Blueprint
}

export function BlueprintCard({ blueprint }: BlueprintCardProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer h-full">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          {blueprint.thumbnail && isMediaObject(blueprint.thumbnail) ? (
            <MediaComponent
              resource={blueprint.thumbnail}
              alt={(blueprint.thumbnail as Media).alt || blueprint.title || ''}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 flex items-center justify-center">
              <Download className="h-12 w-12 text-[#0891B2]/40" />
            </div>
          )}

          <div className="absolute top-4 left-4">
            <Badge
              className={cn('text-xs font-medium bg-green-100 text-green-800 border-green-200')}
            >
              <Download className="h-3 w-3 mr-1" />
              Blueprint
            </Badge>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <Link href={`/blueprints/${blueprint.slug}`} className="block">
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0891B2] transition-colors duration-200 line-clamp-2">
                {blueprint.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{blueprint.description}</p>
            </Link>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <span>{formatDate(blueprint.createdAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
