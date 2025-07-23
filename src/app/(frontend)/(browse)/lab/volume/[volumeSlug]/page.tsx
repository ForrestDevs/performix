import React, { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, Layers } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getVolumeBySlugDirect, getVolumeCompletion } from '@/lib/data/lab'
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

interface DirectVolumePageProps {
  params: Promise<{
    volumeSlug: string
  }>
}

export async function generateMetadata(props: DirectVolumePageProps) {
  const params = await props.params
  const volume = await getVolumeBySlugDirect(params.volumeSlug)

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
  const [volume, user] = await Promise.all([
    getVolumeBySlugDirect(params.volumeSlug),
    getCurrentUser(),
  ])

  if (!volume) {
    notFound()
  }

  const hasAccess = user ? await isEnrolledInAnyPlan(user.id) : false

  const completion =
    user && hasAccess
      ? await getVolumeCompletion({
          volumeId: volume.id,
          userId: user.id,
        })
      : null

  const labModule = volume.module && typeof volume.module === 'object' ? volume.module : null

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Volume {volume.order + 1}
                </Badge>
                {labModule && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {labModule.title}
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">{volume.title}</h1>
              {volume.subtitle && <p className="text-xl text-purple-100 mb-6">{volume.subtitle}</p>}

              {volume.topics && volume.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {volume.topics.map((topic: any, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-white/10 text-white border-white/30"
                    >
                      {topic.topic}
                    </Badge>
                  ))}
                </div>
              )}

              {completion && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">
                      {completion.completedLessons}/{completion.totalLessons} lessons
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${completion.completionPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              {!hasAccess && (
                <Link
                  href="/plans"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }),
                    'bg-white text-blue-600 hover:bg-gray-100',
                  )}
                >
                  Unlock all content
                </Link>
              )}
            </div>

            {volume.thumbnail && (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={(volume.thumbnail as Media).url!}
                  alt={(volume.thumbnail as Media).alt || volume.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-8 lg:col-span-2">
            {volume.introVideo && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <IntroVideo video={volume.introVideo as Video} />
              </div>
            )}

            {volume.richText && (
              <Accordion type="single" collapsible defaultValue="item-1" className="mb-0">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-2xl font-bold py-0 mb-0">
                    Overview
                  </AccordionTrigger>
                  <AccordionContent>
                    <RichText data={volume.richText} enableGutter={false} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {volume.lessons && volume.lessons.docs && volume.lessons.docs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Lessons</h2>
                <div className="grid gap-4">
                  {volume.lessons.docs.map((lesson: Lesson, index: number) => (
                    <LessonCard
                      key={lesson.id}
                      lessonId={lesson.id}
                      moduleSlug={labModule?.slug || 'direct'}
                      volumeSlug={volume.slug!}
                      hasPlan={hasAccess}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {labModule && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Part of Module</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Link
                      href={`/lab/module/${labModule.slug}`}
                      className="text-blue-600 hover:underline font-medium"
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

            <Card>
              <CardHeader>
                <CardTitle>Volume Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Lessons</span>
                  <span className="font-medium">{volume.lessons?.docs?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order</span>
                  <span className="font-medium">#{volume.order + 1}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="/lab"
                  className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-start')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Lab
                </Link>
                {labModule && (
                  <Link
                    href={`/lab/module/${labModule.slug}`}
                    className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-start')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Module
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
