import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { PerformixLogoClear } from '@/components/logo'
import { SmsOptInForm } from './sms-opt-in-form'

export const metadata: Metadata = {
  title: {
    absolute: 'SMS Consent | Performix',
  },
  description:
    'SMS communication consent form for Performix Hockey scheduling, session, and program communications.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'SMS Consent | Performix',
    description:
      'SMS communication consent form for Performix Hockey scheduling, session, and program communications.',
    type: 'website',
    url: 'https://www.performix.ca/sms-opt-in',
    siteName: 'Performix',
  },
  alternates: {
    canonical: 'https://www.performix.ca/sms-opt-in',
  },
}

export default function SmsOptInPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-[600px] rounded-lg bg-white shadow-sm">
        <CardContent className="p-6 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <PerformixLogoClear />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              SMS Communication Consent
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Please complete this form to receive communications from Performix Hockey. Both
              consent checkboxes below are optional.
            </p>
          </div>

          <SmsOptInForm />
        </CardContent>
      </Card>
    </main>
  )
}
