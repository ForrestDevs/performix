'use client'

import { Media as MediaComponent } from '@/components/Media'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { cn } from '@/lib/utilities/ui'
import { Media, Mentor, Testimonial } from '@/payload-types'
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Eye,
  GraduationCap,
  Shield,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const valuePropItems = [
  {
    icon: GraduationCap,
    title: 'Real D1 Mentors',
    strong: "You're not left alone to figure it out.",
    description:
      "Work 1-on-1 with an active Division I player who's already where you want to be — guiding your mindset, habits, and development every step.",
  },
  {
    icon: TrendingUp,
    title: 'All-Around Development',
    strong: "We don't just focus on one part of the game.",
    description:
      'High-level support and tools across every side of performance — training, nutrition, mindset, and hockey IQ — all built to work together in one complete system.',
  },
  {
    icon: User,
    title: 'Personalized To You',
    strong: "This isn't a one-size-fits-all program.",
    description:
      'Everything is built around your game and goals. We figure out what will get you the best results and build a personalized plan designed around you.',
  },
  {
    icon: Trophy,
    title: 'Network of Experts',
    strong: 'A team of specialists behind every player.',
    description:
      'Our system blends insights from D1 strength coaches, NHL-level skill coaches, sports scientists, and performance experts — all working together to achieve your hockey goals.',
  },
]

export function ValuePropSection() {
  const visibleElements = useScrollAnimation()

  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="value-prop-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${isVisible('value-prop-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            THE PERFORMIX ADVANTAGE
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The new standard for developing serious hockey players.
          </p>
        </div>

        <div className="my-12 grid md:grid-cols-4 gap-8">
          {valuePropItems.map((item, index) => (
            <Card
              key={index}
              id={`value-card-${index}`}
              data-scroll-animate
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 hover:-translate-y-2 group bg-gradient-to-br from-white via-[#0891B2]/10 to-[#8B5CF6]/10 ${isVisible(`value-card-${index}`)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#0891B2]/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#0891B2]/10 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="h-8 w-8 text-[#0891B2] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#0891B2] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  <strong>{item.strong}</strong> {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          id="journey-cta"
          data-scroll-animate
          className={`text-center mt-16 transition-all duration-1000 ${isVisible('journey-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <Link
            href="/game-plan"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-gradient-to-r from-[#0EA5E9] to-[#A78BFA] via-[#0891B2] hover:from-[#0E7490] hover:to-[#8B5CF6] text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300',
            )}
          >
            Start your game plan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function NextStepsSection() {
  const visibleElements = useScrollAnimation()

  const isVisible = (id: string) => visibleElements.has(id)

  const steps = [
    {
      step: 1,
      title: 'Free Strategy Call',
      description: "Tell us where you're at, what you've tried, and what goals you're chasing.",
      icon: Users,
      details: ['Goal-Based Matching', 'Personality Fit', 'Position-Specific Pairing'],
    },
    {
      step: 2,
      title: 'Your Game Plan',
      description:
        "We'll build your player profile, set clear priorities, and pair you with the right D1 mentor for your path.",
      icon: Target,
      details: [
        '1-on-1 Private Mentorship',
        'Performance-Driven Resources',
        'Consistent Progress Tracking',
      ],
    },
    {
      step: 3,
      title: 'Start Producing Results',
      description:
        "Unlock new opportunities, climb levels faster, and do it with guidance from people who've already made it there.",
      icon: Award,
      details: ['Apply D1 Strategy', 'Use What Works', 'Turn Knowledge Into Results'],
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="how-it-works-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${isVisible('how-it-works-header')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Your Next 3 Moves</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven shortcut used by driven players to develop faster.
          </p>
        </div>
        <div className="relative">
          {/* Background decoration */}
          <div
            id="background-d1"
            data-scroll-animate
            className={`absolute inset-0 flex items-center justify-center opacity-5 transition-all duration-2000 ${isVisible('background-d1') ? 'opacity-5 scale-100' : 'opacity-0 scale-75'
              }`}
          >
            <div className="text-[20rem] font-bold text-[#0891B2] select-none">D1</div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {/* Connecting lines for desktop */}
            <div
              id="connecting-line"
              data-scroll-animate
              className={`hidden lg:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[#0891B2] via-[#0891B2] to-[#8B5CF6] transition-all duration-1500 ${isVisible('connecting-line') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
            ></div>

            {steps.map((item, index) => (
              <div
                key={index}
                id={`step-${index}`}
                data-scroll-animate
                className={`text-center relative group transition-all duration-1000 ${isVisible(`step-${index}`)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
                  }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {/* Step card */}
                <div className="bg-gradient-to-br from-[#E0F2FE] via-[#F0F9FF] to-[#E0F2FE] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col items-center relative overflow-hidden">
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0891B2]/10 via-[#0EA5E9]/5 to-[#0891B2]/10 opacity-70"></div>

                  {/* Step number with gradient background */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0891B2] to-[#0EA5E9] rounded-full flex items-center justify-center mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-extrabold text-white">{item.step}</span>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-[#0891B2] to-[#0EA5E9] rounded-full mx-auto opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0891B2]/20 to-[#0EA5E9]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-[#0891B2]/30 group-hover:to-[#0EA5E9]/30 transition-colors duration-300">
                    <item.icon className="h-6 w-6 text-[#0891B2]" />
                  </div>

                  <h3 className="text-xl font-extrabold text-gray-950 mb-3 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6 text-center max-w-[280px] text-sm relative z-10 font-medium">
                    {item.description}
                  </p>

                  {/* Feature list */}
                  <div className="space-y-2 w-full max-w-[240px] relative z-10">
                    {item.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-center text-xs text-gray-600 font-medium"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-[#0891B2] mr-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow for mobile */}
                {index < 2 && (
                  <div className="lg:hidden flex justify-center mt-6 mb-6">
                    <div className="w-8 h-8 bg-[#0891B2] rounded-full flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-white rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div
            id="journey-cta"
            data-scroll-animate
            className={`text-center mt-16 transition-all duration-1000 ${isVisible('journey-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <Link
              href="/game-plan"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-gradient-to-r from-[#0EA5E9] to-[#A78BFA] via-[#0891B2] hover:from-[#0E7490] hover:to-[#8B5CF6] text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300',
              )}
            >
              Start your game plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function WhatYouGetEveryMonth() {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  const features = [
    {
      title: 'Private Video Analysis Sessions',
      description:
        'Private 1-on-1 game analysis with a D1+ mentor to improve hockey IQ and decision-making on the ice.',
    },
    {
      title: 'Mental & Strategy Sessions',
      description:
        'Work 1-on-1 with your mentor on the mental side of the game to build confidence and guide overall development strategy.',
    },
    {
      title: 'Personalized Development Plans',
      description:
        'Get a customized game plan focused on making your biggest improvements each month',
    },
    {
      title: 'The Complete Performix System',
      description:
        'A decade of elite development tools compressed into one system — from hockey IQ, mindset, skill development, speed, strength, development strategy, and more.',
    },
    {
      title: 'Smart Calendar System',
      description:
        'Track progress, set goals, structure your week, and stay locked in with a personalized calendar and performance system.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="monthly-features-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${isVisible('monthly-features-header')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What you get every month...
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div
            id="monthly-features-list"
            data-scroll-animate
            className={`space-y-6 transition-all duration-1000 ${isVisible('monthly-features-list')
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-8'
              }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                data-scroll-animate
                className={`flex items-start space-x-4 transition-all duration-700 ${isVisible(`feature-${index}`)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            id="monthly-features-image"
            data-scroll-animate
            className={`relative transition-all duration-1000 ${isVisible('monthly-features-image')
              ? 'opacity-100 translate-x-0 scale-100'
              : 'opacity-0 translate-x-8 scale-95'
              }`}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/homepage1.jpg"
                alt="Mentor and student training session"
                width={800}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-lg border">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#0891B2] mb-1">30+</p>
                <p className="text-sm text-gray-600">Active Mentors</p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="monthly-cta"
          data-scroll-animate
          className={`text-center mt-12 transition-all duration-1000 ${isVisible('monthly-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <Link
            href="/game-plan"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-gradient-to-r from-[#0EA5E9] to-[#A78BFA] via-[#0891B2] hover:from-[#0E7490] hover:to-[#8B5CF6] text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105',
            )}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ExtraValueSection() {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: TrendingUp,
              headline: 'IMPROVE FASTER',
            },
            {
              icon: Target,
              headline: 'EARN BIGGER OPPORTUNITIES',
            },
            {
              icon: Award,
              headline: 'OUTPERFORM EVERYBODY',
            },
          ].map((benefit, index) => (
            <div
              key={index}
              id={`benefit-${index}`}
              data-scroll-animate
              className={`text-center transition-all duration-1000 ${isVisible(`benefit-${index}`)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 text-[#0891B2] hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-full h-full stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 tracking-wide">
                {benefit.headline}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TrustSection() {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="trust-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${isVisible('trust-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Families. Built for Serious Players.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Supporting both the athlete and the family.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Verified Mentors',
              description:
                'Every mentor is a hand-selected D1 or Pro athlete with real credentials and proven experience.',
            },
            {
              icon: Eye,
              title: 'Parent Access',
              description:
                "Stay in the loop with access to your athlete's mentor, updates, and the full community. We support the whole family.",
            },
            {
              icon: Award,
              title: 'Risk-Free Guarantee',
              description:
                "100% satisfaction guarantee or your money back. We're committed to your success.",
            },
          ].map((item, index) => (
            <div
              key={index}
              id={`trust-item-${index}`}
              data-scroll-animate
              className={`text-center transition-all duration-1000 ${isVisible(`trust-item-${index}`)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-16 h-16 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <item.icon className="h-8 w-8 text-[#0891B2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQSection() {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="faq-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${isVisible('faq-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about our mentorship platform
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                id={`faq-item-${index}`}
                data-scroll-animate
                className={`border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-700 ${isVisible(`faq-item-${index}`)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <ChevronRight className="h-5 w-5 text-gray-500 group-open:rotate-90 transition-transform duration-200 flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "We map out your game",
      description:
        "We look at the full picture — strengths, weaknesses, on-ice decisions, play style, and goals — to understand what will take your game the furthest.",
    },
    {
      number: "02",
      title: "High-impact improvement sessions",
      description:
        "Through 1-on-1 video analysis and focused mental and development sessions, D1 mentors show you what's holding your game back and what to do to create more impact on the ice",
    },
    {
      number: "03",
      title: "Build a clear development plan",
      description:
        "Based on what we find, we choose the few specific things that will make the biggest difference in your game and turn them into a clear, simple plan you know how to follow.",
    },
    {
      number: "04",
      title: "Execute and repeat",
      description:
        "You follow the plan. We track progress, make adjustments when needed, support you along the way, and repeat the process so improvements stack month after month.",
    },
  ]

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-3 md:mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            A proven process to help you get more out of your game
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 xl:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col h-full">
              <div className="mb-4 sm:mb-6">
                <span className="inline-block text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-bold text-[#50b5d4] tracking-tight">
                  {step.number}
                </span>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl lg:text-lg xl:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-snug min-h-[3.5rem] sm:min-h-[4rem] lg:min-h-[4.5rem] flex items-start">{step.title}</h3>
                <p className="text-sm sm:text-base lg:text-sm xl:text-base leading-relaxed text-gray-600 flex-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}