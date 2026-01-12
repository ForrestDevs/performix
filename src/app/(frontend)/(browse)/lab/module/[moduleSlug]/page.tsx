import { IntroVideo } from '@/components/lab/intro-video'
import { LabBreadcrumb } from '@/components/lab/lab-breadcrumb'
import { VolumeLoadingCard } from '@/components/lab/volumes/loading-card'
import { VolumeCard } from '@/components/lab/volumes/volume-card'
import { RefreshRouteOnSave } from '@/components/live-preview'
import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/data/auth'
import { getModuleBySlug, getModuleCompletion } from '@/lib/data/lab'
import { isEnrolledInAnyPlan } from '@/lib/data/plans'
import { JsonLdScript, getBreadcrumbSchema, getCourseSchema } from '@/lib/seo/jsonld'
import { cn } from '@/lib/utilities/ui'
import { Media, Video, Volume } from '@/payload-types'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Lock,
  Play,
  Star,
  Target,
  Trophy,
  Zap
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface DirectModulePageProps {
  params: Promise<{
    moduleSlug: string
  }>
}

export async function generateMetadata(props: DirectModulePageProps): Promise<Metadata> {
  const params = await props.params
  const labModule = await getModuleBySlug(params.moduleSlug)

  if (!labModule) {
    return {
      title: 'Module Not Found | Performix Lab',
    }
  }

  const thumbnailUrl =
    labModule.thumbnail && typeof labModule.thumbnail === 'object'
      ? (labModule.thumbnail as Media).url
      : undefined
  const fullThumbnailUrl = thumbnailUrl?.startsWith('http')
    ? thumbnailUrl
    : thumbnailUrl
      ? `https://www.performix.ca${thumbnailUrl}`
      : 'https://www.performix.ca/opengraph-image.png'

  return {
    title: `${labModule?.title} | Performix Lab`,
    description:
      labModule?.subtitle ||
      `Master ${labModule?.title} with our comprehensive training module. Expert guidance and proven methodologies.`,
    keywords: [
      labModule?.title || '',
      'hockey training',
      'performance module',
      'hockey development',
      'elite training',
      ...(labModule?.topics?.map((t: { topic?: string }) => t.topic || '') || []),
    ].filter(Boolean),
    openGraph: {
      title: `${labModule?.title} | Performix Lab`,
      description:
        labModule?.subtitle || `Master ${labModule?.title} with expert guidance.`,
      type: 'website',
      url: `https://www.performix.ca/lab/module/${params.moduleSlug}`,
      images: [
        {
          url: fullThumbnailUrl,
          width: 1200,
          height: 630,
          alt: labModule?.title || 'Performix Lab Module',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${labModule?.title} | Performix Lab`,
      description: labModule?.subtitle || `Master ${labModule?.title} with expert guidance.`,
      images: [fullThumbnailUrl],
    },
    alternates: {
      canonical: `https://www.performix.ca/lab/module/${params.moduleSlug}`,
    },
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

  const thumbnailUrl =
    labModule.thumbnail && typeof labModule.thumbnail === 'object'
      ? (labModule.thumbnail as Media).url
      : undefined
  const fullThumbnailUrl = thumbnailUrl?.startsWith('http')
    ? thumbnailUrl
    : thumbnailUrl
      ? `https://www.performix.ca${thumbnailUrl}`
      : undefined

  const courseJsonLd = {
    '@context': 'https://schema.org',
    ...getCourseSchema({
      name: labModule?.title || 'Performance Module',
      description: labModule?.subtitle || '',
      url: `https://www.performix.ca/lab/module/${params.moduleSlug}`,
      image: fullThumbnailUrl,
      numberOfLessons: labModule?.lessons?.docs?.length || 0,
    }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.performix.ca' },
      { name: 'Lab', url: 'https://www.performix.ca/lab' },
      {
        name: labModule?.title || 'Module',
        url: `https://www.performix.ca/lab/module/${params.moduleSlug}`,
      },
    ]),
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <JsonLdScript data={courseJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <RefreshRouteOnSave />
      <LabBreadcrumb
        title={labModule?.title || ''}
        currentPage={{ type: 'module', slug: labModule?.slug || '' }}
      />

      <div className="relative overflow-hidden bg-gradient-to-br from-[#0891B2] via-[#0891B2] to-[#8B5CF6] text-white">
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
                  <Target className="w-3.5 h-3.5 mr-1.5" />
                  Module {labModule?.order + 1}
                </Badge>
                {completion && completion.completionPercentage === 100 && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-lg">
                    <Trophy className="w-3.5 h-3.5 mr-1.5" />
                    Completed
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  {labModule?.title}
                </h1>
                {labModule?.subtitle && (
                  <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-xl">
                    {labModule?.subtitle}
                  </p>
                )}
              </div>

              {labModule?.topics && labModule?.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {labModule?.topics.map((topic: any, index: number) => (
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

              {!hasAccess && (
                <Link
                  href="/plans"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }),
                    'bg-white text-[#0891B2] hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl px-8 py-6 text-lg font-semibold',
                  )}
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Unlock All Content
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              )}
            </div>

            {labModule?.thumbnail && (
              <div className="relative animate-fade-in-right">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform duration-500">
                  <Image
                    src={(labModule?.thumbnail as Media).url!}
                    alt={labModule?.title || 'Module Thumbnail'}
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
            {labModule?.introVideo && (
              <Card className="overflow-hidden border shadow-sm bg-white">
                <CardHeader className="bg-white border-b">
                  <CardTitle className="text-xl font-semibold text-neutral-900">
                    Module Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <IntroVideo video={labModule?.introVideo as Video} />
                </CardContent>
              </Card>
            )}

            {labModule?.richText && (
              <Card className="overflow-hidden border shadow-sm bg-white">
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="px-6 pt-6 pb-4 hover:no-underline group">
                      <span className="text-xl font-semibold text-neutral-900">
                        Module Overview
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <RichText data={labModule?.richText} enableGutter={false} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            )}

            {labModule?.volumes?.docs && labModule?.volumes?.docs.length > 0 && (
              <div id="volumes" className="space-y-6 px-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-semibold text-neutral-900">Course Volumes</h2>
                    <p className="text-neutral-500 text-base">
                      {labModule?.volumes?.docs?.length} volumes available
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {labModule?.volumes?.docs
                    .sort((a: Volume, b: Volume) => a.order - b.order)
                    .map((volume: Volume, index: number) => (
                      <Suspense key={index} fallback={<VolumeLoadingCard />}>
                        <VolumeCard volumeId={volume.id} hasPlan={hasAccess} />
                      </Suspense>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="bg-gradient-to-r from-[#0891B2]/10 to-[#8B5CF6]/10 border-b pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="w-5 h-5 text-[#0891B2]" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Volumes</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {labModule?.volumes?.docs?.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Lessons</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {labModule?.lessons?.docs?.length || 0}
                  </span>
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

            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/30">
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
                    'w-full justify-start hover:bg-[#0891B2]/10 hover:border-[#0891B2] hover:text-[#0891B2] transition-all duration-300 h-12',
                  )}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Lab
                </Link>
                {hasAccess && labModule?.volumes?.docs && labModule?.volumes?.docs.length > 0 && (
                  <Link
                    href={`#volumes`}
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      'w-full justify-start bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] hover:from-[#0E7490] hover:to-[#7C3AED] transition-all duration-300 h-12',
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
            {!hasAccess && (
              <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-[#0891B2] to-[#8B5CF6] text-white">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Unlock Full Access</h3>
                      <p className="text-sm text-blue-100">Get unlimited access to all modules</p>
                    </div>
                  </div>
                  <Link
                    href="/plans"
                    className={cn(
                      buttonVariants({ variant: 'secondary', size: 'lg' }),
                      'w-full bg-white text-[#0891B2] hover:bg-gray-100 hover:scale-105 transition-all duration-300 font-semibold',
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
