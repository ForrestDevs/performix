'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Card } from '@/components/ui/card'

export function MessageReviews({ messages }: { messages: any[] }) {
  return (
    <Carousel className="mx-auto max-w-3xl" plugins={[Autoplay({ delay: 2000 })]}>
      <CarouselContent>
        {messages.map((message, index) => (
          <CarouselItem key={index} className="px-2">
            <Card className="bg-white border-2 border-border shadow-lg overflow-hidden">
              <div className="bg-gradient-to-b from-gray-50 to-white px-6 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      <div className="w-1 h-3 bg-gray-600 rounded-sm"></div>
                      <div className="w-1 h-3 bg-gray-600 rounded-sm"></div>
                      <div className="w-1 h-3 bg-gray-400 rounded-sm"></div>
                      <div className="w-1 h-3 bg-gray-300 rounded-sm"></div>
                    </div>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                  {message.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{message.name}</div>
                  <div className="text-xs text-gray-500">iMessage</div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 min-h-[180px] flex flex-col justify-end">
                <div className="flex justify-end mb-2">
                  <div className="max-w-[85%]">
                    <div className="bg-primary text-white rounded-3xl rounded-tr-md px-5 py-3 shadow-sm">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">{message.time}</div>
                  </div>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
