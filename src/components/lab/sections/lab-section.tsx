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
    <section
      className={cn(
        "relative group rounded-3xl border border-gray-200 bg-white/90 shadow-[0_2px_16px_0_rgba(69,126,235,0.06)] px-6 sm:px-10 py-10 sm:py-14 mb-3 transition-all duration-400 hover:shadow-[0_8px_32px_0_rgba(52,120,245,0.07)]",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-6 pb-4 border-b border-gray-100">
        <div className="flex-1">
          <h2 className="text-[2rem] sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-2 drop-shadow-sm select-none leading-tight">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-lg sm:text-xl text-gray-500 font-medium mt-0.5 mb-1">
              {section.subtitle}
            </p>
          )}
        </div>
        <Badge
          variant="secondary"
          className="ml-0 sm:ml-auto px-4 py-1.5 rounded-full text-base font-semibold bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 text-blue-700 border-0 shadow-sm shadow-blue-100/50"
        >
          {getContentTypeLabel()}
        </Badge>
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
