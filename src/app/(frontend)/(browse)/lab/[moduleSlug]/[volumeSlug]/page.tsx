import React, { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Play, Lock, Clock, ChevronRight, Download, Video, ArrowRight } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  getVolumeBySlug,
  getModuleBySlug,
  hasLessonAccess,
  getVolumeCompletion,
} from '@/lib/data/lab'
import { getCurrentUser } from '@/lib/data/auth'
import { isEnrolledInAnyPlan } from '@/lib/data/plans'
import Image from 'next/image'
import { IntroVideo } from '@/components/lab/intro-video'
import RichText from '@/components/RichText'
import { cn } from '@/lib/utilities/ui'
import { Lesson } from '@/payload-types'
import { VolumeLoadingSkeleton } from '@/components/lab/volumes/loading-skeleton'
import { LessonCard } from '@/components/lab/lessons/lesson-card'
import { LessonCardLoadingSkeleton } from '@/components/lab/lessons/lesson-card-skeleton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface VolumePageProps {
  params: Promise<{
    moduleSlug: string
    volumeSlug: string
  }>
}

export async function generateMetadata(props: VolumePageProps) {
  const params = await props.params
  const volume = await getVolumeBySlug(params.moduleSlug, params.volumeSlug)

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

export default async function VolumePage(props: VolumePageProps) {
  const params = await props.params

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<VolumeLoadingSkeleton />}>
        <VolumeContent moduleSlug={params.moduleSlug} volumeSlug={params.volumeSlug} />
      </Suspense>
    </div>
  )
}

async function VolumeContent({
  moduleSlug,
  volumeSlug,
}: {
  moduleSlug: string
  volumeSlug: string
}) {
  const user = await getCurrentUser()
  const hasPlan = await isEnrolledInAnyPlan(user?.id)

  const [volume, labModule] = await Promise.all([
    getVolumeBySlug(moduleSlug, volumeSlug),
    getModuleBySlug(moduleSlug),
  ])

  if (!volume || !labModule) {
    notFound()
  }

  const progress = await getVolumeCompletion({ volumeId: volume.id, userId: user?.id })

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/lab" className="text-gray-600 hover:text-gray-900">
              Lab
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href={`/lab/${moduleSlug}`} className="text-gray-600 hover:text-gray-900">
              {labModule?.module?.title ?? ''}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{volume.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 overflow-hidden">
                  {volume.thumbnail && typeof volume.thumbnail === 'object' ? (
                    <Image
                      src={volume.thumbnail.url ?? ''}
                      alt={volume.title ?? volumeSlug}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-white/20 rounded-lg" />
                  )}
                </div>
                <div>
                  <Badge variant="outline">Volume {(volume?.order || 0) + 1}</Badge>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{volume.title}</h1>
                  <p className="text-lg text-gray-600">{volume.subtitle}</p>
                </div>
              </div>

              {volume.introVideo && typeof volume.introVideo === 'object' && (
                <IntroVideo video={volume.introVideo} />
              )}

              {volume?.richText && (
                <Accordion
                  type="single"
                  collapsible
                  className="bg-white rounded-xl shadow-sm border p-6"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl font-semibold text-gray-900">
                      Volume Overview
                    </AccordionTrigger>
                    <AccordionContent>
                      <RichText data={volume.richText} enableGutter={false} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4">Volume Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Lessons</span>
                    <span className="font-medium">{volume.lessons?.docs?.length ?? 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                {true ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Your Progress</h3>
                      <Badge variant="secondary">
                        {progress?.completedLessons ?? 0} of {progress?.totalLessons ?? 0} complete
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Overall Progress</span>
                        <span className="font-medium text-gray-900">
                          {progress?.completionPercentage ?? 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
                          style={{ width: `${progress?.completionPercentage ?? 0}%` }}
                        />
                      </div>
                      <div className="pt-2">
                        <Link href={`#lessons`} className={cn(buttonVariants(), 'w-full')}>
                          Continue Learning
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg mb-4">
                      <Lock className="h-4 w-4" />
                      <span className="font-medium text-sm">Premium Content</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Unlock Full Access</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get unlimited access to all lessons, and exclusive content.
                    </p>
                    <Link
                      href="/plans"
                      className={cn(buttonVariants({ variant: 'default' }), 'w-full mb-3')}
                    >
                      Choose Your Plan
                    </Link>
                    <Link
                      href="/auth/login"
                      className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Volume Lessons</h2>
            <p className="text-lg text-gray-600">
              Follow the lessons in order for the best learning experience.
            </p>
          </div>

          <div className="grid gap-4" id="lessons">
            {volume.lessons?.docs?.map((lesson, index: number) => {
              const lessonId = typeof lesson === 'object' ? lesson.id : lesson

              return (
                <Suspense key={index} fallback={<LessonCardLoadingSkeleton />}>
                  <LessonCard
                    lessonId={lessonId}
                    hasPlan={hasPlan}
                    moduleSlug={moduleSlug}
                    volumeSlug={volumeSlug}
                  />
                </Suspense>
              )
            })}
          </div>
        </div>
      </section>

      {!hasPlan && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Unlock All Lessons</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get unlimited access to all lessons, downloads, and videos in this volume and across
              the entire Performix Lab.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plans"
                className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
              >
                Choose Your Plan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
