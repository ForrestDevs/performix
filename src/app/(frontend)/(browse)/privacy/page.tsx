import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Privacy Policy - Performix',
  description:
    'Read the Performix privacy policy. Learn how we collect, use, and protect your personal information on our hockey mentorship platform.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | Performix',
    description: 'Learn how Performix collects, uses, and protects your personal information.',
    type: 'website',
    url: 'https://www.performix.ca/privacy',
    siteName: 'Performix',
  },
  alternates: {
    canonical: 'https://www.performix.ca/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Last updated: January 2026
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                At Performix, we take your privacy seriously. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you use our mentorship
                platform. Please read this privacy policy carefully. If you do not agree with the
                terms of this privacy policy, please do not access the platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Register for an account</li>
                    <li>Sign up for our newsletter</li>
                    <li>Participate in mentorship sessions</li>
                    <li>Contact us for support</li>
                    <li>Complete surveys or feedback forms</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We automatically collect certain information about your device and how you
                    interact with our platform, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>IP address and browser type</li>
                    <li>Pages visited and time spent</li>
                    <li>Device information</li>
                    <li>Location data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide and maintain our mentorship services</li>
                <li>Process your transactions and manage your account</li>
                <li>Send you important updates and notifications</li>
                <li>Improve our platform and user experience</li>
                <li>Communicate with you about our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Information Sharing and Disclosure
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Service providers who assist in operating our platform</li>
                <li>Mentors and other users as part of the mentorship process</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your
                personal information against unauthorized access, alteration, disclosure, or
                destruction. However, no method of transmission over the Internet is 100% secure,
                and we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-medium">Performix Support</p>
                <p className="text-gray-600">Email: privacy@performix.ca</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
