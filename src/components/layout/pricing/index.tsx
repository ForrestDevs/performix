'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { cn } from '@/lib/utilities/ui'
import { ArrowRight, Check, ChevronRight, Shield } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function PricingHeroCards() {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      id: 'starter',
      name: 'STARTER',
      price: billingCycle === 'monthly' ? 129 : 116,
      description: 'Essential mentorship for emerging players',
      features: [
        'Direct text/email access to Mateo (Founder & Lead Mentor)',
        'Complete Elite Hockey Course (training, nutrition, mindset)',
        'Access to members-only community',
        'Bi-weekly development group calls',
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
        'Everything in STARTER',
        'Personal mentor assigned based on your position and goals',
        'Monthly Goal Roadmap & Strategy Session',
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
        '1 Personalized Improvement Action Plan per month',
        'Exclusive access to Elite Hockey Experts (Coaches, Trainers, Nutritionists, etc.)',
      ],
      color: 'bg-gradient-to-br from-blue-50 to-blue-100',
      textColor: 'text-blue-600',
      popular: true,
      recommended: true,
    },
    {
      id: 'champion',
      name: 'CHAMPION',
      price: billingCycle === 'monthly' ? 449 : 404,
      description: 'Premium mentorship for elite-level development',
      features: [
        'Everything in ELITE',
        '2 Professional Video Analysis per month',
        '2 Personalized Improvement Action Plan per month',
        'Off/In Season Custom Training Programs',
        'Family consultation calls (monthly)',
        'Personalized Training Drills & Exercise Routines',
      ],
      color: 'bg-gradient-to-br from-amber-50 to-amber-100',
      textColor: 'text-amber-600',
      popular: false,
      recommended: false,
    },
  ]
  return (
    <div>
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
              Choose the mentorship package that fits your goals
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
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="relative"
              >
                <div className="w-12 h-6 bg-white/20 rounded-full"></div>
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                    billingCycle === 'monthly' ? 'left-1' : 'left-7'
                  }`}
                ></div>
              </button>
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
                <div className="text-2xl font-bold mb-1">100%</div>
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
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600 ml-1">USD/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4 pb-8">
                    <Link
                      href="/get-started"
                      className={cn(
                        buttonVariants(),
                        'w-full text-white',
                        plan.recommended
                          ? 'bg-[#0891B2] hover:bg-[#0E7490]'
                          : 'bg-blue-500 hover:bg-blue-600',
                      )}
                    >
                      Get started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
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
            <div className="inline-flex items-center bg-green-50 text-green-700 px-6 py-3 rounded-full text-lg">
              <Shield className="h-6 w-6 mr-3" />
              <span className="font-semibold">30-Day Money-Back Guarantee</span>
            </div>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Try any plan risk-free. If you&apos;re not completely satisfied within 30 days,
              we&apos;ll refund your payment.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export function PricingFAQs() {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)
  const faqs = [
    {
      question: 'How do I get matched with the right mentor?',
      answer:
        "After signing up, you'll schedule a 30-minute call with Mateo to discuss your goals and needs. We'll then match you with a mentor who specializes in your position and aligns with your specific needs.",
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
        "Video analysis sessions are conducted through private one-on-one Zoom calls with your D1 mentor. During these sessions, your mentor will analyze your gameplay footage and provide high-level strategic insights to enhance your on-ice effectiveness. This includes detailed feedback on positioning, technique, mechanics, and decision-making. Following the session, you'll receive a summarized improvement sheet on areas to focus and develop on.",
    },
    {
      question: 'Is there a satisfaction guarantee?',
      answer:
        "Yes! We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your mentorship experience in the first month, we'll refund your payment in full. We're confident in our mentors and our process.",
    },
  ]

  return (
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
  )
}

export function PricingCTA() {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)
  return (
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
  )
}
