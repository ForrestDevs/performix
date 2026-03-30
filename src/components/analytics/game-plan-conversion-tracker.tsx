'use client'

import { useEffect } from 'react'
import { sendGoogleAnalyticsEvent } from '@/lib/analytics/google-analytics'
import { pushDataLayerEvent } from '@/lib/analytics/gtm'
import {
  gamePlanLeadEventName,
  gamePlanLeadEventParams,
  gamePlanSubmissionStorageKey,
} from '@/lib/analytics/game-plan-conversion'

export function GamePlanConversionTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const pendingSubmission = window.sessionStorage.getItem(gamePlanSubmissionStorageKey)

    if (!pendingSubmission) return

    window.sessionStorage.removeItem(gamePlanSubmissionStorageKey)

    pushDataLayerEvent({
      event: gamePlanLeadEventName,
      ...gamePlanLeadEventParams,
    })

    sendGoogleAnalyticsEvent(gamePlanLeadEventName, gamePlanLeadEventParams)
  }, [])

  return null
}
