'use server'

import { sendEmail } from './email'

export async function submitGamePlan(data: any) {
  await sendEmail({
    to: 'mateo@performix.ca',
    subject: 'Game Plan Submission',
    html: `
      <p>You have a new game plan submission:</p>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `,
  })
}
