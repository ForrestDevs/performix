import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowDown, ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { MessageReviews } from '@/components/layout/reviews/messages'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'

const testimonials = [
  {
    name: 'Ethan',
    level: 'AAA U16 → D1 Commit',
    quote: 'I finally know what to work on every week.',
    thumbnail: '/hockey-player-training-ice.jpg',
  },
  {
    name: 'Marcus',
    level: 'AAA U18 → Junior A',
    quote: 'My confidence went from zero to unstoppable.',
    thumbnail: '/hockey-player-game-action.jpg',
  },
  {
    name: 'Sarah',
    level: 'AAA U16 → National Team',
    quote: 'Everything finally connects. I see the game differently.',
    thumbnail: '/female-hockey-player-skating.jpg',
  },
  {
    name: 'Jake',
    level: 'AAA U17 → D1 Prospect',
    quote: 'I stopped guessing. Now I track everything and see results.',
    thumbnail: '/hockey-player-strength-training.jpg',
  },
  {
    name: 'Parent - Mike',
    level: 'Father of D1 Commit',
    quote: 'We finally found a system that works for the whole athlete.',
    thumbnail: '/hockey-parent-watching-game.jpg',
  },
]

const messages = [
  {
    text: 'He helped me completely change my mindset around confidence.',
    name: 'Ethan M.',
    time: '2:34 PM',
  },
  {
    text: "It's like having a roadmap — everything connects.",
    name: 'Sarah K.',
    time: '11:22 AM',
  },
  {
    text: 'I stopped guessing what to do every week. Now I track everything.',
    name: 'Jake R.',
    time: '4:15 PM',
  },
  {
    text: 'My strength gains were insane. Finally training the right way.',
    name: 'Marcus D.',
    time: '9:45 AM',
  },
  {
    text: 'The system made me realize I was capable of so much more.',
    name: 'Alex L.',
    time: '1:20 PM',
  },
  {
    text: 'Every session has a purpose. No more wasted time.',
    name: 'Chris T.',
    time: '3:50 PM',
  },
  {
    text: 'My skating improved dramatically in just 8 weeks.',
    name: 'Brandon H.',
    time: '10:30 AM',
  },
  {
    text: 'Finally someone who understands the mental game at this level.',
    name: 'Dylan P.',
    time: '5:12 PM',
  },
  {
    text: 'The accountability changed everything for me.',
    name: 'Ryan W.',
    time: '8:25 AM',
  },
  {
    text: 'I went from benchwarmer to top line in one season.',
    name: 'Kyle S.',
    time: '2:18 PM',
  },
  {
    text: "Best investment we've made in our son's hockey career.",
    name: 'Jennifer M.',
    time: '7:40 PM',
  },
  {
    text: 'The nutrition plan alone was worth it. I feel unstoppable.',
    name: 'Noah F.',
    time: '6:55 AM',
  },
  {
    text: 'I finally understand what scouts are looking for.',
    name: 'Tyler L.',
    time: '12:05 PM',
  },
  {
    text: 'My shot velocity increased by 12 mph in 3 months.',
    name: 'Gavin R.',
    time: '4:42 PM',
  },
  {
    text: 'The mental training helped me stay calm under pressure.',
    name: 'Victoria C.',
    time: '11:15 AM',
  },
]

const caseStudies = [
  {
    name: 'Alex Thompson',
    image: '/hockey-player-portrait-confident.jpg',
    before:
      "Struggled with consistency and mental blocks. Talented but couldn't translate practice to games.",
    system:
      'Implemented weekly mental performance sessions, personalized skill tracking, and integrated strength program.',
    after: 'Committed to D1 program within 8 months. Now leads team in points and confidence.',
    tags: ['Mindset', 'Performance'],
  },
  {
    name: 'Jordan Lee',
    image: '/hockey-player-action-skating.jpg',
    before: 'Fast but weak. Getting outmuscled in corners and losing puck battles consistently.',
    system:
      'Custom strength program focused on functional hockey movements. Nutrition optimization and recovery protocols.',
    after:
      '15 lbs of lean muscle in 12 weeks. Now dominates physical play and wins 70% of battles.',
    tags: ['Physical', 'Strength'],
  },
  {
    name: 'Riley Martinez',
    image: '/hockey-player-celebration-team.jpg',
    before:
      'Skilled player but no clear development path. Parents frustrated with lack of direction.',
    system:
      'Created comprehensive 2-year roadmap. Weekly check-ins with Mateo. Integrated technical, mental, and physical training.',
    after:
      'Invited to national team camp. Clear trajectory to D1. Family has complete confidence in the process.',
    tags: ['Strategy', 'Development'],
  },
]

export default function ReviewsPage() {
  return (
    <div>
      <section className="py-16 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-balance text-foreground">
              The Performix <span className="text-primary">Effect</span>
            </h1>

            <blockquote className="text-xl md:text-2xl font-medium text-muted-foreground italic text-balance pt-2">
              &quot;You&apos;re not the problem. Your system is.&quot;
            </blockquote>

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

            <p className="text-lg text-muted-foreground leading-relaxed">
              Every player you see here once felt stuck. They weren&apos;t lacking effort — they
              were missing a system that actually worked. Here&apos;s what happened when they found
              it.
            </p>
          </div>
          <ArrowDown className="w-6 h-6 text-primary animate-bounce mx-auto mt-4" />
        </div>
      </section>
      <section className="py-20 px-4 bg-gradient-to-b from-background via-blue-50/30 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-balance text-foreground">
              Hear It From <span className="text-primary bg-primary/10 px-2 rounded">The Players</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Real transformations, real voices. Trust your next step.
            </p>
            <div className="flex justify-center mt-6">
              <span className="h-1 w-24 rounded-full bg-primary/30" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border border-border hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                  <Image
                    width={1000}
                    height={1000}
                    src={testimonial.thumbnail || '/placeholder.svg'}
                    alt={`${testimonial.name} testimonial`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/40 to-transparent opacity-90 group-hover:opacity-75 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-2xl group-hover:scale-110 border-[3px] border-white/80 transition-transform duration-300">
                      <Play className="w-7 h-7 text-primary-foreground" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-3">
                    <p className="text-base md:text-lg text-white/90 italic font-medium drop-shadow">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-card rounded-b-lg flex flex-col items-start gap-1">
                  <h3 className="font-bold text-xl text-foreground tracking-tight leading-snug">
                    {testimonial.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded">
                      {testimonial.level}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="mt-1 text-primary/90 hover:text-primary bg-white/0 font-medium p-0 h-auto transition-colors hover:underline"
                  >
                    Watch Full Story
                    <ArrowRight className="ml-1.5 w-4 h-4 inline" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              What <span className="text-primary">Athletes Say</span>
            </h2>
          </div>
          <div>
            <MessageReviews messages={messages} />
          </div>
        </div>
      </section>
      <section className="py-24 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The <span className="text-primary">Transformation</span> Stories
            </h2>
            <p className="text-xl text-muted-foreground">From stuck to unstoppable</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 group"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    width={1000}
                    height={1000}
                    src={study.image || '/placeholder.svg'}
                    alt={study.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{study.name}</h3>
                    <div className="flex gap-2">
                      {study.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-1">BEFORE</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.before}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-primary mb-1">THE SYSTEM</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.system}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-primary mb-1">AFTER</h4>
                    <p className="text-sm text-foreground leading-relaxed font-medium">
                      {study.after}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full text-primary hover:text-primary/80 group/btn"
                  >
                    See Full Breakdown
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
