import { sendEmail } from '@/lib/data/email'
import type { CollectionAfterChangeHook } from 'payload'
import type { FormResponse } from '@/payload-types'
import {
  GAME_PLAN_SMS_CONSENT_COPY,
  GAME_PLAN_SMS_CONSENT_VERSION,
} from '@/lib/constants/game-plan-sms-consent'

type GamePlanData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  whoAreYou: string
  age: number
  level: string
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

async function sendZapierGamePlanWebhook(data: FormResponse) {
  const webhookUrl = process.env.ZAPIER_GAME_PLAN_WEBHOOK_URL

  const responseData = data.response as GamePlanData

  const submission: GamePlanSubmission = {
    ...responseData,
    fullName: `${responseData.firstName} ${responseData.lastName}`,
    submittedAt: new Date().toISOString(),
    smsConsentCapturedAt: new Date().toISOString(),
    smsConsentText: GAME_PLAN_SMS_CONSENT_COPY,
    smsConsentVersion: GAME_PLAN_SMS_CONSENT_VERSION,
  }

  if (!webhookUrl || !submission.smsConsent) {
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

const afterChangeFormResponse: CollectionAfterChangeHook<FormResponse> = async ({
  doc,
  req,
  operation,
}) => {
  if (operation !== 'create') return doc

  if (doc.formName === 'game-plan') {
    await sendEmail({
      to: 'mateo@performix.ca',
      subject: 'Game Plan Submission',
      html: `
          <p>You have a new game plan submission:</p>
          <pre>${JSON.stringify(doc.response, null, 2)}</pre>
        `,
    })

    try {
      await sendZapierGamePlanWebhook(doc)
    } catch (error) {
      console.error('Failed to send Zapier game plan webhook:', error)
    }
  }

  return doc
}

export default afterChangeFormResponse
