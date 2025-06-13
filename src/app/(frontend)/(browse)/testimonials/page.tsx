'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Play,
  Star,
  ChevronRight,
  ChevronLeft,
  Quote,
  TrendingUp,
  Users,
  Award,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { PerformixLogo } from '@/components/logo'
import Breadcrumb from '@/components/layout/header/breadcrumb'
import { cn } from '@/lib/utilities/ui'

// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
}: {
  end: number
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [hasStarted, end, duration])

  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function TestimonialsPage() {
  const visibleElements = useScrollAnimation()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentJourneyIndex, setCurrentJourneyIndex] = useState(0)

  const isVisible = (id: string) => visibleElements.has(id)

  // Sample data
  const videoTestimonials = [
    {
      id: 1,
      name: 'Alex Johnson',
      position: 'Forward',
      university: 'Boston University',
      thumbnail: '/placeholder.svg?height=300&width=400',
      duration: '2:34',
      category: 'Player',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      position: 'Defenseman',
      university: 'University of Michigan',
      thumbnail: '/placeholder.svg?height=300&width=400',
      duration: '3:12',
      category: 'Player',
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      position: 'Goalie',
      university: 'Boston College',
      thumbnail: '/placeholder.svg?height=300&width=400',
      duration: '2:45',
      category: 'Player',
    },
    {
      id: 4,
      name: 'Jennifer Smith',
      role: 'Parent',
      child: 'Emma Thompson',
      thumbnail: '/placeholder.svg?height=300&width=400',
      duration: '1:58',
      category: 'Parent',
    },
    {
      id: 5,
      name: 'Jake Morrison',
      role: 'Mentor',
      university: 'Harvard University',
      thumbnail: '/placeholder.svg?height=300&width=400',
      duration: '3:45',
      category: 'Mentor',
    },
    {
      id: 6,
      name: 'David Park',
      role: 'Parent',
      child: 'Kevin Park',
      thumbnail: '/placeholder.svg?height=300&width=400',
      duration: '2:21',
      category: 'Parent',
    },
  ]

  const journeyShowcase = [
    {
      name: 'Emma Thompson',
      position: 'Forward',
      beforeTeam: 'AAA Midget',
      afterTeam: 'University of Minnesota',
      beforePhoto: '/placeholder.svg?height=200&width=200',
      afterPhoto: '/placeholder.svg?height=200&width=200',
      mentorName: 'Sarah Chen',
      timeline: '8 months',
      stats: {
        before: { goals: 15, assists: 12, points: 27 },
        after: { offers: 4, commitment: 'Minnesota', scholarship: 'Full' },
      },
      quote: 'My mentor helped me see what I was missing and gave me a clear path to D1.',
    },
    {
      name: 'Alex Johnson',
      position: 'Forward',
      beforeTeam: 'Junior A',
      afterTeam: 'Boston University',
      beforePhoto: '/placeholder.svg?height=200&width=200',
      afterPhoto: '/placeholder.svg?height=200&width=200',
      mentorName: 'Jake Morrison',
      timeline: '6 months',
      stats: {
        before: { goals: 22, assists: 18, points: 40 },
        after: { offers: 3, commitment: 'Boston University', scholarship: 'Partial' },
      },
      quote: 'The recruiting guidance was game-changing. I went from unknown to committed.',
    },
    {
      name: 'Maya Patel',
      position: 'Defenseman',
      beforeTeam: 'AAA Bantam',
      afterTeam: 'Yale University',
      beforePhoto: '/placeholder.svg?height=200&width=200',
      afterPhoto: '/placeholder.svg?height=200&width=200',
      mentorName: 'Emma Thompson',
      timeline: '10 months',
      stats: {
        before: { goals: 8, assists: 25, points: 33 },
        after: { offers: 5, commitment: 'Yale', scholarship: 'Academic + Athletic' },
      },
      quote: 'Learning to balance academics and athletics at the highest level was crucial.',
    },
  ]

  const parentTestimonials = [
    {
      name: 'Jennifer Smith',
      child: 'Emma Thompson',
      childAge: 16,
      parentPhoto: '/placeholder.svg?height=80&width=80',
      familyPhoto: '/placeholder.svg?height=200&width=300',
      quote:
        "The transparency and communication from Performix gave us complete confidence. Seeing Emma's growth both on and off the ice has been incredible.",
      rating: 5,
      outcome: 'Full scholarship to University of Minnesota',
      timeframe: '8 months',
    },
    {
      name: 'David Park',
      child: 'Kevin Park',
      childAge: 17,
      parentPhoto: '/placeholder.svg?height=80&width=80',
      familyPhoto: '/placeholder.svg?height=200&width=300',
      quote:
        "The ROI was immediate. Kevin's confidence skyrocketed, and the mentor's guidance on recruiting was invaluable. Worth every penny.",
      rating: 5,
      outcome: 'Committed to Northeastern University',
      timeframe: '5 months',
    },
    {
      name: 'Lisa Rodriguez',
      child: 'Mike Rodriguez',
      childAge: 18,
      parentPhoto: '/placeholder.svg?height=80&width=80',
      familyPhoto: '/placeholder.svg?height=200&width=300',
      quote:
        'As a goalie parent, finding the right mentor was crucial. The specialized training and mental game coaching made all the difference.',
      rating: 5,
      outcome: 'NHL Draft Pick + Boston College',
      timeframe: '12 months',
    },
  ]

  const mentorTestimonials = [
    {
      name: 'Jake Morrison',
      university: 'Harvard University',
      position: 'Forward',
      experience: '3x All-American',
      photo: '/placeholder.svg?height=150&width=150',
      quote:
        'Mentoring through Performix allows me to give back while helping the next generation achieve their dreams.',
      whyJoined: 'To share the knowledge that helped me succeed',
      favoriteMemory: 'Watching my first mentee commit to their dream school',
      studentsHelped: 23,
      successRate: 96,
    },
    {
      name: 'Sarah Chen',
      university: 'University of Michigan',
      position: 'Defenseman',
      experience: 'Olympic Medalist',
      photo: '/placeholder.svg?height=150&width=150',
      quote:
        'The platform makes it easy to connect with motivated players who remind me why I love this sport.',
      whyJoined: 'To help players navigate the path I wish I had guidance on',
      favoriteMemory: 'Seeing a shy player become a confident leader',
      studentsHelped: 18,
      successRate: 100,
    },
    {
      name: 'Mike Rodriguez',
      university: 'Boston College',
      position: 'Goalie',
      experience: 'NHL Draft Pick',
      photo: '/placeholder.svg?height=150&width=150',
      quote:
        "Every session reminds me of my own journey. It's incredibly rewarding to see players breakthrough.",
      whyJoined: 'To provide the goalie-specific mentorship I never had',
      favoriteMemory: "A mentee's first shutout after working on mental game",
      studentsHelped: 15,
      successRate: 93,
    },
  ]

  const recentCommitments = [
    {
      name: 'Tyler Johnson',
      university: 'University of Wisconsin',
      date: '2 days ago',
      photo: '/placeholder.svg?height=60&width=60',
      type: 'commitment',
    },
    {
      name: 'Sophie Martinez',
      achievement: 'First D1 Offer',
      university: 'Northeastern',
      date: '4 days ago',
      photo: '/placeholder.svg?height=60&width=60',
      type: 'milestone',
    },
    {
      name: 'Ryan Chen',
      university: 'Boston University',
      date: '1 week ago',
      photo: '/placeholder.svg?height=60&width=60',
      type: 'commitment',
    },
    {
      name: 'Mia Thompson',
      achievement: 'Hat Trick in Showcase',
      date: '1 week ago',
      photo: '/placeholder.svg?height=60&width=60',
      type: 'celebration',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        {/* Background Video Placeholder */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20"></div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 border border-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 font-['Space_Grotesk']">
              Real Players,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                Real Results
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Discover how our mentorship program has transformed AAA players into D1 commits
            </p>

            {/* Statistics Banner */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#0891B2] mb-2">
                  <AnimatedCounter end={450} suffix="+" />
                </div>
                <p className="text-gray-300">Players Mentored</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#0891B2] mb-2">
                  <AnimatedCounter end={94} suffix="%" />
                </div>
                <p className="text-gray-300">D1 Placement Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#0891B2] mb-2">
                  <AnimatedCounter end={25} suffix="+" />
                </div>
                <p className="text-gray-300">Partner Universities</p>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Success Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="featured-story"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('featured-story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <Card className="border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-96 lg:h-auto">
                    <Image
                      src="/placeholder.svg?height=500&width=600"
                      alt="Emma Thompson"
                      width={600}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <Badge className="bg-[#0891B2] text-white mb-2">Featured Story</Badge>
                      <h3 className="text-2xl font-bold">Emma Thompson</h3>
                      <p className="text-gray-200">Forward • University of Minnesota</p>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    {/* Journey Timeline */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                            <span className="text-sm font-medium">AAA</span>
                          </div>
                          <p className="text-xs text-gray-500">Starting Point</p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-[#0891B2]" />
                        <div className="text-center">
                          <div className="w-12 h-12 bg-[#0891B2] rounded-full flex items-center justify-center mb-2">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-xs text-gray-500">Mentorship</p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-[#0891B2]" />
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] rounded-full flex items-center justify-center mb-2">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-xs text-gray-500">D1 Commit</p>
                        </div>
                      </div>
                    </div>

                    <Quote className="h-8 w-8 text-[#0891B2] mb-4" />
                    <blockquote className="text-xl text-gray-700 mb-6 italic">
                      &quot;Working with my Performix mentor changed everything. She helped me see
                      what I was missing in my game and gave me a clear roadmap to D1. Eight months
                      later, I&apos;m committed to my dream school with a full scholarship.&quot;
                    </blockquote>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Before Mentorship</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• AAA Midget Team</li>
                          <li>• 15 Goals, 12 Assists</li>
                          <li>• 0 D1 Interest</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">After Mentorship</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 4 D1 Offers</li>
                          <li>• Full Scholarship</li>
                          <li>• University of Minnesota</li>
                        </ul>
                      </div>
                    </div>

                    {/* Mentor Credit */}
                    <div className="flex items-center space-x-3 pt-6 border-t border-gray-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-full overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          alt="Sarah Chen"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Mentored by Sarah Chen</p>
                        <p className="text-sm text-gray-500">
                          University of Michigan • Olympic Medalist
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="video-header"
            data-scroll-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('video-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Hear Their Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch real testimonials from players, parents, and mentors who&apos;ve experienced the
              Performix difference
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-lg">
              {['All', 'Players', 'Parents', 'Mentors'].map((category) => (
                <Button
                  key={category}
                  variant={category === 'All' ? 'default' : 'ghost'}
                  size="sm"
                  className={category === 'All' ? 'bg-[#0891B2] text-white' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTestimonials.map((video, index) => (
              <Card
                key={video.id}
                id={`video-${index}`}
                data-scroll-animate
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer overflow-hidden ${
                  isVisible(`video-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 overflow-hidden">
                    <Image
                      src={video.thumbnail || '/placeholder.svg'}
                      alt={video.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="lg"
                        className="bg-white/90 text-[#0891B2] rounded-full w-16 h-16 p-0"
                      >
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 text-white">{video.duration}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={`${
                          video.category === 'Player'
                            ? 'bg-[#0891B2]'
                            : video.category === 'Parent'
                              ? 'bg-[#8B5CF6]'
                              : 'bg-green-500'
                        } text-white`}
                      >
                        {video.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{video.name}</h3>
                    {video.position && (
                      <p className="text-[#0891B2] font-medium mb-1">{video.position}</p>
                    )}
                    {video.role && <p className="text-[#8B5CF6] font-medium mb-1">{video.role}</p>}
                    <p className="text-sm text-gray-600">
                      {video.university || (video.child && `Parent of ${video.child}`)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Dashboard */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="metrics-header"
            data-scroll-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('metrics-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Numbers Don&apos;t Lie
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our track record speaks for itself - real results that transform hockey careers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                metric: 'Athletes Mentored',
                value: 450,
                suffix: '+',
                icon: Users,
                color: 'from-[#0891B2] to-[#0E7490]',
                description: 'Across all positions and skill levels',
              },
              {
                metric: 'D1 Placement Rate',
                value: 94,
                suffix: '%',
                icon: TrendingUp,
                color: 'from-[#8B5CF6] to-[#7C3AED]',
                description: 'Within 12 months of program completion',
              },
              {
                metric: 'Partner Universities',
                value: 25,
                suffix: '+',
                icon: Award,
                color: 'from-[#0891B2] to-[#8B5CF6]',
                description: 'Top-tier D1 hockey programs',
              },
              {
                metric: 'Faster Commitment',
                value: 2.3,
                suffix: 'x',
                icon: Calendar,
                color: 'from-[#10B981] to-[#059669]',
                description: 'Compared to traditional recruiting',
              },
            ].map((item, index) => (
              <Card
                key={item.metric}
                id={`metric-${index}`}
                data-scroll-animate
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 text-center ${
                  isVisible(`metric-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div
                    className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}
                  >
                    {isVisible(`metric-${index}`) && (
                      <AnimatedCounter end={item.value} suffix={item.suffix} />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.metric}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Showcase */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="journey-header"
            data-scroll-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('journey-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              From Potential to Performance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow the transformation journeys of our athletes from AAA to D1 commitments
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentJourneyIndex * 100}%)` }}
              >
                {journeyShowcase.map((journey, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="border-0 shadow-xl mx-4">
                      <CardContent className="p-8">
                        <div className="grid lg:grid-cols-3 gap-8 items-center">
                          <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              Before Mentorship
                            </h3>
                            <div className="relative w-32 h-32 mx-auto mb-4">
                              <Image
                                src={journey.beforePhoto || '/placeholder.svg'}
                                alt={`${journey.name} before`}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <p className="font-medium text-gray-900">{journey.beforeTeam}</p>
                            <div className="mt-3 space-y-1 text-sm text-gray-600">
                              <p>{journey.stats.before.goals} Goals</p>
                              <p>{journey.stats.before.assists} Assists</p>
                              <p>{journey.stats.before.points} Points</p>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="mb-6">
                              <div className="w-20 h-20 bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-4">
                                <ArrowRight className="h-8 w-8 text-white" />
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {journey.timeline} with mentor
                              </p>
                              <p className="font-medium text-[#0891B2]">{journey.mentorName}</p>
                            </div>
                            <Quote className="h-6 w-6 text-[#0891B2] mx-auto mb-3" />
                            <blockquote className="text-gray-700 italic text-sm">
                              {journey.quote}
                            </blockquote>
                          </div>

                          <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              After Mentorship
                            </h3>
                            <div className="relative w-32 h-32 mx-auto mb-4">
                              <Image
                                src={journey.afterPhoto || '/placeholder.svg'}
                                alt={`${journey.name} after`}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover rounded-full"
                              />
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] rounded-full flex items-center justify-center">
                                <Award className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <p className="font-medium text-gray-900">{journey.afterTeam}</p>
                            <div className="mt-3 space-y-1 text-sm text-gray-600">
                              <p>{journey.stats.after.offers} D1 Offers</p>
                              <p>{journey.stats.after.scholarship} Scholarship</p>
                              <p className="text-[#0891B2] font-medium">
                                {journey.stats.after.commitment}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-center mt-8 pt-6 border-t border-gray-200">
                          <h2 className="text-2xl font-bold text-gray-900">{journey.name}</h2>
                          <p className="text-[#0891B2] font-medium">{journey.position}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentJourneyIndex(Math.max(0, currentJourneyIndex - 1))}
                disabled={currentJourneyIndex === 0}
                className="border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex space-x-2">
                {journeyShowcase.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentJourneyIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentJourneyIndex ? 'bg-[#0891B2]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentJourneyIndex(
                    Math.min(journeyShowcase.length - 1, currentJourneyIndex + 1),
                  )
                }
                disabled={currentJourneyIndex === journeyShowcase.length - 1}
                className="border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Parent Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="parent-header"
            data-scroll-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('parent-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Parents Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from hockey parents about their experience with our mentorship program
            </p>
          </div>

          <div className="space-y-16">
            {parentTestimonials.map((testimonial, index) => (
              <div
                key={index}
                id={`parent-${index}`}
                data-scroll-animate
                className={`transition-all duration-1000 ${
                  isVisible(`parent-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <Card
                  className={`border-0 shadow-xl ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <CardContent className="p-0">
                    <div
                      className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-cols-2' : ''}`}
                    >
                      <div className="relative h-64 lg:h-auto">
                        <Image
                          src={testimonial.familyPhoto || '/placeholder.svg'}
                          alt={`${testimonial.name} family`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                          <h3 className="text-xl font-bold">{testimonial.name}</h3>
                          <p className="text-gray-200">Parent of {testimonial.child}</p>
                        </div>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <Quote className="h-8 w-8 text-[#8B5CF6] mb-4" />
                        <blockquote className="text-xl text-gray-700 mb-6 italic">
                          {testimonial.quote}
                        </blockquote>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6]/20 to-[#0891B2]/20 rounded-full overflow-hidden">
                              <Image
                                src={testimonial.parentPhoto || '/placeholder.svg'}
                                alt={testimonial.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{testimonial.name}</p>
                              <p className="text-sm text-gray-500">
                                Parent of {testimonial.child} (Age {testimonial.childAge})
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Outcome:</span> {testimonial.outcome}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Timeframe:</span>{' '}
                              {testimonial.timeframe}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Testimonials */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="mentor-testimonials-header"
            data-scroll-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('mentor-testimonials-header')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Elite Players Choose to Mentor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our mentors about their experience giving back to the next generation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {mentorTestimonials.map((mentor, index) => (
              <Card
                key={index}
                id={`mentor-testimonial-${index}`}
                data-scroll-animate
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                  isVisible(`mentor-testimonial-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image
                      src={mentor.photo || '/placeholder.svg'}
                      alt={mentor.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{mentor.name}</h3>
                  <p className="text-[#0891B2] font-medium mb-1">{mentor.position}</p>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <span className="text-sm text-gray-600">{mentor.university}</span>
                  </div>
                  <Badge variant="outline" className="mb-6 text-xs">
                    {mentor.experience}
                  </Badge>
                  <Quote className="h-6 w-6 text-[#0891B2] mx-auto mb-4" />
                  <blockquote className="text-gray-700 italic mb-6">{mentor.quote}</blockquote>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-gray-600">
                        <span className="font-medium">Why I joined:</span> {mentor.whyJoined}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-gray-600">
                        <span className="font-medium">Favorite memory:</span>{' '}
                        {mentor.favoriteMemory}
                      </p>
                    </div>
                    <div className="flex justify-between text-center pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-lg font-bold text-[#0891B2]">{mentor.studentsHelped}</p>
                        <p className="text-xs text-gray-500">Students</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#0891B2]">{mentor.successRate}%</p>
                        <p className="text-xs text-gray-500">Success Rate</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Social Proof Stream */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="social-proof-header"
            data-scroll-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('social-proof-header')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Latest Commitments & Celebrations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest successes from our Performix community
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {recentCommitments.map((item, index) => (
                <Card
                  key={index}
                  id={`commitment-${index}`}
                  data-scroll-animate
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                    isVisible(`commitment-${index}`)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-full overflow-hidden">
                        <Image
                          src={item.photo || '/placeholder.svg'}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] rounded-full flex items-center justify-center">
                          {item.type === 'commitment' && <Award className="h-3 w-3 text-white" />}
                          {item.type === 'milestone' && (
                            <TrendingUp className="h-3 w-3 text-white" />
                          )}
                          {item.type === 'celebration' && <Star className="h-3 w-3 text-white" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        {item.type === 'commitment' && (
                          <p className="text-[#0891B2] font-medium">
                            Committed to {item.university}!
                          </p>
                        )}
                        {item.type === 'milestone' && (
                          <p className="text-[#8B5CF6] font-medium">
                            {item.achievement} - {item.university}
                          </p>
                        )}
                        {item.type === 'celebration' && (
                          <p className="text-green-600 font-medium">{item.achievement}</p>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`${
                            item.type === 'commitment'
                              ? 'bg-[#0891B2]'
                              : item.type === 'milestone'
                                ? 'bg-[#8B5CF6]'
                                : 'bg-green-500'
                          } text-white`}
                        >
                          {item.type === 'commitment' && 'Commitment'}
                          {item.type === 'milestone' && 'Milestone'}
                          {item.type === 'celebration' && 'Achievement'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white"
              >
                View All Updates
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0891B2] to-[#0E7490]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of players who&apos;ve transformed their hockey careers with elite
            mentorship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mentors"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'bg-white text-[#0891B2] hover:bg-gray-100 px-8',
              )}
            >
              Find Your Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
