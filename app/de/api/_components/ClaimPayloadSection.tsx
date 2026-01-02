"use client"

import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { SchemaExplorer } from "@/components/api/SchemaExplorer"
import { Button } from "@/components/ui/button"

export type ClaimPayloadMeta = {
  key: string
  navTitle: string
  anchorId: string
  label: string
  schemaPath: string
  badgeLabel: string
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
    schemaPath: "/assets/schemas/vehicle-claim.schema.json",
    badgeLabel: "Fahrzeuggutachter",
  },
  {
    key: "appraiser",
    navTitle: "Sachverständiger",
    anchorId: "payloads-appraiser",
    label: "Sachverständiger",
    schemaPath: "/assets/schemas/appraiser-claim.schema.json",
    badgeLabel: "Sachverständiger",
  },
  {
    key: "fraud",
    navTitle: "Bekämpfung Versicherungsmissbrauch",
    anchorId: "payloads-fraud",
    label: "Bekämpfung Versicherungsmissbrauch",
    schemaPath: "/assets/schemas/fraud-claim.schema.json",
    badgeLabel: "Versicherungsmissbrauch",
  },
]

const PAYLOAD_FIELD_LINKS = {
  payloadJson: "#claim-payloads",
  PayloadJson: "#claim-payloads",
}

export function ClaimPayloadSection() {
  const [active, setActive] = useState<string>(CLAIM_PAYLOADS[0]?.key ?? "")
  const [schemas, setSchemas] = useState<Record<string, SchemaLoadState>>(() => {
    const base: Record<string, SchemaLoadState> = {}
    CLAIM_PAYLOADS.forEach((payload) => {
      base[payload.key] = { loading: true, schema: null, error: null }
    })
    return base
  })
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

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
    <div id="claim-payloads" className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Fall-Struktur</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Die hier aufgeführten Definitionen beschreiben die erlaubten Felder für <span className="font-mono">payloadJson</span> der Fälle je Kategorie.
        </p>
      </div>

      <div className="space-y-4">
        {CLAIM_PAYLOADS.map((payload) => {
          const state = schemas[payload.key]
          const schema = state?.schema
          const rules = schema ? buildClaimRules(schema) : []
          const examplePayload = schema ? buildExamplePayload(schema) : null
          const exampleJson = examplePayload ? JSON.stringify(examplePayload, null, 2) : ""
          const formatHints = schema ? extractFormatHints(schema) : []

          return (
            <div key={payload.key} id={payload.anchorId} className="rounded-2xl border border-border/60 bg-muted/15">
              <div className="flex w-full items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-md font-semibold uppercase tracking-wide text-foreground">{payload.label}</p>
                </div>
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
                    {exampleJson ? (
                      <div className="rounded-2xl border border-border/60 bg-muted/10 p-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleCopyJson(payload.key, exampleJson, setCopiedKey)}
                          >
                            {copiedKey === payload.key ? "Kopiert" : "JSON kopieren"}
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Enthält alle Felder dieser Kategorie in der korrekten Struktur.
                          </p>
                        </div>
                        <pre className="mt-4 max-h-[360px] overflow-auto rounded-xl bg-background/80 p-4 text-xs leading-relaxed">
                          {exampleJson}
                        </pre>
                      </div>
                    ) : null}

                    {formatHints.length ? (
                      <div className="rounded-2xl border border-border/60 bg-muted/10 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Formatvorgaben</p>
                        <div className="mt-3 space-y-2">
                          {formatHints.map((hint) => (
                            <div key={`${payload.key}-${hint.path}`} className="rounded-lg bg-background/70 p-3">
                              <p className="font-mono text-xs text-primary">{hint.path}</p>
                              <p className="text-sm text-muted-foreground">{hint.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="rounded-2xl border border-border/70 bg-muted/10 p-4">
                      <SchemaExplorer
                        spec={schema}
                        schema={schema}
                        title="Payload Schema"
                        maxDepth={6}
                        fieldLinks={PAYLOAD_FIELD_LINKS}
                      />
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

function handleCopyJson(
  payloadKey: string,
  json: string,
  setCopiedKey: Dispatch<SetStateAction<string | null>>,
) {
  if (!json) return
  const fallbackCopy = () => {
    const textarea = document.createElement("textarea")
    textarea.value = json
    textarea.style.position = "fixed"
    textarea.style.left = "-9999px"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
  }

  const copyOperation = navigator?.clipboard?.writeText
    ? navigator.clipboard.writeText(json).catch(() => fallbackCopy())
    : Promise.resolve(fallbackCopy())

  copyOperation.finally(() => {
    setCopiedKey(payloadKey)
    window.setTimeout(() => setCopiedKey(null), 2000)
  })
}

function buildExamplePayload(schema: any): any {
  if (!schema) return null
  if (schema.const !== undefined) return schema.const
  if (schema.default !== undefined) return schema.default
  if (Array.isArray(schema.examples) && schema.examples.length) return schema.examples[0]
  if (schema.example !== undefined) return schema.example

  if (Array.isArray(schema.oneOf) && schema.oneOf.length) {
    return buildExamplePayload(schema.oneOf[0])
  }

  if (Array.isArray(schema.anyOf) && schema.anyOf.length) {
    return buildExamplePayload(schema.anyOf[0])
  }

  const type = Array.isArray(schema.type) ? schema.type[0] : schema.type

  if (type === "object" || schema.properties) {
    const result: Record<string, any> = {}
    Object.entries(schema.properties ?? {}).forEach(([key, value]) => {
      result[key] = buildExamplePayload(value)
    })
    return result
  }

  if (type === "array" || schema.items) {
    const itemSchema = Array.isArray(schema.items) ? schema.items[0] : schema.items
    const sampleItem = buildExamplePayload(itemSchema)
    return sampleItem === undefined ? [] : [sampleItem]
  }

  return samplePrimitiveValue(type, schema)
}

function samplePrimitiveValue(type: string | undefined, schema: any): any {
  if (Array.isArray(schema.enum) && schema.enum.length) {
    return schema.enum[0]
  }

  if (schema.format) {
    return sampleForFormat(schema.format)
  }

  if (schema.pattern) {
    return sampleForPattern(schema.pattern)
  }

  switch (type) {
    case "string":
      return schema.minLength === 0 ? "" : "string"
    case "number":
    case "integer":
      return 0
    case "boolean":
      return true
    case "null":
      return null
    default:
      return null
  }
}

function sampleForFormat(format: string): string {
  switch (format) {
    case "date":
      return "2024-01-31"
    case "date-time":
      return "2024-01-31T10:30:00Z"
    case "time":
      return "10:30:00"
    case "email":
      return "user@example.com"
    case "uri":
      return "https://example.com"
    default:
      return `${format}-value`
  }
}

function sampleForPattern(pattern: string): string {
  if (pattern === "^([01]\\d|2[0-3]):([0-5]\\d)$") {
    return "10:30"
  }
  if (pattern === "^-?\\d+(\\.\\d+)?$") {
    return "0.00"
  }
  return "pattern-value"
}

type FormatHint = {
  path: string
  description: string
}

function extractFormatHints(schema: any): FormatHint[] {
  const registry = new Map<string, string>()
  traverseForFormats(schema, "payloadJson", registry)
  return Array.from(registry.entries()).map(([path, description]) => ({ path, description }))
}

function traverseForFormats(node: any, currentPath: string, registry: Map<string, string>) {
  if (!node) return

  const description = describeFormatDetail(node)
  if (description) {
    const existing = registry.get(currentPath)
    if (!existing) {
      registry.set(currentPath, description)
    } else if (!existing.includes(description)) {
      registry.set(currentPath, `${existing} | ${description}`)
    }
  }

  const objectEntries = Object.entries(node.properties ?? {})
  objectEntries.forEach(([key, value]) => {
    const nextPath = currentPath ? `${currentPath}.${key}` : key
    traverseForFormats(value, nextPath, registry)
  })

  const itemSchema = Array.isArray(node.items) ? node.items[0] : node.items
  if (itemSchema) {
    const nextPath = `${currentPath}[]`
    traverseForFormats(itemSchema, nextPath, registry)
  }

  const combos = [...(node.oneOf ?? []), ...(node.anyOf ?? []), ...(node.allOf ?? [])]
  combos.forEach((child: any) => traverseForFormats(child, currentPath, registry))

  if (node.then) traverseForFormats(node.then, currentPath, registry)
  if (node.else) traverseForFormats(node.else, currentPath, registry)
  if (node.if) traverseForFormats(node.if, currentPath, registry)
}

function describeFormatDetail(schema: any): string | null {
  if (schema.format) {
    switch (schema.format) {
      case "date":
        return "Datum im ISO-Format YYYY-MM-DD"
      case "date-time":
        return "Datum & Zeit im ISO-Format YYYY-MM-DDTHH:MM:SSZ"
      case "time":
        return "Zeit im Format HH:MM:SS"
      case "email":
        return "Gültige E-Mail-Adresse"
      case "uri":
        return "Gültige URL (URI)"
      default:
        return `Format "${schema.format}"`
    }
  }

  if (schema.pattern) {
    if (schema.pattern === "^([01]\\d|2[0-3]):([0-5]\\d)$") {
      return "Zeitfeld HH:MM (24h)"
    }
    if (schema.pattern === "^-?\\d+(\\.\\d+)?$") {
      return "Numerischer String (optional Nachkommastellen, Punkt als Trenner)"
    }
    return `Muss Regex ${schema.pattern} entsprechen`
  }

  return null
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
