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

const GHL_WEBSITE_FREE_SESSION_WEBHOOK_URL =
  process.env.GHL_WEBSITE_FREE_SESSION_WEBHOOK_URL ||
  'https://services.leadconnectorhq.com/hooks/xPy72Y2M04enF6wuXcEZ/webhook-trigger/d87bea51-ed1d-4da3-8af1-e990e98b9ff1'

const whoAreYouLabels: Record<string, string> = {
  player: 'Player',
  parent: 'Parent / guardian',
  other: 'Other',
}

const seriousnessLabels: Record<string, string> = {
  super: 'Super serious',
  exploring: 'Exploring options',
  curious: 'Just curious',
}

const decisionInvolvementLabels: Record<string, string> = {
  justMe: 'Just me',
  meAndParents: 'Me and my parents',
  parentOnly: 'Parent / guardian',
}

const startWhenLabels: Record<string, string> = {
  now: 'Now',
  '30days': 'Within 30 days',
  '30plusdays': '30+ days',
}

async function sendGhlGamePlanWebhook(data: FormResponse) {
  const webhookUrl = GHL_WEBSITE_FREE_SESSION_WEBHOOK_URL

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
      event: 'website_free_session_application_submitted',
      source: 'performix-website',
      formName: data.formName,
      formResponseId: data.id,
      userName: data.userName,
      userPhone: data.userPhone,
      userEmail: data.userEmail,
      firstName: responseData.firstName,
      lastName: responseData.lastName,
      fullName: submission.fullName,
      email: responseData.email,
      phone: responseData.phone,
      whoAreYou: responseData.whoAreYou,
      whoAreYouLabel: whoAreYouLabels[responseData.whoAreYou] || responseData.whoAreYou,
      age: responseData.age,
      level: responseData.level,
      seriousness: responseData.seriousness,
      seriousnessLabel: seriousnessLabels[responseData.seriousness] || responseData.seriousness,
      decisionInvolvement: responseData.decisionInvolvement,
      decisionInvolvementLabel:
        decisionInvolvementLabels[responseData.decisionInvolvement] ||
        responseData.decisionInvolvement,
      startWhen: responseData.startWhen,
      startWhenLabel: startWhenLabels[responseData.startWhen] || responseData.startWhen,
      smsConsent: submission.smsConsent,
      smsConsentCapturedAt: submission.smsConsentCapturedAt,
      smsConsentText: submission.smsConsentText,
      smsConsentVersion: submission.smsConsentVersion,
      submittedAt: submission.submittedAt,
      rawResponse: responseData,
    }),
  })

  if (!response.ok) {
    throw new Error(`GHL website free session webhook failed with status ${response.status}`)
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
      subject: 'Free 1-on-1 Session Application',
      html: `
          <p>You have a new free 1-on-1 session application:</p>
          <pre>${JSON.stringify(doc.response, null, 2)}</pre>
        `,
    })

    try {
      await sendGhlGamePlanWebhook(doc)
    } catch (error) {
      console.error('Failed to send GHL website free session webhook:', error)
    }
  }

  return doc
}

export default afterChangeFormResponse
