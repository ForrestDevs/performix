const performixProductionUrls = new Set([
  'https://performix.ca',
  'https://www.performix.ca',
])

const configuredGtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim()
const configuredServerUrl = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
const productionUrlFromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : ''

const shouldUsePerformixDefaultGtm =
  performixProductionUrls.has(configuredServerUrl || '') ||
  performixProductionUrls.has(productionUrlFromVercel)

export const gtmId = configuredGtmId || (shouldUsePerformixDefaultGtm ? 'GTM-P5NJCTQB' : '')

export const isGtmEnabled = Boolean(gtmId)

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

type DataLayerValue = string | number | boolean | null | undefined

export type DataLayerEvent = {
  event: string
} & Record<string, DataLayerValue>

export function pushDataLayerEvent(event: DataLayerEvent) {
  if (!isGtmEnabled || typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
}
