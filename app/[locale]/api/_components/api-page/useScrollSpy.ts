"use client"

import { useEffect, useState } from "react"

import { pickActiveSection } from "../scroll-spy"
import type { NavItem } from "./navigation"

type ScrollSpyOptions = {
  items: NavItem[]
  childToParent: Record<string, string>
  /** The payload chapter only mounts its active tab; "payloads" is reported as that tab's anchor. */
  payloadAnchorByKey: Record<string, string>
  activePayloadKey: string
  /** The URL hash is only synced once the user has scrolled into the content (or opened a deep link). */
  pastHero: boolean
}

/**
 * The section currently being read, for highlighting the sidebar, mirrored into the URL hash.
 * Returns the setter as well so explicit navigation can set it immediately.
 */
export function useScrollSpy({ items, childToParent, payloadAnchorByKey, activePayloadKey, pastHero }: ScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string>("overview")

  // Re-created when the payload tab changes: only the active tab's section is mounted,
  // so the newly shown anchor has to be observed.
  useEffect(() => {
    const ids = [...items.map((i) => i.id), ...items.flatMap((i) => (i.children ? i.children.map((c) => c.id) : []))]
    // The observer only reports elements whose visibility changed, so keep the full set of visible ones.
    const visible = new Map<string, Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          if (entry.isIntersecting) visible.set(id, entry.target)
          else visible.delete(id)
        }
        const next = pickActiveSection(
          [...visible].map(([id, el]) => ({ id, top: el.getBoundingClientRect().top, isChildAnchor: id in childToParent }))
        )
        if (!next) return
        setActiveId(next === "payloads" ? (payloadAnchorByKey[activePayloadKey] ?? next) : next)
      },
      {
        root: null,
        // The band starts just above where scrollIntoView puts a section (scroll-mt-24 = 96px), so the
        // section navigated to is inside it rather than the one below it.
        rootMargin: "-90px 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [items, childToParent, payloadAnchorByKey, activePayloadKey])

  // URL-Hash anhand aktivem Abschnitt aktualisieren (beim Scrollen).
  // Only once the reader is past the hero: on load activeId is still the initial "overview", and
  // writing it would replace a deep-link hash before the page has scrolled there (and without a
  // hash it would make the browser jump to the first section, hiding the hero).
  useEffect(() => {
    if (!activeId || !pastHero) return

    const current = window.location.hash.replace(/^#/, "")
    if (current !== activeId) {
      try {
        history.replaceState(null, "", `#${activeId}`)
      } catch {}
    }
  }, [activeId, pastHero])

  return [activeId, setActiveId] as const
}
