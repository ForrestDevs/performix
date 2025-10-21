import React, { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  Layers,
  Target,
  Zap,
  Star,
  ChevronRight,
  Trophy,
  Lock,
  CheckCircle2,
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getVolumeBySlug, getVolumeCompletion } from '@/lib/data/lab'
import { getCurrentUser } from '@/lib/data/auth'
import { isEnrolledInAnyPlan } from '@/lib/data/plans'
import Image from 'next/image'
import { IntroVideo } from '@/components/lab/intro-video'
import RichText from '@/components/RichText'
import { LessonCard } from '@/components/lab/lessons/lesson-card'
import { Lesson, Media, Video } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { LabBreadcrumb } from '@/components/lab/lab-breadcrumb'
import { cn } from '@/lib/utilities/ui'
import { RefreshRouteOnSave } from '@/components/live-preview'

interface DirectVolumePageProps {
  params: Promise<{
    volumeSlug: string
  }>
}

export async function generateMetadata(props: DirectVolumePageProps) {
  const params = await props.params
  const volume = await getVolumeBySlug(params.volumeSlug)

  if (!volume) {
    return {
      title: 'Volume Not Found | Performix Lab',
    }
  }

  return {
    title: `${volume.title} | Performix Lab`,
    description: volume.subtitle,
  }
}

export default async function DirectVolumePage(props: DirectVolumePageProps) {
  const params = await props.params
  const [volume, user] = await Promise.all([getVolumeBySlug(params.volumeSlug), getCurrentUser()])

  if (!volume) {
    notFound()
  }

  const allLessonsPreview = volume.lessons.every((lesson) => lesson.isPreview)
  const hasAccess = user ? await isEnrolledInAnyPlan(user.id) : false
  const needsUnlock = !allLessonsPreview || !hasAccess
  const completion = user ? await getVolumeCompletion(volume.id) : null

  const labModule = volume.module && typeof volume.module === 'object' ? volume.module : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <RefreshRouteOnSave />
      <LabBreadcrumb
        title={volume.title}
        currentPage={{ type: 'volume', slug: volume.slug || '' }}
        {...(labModule && {
          module: {
            title: labModule?.title || '',
            slug: labModule?.slug || '',
          },
        })}
      />

      <div className="relative overflow-hidden bg-gradient-to-br from-[#8B5CF6] via-[#6366F1] to-[#0891B2] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-1.5 text-sm font-semibold shadow-lg"
                >
                  <Layers className="w-3.5 h-3.5 mr-1.5" />
                  Volume {volume.order + 1}
                </Badge>
                {labModule && (
                  <Badge
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-1.5 text-sm font-semibold shadow-lg"
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                    {labModule.title}
                  </Badge>
                )}
                {completion && completion.completionPercentage === 100 && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-lg">
                    <Trophy className="w-3.5 h-3.5 mr-1.5" />
                    Completed
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  {volume.title}
                </h1>
                {volume.subtitle && (
                  <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-xl">
                    {volume.subtitle}
                  </p>
                )}
              </div>

              {volume.topics && volume.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {volume.topics.map((topic: any, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 transition-colors px-3 py-1"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      {topic.topic}
                    </Badge>
                  ))}
                </div>
              )}

              {completion && (
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/80">Your Progress</p>
                          <p className="text-2xl font-bold">
                            {Math.round(completion.completionPercentage)}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/80">Lessons Completed</p>
                        <p className="text-xl font-bold">
                          {completion.completedLessons}/{completion.totalLessons}
                        </p>
                      </div>
                    </div>
                    <div className="relative w-full bg-white/20 rounded-full h-3 overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-full transition-all duration-500 shadow-lg"
                        style={{ width: `${completion.completionPercentage}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {needsUnlock && (
                <Link
                  href="/plans"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }),
                    'bg-white text-[#8B5CF6] hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl px-8 py-6 text-lg font-semibold flex items-center',
                  )}
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Unlock All Content
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              )}
            </div>

            {volume.thumbnail && (
              <div className="relative animate-fade-in-right">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform duration-500">
                  <Image
                    src={(volume.thumbnail as Media).url!}
                    alt={(volume.thumbnail as Media).alt || volume.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {volume.introVideo && (
              <Card className="overflow-hidden border shadow-sm bg-white">
                <CardHeader className="bg-white border-b">
                  <CardTitle className="text-xl font-semibold text-neutral-900">
                    Volume Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <IntroVideo video={volume.introVideo as Video} />
                </CardContent>
              </Card>
            )}

            {volume.richText && (
              <Card className="overflow-hidden border shadow-sm bg-white">
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="px-6 pt-6 pb-4 hover:no-underline group">
                      <span className="text-xl font-semibold text-neutral-900">
                        Volume Overview
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <RichText data={volume.richText} enableGutter={false} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            )}

            {volume.lessons && volume.lessons.length > 0 && (
              <div className="space-y-6 px-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-semibold text-neutral-900">Lessons</h2>
                    <p className="text-neutral-500 text-base">
                      {volume.lessons.length} lessons available
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {volume.lessons.map((lesson: Lesson) => (
                    <LessonCard key={lesson.id} lessonId={lesson.id} hasPlan={hasAccess} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-6">
            {labModule && (
              <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader className="bg-gradient-to-r from-[#8B5CF6]/10 to-[#0891B2]/10 border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
                    Part of Module
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Link
                      href={`/lab/module/${labModule.slug}`}
                      className="text-[#8B5CF6] hover:underline font-medium"
                    >
                      {labModule.title}
                    </Link>
                    {labModule.subtitle && (
                      <p className="text-sm text-gray-600 mt-1">{labModule.subtitle}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/30">
              <CardHeader className="bg-gradient-to-r from-[#8B5CF6]/10 to-[#0891B2]/10 border-b pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Layers className="w-5 h-5 text-[#8B5CF6]" />
                  Volume Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Lessons</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {volume.lessons?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Order</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">#{volume.order + 1}</span>
                </div>
                {completion && (
                  <div className="flex items-center justify-between p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-sm border border-yellow-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">Completed</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {Math.round(completion.completionPercentage)}%
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-indigo-50/30">
              <CardHeader className="bg-gradient-to-r from-[#8B5CF6]/10 to-[#0891B2]/10 border-b pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="w-5 h-5 text-[#8B5CF6]" />
                  Quick Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Link
                  href="/lab"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full justify-start hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all duration-300 h-12',
                  )}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Lab
                </Link>
                {labModule && (
                  <Link
                    href={`/lab/module/${labModule.slug}`}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-full justify-start hover:bg-[#0891B2]/10 hover:border-[#0891B2] hover:text-[#0891B2] transition-all duration-300 h-12',
                    )}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Module
                  </Link>
                )}
                {hasAccess && volume.lessons && volume.lessons.length > 0 && (
                  <Link
                    href={`#`}
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      'w-full justify-start bg-gradient-to-r from-[#8B5CF6] to-[#0891B2] hover:from-[#7C3AED] hover:to-[#0E7490] transition-all duration-300 h-12',
                    )}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Start Learning
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Unlock CTA for non-subscribers */}
            {needsUnlock && (
              <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-[#8B5CF6] to-[#0891B2] text-white">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Unlock Full Access</h3>
                      <p className="text-sm text-blue-100">Get unlimited access to all volumes</p>
                    </div>
                  </div>
                  <Link
                    href="/plans"
                    className={cn(
                      buttonVariants({ variant: 'secondary', size: 'lg' }),
                      'w-full bg-white text-[#8B5CF6] hover:bg-gray-100 hover:scale-105 transition-all duration-300 font-semibold',
                    )}
                  >
                    View Plans
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
