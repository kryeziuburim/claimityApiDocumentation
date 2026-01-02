"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import { Menu, X, ChevronRight, FileText, BookOpen, Bug, History, Lock, Code, Users, Shield, FileJson } from "lucide-react"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"
import { OpenApiProvider } from "@/components/api/OpenApiProvider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EndpointCard } from "@/components/api/EndpointCard"
import LocalizedLink from "@/components/localized-link"
import { ClaimPayloadSection, CLAIM_PAYLOADS } from "./ClaimPayloadSection"

// Ausgelagerte Bereichs-Komponenten (je Kapitel)
import { Section as SectionComponent } from "./Section"
import { OverviewSection as OverviewSectionComponent } from "./OverviewSection"
import { FirstStepsSection as FirstStepsSectionComponent } from "./FirstStepsSection"
import { ReportingSection as ReportingSectionComponent } from "./ReportingSection"
import { ChangeLogSection as ChangeLogSectionComponent } from "./ChangeLogSection"
import { AuthenticationSection as AuthenticationSectionComponent } from "./AuthenticationSection"
import { ApiBasicsSection as ApiBasicsSectionComponent } from "./ApiBasicsSection"
import { ExpertsSection as ExpertsSectionComponent } from "./ExpertsSection"
import { InsurerSection as InsurerSectionComponent } from "./InsurerSection"

interface NavItem {
  id: string
  title: string
  icon: React.ElementType
  children?: { id: string; title: string; method?: "GET" | "POST" | "PUT" | "DELETE" }[]
}

const navigationItems: NavItem[] = [
  { id: "overview", title: "Übersicht", icon: FileText },
  { id: "first-steps", title: "Erste Schritte", icon: BookOpen },
  { id: "reporting", title: "Problem melden", icon: Bug },
  { id: "changelog", title: "Änderungsprotokoll", icon: History },
  {
    id: "authentication",
    title: "Authentifizierung",
    icon: Lock,
    children: [
      { id: "auth-flow", title: "Authentication Flow" },
      { id: "auth-access-token", title: "OAuth 2.0 / Access Token" },
      { id: "auth-dpop", title: "DPoP / API Requests" },
    ],
  },
  {
    id: "api-basics",
    title: "API‑Grundlagen",
    icon: Code,
    children: [
      { id: "basics-request-format", title: "Request-Format" },
      { id: "basics-response-format", title: "Response-Format" },
      { id: "basics-rate-limiting", title: "Rate Limiting" },
    ],
  },
  {
    id: "experts",
    title: "Experten",
    icon: Users,
    children: [
      { id: "experts-cases-list", method: "GET", title: "Cases" },
      { id: "experts-cases-get", method: "GET", title: "Case" },
      { id: "experts-cases-comment", method: "PUT", title: "Expert comment" },
      { id: "experts-cases-docs-list", method: "GET", title: "Documents" },
      { id: "experts-cases-docs-get", method: "GET", title: "Document" },

      { id: "experts-reports-draft-create", method: "POST", title: "Report draft" },
      { id: "experts-reports-draft-update", method: "PUT", title: "Report draft" },
      { id: "experts-reports-list", method: "GET", title: "Reports" },
      { id: "experts-reports-submission-get", method: "GET", title: "Report submission" },

      { id: "experts-submission-docs-list", method: "GET", title: "Submission documents" },
      { id: "experts-submission-docs-add", method: "POST", title: "Submission document" },
      { id: "experts-submission-docs-delete", method: "DELETE", title: "Submission document" },
      { id: "experts-submission-submit", method: "POST", title: "Submission" },
    ],
  },
  {
    id: "insurer",
    title: "Versicherer",
    icon: Shield,
    children: [
      { id: "insurer-claims-list", method: "GET", title: "Claims" },
      { id: "insurer-claims-create", method: "POST", title: "Claim" },
      { id: "insurer-claims-validate", method: "POST", title: "Claims validation" },
      { id: "insurer-claims-get", method: "GET", title: "Claim" },

      { id: "insurer-claim-docs-list", method: "GET", title: "Documents" },
      { id: "insurer-claim-docs-add", method: "POST", title: "Document" },
      { id: "insurer-claim-docs-get", method: "GET", title: "Document" },

      { id: "insurer-claim-reports-list", method: "GET", title: "Reports" },
      { id: "insurer-claim-report-docs-list", method: "GET", title: "Report documents" },
    ],
  },
  {
    id: "payloads",
    title: "Fall-Struktur",
    icon: FileJson,
    children: [
      ...CLAIM_PAYLOADS.map((payload) => ({ id: payload.anchorId, title: payload.navTitle })),
      { id: "claim-payload-validation", title: "Payload validieren" },
    ],
  },
]

export default function ApiPageClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // UX: Es soll immer nur genau 1 "Accordion"-Parent gleichzeitig offen sein.
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [footerInView, setFooterInView] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const heroSentinelRef = useRef<HTMLDivElement | null>(null)
  const sidebarScrollRef = useRef<HTMLDivElement | null>(null)
  const contentWrapperRef = useRef<HTMLDivElement | null>(null)
  const [desktopContentOffsetPx, setDesktopContentOffsetPx] = useState(0)
  const payloadKeyByAnchor = useMemo(() => {
    const map: Record<string, string> = {}
    CLAIM_PAYLOADS.forEach((payload) => {
      map[payload.anchorId] = payload.key
    })
    return map
  }, [])
  const payloadAnchorByKey = useMemo(() => {
    const map: Record<string, string> = {}
    CLAIM_PAYLOADS.forEach((payload) => {
      map[payload.key] = payload.anchorId
    })
    return map
  }, [])
  const [activePayloadKey, setActivePayloadKey] = useState<string>(CLAIM_PAYLOADS[0]?.key ?? "")
  const activePayloadKeyRef = useRef(activePayloadKey)
  useEffect(() => {
    activePayloadKeyRef.current = activePayloadKey
  }, [activePayloadKey])

  const [footerLiftPx, setFooterLiftPx] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const sentinel = document.getElementById("footer-sentinel")
    if (!sentinel) return

    let raf = 0

    const update = () => {
      raf = 0

      // nur Desktop; auf Mobile ist es off-canvas und meist zu
      if (window.innerWidth < 1024) {
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

  // Layout-Shift nur dann, wenn die Sidebar (w-64) den Content tatsächlich überlappen würde.
  // Auf sehr großen Screens bleibt der Content unverändert.
  useLayoutEffect(() => {
    const SIDEBAR_WIDTH_PX = 256
    const GAP_PX = 44

    const update = () => {
      if (typeof window === "undefined") return

      // Unterhalb lg wird die Sidebar ohnehin per Mobile-Menü genutzt.
      if (window.innerWidth < 1024) {
        setDesktopContentOffsetPx(0)
        return
      }

      const el = contentWrapperRef.current
      if (!el) return

      const left = el.getBoundingClientRect().left
      const required = SIDEBAR_WIDTH_PX + GAP_PX
      const needed = Math.max(0, required - left)

      setDesktopContentOffsetPx(needed < 1 ? 0 : Math.ceil(needed))
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const toggleExpanded = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id))
  }

  const childToParent = useMemo(() => {
    const map: Record<string, string> = {}
    navigationItems.forEach((i) => {
      i.children?.forEach((c) => {
        map[c.id] = i.id
      })
    })
    return map
  }, [])

  // Scroll + Active section highlighting (IntersectionObserver)
  const [activeId, setActiveId] = useState<string>("overview")

  // Sidebar soll erst ab dem ersten Inhaltsbereich (unterhalb der Hero) einblenden.
  useEffect(() => {
    const el = heroSentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting)
      },
      { root: null, threshold: [0], rootMargin: "-86px 0px 0px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleNavigate = useCallback(
    (id: string) => {
      const payloadKey = payloadKeyByAnchor[id]
      if (payloadKey) {
        setActivePayloadKey((prev) => (prev === payloadKey ? prev : payloadKey))
      }
      if (typeof window !== "undefined") {
        try { history.pushState(null, "", `#${id}`) } catch {}
      }
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      setActiveId(id)
      setIsMobileMenuOpen(false)
    },
    [payloadKeyByAnchor]
  )

  useEffect(() => {
    const payloadKey = payloadKeyByAnchor[activeId]
    if (payloadKey && payloadKey !== activePayloadKey) {
      setActivePayloadKey(payloadKey)
    }
  }, [activeId, activePayloadKey, payloadKeyByAnchor])

  const handlePayloadTabChange = useCallback(
    (key: string) => {
      setActivePayloadKey((prev) => (prev === key ? prev : key))
      const anchor = payloadAnchorByKey[key]
      if (anchor) {
        setActiveId(anchor)
      }
    },
    [payloadAnchorByKey]
  )

  useEffect(() => {
    if (!activePayloadKey) return
    const anchor = payloadAnchorByKey[activePayloadKey]
    if (!anchor) return
    const isPayloadContext = activeId === "payloads" || payloadKeyByAnchor[activeId]
    if (isPayloadContext && activeId !== anchor) {
      setActiveId(anchor)
    }
  }, [activeId, activePayloadKey, payloadAnchorByKey, payloadKeyByAnchor])

  useEffect(() => {
    const ids = [
      ...navigationItems.map((i) => i.id),
      ...navigationItems.flatMap((i) => (i.children ? i.children.map((c) => c.id) : [])),
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        // Wichtig: Parent-Sections (große Container) sind meist länger sichtbar als die kleinen Anchor-Divs.
        // Damit Sub-Nav-Items beim Scrollen korrekt "aktiv" werden, bevorzugen wir Child-Anker gegenüber Parent-Sections.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            e,
            id: (e.target as HTMLElement).id,
            isChildAnchor: !!childToParent[(e.target as HTMLElement).id],
          }))
          .sort((a, b) => {
            // Child-Anker gewinnen immer
            if (a.isChildAnchor !== b.isChildAnchor) return a.isChildAnchor ? -1 : 1
            // sonst nach Sichtbarkeitsanteil
            return b.e.intersectionRatio - a.e.intersectionRatio
          })[0]

        if (visible?.id) {
          let nextId = visible.id
          if (nextId === "payloads") {
            const payloadKey = activePayloadKeyRef.current
            const payloadAnchor = payloadKey ? payloadAnchorByKey[payloadKey] : undefined
            if (payloadAnchor) {
              nextId = payloadAnchor
            }
          }
          setActiveId(nextId)
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    const elements: Element[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
        elements.push(el)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Bei initialer URL mit Hash dorthin scrollen (nach Mount)
  useEffect(() => {
    if (typeof window === "undefined") return
    const hash = window.location.hash.replace(/^#/, "")
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 0)
    }
  }, [])
  
  // Auto-Expand: Wenn Parent- oder Child-Anker aktiv wird, Parent offen halten
  useEffect(() => {
    if (!activeId) return
    // Parent mit Kindern aktiv -> expandieren
    const isParent = navigationItems.some((i) => i.id === activeId && i.children)
    if (isParent) {
      setExpandedItem(activeId)
    }
    // Child aktiv -> zugehörigen Parent expandieren
    const parent = childToParent[activeId]
    if (parent) {
      setExpandedItem(parent)
    }
  }, [activeId, childToParent])

  // Auto-Scroll: aktives Sidebar-Element (auch weiter unten) automatisch in den sichtbaren Bereich holen
  useEffect(() => {
    const container = sidebarScrollRef.current
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
        container.scrollTop -= (cRect.top + padding) - eRect.top
      }
    })

    return () => cancelAnimationFrame(raf)
  }, [activeId, expandedItem])

  // URL-Hash anhand aktivem Abschnitt aktualisieren (beim Scrollen)
  // Wichtig: NICHT direkt beim initialen Page-Load den Hash setzen, sonst springt der Browser
  // sofort zum ersten Section-Anchor (und die Hero ist weg).
  useEffect(() => {
    if (!activeId) return
    if (typeof window === "undefined") return

    const hasInitialHash = window.location.hash.length > 1
    // Hash erst synchronisieren, wenn der User wirklich in den Content scrollt
    // oder wenn die Seite mit Hash geöffnet wurde (Deep-Link).
    if (!pastHero && !hasInitialHash) return

    const current = window.location.hash.replace(/^#/, "")
    if (current !== activeId) {
      try { history.replaceState(null, "", `#${activeId}`) } catch {}
    }
  }, [activeId, pastHero])
  
  // Footer-Sentinel IntersectionObserver (10% Sichtbarkeit)
  useEffect(() => {
    const sentinel = document.getElementById("footer-sentinel")
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting && entry.intersectionRatio > 0)
      },
      { root: null, threshold: [0, 0.1] }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const effectiveActive = childToParent[activeId] ?? activeId
  // Sidebar-Einblendung ab dem ersten Bereich ("Übersicht") und alle nachfolgenden Kapitel.
  const revealFrom = new Set([
    "overview",
    "first-steps",
    "reporting",
    "changelog",
    "authentication",
    "api-basics",
    "experts",
    "insurer",
    "payloads",
  ])
  const showSidebar = pastHero && revealFrom.has(effectiveActive)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="flex">
        {/* Seiten-Navigation */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 border-r border-border bg-sidebar transition-[transform,opacity] duration-[400ms] ease-out",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
            showSidebar ? "lg:translate-x-0 lg:opacity-100" : "lg:-translate-x-full lg:opacity-0"
          )}
          style={
            showSidebar && footerLiftPx > 0
              ? { bottom: footerLiftPx }
              : undefined
          }
        >
          <div
            ref={sidebarScrollRef}
            className="api-sidebar-scroll h-[calc(100vh-4rem)] overflow-y-auto py-6"
            style={footerLiftPx > 0 ? { height: `calc(100vh - 4rem - ${footerLiftPx}px)` } : undefined}
          >
            <div className="mb-2 flex items-center justify-between px-3 lg:hidden">
              <span className="text-sm font-medium">Navigation</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center rounded-md border border-slate-200 bg-white/90 px-2 py-1 text-xs text-gray-900 shadow-sm hover:bg-white"
              >
                <X className="mr-1 h-4 w-4" /> Schliessen
              </button>
            </div>
            <nav className="space-y-1 px-3" role="navigation" aria-label="API Navigation">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  <button
                    data-nav-id={item.id}
                    onClick={() => {
                      if (item.children) {
                        toggleExpanded(item.id)
                      } else {
                        handleNavigate(item.id)
                      }
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-md px-3 py-2 text-sm font-medium leading-snug transition-colors",
                      activeId === item.id || (item.children && item.children.some((c) => c.id === activeId))
                        ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    )}
                    aria-expanded={item.children ? expandedItem === item.id : undefined}
                    aria-controls={item.children ? `subnav-${item.id}` : undefined}
                    aria-current={
                      activeId === item.id || (item.children && item.children.some((c) => c.id === activeId)) ? "page" : undefined
                    }
                  >
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="min-w-0 flex-1 text-left">{item.title}</span>
                    {item.children && (
                      <ChevronRight
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0 transition-transform",
                          expandedItem === item.id && "rotate-90"
                        )}
                      />
                    )}
                  </button>
                  {item.children && expandedItem === item.id && (
                    <div id={`subnav-${item.id}`} className="ml-3 mt-1 space-y-1 border-l border-border pl-2">
                      {item.children.map((child) => (
                        (() => {
                          const METHOD_COLORS: Record<NonNullable<typeof child.method>, string> = {
                            GET: "#61AFFE",
                            POST: "#49CC90",
                            PUT: "#FCA130",
                            DELETE: "#F93E3E",
                          }

                          const methodLabel = child.method === "DELETE" ? "DEL" : child.method
                          const isChildActive = activeId === child.id

                          return (
                        <button
                          key={child.id}
                          data-nav-id={child.id}
                          onClick={() => {
                            handleNavigate(child.id)
                          }}
                          className={cn(
                            "flex w-full items-start gap-2 rounded-md px-3 py-1.5 text-[13px] leading-snug transition-colors",
                            isChildActive
                              ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                              : "text-muted-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-foreground",
                          )}
                          aria-current={activeId === child.id ? "page" : undefined}
                        >
                           {child.method ? (
                             <span
                               className={cn(
                                 // Fixe Breite, damit GET/PUT/DEL genauso breit sind wie POST.
                                 // (Die Sidebar wirkt dadurch visuell ruhiger und "aligned".)
                                 "mt-[1px] inline-flex h-5 w-9 shrink-0 items-center justify-center rounded-md px-0",
                                 "font-mono text-[11px] font-semibold text-white"
                               )}
                               style={{ backgroundColor: METHOD_COLORS[child.method] }}
                             >
                               {methodLabel}
                             </span>
                          ) : null}
                          <span className="min-w-0 flex-1 text-left">{child.title}</span>
                        </button>
                          )
                        })()
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Hauptinhalt */}
        <main className="flex-1">
          <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-[-12rem] -z-10 transform-gpu overflow-hidden blur-3xl">
              <div className="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-teal-500/20 via-cyan-400/15 to-sky-500/15" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
              <div className="absolute right-6 top-6 z-10">
                <LanguageSwitcher />
              </div>
              <div className="absolute left-6 top-6 z-10 lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen((v) => !v)}
                  className="inline-flex items-center rounded-md bg-white/90 px-3 py-1 text-sm text-gray-900 hover:bg-white"
                >
                  <Menu className="mr-2 h-4 w-4" />
                  Menü
                </button>
              </div>

              {/* Hero */}
              <div className="w-full">
                <p className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 ring-1 ring-teal-100">
                  Claimity API
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                  API Dokumentation
                </h1>
                <p className="mt-4 text-sm text-gray-600 md:text-base">
                  Technische Referenz und Leitfäden für die Integration mit Claimity.
                </p>
              </div>

              {/* Sentinel: Sobald dieser beim Scrollen aus dem Viewport ist, gilt die Hero als "vorbei" */}
              <div ref={heroSentinelRef} className="h-px w-full" aria-hidden="true" />

              <div
                ref={contentWrapperRef}
                className="mt-8 w-full transition-[padding] duration-300 ease-out md:mt-10"
                style={showSidebar && desktopContentOffsetPx ? { paddingLeft: desktopContentOffsetPx } : undefined}
              >
                <SectionComponent id="overview"><OverviewSectionComponent /></SectionComponent>
                <SectionComponent id="first-steps"><FirstStepsSectionComponent /></SectionComponent>
                <SectionComponent id="reporting"><ReportingSectionComponent /></SectionComponent>
                <SectionComponent id="changelog"><ChangeLogSectionComponent /></SectionComponent>
                <SectionComponent id="authentication"><AuthenticationSectionComponent /></SectionComponent>
                <SectionComponent id="api-basics"><ApiBasicsSectionComponent /></SectionComponent>
                <OpenApiProvider url="/assets/openapi.json">
                  <SectionComponent id="experts"><ExpertsSectionComponent /></SectionComponent>
                  <SectionComponent id="insurer"><InsurerSectionComponent /></SectionComponent>
                  <SectionComponent id="payloads">
                    <ClaimPayloadSection
                      activePayloadKey={activePayloadKey}
                      onActivePayloadChange={handlePayloadTabChange}
                    />
                  </SectionComponent>
                </OpenApiProvider>
              </div>
            </div>
          </section>
          <div id="footer-sentinel" className="h-px" aria-hidden="true" />
          <div className="relative z-40 bg-[#1a1f2e]">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  )
}
