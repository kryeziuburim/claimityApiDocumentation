"use client"

import { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import { Menu, X, ChevronRight, FileText, BookOpen, Bug, History, Lock, Code, Users, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"
import { OpenApiProvider } from "@/components/api/OpenApiProvider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EndpointCard } from "@/components/api/EndpointCard"
import LocalizedLink from "@/components/localized-link"

interface NavItem {
  id: string
  title: string
  icon: React.ElementType
  children?: { id: string; title: string; method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" }[]
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
      { id: "auth-flow", title: "Auth Flow" },
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
      { id: "experts-cases-get", method: "GET", title: "Cases" },
      { id: "experts-cases-comment", method: "PUT", title: "Expert comment" },
      { id: "experts-cases-docs-list", method: "GET", title: "Documents" },
      { id: "experts-cases-docs-get", method: "GET", title: "Documents" },

      { id: "experts-reports-draft-create", method: "POST", title: "Report draft" },
      { id: "experts-reports-draft-update", method: "PUT", title: "Report draft" },
      { id: "experts-reports-list", method: "GET", title: "Reports" },
      { id: "experts-reports-submission-get", method: "GET", title: "Report submission" },

      { id: "experts-submission-docs-list", method: "GET", title: "Submission documents" },
      { id: "experts-submission-docs-add", method: "POST", title: "Submission documents" },
      { id: "experts-submission-docs-delete", method: "DELETE", title: "Submission documents" },
      { id: "experts-submission-submit", method: "POST", title: "Submission" },
    ],
  },
  {
    id: "insurer",
    title: "Versicherer",
    icon: Shield,
    children: [
      { id: "insurer-claims-list", method: "GET", title: "Claims" },
      { id: "insurer-claims-create", method: "POST", title: "Claims" },
      { id: "insurer-claims-validate", method: "POST", title: "Claims validation" },
      { id: "insurer-claims-get", method: "GET", title: "Claims" },

      { id: "insurer-claim-docs-list", method: "GET", title: "Documents" },
      { id: "insurer-claim-docs-add", method: "POST", title: "Documents" },
      { id: "insurer-claim-docs-get", method: "GET", title: "Documents" },

      { id: "insurer-claim-reports-list", method: "GET", title: "Reports" },
      { id: "insurer-claim-report-docs-list", method: "GET", title: "Report documents" },
    ],
  },
]

export default function Page() {
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
                            PATCH: "#FCA130",
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
                                "mt-[1px] inline-flex h-5 shrink-0 items-center rounded-md px-1.5",
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
                <Section id="overview"><OverviewSection /></Section>
                <Section id="first-steps"><FirstStepsSection /></Section>
                <Section id="reporting"><ReportingSection /></Section>
                <Section id="changelog"><ChangeLogSection /></Section>
                <Section id="authentication"><AuthenticationSection /></Section>
                <Section id="api-basics"><ApiBasicsSection /></Section>
                <OpenApiProvider url="/assets/openapi.json">
                  <Section id="experts"><ExpertsSection /></Section>
                  <Section id="insurer"><InsurerSection /></Section>
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
      <div id="auth-flow" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="text-xl font-semibold">Authentication Flow</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          So funktioniert der OAuth2 Client-Credentials Flow.
        </p>

        <div className="grid gap-6 md:grid-cols-[440px_1fr] md:items-start">
          <div className="overflow-hidden rounded-lg bg-background">
            <Image
              src="/assets/Auth_Sqeuence.png"
              alt="Auth Flow Sequenzdiagramm (OAuth2 Client Credentials + DPoP)"
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
                <strong className="text-foreground">Validierung</strong>: Auth-Server prüft Signatur der Assertion und die Berechtigungen (Client).
              </li>
              <li>
                <strong className="text-foreground">Token Response</strong>: Server liefert <span className="font-mono">access_token</span> (für API-Calls als DPoP-Token verwendet).
              </li>
              <li>
                <strong className="text-foreground">DPoP Proof</strong>: Client erstellt pro Request ein DPoP-JWT (ES256) gebunden an Methode + URL.
              </li>
              <li>
                <strong className="text-foreground">API Call</strong>: Client ruft Endpoint auf mit <span className="font-mono">Authorization: DPoP </span><span className="font-mono">access_token</span> und <span className="font-mono">DPoP: …</span>.
              </li>
              <li>
                <strong className="text-foreground">DPoP Prüfung</strong>: API prüft Token/DPoP und verhindert Replays.
              </li>
              <li>
                <strong className="text-foreground">Response</strong>: API verarbeitet die Anfrage und liefert die Response.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Anchor 1 */}
      <div id="auth-access-token" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />

      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="text-xl font-semibold">Access Token auslesen</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">
          Für Partner-Integrationen authentifiziert sich Ihre Organisation über eine <strong>signierte JWT Client Assertion</strong>.
          Voraussetzung ist ein in Claimity erzeugtes <strong>Key Pair</strong> (RSA) und Ihre <strong>Client ID</strong>.
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
                    Optional: <span className="font-mono">scope</span>
                  </div>
                </div>
              ),
            },
          ]}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">JWT Client Assertion (RS256)</h4>
            <p className="text-sm text-muted-foreground text-pretty">
              Die Assertion ist ein kurzlebiges JWT (10 Minuten) und wird mit deinem <strong>RSA Private Key</strong> signiert.
              Wichtige Claims:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">iss</span>/<span className="font-mono">sub</span> = <span className="font-mono">client_id</span></span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">aud</span> = 'https://qua.claimity.ch/realms/claimity/protocol/openid-connect/token'</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">jti</span> = UUID (einzigartig)</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><span className="font-mono">iat</span>/<span className="font-mono">exp</span> = “now” / “now+90s”</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Optional Header <span className="font-mono">kid</span></span></li>
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

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">Token Response</h4>
          <p className="text-sm text-muted-foreground text-pretty">
            Die Response enthält ein <span className="font-mono">access_token</span>. Wichtig: Für API-Aufrufe wird dieser Token als
            <strong>DPoP Token</strong> verwendet (siehe nächster Schritt).
          </p>
        </div>
      </div>

      {/* Anchor 2 */}
      <div id="auth-dpop" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />

      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="text-xl font-semibold">API Requests senden (DPoP Proof-of-Possession)</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">
          Jede Anfrage an <span className="font-mono">/v1/…</span> benötigt zusätzlich einen <strong>DPoP Proof JWT</strong>.
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

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">DPoP Proof Inhalt (wichtig)</h4>
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
          </div>

          <CodeBlock
            title="Beispiel: Authentifizierter API Call (cURL)"
            children={`curl -X GET \\
  'https://app.claimity.ch/v1/experts/cases?page=1&size=50' \\
  -H 'Accept: application/json' \\
  -H 'Authorization: DPoP {access_token}' \\
  -H 'DPoP: {dpop_proof_jwt}'`}
          />
        </div>

        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <h4 className="mb-2 text-sm font-semibold">Troubleshooting: 401 invalid_dpop</h4>
          <p className="text-sm text-muted-foreground text-pretty">
            Häufige Ursachen (bitte zuerst prüfen):
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>htu mismatch</strong>: URL muss exakt inkl. Query sein</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>htm mismatch</strong>: Methode muss passen</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>iat</strong> außerhalb des Fensters: Systemzeit korrigieren</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>replay</strong>: <span className="font-mono">jti</span> muss pro Request neu sein</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>ath mismatch</strong>: <span className="font-mono">SHA-256(access_token)</span> base64url</span></li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6 space-y-3">
        <h3 className="font-mono text-sm font-semibold">Quick Reference</h3>
        <CodeBlock
          title="Headers (API Calls)"
          children={`Authorization: DPoP {access_token}
DPoP: {dpop_proof_jwt}
Accept: application/json
Content-Type: application/json`}
        />
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          <strong>Hinweis:</strong> Tokens & Keys niemals in Tickets/Screenshots teilen. In Produktion sollten Secrets in einem Secret Manager liegen
          und Zugriffe nach Least-Privilege erfolgen.
        </p>
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
      <div id="basics-request-format" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div id="basics-response-format" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-3 text-lg font-semibold">Base URL</h3>
          <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">https://app.claimity.ch</code>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-3 text-lg font-semibold">Content‑Type</h3>
          <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">application/json</code>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">HTTP‑Methoden</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary">GET</span>
            <span className="text-sm text-muted-foreground">Ressourcen abrufen</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-accent/10 px-3 py-1 font-mono text-sm font-medium text-accent">POST</span>
            <span className="text-sm text-muted-foreground">Neue Ressourcen erstellen</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary">PUT</span>
            <span className="text-sm text-muted-foreground">Bestehende Ressourcen aktualisieren</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-destructive/10 px-3 py-1 font-mono text-sm font-medium text-destructive">
              DELETE
            </span>
            <span className="text-sm text-muted-foreground">Ressourcen entfernen</span>
          </div>
        </div>
      </div>
      <div id="basics-rate-limiting" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Rate Limiting</h3>

        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          Die Partner-API (<span className="font-mono">/v1</span>) ist durch das .NET 8 Rate Limiting Middleware geschützt
          (<span className="font-mono">AddRateLimiter()</span> / <span className="font-mono">UseRateLimiter()</span>), um faire Nutzung und Stabilität
          sicherzustellen. Limits werden <strong>pro Client-Partition</strong> angewendet (nicht global für alle Nutzer).
        </p>

        <div className="space-y-4">
          {/* Default policy */}
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-semibold">
                Standard für <span className="font-mono">/v1/*</span> (außer Token & Dokumente)
              </h4>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Policy: partner-default
              </span>
            </div>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <strong>TokenBucket</strong>: ca. <strong>60 Requests/Minute</strong>, <strong>Burst</strong> bis <strong>20</strong>, <strong>Queue</strong> <strong>0</strong>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <strong>Partition Key</strong>: <span className="font-mono">azp</span> Claim (Keycloak) – falls nicht vorhanden: <strong>IP-Fallback</strong> (
                  <span className="font-mono">GetAzpOrIp()</span>)
                </span>
              </li>
            </ul>
          </div>

          {/* Documents policy */}
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-semibold">Dokument-Routen</h4>
              <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                Policy: partner-docs
              </span>
            </div>

            <p className="mb-2 text-sm text-muted-foreground text-pretty">
              Für Endpunkte mit <span className="font-mono">.../documents...</span> gelten strengere Limits (z. B. für Upload/Download).
              Diese Policy wird explizit per Attribut aktiviert:
              <span className="ml-1 font-mono">[EnableRateLimiting("partner-docs")]</span>
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <strong>TokenBucket</strong>: ca. <strong>20 Requests/Minute</strong> (≈ <strong>1 Token / 3s</strong>), <strong>Burst</strong> bis <strong>10</strong>, <strong>Queue</strong> <strong>0</strong>
                </span>
              </li>
            </ul>
          </div>

          {/* Token policy */}
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-semibold">
                Token Proxy <span className="font-mono">POST /v1/oauth/token</span>
              </h4>
              <span className="rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                Policy: token-per-client
              </span>
            </div>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <strong>FixedWindow</strong>: <strong>10 Requests/Minute</strong> pro <strong>client_id</strong>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <strong>Partition Key</strong>: <span className="font-mono">client_id</span> aus Basic Auth (Fallback: IP / anonym) (
                  <span className="font-mono">ExtractClientIdFromBasicAuth()</span>)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  Am Controller aktiviert via <span className="font-mono">[EnableRateLimiting("token-per-client")]</span> (AuthV1Controller)
                </span>
              </li>
            </ul>
          </div>

          {/* 429 behavior */}
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Wenn ein Limit erreicht wird (HTTP 429)</h4>
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
                  Body: <strong>Problem-JSON</strong> (ProblemDetails-Struktur)
                </span>
              </li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Beispiel (gekürzt)</div>
              <pre className="overflow-x-auto text-xs">
                <code className="font-mono">{`HTTP/1.1 429 Too Many Requests
      Retry-After: 3
      X-RateLimit-Policy: partner-docs

      {
        "type": "about:blank",
        "title": "Too Many Requests",
        "status": 429,
        "detail": "Rate limit exceeded."
      }`}</code>
              </pre>
            </div>
          </div>

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
                  Dokument-Uploads/Downloads throttlen (parallelisieren nur moderat), da <span className="font-mono">partner-docs</span> bewusst strenger ist.
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
          Endpoints für Experten zum Arbeiten mit Fällen (Cases), Dokumenten und Gutachten-/Report-Submissions.
        </p>
      </div>

      {/* ========== CASES ========== */}
      <div id="experts-cases-list" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Fälle (Cases)</h3>

        <div className="space-y-4">
          <EndpointCard
            method="GET"
            path="/v1/experts/cases"
            label="List"
            description="Paginierte Liste von Fällen. Optional filterbar via status, category. (Response: M2MPagedCasesDto)"
          />

          <div id="experts-cases-get" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="GET"
            path="/v1/experts/cases/{caseId}"
            label="Get"
            description="Details zu einem Fall abrufen. (Response: M2MCaseListItemDto)"
          />

          <div id="experts-cases-comment" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="PUT"
            path="/v1/experts/cases/{caseId}/expert-comment"
            label="Update"
            description="Expertenkommentar setzen/aktualisieren. (Body: M2MExpertCommentRequest, Response: 204)"
          />
        </div>
      </div>

      {/* ========== CASE DOCUMENTS ========== */}
      <div id="experts-cases-docs-list" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Falldokumente</h3>

        <div className="space-y-4">
          <EndpointCard
            method="GET"
            path="/v1/experts/cases/{caseId}/documents"
            label="List"
            description="Paginierte Liste der Falldokumente. (Response: M2MPagedExpertDocumentsDto)"
          />

          <div id="experts-cases-docs-get" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="GET"
            path="/v1/experts/cases/{caseId}/documents/{documentId}"
            label="Get"
            description="Dokumentinhalt abrufen (inkl. ContentBase64). (Response: M2MExpertDocumentContentDto)"
          />
        </div>
      </div>

      {/* ========== REPORTS (DRAFT + LIST) ========== */}
      <div id="experts-reports-draft-create" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Reports & Submissions</h3>

        <div className="space-y-4">
          <EndpointCard
            method="POST"
            path="/v1/experts/cases/{caseId}/reports:draft"
            label="Create"
            description="Draft-Submission zu einem Fall erstellen. (Body: M2MReportSubmitRequest, Response: M2MReportSubmissionDto)"
          />

          <div id="experts-reports-draft-update" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="PUT"
            path="/v1/experts/cases/{caseId}/reports:draft"
            label="Update"
            description="Draft-Submission aktualisieren (z.B. Comment). (Body: M2MReportSubmitRequest, Response: M2MReportSubmissionDto)"
          />

          <div id="experts-reports-list" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="GET"
            path="/v1/experts/cases/{caseId}/reports"
            label="List"
            description="Reports zu einem Fall auflisten. (Response: M2MPagedReportsDto)"
          />

          <div id="experts-reports-submission-get" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="GET"
            path="/v1/experts/cases/{caseId}/reports/{submissionId}"
            label="Get"
            description="Details einer Submission abrufen. (Response: M2MReportSubmissionDto)"
          />
        </div>
      </div>

      {/* ========== SUBMISSION DOCUMENTS + SUBMIT ========== */}
      <div id="experts-submission-docs-list" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Submission-Dokumente</h3>

        <div className="space-y-4">
          <EndpointCard
            method="GET"
            path="/v1/experts/reports/{submissionId}/documents"
            label="List"
            description="Paginierte Liste der Dokumente einer Submission. (Response: M2MPagedExpertReportSubmissionDocumentsDto)"
          />

          <div id="experts-submission-docs-add" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="POST"
            path="/v1/experts/reports/{submissionId}/documents"
            label="Create"
            description="Dokument zu einer Submission hochladen. (Body: M2MCreateReportSubmissionDocumentRequest, Response: M2MReportSubmissionDocumentInfoDto)"
          />

          <div id="experts-submission-docs-delete" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="DELETE"
            path="/v1/experts/reports/{submissionId}/documents/{docId}"
            label="Delete"
            description="Dokument aus Submission löschen. (Response: 204)"
          />

          <div id="experts-submission-submit" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="POST"
            path="/v1/experts/reports/{submissionId}/submit"
            label="Submit"
            description="Submission final einreichen. (Response: M2MReportSubmissionDto)"
          />
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Beispiel: Case-List Item (gekürzt)</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">{`{
  "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "ExternalKey": "ABC-123",
  "Category": "liability",
  "Status": "open",
  "CreatedAt": "2025-12-31T12:00:00Z",
  "UpdatedAt": "2025-12-31T12:30:00Z",
  "ExpertComment": null,
  "ArchiveState": false,
  "Insurer": { "Name": "Example Insurer", "Responsible": { "Name": "Max", "Email": "max@example.com" } }
}`}</code>
        </pre>
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
          Endpoints für Versicherer zum Erstellen/Validieren/Abrufen von Schäden (Claims), Dokumenten und Report-Übersichten.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Schäden (Claims)</h3>

        <div className="space-y-4">
          <div id="insurer-claims-list" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="GET"
            path="/v1/insurers/claims"
            label="List"
            description="Paginierte Liste der Claims. Optional filterbar via category, status. (Response: M2MPagedInsurerClaimsDto)"
          />

          <div id="insurer-claims-create" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="POST"
            path="/v1/insurers/claims"
            label="Create"
            description="Claim erstellen. (Body: M2MCreateClaimRequest, Response: M2MClaimCreatedDto)"
          />

          <div id="insurer-claims-validate" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="POST"
            path="/v1/insurers/claims:validate"
            label="Validate"
            description="Claim-Request validieren (ohne Anlage). (Body: M2MCreateClaimRequest, Response: M2MClaimValidationResultDto; 400: ValidationProblemDetails)"
          />

          <div id="insurer-claims-get" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="GET"
            path="/v1/insurers/claims/{claimId}"
            label="Get"
            description="Claim-Details abrufen. (Response: M2MInsurerClaimDetailsDto)"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Schadendokumente</h3>

        <div className="space-y-4">
          <div id="insurer-claim-docs-list" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="GET"
            path="/v1/insurers/claims/{claimId}/documents"
            label="List"
            description="Paginierte Liste der Claim-Dokumente. (Response: M2MPagedInsurerDocumentsDto)"
          />

          <div id="insurer-claim-docs-add" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="POST"
            path="/v1/insurers/claims/{claimId}/documents"
            label="Create"
            description="Dokument hochladen. (Body: M2MCreateDocumentRequest, Response: M2MInsurerDocumentDto)"
          />

          <div id="insurer-claim-docs-get" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="GET"
            path="/v1/insurers/claims/{claimId}/documents/{documentId}"
            label="Get"
            description="Dokumentinhalt abrufen (inkl. ContentBase64). (Response: M2MInsurerDocumentContentDto)"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Reports zu Claims</h3>

        <div className="space-y-4">
          <div id="insurer-claim-reports-list" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="GET"
            path="/v1/insurers/claims/{claimId}/reports"
            label="List"
            description="Reports (Submissions) zu einem Claim auflisten. (Response: M2MPagedReportsDto)"
          />

          <div id="insurer-claim-report-docs-list" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <EndpointCard
            method="GET"
            path="/v1/insurers/claims/{claimId}/reports/{submissionId}/documents"
            label="List"
            description="Dokumentinhalte einer Report-Submission abrufen. (Response: M2MPagedReportSubmissionDocumentContentsDto)"
          />
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Beispiel: ClaimCreatedDto (gekürzt)</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">{`{
  "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "ExternalKey": "CLM-2025-0001",
  "Category": "liability",
  "Status": "created",
  "PayloadJson": "{...}"
}`}</code>
        </pre>
      </div>
    </div>
  )
}
