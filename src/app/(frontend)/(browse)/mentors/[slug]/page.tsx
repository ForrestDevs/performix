import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MentorProfileClient } from '@/components/layout/mentors/profile'
import { getMentor, getMentors } from '@/lib/data/mentors'
import { Media } from '@/payload-types'
import { JsonLdScript, getPersonSchema, getBreadcrumbSchema } from '@/lib/seo/jsonld'

interface MentorProfilePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const mentors = await getMentors()
  return mentors.map((mentor) => ({
    slug: mentor.slug,
  }))
}

export async function generateMetadata(props: MentorProfilePageProps): Promise<Metadata> {
  const params = await props.params
  const { slug } = params

  const mentor = await getMentor(slug)

  if (!mentor) {
    return {
      title: 'Mentor Not Found',
      description: 'The requested mentor profile could not be found.',
    }
  }

  const avatarUrl = (mentor.avatar as Media)?.url
  const fullAvatarUrl = avatarUrl?.startsWith('http')
    ? avatarUrl
    : `https://www.performix.ca${avatarUrl}`

  const positionLabel =
    mentor.position === 'forward'
      ? 'Forward'
      : mentor.position === 'defence'
        ? 'Defence'
        : mentor.position === 'goalie'
          ? 'Goalie'
          : mentor.position

  return {
    title: `${mentor.name} - ${positionLabel} | Hockey Mentor`,
    description:
      mentor.intro ||
      `Connect with ${mentor.name}, an elite ${positionLabel} mentor at Performix. Get personalized hockey development and guidance.`,
    keywords: [
      mentor.name || '',
      'hockey mentor',
      positionLabel || '',
      mentor.levelOfPlay || '',
      'D1 hockey',
      'hockey coaching',
      ...(mentor.skills || []),
    ].filter(Boolean),
    openGraph: {
      title: `${mentor.name} - ${positionLabel} | Performix Mentor`,
      description:
        mentor.intro ||
        `Connect with ${mentor.name}, an elite hockey mentor at Performix.`,
      type: 'profile',
      url: `https://www.performix.ca/mentors/${slug}`,
      images: avatarUrl
        ? [
            {
              url: fullAvatarUrl,
              width: 600,
              height: 600,
              alt: `${mentor.name} - ${positionLabel}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${mentor.name} - ${positionLabel}`,
      description: mentor.intro || `Elite hockey mentor at Performix.`,
      images: avatarUrl ? [fullAvatarUrl] : undefined,
    },
    alternates: {
      canonical: `https://www.performix.ca/mentors/${slug}`,
    },
  }
}

export default async function MentorProfilePage(props: MentorProfilePageProps) {
  const params = await props.params
  const { slug } = params

  const mentor = await getMentor(slug)

  if (!mentor) {
    notFound()
  }

  const avatarUrl = (mentor.avatar as Media)?.url
  const fullAvatarUrl = avatarUrl?.startsWith('http')
    ? avatarUrl
    : `https://www.performix.ca${avatarUrl}`

  const positionLabel =
    mentor.position === 'forward'
      ? 'Forward'
      : mentor.position === 'defence'
        ? 'Defence'
        : mentor.position === 'goalie'
          ? 'Goalie'
          : mentor.position

  const personJsonLd = {
    '@context': 'https://schema.org',
    ...getPersonSchema({
      name: mentor.name || '',
      description: mentor.intro || undefined,
      image: avatarUrl ? fullAvatarUrl : undefined,
      url: `https://www.performix.ca/mentors/${slug}`,
      jobTitle: `${positionLabel} - Hockey Mentor`,
      worksFor: mentor.currentTeam || 'Performix',
    }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.performix.ca' },
      { name: 'Mentors', url: 'https://www.performix.ca/mentors' },
      { name: mentor.name || 'Mentor', url: `https://www.performix.ca/mentors/${slug}` },
    ]),
  }

  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `https://www.performix.ca/mentors/${slug}#profilepage`,
    name: `${mentor.name} - Hockey Mentor Profile`,
    description: mentor.intro || `Profile page for ${mentor.name}, elite hockey mentor at Performix.`,
    url: `https://www.performix.ca/mentors/${slug}`,
    mainEntity: {
      '@type': 'Person',
      '@id': `https://www.performix.ca/mentors/${slug}#person`,
    },
  }

  return (
    <>
      <JsonLdScript data={personJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <JsonLdScript data={profilePageJsonLd} />
      <MentorProfileClient mentor={mentor} />
    </>
  )
}
