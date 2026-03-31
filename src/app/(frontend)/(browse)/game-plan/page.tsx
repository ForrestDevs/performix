import { GamePlanForm } from '@/components/layout/game-plan/form'
import { PERFORMIX_DISPLAY_TITLE_CLASS } from '@/lib/constants/typography'
import { JsonLdScript, getBreadcrumbSchema } from '@/lib/seo/jsonld'
import { cn } from '@/lib/utilities/ui'
import type { Metadata } from 'next'

const pageTitle = 'Get Your Free Development Game Plan'
const pageDescription =
  'Fill out the form below and we’ll help you find the best path forward based on your game, goals, and current situation.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'hockey game plan',
    'hockey assessment',
    'hockey development plan',
    'D1 hockey path',
    'hockey goals',
    'free hockey consultation',
    'hockey player assessment',
  ],
  openGraph: {
    title: `${pageTitle} | Performix`,
    description: pageDescription,
    type: 'website',
    url: 'https://www.performix.ca/game-plan',
    siteName: 'Performix',
    images: [
      {
        url: 'https://www.performix.ca/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Performix Game Plan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | Performix`,
    description: pageDescription,
    images: ['https://www.performix.ca/opengraph-image.png'],
  },
  alternates: {
    canonical: 'https://www.performix.ca/game-plan',
  },
}

export default function GamePlanPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.performix.ca' },
      { name: 'Game Plan', url: 'https://www.performix.ca/game-plan' },
    ]),
  }

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.performix.ca/game-plan#webpage',
    name: pageTitle,
    description: pageDescription,
    url: 'https://www.performix.ca/game-plan',
    isPartOf: { '@id': 'https://www.performix.ca/#website' },
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#e0f4fc] via-[#f8faff] to-[#ede9fe] flex flex-col items-center space-y-8 py-16">
      <JsonLdScript data={breadcrumbJsonLd} />
      <JsonLdScript data={webPageJsonLd} />

      <div className="container w-full max-w-3xl mx-auto text-center">
        <h1 className={cn(PERFORMIX_DISPLAY_TITLE_CLASS, 'text-[#0EA5E9] mb-3 drop-shadow')}>
          {pageTitle}
        </h1>
        <p className="text-gray-700 text-xl mb-4">{pageDescription}</p>
      </div>

      <div className="container max-w-2xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg border border-[#0EA5E9]/10 backdrop-blur p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0891B2] mb-6 text-center tracking-tight font-['Space_Grotesk']">
          Your game plan form
        </h2>
        <GamePlanForm />
      </div>
    </main>
  )
}
