"use client"

import React, { useMemo, useState } from "react"
import { ChevronDown, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { EndpointDetails } from "@/components/api/EndpointDetails"
import type { HttpMethod } from "@/components/api/openapi-utils"

type EndpointCardProps = {
  method: HttpMethod
  path: string
  label: string
  description?: string

  /** Optional: standardmäßig Details-Renderer aktivieren */
  enableDetails?: boolean
  /** Optional: Details initial offen */
  defaultOpen?: boolean
  /** Optional: zusätzliche Hinweise oberhalb der Details (z.B. "Nur Expertenrolle") */
  note?: string
}

export function EndpointCard({
  method,
  path,
  label,
  description,
  enableDetails = true,
  defaultOpen = false,
  note,
}: EndpointCardProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const [copied, setCopied] = useState(false)

  const pillClass = useMemo(() => {
    switch (method) {
      case "GET":
        return "bg-primary/10 text-primary"
      case "POST":
        return "bg-accent/10 text-accent"
      case "PUT":
      case "PATCH":
        return "bg-primary/10 text-primary"
      case "DELETE":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }, [method])

  const codeLine = `${method} ${path}`

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(codeLine)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // no-op (Clipboard kann z.B. in manchen Browser-Contexts blockiert sein)
    }
  }

  return (
    <div className="rounded-lg border border-border bg-muted/30">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-semibold break-all">{codeLine}</span>
            <span className={cn("rounded-full px-2 py-1 text-xs font-medium", pillClass)}>{label}</span>
          </div>

          {description ? (
            <p className="mt-2 text-sm text-muted-foreground text-pretty">{description}</p>
          ) : null}

          {note ? (
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="rounded-md bg-background px-2 py-1 ring-1 ring-border">{note}</span>
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs",
              "hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            )}
            aria-label="Endpoint kopieren"
            title="Kopieren"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Kopiert" : "Copy"}
          </button>

          {enableDetails ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs",
                "hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              )}
              aria-expanded={open}
            >
              Details
              <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
            </button>
          ) : null}
        </div>
      </div>

      {/* Details */}
      {enableDetails && open ? (
        <div className="border-t border-border px-4 pb-4">
          <EndpointDetails method={method} path={path} className="mt-4" />
        </div>
      ) : null}
    </div>
  )
}
