import Header from '@/components/layout/header'
import { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from 'sonner'
import Footer from '../../components/layout/footer'

import HeaderSkeleton from '@/components/layout/header/header-skeleton'
import { JsonLdScript } from '@/lib/seo/jsonld'
import '@/lib/styles/globals.css'
import '@/lib/styles/scroll-animations.css'
import { Suspense } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.performix.ca'),
  title: {
    default: 'Performix - Elite Hockey Mentorship | Your Path To Excellence',
    template: '%s | Performix',
  },
  description:
    'Connect with elite D1+ hockey mentors. Personalized guidance to elevate your game and smash your goals.',
  keywords: [
    'hockey mentorship',
    'D1 hockey',
    'hockey training',
    'hockey coaching',
    'hockey development',
    'hockey mentors',
    'elite hockey',
  ],
  authors: [{ name: 'Performix' }],
  creator: 'Performix',
  publisher: 'Performix',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://www.performix.ca',
    siteName: 'Performix',
    title: 'Performix - Elite Hockey Mentorship',
    description:
      'Connect with elite D1+ hockey mentors. Personalized guidance to elevate your game.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Performix - Elite Hockey Mentorship',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performix - Elite Hockey Mentorship',
    description:
      'Connect with elite D1+ hockey mentors. Personalized guidance to elevate your game.',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.performix.ca',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.performix.ca/#organization',
        name: 'Performix',
        url: 'https://www.performix.ca',
        logo: 'https://www.performix.ca/performix-logo.png',
        sameAs: [
          'https://www.instagram.com/performix',
          'https://www.youtube.com/@performix',
        ],
        description:
          'Elite hockey mentorship platform connecting aspiring players with D1+ mentors for personalized development.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'support@performix.ca',
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.performix.ca/#website',
        url: 'https://www.performix.ca',
        name: 'Performix',
        description:
          'Elite hockey mentorship platform connecting aspiring players with D1+ mentors.',
        publisher: { '@id': 'https://www.performix.ca/#organization' },
        inLanguage: 'en-CA',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.performix.ca/mentors?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        <JsonLdScript data={websiteGraph} />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
