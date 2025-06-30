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
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function ValuePropSection() {
  const visibleElements = useScrollAnimation()

  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="value-prop-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('value-prop-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Elite Players Choose Performix
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the platform that&apos;s advancing the next generation of serious hockey players.
          </p>
        </div>
        
        <div className="mt-12 grid md:grid-cols-4 gap-8">
          {[
            {
              icon: GraduationCap,
              title: 'D1 Mentors',
              description:
                'Work directly with your own D1 mentor who knows exactly what it takes to succeed.',
            },
            {
              icon: Trophy,
              title: 'Proven Results',
              description: '100% of Athletes Report Faster Progress in Their First Month. ',
            },
            {
              icon: ClipboardList,
              title: 'Custom Plans',
              description: ' Tailored development for your position, goals, and playing style.',
            },
            {
              icon: TrendingUp,
              title: 'NHL-Grade Tools',
              description:
                'Alongside your mentor, get NHL-grade tools for training, nutrition, mindset, and recruiting.',
            },
          ].map((item, index) => (
            <Card
              key={index}
              id={`value-card-${index}`}
              data-scroll-animate
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 hover:-translate-y-2 group bg-gradient-to-br from-white via-[#0891B2]/10 to-[#8B5CF6]/10 ${
                isVisible(`value-card-${index}`)
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
                <p className="text-gray-500 leading-relaxed text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  const visibleElements = useScrollAnimation()

  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="how-it-works-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('how-it-works-header')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get Ahead in 3 Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven shortcut used by driven players to develop faster.
          </p>
        </div>
        <div className="relative">
          {/* Background decoration */}
          <div
            id="background-d1"
            data-scroll-animate
            className={`absolute inset-0 flex items-center justify-center opacity-5 transition-all duration-2000 ${
              isVisible('background-d1') ? 'opacity-5 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <div className="text-[20rem] font-bold text-[#0891B2] select-none">D1</div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {/* Connecting lines for desktop */}
            <div
              id="connecting-line"
              data-scroll-animate
              className={`hidden lg:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[#0891B2] via-[#0891B2] to-[#8B5CF6] transition-all duration-1500 ${
                isVisible('connecting-line') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
            ></div>

            {[
              {
                step: 1,
                title: 'Mentor Match',
                description:
                  'Start with a free Zoom call where we learn about your goals, experience, and journey—to match you with the right mentor.',
                icon: Users,
                details: ['Goal-Based Matching', 'Personality Fit', 'Position-Specific Pairing'],
              },
              {
                step: 2,
                title: 'Improve',
                description:
                  'Benefit from the mentor, tools, and full system built to accelerate your development',
                icon: Target,
                details: [
                  '1-on-1 Private Mentorship',
                  'Performance-Driven Resources',
                  'Consistent Progress Tracking',
                ],
              },
              {
                step: 3,
                title: 'Achieve',
                description:
                  "Open doors to new opportunities, climb levels faster, and do it with people who've already been there.",
                icon: Award,
                details: ['Apply D1 Strategy', 'Use What Works', 'Turn Knowledge Into Results'],
              },
            ].map((item, index) => (
              <div
                key={index}
                id={`step-${index}`}
                data-scroll-animate
                className={`text-center relative group transition-all duration-1000 ${
                  isVisible(`step-${index}`)
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
            className={`text-center mt-16 transition-all duration-1000 ${
              isVisible('journey-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href="/get-started"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-gradient-to-r from-[#0EA5E9] to-[#A78BFA] via-[#0891B2] hover:from-[#0E7490] hover:to-[#8B5CF6] text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300',
              )}
            >
              Start Your Journey Today
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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="monthly-features-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('monthly-features-header')
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
            className={`space-y-6 transition-all duration-1000 ${
              isVisible('monthly-features-list')
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            {[
              {
                title: 'Private Video Analysis Sessions',
                description:
                  'Private 1-on-1 game analysis with a D1+ mentor to improve hockey IQ and decision-making on the ice.',
              },
              {
                title: 'The Performance Lab Course',
                description:
                  'A structured course with the highest-level tools and strategies across training, nutrition, recovery, sleep, mental performance, and development strategy.',
              },
              {
                title: 'Daily D1 Mentor Access',
                description:
                  'Direct messaging with your mentor for real-time guidance and support.',
              },
              {
                title: 'Monthly Goal Setting',
                description:
                  'Work with your D1 mentor to set clear, achievable goals and track your progress with personalized milestones.',
              },
              {
                title: 'Biweekly D1 Zoom Sessions',
                description:
                  'Live group sessions with D1 athletes and guest experts for hockey development.',
              },
              {
                title: 'Private Community',
                description:
                  'An exclusive community of elite athletes and experts sharing game-changing insights and strategies.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                data-scroll-animate
                className={`flex items-start space-x-4 transition-all duration-700 ${
                  isVisible(`feature-${index}`)
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
            className={`relative transition-all duration-1000 ${
              isVisible('monthly-features-image')
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
          className={`text-center mt-12 transition-all duration-1000 ${
            isVisible('monthly-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href="/get-started"
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
              className={`text-center transition-all duration-1000 ${
                isVisible(`benefit-${index}`)
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
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('trust-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
              className={`text-center transition-all duration-1000 ${
                isVisible(`trust-item-${index}`)
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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="faq-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('faq-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
            {[
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
                  'Book a free Zoom call so we can learn about your goals and pair you with the right mentor. From there, you’ll unlock your tools, schedule your sessions, and start making real progress.',
              },
              {
                question: "What's coming next on Performix?",
                answer:
                  'We are bringing in new NHL-level experts, launching exclusive high-level content, and expanding our free Resource Hub—packed with free valuable tools, breakdowns, and insight players can use right away. We are also building new offerings across skill development, rehab and more.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                id={`faq-item-${index}`}
                data-scroll-animate
                className={`border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-700 ${
                  isVisible(`faq-item-${index}`)
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
