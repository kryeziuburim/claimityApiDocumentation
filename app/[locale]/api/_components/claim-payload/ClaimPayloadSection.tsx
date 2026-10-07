"use client"

import { useCallback, useEffect, useState } from "react"
import {
  BadgeCheck,
  Car,
  Check,
  ClipboardCheck,
  Cog,
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { locales, type Locale } from "@/lib/i18n"
import { buildExamplePayload, dereferenceSchema } from "@/lib/claim-schema"
import { cn } from "@/lib/utils"

import { copyJsonToClipboard } from "@/lib/clipboard"

import { claimPayloadMessages } from "./ClaimPayloadSection.messages"
import { getClaimPayloads } from "./payloads"
import { buildClaimRuleGroups, extractFormatHints } from "./schema-rules"
import { buildSchemaStats } from "./schema-stats"
import { InlineHint, PayloadLoadingSkeleton, RuleText } from "./ui"
import {
  normalizeValidationErrors,
  normalizeValidationResponse,
  VALIDATION_ENDPOINT,
  type ValidationState,
} from "./validation"

type SchemaLoadState = {
  loading: boolean
  schema: any | null
  error: string | null
}

const PAYLOAD_FIELD_LINKS = {
  payloadJson: "#claim-payloads",
  PayloadJson: "#claim-payloads",
}

const PAYLOAD_ICONS: Record<string, LucideIcon> = {
  vehicle: Car,
  appraiser: BadgeCheck,
  fraud: ShieldAlert,
  special: Cog,
}

type ClaimPayloadSectionProps = {
  locale: Locale
  activePayloadKey?: string
  onActivePayloadChange?: (key: string) => void
}

export function ClaimPayloadSection({
  locale,
  activePayloadKey,
  onActivePayloadChange,
}: ClaimPayloadSectionProps) {
  const t = claimPayloadMessages[locale]
  const claimPayloads = getClaimPayloads(locale)
  const [internalActive, setInternalActive] = useState<string>(claimPayloads[0]?.key ?? "")
  const [schemas, setSchemas] = useState<Record<string, SchemaLoadState>>(() => {
    const base: Record<string, SchemaLoadState> = {}
    claimPayloads.forEach((payload) => {
      base[payload.key] = { loading: true, schema: null, error: null }
    })
    return base
  })
  const { toast } = useToast()
  const [copiedExample, setCopiedExample] = useState<string | null>(null)
  const [testCategory, setTestCategory] = useState<string>(claimPayloads[0]?.key ?? "")
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
    claimPayloads.forEach((payload) => {
      fetch(payload.schemaPath)
        .then((res) => {
          if (!res.ok) throw new Error(t.schemaLoadError(payload.label))
          return res.json()
        })
        .then((json) => {
          if (cancelled) return
          setSchemas((prev) => ({
            ...prev,
            [payload.key]: { loading: false, schema: dereferenceSchema(json), error: null },
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
  }, [claimPayloads, t])

  useEffect(() => {
    if (typeof window === "undefined") return
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "")
      const match = claimPayloads.find((payload) => payload.anchorId === hash)
      if (match) updateActive(match.key)
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [claimPayloads, updateActive])

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
        title: success ? t.copySuccessTitle : t.copyFailTitle,
        description: success ? t.copySuccessDescription(payloadLabel) : t.copyFailDescription,
        variant: success ? "default" : "destructive",
      })
      if (success) {
        setCopiedExample(payloadKey)
      }
    },
    [t, toast]
  )

  const handleTabChange = (value: string) => {
    updateActive(value)
    if (typeof window === "undefined") return
    const target = claimPayloads.find((item) => item.key === value)
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
    const meta = claimPayloads.find((item) => item.key === testCategory)
    if (!schema) {
      toast({
        title: t.schemaUnavailableTitle,
        description: t.schemaUnavailableDescription,
        variant: "destructive",
      })
      return
    }
    const example = buildExamplePayload(schema)
    if (!example) {
      toast({
        title: t.noExampleTitle,
        description: t.noExampleDescription,
        variant: "destructive",
      })
      return
    }
    setPayloadInput(JSON.stringify(example, null, 2))
    resetValidationState()
    toast({
      title: t.exampleInsertedTitle,
      description: t.exampleInsertedDescription(meta?.label),
    })
  }, [claimPayloads, schemas, testCategory, t, toast, resetValidationState])

  const handleResetPayload = useCallback(() => {
    setPayloadInput("")
    resetValidationState()
  }, [resetValidationState])

  const handleValidatePayload = useCallback(async () => {
    const trimmed = payloadInput.trim()
    if (!trimmed) {
      setValidationState({ status: "error", message: t.enterPayload })
      return
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(trimmed)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t.unknownParserError
      setValidationState({
        status: "error",
        message: t.parseError(errorMessage),
      })
      return
    }

    const formatted = JSON.stringify(parsed, null, 2)
    if (formatted !== payloadInput) {
      setPayloadInput(formatted)
    }

    setValidationState({ status: "running" })

    try {
      const response = await fetch(VALIDATION_ENDPOINT, {
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
          message: detail ? String(detail) : t.requestFailed(response.status),
          errors: normalizeValidationErrors(body?.Errors ?? body?.errors),
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
        message: error instanceof Error ? error.message : t.networkError,
        errors: null,
      })
    }
  }, [payloadInput, t, testCategory])

  const validationIsLoading = validationState.status === "running"
  const renderErrorDetails = (errors?: Record<string, string[]> | null) => {
    if (!errors) return null
    const entries = Object.entries(errors)
      .map<[string, string[]] | null>(([field, raw]) => {
        const normalized = Array.isArray(raw)
          ? raw
          : raw === undefined || raw === null
            ? []
            : [raw]
        const cleaned = normalized
          .map((msg) => String(msg).trim())
          .filter((msg) => msg.length)
        return cleaned.length ? [field, cleaned] : null
      })
      .filter((entry): entry is [string, string[]] => entry !== null)
    if (!entries.length) return null
    return (
      <div className="space-y-3">
        {entries.map(([field, messages]) => (
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
    )
  }

  const responseStatusLabel =
    validationState.status === "idle"
      ? t.statusReady
      : validationState.status === "running"
        ? t.statusLoading
        : typeof validationState.statusCode === "number"
          ? `HTTP ${validationState.statusCode}`
          : "--"

  const validationPanel = (() => {
    if (validationState.status === "running") {
      return (
        <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm font-medium">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>{t.validationRunning}</span>
        </div>
      )
    }
    if (validationState.status === "error") {
      return (
        <div className="space-y-4">
          <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>{t.validationFailed}</AlertTitle>
            <AlertDescription className="space-y-2 text-sm">
              <p>{validationState.message}</p>
              {typeof validationState.statusCode === "number" ? (
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  HTTP {validationState.statusCode}
                </p>
              ) : null}
            </AlertDescription>
          </Alert>
          {renderErrorDetails(validationState.errors)}
        </div>
      )
    }
    if (validationState.status === "success") {
      const { data, statusCode } = validationState
      const errorDetails = renderErrorDetails(data.errors)
      return (
        <div className="space-y-4">
          <Alert
            variant={data.valid ? "default" : "destructive"}
            className={data.valid ? "border-green-500/70 bg-green-500/10" : "border-destructive/50 bg-destructive/10"}
          >
            {data.valid ? <ShieldCheck className="h-4 w-4 text-primary" /> : <ShieldAlert className="h-4 w-4" />}
            <AlertTitle>{data.valid ? t.payloadValid : t.payloadInvalid}</AlertTitle>
            <AlertDescription className="space-y-2 text-sm">
              <p>
                {data.valid ? t.validatorNoDeviations : t.validatorRuleViolated}
              </p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">HTTP {statusCode}</p>
            </AlertDescription>
          </Alert>
          {errorDetails ?? (!data.valid ? (
            <p className="rounded-2xl border border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
              {t.invalidWithoutErrors}
            </p>
          ) : null)}
        </div>
      )
    }
    return (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>{t.responseAppearsHere}</p>
        <ol className="list-decimal space-y-1 pl-4 text-xs">
          {t.responseSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    )
  })()

  if (!claimPayloads.length) return null

  return (
    <div id="claim-payloads" className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          {t.intro}
        </p>
      </div>

      <Tabs value={resolvedActive} onValueChange={handleTabChange} className="space-y-6">
        <div className="sticky top-[4.25rem] z-10 mb-4 rounded-2xl border border-border/60 bg-background/90 p-2 shadow-sm backdrop-blur-sm sm:top-16 sm:mb-6 sm:p-3">
          <TabsList className="grid w-full grid-cols-1 gap-2 bg-transparent p-0 h-auto sm:grid-cols-2 lg:grid-cols-4">
            {claimPayloads.map((payload) => {
              const Icon = PAYLOAD_ICONS[payload.key] ?? SquareStack
              return (
                <TabsTrigger
                  key={payload.key}
                  value={payload.key}
                  className="h-auto min-h-10 w-full min-w-0 whitespace-normal rounded-2xl border border-transparent bg-transparent px-3 py-2 text-center text-sm leading-tight data-[state=active]:border-primary/30 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="min-w-0">{payload.navTitle}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {claimPayloads.map((payload) => {
          const state = schemas[payload.key]
          const schema = state?.schema
          const ruleGroups = schema ? buildClaimRuleGroups(schema, t.rules) : []
          const ruleCount = ruleGroups.reduce((total, group) => total + group.rules.length, 0)
          const examplePayload = schema ? buildExamplePayload(schema) : null
          const exampleJson = examplePayload ? JSON.stringify(examplePayload, null, 2) : ""
          const formatHints = schema ? extractFormatHints(schema, t.rules) : []
          const stats = schema ? buildSchemaStats(schema) : null

          return (
            <TabsContent key={payload.key} value={payload.key} className="space-y-6 min-w-0">
              <section
                id={payload.anchorId}
                className="space-y-6 rounded-3xl border border-border/60 bg-card/80 p-4 shadow-sm sm:p-6"
              >
                <div className="space-y-2 sm:flex sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
                  <div className="sm:max-w-[75%]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.category}</p>
                    <h3 className="text-2xl font-semibold tracking-tight text-balance">{payload.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t.categoryIntro(payload.badgeLabel)}
                    </p>
                  </div>
                </div>

                {state.loading ? (
                  <PayloadLoadingSkeleton label={payload.label} />
                ) : state.error ? (
                  <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
                    <ShieldAlert className="h-5 w-5" />
                    <AlertTitle>{t.schemaLoadFailed}</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                  </Alert>
                ) : schema ? (
                    <div className="space-y-6">
                      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
                        <Card className="hidden min-w-0 border-border/60 md:block">
                          <CardHeader>
                            <CardTitle className="text-base font-semibold">{t.contextTitle}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4 text-sm text-muted-foreground">
                          <p>
                            {t.contextPrefix}
                            <span className="font-medium text-foreground">{payload.label}</span>
                            {t.contextSuffix(stats?.totalFields ?? 0, stats?.requiredFields ?? 0)}
                          </p>
                          <div className="grid gap-3">
                            <InlineHint icon={Info} label={t.formatRequirements} value={formatHints.length ? t.formatHintCount(formatHints.length) : t.noSpecialRequirements} />
                            <InlineHint icon={ShieldCheck} label={t.rulesAndDependencies} value={ruleCount ? t.ruleCount(ruleCount) : t.noAdditionalRules} />
                          </div>
                        </CardContent>
                      </Card>

                        <Card className="min-w-0 border-border/60 bg-muted/40">
                          <CardHeader>
                            <CardTitle className="text-base font-semibold">{t.actionsTitle}</CardTitle>
                          </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                                className="w-full gap-2 sm:w-auto"
                                onClick={() => void handleCopyJson(payload.key, payload.label, exampleJson)}
                                disabled={!exampleJson}
                              >
                                <ClipboardCheck className="h-4 w-4" />
                                {t.copyJson}
                              </Button>
                              <Button variant="outline" size="sm" className="gap-2" asChild>
                                <a href={payload.schemaPath} download>
                                <Download className="h-4 w-4" />
                                {t.downloadSchema}
                              </a>
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {t.schemasNote}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="rounded-3xl border border-border/60 bg-background/80">
                      <Accordion type="multiple" defaultValue={[]}>
                        <AccordionItem value="example" className="border-border/40 px-4 sm:px-6">
                          <AccordionTrigger className="text-base font-semibold">
                            <span className="inline-flex items-center gap-2">
                              <FileJson className="h-4 w-4 text-primary" />
                              {t.exampleJson}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-1">
                            {exampleJson ? (
                              <div className="relative">
                                <ScrollArea className="h-[360px] max-w-full rounded-2xl border border-border/60">
                                  <button
                                    type="button"
                                    onClick={() => void handleCopyJson(payload.key, payload.label, exampleJson)}
                                    className={cn(
                                      "block w-full rounded-2xl bg-background/90 p-4 text-left text-xs leading-relaxed text-foreground transition hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                                      copiedExample === payload.key && "ring-2 ring-primary/60"
                                    )}
                                    aria-label={t.copyExampleAria(payload.label)}
                                  >
                                    <pre className="w-full overflow-x-auto whitespace-pre text-left text-wrap text-xs">{exampleJson}</pre>
                                  </button>
                                </ScrollArea>
                                <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-background/95 px-3 py-1 text-[11px] font-medium text-foreground shadow">
                                  {copiedExample === payload.key ? (
                                    <>
                                      <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                                      <span className="text-primary">{t.copied}</span>
                                    </>
                                  ) : (
                                    <span className="text-muted-foreground">{t.clickToCopy}</span>
                                  )}
                                </span>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">{t.noExample}</p>
                            )}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="formats" className="border-border/40 px-4 sm:px-6">
                          <AccordionTrigger className="text-base font-semibold">
                            <span className="inline-flex items-center gap-2">
                              <Info className="h-4 w-4 text-primary" />
                              {t.formatRequirements}
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
                              <p className="text-sm text-muted-foreground">{t.noFormatRestrictions}</p>
                            )}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="rules" className="border-border/40 px-4 sm:px-6">
                          <AccordionTrigger className="text-base font-semibold">
                            <span className="inline-flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4 text-primary" />
                              {t.rulesAndDependencies}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-6 px-1">
                            {/* Not derived from the schema: JSON Schema cannot express rules relative to the current date. */}
                            <div className="space-y-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                {t.datePlausibilityTitle}
                              </p>
                              <div className="rounded-2xl border border-border/40 bg-muted/30 p-4">
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {t.datePlausibilityRules.map((rule) => (
                                    <li key={rule} className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span className="text-pretty"><RuleText text={rule} /></span>
                                    </li>
                                  ))}
                                </ul>
                                <p className="mt-3 text-xs text-muted-foreground/80">
                                  {t.datePlausibilityNote}
                                </p>
                              </div>
                            </div>
                            {ruleGroups.length ? (
                              ruleGroups.map((group) => (
                                <div key={`${payload.key}-${group.key}`} className="space-y-3">
                                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    <RuleText text={group.title} />
                                  </p>
                                  <div className="space-y-3">
                                    {group.rules.map((rule, index) => (
                                      <div
                                        key={`${payload.key}-${group.key}-rule-${index}`}
                                        className="rounded-2xl border border-border/40 bg-muted/30 p-4"
                                      >
                                        <p className="text-sm font-semibold text-foreground">
                                          <RuleText text={rule.type === "if" ? t.ifThen(rule.condition) : rule.condition} />
                                        </p>
                                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                          {rule.details.map((detail, detailIndex) => (
                                            <li key={`${payload.key}-${group.key}-rule-${index}-${detailIndex}`} className="flex gap-2">
                                              <span className="text-primary">•</span>
                                              <span className="text-pretty"><RuleText text={detail} /></span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">{t.noValidationRules}</p>
                            )}
                          </AccordionContent>
                        </AccordionItem>

                      <AccordionItem value="schema" className="px-4 sm:px-6">
                        <AccordionTrigger className="text-base font-semibold">
                          <span className="inline-flex items-center gap-2">
                            <SquareStack className="h-4 w-4 text-primary" />
                            {t.schemaExplorer}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-1">
                          <div className="overflow-x-auto rounded-xl border border-border/40">
                            <SchemaExplorer
                              spec={schema}
                              schema={schema}
                              title={t.payloadSchemaTitle}
                              maxDepth={6}
                              fieldLinks={PAYLOAD_FIELD_LINKS}
                            />
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

      <section
        id="claim-payload-validation"
        className="space-y-6 rounded-3xl border border-border/60 bg-card/80 p-4 shadow-sm sm:p-6"
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight">{t.testTitle}</h3>
          <p className="text-sm text-muted-foreground">
            {t.testIntro}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payload-category-select">{t.category}</Label>
              <Select value={testCategory} onValueChange={handleTestCategoryChange}>
                <SelectTrigger id="payload-category-select" className="h-11 w-full rounded-2xl border-border/70">
                  <SelectValue placeholder={t.selectCategory} />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {claimPayloads.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payload-json-editor">{t.payloadJsonLabel}</Label>
              <Textarea
                id="payload-json-editor"
                value={payloadInput}
                onChange={(event) => {
                  resetValidationState()
                  setPayloadInput(event.currentTarget.value)
                }}
                spellCheck={false}
                rows={16}
                className="w-full max-w-full rounded-2xl border-border/70 font-mono text-xs leading-relaxed sm:text-[13px]"
                placeholder='{}'
              />
              <p className="text-xs text-muted-foreground">
                {t.expectsValidJson}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                className="w-full gap-2 sm:w-auto"
                onClick={() => void handleValidatePayload()}
                disabled={validationIsLoading}
              >
                {validationIsLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t.validationRunning}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>{t.validatePayload}</span>
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 sm:w-auto"
                onClick={handleInsertExample}
                disabled={!schemas[testCategory]?.schema || validationIsLoading}
              >
                <FileJson className="h-4 w-4" />
                {t.useExample}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full gap-2 sm:w-auto"
                onClick={handleResetPayload}
                disabled={!payloadInput || validationIsLoading}
              >
                <SquareStack className="h-4 w-4" />
                {t.clearInput}
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">{t.response}</p>
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
