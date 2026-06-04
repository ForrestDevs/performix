import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Privacy Policy - Performix',
  description:
    'Read the Performix privacy policy. Learn how we collect, use, share, and protect personal information, including SMS opt-in data.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | Performix',
    description:
      'Learn how Performix collects, uses, shares, and protects personal information.',
    type: 'website',
    url: 'https://www.performix.ca/privacy',
    siteName: 'Performix',
  },
  alternates: {
    canonical: 'https://www.performix.ca/privacy',
  },
}

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'We may collect contact details such as name, phone number, email address, city, province, state, and country.',
      'We may collect parent, guardian, and athlete information submitted through forms, including player age, current level, goals, team name, position, challenges, timeline, and development needs.',
      'We may collect communication history, including calls, emails, SMS messages, responses, booking activity, and support requests.',
      'We may collect payment and subscription information through secure third-party processors. We do not store full card numbers.',
      'We may collect technical and usage data from websites, forms, ads, and tracking tools, including device, browser, IP address, campaign source, page activity, cookies, and interaction data.',
    ],
  },
  {
    title: 'How We Collect Information',
    body: [
      'We collect information when you submit a Meta, Facebook, or Instagram instant lead form.',
      'We collect information when you submit a form on our website, landing pages, or booking pages.',
      'We collect information when you book or attend calls, send or receive SMS messages, email us, contact support, or purchase mentorship services.',
    ],
  },
  {
    title: 'How We Use Information',
    body: [
      'We use personal information to respond to inquiries, qualify leads, schedule sessions, and provide free sessions and paid mentorship services.',
      'We use personal information to send service updates, booking confirmations, reminders, Zoom or call details, and support messages.',
      'We use personal information to send promotional and informational text or email communications when consent is provided.',
      'We use personal information to improve campaign targeting, lead quality, service delivery, customer experience, payment processing, subscription management, legal compliance, and enforcement of our terms.',
    ],
  },
  {
    title: 'SMS and Marketing Communications',
    body: [
      'If you opt in, Performix Hockey may send informational and promotional SMS messages about free D1 sessions, scheduling, reminders, hockey development plans, and mentorship offers.',
      'Message frequency may vary, up to 9 messages per month. Message and data rates may apply. Consent to receive SMS is not a condition of purchase.',
      'Reply STOP to opt out of SMS messages. Reply HELP for help. You may also opt out by contacting us directly.',
    ],
  },
  {
    title: 'How We Share Information',
    body: [
      'We do not sell personal information.',
      'We may share information with trusted service providers that help us operate our business, including advertising and lead platforms, scheduling tools, automation tools, messaging providers, payment processors, analytics providers, hosting providers, and accounting providers.',
      'These providers are permitted to use information only as needed to provide services to us.',
      'No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties.',
    ],
  },
  {
    title: 'Cookies and Tracking',
    body: [
      'Our websites, landing pages, and advertising platforms may use cookies, pixels, and similar technologies to measure ad performance, understand visitor behavior, personalize experiences, improve marketing, and improve user experience.',
      'You may control cookies through your browser settings. Disabling cookies may affect some website features.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'We retain personal information only as long as reasonably necessary for business, contractual, legal, tax, accounting, customer support, and compliance purposes.',
      'When information is no longer needed, we delete, de-identify, or securely archive it where appropriate.',
    ],
  },
  {
    title: 'Data Security',
    body: [
      'We use reasonable administrative, technical, and organizational safeguards to protect personal information from unauthorized access, loss, misuse, alteration, or disclosure.',
      'No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    title: 'International Data Transfers',
    body: [
      'Your information may be processed or stored in jurisdictions outside your province, state, or country through our service providers.',
      'Where required, we use reasonable safeguards for cross-border transfers.',
    ],
  },
  {
    title: 'Your Choices and Rights',
    body: [
      'Depending on your location, you may have rights to request access, correction, deletion, or limitation of processing of your personal information.',
      'You can opt out of marketing emails by using the unsubscribe link where available. You can opt out of SMS by replying STOP.',
      'To exercise privacy rights, update your information, or ask questions, contact us using the details below.',
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      'Our services are marketed to parents and guardians and are not directed to children to provide personal information directly.',
      'Parents and guardians provide information on behalf of minor athletes and consent to communications and services on their behalf.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Updates are posted on this page with a revised Last updated date.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Effective date: March 2, 2026
            <br />
            Last updated: March 2, 2026
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Introduction</h2>
              <p className="leading-relaxed text-gray-600">
                This Privacy Policy explains how Performix Hockey, operated by Performix Collective
                Inc., collects, uses, shares, and protects personal information when you interact
                with our ads, forms, websites, booking pages, messages, and mentorship services.
              </p>
            </CardContent>
          </Card>

          {sections.map((section) => (
            <Card key={section.title}>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">{section.title}</h2>
                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed text-gray-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent className="p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Contact Us</h2>
              <p className="leading-relaxed text-gray-600">
                If you have any questions about this Privacy Policy or want to exercise privacy
                rights, contact us at:
              </p>
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Performix Hockey</p>
                <p className="text-gray-600">Operated by Performix Collective Inc.</p>
                <p className="text-gray-600">305 Warden Ave</p>
                <p className="text-gray-600">Scarborough, ON M1N 3A3</p>
                <p className="text-gray-600">Canada</p>
                <p className="text-gray-600">Email: mateo@performix.ca</p>
                <p className="text-gray-600">Phone: +1 647-625-6177</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
