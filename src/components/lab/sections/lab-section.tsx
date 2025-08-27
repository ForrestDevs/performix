import React, { Suspense } from 'react'
import { Badge } from '@/components/ui/badge'
import { ModuleCard } from '@/components/lab/modules/module-card'
import { VolumeCard } from '@/components/lab/volumes/volume-card'
import { LessonCard } from '@/components/lab/lessons/lesson-card'
import { Play, BookOpen, Layers } from 'lucide-react'
import { cn } from '@/lib/utilities/ui'
import { LabSection as LabSectionType } from '@/payload-types'
import { VolumeLoadingCard } from '../volumes/loading-card'
import { ModuleLoadingCard } from '../modules/loading-card'
import { LessonLoadingCard } from '../lessons/lesson-card-skeleton'

interface LabSectionProps {
  section: LabSectionType
  hasAccess: boolean
  className?: string
}

export async function LabSection({ section, hasAccess, className }: LabSectionProps) {
  if (section.content === null || section.content === undefined || section.content.length === 0)
    return null

  const moduleIds = section.content
    .filter((item) => item.relationTo === 'modules')
    .map((item) => (typeof item.value === 'object' ? item.value.id : item.value))
  const volumeIds = section.content
    .filter((item) => item.relationTo === 'volumes')
    .map((item) => (typeof item.value === 'object' ? item.value.id : item.value))
  const lessonIds = section.content
    .filter((item) => item.relationTo === 'lessons')
    .map((item) => (typeof item.value === 'object' ? item.value.id : item.value))

  const getContentTypeLabel = () => {
    const hasModules = moduleIds && moduleIds.length > 0
    const hasVolumes = volumeIds && volumeIds.length > 0
    const hasLessons = lessonIds && lessonIds.length > 0

    if (hasModules && hasVolumes && hasLessons) {
      return 'Mixed Content'
    }

    if (hasModules) {
      return 'Modules'
    }

    if (hasVolumes) {
      return 'Volumes'
    }

    if (hasLessons) {
      return 'Lessons'
    }

    return null
  }

  return (
    <section className={cn('space-y-6', className)}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
            {section.subtitle && <p className="text-lg text-gray-600 mt-1">{section.subtitle}</p>}
          </div>
          <Badge variant="outline" className="ml-auto">
            {getContentTypeLabel()}
          </Badge>
        </div>
      </div>

      <div className="space-y-8">
        {moduleIds && moduleIds.length > 0 && (
          <div>
            {getContentTypeLabel() === 'Mixed Content' && (
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Modules
              </h3>
            )}
            <div className={cn('grid gap-6', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
              {moduleIds.map((moduleId: number, index: number) => (
                <Suspense key={index} fallback={<ModuleLoadingCard />}>
                  <ModuleCard moduleId={moduleId} hasPlan={hasAccess} />
                </Suspense>
              ))}
            </div>
          </div>
        )}

        {volumeIds && volumeIds.length > 0 && (
          <div>
            {getContentTypeLabel() === 'Mixed Content' && (
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Volumes
              </h3>
            )}
            <div className={cn('grid gap-6', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
              {volumeIds.map((volumeId: number, index: number) => (
                <Suspense key={index} fallback={<VolumeLoadingCard />}>
                  <VolumeCard volumeId={volumeId} hasPlan={hasAccess} />
                </Suspense>
              ))}
            </div>
          </div>
        )}

        {lessonIds && lessonIds.length > 0 && (
          <div>
            {getContentTypeLabel() === 'Mixed Content' && (
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Play className="h-5 w-5" />
                Lessons
              </h3>
            )}
            <div className={cn('grid gap-4', 'grid-cols-1 md:grid-cols-2')}>
              {lessonIds.map((lessonId: number, index: number) => (
                <Suspense key={index} fallback={<LessonLoadingCard />}>
                  <LessonCard lessonId={lessonId} hasPlan={hasAccess} />
                </Suspense>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
