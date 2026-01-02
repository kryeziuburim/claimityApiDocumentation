"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { SchemaExplorer } from "@/components/api/SchemaExplorer"

export type ClaimPayloadMeta = {
  key: string
  navTitle: string
  anchorId: string
  label: string
  description: string
  schemaPath: string
  badgeLabel: string
  badgeClass: string
}

type SchemaLoadState = {
  loading: boolean
  schema: any | null
  error: string | null
}

type ClaimRule = {
  type: "if" | "not"
  condition: string
  details: string[]
}

export const CLAIM_PAYLOADS: ClaimPayloadMeta[] = [
  {
    key: "vehicle",
    navTitle: "Fahrzeuggutachter",
    anchorId: "payloads-vehicle",
    label: "Fahrzeuggutachter",
    description: "Struktur für Fahrzeuggutachter-Fälle inklusive Werkstatt- und Inspection-Daten.",
    schemaPath: "/assets/schemas/vehicle-claim.schema.json",
    badgeLabel: "Fahrzeuggutachter",
    badgeClass: "bg-sky-100 text-sky-900",
  },
  {
    key: "appraiser",
    navTitle: "Sachverständiger",
    anchorId: "payloads-appraiser",
    label: "Sachverständiger",
    description: "Payload für Sachverständige (Gebäude/Haushalt) mit inspectionType-abhängigen Pflichten.",
    schemaPath: "/assets/schemas/appraiser-claim.schema.json",
    badgeLabel: "Sachverständiger",
    badgeClass: "bg-emerald-100 text-emerald-900",
  },
  {
    key: "fraud",
    navTitle: "Bekämpfung Versicherungsmissbrauch",
    anchorId: "payloads-fraud",
    label: "Bekämpfung Versicherungsmissbrauch",
    description: "Komplexe Struktur für Fälle zur Bekämpfung von Versicherungsmissbrauch inklusive Personenlisten und Fahrerabhängigkeiten.",
    schemaPath: "/assets/schemas/fraud-claim.schema.json",
    badgeLabel: "Versicherungsmissbrauch",
    badgeClass: "bg-rose-100 text-rose-900",
  },
]

export function ClaimPayloadSection() {
  const [active, setActive] = useState<string>(CLAIM_PAYLOADS[0]?.key ?? "")
  const [schemas, setSchemas] = useState<Record<string, SchemaLoadState>>(() => {
    const base: Record<string, SchemaLoadState> = {}
    CLAIM_PAYLOADS.forEach((payload) => {
      base[payload.key] = { loading: true, schema: null, error: null }
    })
    return base
  })

  useEffect(() => {
    let cancelled = false
    CLAIM_PAYLOADS.forEach((payload) => {
      fetch(payload.schemaPath)
        .then((res) => {
          if (!res.ok) throw new Error(`Schema ${payload.label} konnte nicht geladen werden.`)
          return res.json()
        })
        .then((json) => {
          if (cancelled) return
          setSchemas((prev) => ({
            ...prev,
            [payload.key]: { loading: false, schema: json, error: null },
          }))
        })
        .catch((err) => {
          if (cancelled) return
          setSchemas((prev) => ({
            ...prev,
            [payload.key]: { loading: false, schema: null, error: err.message },
          }))
        })
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "")
      const match = CLAIM_PAYLOADS.find((payload) => payload.anchorId === hash)
      if (match) setActive(match.key)
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [])

  if (!CLAIM_PAYLOADS.length) return null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Fall-Struktur</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Die hier aufgeführten Definitionen beschreiben die erlaubten Felder für <span className="font-mono">payloadJson</span> je Kategorie.
          Die Inhalte werden dynamisch aus den offiziellen JSON-Schemas geladen.
        </p>
      </div>

      <div className="space-y-4">
        {CLAIM_PAYLOADS.map((payload) => {
          const state = schemas[payload.key]
          const schema = state?.schema
          const requiredFields: string[] = Array.isArray(schema?.required) ? schema.required : []
          const objectFields = schema ? listObjectProperties(schema) : []
          const rules = schema ? buildClaimRules(schema) : []

          return (
            <div key={payload.key} id={payload.anchorId} className="rounded-2xl border border-border/60 bg-muted/15">
              <div className="flex w-full items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{payload.label}</p>
                  <p className="text-sm text-muted-foreground">{payload.description}</p>
                </div>
                <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", payload.badgeClass)}>{payload.badgeLabel}</span>
              </div>

              <div className="border-t border-border/40 bg-card/80 p-5">
                {state.loading ? (
                  <p className="text-sm text-muted-foreground">Schema wird geladen…</p>
                ) : state.error ? (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                    {state.error}
                  </div>
                ) : schema ? (
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={payload.schemaPath}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        Schema herunterladen
                      </a>
                      <span className="text-xs text-muted-foreground">{schema.title ?? "JSON Schema"}</span>
                    </div>

                    {requiredFields.length ? (
                      <div className="rounded-2xl border border-border/60 bg-muted/10 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pflichtfelder (Root)</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {requiredFields.map((field) => (
                            <span key={field} className="rounded-full bg-background/70 px-3 py-1 text-xs font-mono text-foreground">
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {objectFields.length ? (
                      <div className="rounded-2xl border border-border/60 bg-muted/10 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Wichtige Objekte</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {objectFields.map((field) => (
                            <span key={field} className="rounded-md bg-background/70 px-3 py-1 text-xs font-mono text-muted-foreground">
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="rounded-2xl border border-border/70 bg-muted/10 p-4">
                      <SchemaExplorer spec={schema} schema={schema} title="Payload Schema" maxDepth={6} />
                    </div>

                    {rules.length ? (
                      <div className="rounded-2xl border border-border/70 bg-muted/10 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Regeln & Abhängigkeiten</p>
                        <div className="mt-3 space-y-3">
                          {rules.map((rule, index) => (
                            <div key={`${payload.key}-rule-${index}`} className="rounded-lg border border-border/50 bg-background/80 p-3">
                              <p className="text-sm font-semibold text-foreground">
                                {rule.type === "if" ? `Wenn ${rule.condition}` : rule.condition}
                              </p>
                              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                {rule.details.map((detail, detailIndex) => (
                                  <li key={`${payload.key}-rule-${index}-${detailIndex}`} className="flex gap-2 text-pretty">
                                    <span className="text-primary">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function listObjectProperties(schema: any): string[] {
  if (!schema?.properties) return []
  return Object.entries(schema.properties as Record<string, any>)
    .filter(([, value]) => {
      const typed = value as any
      return typed && typeof typed === "object" && (typed.type === "object" || typed.properties)
    })
    .map(([name]) => name as string)
    .slice(0, 12)
}

function buildClaimRules(schema: any): ClaimRule[] {
  const entries = Array.isArray(schema?.allOf) ? schema.allOf : []
  const rules: ClaimRule[] = []
  entries.forEach((entry: any) => {
    if (entry?.if) {
      rules.push({
        type: "if",
        condition: describeRuleCondition(entry.if),
        details: describeRuleConsequences(entry.then),
      })
    } else if (entry?.not) {
      rules.push({
        type: "not",
        condition: "Nicht erlaubt",
        details: [describeRuleNot(entry.not)],
      })
    }
  })
  return rules
}

function describeRuleCondition(condition: any): string {
  if (!condition) return "spezielle Bedingung"
  const parts: string[] = []
  if (condition.properties) {
    Object.entries(condition.properties).forEach(([prop, value]) => {
      const typed = value as any
      if (typed?.const !== undefined) {
        parts.push(`${prop} = ${typed.const}`)
      } else if (Array.isArray(typed?.enum) && typed.enum.length) {
        parts.push(`${prop} ∈ (${typed.enum.join(", ")})`)
      } else if (Array.isArray(typed?.required) && typed.required.length) {
        parts.push(`${prop}: Pflichtfelder ${typed.required.join(", ")}`)
      } else if (typed?.properties) {
        const nested = Object.entries(typed.properties as Record<string, any>)
          .map(([child, descriptor]) => {
            if (descriptor?.const !== undefined) return `${child} = ${descriptor.const}`
            if (Array.isArray(descriptor?.enum) && descriptor.enum.length) return `${child} ∈ (${descriptor.enum.join(", ")})`
            return null
          })
          .filter(Boolean)
        if (nested.length) {
          parts.push(`${prop}.${nested.join(" & ")}`)
        }
      }
    })
  }
  if (Array.isArray(condition.required) && condition.required.length) {
    parts.push(`Felder ${condition.required.join(", ")} vorhanden`)
  }
  return parts.length ? parts.join(" und ") : "spezielle Bedingung"
}

function describeRuleConsequences(thenClause: any): string[] {
  if (!thenClause) return ["Zusätzliche Validierung erforderlich."]
  const lines: string[] = []
  if (Array.isArray(thenClause.required) && thenClause.required.length) {
    lines.push(`Pflichtfelder: ${thenClause.required.join(", ")}`)
  }
  if (thenClause.properties) {
    Object.entries(thenClause.properties).forEach(([prop, value]) => {
      const typed = value as any
      if (Array.isArray(typed?.required) && typed.required.length) {
        lines.push(`${prop}: Pflichtfelder ${typed.required.join(", ")}`)
      }
      if (Array.isArray(typed?.enum) && typed.enum.length) {
        lines.push(`${prop}: Wert ∈ (${typed.enum.join(", ")})`)
      }
    })
  }
  return lines.length ? lines : ["Zusätzliche Anforderungen gelten."]
}

function describeRuleNot(node: any): string {
  if (node?.allOf) {
    const segments = node.allOf
      .map((segment: any) => describeRuleCondition(segment))
      .filter(Boolean)
    if (segments.length) {
      return `Kombination aus ${segments.join(" + ")}`
    }
  }
  if (node?.properties || node?.required) {
    return describeRuleCondition(node)
  }
  return "Kombination nicht zulässig"
}
