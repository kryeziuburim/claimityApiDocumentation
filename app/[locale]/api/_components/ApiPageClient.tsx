"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Menu } from "lucide-react"

import { OpenApiProvider, type OpenApiSpec } from "@/components/api/OpenApiProvider"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import type { Locale } from "@/lib/i18n"
import type { JsonSchema } from "@/lib/json-schema"
import { scrollToAnchor } from "@/lib/scroll-to-anchor"

import { ApiSidebar, API_SIDEBAR_ID } from "./api-page/ApiSidebar"
import { useBodyScrollLock, useFooterLift, usePastHero } from "./api-page/layout-hooks"
import { getApiNavigation } from "./api-page/navigation"
import { useScrollSpy } from "./api-page/useScrollSpy"
import { apiPageClientMessages } from "./ApiPageClient.messages"
import { ClaimPayloadSection } from "./claim-payload/ClaimPayloadSection"
import { getClaimPayloads } from "./claim-payload/payloads"

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

type ApiPageClientProps = {
  locale: Locale
  /** Loaded at build time (lib/api-docs-data.ts) so the content is part of the exported HTML. */
  spec: OpenApiSpec
  claimSchemas: Record<string, JsonSchema>
}

export default function ApiPageClient({ locale, spec, claimSchemas }: ApiPageClientProps) {
  const t = apiPageClientMessages[locale]
  const { items: navigationItems, childToParent } = getApiNavigation(locale)
  const claimPayloads = getClaimPayloads(locale)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useBodyScrollLock(isMobileMenuOpen)

  const heroSentinelRef = useRef<HTMLDivElement | null>(null)
  const pastHero = usePastHero(heroSentinelRef)
  const footerLiftPx = useFooterLift()

  const payloadKeyByAnchor = useMemo(
    () => Object.fromEntries(claimPayloads.map((payload) => [payload.anchorId, payload.key])),
    [claimPayloads],
  )
  const payloadAnchorByKey = useMemo(
    () => Object.fromEntries(claimPayloads.map((payload) => [payload.key, payload.anchorId])),
    [claimPayloads],
  )
  const [activePayloadKey, setActivePayloadKey] = useState<string>(claimPayloads[0]?.key ?? "")

  const [activeId, setActiveId] = useScrollSpy({
    items: navigationItems,
    childToParent,
    payloadAnchorByKey,
    activePayloadKey,
    pastHero,
  })

  const handleNavigate = useCallback(
    (id: string) => {
      const payloadKey = payloadKeyByAnchor[id]
      if (payloadKey) {
        setActivePayloadKey((prev) => (prev === payloadKey ? prev : payloadKey))
      }
      try {
        history.pushState(null, "", `#${id}`)
      } catch {}
      // Waits for payload tabs that are only mounted after the tab switch above.
      scrollToAnchor(id)
      setActiveId(id)
      setIsMobileMenuOpen(false)
    },
    [payloadKeyByAnchor, setActiveId],
  )

  // Navigation and tab changes set activeId and activePayloadKey together, so the two never need to be
  // synced by effects; the scroll spy maps the generic "payloads" section to the active tab's anchor.
  const handlePayloadTabChange = useCallback(
    (key: string) => {
      setActivePayloadKey((prev) => (prev === key ? prev : key))
      const anchor = payloadAnchorByKey[key]
      if (anchor) {
        setActiveId(anchor)
      }
    },
    [payloadAnchorByKey, setActiveId],
  )

  // Bei initialer URL mit Hash dorthin scrollen (nach Mount). Payload anchors are handled by
  // ClaimPayloadSection, which first has to select the matching tab.
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "")
    if (!hash || payloadKeyByAnchor[hash]) return
    return scrollToAnchor(hash)
  }, [payloadKeyByAnchor])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isMobileMenuOpen ? (
        <button
          type="button"
          aria-label={t.closeMenu}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-[45] bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
        />
      ) : null}

      {/* Seiten-Navigation */}
      <ApiSidebar
        items={navigationItems}
        childToParent={childToParent}
        activeId={activeId}
        onNavigate={handleNavigate}
        mobileOpen={isMobileMenuOpen}
        footerLiftPx={footerLiftPx}
      />

      <Header />

      {/* Container for 100cqw below. Not on the root div: containment would turn it into the
          containing block of the fixed sidebar. */}
      <div className="@container lg:pl-64">
        <div className="border-b border-border px-4 py-3 sm:px-6 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-expanded={isMobileMenuOpen}
            aria-controls={API_SIDEBAR_ID}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            <Menu className="h-4 w-4" />
            {t.menu}
          </button>
        </div>

        {/* Content edges like the centered max-w-7xl px-6 container of the other pages (this container is
            16rem narrower than the page because of the sidebar). Left: at least 2.5rem/3.5rem next to the
            sidebar; on wide screens the content starts where it does on the other pages. */}
        <div className="px-4 sm:px-6 lg:pl-[max(2.5rem,calc((100cqw_+_16rem_-_80rem)_/_2_+_1.5rem_-_16rem))] lg:pr-[max(1.5rem,calc((100cqw_+_16rem_-_80rem)_/_2_+_1.5rem))] xl:pl-[max(3.5rem,calc((100cqw_+_16rem_-_80rem)_/_2_+_1.5rem_-_16rem))]">
          {/* Hauptinhalt */}
          <main className="min-w-0 pb-16 pt-10 md:pb-20 md:pt-14">
            {/* Hero */}
            <div className="border-b border-border pb-8">
              <p className="text-sm font-semibold text-primary">Claimity API</p>
              <h1 className="text-2xl md:text-3xl mt-2 font-semibold tracking-tight text-foreground">{t.heroTitle}</h1>
              <p className="text-sm mt-3 max-w-2xl text-muted-foreground">{t.heroSubtitle}</p>
            </div>

            {/* Sentinel: Sobald dieser beim Scrollen aus dem Viewport ist, gilt die Hero als "vorbei" */}
            <div ref={heroSentinelRef} className="h-px w-full" aria-hidden="true" />

            <div className="w-full max-w-full">
              <SectionComponent id="overview">
                <OverviewSectionComponent locale={locale} />
              </SectionComponent>
              <SectionComponent id="first-steps">
                <FirstStepsSectionComponent locale={locale} />
              </SectionComponent>
              <SectionComponent id="reporting">
                <ReportingSectionComponent locale={locale} />
              </SectionComponent>
              <SectionComponent id="changelog">
                <ChangeLogSectionComponent locale={locale} />
              </SectionComponent>
              <SectionComponent id="authentication">
                <AuthenticationSectionComponent locale={locale} />
              </SectionComponent>
              <SectionComponent id="api-basics">
                <ApiBasicsSectionComponent locale={locale} />
              </SectionComponent>
              <OpenApiProvider spec={spec}>
                <SectionComponent id="experts">
                  <ExpertsSectionComponent locale={locale} />
                </SectionComponent>
                <SectionComponent id="insurer">
                  <InsurerSectionComponent locale={locale} />
                </SectionComponent>
                <SectionComponent id="payloads">
                  <ClaimPayloadSection
                    locale={locale}
                    schemas={claimSchemas}
                    activePayloadKey={activePayloadKey}
                    onActivePayloadChange={handlePayloadTabChange}
                  />
                </SectionComponent>
              </OpenApiProvider>
            </div>
          </main>
        </div>
      </div>

      <div id="footer-sentinel" className="h-px" aria-hidden="true" />
      <div className="relative z-40 bg-[#1a1f2e]">
        <Footer />
      </div>
    </div>
  )
}
