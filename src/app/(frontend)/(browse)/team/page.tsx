import { buttonVariants } from '@/components/ui/button'
import { getTeamMembers } from '@/lib/data/team-members'
import { SpecialistCard } from '@/components/layout/team/specialist-card'
import { FAQSection } from '@/components/layout/home'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { ArrowRight } from 'lucide-react'
import { FeaturedMentors } from '@/components/layout/team/featured-mentors'

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div>
      <section id="overview">
        <div className="py-16 px-4 bg-gradient-to-b from-muted to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              The Performix Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              An integrated group of specialists across skill, HockeyIQ, strength, sport science,
              nutrition, and mental performance.
            </p>
          </div>
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
              href="https://calendly.com/mateodixon/d1-team-demo"
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
