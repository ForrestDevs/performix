import {
  FAQSection,
  HowItWorksSection,
  NextStepsSection,
  ValuePropSection,
  WhatYouGetEveryMonth,
} from '@/components/layout/home'
import { FeaturedMentorsSection } from '@/components/layout/home/featured-mentors'
import { TestimonialsSection } from '@/components/layout/home/testimonials'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { JsonLdScript } from '@/lib/seo/jsonld'
import { cn } from '@/lib/utilities/ui'
import { ArrowRight, CheckCircle, TrendingUp, Users } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hockey Development System | Performix',
  description:
    'With our elite D1+ hockey mentors, you get personalized guidance, proven training systems, and expert coaching to elevate your game and crush your hockey goals.',
  keywords: [
    'hockey mentorship',
    'D1 hockey',
    'hockey training',
    'hockey coaching',
    'elite hockey development',
    'hockey player development',
    'hockey mentors',
    'hockey skills training',
    'college hockey',
    'hockey performance',
  ],
  openGraph: {
    title: 'Hockey Development System | Performix',
    description:
      'With our elite D1+ hockey mentors, you get personalized guidance, proven training systems, and expert coaching to elevate your game and crush your hockey goals.',
    type: 'website',
    url: 'https://www.performix.ca',
    siteName: 'Performix',
    images: [
      {
        url: 'https://www.performix.ca/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Performix - Elite Hockey Mentorship',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hockey Development System | Performix',
    description:
      'With our elite D1+ hockey mentors, you get personalized guidance, proven training systems, and expert coaching to elevate your game and crush your hockey goals.',
    images: ['https://www.performix.ca/opengraph-image.png'],
  },
  alternates: {
    canonical: 'https://www.performix.ca',
  },
}

// FAQ data for structured data
const faqs = [
  {
    question: 'What is Performix?',
    answer:
      'Performix is a high-performance development platform built by D1/pro athletes and top experts—performance coaches, specialists, and experienced team coaches. You get paired with your own personal D1 mentor and gain access to elite tools: custom training, nutrition, mindset strategies, video breakdowns, recruiting support, and a proven system designed to accelerate your development.',
  },
  {
    question: 'Who is Performix for?',
    answer:
      'Performix is for driven hockey players (typically ages 13-18) looking to develop faster, train smarter, and reach the next level—whether that is prep, juniors, or Division 1.',
  },
  {
    question: 'What do I get with Performix?',
    answer:
      'Depending on your package, you get matched with a personal mentor and unlock full access to the Performix system—including custom development plans, biweekly Zoom calls, goal-setting support, private video feedback, and unlimited mentor access. You will also get the full course, nutrition tools, mindset strategies, and recruiting guidance tailored to your game.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Book a free Zoom call so we can learn about your goals and pair you with the right mentor. From there, you\'ll unlock your tools, schedule your sessions, and start making real progress.',
  },
  {
    question: "What's coming next on Performix?",
    answer:
      'We are bringing in new NHL-level experts, launching exclusive high-level content, and expanding our free Resource Hub—packed with free valuable tools, breakdowns, and insight players can use right away. We are also building new offerings across skill development, rehab and more.',
  },
]

export default function HomePage() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.performix.ca/#organization',
    name: 'Performix',
    url: 'https://www.performix.ca',
    logo: 'https://www.performix.ca/performix-logo.png',
    sameAs: [
      'https://www.instagram.com/performix',
      'https://www.youtube.com/@performix',
    ],
    description: 'Elite hockey mentorship platform connecting aspiring players with D1+ mentors.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@performix.ca',
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLdScript data={organizationJsonLd} />
      <JsonLdScript data={faqJsonLd} />

      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0891B2]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge className="bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 animate-bounce-subtle">
                  Elite Mentorship Platform
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-['Space_Grotesk']">
                  The Future of{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                    Hockey Development
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  <strong>Why not go further, faster? </strong>Work directly with D1 hockey mentors,
                  use elite tools across every part of the game, and follow a personalized system
                  built around you — so you can finally become the player you know you&apos;re
                  capable of being.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="game-plan"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl',
                  )}
                >
                  Start your game plan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/mentors"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300',
                  )}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Explore our team
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2 hover:text-[#0891B2] transition-colors duration-200">
                  <CheckCircle className="h-5 w-5 text-[#0891B2]" />
                  <span className="text-base">30+ D1 Mentors</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 hover:scale-105 transition-transform duration-500">
                <Image
                  src="/hero2.webp"
                  alt="Hockey player in action demonstrating elite skills"
                  width={800}
                  height={600}
                  className="w-full h-full object-contain"
                  priority={true}
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2.5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#0891B2]/90 to-[#8B5CF6]/90 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      <span className="text-[#0891B2] font-semibold">100%</span> of athletes
                      <br />
                      <span className="text-gray-500 text-[11px]">report accelerated progress</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="w-full max-w-5xl">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-white">
              <iframe
                src="https://www.youtube.com/embed/fJsgFnU3XRg"
                title="Performix - Elite Hockey Mentorship"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Link
              href="https://calendly.com/mateodixon/d1-mentorship-call"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Free Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <ValuePropSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <WhatYouGetEveryMonth />
      <NextStepsSection />
      <FeaturedMentorsSection />

      <FAQSection />
      <section className="py-20 bg-gradient-to-r from-[#0891B2] to-[#0E7490]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of players already working with elite mentors to achieve their D1 dreams
            </p>
            <div className="max-w-md mx-auto">
              <Link
                href="https://calendly.com/mateodixon/d1-mentorship-call"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl',
                )}
              >
                Book Your Free Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
