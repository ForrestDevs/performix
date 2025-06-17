import { Suspense } from 'react'
import { TestimonialsSectionClient } from './client'
import { getFeaturedTestimonials } from '@/lib/data/testimonials'
import { TestimonialLoading } from './loading'

export async function TestimonialsSection() {
  const testimonials = await getFeaturedTestimonials()

  return (
    <Suspense fallback={<TestimonialLoading />}>
      <TestimonialsSectionClient testimonials={testimonials} />
    </Suspense>
  )
}
