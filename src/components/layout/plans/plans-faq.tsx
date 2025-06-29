'use client'

import React from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { ChevronRight } from 'lucide-react'

export function PlansFAQ() {
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
