import configPromise from '@payload-config'
import { getPayloadAuth } from 'payload-auth/better-auth'
import type { BetterAuthPlugins } from '../../payload/plugins'

export const getPayload = async () => getPayloadAuth<BetterAuthPlugins>(configPromise)
