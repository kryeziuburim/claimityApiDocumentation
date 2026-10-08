const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown", "mousedown"] as const

/**
 * Scrolls to the element with the given id and keeps it aligned while the page settles.
 *
 * - Waits for the element if it isn't mounted yet (e.g. the content of a tab that was just selected).
 * - Late layout changes above the target (images, web fonts, the sidebar padding that appears once the
 *   page is scrolled past the hero) would otherwise push it out of view; while the document resizes the
 *   target is re-aligned, for at most `settleMs` and only until the user scrolls themselves.
 *
 * Returns a function that cancels the pending scroll.
 */
export function scrollToAnchor(id: string, { settleMs = 2500 }: { settleMs?: number } = {}): () => void {
  let cancelled = false
  let frame = 0
  const cleanups: Array<() => void> = []

  const cancel = () => {
    cancelled = true
    cancelAnimationFrame(frame)
    cleanups.splice(0).forEach((fn) => fn())
  }

  const start = (el: HTMLElement) => {
    el.scrollIntoView({ behavior: "smooth", block: "start" })

    let initial = true
    const observer = new ResizeObserver(() => {
      // ResizeObserver reports once right away; only later size changes need a correction.
      if (initial) {
        initial = false
        return
      }
      el.scrollIntoView({ behavior: "auto", block: "start" })
    })
    observer.observe(document.body)
    USER_SCROLL_EVENTS.forEach((type) => window.addEventListener(type, cancel, { passive: true }))
    const timeout = window.setTimeout(cancel, settleMs)

    cleanups.push(
      () => observer.disconnect(),
      () => USER_SCROLL_EVENTS.forEach((type) => window.removeEventListener(type, cancel)),
      () => window.clearTimeout(timeout),
    )
  }

  let attempts = 0
  const find = () => {
    if (cancelled) return
    const el = document.getElementById(id)
    if (el) start(el)
    else if (++attempts < 60) frame = requestAnimationFrame(find)
  }
  find()

  return cancel
}
