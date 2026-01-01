"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import { Menu, X, ChevronRight, FileText, BookOpen, Bug, History, Lock, Code, Users, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"
import { OpenApiProvider } from "@/components/api/OpenApiProvider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EndpointCard } from "@/components/api/EndpointCard"
import LocalizedLink from "@/components/localized-link"

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

  const handleNavigate = useCallback((id: string) => {
    if (typeof window !== "undefined") {
      try { history.pushState(null, "", `#${id}`) } catch {}
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMobileMenuOpen(false)
  }, [])

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

        if (visible?.id) setActiveId(visible.id)
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
  ])
  const showSidebar = pastHero && revealFrom.has(effectiveActive) && !footerInView

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="flex">
        {/* Seiten-Navigation */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 border-r border-border bg-sidebar transition-all duration-[400ms] ease-out",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
            showSidebar ? "lg:translate-x-0 lg:opacity-100" : "lg:-translate-x-full lg:opacity-0"
          )}
        >
          <div ref={sidebarScrollRef} className="api-sidebar-scroll h-[calc(100vh-4rem)] overflow-y-auto py-6">
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
                </OpenApiProvider>
              </div>
            </div>
          </section>
          <div id="footer-sentinel" className="h-px" aria-hidden="true" />
          <Footer />
        </main>
      </div>
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Übersicht</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Die API nutzt HTTPS-Methoden und RESTful Endpoints, um Ressourcen im System zu erstellen, zu bearbeiten und zu
          verwalten. Als Austauschformat dient JSON.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-3 text-xl font-semibold">Erste Schritte</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          Diese API bietet umfassenden Zugriff auf zentrale Funktionen. Ob Integrationen, Automatisierung oder eigene
          Anwendungen – die API liefert Flexibilität für die Anbindung von Claimity an Ihre Systeme.
        </p>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-xl font-semibold text-white">Erweiterung der Schnittstellen</h3>
        <ul className="space-y-2 text-white">
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Prüfen Sie regelmässig das Änderungsprotokoll um auf dem Laufenden zu bleiben.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Nicht abwärtsinkompatible Änderungen können eingeführt werden, ohne die API-Version zu ändern.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Über wesentliche Änderungen werden Sie rechtzeitig informiert.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function FirstStepsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Erste Schritte</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">So starten Sie mit der API:</p>
      </div>

      <div className="space-y-4">
        {[
          {
            step: "1",
            title: "Schlüsselpaar erstellen",
            description:
              "Als Organisationsadmin können Sie in den Organisationseinstellungen Ihres Claimity Kontos ein Schlüsselpaar erstellen. Laden Sie darauffolgend den Private Key herunter und bewahren Sie diesen sicher auf.",
          },
          {
            step: "2",
            title: "Authentifizieren",
            description:
              "Mit Hilfe des erstellten Schlüsselpaars und Ihrer Client‑ID können Sie sich gegenüber der Claimity API authentifizieren und so einen Access Token für Ihre Requests erhalten.",
          },
          {
            step: "3",
            title: "DPoP-Header vorbereiten",
            description: "Zum Senden einer Anfrage an die API ist es notwendig, einen DPoP-Header zu erstellen. Dieser Header wird mit dem Private Key signiert und sichert die Anfrage gegen potentiellen Sichereheitsrisiken.",
          },
          {
            step: "4",
            title: "Erste Anfrage",
            description: "Senden Sie mit Ihrem Access Token und dem DPoP-Header eine authentifizierte Anfrage an einen Endpoint.",
          },
        ].map((item) => (
          <div key={item.step} className="flex gap-4 rounded-lg border border-border bg-card p-5">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
              style={{ backgroundColor: "#2a8289" }}
            >
              {item.step}
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-balance">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Beispiel‑Request</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">{`curl -X GET \\
  https://app.claimity.ch/v1/experts/cases \\
  -H 'Accept: application/json' \\
  -H 'Authorization: DPoP {access-token}' \\
  -H 'DPoP: {dpop-header}`}</code>
        </pre>
        <h3 className="mt-8 mb-3 font-mono text-sm font-semibold">Python Notebooks</h3>
        <p className="mb-4 text-sm leading-relaxed text-pretty">
          Für den schnellen Einstieg stellen wir Ihnen Python‑Notebooks zur Verfügung, mit denen Sie API‑Abfragen ausführen und die Responses direkt
          einsehen können.
        </p>
        <a
          href="https://github.com/Claimity-AG/v1-api"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            "h-9 px-4 py-2",
            "bg-teal-600 text-white hover:bg-teal-700"
          )}
        >
          Notebooks auf GitHub ansehen
        </a>
      </div>
    </div>
  )
}

function ReportingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Problem melden</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Wenn Sie auf einen Fehler gestossen sind, helfen wir weiter. Stellen Sie vorab sicher, dass das Problem
          reproduzierbar ist.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Vor dem Melden</h3>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Reproduzierbarkeit prüfen</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">API‑Tests mit Postman/Insomnia durchführen</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Details zu Request und Response sammeln</span>
          </li>
          <li className="flex gap-3">
            <span className="text-destructive">✗</span>
            <span className="text-pretty">Keine Zugangsdaten im Report mitschicken</span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-lg font-semibold text-white">Report einreichen</h3>
        <p className="mb-4 text-sm leading-relaxed text-white text-pretty">
          Bitte beschreiben Sie Schritte zur Reproduktion. Unser Support prüft den Fall zeitnah und meldet sich schnellstmöglich bei Ihnen.
        </p>
        <LocalizedLink
          href="/support"
          className={cn(
            // Button-Basestyles aus components/simple-button.tsx für Link-Nutzung
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            "h-9 px-4 py-2",
            "bg-white text-black hover:bg-white/90"
          )}
        >
          Problem melden
        </LocalizedLink>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          <strong className="text-foreground">Hinweis:</strong> Die API wird auf Basis dieser Dokumentation bereitgestellt.
          Es gibt keine geführte Implementierung oder Code‑Support.
        </p>
      </div>
    </div>
  )
}

function ChangeLogSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Änderungsprotokoll</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Alle Änderungen und Updates der aktuellen API‑Version im Überblick.
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            date: "2025-12-30",
            changes: "Ergänzung eines neuen Endpunkts zur Versicherer-API zum Validieren der Fallstruktur.",
          },
          {
            date: "2025-12-28",
            changes: "Erste API‑Version veröffentlicht.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex gap-6 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="shrink-0">
              <div className="rounded-md bg-muted px-3 py-1.5 font-mono text-sm font-medium">{item.date}</div>
            </div>
            <div className="flex-1">
              <p className="leading-relaxed text-pretty">{item.changes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Section = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <section
    id={id}
    className={cn(
      "scroll-mt-24",
      // Reduzierter vertikaler Abstand zwischen den Abschnitten
      id === "overview" ? "pt-8 pb-12 md:pt-10 md:pb-16" : "py-12 md:py-16",
    )}
  >
    {children}
  </section>
)

function AuthenticationSection() {
  const CodeBlock = ({ title, children }: { title: string; children: string }) => (
    <div className="rounded-lg border border-border bg-muted/20">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="text-xs font-medium text-muted-foreground">{title}</div>
      </div>
      <pre className="overflow-x-auto p-3 text-xs">
        <code className="font-mono text-foreground">{children}</code>
      </pre>
    </div>
  )

  const KvpTable = ({ rows }: { rows: { k: string; v: React.ReactNode }[] }) => (
    <div className="overflow-x-auto rounded-lg border border-border bg-muted/20">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className="border-t border-border/60 first:border-t-0 align-top">
              <td className="w-56 px-3 py-2 font-mono text-xs text-muted-foreground">{r.k}</td>
              <td className="px-3 py-2 text-sm">{r.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Authentifizierung</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Die Claimity Partner API nutzt <strong>OAuth 2.0 Client Credentials</strong> mit <strong>JWT Client Assertion (RS256) </strong>
          und sichert jede Anfrage zusätzlich mit <strong>DPoP Proof-of-Possession (ES256)</strong>.
          Dadurch ist der Access Token an die konkrete Anfrage gebunden.
        </p>
      </div>

      {/* Auth Flow (Sequence) */}
      <div id="auth-flow" className="rounded-lg border border-border bg-card p-6 space-y-4 scroll-mt-24">
        <h3 className="text-xl font-semibold">Authentication Flow</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          So funktioniert der OAuth2 Client-Credentials Flow.
        </p>

        <div className="grid gap-6 md:grid-cols-[440px_1fr] md:items-start">
          <div className="overflow-hidden rounded-lg bg-background">
            <Image
              src="/assets/Auth_Sqeuence.png"
              alt="Authentication Flow Sequenzdiagramm (OAuth2 Client Credentials + DPoP)"
              width={1200}
              height={675}
              className="h-auto w-full rounded-md"
              sizes="(min-width: 1024px) 440px, 100vw"
              priority
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Ablauf</h4>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Key Pair</strong>: Organisation erstellt RSA Key Pair in Claimity (Private Key wird sicher gespeichert).
              </li>
              <li>
                <strong className="text-foreground">JWT Client Assertion</strong>: Client erzeugt ein kurzlebiges JWT (RS256).
              </li>
              <li>
                <strong className="text-foreground">Token Request</strong>: Client sendet <span className="font-mono">POST /v1/oauth/token</span> (Client-Credentials + Assertion).
              </li>
              <li>
                <strong className="text-foreground">Validierung</strong>: Auth-Server prüft Signatur der Assertion und die Berechtigungen und liefert Token-Response.
              </li>
              <li>
                <strong className="text-foreground">Abfrage-URL</strong>: Der Client erstellt die Abfrage-URL (inkl. Query-Parameter).
              </li>
              <li>
                <strong className="text-foreground">DPoP Proof</strong>: Client erstellt pro Request ein DPoP-JWT (ES256) gebunden an Methode + URL.
              </li>
              <li>
                <strong className="text-foreground">API Call</strong>: Client ruft Endpunkt auf mit <span className="font-mono">Authorization: DPoP </span><span className="font-mono">access_token</span> und <span className="font-mono">DPoP: …</span>.
              </li>
              <li>
                <strong className="text-foreground">Response</strong>: API prüft Token/DPoP und verarbeitet die Anfrage / liefert die Response.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Anchor 1 */}
      <div id="auth-access-token" className="rounded-lg border border-border bg-card p-6 space-y-4 scroll-mt-24">
        <h3 className="text-xl font-semibold">Access Token auslesen</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">
          Für Partner-Integrationen authentifiziert sich Ihre Organisation über eine <strong>signierte JWT Client Assertion</strong>.
        </p>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">Voraussetzungen</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span className="text-pretty">
                <strong>Client ID</strong> (z. B. <span className="font-mono">org-expo-00001</span>) auslesbar aus den Claimity Organisationseinstellungen
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span className="text-pretty">
                <strong>Private RSA Key</strong> aus den Claimity Organisationseinstellungen (sicher aufbewaren und niemals teilen)
              </span>
            </li>
          </ul>
        </div>

        <h4 className="text-sm font-semibold">Token Endpoint</h4>
        <KvpTable
          rows={[
            { k: "URL", v: <span className="font-mono">POST https://app.claimity.ch/v1/oauth/token</span> },
            { k: "Content-Type", v: <span className="font-mono">application/x-www-form-urlencoded</span> },
            {
              k: "Form Fields",
              v: (
                <div className="space-y-1 text-muted-foreground">
                  <div>
                    <span className="font-mono">grant_type</span> = <span className="font-mono">client_credentials</span>
                  </div>
                  <div>
                    <span className="font-mono">client_id</span> = <span className="font-mono">&lt;Ihre client id&gt;</span>
                  </div>
                  <div>
                    <span className="font-mono">client_assertion_type</span> ={" "}
                    <span className="font-mono">urn:ietf:params:oauth:client-assertion-type:jwt-bearer</span>
                  </div>
                  <div>
                    <span className="font-mono">client_assertion</span> = <span className="font-mono">&lt;JWT (RS256)&gt;</span>
                  </div>
                  <div>
                    <span className="font-mono">scope</span> <span className="font-mono">(optional)</span>
                  </div>
                </div>
              ),
            },
          ]}
        />

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">JWT Client Assertion (RS256)</summary>
          <div className="mt-3 grid gap-4 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-sm text-muted-foreground text-pretty">
                Die Assertion ist ein kurzlebiges JWT (10 Minuten) und wird mit deinem <strong>RSA Private Key</strong> signiert.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">iss</span>/<span className="font-mono">sub</span> = <span className="font-mono">client_id</span></span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">aud</span> = https://qua.claimity.ch/realms/claimity/protocol/openid-connect/token</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">jti</span> = UUID (einzigartig)</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">iat</span>/<span className="font-mono">exp</span> = “now” / “now+90s”</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">kid</span> (optional)</span></li>
              </ul>
            </div>

            <CodeBlock
              title="Beispiel: Token Request (cURL, Platzhalter)"
              children={`curl -X POST \\
  'https://app.claimity.ch/v1/oauth/token' \\
  -H 'Content-Type: application/x-www-form-urlencoded' \\
  -d 'grant_type=client_credentials' \\
  -d 'client_id=org-expo-00001' \\
  -d 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \\
  -d 'client_assertion=<RS256-JWT-CLIENT-ASSERTION>' \\
  -d 'scope=roles'`}
            />
          </div>
        </details>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">Token Response</h4>
          <p className="text-sm text-muted-foreground text-pretty">
            Die Response enthält ein <span className="font-mono">access_token</span>. Wichtig: Für API-Aufrufe wird dieser Token als
            <strong> DPoP Token</strong> verwendet.
          </p>
        </div>
      </div>

      {/* Anchor 2 */}
      <div id="auth-dpop" className="rounded-lg border border-border bg-card p-6 space-y-4 scroll-mt-24">
        <h3 className="text-xl font-semibold">API Requests senden</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">
          Jede Anfrage benötigt zusätzlich einen <strong>DPoP Proof JWT</strong>.
          Dieser wird <strong>pro Request</strong> erzeugt und signiert (ES256) und bindet die Anfrage an Methode + URL.
        </p>

        <h4 className="text-sm font-semibold">Erforderliche Headers</h4>
        <KvpTable
          rows={[
            { k: "Authorization", v: <span className="font-mono">DPoP {"{access_token}"}</span> },
            { k: "DPoP", v: <span className="font-mono">{"{dpop_proof_jwt}"}</span> },
            { k: "Accept", v: <span className="font-mono">application/json</span> },
            { k: "Content-Type", v: <span className="font-mono">application/json</span> },
          ]}
        />

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">DPoP Proof Inhalt</summary>
          <div className="mt-3 grid gap-4 md:grid-cols-2 md:items-start">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">htu</span> muss die <strong>exakte URL</strong> inkl. Query-String sein
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">htm</span> muss exakt der HTTP-Methode entsprechen (GET/POST/PUT/DELETE)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">jti</span> muss <strong>pro Request neu</strong> sein (keine Replays)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">iat</span> muss innerhalb des erlaubten Zeitfensters liegen (Clock-Skew vermeiden)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">ath</span> = <span className="font-mono">base64url(SHA-256(access_token))</span>
                </span>
              </li>
            </ul>

            <CodeBlock
              title="Beispiel: Authentifizierter API Call (cURL)"
              children={`curl -X GET \\
  'https://app.claimity.ch/v1/experts/cases?page=1&size=50' \\
  -H 'Accept: application/json' \\
  -H 'Authorization: DPoP {access_token}' \\
  -H 'DPoP: {dpop_proof_jwt}'`}
            />
          </div>
        </details>

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">Troubleshooting: 401 invalid_dpop</summary>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            Häufige Ursachen:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>htu mismatch</strong>: URL muss exakt inkl. Query sein</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>htm mismatch</strong>: Methode muss passen</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>iat</strong> außerhalb des Fensters: Systemzeit korrigieren</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>replay</strong>: <span className="font-mono">jti</span> muss pro Request neu sein</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>ath mismatch</strong>: <span className="font-mono">SHA-256(access_token)</span> base64url</span></li>
          </ul>
        </details>
      </div>
    </div>
  )
}

function ApiBasicsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">API‑Grundlagen</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Zentrale Konzepte und Konventionen, die in der gesamten API genutzt werden.
        </p>
      </div>

      <div id="basics-request-format" className="rounded-lg border border-border bg-card p-6 scroll-mt-24">
        <h3 className="mb-3 text-xl font-semibold">Request‑Format</h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          Jeder Request besteht aus <strong>Methode</strong>, <strong>URL</strong>, optionalen <strong>Query‑Parametern</strong>,
          <strong>Headers</strong> und (bei <span className="font-mono">POST</span>/<span className="font-mono">PUT</span>/<span className="font-mono">PATCH</span>)
          einem <strong>JSON‑Body</strong>.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">URL‑Aufbau</h4>
            <div className="text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Base URL:</span> <span className="font-mono">https://app.claimity.ch</span>
              </div>
              <div className="mt-1">
                <span className="font-medium text-foreground">Path:</span> <span className="font-mono">/v1/&lt;resource&gt;</span>
              </div>
              <div className="mt-1">
                <span className="font-medium text-foreground">Query:</span> z. B. <span className="font-mono">?page=1&size=50</span>
              </div>
            </div>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Beispiel‑URL</div>
              <div className="font-mono text-xs">https://app.claimity.ch/v1/…?page=1&size=50</div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">HTTP‑Methoden</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-20 rounded bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary">GET</span>
                <span className="text-sm text-muted-foreground">Ressourcen abrufen</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 rounded bg-accent/10 px-3 py-1 font-mono text-sm font-medium text-accent">POST</span>
                <span className="text-sm text-muted-foreground">Ressourcen erstellen</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 rounded bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary">PUT</span>
                <span className="text-sm text-muted-foreground">Ressourcen ersetzen/aktualisieren</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 rounded bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary">PATCH</span>
                <span className="text-sm text-muted-foreground">Teil‑Updates</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 rounded bg-destructive/10 px-3 py-1 font-mono text-sm font-medium text-destructive">DELETE</span>
                <span className="text-sm text-muted-foreground">Ressourcen löschen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Typische Headers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">Accept: application/json</span></span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">Content-Type: application/json</span> (bei JSON‑Body)</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">Authorization: DPoP &lt;access_token&gt;</span></span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">DPoP: &lt;dpop_proof_jwt&gt;</span></span></li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Beispiel (HTTP Request)</h4>
            <pre className="overflow-x-auto rounded-md bg-background p-3 text-xs">
              <code className="font-mono">{`GET /v1/…?page=1&size=50 HTTP/1.1
Host: app.claimity.ch
Accept: application/json
Authorization: DPoP <access_token>
DPoP: <dpop_proof_jwt>`}</code>
            </pre>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-muted/20 p-4">
          <h4 className="mb-2 text-sm font-semibold">JSON Body (Beispiel für POST/PUT/PATCH)</h4>
          <pre className="overflow-x-auto rounded-md bg-background p-3 text-xs">
            <code className="font-mono">{`{
  "…": "…"
}`}</code>
          </pre>
        </div>
      </div>

      <div id="basics-response-format" className="rounded-lg border border-border bg-card p-6 scroll-mt-24">
        <h3 className="mb-4 text-xl font-semibold">Response‑Format</h3>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground text-pretty">
          Responses sind grundsätzlich <strong>JSON</strong> (<span className="font-mono">Content-Type: application/json</span>) und verwenden HTTP‑Statuscodes,
          um Erfolg/Fehler zu signalisieren.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Erfolgs‑Responses</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong>2xx</strong> (z. B. <span className="font-mono">200</span>, <span className="font-mono">201</span>, <span className="font-mono">204</span>)</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Body enthält in der Regel ein Objekt oder eine Liste</span></li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Beispiel (Objekt)</div>
              <pre className="overflow-x-auto text-xs">
                <code className="font-mono">{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "…",
  "…": "…"
}`}</code>
              </pre>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Fehler‑Responses (ProblemDetails)</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong>4xx/5xx</strong> (z. B. <span className="font-mono">400</span>, <span className="font-mono">401</span>, <span className="font-mono">403</span>, <span className="font-mono">404</span>, <span className="font-mono">429</span>, <span className="font-mono">500</span>)</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Body folgt einer ProblemDetails‑ähnlichen Struktur</span></li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Beispiel (Problem‑JSON)</div>
              <pre className="overflow-x-auto text-xs">
                <code className="font-mono">{`HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "type": "about:blank",
  "title": "Bad Request",
  "status": 400,
  "detail": "…"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div id="basics-rate-limiting" className="rounded-lg border border-border bg-card p-6 scroll-mt-24">
        <h3 className="mb-4 text-xl font-semibold">Rate Limiting</h3>

        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          Die Partner-API ist durch Rate Limiting geschützt,
          um faire Nutzung und Stabilität sicherzustellen. Limits werden <strong>pro Client-Partition</strong> angewendet.
        </p>

        <div className="space-y-4">
          {/* Policies nebeneinander */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Default policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Standard für die Partner-API</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                Für Standard-Endpunkte wird die Anzahl an Abfragen leicht limitiert.
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>TokenBucket</strong>: ca. <strong>60 Requests/Minute</strong>, <strong>Burst</strong> bis <strong>20</strong>, <strong>Queue</strong> <strong>0</strong>
                  </span>
                </li>
              </ul>
            </div>

            {/* Documents policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Dokument-Routen</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                Für Endpunkte mit <span className="font-mono">.../documents...</span> gelten strengere Limits (z. B. für Upload/Download).
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>TokenBucket</strong>: ca. <strong>20 Requests/Minute</strong>, <strong>Burst</strong> bis <strong>10</strong>, <strong>Queue</strong> <strong>0</strong>
                  </span>
                </li>
              </ul>
            </div>

            {/* Token policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Token-Endpunkt</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                Der Token-Endpunkt ist streng limitiert um mögliche Attacken zu verhindern.
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>Fixed Window</strong>: <strong>10 Requests/Minute</strong> je <strong>Client</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 429 behavior (aufklappbar) */}
          <details className="rounded-lg border border-border bg-muted/20 p-4">
            <summary className="cursor-pointer text-sm font-semibold">Wenn ein Limit erreicht wird (HTTP 429)</summary>

            <div className="mt-3">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    Response: <strong>429 Too Many Requests</strong> (Rejection Code 429)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    Optionaler Header: <span className="font-mono">Retry-After</span>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    Diagnose/Policy-Hinweis: <span className="font-mono">X-RateLimit-Policy</span>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    Body: <strong>Problem-JSON</strong>
                  </span>
                </li>
              </ul>
            </div>
          </details>

          {/* Best practices */}
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 text-sm font-semibold">Empfehlungen für Clients</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  Bei <span className="font-mono">429</span> Requests mit <strong>Backoff</strong> wiederholen und <span className="font-mono">Retry-After</span> beachten.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  Dokument-Uploads/Downloads throttlen.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  Bursts sind begrenzt (kein Queueing) – bei hoher Parallelität kommt es schneller zu 429.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExpertsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Experten</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Endpoints für Experten zum Arbeiten mit Fällen, Dokumenten und Gutachten-/Report-Submissions.
        </p>
      </div>

      {/* ========== CASES ========== */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Fälle</h3>

        <div className="space-y-4">
          <div id="experts-cases-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases"
              label="List"
              description="Paginierte Liste von Fällen. Optional filterbar via status, category."
            />
          </div>

          <div id="experts-cases-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}"
              label="Get"
              description="Details zu einem Fall abrufen."
            />
          </div>

          <div id="experts-cases-comment" className="scroll-mt-24">
            <EndpointCard
              method="PUT"
              path="/v1/experts/cases/{caseId}/expert-comment"
              label="Update"
              description="Expertenkommentar setzen/aktualisieren."
            />
          </div>
        </div>
      </div>

      {/* ========== CASE DOCUMENTS ========== */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Falldokumente</h3>

        <div className="space-y-4">
          <div id="experts-cases-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/documents"
              label="List"
              description="Paginierte Liste der Falldokumente."
            />
          </div>

          <div id="experts-cases-docs-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/documents/{documentId}"
              label="Get"
              description="Dokumentinhalt abrufen (inkl. ContentBase64)."
            />
          </div>
        </div>
      </div>

      {/* ========== REPORTS (DRAFT + LIST) ========== */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Reports & Submissions</h3>

        <div className="space-y-4">
          <div id="experts-reports-draft-create" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/cases/{caseId}/reports:draft"
              label="Create"
              description="Draft-Submission zu einem Fall erstellen."
            />
          </div>

          <div id="experts-reports-draft-update" className="scroll-mt-24">
            <EndpointCard
              method="PUT"
              path="/v1/experts/cases/{caseId}/reports:draft"
              label="Update"
              description="Draft-Submission aktualisieren (z.B. Comment)."
            />
          </div>

          <div id="experts-reports-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/reports"
              label="List"
              description="Reports zu einem Fall auflisten."
            />
          </div>

          <div id="experts-reports-submission-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/reports/{submissionId}"
              label="Get"
              description="Details einer Submission abrufen."
            />
          </div>
        </div>
      </div>

      {/* ========== SUBMISSION DOCUMENTS + SUBMIT ========== */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Submission-Dokumente</h3>

        <div className="space-y-4">
          <div id="experts-submission-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/reports/{submissionId}/documents"
              label="List"
              description="Paginierte Liste der Dokumente einer Submission."
            />
          </div>

          <div id="experts-submission-docs-add" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/reports/{submissionId}/documents"
              label="Create"
              description="Dokument zu einer Submission hochladen."
            />
          </div>

          <div id="experts-submission-docs-delete" className="scroll-mt-24">
            <EndpointCard
              method="DELETE"
              path="/v1/experts/reports/{submissionId}/documents/{docId}"
              label="Delete"
              description="Dokument aus Submission löschen."
            />
          </div>

          <div id="experts-submission-submit" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/reports/{submissionId}/submit"
              label="Submit"
              description="Submission final einreichen."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function InsurerSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Versicherer</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Endpoints für Versicherer zum Erstellen/Validieren/Abrufen von Schäden, Dokumenten und Report-Übersichten.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Schäden</h3>

        <div className="space-y-4">
          <div id="insurer-claims-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims"
              label="List"
              description="Paginierte Liste der Claims. Optional filterbar via category, status."
            />
          </div>

          <div id="insurer-claims-create" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/insurers/claims"
              label="Create"
              description="Claim erstellen."
            />
          </div>

          <div id="insurer-claims-validate" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/insurers/claims:validate"
              label="Validate"
              description="Claim-Request validieren (ohne Anlage)."
            />
          </div>

          <div id="insurer-claims-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}"
              label="Get"
              description="Claim-Details abrufen."
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Schadendokumente</h3>

        <div className="space-y-4">
          <div id="insurer-claim-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents"
              label="List"
              description="Paginierte Liste der Claim-Dokumente."
            />
          </div>

          <div id="insurer-claim-docs-add" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/insurers/claims/{claimId}/documents"
              label="Create"
              description="Dokument hochladen."
            />
          </div>

          <div id="insurer-claim-docs-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents/{documentId}"
              label="Get"
              description="Dokumentinhalt abrufen (inkl. ContentBase64)."
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Reports zu Claims</h3>

        <div className="space-y-4">
          <div id="insurer-claim-reports-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports"
              label="List"
              description="Reports (Submissions) zu einem Claim auflisten."
            />
          </div>

          <div id="insurer-claim-report-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports/{submissionId}/documents"
              label="List"
              description="Dokumentinhalte einer Report-Submission abrufen."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
