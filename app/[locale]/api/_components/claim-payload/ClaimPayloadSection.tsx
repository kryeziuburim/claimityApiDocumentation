"use client"

import { useCallback, useEffect, useState, useMemo } from "react"
import { BadgeCheck, Car, Cog, ShieldAlert, SquareStack, type LucideIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Locale } from "@/lib/i18n"
import type { JsonSchema } from "@/lib/json-schema"
import { scrollToAnchor } from "@/lib/scroll-to-anchor"

import { claimPayloadMessages } from "./ClaimPayloadSection.messages"
import { PayloadCategoryPanel } from "./PayloadCategoryPanel"
import { PayloadTester } from "./PayloadTester"
import { getClaimPayloads } from "./payloads"
import { claimSchemaStates } from "./schema-state"
import { useCopyJson } from "./useCopyJson"

const PAYLOAD_ICONS: Record<string, LucideIcon> = {
  vehicle: Car,
  appraiser: BadgeCheck,
  fraud: ShieldAlert,
  special: Cog,
}

type ClaimPayloadSectionProps = {
  locale: Locale
  /** Dereferenced claim schemas by category key, loaded at build time. */
  schemas: Record<string, JsonSchema>
  activePayloadKey?: string
  onActivePayloadChange?: (key: string) => void
}

export function ClaimPayloadSection({
  locale,
  schemas: schemaData,
  activePayloadKey,
  onActivePayloadChange,
}: ClaimPayloadSectionProps) {
  const t = claimPayloadMessages[locale]
  const claimPayloads = getClaimPayloads(locale)
  const [internalActive, setInternalActive] = useState<string>(claimPayloads[0]?.key ?? "")
  const schemas = useMemo(
    () => claimSchemaStates(claimPayloads, schemaData, t.schemaLoadError),
    [claimPayloads, schemaData, t],
  )
  const { copiedKey, copy } = useCopyJson(t)

  const isControlled = activePayloadKey !== undefined && activePayloadKey !== null
  const resolvedActive = (isControlled ? (activePayloadKey as string) : internalActive) ?? ""

  const updateActive = useCallback(
    (value: string, { notifyParent = true }: { notifyParent?: boolean } = {}) => {
      if (!isControlled) {
        setInternalActive((prev) => (prev === value ? prev : value))
      }
      if (notifyParent) {
        onActivePayloadChange?.(value)
      }
    },
    [isControlled, onActivePayloadChange],
  )

  // Deep links and hash changes to a payload anchor (e.g. /de/api/#payloads-fraud) select that tab.
  // Only the active tab's section is rendered, so the browser can't scroll to it by itself;
  // scrollToAnchor waits until it is mounted.
  useEffect(() => {
    if (typeof window === "undefined") return
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "")
      const match = claimPayloads.find((payload) => payload.anchorId === hash)
      if (!match) return
      updateActive(match.key)
      scrollToAnchor(match.anchorId)
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [claimPayloads, updateActive])

  const handleTabChange = (value: string) => {
    updateActive(value)
    const target = claimPayloads.find((item) => item.key === value)
    if (!target) return
    window.history.replaceState(null, "", `#${target.anchorId}`)
    scrollToAnchor(target.anchorId)
  }

  if (!claimPayloads.length) return null

  return (
    <div id="claim-payloads" className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl mb-4 font-bold tracking-tight text-balance">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.intro}</p>
      </div>

      <Tabs value={resolvedActive} onValueChange={handleTabChange} className="space-y-6">
        <div className="rounded-xl bg-muted p-1.5">
          <TabsList className="grid h-auto w-full grid-cols-1 gap-1 bg-transparent p-0 sm:grid-cols-2 lg:grid-cols-4">
            {claimPayloads.map((payload) => {
              const Icon = PAYLOAD_ICONS[payload.key] ?? SquareStack
              return (
                <TabsTrigger
                  key={payload.key}
                  value={payload.key}
                  className="h-auto min-h-10 w-full min-w-0 whitespace-normal rounded-lg border border-transparent bg-transparent px-3 py-2 text-center text-sm font-medium leading-tight text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-teal-900 data-[state=active]:shadow-sm"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="min-w-0">{payload.navTitle}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {claimPayloads.map((payload) => (
          // forceMount: every category is in the exported HTML (crawlable); inactive ones are hidden.
          <TabsContent
            key={payload.key}
            value={payload.key}
            forceMount
            className="space-y-6 min-w-0 data-[state=inactive]:hidden"
          >
            <PayloadCategoryPanel
              payload={payload}
              state={schemas[payload.key]}
              t={t}
              copiedKey={copiedKey}
              onCopy={copy}
            />
          </TabsContent>
        ))}
      </Tabs>

      <PayloadTester t={t} claimPayloads={claimPayloads} schemas={schemas} />
    </div>
  )
}
