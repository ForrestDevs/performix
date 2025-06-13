'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ChevronRight, Check, Star, Shield, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { PerformixLogo } from '@/components/logo'
import { cn } from '@/lib/utilities/ui'

export default function PricingPage() {
  const visibleElements = useScrollAnimation()
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState('all-star')

  const isVisible = (id: string) => visibleElements.has(id)

  // Revised pricing plans data with optimized pricing
  const plans = [
    {
      id: 'foundation',
      name: 'FOUNDATION',
      price: billingCycle === 'monthly' ? 99 : 89,
      description: 'Essential mentorship for emerging players',
      features: [
        '24/7 Mentor Access (text/email only)',
        'Elite Hockey Course (training, nutrition, mindset)',
        'Private Community Access',
        'Monthly Progress Review (group call)',
      ],
      color: 'bg-gradient-to-br from-blue-50 to-blue-100',
      textColor: 'text-blue-600',
      popular: false,
      recommended: false,
    },
    {
      id: 'performer',
      name: 'PERFORMER',
      price: billingCycle === 'monthly' ? 179 : 161,
      description: 'Comprehensive development for competitive players',
      features: [
        'Everything in FOUNDATION',
        '24/7 Mentor Access (text/email/calls)',
        'Bi-weekly Performance Check-Ins (30min calls)',
        'Monthly Goal Roadmap & Strategy Session',
        'Priority mentor response (within 4 hours)',
      ],
      color: 'bg-white',
      textColor: 'text-indigo-600',
      popular: false,
      recommended: false,
    },
    {
      id: 'elite',
      name: 'ELITE',
      price: billingCycle === 'monthly' ? 249 : 224,
      description: 'Our most popular package for serious D1 aspirants',
      features: [
        'Everything in PERFORMER',
        '1 Professional Video Analysis per month',
        'Personalized Improvement Action Plan',
        'Weekly 45-minute Strategy Sessions',
        'Direct mentor phone access',
      ],
      color: 'bg-gradient-to-br from-blue-50 to-blue-100',
      textColor: 'text-blue-600',
      popular: true,
      recommended: true,
    },
    {
      id: 'championship',
      name: 'CHAMPIONSHIP',
      price: billingCycle === 'monthly' ? 449 : 404,
      description: 'Premium mentorship for elite-level development',
      features: [
        'Everything in ELITE',
        '2 Professional Video Analysis per month',
        '2 Elite Mindset Coaching Sessions (60min each)',
        'Custom Training Program Development',
        'Family consultation calls (monthly)',
      ],
      color: 'bg-gradient-to-br from-amber-50 to-amber-100',
      textColor: 'text-amber-600',
      popular: false,
      recommended: false,
    },
    {
      id: 'd1-bound',
      name: 'D1 BOUND',
      price: billingCycle === 'monthly' ? 999 : 899,
      description: 'Ultimate package for D1 commitment-ready players',
      features: [
        'Everything in CHAMPIONSHIP',
        'Weekly 1-on-1 coaching sessions (60min)',
        'Unlimited video analysis submissions',
        'College recruitment strategy & support',
        'Personal brand development',
        'College coach introductions & networking',
      ],
      bonusFeatures: [
        'BONUS: Off-Season Training Program (12 weeks)',
        'BONUS: NHL Nutrition Blueprint with monthly check-ins',
        'BONUS: College recruitment video creation',
        'BONUS: Scholarship application strategy',
        'BONUS: Tournament scouting coordination',
      ],
      color: 'bg-gradient-to-br from-purple-50 to-purple-100',
      textColor: 'text-purple-600',
      popular: false,
      recommended: false,
    },
  ]

  const faqs = [
    {
      question: 'How do I get matched with the right mentor?',
      answer:
        "After signing up, you'll complete a comprehensive assessment of your playing style, goals, and personality. Our team will match you with a mentor who specializes in your position and aligns with your specific needs. You can also schedule a call with Mateo for personalized matching.",
    },
    {
      question: 'Can I change my plan later?',
      answer:
        "You can upgrade, downgrade, or cancel your plan at any time. If you upgrade mid-billing cycle, we'll prorate the difference. There are no long-term contracts or cancellation fees.",
    },
    {
      question: "What's included in the Elite Hockey Course?",
      answer:
        'The Elite Hockey Course is a comprehensive digital program covering training protocols, nutrition guidelines, and mental performance strategies used by D1 and professional players. It includes video lessons, workbooks, and practical exercises you can implement immediately.',
    },
    {
      question: 'How do video analysis sessions work?',
      answer:
        "You'll submit game or practice footage through our platform. Your mentor will analyze your performance and create a detailed improvement sheet with specific drills and focus areas. You'll then review this together in a one-on-one session to ensure you understand exactly what to work on.",
    },
    {
      question: 'Is there a satisfaction guarantee?',
      answer:
        "Yes! We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your mentorship experience in the first month, we'll refund your payment in full. We're confident in our mentors and our process.",
    },
  ]

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0891B2] to-[#0E7490] py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 border border-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-['Space_Grotesk']">
              Invest in Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
                Hockey Future
              </span>
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Choose the mentorship package that fits your goals and budget
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-[#0891B2] font-medium'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <div className="relative">
                <div className="w-12 h-6 bg-white/20 rounded-full"></div>
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                    billingCycle === 'monthly' ? 'left-1' : 'left-7'
                  }`}
                ></div>
              </div>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  billingCycle === 'annual'
                    ? 'bg-white text-[#0891B2] font-medium'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Annual <span className="text-xs font-medium">Save 10%</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">94%</div>
                <div className="text-sm opacity-75">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">30-Day</div>
                <div className="text-sm opacity-75">Money-Back Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">D1+</div>
                <div className="text-sm opacity-75">Verified Mentors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                id={`plan-${plan.id}`}
                data-scroll-animate
                className={`transition-all duration-1000 ${
                  isVisible(`plan-${plan.id}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card
                  className={`border-2 h-full flex flex-col ${
                    plan.recommended
                      ? 'border-[#0891B2] shadow-lg shadow-[#0891B2]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${plan.color} transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-[#0891B2] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  <CardHeader className="text-center pt-8 pb-4">
                    <h3 className={`text-xl font-bold ${plan.textColor}`}>{plan.name}</h3>
                    <div className="mt-4 mb-2">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600 ml-1">per month</span>
                    </div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {plan.bonusFeatures && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          {plan.bonusFeatures.map((feature, i) => (
                            <li key={`bonus-${i}`} className="flex items-start mb-3">
                              <Sparkles className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </div>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4 pb-8">
                    <Button
                      className={`w-full ${
                        plan.recommended
                          ? 'bg-[#0891B2] hover:bg-[#0E7490]'
                          : 'bg-blue-500 hover:bg-blue-600'
                      } text-white`}
                    >
                      Get started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>

          {/* Money-back guarantee */}
          <div
            id="guarantee"
            data-scroll-animate
            className={`mt-12 text-center transition-all duration-1000 ${
              isVisible('guarantee') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-medium">30-Day Money-Back Guarantee</span>
            </div>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Try any plan risk-free. If you&apos;re not completely satisfied within 30 days,
              we&apos;ll refund your payment.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="comparison-header"
            data-scroll-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible('comparison-header')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
              Compare Mentorship Plans
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect plan to accelerate your journey to Division 1 hockey
            </p>
          </div>

          <div
            id="comparison-table"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('comparison-table')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-6 text-left text-gray-600">Features</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="py-4 px-6 text-center">
                        <div className={`font-bold ${plan.textColor}`}>{plan.name}</div>
                        <div className="text-xl font-bold text-gray-900 mt-1">${plan.price}</div>
                        <div className="text-sm text-gray-600">per month</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* 24/7 Mentor Access */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800 font-medium">24/7 Mentor Access</td>
                    {plans.map((plan) => (
                      <td key={`${plan.id}-mentor`} className="py-4 px-6 text-center">
                        {plan.features.includes('24/7 Mentor Access') ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <div className="h-5 w-5 mx-auto"></div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Weekly Performance Check-Ins */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      Weekly Performance Check-Ins
                    </td>
                    {plans.map((plan) => (
                      <td key={`${plan.id}-checkins`} className="py-4 px-6 text-center">
                        {plan.features.includes('Weekly Performance Check-Ins') ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <div className="h-5 w-5 mx-auto"></div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Elite Hockey Course */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800 font-medium">Elite Hockey Course</td>
                    {plans.map((plan) => (
                      <td key={`${plan.id}-course`} className="py-4 px-6 text-center">
                        {plan.features.some((f) => f.includes('Elite Hockey Course')) ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <div className="h-5 w-5 mx-auto"></div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Monthly Goal Roadmap */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800 font-medium">Monthly Goal Roadmap</td>
                    {plans.map((plan) => (
                      <td key={`${plan.id}-roadmap`} className="py-4 px-6 text-center">
                        {plan.features.includes('Monthly Goal Roadmap') ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <div className="h-5 w-5 mx-auto"></div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Video Analysis */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800 font-medium">Video Analysis</td>
                    {plans.map((plan) => (
                      <td key={`${plan.id}-video`} className="py-4 px-6 text-center">
                        {plan.features.some((f) => f.includes('Video Analysis')) ? (
                          <div className="text-sm font-medium">
                            {plan.id === 'elite'
                              ? '2 per month'
                              : plan.features.some((f) => f.includes('1 Video Analysis'))
                                ? '1 per month'
                                : ''}
                          </div>
                        ) : (
                          <div className="h-5 w-5 mx-auto"></div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Private Community Access */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      Private Community Access
                    </td>
                    {plans.map((plan) => (
                      <td key={`${plan.id}-community`} className="py-4 px-6 text-center">
                        {plan.features.includes('Private Community Access') ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <div className="h-5 w-5 mx-auto"></div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Off-Season Training Program */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      Off-Season Training Program
                    </td>
                    {plans.map((plan) => (
                      <td key={`${plan.id}-offseason`} className="py-4 px-6 text-center">
                        {plan.bonusFeatures?.some((f) =>
                          f.includes('Off-Season Training Program'),
                        ) ? (
                          <div className="flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                            <span className="text-xs font-medium text-amber-600">BONUS</span>
                          </div>
                        ) : (
                          <div className="h-5 w-5 mx-auto"></div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* NHL Nutrition Blueprint */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800 font-medium">NHL Nutrition Blueprint</td>
                    {plans.map((plan) => (
                      <td key={`${plan.id}-nutrition`} className="py-4 px-6 text-center">
                        {plan.bonusFeatures?.some((f) => f.includes('NHL Nutrition Blueprint')) ? (
                          <div className="flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                            <span className="text-xs font-medium text-amber-600">BONUS</span>
                          </div>
                        ) : (
                          <div className="h-5 w-5 mx-auto"></div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* CTA Row */}
                  <tr>
                    <td className="py-6 px-6"></td>
                    {plans.map((plan) => (
                      <td key={`${plan.id}-cta`} className="py-6 px-6 text-center">
                        <Button
                          className={`w-full ${
                            plan.recommended
                              ? 'bg-[#0891B2] hover:bg-[#0E7490]'
                              : 'bg-blue-500 hover:bg-blue-600'
                          } text-white`}
                        >
                          Select
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
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
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="faq-header"
            data-scroll-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible('faq-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our mentorship programs
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  id={`faq-${index}`}
                  data-scroll-animate
                  className={`border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-700 ${
                    isVisible(`faq-${index}`)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <ChevronRight className="h-5 w-5 text-gray-500 group-open:rotate-90 transition-transform duration-200 flex-shrink-0" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0891B2] to-[#0E7490]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="final-cta"
            data-scroll-animate
            className={`text-center text-white transition-all duration-1000 ${
              isVisible('final-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your D1 Journey?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of players already working with elite mentors to achieve their D1 dreams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'bg-white text-[#0891B2] hover:bg-gray-100 px-8',
                )}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="https://calendly.com/mateodixon/d1-mentorship-call"
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'border-white text-white hover:bg-white hover:text-[#0891B2] px-8',
                )}
              >
                Schedule a Consultation
              </Link>
            </div>
            <p className="mt-6 text-sm opacity-75">
              No credit card required to start • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
