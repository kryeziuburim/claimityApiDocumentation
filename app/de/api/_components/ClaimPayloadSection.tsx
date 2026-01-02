"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Anchor,
  BadgeCheck,
  Car,
  Check,
  ClipboardCheck,
  Download,
  FileJson,
  Info,
  Loader2,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

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

const VALIDATION_ENDPOINT = "https://app.claimity.ch/v1/insurers/claims:validate"
const VALIDATION_PROXY_PATH = "/api/claims/validate"

type ValidationResult = {
  valid: boolean
  errors: Record<string, string[]> | null
}

type ValidationState =
  | { status: "idle" }
  | { status: "running" }
  | { status: "error"; message: string; statusCode?: number }
  | { status: "success"; statusCode: number; data: ValidationResult }

type ClaimPayloadSectionProps = {
  activePayloadKey?: string
  onActivePayloadChange?: (key: string) => void
}

export function ClaimPayloadSection({
  activePayloadKey,
  onActivePayloadChange,
}: ClaimPayloadSectionProps = {}) {
  const [internalActive, setInternalActive] = useState<string>(CLAIM_PAYLOADS[0]?.key ?? "")
  const [schemas, setSchemas] = useState<Record<string, SchemaLoadState>>(() => {
    const base: Record<string, SchemaLoadState> = {}
    CLAIM_PAYLOADS.forEach((payload) => {
      base[payload.key] = { loading: true, schema: null, error: null }
    })
    return base
  })
  const { toast } = useToast()
  const [copiedExample, setCopiedExample] = useState<string | null>(null)
  const [testCategory, setTestCategory] = useState<string>(CLAIM_PAYLOADS[0]?.key ?? "")
  const [payloadInput, setPayloadInput] = useState<string>("")
  const [validationState, setValidationState] = useState<ValidationState>({ status: "idle" })

  const resetValidationState = useCallback(() => {
    setValidationState((previous) => (previous.status === "idle" ? previous : { status: "idle" }))
  }, [])

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
    [isControlled, onActivePayloadChange]
  )

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
      if (match) updateActive(match.key)
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [updateActive])

  useEffect(() => {
    if (!copiedExample) return
    const timeout = setTimeout(() => setCopiedExample(null), 2500)
    return () => clearTimeout(timeout)
  }, [copiedExample])

  const handleCopyJson = useCallback(
    async (payloadKey: string, payloadLabel: string, json: string) => {
      if (!json) return
      const success = await copyJsonToClipboard(json)
      toast({
        title: success ? "JSON kopiert" : "Kopieren fehlgeschlagen",
        description: success
          ? `${payloadLabel} Payload wurde in die Zwischenablage gelegt.`
          : "Bitte kopieren Sie den JSON-Inhalt manuell.",
        variant: success ? "default" : "destructive",
      })
      if (success) {
        setCopiedExample(payloadKey)
      }
    },
    [toast]
  )

  const handleTabChange = (value: string) => {
    updateActive(value)
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

  const handleTestCategoryChange = useCallback(
    (value: string) => {
      resetValidationState()
      setTestCategory(value)
    },
    [resetValidationState]
  )

  const handleInsertExample = useCallback(() => {
    const schema = schemas[testCategory]?.schema
    const meta = CLAIM_PAYLOADS.find((item) => item.key === testCategory)
    if (!schema) {
      toast({
        title: "Schema nicht verfügbar",
        description: "Für diese Kategorie konnte das Schema noch nicht geladen werden.",
        variant: "destructive",
      })
      return
    }
    const example = buildExamplePayload(schema)
    if (!example) {
      toast({
        title: "Kein Beispiel gefunden",
        description: "Das Schema enthält kein Beispiel-JSON für diese Kategorie.",
        variant: "destructive",
      })
      return
    }
    setPayloadInput(JSON.stringify(example, null, 2))
    resetValidationState()
    toast({
      title: "Beispiel übernommen",
      description: `${meta?.label ?? "Kategorie"} Beispiel wurde in das Eingabefeld kopiert.`,
    })
  }, [schemas, testCategory, toast, resetValidationState])

  const handleResetPayload = useCallback(() => {
    setPayloadInput("")
    resetValidationState()
  }, [resetValidationState])

  const handleValidatePayload = useCallback(async () => {
    const trimmed = payloadInput.trim()
    if (!trimmed) {
      setValidationState({ status: "error", message: "Bitte geben Sie ein Payload JSON ein." })
      return
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(trimmed)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unbekannter Parserfehler"
      setValidationState({
        status: "error",
        message: `JSON konnte nicht geparst werden: ${errorMessage}`,
      })
      return
    }

    const formatted = JSON.stringify(parsed, null, 2)
    if (formatted !== payloadInput) {
      setPayloadInput(formatted)
    }

    setValidationState({ status: "running" })

    try {
      const response = await fetch(VALIDATION_PROXY_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Category: testCategory,
          PayloadJson: formatted,
        }),
      })

      let body: any = null
      try {
        body = await response.json()
      } catch {
        body = null
      }

      if (!response.ok) {
        const detail = body?.detail ?? body?.title ?? body?.message ?? body?.error
        setValidationState({
          status: "error",
          statusCode: response.status,
          message: detail ? String(detail) : `Request fehlgeschlagen (HTTP ${response.status}).`,
        })
        return
      }

      const normalized = normalizeValidationResponse(body)
      setValidationState({
        status: "success",
        statusCode: response.status,
        data: normalized,
      })
    } catch (error) {
      setValidationState({
        status: "error",
        message: error instanceof Error ? error.message : "Netzwerkfehler bei der Validierung.",
      })
    }
  }, [payloadInput, testCategory])

  const validationIsLoading = validationState.status === "running"
  const responseStatusLabel =
    validationState.status === "idle"
      ? "Bereit"
      : validationState.status === "running"
        ? "lädt …"
        : typeof validationState.statusCode === "number"
          ? `HTTP ${validationState.statusCode}`
          : "--"

  const validationPanel = (() => {
    if (validationState.status === "running") {
      return (
        <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm font-medium">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>Validierung läuft …</span>
        </div>
      )
    }
    if (validationState.status === "error") {
      return (
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Validierung fehlgeschlagen</AlertTitle>
          <AlertDescription className="space-y-2 text-sm">
            <p>{validationState.message}</p>
            {typeof validationState.statusCode === "number" ? (
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                HTTP {validationState.statusCode}
              </p>
            ) : null}
          </AlertDescription>
        </Alert>
      )
    }
    if (validationState.status === "success") {
      const { data, statusCode } = validationState
      const errorEntries = Object.entries(data.errors ?? {})
      return (
        <div className="space-y-4">
          <Alert
            variant={data.valid ? "default" : "destructive"}
            className={data.valid ? "border-primary/40 bg-primary/10" : "border-destructive/50 bg-destructive/10"}
          >
            {data.valid ? <ShieldCheck className="h-4 w-4 text-primary" /> : <ShieldAlert className="h-4 w-4" />}
            <AlertTitle>{data.valid ? "Payload ist valide" : "Payload verletzt Validierungsregeln"}</AlertTitle>
            <AlertDescription className="space-y-2 text-sm">
              <p>
                {data.valid
                  ? "Der Validator hat keine Schemaabweichungen gefunden."
                  : "Mindestens eine Regel des Schemas wurde verletzt. Die Details finden Sie unten."}
              </p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">HTTP {statusCode}</p>
            </AlertDescription>
          </Alert>
          {errorEntries.length ? (
            <div className="space-y-3">
              {errorEntries.map(([field, messages]) => (
                <div key={field} className="rounded-2xl border border-border/40 bg-background/80 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{field}</p>
                  <ul className="mt-2 space-y-1 text-sm text-foreground">
                    {messages.map((message, index) => (
                      <li key={`${field}-${index}`} className="flex gap-2 text-pretty">
                        <span className="text-primary">•</span>
                        <span>{message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : !data.valid ? (
            <p className="rounded-2xl border border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
              Die API meldete eine ungültige Payload, lieferte aber keine Fehlereinträge zurück.
            </p>
          ) : null}
        </div>
      )
    }
    return (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>Die Antwort der Validierungs-API erscheint hier.</p>
        <ol className="list-decimal space-y-1 pl-4 text-xs">
          <li>Kategorie wählen</li>
          <li>Payload JSON einfügen oder Beispiel übernehmen</li>
          <li>Payload validieren</li>
        </ol>
      </div>
    )
  })()

  if (!CLAIM_PAYLOADS.length) return null

  return (
    <div id="claim-payloads" className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Fall-Struktur & Validierung</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Jede Kategorie beschreibt präzise, welche Felder das payloadJson enthalten darf.
        </p>
      </div>

      <Tabs value={resolvedActive} onValueChange={handleTabChange} className="space-y-6">
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
                              onClick={() => void handleCopyJson(payload.key, payload.label, exampleJson)}
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
                      <Accordion type="multiple" defaultValue={[]}>
                        <AccordionItem value="example" className="border-border/40 px-6">
                          <AccordionTrigger className="text-base font-semibold">
                            <span className="inline-flex items-center gap-2">
                              <FileJson className="h-4 w-4 text-primary" />
                              Beispiel-JSON
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-1">
                            {exampleJson ? (
                              <div className="relative">
                                <ScrollArea className="h-[360px] rounded-2xl border border-border/60">
                                  <button
                                    type="button"
                                    onClick={() => void handleCopyJson(payload.key, payload.label, exampleJson)}
                                    className={cn(
                                      "block w-full rounded-2xl bg-background/90 p-4 text-left text-xs leading-relaxed text-foreground transition hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                                      copiedExample === payload.key && "ring-2 ring-primary/60"
                                    )}
                                    aria-label={`${payload.label} Beispiel-JSON kopieren`}
                                  >
                                    <pre className="min-w-full whitespace-pre overflow-x-auto text-left">{exampleJson}</pre>
                                  </button>
                                </ScrollArea>
                                <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-background/95 px-3 py-1 text-[11px] font-medium text-foreground shadow">
                                  {copiedExample === payload.key ? (
                                    <>
                                      <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                                      <span className="text-primary">Kopiert</span>
                                    </>
                                  ) : (
                                    <span className="text-muted-foreground">Zum Kopieren klicken</span>
                                  )}
                                </span>
                              </div>
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
                            <SchemaExplorer
                              spec={schema}
                              schema={schema}
                              title="Payload Schema"
                              maxDepth={6}
                              fieldLinks={PAYLOAD_FIELD_LINKS}
                            />
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

      <section
        id="claim-payload-validation"
        className="space-y-6 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm"
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight">PayloadJson direkt testen</h3>
          <p className="text-sm text-muted-foreground">
            Senden Sie eine Anfrage an die Claimity Validierungs-API und erhalten Sie sofortiges Feedback zu Ihrem Payload.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payload-category-select">Kategorie</Label>
              <Select value={testCategory} onValueChange={handleTestCategoryChange}>
                <SelectTrigger id="payload-category-select" className="h-11 rounded-2xl border-border/70">
                  <SelectValue placeholder="Kategorie wählen" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {CLAIM_PAYLOADS.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payload-json-editor">Payload JSON</Label>
              <Textarea
                id="payload-json-editor"
                value={payloadInput}
                onChange={(event) => {
                  resetValidationState()
                  setPayloadInput(event.currentTarget.value)
                }}
                spellCheck={false}
                rows={16}
                className="rounded-2xl border-border/70 font-mono text-[13px] leading-relaxed"
                placeholder='{}'
              />
              <p className="text-xs text-muted-foreground">
                Erwartet eine gültige JSON-Struktur.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" className="gap-2" onClick={() => void handleValidatePayload()} disabled={validationIsLoading}>
                {validationIsLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Validierung läuft …</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>Payload validieren</span>
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={handleInsertExample}
                disabled={!schemas[testCategory]?.schema || validationIsLoading}
              >
                <FileJson className="h-4 w-4" />
                Beispiel übernehmen
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="gap-2"
                onClick={handleResetPayload}
                disabled={!payloadInput || validationIsLoading}
              >
                <SquareStack className="h-4 w-4" />
                Eingabe leeren
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">Antwort</p>
              <Badge variant="outline" className="rounded-full border-border/60 text-xs">
                {responseStatusLabel}
              </Badge>
            </div>
            {validationPanel}
          </div>
        </div>
      </section>
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
      if (getDriverConflict(entry.not)) {
        return
      }
      rules.push({
        type: "not",
        condition: "Nicht erlaubt",
        details: [describeRuleNot(entry.not)],
      })
    }
  })
  const driverSummaryRule = buildDriverAtIncidentSummary(schema)
  if (driverSummaryRule) {
    rules.unshift(driverSummaryRule)
  }
  return rules
}

function buildDriverAtIncidentSummary(schema: any): ClaimRule | null {
  const details: string[] = []

  const insuredLimit = describeDriverYesLimit(
    "Versicherte",
    "insured",
    schema?.properties?.insured,
    "insuredPersons",
    schema?.properties?.insuredPersons
  )
  if (insuredLimit) details.push(insuredLimit)

  const counterpartyLimit = describeDriverYesLimit(
    "Gegenpartei",
    "counterparty",
    schema?.properties?.counterparty,
    "counterpartyPersons",
    schema?.properties?.counterpartyPersons
  )
  if (counterpartyLimit) details.push(counterpartyLimit)

  return details.length
    ? {
        type: "if",
        condition: "driverAtIncident – Personenanzahl",
        details,
      }
    : null
}

function describeDriverYesLimit(
  contextLabel: string,
  objectName: string,
  objectSchema: any,
  arrayName: string,
  arraySchema: any
): string | null {
  if (!objectSchema || !arraySchema) return null
  const restrictsDriverYes = arraySchema?.contains?.properties?.driverAtIncident?.const === "yes"
  const maxContains = typeof arraySchema?.maxContains === "number" ? arraySchema.maxContains : undefined
  const minContains = typeof arraySchema?.minContains === "number" ? arraySchema.minContains : undefined
  if (!restrictsDriverYes || maxContains === undefined || maxContains < 1) return null
  const optionalNote = !minContains || minContains <= 0 ? " (auch keine)" : ""
  const limitText = maxContains === 1 ? "höchstens eine Person" : `höchstens ${maxContains} Personen`
  return `${contextLabel}: In ${objectName} und ${arrayName}[] darf ${limitText} driverAtIncident = "yes" sein${optionalNote}.`
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

function describeRuleCondition(condition: any, parentPath = ""): string {
  if (!condition) return "spezielle Bedingung"
  const parts: string[] = []

  if (condition.properties && typeof condition.properties === "object") {
    Object.entries(condition.properties).forEach(([prop, schema]) => {
      const propPath = parentPath ? `${parentPath}.${prop}` : prop
      parts.push(...describeSchemaRequirements(propPath, schema))
    })
  }

  if (Array.isArray(condition.required) && condition.required.length && !condition.properties) {
    parts.push(`Felder ${condition.required.join(", ")} vorhanden`)
  }

  if (condition.contains) {
    const arrayPath = parentPath || "Array"
    parts.push(describeArrayContains(arrayPath, condition))
  }

  const comboChildren = [...(condition.allOf ?? []), ...(condition.anyOf ?? []), ...(condition.oneOf ?? [])]
  comboChildren.forEach((child: any) => {
    const described = describeRuleCondition(child, parentPath)
    if (described && described !== "spezielle Bedingung") {
      parts.push(described)
    }
  })

  return parts.length ? parts.join(" und ") : "spezielle Bedingung"
}

function describeSchemaRequirements(path: string, schema: any): string[] {
  if (!schema) return []
  const facts: string[] = []

  if (schema.const !== undefined) {
    facts.push(`${path} = ${formatSchemaValue(schema.const)}`)
  } else if (Array.isArray(schema.enum) && schema.enum.length) {
    facts.push(`${path} ∈ (${schema.enum.join(", ")})`)
  }

  if (Array.isArray(schema.required) && schema.required.length) {
    schema.required.forEach((requiredKey: string) => {
      const requirementPath = path ? `${path}.${requiredKey}` : requiredKey
      facts.push(`Pflichtfeld ${requirementPath}`)
    })
  }

  if (schema.contains) {
    facts.push(describeArrayContains(path, schema))
  }

  if (schema.properties && typeof schema.properties === "object") {
    Object.entries(schema.properties).forEach(([child, childSchema]) => {
      const childPath = `${path}.${child}`
      facts.push(...describeSchemaRequirements(childPath, childSchema))
    })
  }

  return facts
}

function describeArrayContains(path: string, schema: any): string {
  const minContains = typeof schema.minContains === "number" ? schema.minContains : undefined
  const maxContains = typeof schema.maxContains === "number" ? schema.maxContains : undefined
  let descriptor: string

  if (minContains !== undefined && maxContains !== undefined && minContains === maxContains) {
    descriptor = minContains === 1 ? "genau ein" : `genau ${minContains}`
  } else if (minContains !== undefined && maxContains !== undefined) {
    const minPart = minContains > 0 ? (minContains === 1 ? "mindestens ein" : `mindestens ${minContains}`) : undefined
    const maxPart = maxContains === 1 ? "höchstens ein" : `höchstens ${maxContains}`
    descriptor = [minPart, maxPart].filter(Boolean).join(" und ")
  } else if (minContains !== undefined) {
    descriptor = minContains <= 0 ? "mindestens ein" : minContains === 1 ? "mindestens ein" : `mindestens ${minContains}`
  } else if (maxContains !== undefined) {
    descriptor = maxContains === 1 ? "höchstens ein" : `höchstens ${maxContains}`
  } else {
    descriptor = "mindestens ein"
  }

  const elementLabel = descriptor === "genau ein" || descriptor === "mindestens ein" || descriptor === "höchstens ein" ? "Element" : "Elemente"
  const requirement = describeRuleCondition(schema.contains, `${path}[]`)
  const useDarf = descriptor.startsWith("höchstens")
  const verb = useDarf ? "darf" : "muss"
  const optionalNote = useDarf && (minContains === undefined || minContains <= 0) ? " (auch keines)" : ""

  return `${path}[] ${verb} ${descriptor} ${elementLabel}${optionalNote} enthalten, bei dem ${requirement}`
}

function formatSchemaValue(value: any): string {
  if (value === null) return "null"
  if (typeof value === "string") return `"${value}"`
  return String(value)
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
  const driverConflict = describeDriverConflict(node)
  if (driverConflict) {
    return driverConflict
  }
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

type DriverSegment = {
  subject: string
  kind: "object" | "array"
}

type DriverConflict = {
  objectSegment: DriverSegment
  arraySegment: DriverSegment
}

function describeDriverConflict(node: any): string | null {
  const conflict = getDriverConflict(node)
  if (!conflict) return null
  return `"yes" darf nicht gleichzeitig in ${formatDriverSegment(conflict.objectSegment)} und ${formatDriverSegment(conflict.arraySegment)} vorkommen.`
}

function getDriverConflict(node: any): DriverConflict | null {
  if (!Array.isArray(node?.allOf) || node.allOf.length !== 2) return null
  const segments = node.allOf.map((segment: any) => extractDriverSegment(segment))
  if (segments.some((segment: DriverSegment | null) => segment === null)) return null
  const typedSegments = segments as DriverSegment[]
  const objectSegment = typedSegments.find((segment) => segment.kind === "object")
  const arraySegment = typedSegments.find((segment) => segment.kind === "array")
  if (!objectSegment || !arraySegment) return null
  return { objectSegment, arraySegment }
}

function extractDriverSegment(segment: any): DriverSegment | null {
  if (!segment?.properties) return null
  for (const [key, schema] of Object.entries(segment.properties)) {
    const typed = schema as any
    if (typed?.properties?.driverAtIncident?.const === "yes") {
      return { subject: key, kind: "object" }
    }
    if (typed?.contains?.properties?.driverAtIncident?.const === "yes") {
      return { subject: key, kind: "array" }
    }
  }
  return null
}

function formatDriverSegment(segment: DriverSegment): string {
  return segment.kind === "object" ? `${segment.subject}.driverAtIncident` : `${segment.subject}[].driverAtIncident`
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

function normalizeValidationResponse(payload: any): ValidationResult {
  const validValue = typeof payload?.Valid === "boolean" ? payload.Valid : Boolean(payload?.valid)
  const errors = normalizeValidationErrors(payload?.Errors ?? payload?.errors)
  return {
    valid: validValue,
    errors,
  }
}

function normalizeValidationErrors(errors: any): Record<string, string[]> | null {
  if (!errors || typeof errors !== "object") {
    return null
  }
  const normalized: Record<string, string[]> = {}
  Object.entries(errors).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      normalized[key] = value.map((entry) => String(entry))
      return
    }
    if (value === undefined || value === null) {
      return
    }
    normalized[key] = [String(value)]
  })
  return Object.keys(normalized).length ? normalized : null
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
