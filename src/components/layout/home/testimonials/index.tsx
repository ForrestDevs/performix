import { getPayload } from '@/lib/utilities/getPayload'
import { TESTIMONIALS_SLUG } from '@/payload/collections/constants'
import { Suspense } from 'react'
import { TestimonialsSectionClient } from './client'

export async function TestimonialsSection() {
  const payload = await getPayload()

  const testimonials = await payload.find({
    collection: TESTIMONIALS_SLUG,
    limit: 3,
    sort: 'createdAt',
    depth: 1,
  })

  return (
    <Suspense
      fallback={
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
              <div className="h-6 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
            </div>
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mb-4" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3" />
                  <div className="h-32 w-full bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <TestimonialsSectionClient testimonials={testimonials.docs} />
    </Suspense>
  )
}
