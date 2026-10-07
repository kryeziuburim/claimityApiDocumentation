"use client"

import { useMemo } from "react"
import { Check, ClipboardCheck, Download, FileJson, Info, ShieldAlert, ShieldCheck, SquareStack } from "lucide-react"

import { SchemaExplorer } from "@/components/api/SchemaExplorer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { buildExamplePayload } from "@/lib/claim-schema"
import { cn } from "@/lib/utils"

import type { ClaimPayloadMessages } from "./ClaimPayloadSection.messages"
import type { ClaimPayloadMeta } from "./payloads"
import { buildClaimRuleGroups, extractFormatHints } from "./schema-rules"
import { buildSchemaStats } from "./schema-stats"
import { InlineHint, PayloadLoadingSkeleton, RuleText } from "./ui"
import type { SchemaLoadState } from "./useClaimSchemas"

const PAYLOAD_FIELD_LINKS = {
  payloadJson: "#claim-payloads",
  PayloadJson: "#claim-payloads",
}

type PayloadCategoryPanelProps = {
  payload: ClaimPayloadMeta
  state: SchemaLoadState
  t: ClaimPayloadMessages
  copiedKey: string | null
  onCopy: (payloadKey: string, payloadLabel: string, json: string) => Promise<void>
}

/** One payload category: example JSON, format requirements, rules and the schema explorer. */
export function PayloadCategoryPanel({ payload, state, t, copiedKey, onCopy }: PayloadCategoryPanelProps) {
  const schema = state.schema
  // Derived from the schema; memoized so toasts and copy feedback don't re-walk the schema.
  const { ruleGroups, ruleCount, exampleJson, formatHints, stats } = useMemo(() => {
    const ruleGroups = schema ? buildClaimRuleGroups(schema, t.rules) : []
    const ruleCount = ruleGroups.reduce((total, group) => total + group.rules.length, 0)
    const examplePayload = schema ? buildExamplePayload(schema) : null
    const exampleJson = examplePayload ? JSON.stringify(examplePayload, null, 2) : ""
    const formatHints = schema ? extractFormatHints(schema, t.rules) : []
    const stats = schema ? buildSchemaStats(schema) : null
    return { ruleGroups, ruleCount, exampleJson, formatHints, stats }
  }, [schema, t])

  return (
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
                      onClick={() => void onCopy(payload.key, payload.label, exampleJson)}
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
                          onClick={() => void onCopy(payload.key, payload.label, exampleJson)}
                          className={cn(
                            "block w-full rounded-2xl bg-background/90 p-4 text-left text-xs leading-relaxed text-foreground transition hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                            copiedKey === payload.key && "ring-2 ring-primary/60"
                          )}
                          aria-label={t.copyExampleAria(payload.label)}
                        >
                          <pre className="w-full overflow-x-auto whitespace-pre text-left text-wrap text-xs">{exampleJson}</pre>
                        </button>
                      </ScrollArea>
                      <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-background/95 px-3 py-1 text-[11px] font-medium text-foreground shadow">
                        {copiedKey === payload.key ? (
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
  )
}
