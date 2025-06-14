'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  TrendingUp,
  Shield,
  Eye,
  Award,
  Play,
  Star,
  ChevronRight,
  Dumbbell,
  ClipboardList,
  Trophy,
  GraduationCap,
  Wrench,
  ArrowUpRight,
  ChevronLeft,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { PerformixLogo } from '@/components/logo'
import { cn } from '@/lib/utilities/ui'
import { useState } from 'react'

export default function HomePage() {
  const visibleElements = useScrollAnimation()

  const isVisible = (id: string) => visibleElements.has(id)

  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Enhanced with animations */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0891B2]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge className="bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 animate-bounce-subtle">
                  Elite Mentorship Platform
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-['Space_Grotesk']">
                  The Fastest Way to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                    Get Better
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Why waste time trying to figure it out alone? Get access to D1 hockey mentors,
                  elite systems, and a proven plan to develop faster.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://calendly.com/mateodixon/d1-mentorship-call"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl',
                  )}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/mentors"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300',
                  )}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Browse all mentors
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2 hover:text-[#0891B2] transition-colors duration-200">
                  <CheckCircle className="h-5 w-5 text-[#0891B2]" />
                  <span className="text-base">30+ D1 Mentors</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 hover:scale-105 transition-transform duration-500">
                <Image
                  src="/hero2.png"
                  alt="Hockey player in action"
                  width={800}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2.5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#0891B2]/90 to-[#8B5CF6]/90 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      <span className="text-[#0891B2] font-semibold">100%</span> of athletes
                      <br />
                      <span className="text-gray-500 text-[11px]">report accelerated progress</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="value-prop-header"
            data-scroll-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('value-prop-header')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Elite Players Choose Performix
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the platform that&apos;s advancing the next generation of serious hockey players.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
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

      {/* How It Works Section - Enhanced */}
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

      {/* What You Get Every Month */}
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
                  src="/placeholder.svg?height=600&width=800"
                  alt="Mentor and student training session"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-lg border">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#0891B2] mb-1">500+</p>
                  <p className="text-sm text-gray-600">Active Players</p>
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

      {/* Program Benefits Icons Row */}
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

      {/* How Your Mentor Helps You */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="mentor-help-header"
            data-scroll-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('mentor-help-header')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
              Your mentor helps you with...
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div
              id="mentor-help-images"
              data-scroll-animate
              className={`grid grid-cols-2 gap-4 transition-all duration-1000 ${
                isVisible('mentor-help-images')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              {[
                { src: '/placeholder.svg?height=300&width=300', alt: 'Mentor coaching session' },
                { src: '/placeholder.svg?height=300&width=300', alt: 'Video analysis session' },
                { src: '/placeholder.svg?height=300&width=300', alt: 'Group training session' },
                { src: '/placeholder.svg?height=300&width=300', alt: 'One-on-one mentoring' },
              ].map((image, index) => (
                <div
                  key={index}
                  id={`help-image-${index}`}
                  data-scroll-animate
                  className={`aspect-square rounded-xl overflow-hidden shadow-lg transition-all duration-700 hover:shadow-xl hover:scale-105 ${
                    isVisible(`help-image-${index}`)
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Image
                    src={image.src || '/placeholder.svg'}
                    alt={image.alt}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div
              id="mentor-help-list"
              data-scroll-animate
              className={`space-y-6 transition-all duration-1000 ${
                isVisible('mentor-help-list')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
              {[
                {
                  title: 'What Scouts Are Looking For',
                  description:
                    'Insider knowledge on what college recruiters prioritize in prospects',
                },
                {
                  title: 'Training and Nutrition',
                  description:
                    'Elite-level training routines and nutrition plans for peak performance',
                },
                {
                  title: 'Dealing with Teams & Coaches',
                  description:
                    'Navigate team dynamics and build strong relationships with coaching staff',
                },
                {
                  title: 'Preparing For Camps & Tryouts',
                  description:
                    'Strategic preparation to maximize your performance when it matters most',
                },
                {
                  title: 'Hockey IQ',
                  description:
                    'Develop game intelligence and decision-making skills that set you apart',
                },
                {
                  title: 'Mindset',
                  description: 'Build mental toughness and confidence to perform under pressure',
                },
                {
                  title: 'Lessons We Wish We Knew Earlier',
                  description: "Avoid common pitfalls with wisdom from players who've been there",
                },
              ].map((area, index) => (
                <div
                  key={index}
                  id={`help-area-${index}`}
                  data-scroll-animate
                  className={`flex items-start space-x-4 transition-all duration-700 ${
                    isVisible(`help-area-${index}`)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{area.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            id="mentor-help-cta"
            data-scroll-animate
            className={`text-center mt-12 transition-all duration-1000 ${
              isVisible('mentor-help-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              size="lg"
              className="bg-[#0891B2] hover:bg-[#0E7490] text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Matched Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section> */}

      {/* Featured Mentors Preview */}
      <section id="mentors" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="mentors-header"
            data-scroll-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('mentors-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Your Future Mentors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from elite athletes who&apos;ve achieved what you&apos;re working toward
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                name: 'Jake Morrison',
                position: 'Forward',
                school: 'Harvard',
                experience: '3x All-American',
              },
              {
                name: 'Sarah Chen',
                position: 'Defenseman',
                school: 'Michigan',
                experience: 'Olympic Medalist',
              },
              {
                name: 'Mike Rodriguez',
                position: 'Goalie',
                school: 'Boston College',
                experience: 'NHL Draft Pick',
              },
              {
                name: 'Emma Thompson',
                position: 'Forward',
                school: 'Minnesota',
                experience: 'NCAA Champion',
              },
            ].map((mentor, index) => (
              <Card
                key={index}
                id={`mentor-card-${index}`}
                data-scroll-animate
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 hover:-translate-y-1 ${
                  isVisible(`mentor-card-${index}`)
                    ? 'opacity-100 translate-y-0 rotate-0'
                    : 'opacity-0 translate-y-8 rotate-3'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 mb-4 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt={mentor.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{mentor.name}</h3>
                  <p className="text-[#0891B2] font-medium mb-2">{mentor.position}</p>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <span className="text-sm text-gray-600">{mentor.school}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{mentor.experience}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div
            id="mentors-cta"
            data-scroll-animate
            className={`text-center transition-all duration-1000 ${
              isVisible('mentors-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href="/mentors"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8',
              )}
            >
              Browse All Mentors
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Story Highlight */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="testimonials-header"
            data-scroll-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('testimonials-header')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Athletes & Parents Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results. Real impact. Hear from athletes and parents who have directly benefited.
            </p>
          </div>

          <div className="relative">
            <div className="">
              <div
                className="flex transition-transform duration-500 ease-in-out py-2"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {[
                  {
                    name: 'Alex Johnson',
                    message:
                      'The personalized training and recruitment guidance were exactly what I needed. I went from being overlooked to committing to Boston University.',
                    team: 'Boston University',
                    position: 'Forward',
                    icon: '/placeholder.svg?height=64&width=64',
                  },
                  {
                    name: 'Maya Patel',
                    message:
                      'My mentor helped me identify the gaps in my game and gave me a clear roadmap to success. Now I have multiple D1 offers to choose from.',
                    team: 'University of Minnesota',
                    position: 'Defenseman',
                    icon: '/placeholder.svg?height=64&width=64',
                  },
                  {
                    name: 'Ryan Chen',
                    message:
                      "The video analysis sessions were game-changing. I improved my skating technique and now I'm playing at a whole new level.",
                    team: 'Harvard University',
                    position: 'Center',
                    icon: '/placeholder.svg?height=64&width=64',
                  },
                ].map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-md mx-auto overflow-visible">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0891B2] to-[#8B5CF6] p-0.5 mb-4">
                            <div className="w-full h-full rounded-full overflow-hidden bg-white">
                              <Image
                                src={testimonial.icon}
                                alt={testimonial.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-800 text-base mb-4 italic leading-relaxed">
                            &quot;{testimonial.message}&quot;
                          </p>
                          <div className="space-y-1">
                            <p className="font-bold text-lg text-gray-900">{testimonial.name}</p>
                            <p className="text-[#0891B2] font-semibold text-sm">
                              {testimonial.position}
                            </p>
                            <p className="text-gray-500 text-sm">{testimonial.team}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg hover:bg-gray-50"
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg hover:bg-gray-50"
              onClick={() => setCurrentSlide(Math.min(2, currentSlide + 1))}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-[#0891B2] w-8' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
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

      {/* FAQ Section */}
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

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0891B2] to-[#0E7490]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of players already working with elite mentors to achieve their D1 dreams
            </p>
            <div className="max-w-md mx-auto">
              <Link
                href="https://calendly.com/mateodixon/d1-mentorship-call"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl',
                )}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
