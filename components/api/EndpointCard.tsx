"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { EndpointDetails } from "@/components/api/EndpointDetails"
import type { HttpMethod } from "@/components/api/openapi-utils"
import { MethodBadge } from "@/components/api/doc-primitives"

type EndpointCardProps = {
  method: HttpMethod
  path: string
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
  description,
  enableDetails = true,
  defaultOpen = false,
  note,
}: EndpointCardProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const hasDetails = enableDetails

  const headerContent = (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center gap-2 sm:gap-3">
        <MethodBadge method={method} className="self-start sm:mt-px" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-semibold text-foreground sm:text-sm">{path}</span>
          </div>

          {description ? (
            <p className="mt-2 text-xs text-muted-foreground text-pretty sm:text-sm">{description}</p>
          ) : null}

          {note ? (
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="rounded-md border border-border/70 bg-background/80 px-2 py-1">{note}</span>
            </div>
          ) : null}
        </div>

        {hasDetails ? (
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 self-start text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        ) : null}
      </div>
    </div>
  )

  return (
    <div
      className={cn(
        "rounded-xl border border-border/70 bg-card transition-[border-color,box-shadow]",
        hasDetails && (open ? "border-brand/60 shadow-sm" : "hover:border-border hover:shadow-sm"),
      )}
    >
      {hasDetails ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full rounded-xl bg-transparent p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:p-5"
          aria-expanded={open}
        >
          {headerContent}
        </button>
      ) : (
        <div className="p-4 sm:p-5">{headerContent}</div>
      )}

      {/* Always rendered (hidden while collapsed) so the details are part of the exported HTML. */}
      {hasDetails ? (
        <div hidden={!open} className="border-t border-border px-4 pb-5 pt-3 sm:px-5">
          <EndpointDetails method={method} path={path} className="mt-2" />
        </div>
      ) : null}
    </div>
  )
}
