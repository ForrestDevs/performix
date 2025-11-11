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
                style={{ maxWidth: '340px', margin: '0 auto' }}
              >
                <div className="relative aspect-[3/4] w-72 bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-border">
                  <Image
                    src={(message.image as Media).url ?? '/placeholder.svg'}
                    alt={message.name ?? 'Testimonial'}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 80vw, 288px"
                    priority={index < 3}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
      <div className="flex md:hidden justify-between mt-4">
        <CarouselPrevious className="relative static -translate-y-0 left-0" />
        <CarouselNext className="relative static -translate-y-0 right-0" />
      </div>
    </Carousel>
  )
}
