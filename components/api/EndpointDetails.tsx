"use client"

import { useState } from "react"
import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"

import type { HttpMethod } from "./openapi-utils"
import { DEFAULT_ACCENT_COLOR, METHOD_ACCENTS } from "./endpoint-details/constants"
import { endpointDetailsMessages } from "./endpoint-details/EndpointDetails.messages"
import { ErrorsTab } from "./endpoint-details/ErrorsTab"
import { ExamplesTab } from "./endpoint-details/ExamplesTab"
import { TabButton } from "./endpoint-details/primitives"
import { RequestTab } from "./endpoint-details/RequestTab"
import { ResponseTab } from "./endpoint-details/ResponseTab"
import { useEndpointData } from "./endpoint-details/useEndpointData"

export function EndpointDetails({ method, path, className }: { method: HttpMethod; path: string; className?: string }) {
  const lang = useLocale()
  const t = endpointDetailsMessages[lang]

  const { loading, error, spec, op, grouped, requestSchema, headerRows, responses, reqExample, exampleBlocks } =
    useEndpointData(method, path)

  const [tab, setTab] = useState<"request" | "response" | "errors" | "examples">("request")
  const [selectedResponse, setActiveResponse] = useState<string | null>(null)
  const [selectedExample, setActiveExample] = useState<string | null>(null)
  const accentColor = METHOD_ACCENTS[method] ?? DEFAULT_ACCENT_COLOR

  // Derived during render: a selection that is no longer in the (spec-dependent) list falls back
  // to none / the first example, without an effect that re-syncs the state.
  const activeResponse =
    selectedResponse && responses.some(([code]) => code === selectedResponse) ? selectedResponse : null
  const activeExample =
    selectedExample && exampleBlocks.some((block) => block.key === selectedExample)
      ? selectedExample
      : (exampleBlocks[0]?.key ?? null)

  if (loading) {
    return <div className={cn("text-sm text-muted-foreground", className)}>{t.loading}</div>
  }
  if (error) {
    return (
      <div className={cn("rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm", className)}>
        {t.error} <span className="font-mono">{error}</span>
      </div>
    )
  }
  if (!op) {
    return (
      <div className={cn("rounded-md border border-border bg-muted/30 p-3 text-sm text-muted-foreground", className)}>
        {t.notFound}{" "}
        <span className="font-mono">
          {method} {path}
        </span>{" "}
        {t.found}
      </div>
    )
  }

  return (
    <div className={cn("mt-2 sm:mt-3", className)}>
      <div className="mb-3 flex flex-wrap items-center gap-1.5 sm:mb-4 sm:gap-2">
        <TabButton active={tab === "request"} onClick={() => setTab("request")} accentColor={accentColor}>
          Request
        </TabButton>
        <TabButton active={tab === "response"} onClick={() => setTab("response")} accentColor={accentColor}>
          Response
        </TabButton>
        <TabButton active={tab === "errors"} onClick={() => setTab("errors")} accentColor={accentColor}>
          Errors
        </TabButton>
        <TabButton active={tab === "examples"} onClick={() => setTab("examples")} accentColor={accentColor}>
          Examples
        </TabButton>
      </div>

      {tab === "request" && (
        <RequestTab
          t={t}
          spec={spec}
          headerRows={headerRows}
          grouped={grouped}
          requestSchema={requestSchema}
          reqExample={reqExample}
          accentColor={accentColor}
        />
      )}

      {tab === "response" && (
        <ResponseTab
          t={t}
          spec={spec}
          responses={responses}
          activeResponse={activeResponse}
          setActiveResponse={setActiveResponse}
          accentColor={accentColor}
        />
      )}

      {tab === "errors" && <ErrorsTab t={t} responses={responses} />}

      {tab === "examples" && (
        <ExamplesTab
          exampleBlocks={exampleBlocks}
          activeExample={activeExample}
          setActiveExample={setActiveExample}
          accentColor={accentColor}
        />
      )}
    </div>
  )
}
