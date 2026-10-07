import type { LucideIcon } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

export function RuleText({ text }: { text: string }) {
  const segments = text.split("`")
  return (
    <>
      {segments.map((segment, index) =>
        index % 2 === 1 ? (
          <code
            key={index}
            className="rounded bg-background px-1 py-0.5 font-mono text-[0.85em] text-foreground"
          >
            {segment}
          </code>
        ) : (
          <span key={index}>{segment}</span>
        )
      )}
    </>
  )
}

export function InlineHint({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/50 bg-muted/30 px-4 py-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        <span>{label}</span>
      </div>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

export function PayloadLoadingSkeleton({ label }: { label: string }) {
  return (
    <div className="space-y-5 rounded-2xl border border-border/50 bg-muted/30 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <Skeleton className="mt-3 h-4 w-40" />
        </div>
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
      </div>
      <Skeleton className="h-48 rounded-2xl" />
    </div>
  )
}
