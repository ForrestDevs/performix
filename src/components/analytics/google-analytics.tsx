import { gaMeasurementId, isGoogleAnalyticsEnabled } from '@/lib/analytics/google-analytics'

export function GoogleAnalytics() {
  if (!isGoogleAnalyticsEnabled) return null

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', '${gaMeasurementId}', { send_page_view: false });
          `,
        }}
        id="google-analytics-base"
      />
    </>
  )
}
