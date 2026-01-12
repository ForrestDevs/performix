import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Terms of Service - Performix',
  description:
    'Read the Performix terms of service. Understand your rights and responsibilities when using our hockey mentorship platform.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service | Performix',
    description:
      'Understand your rights and responsibilities when using the Performix platform.',
    type: 'website',
    url: 'https://www.performix.ca/terms',
    siteName: 'Performix',
  },
  alternates: {
    canonical: 'https://www.performix.ca/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Last updated: January 2026
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Performix&apos;s mentorship platform, you agree to be bound
                by these Terms of Service. If you disagree with any part of these terms, you may not
                access our services.
              </p>
            </CardContent>
          </Card>

          <Card>
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

          <Card>
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

          <Card>
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

          <Card>
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

          <Card>
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

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms, please contact us at
                support@performix.ca
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
