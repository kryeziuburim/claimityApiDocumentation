"use client"

import { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect } from "react"
import { Menu, X, ChevronRight, FileText, BookOpen, Bug, History, Lock, Code, Users, Shield } from "lucide-react"
import { Button } from "@/components/simple-button"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"

interface NavItem {
  id: string
  title: string
  icon: React.ElementType
  children?: { id: string; title: string }[]
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
      { id: "auth-placeholder-1", title: "OAuth 2.0 Flow" },
      { id: "auth-placeholder-2", title: "API-Schlüssel" },
    ],
  },
  {
    id: "api-basics",
    title: "API‑Grundlagen",
    icon: Code,
    children: [
      { id: "basics-placeholder-1", title: "Request-Format" },
      { id: "basics-placeholder-2", title: "Response-Format" },
    ],
  },
  {
    id: "experts",
    title: "Experten",
    icon: Users,
    children: [
      { id: "experts-placeholder-1", title: "Experten auflisten" },
      { id: "experts-placeholder-2", title: "Experte erstellen" },
    ],
  },
  {
    id: "insurer",
    title: "Versicherer",
    icon: Shield,
    children: [
      { id: "insurer-placeholder-1", title: "Versicherer auflisten" },
      { id: "insurer-placeholder-2", title: "Versicherer erstellen" },
    ],
  },
]

export default function Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [footerInView, setFooterInView] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const heroSentinelRef = useRef<HTMLDivElement | null>(null)
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
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
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
      { root: null, threshold: [0], rootMargin: "-96px 0px 0px 0px" }
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
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          setActiveId(visible.target.id)
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
      setExpandedItems((prev) => (prev.includes(activeId) ? prev : [...prev, activeId]))
    }
    // Child aktiv -> zugehörigen Parent expandieren
    const parent = childToParent[activeId]
    if (parent) {
      setExpandedItems((prev) => (prev.includes(parent) ? prev : [...prev, parent]))
    }
  }, [activeId, childToParent])

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
          <div className="h-[calc(100vh-4rem)] overflow-y-auto py-6">
            <div className="mb-2 flex items-center justify-between px-3 lg:hidden">
              <span className="text-sm font-medium">Navigation</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center rounded-md border border-slate-200 bg-white/90 px-2 py-1 text-xs text-gray-900 shadow-sm hover:bg-white"
              >
                <X className="mr-1 h-4 w-4" /> Schließen
              </button>
            </div>
            <nav className="space-y-1 px-3" role="navigation" aria-label="API Navigation">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.children) {
                        toggleExpanded(item.id)
                      } else {
                        handleNavigate(item.id)
                      }
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      activeId === item.id || (item.children && item.children.some((c) => c.id === activeId))
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    )}
                    aria-expanded={item.children ? expandedItems.includes(item.id) : undefined}
                    aria-controls={item.children ? `subnav-${item.id}` : undefined}
                    aria-current={
                      activeId === item.id || (item.children && item.children.some((c) => c.id === activeId)) ? "page" : undefined
                    }
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left text-balance">{item.title}</span>
                    {item.children && (
                      <ChevronRight
                        className={cn("h-4 w-4 shrink-0 transition-transform", expandedItems.includes(item.id) && "rotate-90")}
                      />
                    )}
                  </button>
                  {item.children && expandedItems.includes(item.id) && (
                    <div id={`subnav-${item.id}`} className="ml-7 mt-1 space-y-1 border-l border-border pl-4">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => {
                            handleNavigate(child.id)
                          }}
                          className={cn(
                            "flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors",
                            activeId === child.id
                              ? "font-medium text-sidebar-accent-foreground"
                              : "text-muted-foreground hover:text-sidebar-foreground",
                          )}
                          aria-current={activeId === child.id ? "page" : undefined}
                        >
                          <span className="text-balance">{child.title}</span>
                        </button>
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
                <Section id="experts"><ExpertsSection /></Section>
                <Section id="insurer"><InsurerSection /></Section>
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
          Anwendungen – die API liefert Flexibilität und Leistung.
        </p>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-xl font-semibold text-white">Auf dem Laufenden bleiben</h3>
        <ul className="space-y-2 text-white">
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Statusseite abonnieren, um über kurzfristige API‑Störungen informiert zu werden.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">API‑Newsletter abonnieren, um Neuigkeiten und Updates zu erhalten.</span>
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
            title: "Konto anlegen",
            description:
              "Erstellen Sie ein Claimity Konto (app.claimity.ch) und schließen Sie die Einrichtung ab. Mit vorhandenem Konto können Sie fortfahren.",
          },
          {
            step: "2",
            title: "API‑Zugangsdaten",
            description:
              "Öffnen Sie das Developer‑Portal und erstellen Sie eine neue Applikation, um Client‑ID/Secret zu erhalten.",
          },
          {
            step: "3",
            title: "Authentifizieren",
            description: "Nutzen Sie den Authentifizierungs‑Flow, um ein Access Token für Ihre Requests zu erhalten.",
          },
          {
            step: "4",
            title: "Erste Anfrage",
            description: "Senden Sie mit Ihrem Access Token eine authentifizierte Anfrage an einen Endpoint.",
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
  https://api.example.com/v1/experts \\
  -H 'Accept: application/json' \\
  -H 'Authorization: Bearer {access-token}'`}</code>
        </pre>
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
          Wenn Sie auf einen Fehler gestoßen sind, helfen wir weiter. Stellen Sie vorab sicher, dass das Problem
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
          Bitte beschreiben Sie Schritte zur Reproduktion. Unser Support prüft den Fall zeitnah.
        </p>
        <Button className="bg-white text-black hover:bg-white/90">Problem melden</Button>
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
            date: "2025-01-15",
            changes: "Neue Filteroptionen für Experten- und Versicherer‑Endpoints",
          },
          {
            date: "2025-01-10",
            changes: "Verbesserte Fehlermeldungen bei Authentifizierungsfehlern",
          },
          {
            date: "2024-12-20",
            changes: "Paginierung für alle List‑Endpoints ergänzt",
          },
          {
            date: "2024-12-15",
            changes: "Erste API‑Version veröffentlicht",
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
      id === "overview" ? "pt-8 pb-20 md:pt-10 md:pb-24" : "py-20 md:py-24",
    )}
  >
    {children}
  </section>
)

function AuthenticationSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Authentifizierung</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Alle API‑Requests erfordern Authentifizierung via OAuth 2.0 oder API‑Schlüssel.
        </p>
      </div>

      <div id="auth-placeholder-1" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">OAuth 2.0</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          OAuth 2.0 ist die empfohlene Methode für Anwendungen mit Zugriff auf Nutzerdaten. Der Authorization‑Code‑Flow
          bietet sicheren Zugriff inkl. Refresh Tokens.
        </p>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="text-pretty">Details zu Flows und Implementierung finden Sie in den Unterkapiteln.</p>
        </div>
      </div>

      <div id="auth-placeholder-2" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">API‑Schlüssel</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          Für Server‑to‑Server‑Integrationen können API‑Schlüssel genutzt werden. Diese erfordern keine Nutzerzustimmung.
        </p>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Auth‑Header</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">{`Authorization: Bearer {your-access-token}`}</code>
        </pre>
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
      <div id="basics-placeholder-1" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div id="basics-placeholder-2" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-3 text-lg font-semibold">Base URL</h3>
          <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">https://api.example.com/v1</code>
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

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Rate Limiting</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          API‑Requests sind rate‑limited, um faire Nutzung sicherzustellen. Aktuelle Limits:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span className="text-pretty">1000 Requests pro Stunde für authentifizierte Anfragen</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span className="text-pretty">100 Requests pro Stunde für nicht authentifizierte Anfragen</span>
          </li>
        </ul>
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
          Der Endpoint „Experten“ dient zur Verwaltung von Profilen und zugehörigen Daten.
        </p>
      </div>

      <div id="experts-placeholder-1" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Überblick</h3>
        <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
          Endpoints zum Erstellen, Abrufen, Aktualisieren und Löschen von Profilen. Spezialisierungen, Kontaktinfos und
          Verfügbarkeiten können hinterlegt werden.
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">GET /experts</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">List</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">Paginierte Liste aller Experten abrufen</p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">POST /experts</span>
              <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">Create</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">Neues Experten‑Profil erstellen</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Beispiel‑Response</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">{`{
  "id": "exp_123456",
  "name": "Dr. Jane Smith",
  "specialization": "Medical Expert",
  "email": "jane.smith@example.com",
  "status": "active"
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
          Der Endpoint „Versicherer“ bietet Zugriff auf Gesellschaftsdaten und zugehörige Operationen.
        </p>
      </div>

      <div id="insurer-placeholder-1" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Überblick</h3>
        <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
          Verwalten Sie Profile inkl. Firmendaten, Deckungsarten und Kontaktinformationen. Die Endpoints unterstützen
          vollständige CRUD‑Operationen.
        </p>

        <div className="space-y-4">
          <div id="experts-placeholder-2" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">GET /insurers</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">List</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">Paginierte Liste aller Versicherer abrufen</p>
          </div>

          <div id="insurer-placeholder-2" className="api-anchor h-6 opacity-0 scroll-mt-24 pointer-events-none" aria-hidden="true" />
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">POST /insurers</span>
              <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">Create</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">Neues Versicherer‑Profil erstellen</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Beispiel‑Response</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">{`{
  "id": "ins_789012",
  "name": "Global Insurance Co.",
  "coverage_types": ["health", "liability"],
  "contact_email": "contact@globalinsurance.com",
  "status": "active"
}`}</code>
        </pre>
      </div>
    </div>
  )
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">{title}</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">Ausführliche Dokumentation zu „{title}“ folgt hier.</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">In Kürze verfügbar</h3>
        <p className="text-muted-foreground text-pretty">Dieser Abschnitt befindet sich in Arbeit. Schauen Sie bald wieder vorbei.</p>
      </div>
    </div>
  )
}
