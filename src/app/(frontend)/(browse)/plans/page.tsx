import type { Metadata } from 'next'
import React from 'react'
import { TestimonialsSection } from '@/components/layout/home/testimonials'
import { PlansList } from '@/components/layout/plans/plans-list'
import { PlansHero } from '@/components/layout/plans/plans-hero'
import { PlansFAQ } from '@/components/layout/plans/plans-faq'
import { PlansCTA } from '@/components/layout/plans/plans-cta'
import { JsonLdScript, getServiceSchema, getBreadcrumbSchema } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Mentorship Plans & Pricing - Elite Hockey Development',
  description:
    'Choose your hockey mentorship plan. Get personalized D1 mentorship, training programs, and elite coaching. Affordable plans for serious players.',
  keywords: [
    'hockey mentorship plans',
    'hockey training pricing',
    'D1 mentorship cost',
    'hockey coaching plans',
    'hockey development programs',
    'elite hockey training',
    'hockey mentorship pricing',
  ],
  openGraph: {
    title: 'Mentorship Plans & Pricing | Performix',
    description:
      'Choose your hockey mentorship plan. Personalized D1 mentorship and training programs for serious players.',
    type: 'website',
    url: 'https://www.performix.ca/plans',
    siteName: 'Performix',
    images: [
      {
        url: 'https://www.performix.ca/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Performix Mentorship Plans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentorship Plans & Pricing | Performix',
    description: 'Choose your hockey mentorship plan. Affordable plans for serious players.',
    images: ['https://www.performix.ca/opengraph-image.png'],
  },
  alternates: {
    canonical: 'https://www.performix.ca/plans',
  },
}

export default function PlansPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    ...getServiceSchema({
      name: 'Performix Hockey Mentorship',
      description:
        'Elite hockey mentorship connecting aspiring players with D1+ mentors for personalized development.',
      url: 'https://www.performix.ca/plans',
      serviceType: 'Hockey Mentorship',
    }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.performix.ca' },
      { name: 'Plans', url: 'https://www.performix.ca/plans' },
    ]),
  }

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.performix.ca/plans#webpage',
    name: 'Mentorship Plans & Pricing',
    description:
      'Choose your hockey mentorship plan. Get personalized D1 mentorship, training programs, and elite coaching.',
    url: 'https://www.performix.ca/plans',
    isPartOf: { '@id': 'https://www.performix.ca/#website' },
    about: {
      '@type': 'Service',
      name: 'Performix Hockey Mentorship',
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLdScript data={serviceJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <JsonLdScript data={webPageJsonLd} />

      <PlansHero />
      <PlansList />
      <TestimonialsSection />
      <PlansFAQ />
      <PlansCTA />
    </div>
  )
}
