import { notFound } from 'next/navigation'
import { MentorProfileClient } from '@/components/layout/mentors/profile'
import { getMentor } from '@/lib/data/mentors'
import { Media } from '@/payload-types'

interface MentorProfilePageProps {
  params: Promise<{ slug: string }>
}

export default async function MentorProfilePage(props: MentorProfilePageProps) {
  const params = await props.params
  const { slug } = params

  // Fetch mentor data on the server
  const mentor = await getMentor(slug)

  if (!mentor) {
    notFound()
  }

  return <MentorProfileClient mentor={mentor} />
}

export async function generateMetadata(props: MentorProfilePageProps) {
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

  return {
    title: `${mentor.name} - ${mentor.position} | Performix`,
    description: mentor.intro,
    openGraph: {
      title: `${mentor.name} - ${mentor.position}`,
      description: mentor.intro,
      images: [
        {
          url: avatarUrl,
          width: 1200,
          height: 630,
          alt: `${mentor.name} - ${mentor.position}`,
        },
      ],
    },
  }
}
