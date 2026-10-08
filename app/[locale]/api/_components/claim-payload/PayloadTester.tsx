"use client"

import { useCallback, useState } from "react"
import { Eraser, FileJson, Loader2, ShieldCheck } from "lucide-react"

import { MethodBadge } from "@/components/api/doc-primitives"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { buildExamplePayload } from "@/lib/claim-schema"
import { isRecord } from "@/lib/json-schema"

import type { ClaimPayloadMessages } from "./ClaimPayloadSection.messages"
import type { ClaimPayloadMeta } from "./payloads"
import type { SchemaLoadState } from "./schema-state"
import {
  normalizeValidationErrors,
  normalizeValidationResponse,
  VALIDATION_ENDPOINT,
  type ValidationState,
} from "./validation"
import { ValidationResultView } from "./ValidationResultView"

const VALIDATION_PATH = new URL(VALIDATION_ENDPOINT).pathname

type PayloadTesterProps = {
  t: ClaimPayloadMessages
  claimPayloads: ClaimPayloadMeta[]
  schemas: Record<string, SchemaLoadState>
}

/** "Test payload" section: pick a category, paste JSON and validate it against the live endpoint. */
export function PayloadTester({ t, claimPayloads, schemas }: PayloadTesterProps) {
  const { toast } = useToast()
  const [testCategory, setTestCategory] = useState<string>(claimPayloads[0]?.key ?? "")
  const [payloadInput, setPayloadInput] = useState<string>("")
  const [validationState, setValidationState] = useState<ValidationState>({ status: "idle" })

  const resetValidationState = useCallback(() => {
    setValidationState((previous) => (previous.status === "idle" ? previous : { status: "idle" }))
  }, [])

  const handleTestCategoryChange = useCallback(
    (value: string) => {
      resetValidationState()
      setTestCategory(value)
    },
    [resetValidationState],
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

      let body: unknown = null
      try {
        body = await response.json()
      } catch {
        body = null
      }

      if (!response.ok) {
        const errorBody = isRecord(body) ? body : undefined
        const detail = errorBody?.detail ?? errorBody?.title ?? errorBody?.message ?? errorBody?.error
        setValidationState({
          status: "error",
          statusCode: response.status,
          message: detail ? String(detail) : t.requestFailed(response.status),
          errors: normalizeValidationErrors(errorBody?.Errors ?? errorBody?.errors),
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
      // fetch only rejects on network/CORS failures; the browser's message ("Failed to fetch") is not localized.
      console.error("Claim payload validation request failed", error)
      setValidationState({
        status: "error",
        message: t.networkError,
        errors: null,
      })
    }
  }, [payloadInput, t, testCategory])

  const validationIsLoading = validationState.status === "running"
  const responseStatusLabel =
    validationState.status === "idle"
      ? t.statusReady
      : validationState.status === "running"
        ? t.statusLoading
        : typeof validationState.statusCode === "number"
          ? `HTTP ${validationState.statusCode}`
          : "--"

  return (
    <section id="claim-payload-validation" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold tracking-tight">{t.testTitle}</h3>
          <p className="text-sm text-muted-foreground">{t.testIntro}</p>
        </div>
        <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-border bg-card px-2 py-1.5 sm:self-auto">
          <MethodBadge method="POST" className="h-5 w-12 text-[10px] sm:w-12" />
          <span className="font-mono text-xs text-foreground">{VALIDATION_PATH}</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
          <Label htmlFor="payload-category-select" className="text-xs font-medium text-muted-foreground">
            {t.category}
          </Label>
          <Select value={testCategory} onValueChange={handleTestCategoryChange}>
            <SelectTrigger id="payload-category-select" className="h-8 w-full bg-background text-sm sm:w-64">
              <SelectValue placeholder={t.selectCategory} />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {claimPayloads.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex w-full gap-1 sm:ml-auto sm:w-auto">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1.5"
              onClick={handleInsertExample}
              disabled={!schemas[testCategory]?.schema || validationIsLoading}
            >
              <FileJson className="h-4 w-4" />
              {t.useExample}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1.5"
              onClick={handleResetPayload}
              disabled={!payloadInput || validationIsLoading}
            >
              <Eraser className="h-4 w-4" />
              {t.clearInput}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Editor */}
          <div className="flex min-w-0 flex-col bg-slate-900">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
              <Label htmlFor="payload-json-editor" className="text-xs font-medium text-slate-400">
                {t.payloadJsonLabel}
              </Label>
              <span className="font-mono text-[11px] text-slate-400">application/json</span>
            </div>
            <Textarea
              id="payload-json-editor"
              value={payloadInput}
              onChange={(event) => {
                resetValidationState()
                setPayloadInput(event.currentTarget.value)
              }}
              spellCheck={false}
              rows={18}
              className="field-sizing-fixed! h-[26rem] min-h-40 w-full max-w-full flex-1 resize-y overflow-auto rounded-none border-0 bg-transparent px-4 py-3 font-mono text-xs leading-relaxed text-slate-100 shadow-none placeholder:text-slate-500 focus-visible:ring-0 sm:text-[13px] dark:bg-transparent"
              placeholder="{}"
            />
            <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-400">{t.expectsValidJson}</p>
              <Button
                type="button"
                className="w-full gap-2 bg-teal-400 text-slate-950 hover:bg-teal-300 sm:w-auto"
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
            </div>
          </div>

          {/* Response */}
          <div className="flex min-w-0 flex-col border-t border-border lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
              <p className="text-xs font-medium text-muted-foreground">{t.response}</p>
              <Badge variant="outline" className="rounded-full border-border font-mono text-[11px]">
                {responseStatusLabel}
              </Badge>
            </div>
            <div className="flex-1 p-4">
              <ValidationResultView state={validationState} t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
