import React, { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Play, Lock, Clock, ChevronRight, ArrowLeft, BookOpen } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getModuleBySlug, getModuleCompletion } from '@/lib/data/lab'
import { getCurrentUser } from '@/lib/data/auth'
import { isEnrolledInAnyPlan } from '@/lib/data/plans'
import Image from 'next/image'
import { IntroVideo } from '@/components/lab/intro-video'
import RichText from '@/components/RichText'
import { cn } from '@/lib/utilities/ui'
import { VolumeCard } from '@/components/lab/volumes/volume-card'
import { LessonCard } from '@/components/lab/lessons/lesson-card'
import { Media, Video, Volume } from '@/payload-types'
import { LabBreadcrumb } from '@/components/lab/lab-breadcrumb'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { VolumeLoadingCard } from '@/components/lab/volumes/loading-card'
import { RefreshRouteOnSave } from '@/components/live-preview'

interface DirectModulePageProps {
  params: Promise<{
    moduleSlug: string
  }>
}

export async function generateMetadata(props: DirectModulePageProps) {
  const params = await props.params
  const labModule = await getModuleBySlug(params.moduleSlug)

  if (!labModule) {
    return {
      title: 'Module Not Found | Performix Lab',
    }
  }

  return {
    title: `${labModule?.title} | Performix Lab`,
    description: labModule?.subtitle,
  }
}

export default async function DirectModulePage(props: DirectModulePageProps) {
  const params = await props.params
  const [labModule, user] = await Promise.all([
    getModuleBySlug(params.moduleSlug),
    getCurrentUser(),
  ])

  if (!labModule) {
    notFound()
  }

  const hasAccess = user ? await isEnrolledInAnyPlan(user.id) : false
  const completion = user ? await getModuleCompletion(labModule?.id) : null

  return (
    <div className="min-h-screen bg-gray-50">
      <RefreshRouteOnSave />
      <LabBreadcrumb
        title={labModule?.title || ''}
        currentPage={{ type: 'module', slug: labModule?.slug || '' }}
      />

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Module {labModule?.order + 1}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">{labModule?.title}</h1>
              {labModule?.subtitle && (
                <p className="text-xl text-blue-100 mb-6">{labModule?.subtitle}</p>
              )}

              {labModule?.topics && labModule?.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {labModule?.topics.map((topic: any, index: number) => (
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

            {labModule?.thumbnail && (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={(labModule?.thumbnail as Media).url!}
                  alt={labModule?.title || 'Module Thumbnail'}
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
          <div className="lg:col-span-2 flex flex-col gap-8">
            {labModule?.introVideo && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <IntroVideo video={labModule?.introVideo as Video} />
              </div>
            )}

            {labModule?.richText && (
              <Accordion type="single" collapsible defaultValue="item-1" className="mb-0">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-2xl font-bold py-0 mb-0">
                    Overview
                  </AccordionTrigger>
                  <AccordionContent>
                    <RichText data={labModule?.richText} enableGutter={false} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {labModule?.volumes?.docs && labModule?.volumes?.docs.length > 0 && (
              <div id="volumes">
                <h2 className="text-2xl font-bold mb-6">Volumes</h2>
                <div className="grid gap-6">
                  {labModule?.volumes?.docs.map((volume: Volume, index: number) => (
                    <Suspense key={index} fallback={<VolumeLoadingCard />}>
                      <VolumeCard volumeId={volume.id} hasPlan={hasAccess} />
                    </Suspense>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Volumes</span>
                  <span className="font-medium">{labModule?.volumes?.docs?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Lessons</span>
                  <span className="font-medium">{labModule?.lessons?.docs?.length || 0}</span>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
