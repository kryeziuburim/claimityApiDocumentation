import React from "react"
import { cn } from "@/lib/utils"

export type HeaderRow = { k: string; v: string }

export function TabButton({
  active,
  onClick,
  children,
  accentColor,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  accentColor: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border border-border/60 px-3 py-1.5 text-[11px] font-semibold transition sm:px-4 sm:text-xs",
        active ? "text-foreground " : "text-muted-foreground hover:text-foreground",
      )}
      style={active ? { backgroundColor: accentColor, borderColor: accentColor } : undefined}
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

export function CodeBlock({
  title,
  children,
  accentColor,
}: {
  title: string
  children: string | null
  accentColor: string
}) {
  if (!children) return null

  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-background/80 sm:rounded-xl">
      <div
        className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-foreground sm:px-4 sm:text-xs"
        style={{ backgroundColor: accentColor }}
      >
        {title}
      </div>
      <pre className="overflow-x-auto p-3 text-[11px] leading-relaxed text-muted-foreground sm:p-4 sm:text-xs">
        <code className="font-mono text-foreground">{children}</code>
      </pre>
    </div>
  )
}
