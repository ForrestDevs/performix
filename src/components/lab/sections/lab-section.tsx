import React, { Suspense } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ModuleCard } from '@/components/lab/modules/module-card'
import { VolumeCard } from '@/components/lab/volumes/volume-card'
import { LessonCard } from '@/components/lab/lessons/lesson-card'
import { ChevronRight, Play, BookOpen, Layers, FileText } from 'lucide-react'
import { cn } from '@/lib/utilities/ui'
import RichText from '@/components/RichText'
import { LabSection as LabSectionType, Lesson, Module, Volume } from '@/payload-types'
import { VolumeLoadingCard } from '../volumes/loading-card'
import { getLabSectionContent } from '@/lib/data/lab'

interface LabSectionProps {
  section: Pick<LabSectionType, 'id' | 'title' | 'subtitle'> // Lab section data
  hasAccess: boolean
  userId?: number
  className?: string
}

export async function LabSection({ section, hasAccess, userId, className }: LabSectionProps) {
  const content = await getLabSectionContent(section.id)

  if (!content) return null

  const getContentTypeLabel = (contentType: string) => {
    switch (contentType) {
      case 'modules':
        return 'Modules'
      case 'volumes':
        return 'Volumes'
      case 'lessons':
        return 'Lessons'
      case 'mixed':
        return 'Mixed Content'
      default:
        return 'Content'
    }
  }

  const hasContent = () => {
    return (
      (content.modules && content.modules.length > 0) ||
      (content.volumes && content.volumes.length > 0) ||
      (content.lessons && content.lessons.length > 0)
    )
  }

  if (!hasContent()) return null

  return (
    <section className={cn('space-y-6', className)}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
            {section.subtitle && <p className="text-lg text-gray-600 mt-1">{section.subtitle}</p>}
          </div>
          <Badge variant="outline" className="ml-auto">
            {getContentTypeLabel(content.contentType)}
          </Badge>
        </div>
      </div>

      <div className="space-y-8">
        {content.modules && content.modules.length > 0 && (
          <div>
            {content.contentType === 'mixed' && (
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Modules
              </h3>
            )}
            <div className={cn('grid gap-6', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
              {content.modules.map((module: Module, index: number) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  hasPlan={hasAccess}
                  userId={userId || 0}
                />
              ))}
            </div>
          </div>
        )}

        {content.volumes && content.volumes.length > 0 && (
          <div>
            {content.contentType === 'mixed' && (
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Volumes
              </h3>
            )}
            <div className={cn('grid gap-6', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
              {content.volumes.map((volume: Volume, index: number) => (
                <Suspense key={volume.id} fallback={<VolumeLoadingCard />}>
                  <VolumeCard
                    key={volume.id}
                    slug={volume.slug || ''}
                    hasPlan={hasAccess}
                    userId={userId || 0}
                    useDirectRoute
                  />
                </Suspense>
              ))}
            </div>
          </div>
        )}

        {content.lessons && content.lessons.length > 0 && (
          <div>
            {content.contentType === 'mixed' && (
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Play className="h-5 w-5" />
                Lessons
              </h3>
            )}
            <div className={cn('grid gap-4', 'grid-cols-1 md:grid-cols-2')}>
              {content.lessons.map((lesson: Lesson, index: number) => (
                <div key={index}>
                  <LessonCard key={lesson.id} lessonId={lesson.id} hasPlan={hasAccess} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
