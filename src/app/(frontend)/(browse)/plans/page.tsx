import React from 'react'
import { TestimonialsSection } from '@/components/layout/home/testimonials'
import { PlansList } from '@/components/layout/plans/plans-list'
import { PlansHero } from '@/components/layout/plans/plans-hero'
import { PlansFAQ } from '@/components/layout/plans/plans-faq'
import { PlansCTA } from '@/components/layout/plans/plans-cta'

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PlansHero />
      <PlansList />
      <TestimonialsSection />
      <PlansFAQ />
      <PlansCTA />
    </div>
  )
}
