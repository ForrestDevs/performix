import React from 'react'
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

interface LabSectionProps {
  section: LabSectionType // Lab section data
  hasAccess: boolean
  userId?: number
  className?: string
}

export function LabSection({ section, hasAccess, userId, className }: LabSectionProps) {
  const getContentIcon = (contentType: string) => {
    switch (contentType) {
      case 'modules':
        return <BookOpen className="h-5 w-5" />
      case 'volumes':
        return <Layers className="h-5 w-5" />
      case 'lessons':
        return <Play className="h-5 w-5" />
      case 'mixed':
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

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
      (section.modules && section.modules.length > 0) ||
      (section.volumes && section.volumes.length > 0) ||
      (section.lessons && section.lessons.length > 0)
    )
  }

  if (!hasContent()) return null

  return (
    <section className={cn('space-y-6', className)}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {getContentIcon(section.contentType)}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
            {section.subtitle && <p className="text-lg text-gray-600 mt-1">{section.subtitle}</p>}
          </div>
          <Badge variant="outline" className="ml-auto">
            {getContentTypeLabel(section.contentType)}
          </Badge>
        </div>
      </div>

      <div className="space-y-8">
        {section.modules && section.modules.length > 0 && (
          <div>
            {section.contentType === 'mixed' && (
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Modules
              </h3>
            )}
            <div className={cn('grid gap-6', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
              {section.modules.map((module: Module, index: number) => (
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

        {section.volumes && section.volumes.length > 0 && (
          <div>
            {section.contentType === 'mixed' && (
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Volumes
              </h3>
            )}
            <div className={cn('grid gap-6', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
              {section.volumes.map((volume: Volume, index: number) => (
                <VolumeCard
                  key={volume.id}
                  volume={volume}
                  hasPlan={hasAccess}
                  userId={userId || 0}
                  useDirectRoute
                />
              ))}
            </div>
          </div>
        )}

        {section.lessons && section.lessons.length > 0 && (
          <div>
            {section.contentType === 'mixed' && (
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Play className="h-5 w-5" />
                Lessons
              </h3>
            )}
            <div className={cn('grid gap-4', 'grid-cols-1 md:grid-cols-2')}>
              {section.lessons.map((lesson: Lesson, index: number) => (
                <LessonCard
                  key={lesson.id}
                  lessonId={lesson.id}
                  hasPlan={hasAccess}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
