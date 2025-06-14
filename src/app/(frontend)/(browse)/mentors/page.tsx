import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { ClientWrapper, LoadMoreButton } from '@/components/layout/mentors/browse'
import { filterAndSortMentors, type MentorSample } from '@/lib/mentors-utils'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { getMentors } from '@/lib/data/mentors'

interface BrowseMentorsPageProps {
  searchParams: Promise<{
    q?: string // Search query
    position?: string // Position filter (Forward, Defenseman, Goalie)
    view?: string // View mode (grid, list)
    sort?: string // Sort option (rating, price-low, price-high, etc.)
    page?: string // Pagination
  }>
}

/**
 * Server Component for browsing mentors
 *
 * This component:
 * - Runs on the server and handles search parameters
 * - Filters and sorts mentors based on URL parameters
 * - Wraps client components with NuqsAdapter for URL state management
 * - Maintains SEO-friendly URLs with search/filter state
 */
export default async function BrowseMentorsPage({ searchParams }: BrowseMentorsPageProps) {
  // const {} = browseMentorsParamsCache.all()




  const params = await searchParams

  const mentors = await getMentors()

  // Sample mentor data - in a real app, this would come from a database/API
  // and would be filtered/sorted at the database level for better performance
  // const mentors: MentorSample[] = [
  //   {
  //     id: '1',
  //     name: 'Jake Morrison',
  //     position: 'Forward',
  //     university: 'Harvard University',
  //     experience: 'D1 + Pro',
  //     rating: 4.9,
  //     reviews: 127,
  //     price: 150,
  //     availability: 'Available',
  //     specializations: ['Recruiting', 'Skills Development', 'Mental Game'],
  //     bio: '3x All-American with extensive recruiting experience. Helped 50+ players secure D1 commitments.',
  //     successRate: 96,
  //     studentsHelped: 73,
  //     achievements: ['3x All-American', 'Team Captain', 'Academic All-Star'],
  //     videoIntro: true,
  //   },
  //   {
  //     id: '2',
  //     name: 'Sarah Chen',
  //     position: 'Defenseman',
  //     university: 'University of Michigan',
  //     experience: 'D1 + Olympic',
  //     rating: 5.0,
  //     reviews: 89,
  //     price: 200,
  //     availability: 'Busy',
  //     specializations: ['Defense Strategy', 'Leadership', 'Recruiting'],
  //     bio: 'Olympic medalist and former team captain. Specializes in defensive positioning and leadership development.',
  //     successRate: 98,
  //     studentsHelped: 45,
  //     achievements: ['Olympic Silver', 'NCAA Champion', 'Defensive Player of Year'],
  //     videoIntro: true,
  //   },
  //   {
  //     id: '3',
  //     name: 'Mike Rodriguez',
  //     position: 'Goalie',
  //     university: 'Boston College',
  //     experience: 'D1 + NHL Draft',
  //     rating: 4.8,
  //     reviews: 156,
  //     price: 175,
  //     availability: 'Available',
  //     specializations: ['Goaltending', 'Mental Toughness', 'Video Analysis'],
  //     bio: 'NHL draft pick with expertise in goaltending fundamentals and mental preparation.',
  //     successRate: 94,
  //     studentsHelped: 62,
  //     achievements: ['NHL Draft Pick', 'Hockey East Champion', 'All-Tournament Team'],
  //     videoIntro: false,
  //   },
  //   {
  //     id: '4',
  //     name: 'Emma Thompson',
  //     position: 'Forward',
  //     university: 'University of Minnesota',
  //     experience: 'D1 + NCAA Champion',
  //     rating: 4.9,
  //     reviews: 203,
  //     price: 125,
  //     availability: 'Available',
  //     specializations: ['Offensive Strategy', 'Power Play', 'Recruiting'],
  //     bio: 'NCAA champion with a focus on offensive development and power play systems.',
  //     successRate: 92,
  //     studentsHelped: 89,
  //     achievements: ['NCAA Champion', 'Conference MVP', 'Academic Excellence'],
  //     videoIntro: true,
  //   },
  //   {
  //     id: '5',
  //     name: 'Alex Johnson',
  //     position: 'Forward',
  //     university: 'Boston University',
  //     experience: 'D1',
  //     rating: 4.7,
  //     reviews: 78,
  //     price: 100,
  //     availability: 'Available',
  //     specializations: ['Skills Development', 'Conditioning', 'Recruiting'],
  //     bio: 'Recent graduate with fresh perspective on modern recruiting and training methods.',
  //     successRate: 89,
  //     studentsHelped: 34,
  //     achievements: ['Team Captain', 'Conference All-Star', 'Leadership Award'],
  //     videoIntro: false,
  //   },
  //   {
  //     id: '6',
  //     name: 'Maya Patel',
  //     position: 'Defenseman',
  //     university: 'Yale University',
  //     experience: 'D1',
  //     rating: 4.8,
  //     reviews: 92,
  //     price: 140,
  //     availability: 'Limited',
  //     specializations: ['Academic Balance', 'Time Management', 'Recruiting'],
  //     bio: 'Ivy League graduate specializing in balancing academics and athletics at the highest level.',
  //     successRate: 95,
  //     studentsHelped: 41,
  //     achievements: ['Academic All-American', 'Ivy League Champion', 'Scholar Athlete'],
  //     videoIntro: true,
  //   },
  // ]

  // Filter and sort mentors based on search parameters
  // This runs on the server, providing better performance and SEO
  const filteredMentors = filterAndSortMentors(mentors, params)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NuqsAdapter provides URL state management for client components */}
      <NuqsAdapter>
        <ClientWrapper mentors={filteredMentors} searchParams={params} />

        {/* Load More Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <LoadMoreButton />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#0891B2] to-[#0E7490]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Can&apos;t Find the Perfect Match?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let us help you find the ideal mentor based on your specific goals and preferences
            </p>
            <Link
              href="https://calendly.com/mateodixon/d1-mentorship-call"
              className={cn(
                'border-white text-white hover:bg-white hover:text-[#0891B2] px-8',
                buttonVariants({ variant: 'outline' }),
              )}
            >
              Schedule a Consultation
            </Link>
          </div>
        </section>
      </NuqsAdapter>
    </div>
  )
}
