'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { Card, CardContent } from '@/components/ui/card'
import { Media as MediaComponent } from '@/components/Media'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Media, Testimonial } from '@/payload-types'
import TestimonialSliderCard from '@/components/testimonials'

export function TestimonialsSectionClient({ testimonials }: { testimonials: Testimonial[] }) {
  //   const [currentSlide, setCurrentSlide] = useState(0)
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  //   const samples = [
  //     [
  //       {
  //         name: 'Alex Johnson',
  //         message:
  //           'The personalized training and recruitment guidance were exactly what I needed. I went from being overlooked to committing to Boston University.',
  //         team: 'Boston University',
  //         position: 'Forward',
  //         icon: '/placeholder.svg?height=64&width=64',
  //       },
  //       {
  //         name: 'Maya Patel',
  //         message:
  //           'My mentor helped me identify the gaps in my game and gave me a clear roadmap to success. Now I have multiple D1 offers to choose from.',
  //         team: 'University of Minnesota',
  //         position: 'Defenseman',
  //         icon: '/placeholder.svg?height=64&width=64',
  //       },
  //       {
  //         name: 'Ryan Chen',
  //         message:
  //           "The video analysis sessions were game-changing. I improved my skating technique and now I'm playing at a whole new level.",
  //         team: 'Harvard University',
  //         position: 'Center',
  //         icon: '/placeholder.svg?height=64&width=64',
  //       },
  //     ],
  //   ]

  //   const tests: Testimonial[] = [
  //     {
  //       id: 1,
  //       updatedAt: new Date().toISOString(),
  //       createdAt: new Date().toISOString(),
  //       name: 'Alex Johnson',
  //       message:
  //         'The personalized training and recruitment guidance were exactly what I needed. I went from being overlooked to committing to Boston University.',
  //       team: 'Boston University',
  //       position: 'Forward',
  //     },
  //     {
  //       id: 2,
  //       updatedAt: new Date().toISOString(),
  //       createdAt: new Date().toISOString(),
  //       name: 'Maya Patel',
  //       message:
  //         'My mentor helped me identify the gaps in my game and gave me a clear roadmap to success. Now I have multiple D1 offers to choose from.',
  //       team: 'University of Minnesota',
  //       position: 'Defenseman',
  //     },
  //     {
  //       id: 3,
  //       updatedAt: new Date().toISOString(),
  //       createdAt: new Date().toISOString(),
  //       name: 'Ryan Chen',
  //       message:
  //         "The video analysis sessions were game-changing. I improved my skating technique and now I'm playing at a whole new level.",
  //       team: 'Harvard University',
  //       position: 'Center',
  //     },
  //     {
  //       id: 4,
  //       updatedAt: new Date().toISOString(),
  //       createdAt: new Date().toISOString(),
  //       name: 'Emma Thompson',
  //       message:
  //         'The personalized training and recruitment guidance were exactly what I needed. I went from being overlooked to committing to Boston University.',
  //       team: 'Boston University',
  //       position: 'Forward',
  //     },
  //     {
  //       id: 5,
  //       updatedAt: new Date().toISOString(),
  //       createdAt: new Date().toISOString(),
  //       name: 'Emma Thompson',
  //       message:
  //         'The personalized training and recruitment guidance were exactly what I needed. I went from being overlooked to committing to Boston University.',
  //       team: 'Boston University',
  //       position: 'Forward',
  //     },
  //   ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="testimonials-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('testimonials-header')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Athletes & Parents Are Saying
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results. Real impact. Hear from athletes and parents who have directly benefited.
          </p>
        </div>
        <TestimonialSliderCard testimonials={testimonials} />
      </div>
    </section>
  )
}

// <div className="relative">
//           <div className="">
//             <div
//               className="flex transition-transform duration-500 ease-in-out py-2"
//               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//             >
//               {testimonials.map((testimonial, index) => (
//                 <div key={index} className="w-full flex-shrink-0 px-4">
//                   <Card className="border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-md mx-auto overflow-visible">
//                     <CardContent className="p-6">
//                       <div className="flex flex-col items-center text-center">
//                         <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0891B2] to-[#8B5CF6] p-0.5 mb-4">
//                           <div className="w-full h-full rounded-full overflow-hidden bg-white">
//                             <MediaComponent
//                               resource={testimonial.image as Media}
//                               imgClassName="w-full h-full object-cover"
//                             />
//                             {/* <Image
//                                 src={testimonial.icon}
//                                 alt={testimonial.name}
//                                 width={64}
//                                 height={64}
//                                 className="w-full h-full object-cover"
//                               /> */}
//                           </div>
//                         </div>
//                         <div className="flex items-center mb-3">
//                           {[...Array(5)].map((_, i) => (
//                             <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
//                           ))}
//                         </div>
//                         <p className="text-gray-800 text-base mb-4 italic leading-relaxed">
//                           &quot;{testimonial.message}&quot;
//                         </p>
//                         <div className="space-y-1">
//                           <p className="font-bold text-lg text-gray-900">{testimonial.name}</p>
//                           <p className="text-[#0891B2] font-semibold text-sm">
//                             {testimonial.position}
//                           </p>
//                           <p className="text-gray-500 text-sm">{testimonial.team}</p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg hover:bg-gray-50"
//             onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
//           >
//             <ChevronLeft className="h-6 w-6" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg hover:bg-gray-50"
//             onClick={() => setCurrentSlide(Math.min(2, currentSlide + 1))}
//           >
//             <ChevronRight className="h-6 w-6" />
//           </Button>

//           {/* Dots */}
//           <div className="flex justify-center mt-8 space-x-2">
//             {[0, 1, 2].map((index) => (
//               <button
//                 key={index}
//                 className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
//                   currentSlide === index ? 'bg-[#0891B2] w-8' : 'bg-gray-300'
//                 }`}
//                 onClick={() => setCurrentSlide(index)}
//               />
//             ))}
//           </div>
//         </div>
