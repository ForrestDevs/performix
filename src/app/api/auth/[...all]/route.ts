import { getPayload } from '@/lib/utilities/getPayload'
import { toNextJsHandler } from 'better-auth/next-js'

const payload = await getPayload()

export const { GET, POST } = toNextJsHandler(payload.betterAuth)

