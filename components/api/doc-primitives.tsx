import type React from "react"

import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"
import { methodBadgeStyle, type ColoredMethod } from "./method-colors"

export function MethodBadge({ method, className }: { method: ColoredMethod | string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 w-14 shrink-0 items-center justify-center rounded-md border font-mono text-[11px] font-semibold uppercase tracking-wide sm:w-16",
        className,
      )}
      style={methodBadgeStyle(method)}
    >
      {method}
    </span>
  )
}

/** Dark code block with a title bar and a copy button. */
export function CodeBlock({ title, children, className }: { title: string; children: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-slate-800 bg-slate-900", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 pl-4 pr-2">
        <div className="text-xs font-medium text-slate-400">{title}</div>
        <CopyButton text={children} />
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code className="font-mono text-slate-100">{children}</code>
      </pre>
    </div>
  )
}

/** Highlighted note: light brand tint with an accent bar on the left. */
export function Callout({
  title,
  children,
  className,
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("rounded-xl border border-teal-200 border-l-4 border-l-brand bg-teal-50/70 p-4 sm:p-6", className)}
    >
      {title ? <h3 className="text-base mb-3 font-semibold text-teal-950">{title}</h3> : null}
      <div className="text-sm leading-relaxed text-teal-950/90">{children}</div>
    </div>
  )
}

/** Primary call-to-action styling for links. */
export const primaryLinkClassName =
  "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export function KvpTable({ rows }: { rows: { k: string; v: React.ReactNode }[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="hidden w-full text-left text-sm sm:table">
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className="border-t border-border/60 first:border-t-0 align-top">
              <td className="w-56 bg-muted/40 px-4 py-2.5 font-mono text-xs text-muted-foreground">{r.k}</td>
              <td className="px-4 py-2.5 text-sm">{r.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="space-y-3 p-3 text-sm text-muted-foreground sm:hidden">
        {rows.map((r) => (
          <div key={`${r.k}-mobile`} className="rounded-lg border border-border/60 bg-background/80 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{r.k}</p>
            <div className="mt-2 text-sm text-foreground">{r.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
