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
}
