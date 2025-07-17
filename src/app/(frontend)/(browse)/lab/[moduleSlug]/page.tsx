import React, { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  Play,
  Lock,
  Users,
  Target,
  Clock,
  Zap,
  Shield,
  Trophy,
  Heart,
  Brain,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { getModuleBySlug } from '@/lib/data/lab'
import Image from 'next/image'
import { Video, Volume } from '@/payload-types'
import { VolumeCard } from '@/components/lab/volumes/volume-card'
import { extractYouTubeVideoId } from '@/lib/utilities/extract-youtube'
import { LoomVideo, YoutubeVideo } from '@/components/ui/video'
import MuxPlayer from '@mux/mux-player-react'
import RichText from '@/components/RichText'
import { cn } from '@/lib/utilities/ui'
import { IntroVideo } from '@/components/lab/intro-video'

// Icon mapping for modules
const ICON_MAP = {
  target: Target,
  users: Users,
  'book-open': BookOpen,
  zap: Zap,
  shield: Shield,
  trophy: Trophy,
  heart: Heart,
  brain: Brain,
} as const

interface ModulePageProps {
  params: Promise<{
    moduleSlug: string
  }>
}

// Module content component
async function ModuleContent({ moduleSlug }: { moduleSlug: string }) {
  const labModule = await getModuleBySlug(moduleSlug)
  const isOnPlan = false

  if (!labModule) {
    notFound()
  }

  return (
    <div>
      <section className="relative py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/lab" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Lab
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{labModule.module?.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 overflow-hidden">
                  {labModule.module?.thumbnail && typeof labModule.module.thumbnail === 'object' ? (
                    <Image
                      src={labModule.module.thumbnail.url ?? ''}
                      alt={labModule.module.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-white/20 rounded-lg" />
                  )}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {labModule.module?.title}
                  </h1>
                  <p className="text-lg text-gray-600">{labModule.module?.subtitle}</p>
                </div>
              </div>

              {labModule.module?.introVideo && typeof labModule.module.introVideo === 'object' && (
                <IntroVideo video={labModule.module.introVideo} />
              )}

              {labModule.module?.richText && (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Module</h3>
                  <RichText data={labModule.module.richText} enableGutter={false} />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4">Module Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Volumes</span>
                    <span className="font-medium">{labModule.volumes?.length ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Lessons</span>
                    <span className="font-medium">
                      {labModule.module?.lessons?.docs?.length ?? 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                {/* TODO: Replace with actual user authentication check */}
                {true ? (
                  /* User is logged in - show progress */
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Your Progress</h3>
                      <Badge variant="secondary">3 of 8 complete</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Overall Progress</span>
                        <span className="font-medium text-gray-900">37%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
                          style={{ width: '37%' }}
                        />
                      </div>
                      <div className="pt-2">
                        <Button className="w-full" asChild>
                          <Link href={`/lab/${labModule.module?.slug}/continue`}>
                            Continue Learning
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* User is not logged in - show CTA */
                  <div>
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg mb-4">
                      <Lock className="h-4 w-4" />
                      <span className="font-medium text-sm">Premium Content</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Unlock Full Access</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get unlimited access to all modules, lessons, and exclusive content.
                    </p>
                    <Button className="w-full mb-3" asChild>
                      <Link href="/plans">Choose Your Plan</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Module Volumes</h2>
            <p className="text-lg text-gray-600">
              Each volume contains a structured sequence of lessons building on previous concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labModule.volumes?.map((volume: Volume, index: number) => (
              <VolumeCard
                key={index}
                volume={volume}
                moduleSlug={labModule.module?.slug ?? ''}
                hasPlan={isOnPlan}
                userId={1}
              />
            ))}
          </div>
        </div>
      </section>

      {!isOnPlan && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of athletes who are transforming their performance with our structured
              learning approach.
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

// Loading skeleton
function ModuleLoadingSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto">
          <Skeleton className="h-6 w-32 mb-8" />
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="w-20 h-20 rounded-xl" />
                <div>
                  <Skeleton className="h-8 w-96 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full mt-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Volumes Skeleton */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mb-8" />

          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div>
                        <Skeleton className="h-6 w-48 mb-1" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default async function ModulePage(props: ModulePageProps) {
  const params = await props.params

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<ModuleLoadingSkeleton />}>
        <ModuleContent moduleSlug={params.moduleSlug} />
      </Suspense>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata(props: ModulePageProps) {
  const params = await props.params
  const labModule = await getModuleBySlug(params.moduleSlug)

  if (!labModule) {
    return {
      title: 'Module Not Found | Performix Lab',
    }
  }

  return {
    title: `${labModule.module?.title} | Performix Lab`,
    description: labModule.module?.subtitle,
  }
}
