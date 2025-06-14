'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from '@/components/ui/carousel'
import { Media, Testimonial } from '@/payload-types'
import { Media as MediaComponent } from './Media'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from './ui/button'

interface TestimonialSliderCardProps {
  testimonials: Testimonial[]
}

export default function TestimonialSliderCard({ testimonials }: TestimonialSliderCardProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
            <Card className="mx-auto h-full border border-gray-100 transition-all duration-300 bg-gradient-to-br from-white via-gray-50 to-gray-100">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex flex-col items-center text-center flex-grow">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0891B2] to-[#8B5CF6] p-0.5 mb-4 flex-shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <MediaComponent
                        resource={testimonial.image as Media}
                        imgClassName="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex items-center mb-3 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-800 text-base mb-4 italic leading-relaxed line-clamp-4">
                    &quot;{testimonial.message}&quot;
                  </p>
                  <div className="space-y-1 mt-auto">
                    <p className="font-bold text-lg text-gray-900">{testimonial.name}</p>
                    <p className="text-[#0891B2] font-semibold text-sm">{testimonial.position}</p>
                    <p className="text-gray-500 text-sm">{testimonial.team}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselButtons />
    </Carousel>
  )
}

function CarouselButtons() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext, api } = useCarousel()

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:hover:bg-white/80 disabled:hover:shadow-lg"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:hover:bg-white/80 disabled:hover:shadow-lg"
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </Button>
    </div>
  )
}
