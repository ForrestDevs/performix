import { gaMeasurementId, isGoogleAnalyticsEnabled } from '@/lib/analytics/google-analytics'
import Script from 'next/script'

export function GoogleAnalytics() {
  if (!isGoogleAnalyticsEnabled) return null

  return (
    <>
      <Script id="google-analytics-base" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', '${gaMeasurementId}', { send_page_view: false });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
    </>
  )
}
