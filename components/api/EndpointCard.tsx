"use client"

import React, { useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { EndpointDetails } from "@/components/api/EndpointDetails"
import type { HttpMethod } from "@/components/api/openapi-utils"

const METHOD_COLORS: Partial<Record<HttpMethod, string>> = {
  GET: "#61AFFE",
  POST: "#49CC90",
  PUT: "#FCA130",
  PATCH: "#FCA130",
  DELETE: "#F93E3E",
}

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
  const methodColor = useMemo(() => METHOD_COLORS[method] ?? "#475569", [method])
  const hasDetails = enableDetails

  const headerContent = (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center gap-3">
        <span
          className="flex h-8 w-16 items-center justify-center rounded-md font-mono text-xs font-semibold uppercase tracking-wide text-white"
          style={{ backgroundColor: methodColor }}
        >
          {method}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-semibold text-foreground">{path}</span>
          </div>

          {description ? <p className="mt-2 text-sm text-muted-foreground text-pretty">{description}</p> : null}

          {note ? (
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="rounded-md border border-border/70 bg-background/80 px-2 py-1">{note}</span>
            </div>
          ) : null}
        </div>

        {hasDetails ? (
          <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", open && "rotate-180")} />
        ) : null}
      </div>
    </div>
  )

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-muted/30 transition-shadow",
        hasDetails && open && "border-border/70"
      )}
    >
      {hasDetails ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full rounded-2xl bg-transparent p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a8289]"
          aria-expanded={open}
        >
          {headerContent}
        </button>
      ) : (
        <div className="p-4">{headerContent}</div>
      )}

      {hasDetails && open ? (
        <div className="border-t border-border bg-card/80 px-4 pb-4 pt-3">
          <EndpointDetails method={method} path={path} className="mt-2" />
        </div>
      ) : null}
    </div>
  )
}
