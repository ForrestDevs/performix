import { type Specialist, SpecialistGrid } from '@/components/layout/team/specialist-grid'
import { Card } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getTeamMembers } from '@/lib/data/team-members'
import { SpecialistCard } from '@/components/layout/team/specialist-card'
import { FAQSection } from '@/components/layout/home'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { ArrowRight } from 'lucide-react'
import { FeaturedMentors } from '@/components/layout/team/featured-mentors'

export const specialists: Specialist[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Skill Development Coach',
    domainTags: ['Skill', 'HockeyIQ'],
    approach:
      'Video-first breakdown with micro-adjustments. Focus on edge work and puck protection under pressure.',
    affiliation: 'Former NCAA D1 Coach',
    availability: 'Active',
    modalities: ['Async', 'Virtual', 'In-person'],
    bookings: 45,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Strength & Conditioning',
    domainTags: ['Strength', 'Sport Science'],
    approach:
      'Periodized training blocks tailored to hockey demands. Emphasis on explosive power and injury prevention.',
    affiliation: 'CSCS, NSCA',
    availability: 'Active',
    modalities: ['Virtual', 'In-person'],
    bookings: 38,
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    role: 'Sport Nutritionist',
    domainTags: ['Nutrition', 'Sport Science'],
    approach:
      'Evidence-based meal planning for performance and recovery. Individualized macros and timing strategies.',
    affiliation: 'PhD Sport Nutrition',
    availability: 'Active',
    modalities: ['Async', 'Virtual'],
    bookings: 52,
  },
  {
    id: '4',
    name: 'James Patterson',
    role: 'Mental Performance Coach',
    domainTags: ['Mental', 'HockeyIQ'],
    approach:
      'Cognitive training for decision-making under pressure. Visualization and pre-game routines.',
    affiliation: 'CMPC Certified',
    availability: 'Waitlist',
    modalities: ['Virtual'],
    bookings: 29,
  },
  {
    id: '5',
    name: 'Alex Thompson',
    role: 'HockeyIQ Specialist',
    domainTags: ['HockeyIQ', 'Skill'],
    approach:
      'Game situation analysis and pattern recognition. Teaches reading plays before they develop.',
    affiliation: 'Pro Scout',
    availability: 'Active',
    modalities: ['Async', 'Virtual'],
    bookings: 41,
  },
  {
    id: '6',
    name: 'Dr. Kevin Walsh',
    role: 'Sport Scientist',
    domainTags: ['Sport Science', 'Strength'],
    approach:
      'Data-driven performance optimization. GPS tracking, heart rate variability, and load management.',
    affiliation: 'PhD Exercise Physiology',
    availability: 'Active',
    modalities: ['Async', 'Virtual'],
    bookings: 33,
  },
]

export interface Mentor {
  id: string
  name: string
  school: string
  position: string
  strengths: string[]
}

export const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Tyler Johnson',
    school: 'Boston University',
    position: 'Forward',
    strengths: ['Recruiting', 'Training', 'Academics'],
  },
  {
    id: '2',
    name: 'Emma Davis',
    school: 'University of Wisconsin',
    position: 'Defense',
    strengths: ['D1 Transition', 'Time Management'],
  },
  {
    id: '3',
    name: 'Ryan Martinez',
    school: 'University of Michigan',
    position: 'Goalie',
    strengths: ['Mental Game', 'Position-specific'],
  },
  {
    id: '4',
    name: 'Sophie Anderson',
    school: 'University of Minnesota',
    position: 'Forward',
    strengths: ['Leadership', 'Nutrition'],
  },
]

const faqs = [
  {
    question: 'How does pricing work?',
    answer:
      'Pricing varies by specialist and service type. Async breakdowns start at $75, live sessions at $150, and custom modules are quoted individually. Team packages available.',
  },
  {
    question: 'How quickly can I get started?',
    answer:
      'Most specialists respond within 24 hours. Active specialists can typically schedule within 3-5 days. Async deliverables are usually completed within 48-72 hours.',
  },
  {
    question: "What's the difference between async and live sessions?",
    answer:
      'Async sessions involve video analysis and written feedback delivered on your schedule. Live sessions are real-time video calls for interactive coaching and Q&A.',
  },
  {
    question: 'Are specialists independent contractors?',
    answer:
      'Yes. All specialists operate independently and retain IP on their methods unless otherwise agreed. Affiliations shown may be historical unless marked Active.',
  },
  {
    question: 'How do referrals work?',
    answer:
      'Refer a player or team and receive 10% credit toward future sessions. Specialists also earn referral bonuses for successful matches.',
  },
]

export default async function TeamPage() {
  // const teamMembers = await getTeamMembers()

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

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center"
                    >
                      <div className="w-4 h-4 bg-primary/20 rounded-full" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Independent specialists. Clear roles. Athlete-first.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="specialists" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {specialists.map((specialist) => (
              <SpecialistCard key={specialist.id} specialist={specialist} />
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
                'bg-white text-primary hover:bg-primary-foreground hover:text-white border-2 border-white shadow-lg transition-all duration-200 w-full sm:w-auto',
              )}
            >
              Request a Team Session
            </Link>
            <Link
              href="mailto:hello@d1skills.com?subject=Team%20Development%20Player%20Rosters"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'border-white text-white hover:bg-white hover:text-primary transition-all duration-200 w-full sm:w-auto',
              )}
            >
              Share Player Details
            </Link>
          </div>
        </div>
      </section>

      <FAQSection />
    </div>
  )
}
