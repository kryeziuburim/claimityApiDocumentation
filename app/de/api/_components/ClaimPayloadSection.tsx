"use client"

import { useEffect, useState } from "react"
import {
  Anchor,
  BadgeCheck,
  Car,
  ClipboardCheck,
  Download,
  FileJson,
  Info,
  ListTree,
  ShieldAlert,
  ShieldCheck,
  SquareStack,
  type LucideIcon,
} from "lucide-react"
import { SchemaExplorer } from "@/components/api/SchemaExplorer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

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

type SchemaStats = {
  totalFields: number
  requiredFields: number
  objectNodes: number
  arrayNodes: number
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

const PAYLOAD_ICONS: Record<string, LucideIcon> = {
  vehicle: Car,
  appraiser: BadgeCheck,
  fraud: ShieldAlert,
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
  const { toast } = useToast()

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

  const handleTabChange = (value: string) => {
    setActive(value)
    if (typeof window === "undefined") return
    const target = CLAIM_PAYLOADS.find((item) => item.key === value)
    if (!target) return
    const hash = `#${target.anchorId}`
    window.history.replaceState(null, "", hash)
    if (typeof document !== "undefined") {
      const node = document.getElementById(target.anchorId)
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  if (!CLAIM_PAYLOADS.length) return null

  return (
    <div id="claim-payloads" className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Fall-Struktur & Validierung</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Jede Kategorie beschreibt präzise, welche Felder das payloadJson enthalten darf.
        </p>
      </div>

      <Tabs value={active} onValueChange={handleTabChange} className="space-y-6">
        <div className="sticky top-16 z-10 rounded-2xl border border-border/60 bg-background/80 p-3 backdrop-blur">
          <TabsList className="flex w-full flex-wrap gap-2 bg-transparent p-0">
            {CLAIM_PAYLOADS.map((payload) => {
              const Icon = PAYLOAD_ICONS[payload.key] ?? SquareStack
              return (
                <TabsTrigger
                  key={payload.key}
                  value={payload.key}
                  className="min-w-[160px] rounded-2xl border border-transparent bg-transparent data-[state=active]:border-primary/30 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  <span>{payload.navTitle}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {CLAIM_PAYLOADS.map((payload) => {
          const state = schemas[payload.key]
          const schema = state?.schema
          const rules = schema ? buildClaimRules(schema) : []
          const examplePayload = schema ? buildExamplePayload(schema) : null
          const exampleJson = examplePayload ? JSON.stringify(examplePayload, null, 2) : ""
          const formatHints = schema ? extractFormatHints(schema) : []
          const stats = schema ? buildSchemaStats(schema) : null
          const keyObjects = stats ? Math.max(stats.objectNodes - 1, 0) : 0

          return (
            <TabsContent key={payload.key} value={payload.key} className="space-y-6">
              <section
                id={payload.anchorId}
                className="space-y-6 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Kategorie</p>
                    <h3 className="text-2xl font-semibold tracking-tight text-balance">{payload.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Diese Struktur richtet sich an Payloads für die Kategorie {payload.badgeLabel}.
                    </p>
                  </div>
                </div>

                {state.loading ? (
                  <PayloadLoadingSkeleton label={payload.label} />
                ) : state.error ? (
                  <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
                    <ShieldAlert className="h-5 w-5" />
                    <AlertTitle>Schema konnte nicht geladen werden</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                  </Alert>
                ) : schema ? (
                  <div className="space-y-6">
                    {stats ? (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[
                          {
                            label: "Felder",
                            value: stats.totalFields,
                            description: "Gesamtzahl dokumentierter Felder",
                            icon: ListTree,
                          },
                          {
                            label: "Pflichtfelder",
                            value: stats.requiredFields,
                            description: "Muss in jedem Payload vorhanden sein",
                            icon: ShieldCheck,
                          },
                          {
                            label: "Schlüsselobjekte",
                            value: keyObjects,
                            description: "Verschachtelte Objektstrukturen",
                            icon: SquareStack,
                          },
                        ].map((card) => (
                          <Card
                            key={`${payload.key}-${card.label}`}
                            className="border-border/60 bg-gradient-to-br from-background to-muted/40"
                          >
                            <CardHeader className="px-6">
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                {card.label}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between gap-4 px-6">
                              <div>
                                <p className="text-3xl font-semibold">{card.value}</p>
                                <p className="text-sm text-muted-foreground">{card.description}</p>
                              </div>
                              <div className="rounded-2xl border border-border/60 bg-background/80 p-3 text-primary">
                                <card.icon className="h-5 w-5" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : null}

                    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
                      <Card className="border-border/60">
                        <CardHeader>
                          <CardTitle className="text-base font-semibold">Kontext & Hinweise</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                          <p>
                            Die Payload-Kategorie <span className="font-medium text-foreground">{payload.label}</span> umfasst
                            {" "}
                            {stats?.totalFields ?? 0} dokumentierte Felder sowie {stats?.requiredFields ?? 0} Pflichtfelder.
                          </p>
                          <div className="grid gap-3">
                            <InlineHint icon={Info} label="Formatvorgaben" value={formatHints.length ? `${formatHints.length} Besonderheiten` : "Keine speziellen Vorgaben"} />
                            <InlineHint icon={ShieldCheck} label="Regeln & Abhängigkeiten" value={rules.length ? `${rules.length} definierte Regeln` : "Keine zusätzlichen Regeln"} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-border/60 bg-muted/40">
                        <CardHeader>
                          <CardTitle className="text-base font-semibold">Aktionen & Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              className="gap-2"
                              onClick={async () => {
                                const success = await copyJsonToClipboard(exampleJson)
                                toast({
                                  title: success ? "JSON kopiert" : "Kopieren fehlgeschlagen",
                                  description: success
                                    ? `${payload.label} Payload wurde in die Zwischenablage gelegt.`
                                    : "Bitte kopieren Sie den JSON-Inhalt manuell.",
                                  variant: success ? "default" : "destructive",
                                })
                              }}
                              disabled={!exampleJson}
                            >
                              <ClipboardCheck className="h-4 w-4" />
                              JSON kopieren
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2" asChild>
                              <a href={payload.schemaPath} download>
                                <Download className="h-4 w-4" />
                                Schema herunterladen
                              </a>
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Alle Schemas liegen als JSON-Dateien vor und können direkt in Validierungswerkzeuge importiert werden.
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="rounded-3xl border border-border/60 bg-background/80">
                      <Accordion type="multiple" defaultValue={["example", "schema"]}>
                        <AccordionItem value="example" className="border-border/40 px-6">
                          <AccordionTrigger className="text-base font-semibold">
                            <span className="inline-flex items-center gap-2">
                              <FileJson className="h-4 w-4 text-primary" />
                              Beispiel-JSON
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-1">
                            {exampleJson ? (
                              <ScrollArea className="max-h-[360px] rounded-2xl border border-border/60">
                                <pre className="min-w-full whitespace-pre rounded-2xl bg-background/90 p-4 text-xs leading-relaxed text-foreground">
                                  {exampleJson}
                                </pre>
                              </ScrollArea>
                            ) : (
                              <p className="text-sm text-muted-foreground">Kein Beispiel verfügbar.</p>
                            )}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="formats" className="border-border/40 px-6">
                          <AccordionTrigger className="text-base font-semibold">
                            <span className="inline-flex items-center gap-2">
                              <Info className="h-4 w-4 text-primary" />
                              Formatvorgaben
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-3 px-1">
                            {formatHints.length ? (
                              formatHints.map((hint) => (
                                <div
                                  key={`${payload.key}-${hint.path}`}
                                  className="rounded-2xl border border-border/40 bg-muted/30 p-4"
                                >
                                  <p className="font-mono text-xs text-primary">{hint.path}</p>
                                  <p className="text-sm text-muted-foreground">{hint.description}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">Keine speziellen Formatbeschränkungen dokumentiert.</p>
                            )}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="rules" className="border-border/40 px-6">
                          <AccordionTrigger className="text-base font-semibold">
                            <span className="inline-flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4 text-primary" />
                              Regeln & Abhängigkeiten
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4 px-1">
                            {rules.length ? (
                              rules.map((rule, index) => (
                                <div
                                  key={`${payload.key}-rule-${index}`}
                                  className="rounded-2xl border border-border/40 bg-muted/30 p-4"
                                >
                                  <p className="text-sm font-semibold text-foreground">
                                    {rule.type === "if" ? `Wenn ${rule.condition}` : rule.condition}
                                  </p>
                                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                    {rule.details.map((detail, detailIndex) => (
                                      <li key={`${payload.key}-rule-${index}-${detailIndex}`} className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span className="text-pretty">{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">Für dieses Schema sind keine zusätzlichen Validierungsregeln hinterlegt.</p>
                            )}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="schema" className="px-6">
                          <AccordionTrigger className="text-base font-semibold">
                            <span className="inline-flex items-center gap-2">
                              <SquareStack className="h-4 w-4 text-primary" />
                              Schema Explorer
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-1">
                            <div className="rounded-2xl border border-border/60 bg-muted/20 p-2">
                              <ScrollArea className="max-h-[520px]">
                                <div className="pr-4">
                                  <SchemaExplorer
                                    spec={schema}
                                    schema={schema}
                                    title="Payload Schema"
                                    maxDepth={6}
                                    fieldLinks={PAYLOAD_FIELD_LINKS}
                                  />
                                </div>
                              </ScrollArea>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                ) : null}
              </section>
            </TabsContent>
          )
        })}
      </Tabs>
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

function buildSchemaStats(schema: any): SchemaStats {
  const stats: SchemaStats = {
    totalFields: 0,
    requiredFields: 0,
    objectNodes: 0,
    arrayNodes: 0,
  }
  const visited = new WeakSet<object>()
  collectSchemaStats(schema, stats, visited)
  return stats
}

function collectSchemaStats(node: any, stats: SchemaStats, visited: WeakSet<object>) {
  if (!node || typeof node !== "object") return
  if (visited.has(node)) return
  visited.add(node)

  const type = Array.isArray(node.type) ? node.type[0] : node.type
  if (type === "object" || node.properties) {
    stats.objectNodes += 1
  }
  if (type === "array" || node.items) {
    stats.arrayNodes += 1
  }

  if (Array.isArray(node.required)) {
    stats.requiredFields += node.required.length
  }

  const props = node.properties ?? {}
  stats.totalFields += Object.keys(props).length

  Object.values(props).forEach((child) => collectSchemaStats(child, stats, visited))

  const itemSchema = Array.isArray(node.items) ? node.items[0] : node.items
  if (itemSchema) collectSchemaStats(itemSchema, stats, visited)

  const combos = [...(node.oneOf ?? []), ...(node.anyOf ?? []), ...(node.allOf ?? [])]
  combos.forEach((combo) => collectSchemaStats(combo, stats, visited))

  if (node.then) collectSchemaStats(node.then, stats, visited)
  if (node.else) collectSchemaStats(node.else, stats, visited)
  if (node.if) collectSchemaStats(node.if, stats, visited)
}

async function copyJsonToClipboard(json: string): Promise<boolean> {
  if (!json) return false
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

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(json)
    } else {
      fallbackCopy()
    }
    return true
  } catch {
    fallbackCopy()
    return false
  }
}

function InlineHint({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/50 bg-muted/30 px-4 py-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        <span>{label}</span>
      </div>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

function PayloadLoadingSkeleton({ label }: { label: string }) {
  return (
    <div className="space-y-5 rounded-2xl border border-border/50 bg-muted/30 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <Skeleton className="mt-3 h-4 w-40" />
        </div>
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
      </div>
      <Skeleton className="h-48 rounded-2xl" />
    </div>
  )
}
