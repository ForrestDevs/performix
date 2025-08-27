import React from 'react'
import Link from 'next/link'
import { Play, Lock, Clock, ChevronRight, Download, Video, ArrowRight, Check } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Lesson } from '@/payload-types'
import { getLessonById, getLessonCompletion } from '@/lib/data/lab'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utilities/ui'

interface LessonCardProps {
  lessonId: number
  hasPlan: boolean
}

export async function LessonCard({ lessonId, hasPlan }: LessonCardProps) {
  const lesson = await getLessonById(lessonId)
  const lessonProgress = await getLessonCompletion(lessonId)

  if (!lesson) {
    return null
  }

  const isPreview = lesson.isPreview
  const isAccessible = (hasPlan || isPreview) ?? false

  return (
    <Card key={lesson.id} className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
      <Link href={`/lab/lesson/${lesson.slug}`} className="block">
        <CardContent className="p-6 hover:bg-gray-50 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{lesson.title}</h3>
                    {isPreview && (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200 flex-shrink-0"
                      >
                        Preview
                      </Badge>
                    )}
                  </div>
                  {lesson.subtitle && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{lesson.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 sm:mb-0">
                {lesson.videos && lesson.videos.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Video className="h-4 w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">
                      {lesson.videos.length} video{lesson.videos.length > 1 ? 's' : ''}
                    </span>
                  </span>
                )}
                {lesson.downloads && lesson.downloads.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Download className="h-4 w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">
                      {lesson.downloads.length} download{lesson.downloads.length > 1 ? 's' : ''}
                    </span>
                  </span>
                )}
              </div>
            </div>

            <div className="sm:flex-shrink-0 flex justify-end">
              {lessonProgress?.completed ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-400">
                  {isAccessible ? <Play className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
