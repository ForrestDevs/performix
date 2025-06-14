'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Media, Testimonial } from '@/payload-types'
import { Media as MediaComponent } from './Media'

interface TestimonialSliderCardProps {
  testimonials: Testimonial[]
}

export default function TestimonialSliderCard({ testimonials }: TestimonialSliderCardProps) {
  return (
    <section className="w-full py-4">
      <div className="mx-auto lg:max-w-6xl px-3">
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="shadow-sm">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="flex flex-col px-4 py-5 sm:p-6">
                      <q className="flex-1 text-gray-600 dark:text-gray-300">
                        {testimonial.message}
                      </q>
                      <div className="mt-6 flex gap-3">
                        <span className="inline-flex rounded-full">
                          <MediaComponent
                            resource={testimonial.image as Media}
                            loading="lazy"
                            imgClassName="h-10 w-10 rounded-full"
                          />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.team}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
        </Carousel>
      </div>
    </section>
  )
}
