"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

const DESKTOP_MIN_WIDTH = 1024

/** True once the element (a sentinel below the hero) has scrolled out under the header. */
export function usePastHero(sentinelRef: RefObject<HTMLElement | null>): boolean {
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting)
      },
      { root: null, threshold: [0], rootMargin: "-86px 0px 0px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [sentinelRef])

  return pastHero
}

/**
 * How far the fixed sidebar has to move up so it doesn't cover the footer: the overlap of the
 * #footer-sentinel with the viewport (desktop only; on mobile the sidebar is an off-canvas menu).
 */
export function useFooterLift(): number {
  const [footerLiftPx, setFooterLiftPx] = useState(0)

  useEffect(() => {
    const sentinel = document.getElementById("footer-sentinel")
    if (!sentinel) return

    let raf = 0

    const update = () => {
      raf = 0

      // nur Desktop; auf Mobile ist es off-canvas und meist zu
      if (window.innerWidth < DESKTOP_MIN_WIDTH) {
        setFooterLiftPx(0)
        return
      }

      const vh = window.innerHeight
      const top = sentinel.getBoundingClientRect().top

      // Sobald der Footer ins Viewport kommt, wird lift > 0
      const overlap = Math.max(0, vh - top)
      const maxLift = Math.max(0, vh - 96)
      const lift = Math.min(overlap, maxLift)

      setFooterLiftPx((prev) => (Math.abs(prev - lift) < 1 ? prev : lift))
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return footerLiftPx
}

/** Prevents the page behind an open overlay (the mobile menu) from scrolling. */
export function useBodyScrollLock(locked: boolean) {
  const previousOverflowRef = useRef("")

  useEffect(() => {
    const body = document.body
    if (locked) {
      previousOverflowRef.current = body.style.overflow || ""
      body.style.overflow = "hidden"
    } else {
      body.style.overflow = previousOverflowRef.current || ""
    }
    return () => {
      body.style.overflow = previousOverflowRef.current || ""
    }
  }, [locked])
}
