import { TestimonialLoading } from '@/components/layout/home/testimonials/loading'
import { getFeaturedTestimonials } from '@/lib/data/testimonials'
import { Suspense } from 'react'
import TestimonialSliderCard from '@/components/testimonials'

export async function Testimonials() {
  const testimonials = await getFeaturedTestimonials()

  return (
    <Suspense fallback={<TestimonialLoading />}>
      <section className="w-full px-4 py-16 md:py-24">
        <div className="mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-foreground">
            What Parents and Players Are Saying
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mx-auto max-w-xl">
            Real stories from parents and players who used our system to unlock their development.
          </p>
        </div>
        <TestimonialSliderCard testimonials={testimonials} />
      </section>
    </Suspense>
  )
}
