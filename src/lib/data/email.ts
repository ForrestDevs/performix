import { getPayload } from '../utilities/getPayload'

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const payload = await getPayload()

    await payload.sendEmail({
      to: options.to,
      subject: options.subject,
      html: options.html,
      ...(options.text && { text: options.text }),
    })

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}
