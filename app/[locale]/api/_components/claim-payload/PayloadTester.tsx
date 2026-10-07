"use client"

/* eslint-disable @typescript-eslint/no-explicit-any -- the validation endpoint's response body is untyped. */
import { useCallback, useState } from "react"
import { FileJson, Loader2, ShieldCheck, SquareStack } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { buildExamplePayload } from "@/lib/claim-schema"

import type { ClaimPayloadMessages } from "./ClaimPayloadSection.messages"
import type { ClaimPayloadMeta } from "./payloads"
import type { SchemaLoadState } from "./useClaimSchemas"
import {
  normalizeValidationErrors,
  normalizeValidationResponse,
  VALIDATION_ENDPOINT,
  type ValidationState,
} from "./validation"
import { ValidationResultView } from "./ValidationResultView"

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
  const responseStatusLabel =
    validationState.status === "idle"
      ? t.statusReady
      : validationState.status === "running"
        ? t.statusLoading
        : typeof validationState.statusCode === "number"
          ? `HTTP ${validationState.statusCode}`
          : "--"

  return (
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
          <ValidationResultView state={validationState} t={t} />
        </div>
      </div>
    </section>
  )
}
