import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Terms of Service - Performix',
  description:
    'Read the Performix terms of service, including service terms, billing terms, scheduling terms, and SMS program terms.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service | Performix',
    description:
      'Understand your rights and responsibilities when using Performix Hockey services.',
    type: 'website',
    url: 'https://www.performix.ca/terms',
    siteName: 'Performix',
  },
  alternates: {
    canonical: 'https://www.performix.ca/terms',
  },
}

const sections = [
  {
    title: 'Who These Terms Apply To',
    body: [
      'Our services are intended for parents, guardians, and families of hockey players.',
      "If you are signing up on behalf of a minor, you represent that you are the minor athlete's parent or legal guardian and you consent to communications and services on their behalf.",
      'Our SMS program is intended for adults who are 18 years of age or older, including parents and legal guardians communicating on behalf of minor athletes.',
    ],
  },
  {
    title: 'Services',
    body: [
      'Performix Hockey provides hockey development and mentorship services, including free virtual assessment sessions, development planning, and paid mentorship subscriptions.',
      'We may change, update, or discontinue parts of our services at any time.',
    ],
  },
  {
    title: 'No Guarantee of Specific Results',
    body: [
      'Athletic development depends on many factors outside our control, including athlete effort, health, coach or team context, available training time, and consistency.',
      'We do not guarantee roster placement, scholarships, specific performance outcomes, or timeline-based results.',
    ],
  },
  {
    title: 'Not Medical, Mental Health, or Legal Advice',
    body: [
      'Our services are educational and performance-focused.',
      'They are not medical care, mental health treatment, legal advice, or financial advice.',
    ],
  },
  {
    title: 'Accounts and Accurate Information',
    body: [
      'You agree to provide accurate and complete information when submitting forms, booking calls, enrolling in services, or communicating with us.',
      'You are responsible for keeping your contact information up to date.',
    ],
  },
  {
    title: 'Fees, Billing, and Cancellation',
    body: [
      'If you enroll in a paid mentorship tier, you agree to the fees and billing terms presented at checkout, in your subscription, or in your signed agreement.',
      'Subscription charges recur on the billing cycle selected at sign-up unless otherwise stated in writing.',
      'You may cancel future billing by providing notice before your next billing date.',
      'Payments already processed are non-refundable unless required by law or explicitly stated otherwise in writing.',
      'We may suspend services for failed or overdue payments.',
    ],
  },
  {
    title: 'Scheduling, Calls, and Missed Appointments',
    body: [
      'You are responsible for selecting available times and attending booked sessions.',
      'If you miss a scheduled call or session, rescheduling is at our discretion and subject to availability.',
    ],
  },
  {
    title: 'SMS Program Terms',
    body: [
      'By submitting your phone number through our forms and opting in, you agree to receive informational and promotional text messages from Performix Hockey.',
      'SMS messages may include messages about free D1 sessions, game plan submissions, scheduling, appointment confirmations, appointment reminders, Zoom or call details, hockey development plans, customer care, and mentorship offers.',
      'Message frequency may vary, up to 9 messages per month. Message and data rates may apply. Consent is not a condition of purchase.',
      'Reply STOP at any time to opt out. After you reply STOP, we may send one final message confirming that you have been unsubscribed.',
      'Reply HELP for help. You may also contact us at mateo@performix.ca or +1 647-625-6177 for support.',
      'Carriers are not liable for delayed or undelivered messages.',
      'Our SMS program is intended for adults 18 years of age or older, including parents and legal guardians communicating on behalf of minor athletes.',
      'Our use of personal information, including SMS opt-in data, is described in our Privacy Policy at https://www.performix.ca/privacy.',
    ],
  },
  {
    title: 'Acceptable Use',
    body: [
      'You agree not to use our services for unlawful, abusive, fraudulent, or harmful purposes.',
      'You agree not to interfere with service operations, impersonate another person, or copy or distribute our proprietary materials without permission.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'All content, materials, frameworks, videos, program resources, and training materials provided by Performix Hockey are owned by or licensed to us and are protected by intellectual property laws.',
      'You receive a limited, non-transferable license for personal use only.',
    ],
  },
  {
    title: 'Third-Party Platforms',
    body: [
      'We use third-party services such as Meta, Google, Calendly, Zapier, payment processors, analytics providers, and SMS providers.',
      'Your use of those platforms may also be subject to their terms and privacy policies.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, Performix Hockey is not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, opportunities, or goodwill arising from use of our services.',
      'Our total liability for any claim relating to paid services will not exceed the amount paid by you to Performix Hockey in the three months preceding the event giving rise to the claim.',
    ],
  },
  {
    title: 'Indemnification',
    body: [
      'You agree to indemnify and hold harmless Performix Hockey, Performix Collective Inc., and their owners, contractors, and affiliates from claims, damages, and expenses arising out of your misuse of services, breach of these Terms, or violation of law.',
    ],
  },
  {
    title: 'Governing Law',
    body: [
      'These Terms are governed by the laws of Ontario and the applicable federal laws of Canada, without regard to conflict of law principles.',
    ],
  },
  {
    title: 'Changes to These Terms',
    body: [
      'We may update these Terms from time to time. Updates become effective when posted with a revised Last updated date.',
      'Continued use of our services after updates means you accept the revised Terms.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Terms of Service</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Effective date: March 2, 2026
            <br />
            Last updated: March 2, 2026
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Agreement to Terms
              </h2>
              <p className="leading-relaxed text-gray-600">
                These Terms of Service govern your use of services provided by Performix Hockey,
                operated by Performix Collective Inc., including mentorship programs, free
                assessment sessions, websites, landing pages, ads, forms, calls, and text messages.
                By accessing or using our services, you agree to these Terms.
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
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Contact Information</h2>
              <p className="leading-relaxed text-gray-600">
                If you have any questions about these Terms or need SMS support, contact us at:
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
