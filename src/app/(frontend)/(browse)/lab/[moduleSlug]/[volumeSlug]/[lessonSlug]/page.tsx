import React, { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  Play,
  Lock,
  Download,
  Video,
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
import { getLessonBySlug, getVolumeBySlug } from '@/lib/data/lab'
import { isEnrolledInAnyPlan } from '@/lib/data/plans'
import { getCurrentUser } from '@/lib/data/auth'
import RichText from '@/components/RichText2'
// import { RichText } from '@/components/RichText'

interface LessonPageProps {
  params: Promise<{
    moduleSlug: string
    volumeSlug: string
    lessonSlug: string
  }>
}

// Video player component
function VideoPlayer({
  video,
  isAccessible,
  previewDuration,
}: {
  video: any
  isAccessible: boolean
  previewDuration?: number
}) {
  if (!isAccessible && !previewDuration) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Content</h3>
          <p className="text-gray-600 mb-4">Subscribe to access this video</p>
          <Button asChild>
            <Link href="/plans">Upgrade Plan</Link>
          </Button>
        </div>
      </div>
    )
  }

  // For preview mode, show a simplified player
  if (previewDuration && !isAccessible) {
    return (
      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
        <div className="text-center text-white">
          <Play className="h-16 w-16 mx-auto mb-4 opacity-75" />
          <p className="text-lg font-semibold mb-2">Preview Available</p>
          <p className="text-sm opacity-75">Watch the first {previewDuration} seconds</p>
          <Badge className="mt-4">Preview Mode</Badge>
        </div>
      </div>
    )
  }

  // Full video player for accessible content
  return (
    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
      <div className="text-center text-white">
        <Play className="h-16 w-16 mx-auto mb-4" />
        <p className="text-lg font-semibold">{video.title}</p>
        <p className="text-sm opacity-75">
          Duration: {Math.floor(video.duration / 60)}:
          {(video.duration % 60).toString().padStart(2, '0')}
        </p>
        {/* Replace this with actual video player component (Mux, etc.) */}
      </div>
    </div>
  )
}

// Lesson content component
async function LessonContent({
  moduleSlug,
  volumeSlug,
  lessonSlug,
}: {
  moduleSlug: string
  volumeSlug: string
  lessonSlug: string
}) {
  const user = await getCurrentUser()
  const hasPlan = await isEnrolledInAnyPlan(user?.id)

  const [lesson, volume] = await Promise.all([
    getLessonBySlug(moduleSlug, volumeSlug, lessonSlug),
    getVolumeBySlug(moduleSlug, volumeSlug),
  ])

  if (!lesson || !volume) {
    notFound()
  }

  const isAccessible = lesson.isAccessible
  const hasPreview = lesson.isPreview

  return (
    <>
      {/* Lesson Header */}
      <section className="relative py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/lab" className="text-gray-600 hover:text-gray-900">
              Lab
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href={`/lab/${moduleSlug}`} className="text-gray-600 hover:text-gray-900">
              Module
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              href={`/lab/${moduleSlug}/${volumeSlug}`}
              className="text-gray-600 hover:text-gray-900"
            >
              {volume.title}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{lesson.title}</span>
          </nav>

          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/lab/${moduleSlug}/${volumeSlug}`} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Volume
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              {hasPreview && (
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Preview Available
                </Badge>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
              {lesson.subtitle && <p className="text-lg text-gray-600 mb-6">{lesson.subtitle}</p>}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4">Lesson Details</h3>
              <div className="space-y-3">
                {lesson.estimatedDuration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{lesson.estimatedDuration} minutes</span>
                  </div>
                )}
                {lesson.videos && lesson.videos.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {lesson.videos.length} video{lesson.videos.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {lesson.downloads && lesson.downloads.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {lesson.downloads.length} download{lesson.downloads.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {lesson.videos && lesson.videos.length > 0 && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <VideoPlayer video={lesson.videos[0]} isAccessible={isAccessible || false} />

              {!isAccessible && !hasPreview && (
                <Alert className="mt-4">
                  <Lock className="h-4 w-4" />
                  <AlertDescription>
                    This video is only available to subscribers.
                    <Link href="/plans" className="font-medium text-blue-600 hover:underline ml-1">
                      Upgrade your plan
                    </Link>{' '}
                    to watch the full content.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {isAccessible && lesson.richText ? (
              <div className="prose prose-lg max-w-none">
                <RichText data={lesson.richText} />
              </div>
            ) : !isAccessible ? (
              <Card className="p-8 text-center">
                <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Lesson Content</h3>
                <p className="text-gray-600 mb-6">
                  Access detailed lesson materials, step-by-step guides, and exclusive content with
                  a subscription.
                </p>
                <Button asChild>
                  <Link href="/plans">View Plans</Link>
                </Button>
              </Card>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No additional content available for this lesson.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      {lesson.downloads && lesson.downloads.length > 0 && (
        <section className="py-8 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloads</h2>

              {isAccessible ? (
                <div className="grid gap-4">
                  {lesson.downloads.map((download: any, index: number) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded">
                            <Download className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {download.filename || `Download ${index + 1}`}
                            </h3>
                            <p className="text-sm text-gray-600">PDF Resource</p>
                          </div>
                        </div>
                        <Button size="sm">Download</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center">
                  <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Premium Downloads</h3>
                  <p className="text-gray-600 mb-4">
                    Access downloadable resources and guides with a subscription.
                  </p>
                  <Button asChild>
                    <Link href="/plans">Upgrade Plan</Link>
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Navigation Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href={`/lab/${moduleSlug}/${volumeSlug}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Volume
                </Link>
              </Button>

              {/* You can add next/previous lesson navigation here */}
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Previous Lesson
                </Button>
                <Button disabled>Next Lesson</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade CTA for non-subscribers */}
      {!hasPlan && (
        <section className="py-16 px-4 bg-blue-600">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Unlock Your Full Potential</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get unlimited access to all lessons, downloads, and exclusive content across the
              entire Performix Lab.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/plans">Choose Your Plan</Link>
            </Button>
          </div>
        </section>
      )}
    </>
  )
}

// Loading skeleton
function LessonLoadingSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <section className="relative py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <Skeleton className="h-6 w-96 mb-6" />
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-24" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Skeleton */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="aspect-video w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function LessonPage(props: LessonPageProps) {
  const params = await props.params

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<LessonLoadingSkeleton />}>
        <LessonContent
          moduleSlug={params.moduleSlug}
          volumeSlug={params.volumeSlug}
          lessonSlug={params.lessonSlug}
        />
      </Suspense>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata(props: LessonPageProps) {
  const params = await props.params

  try {
    const lesson = await getLessonBySlug(params.moduleSlug, params.volumeSlug, params.lessonSlug)

    if (!lesson) {
      return {
        title: 'Lesson Not Found | Performix Lab',
      }
    }

    return {
      title: `${lesson.title} | Performix Lab`,
      description: lesson.subtitle || `Learn ${lesson.title} in the Performix Lab`,
    }
  } catch (error) {
    return {
      title: 'Lesson | Performix Lab',
    }
  }
}
