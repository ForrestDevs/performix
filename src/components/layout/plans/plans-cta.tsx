'use client'

import React from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { Link } from '@payloadcms/ui'
import { cn } from '@/lib/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function PlansCTA() {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)
  return (
    <section className="py-20 bg-gradient-to-r from-[#0891B2] to-[#0E7490]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="final-cta"
          data-scroll-animate
          className={`text-center text-white transition-all duration-1000 ${
            isVisible('final-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your D1 Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of players already working with elite mentors to achieve their D1 dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'bg-white text-[#0891B2] hover:bg-gray-100 px-8',
              )}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="https://calendly.com/mateodixon/d1-mentorship-call"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'border-white text-[#0891B2] hover:bg-white hover:text-[#0891B2] px-8',
              )}
            >
              Schedule a Consultation
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-75">
            No credit card required to start • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  )
}
