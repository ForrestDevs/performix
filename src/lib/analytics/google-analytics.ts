const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
const shouldUsePerformixDefaultMeasurementId = process.env.NODE_ENV === 'production'

export const gaMeasurementId =
  configuredMeasurementId || (shouldUsePerformixDefaultMeasurementId ? 'G-R42W9T0B1N' : '')

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
