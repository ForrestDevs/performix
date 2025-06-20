import React from 'react'
import { TestimonialsSection } from '@/components/layout/home/testimonials'
import { PricingCTA, PricingFAQs, PricingHeroCards } from '@/components/layout/pricing'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PricingHeroCards />
      <TestimonialsSection />
      <PricingFAQs />
      <PricingCTA />
    </div>
  )
}
