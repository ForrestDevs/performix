import React from 'react'
import Link from 'next/link'
import { Play, Lock, Clock, ChevronRight, Download, Video, ArrowRight } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Lesson } from '@/payload-types'
import { getLessonById } from '@/lib/data/lab'
import { Badge } from '@/components/ui/badge'

interface LessonCardProps {
  lessonId: number
  hasPlan: boolean
  moduleSlug: string
  volumeSlug: string
}

export async function LessonCard({ lessonId, hasPlan, moduleSlug, volumeSlug }: LessonCardProps) {
  const lesson = await getLessonById(lessonId)

  if (!lesson) {
    return null
  }

  const isPreview = lesson.isPreview
  const isAccessible = (hasPlan || isPreview) ?? false

  return (
    <Card
      key={lesson.id}
      className={`overflow-hidden transition-all ${
        isAccessible ? 'hover:shadow-md cursor-pointer' : 'opacity-75'
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isAccessible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
            }`}
          >
            <span className="font-bold">{lesson.order + 1}</span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
              {isPreview && (
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Preview
                </Badge>
              )}
            </div>
            {lesson.subtitle && <p className="text-gray-600 text-sm mb-2">{lesson.subtitle}</p>}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {lesson.estimatedDuration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {lesson.estimatedDuration} min
                </span>
              )}
              {lesson.videos && lesson.videos.length > 0 && (
                <span className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  {lesson.videos.length} video{lesson.videos.length > 1 ? 's' : ''}
                </span>
              )}
              {lesson.downloads && lesson.downloads.length > 0 && (
                <span className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  {lesson.downloads.length} download
                  {lesson.downloads.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          {/* Access Controls */}
          <div className="flex items-center gap-2">
            {isAccessible ? (
              <Button asChild>
                <Link href={`/lab/${moduleSlug}/${volumeSlug}/${lesson.slug}`}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Lesson
                </Link>
              </Button>
            ) : isPreview ? (
              <Button variant="outline" asChild>
                <Link href={`/lab/${moduleSlug}/${volumeSlug}/${lesson.slug}`}>
                  <Play className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Locked</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
