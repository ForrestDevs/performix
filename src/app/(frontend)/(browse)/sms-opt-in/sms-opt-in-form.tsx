'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const checkboxOneLabel =
  'I consent to receive non-marketing text messages from Performix Hockey about scheduling, free D1 development sessions, session confirmations, and mentorship program information. Message frequency may vary, message and data rates may apply. Text HELP for assistance, reply STOP to opt out.'

const checkboxTwoLabel =
  'I consent to receive marketing text messages, about free plan offers, program promotions, and development resources, from Performix Hockey at the phone number provided. Message frequency may vary. Message and data rates may apply. Text HELP for assistance, reply STOP to opt out.'

export function SmsOptInForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex min-h-[260px] items-center justify-center text-center">
        <p className="text-xl font-semibold text-gray-900">
          You are all set. We will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-gray-900" htmlFor="firstName">
          <span>First Name</span>
          <Input id="firstName" name="firstName" autoComplete="given-name" />
        </label>

        <label className="space-y-2 text-sm font-medium text-gray-900" htmlFor="lastName">
          <span>Last Name</span>
          <Input id="lastName" name="lastName" autoComplete="family-name" />
        </label>

        <label className="space-y-2 text-sm font-medium text-gray-900" htmlFor="phone">
          <span>Phone *</span>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" required />
        </label>

        <label className="space-y-2 text-sm font-medium text-gray-900" htmlFor="email">
          <span>Email *</span>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <div className="space-y-4">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
          <input
            type="checkbox"
            name="nonMarketingConsent"
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#0891B2] focus:ring-[#0891B2]"
          />
          <span>{checkboxOneLabel}</span>
        </label>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
          <input
            type="checkbox"
            name="marketingConsent"
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#0891B2] focus:ring-[#0891B2]"
          />
          <span>{checkboxTwoLabel}</span>
        </label>
      </div>

      <p className="text-sm text-gray-600">
        <a
          href="https://www.performix.ca/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#0891B2] underline underline-offset-4"
        >
          Privacy Policy
        </a>
        <span className="px-2 text-gray-400">|</span>
        <a
          href="https://www.performix.ca/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#0891B2] underline underline-offset-4"
        >
          Terms and Conditions
        </a>
      </p>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#0891B2] px-8 text-white hover:bg-[#0E7490] sm:w-auto"
      >
        Submit
      </Button>
    </form>
  )
}
