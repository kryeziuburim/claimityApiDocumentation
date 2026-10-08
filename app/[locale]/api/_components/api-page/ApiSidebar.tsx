"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronRight } from "lucide-react"

import { methodBadgeStyle } from "@/components/api/method-colors"
import { cn } from "@/lib/utils"

import type { NavItem } from "./navigation"

export const API_SIDEBAR_ID = "api-sidebar"

type ApiSidebarProps = {
  items: NavItem[]
  childToParent: Record<string, string>
  activeId: string
  onNavigate: (id: string) => void
  /** Mobile: off-canvas menu state. On desktop the sidebar is always shown. */
  mobileOpen: boolean
  /** Moves the fixed sidebar up so it doesn't cover the footer. */
  footerLiftPx: number
}

export function ApiSidebar({ items, childToParent, activeId, onNavigate, mobileOpen, footerLiftPx }: ApiSidebarProps) {
  // UX: Es soll immer nur genau 1 "Accordion"-Parent gleichzeitig offen sein.
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id))
  }

  // Auto-Expand: Wenn Parent- oder Child-Anker aktiv wird, Parent offen halten.
  // State is adjusted during render when activeId changes (instead of in an effect), so the sidebar
  // doesn't render once with the stale accordion first. The user can still collapse it manually.
  const [expandedForActiveId, setExpandedForActiveId] = useState(activeId)
  if (activeId !== expandedForActiveId) {
    setExpandedForActiveId(activeId)
    const isParent = items.some((i) => i.id === activeId && i.children)
    const toExpand = isParent ? activeId : childToParent[activeId]
    if (toExpand) setExpandedItem(toExpand)
  }

  // Auto-Scroll: aktives Sidebar-Element (auch weiter unten) automatisch in den sichtbaren Bereich holen
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // Warten bis Accordion (expandedItem) gerendert ist, damit Child-Button existiert.
    const raf = requestAnimationFrame(() => {
      const el = container.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`)
      if (!el) return

      const padding = 12
      const cRect = container.getBoundingClientRect()
      const eRect = el.getBoundingClientRect()

      if (eRect.bottom > cRect.bottom - padding) {
        container.scrollTop += eRect.bottom - (cRect.bottom - padding)
      } else if (eRect.top < cRect.top + padding) {
        container.scrollTop -= cRect.top + padding - eRect.top
      }
    })

    return () => cancelAnimationFrame(raf)
  }, [activeId, expandedItem])

  return (
    <aside
      id={API_SIDEBAR_ID}
      className={cn(
        "fixed bottom-0 left-0 top-0 z-50 flex w-full max-w-[18rem] flex-col border-r border-border bg-sidebar transition-transform duration-300 ease-out lg:top-16 lg:z-30 lg:w-64 lg:max-w-none lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
      )}
      style={footerLiftPx > 0 ? { bottom: footerLiftPx } : undefined}
    >
      <div ref={scrollRef} className="api-sidebar-scroll min-h-0 flex-1 overflow-y-auto py-5">
        <nav className="space-y-0.5 px-3" role="navigation" aria-label="API Navigation">
          {items.map((item) => {
            const isItemActive = activeId === item.id || !!item.children?.some((c) => c.id === activeId)
            // A chapter without children is highlighted like an entry; one with children only gets bold,
            // its active child carries the highlight.
            const isLeafActive = isItemActive && !item.children
            return (
              <div key={item.id}>
                <button
                  data-nav-id={item.id}
                  onClick={() => {
                    if (item.children) {
                      toggleExpanded(item.id)
                    } else {
                      onNavigate(item.id)
                    }
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md px-3 py-2 text-sm leading-snug transition-colors",
                    isLeafActive
                      ? "bg-teal-50 font-semibold text-teal-900"
                      : isItemActive
                        ? "font-semibold text-sidebar-foreground hover:bg-sidebar-accent"
                        : "font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                  aria-expanded={item.children ? expandedItem === item.id : undefined}
                  aria-controls={item.children ? `subnav-${item.id}` : undefined}
                  aria-current={isItemActive ? "page" : undefined}
                >
                  <item.icon className={cn("mt-0.5 h-4 w-4 shrink-0", isItemActive && "text-primary")} />
                  <span className="min-w-0 flex-1 text-left">{item.title}</span>
                  {item.children && (
                    <ChevronRight
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0 opacity-60 transition-transform",
                        expandedItem === item.id && "rotate-90",
                      )}
                    />
                  )}
                </button>
                {item.children && expandedItem === item.id && (
                  <div id={`subnav-${item.id}`} className="mb-2 ml-5 mt-0.5 border-l border-border">
                    {item.children.map((child) => {
                      const methodLabel = child.method === "DELETE" ? "DEL" : child.method
                      const isChildActive = activeId === child.id

                      return (
                        <button
                          key={child.id}
                          data-nav-id={child.id}
                          onClick={() => {
                            onNavigate(child.id)
                          }}
                          className={cn(
                            "-ml-px flex w-full items-start gap-2 border-l-2 py-1.5 pl-3 pr-2 text-[13px] leading-snug transition-colors",
                            isChildActive
                              ? "border-brand font-medium text-teal-900"
                              : "border-transparent text-muted-foreground hover:border-border hover:text-sidebar-foreground",
                          )}
                          aria-current={isChildActive ? "page" : undefined}
                        >
                          {child.method ? (
                            <span
                              className={cn(
                                // Fixe Breite, damit GET/PUT/DEL genauso breit sind wie POST.
                                // (Die Sidebar wirkt dadurch visuell ruhiger und "aligned".)
                                "mt-px inline-flex h-[18px] w-9 shrink-0 items-center justify-center rounded border",
                                "font-mono text-[10px] font-semibold",
                              )}
                              style={methodBadgeStyle(child.method)}
                            >
                              {methodLabel}
                            </span>
                          ) : null}
                          <span className="min-w-0 flex-1 text-left">{child.title}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
