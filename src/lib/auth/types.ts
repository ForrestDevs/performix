import { getPayload } from '@/lib/utilities/getPayload'
import { betterAuthPlugins } from '@/payload/plugins/index'

type PayloadWithBetterAuth = Awaited<ReturnType<typeof getPayload>>

export type Session = PayloadWithBetterAuth['betterAuth']['$Infer']['Session']
export type User = PayloadWithBetterAuth['betterAuth']['$Infer']['Session']['user']
export type Account = Awaited<
  ReturnType<PayloadWithBetterAuth['betterAuth']['api']['listUserAccounts']>
>[number]
export type DeviceSession = Awaited<
  ReturnType<PayloadWithBetterAuth['betterAuth']['api']['listSessions']>
>[number]
export type BetterAuthPlugins = typeof betterAuthPlugins
