import React, { Suspense } from 'react'
import { CheckCircle } from 'lucide-react'
import { getModules } from '@/lib/data/lab'
import { ModuleCard } from '@/components/lab/modules/module-card'
import { SubscriptionCTA, SubscriptionCTALoadingSkeleton } from '@/components/lab/subscription-cta'
import { ModulesLoadingSkeleton } from '@/components/lab/modules/modules-skeleton'
import { LabStatsSection, StatsLoadingSkeleton } from '@/components/lab/lab-stats'
import { Metadata } from 'next'

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
  ],
  openGraph: {
    title: 'The Performix Lab - Ultimate Performance Training',
    description:
      'Master elite performance through our comprehensive training modules. From speed development to mental performance, unlock your potential with expert guidance.',
    type: 'website',
    siteName: 'Performix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Performix Lab - Ultimate Performance Training',
    description:
      'Master elite performance through our comprehensive training modules. From speed development to mental performance, unlock your potential.',
  },
}

export default function PerformixLabPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 space-y-16 py-16">
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
            Master elite performance through our comprehensive training modules. From speed
            development to mental performance, unlock your potential with expert guidance and proven
            methodologies.
          </p>

          <Suspense fallback={<StatsLoadingSkeleton />}>
            <LabStatsSection />
          </Suspense>
        </div>
      </section>

      <section className="px-4 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Training Modules</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each module contains carefully structured volumes and lessons designed to progressively
            build your skills and knowledge.
          </p>
        </div>

        <Suspense fallback={<ModulesLoadingSkeleton />}>
          <ModulesSection />
        </Suspense>
      </section>

      <Suspense fallback={<SubscriptionCTALoadingSkeleton />}>
        <SubscriptionCTA />
      </Suspense>
    </div>
  )
}

async function ModulesSection() {
  const modules = await getModules()

  const isLoggedIn = true // Mock value for demo

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} hasPlan={isLoggedIn} userId={1} />
      ))}
    </div>
  )
}
