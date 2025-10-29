'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Media, Testimonial } from '@/payload-types'
import Image from 'next/image'

export function MessageReviews({ messages }: { messages: Testimonial[] }) {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 2000 })]}
      opts={{
        align: 'center',
      }}
      // className="w-full max-w-sm"
    >
      <CarouselContent>
        {messages
          .filter(
            (message) =>
              message.image && typeof message.image === 'object' && 'url' in message.image,
          )
          .map((message, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/3 lg:basis-1/4">
              <div
                className="flex items-center justify-center w-full"
                style={{ maxWidth: '400px', margin: '0 auto' }}
              >
                <div className="relative w-64 h-96 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={(message.image as Media).url ?? '/placeholder.svg'}
                    alt={message.name ?? 'Testimonial'}
                    className="object-cover w-full h-full"
                    fill
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
}
