'use server'

import { FORM_RESPONSES_SLUG } from '@/payload/collections/constants'
import { getPayload } from '@/lib/utilities/getPayload'

export async function createFormResponse(
  formName: string,
  userName: string,
  userPhone: string,
  userEmail: string,
  response: any,
) {
  const payload = await getPayload()
  await payload.create({
    collection: FORM_RESPONSES_SLUG,
    data: {
      formName,
      userName,
      userPhone,
      userEmail,
      response,
    },
  })
}
