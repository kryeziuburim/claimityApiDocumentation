import React from "react"
import { CodeBlock as DocCodeBlock } from "@/components/api/doc-primitives"
import { cn } from "@/lib/utils"

export type HeaderRow = { k: string; v: string }

/** Container for TabButtons: a segmented control. */
export function TabBar({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 inline-flex flex-wrap gap-1 rounded-lg bg-muted p-1">{children}</div>
}

export function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:px-4",
        active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

export function DetailBlock({
  title,
  description,
  children,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 space-y-1 sm:mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">{title}</p>
        {description ? <p className="text-[11px] text-muted-foreground sm:text-xs">{description}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

export function HeaderList({ rows }: { rows: HeaderRow[] }) {
  return (
    <div className="divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60 bg-background/80">
      {rows.map((row) => (
        <div key={row.k} className="flex flex-wrap items-center justify-between gap-3 px-3 py-2">
          <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">{row.k}</span>
          <span className="font-mono text-[11px] text-foreground sm:text-xs">{row.v}</span>
        </div>
      ))}
    </div>
  )
}

export function CodeBlock({ title, children }: { title: string; children: string | null }) {
  if (!children) return null
  return <DocCodeBlock title={title}>{children}</DocCodeBlock>
}
