import type { Metadata } from 'next'
import { buttonVariants } from '@/components/ui/button'
import { getTeamMembers } from '@/lib/data/team-members'
import { SpecialistCard } from '@/components/layout/team/specialist-card'
import { FAQSection } from '@/components/layout/home'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { ArrowRight } from 'lucide-react'
import { FeaturedMentors } from '@/components/layout/team/featured-mentors'
import { JsonLdScript, getBreadcrumbSchema } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Our Team - Meet the Performix Specialists & Mentors',
  description:
    'Meet our team of elite specialists and D1 hockey mentors. Experts in skill development, HockeyIQ, strength training, nutrition, and mental performance.',
  keywords: [
    'performix team',
    'hockey specialists',
    'hockey coaches',
    'D1 hockey mentors',
    'hockey trainers',
    'sports performance experts',
    'hockey development team',
  ],
  openGraph: {
    title: 'Meet Our Team | Performix',
    description:
      'Meet our team of elite specialists and D1 hockey mentors. Experts across all aspects of hockey development.',
    type: 'website',
    url: 'https://www.performix.ca/team',
    siteName: 'Performix',
    images: [
      {
        url: 'https://www.performix.ca/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Performix Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Our Team | Performix',
    description: 'Elite specialists and D1 hockey mentors at Performix.',
    images: ['https://www.performix.ca/opengraph-image.png'],
  },
  alternates: {
    canonical: 'https://www.performix.ca/team',
  },
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.performix.ca/#organization',
    name: 'Performix',
    url: 'https://www.performix.ca',
    logo: 'https://www.performix.ca/performix-logo.png',
    description: 'Elite hockey mentorship platform connecting aspiring players with D1+ mentors.',
    employee: teamMembers.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.title,
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.performix.ca' },
      { name: 'Team', url: 'https://www.performix.ca/team' },
    ]),
  }

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://www.performix.ca/team#aboutpage',
    name: 'The Performix Team',
    description:
      'Meet our integrated group of specialists across skill, HockeyIQ, strength, sport science, nutrition, and mental performance.',
    url: 'https://www.performix.ca/team',
    isPartOf: { '@id': 'https://www.performix.ca/#website' },
  }

  return (
    <div>
      <JsonLdScript data={organizationJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <JsonLdScript data={aboutPageJsonLd} />

      <section id="overview" className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground drop-shadow-sm mb-8 tracking-tight leading-tight font-['Space_Grotesk']">
            The Performix Team
          </h1>
          <div className="w-16 h-1 bg-[#0891B2] rounded-full mx-auto mb-8 opacity-70" />
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl leading-relaxed mx-auto text-balance">
            An integrated group of specialists across skill, HockeyIQ,<br className="hidden md:inline" />
            strength, sport science, nutrition, and mental performance.
          </p>
        </div>
      </section>
      <section id="specialists" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {teamMembers.map((teamMember) => (
              <SpecialistCard key={teamMember.id} teamMember={teamMember} />
            ))}
          </div>
        </div>
      </section>
      <section id="mentors" className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">D1 Mentors</h2>
            <p className="text-muted-foreground">
              Connect with current college athletes for guidance and insights.
            </p>
          </div>

          <FeaturedMentors />

          <div className="mt-8 text-center">
            <Link
              href="/mentors"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl',
              )}
            >
              Browse All Mentors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-gradient-to-b from-[#0891B2] to-[#0E7490]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-sm font-['Space_Grotesk']">
              Bring This Program to Your Team
            </h2>
            <p className="text-lg text-white/90 max-w-md">
              Give your entire roster elite, structured development.
              <br className="hidden sm:block" />
              Empower your players with personalized athlete growth.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href="https://calendly.com/mateodixon/d1-mentorship-call"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-white text-primary hover:bg-primary-foreground border-2 border-white shadow-lg transition-all duration-200 w-full sm:w-auto',
              )}
            >
              Request a Team Session
            </Link>
          </div>
        </div>
      </section>
      <FAQSection />
    </div>
  )
}
