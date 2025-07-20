import React, { Suspense } from 'react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  Play,
  Lock,
  Download,
  Clock,
  ChevronRight,
  CheckCircle,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  getLessonBySlug,
  getLessonBySlugDirect,
  getLessonCompletion,
  getVolumeBySlug,
} from '@/lib/data/lab'
import { isEnrolledInAnyPlan } from '@/lib/data/plans'
import { getCurrentUser } from '@/lib/data/auth'
import RichText from '@/components/RichText2'
import { CompleteLessonButton } from '@/components/lab/lessons/complete-lesson-button'
import { LabBreadcrumb } from '@/components/lab/lab-breadcrumb'
import { VideoCard } from '@/components/lab/video-card'
import { Media, Video } from '@/payload-types'
import { DownloadCard } from '@/components/lab/download-card'

interface DirectLessonPageProps {
  params: Promise<{
    lessonSlug: string
  }>
}

export async function generateMetadata(props: DirectLessonPageProps) {
  const params = await props.params
  const lesson = await getLessonBySlugDirect(params.lessonSlug)

  if (!lesson) {
    return {
      title: 'Lesson Not Found | Performix Lab',
    }
  }

  return {
    title: `${lesson.title} | Performix Lab`,
    description: lesson.subtitle,
  }
}

export default async function DirectLessonPage(props: DirectLessonPageProps) {
  const params = await props.params
  const [lesson, user] = await Promise.all([
    getLessonBySlugDirect(params.lessonSlug),
    getCurrentUser(),
  ])

  if (!lesson) {
    notFound()
  }

  const lessonProgress = await getLessonCompletion(lesson.id)
  const hasAccess = user ? await isEnrolledInAnyPlan(user.id) : false
  const canViewLesson = hasAccess || lesson.isPreview
  const volume = lesson.volume && typeof lesson.volume === 'object' ? lesson.volume : null
  const labModule = lesson.module && typeof lesson.module === 'object' ? lesson.module : null

  return (
    <div className="min-h-screen bg-gray-50">
      <LabBreadcrumb
        title={lesson.title}
        currentPage={{ type: 'lesson', slug: lesson.slug || '' }}
        {...(labModule && {
          module: {
            title: labModule?.title || '',
            slug: labModule?.slug || '',
          },
        })}
        {...(volume && {
          volume: {
            title: volume?.title || '',
            slug: volume?.slug || '',
          },
        })}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                {lesson.isPreview && (
                  <Badge variant="outline" className="mb-4">
                    Free Preview
                  </Badge>
                )}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                {lesson.subtitle && <p className="text-lg text-gray-600">{lesson.subtitle}</p>}
              </div>

              {!canViewLesson && (
                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertDescription>
                    This lesson requires a premium subscription.
                    <Link href="/plans" className="ml-1 underline">
                      View plans
                    </Link>
                  </AlertDescription>
                </Alert>
              )}

              {lesson.richText && canViewLesson && (
                <div className="prose prose-gray max-w-none">
                  <RichText data={lesson.richText} enableGutter={false} />
                </div>
              )}

              {lesson.videos && lesson.videos.length > 0 && canViewLesson && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Videos</h2>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {lesson.videos.map((video: Video, index: number) => (
                      <div key={index} className="aspect-video w-full">
                        <p className="text-sm text-gray-500 mb-2">{video.title}</p>
                        <VideoCard video={video} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lesson.downloads && lesson.downloads.length > 0 && canViewLesson && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Downloads
                  </h2>
                  <div className="grid gap-3">
                    {lesson.downloads.map((download: Media, index: number) => (
                      <DownloadCard key={index} file={download} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {(labModule || volume) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Context</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {labModule && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Module</p>
                      <Link
                        href={`/lab/module/${labModule.slug}`}
                        className="text-blue-600 hover:underline"
                      >
                        {labModule.title}
                      </Link>
                    </div>
                  )}
                  {volume && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Volume</p>
                      <Link
                        href={`/lab/volume/${volume.slug}`}
                        className="text-blue-600 hover:underline"
                      >
                        {volume.title}
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {canViewLesson && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <CompleteLessonButton
                    lessonId={lesson.id}
                    isComplete={lessonProgress?.completed || false}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
