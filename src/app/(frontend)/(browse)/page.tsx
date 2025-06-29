import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle, Users, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import {
  ValuePropSection,
  HowItWorksSection,
  WhatYouGetEveryMonth,
  ExtraValueSection,
  TrustSection,
  FAQSection,
} from '@/components/layout/home'
import { FeaturedMentorsSection } from '@/components/layout/home/featured-mentors'
import { TestimonialsSection } from '@/components/layout/home/testimonials'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
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
                  src="/hero2.webp"
                  alt="Hockey player in action"
                  width={800}
                  height={600}
                  className="w-full h-full object-contain"
                  priority={true}
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
      <ValuePropSection />
      {/* <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-[#0891B2] to-[#0E7490] bg-clip-text text-transparent">
              See Performix in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how our elite D1 mentors are transforming hockey careers and helping players reach their full potential
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            
            
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Mentorship</h3>
                <p className="text-gray-600 text-sm">
                  See actual mentoring sessions with D1 players and coaches
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Results</h3>
                <p className="text-gray-600 text-sm">
                  Watch success stories from players who made it to D1
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-600 text-sm">
                  Learn from coaches who know what it takes to succeed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <HowItWorksSection />
      <WhatYouGetEveryMonth />
      <ExtraValueSection />
      <FeaturedMentorsSection />
      <TestimonialsSection />
      <TrustSection />
      <FAQSection />
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
