"use client"

import { useEffect } from "react"

/**
 * Sets <html data-hydrated> once React has hydrated the page. The content is prerendered, so buttons are
 * visible before they are interactive; the end-to-end tests wait for this marker before clicking.
 */
export function HydrationMarker() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true"
  }, [])

  return null
}
