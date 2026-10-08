"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Menu } from "lucide-react"

import { OpenApiProvider, type OpenApiSpec } from "@/components/api/OpenApiProvider"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Locale } from "@/lib/i18n"
import type { JsonSchema } from "@/lib/json-schema"
import { scrollToAnchor } from "@/lib/scroll-to-anchor"

import { ApiSidebar, API_SIDEBAR_ID } from "./api-page/ApiSidebar"
import { useBodyScrollLock, useDesktopContentOffset, useFooterLift, usePastHero } from "./api-page/layout-hooks"
import { getApiNavigation, SIDEBAR_CHAPTERS } from "./api-page/navigation"
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
  const contentWrapperRef = useRef<HTMLDivElement | null>(null)
  const pastHero = usePastHero(heroSentinelRef)
  const footerLiftPx = useFooterLift()
  const desktopContentOffsetPx = useDesktopContentOffset(contentWrapperRef)

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

  const showSidebar = pastHero && SIDEBAR_CHAPTERS.has(childToParent[activeId] ?? activeId)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {isMobileMenuOpen ? (
        <button
          type="button"
          aria-label={t.closeMenu}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
        />
      ) : null}
      <div className="flex w-full flex-col overflow-x-hidden lg:flex-row">
        {/* Seiten-Navigation */}
        <ApiSidebar
          items={navigationItems}
          childToParent={childToParent}
          activeId={activeId}
          onNavigate={handleNavigate}
          visible={showSidebar}
          mobileOpen={isMobileMenuOpen}
          footerLiftPx={footerLiftPx}
        />

        {/* Hauptinhalt */}
        <main className="flex-1 min-w-0">
          <section className="relative overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
              <div className="absolute right-4 top-6 hidden lg:block xl:right-6">
                <LanguageSwitcher />
              </div>
              <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen((v) => !v)}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls={API_SIDEBAR_ID}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-white"
                >
                  <Menu className="h-4 w-4" />
                  {t.menu}
                </button>
                <LanguageSwitcher />
              </div>

              {/* Hero */}
              <div className="w-full">
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                  {t.heroTitle}
                </h1>
                <p className="mt-4 text-sm text-gray-600 md:text-base">{t.heroSubtitle}</p>
              </div>

              {/* Sentinel: Sobald dieser beim Scrollen aus dem Viewport ist, gilt die Hero als "vorbei" */}
              <div ref={heroSentinelRef} className="h-px w-full" aria-hidden="true" />

              <div
                ref={contentWrapperRef}
                className="mt-8 w-full max-w-full overflow-x-hidden transition-[padding] duration-300 ease-out md:mt-10"
                style={showSidebar && desktopContentOffsetPx ? { paddingLeft: desktopContentOffsetPx } : undefined}
              >
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
