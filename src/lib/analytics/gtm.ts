const configuredGtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim()
const shouldUsePerformixDefaultGtm = process.env.NODE_ENV === 'production'

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
