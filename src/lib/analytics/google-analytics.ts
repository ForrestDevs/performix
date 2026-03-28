const performixProductionUrls = new Set([
  'https://performix.ca',
  'https://www.performix.ca',
])

const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
const configuredServerUrl = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
const productionUrlFromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : ''

const shouldUsePerformixDefaultMeasurementId =
  performixProductionUrls.has(configuredServerUrl || '') ||
  performixProductionUrls.has(productionUrlFromVercel)

export const gaMeasurementId =
  configuredMeasurementId || (shouldUsePerformixDefaultMeasurementId ? 'G-EKN358HVQ2' : '')

export const isGoogleAnalyticsEnabled = Boolean(gaMeasurementId)

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type AnalyticsValue = string | number | boolean | null | undefined

export function sendGoogleAnalyticsEvent(
  eventName: string,
  params: Record<string, AnalyticsValue> = {},
) {
  if (!isGoogleAnalyticsEnabled || typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, params)
}
