'use client'

import { sendGoogleAnalyticsEvent } from '@/lib/analytics/google-analytics'
import { pushDataLayerEvent, isGtmEnabled } from '@/lib/analytics/gtm'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

function normalizeValue(value: string | null | undefined, maxLength = 120) {
  if (!value) return undefined

  const normalized = value.replace(/\s+/g, ' ').trim()

  if (!normalized) return undefined

  return normalized.slice(0, maxLength)
}

function getElementText(element: Element) {
  return normalizeValue(
    element.getAttribute('data-gtm-label') ||
      element.getAttribute('aria-label') ||
      element.getAttribute('title') ||
      element.textContent,
  )
}

function getClickSection(element: Element) {
  const section =
    element.closest('[data-gtm-section]') ||
    element.closest('section[id]') ||
    element.closest('header, main, footer')

  if (!section) return undefined

  return normalizeValue(
    section.getAttribute('data-gtm-section') ||
      section.getAttribute('aria-label') ||
      section.getAttribute('id') ||
      section.tagName.toLowerCase(),
  )
}

function getClickTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return null

  if (target.closest('[data-gtm-ignore]')) return null

  return target.closest('button, a, [role="button"], [data-gtm-track]')
}

function getAnchor(target: Element) {
  if (target instanceof HTMLAnchorElement) return target
  return target.closest('a')
}

export function GTMEventTracker() {
  const pathname = usePathname()
  const lastPageRef = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname || pathname.startsWith('/student')) return

    const pagePath = `${pathname}${window.location.search}`

    if (lastPageRef.current === pagePath) return

    lastPageRef.current = pagePath

    const pageViewPayload = {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: document.title,
    }

    pushDataLayerEvent({
      event: 'virtual_page_view',
      ...pageViewPayload,
    })

    sendGoogleAnalyticsEvent('page_view', pageViewPayload)
  }, [pathname])

  useEffect(() => {
    if (!isGtmEnabled && typeof window === 'undefined') return

    const handleClick = (event: MouseEvent) => {
      if (window.location.pathname.startsWith('/student')) return

      const target = getClickTarget(event.target)

      if (!target) return

      const anchor = getAnchor(target)
      const clickText = getElementText(target)
      const clickHref = normalizeValue(anchor?.href, 300)

      if (!clickText && !clickHref) return

      const clickPayload = {
        click_text: clickText,
        click_url: clickHref,
        click_id: normalizeValue(target.id, 80),
        click_classes:
          typeof target.className === 'string' ? normalizeValue(target.className, 200) : undefined,
        click_section: getClickSection(target),
        click_target: target.tagName.toLowerCase(),
        page_path: `${window.location.pathname}${window.location.search}`,
      }

      pushDataLayerEvent({
        event: 'site_click',
        ...clickPayload,
      })

      sendGoogleAnalyticsEvent('site_click', clickPayload)
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  return null
}
