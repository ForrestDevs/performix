'use server'

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
}

export async function submitGamePlan(data: GamePlanData) {
  await createFormResponse('game-plan', data.firstName + ' ' + data.lastName, data.email, data.phone, data)
  await sendEmail({
    to: 'mateo@performix.ca',
    subject: 'Game Plan Submission',
    html: `
      <p>You have a new game plan submission:</p>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `,
  })
}
