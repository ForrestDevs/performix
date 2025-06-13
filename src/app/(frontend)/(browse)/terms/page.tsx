'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

export default function TermsPage() {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          id="terms-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('terms-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card
            id="agreement"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('agreement') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Performix&apos;s mentorship platform, you agree to be bound
                by these Terms of Service. If you disagree with any part of these terms, you may not
                access our services.
              </p>
            </CardContent>
          </Card>

          <Card
            id="services"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Performix provides mentorship services connecting student-athletes with elite
                  mentors. Our services include:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>One-on-one mentorship sessions</li>
                  <li>Personalized development plans</li>
                  <li>Progress tracking and feedback</li>
                  <li>Access to educational resources</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card
            id="user-responsibilities"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('user-responsibilities')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  As a user of our platform, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Use the platform in compliance with all applicable laws</li>
                  <li>Respect the privacy and rights of other users</li>
                  <li>Not engage in any fraudulent or harmful activities</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card
            id="payment-terms"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('payment-terms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  All payments are processed securely through our payment providers. By using our
                  services, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Pay all fees associated with your selected services</li>
                  <li>Provide valid payment information</li>
                  <li>
                    Understand that all payments are non-refundable unless otherwise specified
                  </li>
                  <li>Accept our cancellation and rescheduling policies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card
            id="termination"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('termination') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to terminate or suspend access to our services immediately,
                without prior notice or liability, for any reason whatsoever, including without
                limitation if you breach the Terms. Upon termination, your right to use the service
                will immediately cease.
              </p>
            </CardContent>
          </Card>

          <Card
            id="changes"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('changes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is
                material, we will provide at least 30 days&apos; notice prior to any new terms
                taking effect. What constitutes a material change will be determined at our sole
                discretion.
              </p>
            </CardContent>
          </Card>

          <Card
            id="contact"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms, please contact us at
                support@performix.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
