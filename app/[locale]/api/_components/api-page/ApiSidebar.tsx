"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronRight } from "lucide-react"

import { METHOD_COLORS } from "@/components/api/method-colors"
import { cn } from "@/lib/utils"

import type { NavItem } from "./navigation"

export const API_SIDEBAR_ID = "api-sidebar"

type ApiSidebarProps = {
  items: NavItem[]
  childToParent: Record<string, string>
  activeId: string
  onNavigate: (id: string) => void
  /** Desktop: shown once the reader is past the hero. */
  visible: boolean
  /** Mobile: off-canvas menu state. */
  mobileOpen: boolean
  /** Moves the fixed sidebar up so it doesn't cover the footer. */
  footerLiftPx: number
}

export function ApiSidebar({
  items,
  childToParent,
  activeId,
  onNavigate,
  visible,
  mobileOpen,
  footerLiftPx,
}: ApiSidebarProps) {
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
        "fixed inset-y-0 left-0 z-30 w-full max-w-[18rem] border-r border-border bg-sidebar transition-[transform,opacity] duration-[350ms] ease-out lg:max-w-none lg:w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        visible ? "lg:translate-x-0 lg:opacity-100" : "lg:-translate-x-full lg:opacity-0",
      )}
      style={visible && footerLiftPx > 0 ? { bottom: footerLiftPx } : undefined}
    >
      <div
        ref={scrollRef}
        className="api-sidebar-scroll flex h-screen flex-col overflow-y-auto py-6 lg:h-[calc(100vh-4rem)]"
        style={footerLiftPx > 0 && visible ? { height: `calc(100vh - 4rem - ${footerLiftPx}px)` } : undefined}
      >
        <nav className="space-y-1 px-4" role="navigation" aria-label="API Navigation">
          {items.map((item) => {
            const isItemActive = activeId === item.id || !!item.children?.some((c) => c.id === activeId)
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
                    "flex w-full items-start gap-3 rounded-md px-3 py-2 text-sm font-medium leading-snug transition-colors",
                    isItemActive
                      ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  )}
                  aria-expanded={item.children ? expandedItem === item.id : undefined}
                  aria-controls={item.children ? `subnav-${item.id}` : undefined}
                  aria-current={isItemActive ? "page" : undefined}
                >
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="min-w-0 flex-1 text-left">{item.title}</span>
                  {item.children && (
                    <ChevronRight
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0 transition-transform",
                        expandedItem === item.id && "rotate-90",
                      )}
                    />
                  )}
                </button>
                {item.children && expandedItem === item.id && (
                  <div id={`subnav-${item.id}`} className="ml-3 mt-1 space-y-1 border-l border-border pl-2">
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
                            "flex w-full items-start gap-2 rounded-md px-3 py-1.5 text-[13px] leading-snug transition-colors",
                            isChildActive
                              ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                              : "text-muted-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-foreground",
                          )}
                          aria-current={isChildActive ? "page" : undefined}
                        >
                          {child.method ? (
                            <span
                              className={cn(
                                // Fixe Breite, damit GET/PUT/DEL genauso breit sind wie POST.
                                // (Die Sidebar wirkt dadurch visuell ruhiger und "aligned".)
                                "mt-[1px] inline-flex h-5 w-9 shrink-0 items-center justify-center rounded-md px-0",
                                "font-mono text-[11px] font-semibold text-white",
                              )}
                              style={{ backgroundColor: METHOD_COLORS[child.method] }}
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
