import { LabStatsSection, StatsLoadingSkeleton } from '@/components/lab/lab-stats'
import { ModulesLoadingSkeleton } from '@/components/lab/modules/modules-skeleton'
import { LabSection } from '@/components/lab/sections/lab-section'
import { SubscriptionCTA, SubscriptionCTALoadingSkeleton } from '@/components/lab/subscription-cta'
import { RefreshRouteOnSave } from '@/components/live-preview'
import { getCurrentUser } from '@/lib/data/auth'
import { getLabSections } from '@/lib/data/lab'
import { isEnrolledInAnyPlan } from '@/lib/data/plans'
import { JsonLdScript, getBreadcrumbSchema, getCourseSchema } from '@/lib/seo/jsonld'
import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'The Performix Lab - Ultimate Performance Training Modules',
  description:
    'Master elite performance through our comprehensive training modules. From speed development to mental performance, unlock your potential with expert guidance and proven methodologies.',
  keywords: [
    'performance training',
    'speed development',
    'athletic performance',
    'training modules',
    'sports science',
    'mental performance',
    'elite athlete training',
    'performance coaching',
    'hockey training lab',
  ],
  openGraph: {
    title: 'The Performix Lab - Ultimate Performance Training',
    description:
      'Master elite performance through our comprehensive training modules. From speed development to mental performance, unlock your potential with expert guidance.',
    type: 'website',
    siteName: 'Performix',
    url: 'https://www.performix.ca/lab',
    images: [
      {
        url: 'https://www.performix.ca/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'The Performix Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Performix Lab - Ultimate Performance Training',
    description:
      'Master elite performance through our comprehensive training modules. From speed development to mental performance, unlock your potential.',
    images: ['https://www.performix.ca/opengraph-image.png'],
  },
  alternates: {
    canonical: 'https://www.performix.ca/lab',
  },
}

export default function PerformixLabPage() {
  const courseJsonLd = {
    '@context': 'https://schema.org',
    ...getCourseSchema({
      name: 'The Performix Lab',
      description:
        'Master elite performance through our comprehensive training modules. From speed development to mental performance, unlock your potential with expert guidance.',
      url: 'https://www.performix.ca/lab',
    }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.performix.ca' },
      { name: 'Lab', url: 'https://www.performix.ca/lab' },
    ]),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 space-y-16 py-16">
      <JsonLdScript data={courseJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <RefreshRouteOnSave />
      <section className="relative px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4" />
            Ultimate Performance Course
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            The Performix <span className="text-blue-600">Lab</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Master the art of performance. Where D1 athletes and performance experts decode what
            drives elite hockey development and share the most effective tools across every part of
            the game.
          </p>

          <Suspense fallback={<StatsLoadingSkeleton />}>
            <LabStatsSection />
          </Suspense>
        </div>
      </section>

      <section className="px-4 container mx-auto">
        <Suspense fallback={<ModulesLoadingSkeleton />}>
          <LabContentSection />
        </Suspense>
      </section>

      <Suspense fallback={<SubscriptionCTALoadingSkeleton />}>
        <SubscriptionCTA />
      </Suspense>
    </div>
  )
}

async function LabContentSection() {
  const labSections = await getLabSections()
  const user = await getCurrentUser()
  const hasAccess = user ? await isEnrolledInAnyPlan(user.id) : false

  return (
    <div className="space-y-16 max-w-7xl mx-auto">
      {labSections?.map((section) => (
        <LabSection key={section.id} section={section} hasAccess={hasAccess} />
      ))}
    </div>
  )
}
