'use server'

import {
  GAME_PLAN_SMS_CONSENT_COPY,
  GAME_PLAN_SMS_CONSENT_VERSION,
} from '@/lib/constants/game-plan-sms-consent'
import { sendEmail } from './email'
import { createFormResponse } from './form-response'

type GamePlanData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  whoAreYou: string
  age: number
  level: string
  strengths: string
  success: string
  seriousness: string
  decisionInvolvement: string
  startWhen: string
  smsConsent: boolean
}

type GamePlanSubmission = GamePlanData & {
  fullName: string
  submittedAt: string
  smsConsentCapturedAt: string
  smsConsentText: string
  smsConsentVersion: string
}

async function sendZapierGamePlanWebhook(data: GamePlanSubmission) {
  const webhookUrl = process.env.ZAPIER_GAME_PLAN_WEBHOOK_URL

  if (!webhookUrl || !data.smsConsent) {
    return
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: 'game_plan_submitted',
      source: 'performix-website',
      ...data,
    }),
  })

  if (!response.ok) {
    throw new Error(`Zapier webhook failed with status ${response.status}`)
  }
}

export async function submitGamePlan(data: GamePlanData) {
  const submittedAt = new Date().toISOString()
  const submission: GamePlanSubmission = {
    ...data,
    fullName: `${data.firstName} ${data.lastName}`,
    submittedAt,
    smsConsentCapturedAt: submittedAt,
    smsConsentText: GAME_PLAN_SMS_CONSENT_COPY,
    smsConsentVersion: GAME_PLAN_SMS_CONSENT_VERSION,
  }

  await createFormResponse(
    'game-plan',
    submission.fullName,
    submission.phone,
    submission.email,
    submission,
  )
  await sendEmail({
    to: 'mateo@performix.ca',
    subject: 'Game Plan Submission',
    html: `
      <p>You have a new game plan submission:</p>
      <pre>${JSON.stringify(submission, null, 2)}</pre>
    `,
  })

  try {
    await sendZapierGamePlanWebhook(submission)
  } catch (error) {
    console.error('Failed to send Zapier game plan webhook:', error)
  }
}
