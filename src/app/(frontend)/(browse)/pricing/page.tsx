import { TestimonialsSection } from '@/components/layout/home/testimonials'
import { PricingCTA, PricingFAQs, PricingHeroCards } from '@/components/layout/pricing'

export default function PricingPage() {
  const testimonials = [
    {
      quote:
        "The All Star package was exactly what I needed. The video analysis helped me fix issues in my game I didn't even know I had. Six months later, I had three D1 offers.",
      name: 'Alex Johnson',
      position: 'Forward',
      commitment: 'Boston University',
      avatar: '/placeholder.svg?height=60&width=60',
    },
    {
      quote:
        "The Elite package was worth every penny. The off-season program transformed my conditioning, and the nutrition blueprint changed how I fuel my body. Now I'm playing D1 at Michigan.",
      name: 'Sarah Chen',
      position: 'Defenseman',
      commitment: 'University of Michigan',
      avatar: '/placeholder.svg?height=60&width=60',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <PricingHeroCards />
      <TestimonialsSection />

      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="testimonials-header"
            data-scroll-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible('testimonials-header')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
              Success Stories from Our Athletes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from players who&apos;ve transformed their hockey careers with our mentorship
              programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                id={`testimonial-${index}`}
                data-scroll-animate
                className={`transition-all duration-1000 ${
                  isVisible(`testimonial-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 mb-6 italic">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.avatar || '/placeholder.svg'}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-[#0891B2] text-sm">{testimonial.position}</p>
                        <p className="text-gray-600 text-sm">
                          Committed to {testimonial.commitment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <PricingFAQs />
      <PricingCTA />
    </div>
  )
}

// {/* Feature Comparison */}
// <section className="py-16 bg-white">
// <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//   <div
//     id="comparison-header"
//     data-scroll-animate
//     className={`text-center mb-12 transition-all duration-1000 ${
//       isVisible('comparison-header')
//         ? 'opacity-100 translate-y-0'
//         : 'opacity-0 translate-y-8'
//     }`}
//   >
//     <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
//       Compare Mentorship Plans
//     </h2>
//     <p className="text-gray-600 max-w-2xl mx-auto">
//       Find the perfect plan to accelerate your journey to Division 1 hockey
//     </p>
//   </div>

//   <div
//     id="comparison-table"
//     data-scroll-animate
//     className={`transition-all duration-1000 ${
//       isVisible('comparison-table')
//         ? 'opacity-100 translate-y-0'
//         : 'opacity-0 translate-y-8'
//     }`}
//   >
//     <div className="overflow-x-auto">
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="border-b-2 border-gray-200">
//             <th className="py-4 px-6 text-left text-gray-600">Features</th>
//             {plans.map((plan) => (
//               <th key={plan.id} className="py-4 px-6 text-center">
//                 <div className={`font-bold ${plan.textColor}`}>{plan.name}</div>
//                 <div className="text-xl font-bold text-gray-900 mt-1">${plan.price}</div>
//                 <div className="text-sm text-gray-600">per month</div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {/* 24/7 Mentor Access */}
//           <tr className="border-b border-gray-200 hover:bg-gray-50">
//             <td className="py-4 px-6 text-gray-800 font-medium">24/7 Mentor Access</td>
//             {plans.map((plan) => (
//               <td key={`${plan.id}-mentor`} className="py-4 px-6 text-center">
//                 {plan.features.includes('24/7 Mentor Access') ? (
//                   <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
//                 ) : (
//                   <div className="h-5 w-5 mx-auto"></div>
//                 )}
//               </td>
//             ))}
//           </tr>

//           {/* Weekly Performance Check-Ins */}
//           <tr className="border-b border-gray-200 hover:bg-gray-50">
//             <td className="py-4 px-6 text-gray-800 font-medium">
//               Weekly Performance Check-Ins
//             </td>
//             {plans.map((plan) => (
//               <td key={`${plan.id}-checkins`} className="py-4 px-6 text-center">
//                 {plan.features.includes('Weekly Performance Check-Ins') ? (
//                   <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
//                 ) : (
//                   <div className="h-5 w-5 mx-auto"></div>
//                 )}
//               </td>
//             ))}
//           </tr>

//           {/* Elite Hockey Course */}
//           <tr className="border-b border-gray-200 hover:bg-gray-50">
//             <td className="py-4 px-6 text-gray-800 font-medium">Elite Hockey Course</td>
//             {plans.map((plan) => (
//               <td key={`${plan.id}-course`} className="py-4 px-6 text-center">
//                 {plan.features.some((f) => f.includes('Elite Hockey Course')) ? (
//                   <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
//                 ) : (
//                   <div className="h-5 w-5 mx-auto"></div>
//                 )}
//               </td>
//             ))}
//           </tr>

//           {/* Monthly Goal Roadmap */}
//           <tr className="border-b border-gray-200 hover:bg-gray-50">
//             <td className="py-4 px-6 text-gray-800 font-medium">Monthly Goal Roadmap</td>
//             {plans.map((plan) => (
//               <td key={`${plan.id}-roadmap`} className="py-4 px-6 text-center">
//                 {plan.features.includes('Monthly Goal Roadmap') ? (
//                   <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
//                 ) : (
//                   <div className="h-5 w-5 mx-auto"></div>
//                 )}
//               </td>
//             ))}
//           </tr>

//           {/* Video Analysis */}
//           <tr className="border-b border-gray-200 hover:bg-gray-50">
//             <td className="py-4 px-6 text-gray-800 font-medium">Video Analysis</td>
//             {plans.map((plan) => (
//               <td key={`${plan.id}-video`} className="py-4 px-6 text-center">
//                 {plan.features.some((f) => f.includes('Video Analysis')) ? (
//                   <div className="text-sm font-medium">
//                     {plan.id === 'elite'
//                       ? '2 per month'
//                       : plan.features.some((f) => f.includes('1 Video Analysis'))
//                         ? '1 per month'
//                         : ''}
//                   </div>
//                 ) : (
//                   <div className="h-5 w-5 mx-auto"></div>
//                 )}
//               </td>
//             ))}
//           </tr>

//           {/* Private Community Access */}
//           <tr className="border-b border-gray-200 hover:bg-gray-50">
//             <td className="py-4 px-6 text-gray-800 font-medium">
//               Private Community Access
//             </td>
//             {plans.map((plan) => (
//               <td key={`${plan.id}-community`} className="py-4 px-6 text-center">
//                 {plan.features.includes('Private Community Access') ? (
//                   <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
//                 ) : (
//                   <div className="h-5 w-5 mx-auto"></div>
//                 )}
//               </td>
//             ))}
//           </tr>

//           {/* Off-Season Training Program */}
//           <tr className="border-b border-gray-200 hover:bg-gray-50">
//             <td className="py-4 px-6 text-gray-800 font-medium">
//               Off-Season Training Program
//             </td>
//             {plans.map((plan) => (
//               <td key={`${plan.id}-offseason`} className="py-4 px-6 text-center">
//                 {plan.features.some((f) => f.includes('Off-Season Training Program')) ? (
//                   <div className="flex items-center justify-center">
//                     <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
//                     <span className="text-xs font-medium text-amber-600">BONUS</span>
//                   </div>
//                 ) : (
//                   <div className="h-5 w-5 mx-auto"></div>
//                 )}
//               </td>
//             ))}
//           </tr>

//           {/* NHL Nutrition Blueprint */}
//           <tr className="border-b border-gray-200 hover:bg-gray-50">
//             <td className="py-4 px-6 text-gray-800 font-medium">NHL Nutrition Blueprint</td>
//             {plans.map((plan) => (
//               <td key={`${plan.id}-nutrition`} className="py-4 px-6 text-center">
//                 {plan.features.some((f) => f.includes('NHL Nutrition Blueprint')) ? (
//                   <div className="flex items-center justify-center">
//                     <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
//                     <span className="text-xs font-medium text-amber-600">BONUS</span>
//                   </div>
//                 ) : (
//                   <div className="h-5 w-5 mx-auto"></div>
//                 )}
//               </td>
//             ))}
//           </tr>

//           {/* CTA Row */}
//           <tr>
//             <td className="py-6 px-6"></td>
//             {plans.map((plan) => (
//               <td key={`${plan.id}-cta`} className="py-6 px-6 text-center">
//                 <Button
//                   className={`w-full ${
//                     plan.recommended
//                       ? 'bg-[#0891B2] hover:bg-[#0E7490]'
//                       : 'bg-blue-500 hover:bg-blue-600'
//                   } text-white`}
//                 >
//                   Select
//                 </Button>
//               </td>
//             ))}
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>
// </section>
