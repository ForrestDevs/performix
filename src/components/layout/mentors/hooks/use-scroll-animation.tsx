'use client'

import { useState, useEffect } from 'react'

export function useScrollAnimation() {
  const [visibleElements, setVisibleElements] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    const elements = document.querySelectorAll('[data-scroll-animate]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return {
    visibleElements,
    isVisible: (id: string) => visibleElements.has(id),
  }
}
