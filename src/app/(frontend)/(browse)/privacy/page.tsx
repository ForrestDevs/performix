'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

export default function PrivacyPage() {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          id="privacy-header"
          data-scroll-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('privacy-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card
            id="introduction"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('introduction') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
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

          <Card
            id="information-collection"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('information-collection')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
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

          <Card
            id="information-usage"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('information-usage')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
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

          <Card
            id="information-sharing"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('information-sharing')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
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

          <Card
            id="data-security"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('data-security') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
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

          <Card
            id="your-rights"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('your-rights') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
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
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-medium">Performix Support</p>
                <p className="text-gray-600">Email: privacy@performix.com</p>
                <p className="text-gray-600">Phone: (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
