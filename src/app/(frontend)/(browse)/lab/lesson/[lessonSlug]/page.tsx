import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Lock, Download, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getLessonBySlug, getLessonCompletion, getLessonMetadataBySlug } from '@/lib/data/lab'
import { isEnrolledInAnyPlan } from '@/lib/data/plans'
import { getCurrentUser } from '@/lib/data/auth'
import RichText from '@/components/RichText2'
import { CompleteLessonButton } from '@/components/lab/lessons/complete-lesson-button'
import { LabBreadcrumb } from '@/components/lab/lab-breadcrumb'
import { VideoCard } from '@/components/lab/video-card'
import { Media, Video } from '@/payload-types'
import { DownloadCard } from '@/components/lab/download-card'
import { RefreshRouteOnSave } from '@/components/live-preview'
import { LessonContentClient } from '@/components/lab/lessons/lesson-content-client'
import { AccessAlerts, AccessState } from '@/components/lab/lessons/access-alerts'

interface DirectLessonPageProps {
  params: Promise<{
    lessonSlug: string
  }>
}

export async function generateMetadata(props: DirectLessonPageProps) {
  const params = await props.params
  const lesson = await getLessonMetadataBySlug(params.lessonSlug)

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

export default async function LessonPage(props: DirectLessonPageProps) {
  const params = await props.params
  const user = await getCurrentUser()
  const hasAccess = user ? await isEnrolledInAnyPlan(user.id) : false
  const lesson = await getLessonBySlug(params.lessonSlug, user?.id)

  if (!lesson) {
    notFound()
  }
  const lessonProgress = await getLessonCompletion(lesson.id)
  const downloads =
    lesson.downloads && lesson.downloads.every((v) => typeof v === 'object')
      ? lesson.downloads
      : null
  const volume = lesson.volume && typeof lesson.volume === 'object' ? lesson.volume : null
  const labModule = lesson.module && typeof lesson.module === 'object' ? lesson.module : null

  const getAccessState = (): AccessState => {
    let state: AccessState
    if (lesson.isPreview) {
      state = user ? 'previewLoggedIn' : 'previewLoggedOut'
    } else {
      state = user
        ? hasAccess
          ? 'paidLoggedInHasAccess'
          : 'paidLoggedInNoAccess'
        : 'paidLoggedOut'
    }
    return state
  }

  const accessState: AccessState = getAccessState()
  const canViewContent = accessState == 'previewLoggedIn' || accessState == 'paidLoggedInHasAccess'

  console.log(accessState)

  return (
    <div className="min-h-screen bg-gray-50">
      <RefreshRouteOnSave />
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

              <AccessAlerts state={accessState} />

              {lesson.richText && (
                <div className="prose prose-gray max-w-none">
                  <RichText data={lesson.richText} enableGutter={false} />
                </div>
              )}

              <LessonContentClient
                canViewContent={canViewContent}
                downloads={downloads}
                videos={lesson.videos}
                isPreview={lesson.isPreview || false}
              />
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

            {canViewContent && (
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
