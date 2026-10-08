"use client"

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react"

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

/**
 * Left padding the content needs so the fixed sidebar (w-64) doesn't overlap it.
 * Layout-Shift nur dann, wenn die Sidebar den Content tatsächlich überlappen würde; auf sehr großen
 * Screens bleibt der Content unverändert.
 */
export function useDesktopContentOffset(contentRef: RefObject<HTMLElement | null>): number {
  const [offsetPx, setOffsetPx] = useState(0)

  useLayoutEffect(() => {
    const SIDEBAR_WIDTH_PX = 256
    const GAP_PX = 44

    const update = () => {
      // Unterhalb lg wird die Sidebar ohnehin per Mobile-Menü genutzt.
      if (window.innerWidth < DESKTOP_MIN_WIDTH) {
        setOffsetPx(0)
        return
      }

      const el = contentRef.current
      if (!el) return

      const left = el.getBoundingClientRect().left
      const needed = Math.max(0, SIDEBAR_WIDTH_PX + GAP_PX - left)

      setOffsetPx(needed < 1 ? 0 : Math.ceil(needed))
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [contentRef])

  return offsetPx
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
