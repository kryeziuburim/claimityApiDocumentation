import type React from "react"

import { METHOD_COLORS, type ColoredMethod } from "./method-colors"

export function MethodBadge({ method }: { method: ColoredMethod }) {
  return (
    <span
      className="inline-flex h-7 w-14 items-center justify-center rounded-md font-mono text-[11px] font-semibold text-white sm:w-20 sm:text-xs"
      style={{ backgroundColor: METHOD_COLORS[method] }}
    >
      {method}
    </span>
  )
}

export function CodeBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/20">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="text-xs font-medium text-muted-foreground">{title}</div>
      </div>
      <pre className="overflow-x-auto p-3 text-xs">
        <code className="font-mono text-foreground">{children}</code>
      </pre>
    </div>
  )
}

export function KvpTable({ rows }: { rows: { k: string; v: React.ReactNode }[] }) {
  return (
    <div className="rounded-lg border border-border bg-muted/20">
      <table className="hidden w-full text-left text-sm sm:table">
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className="border-t border-border/60 first:border-t-0 align-top">
              <td className="w-56 px-3 py-2 font-mono text-xs text-muted-foreground">{r.k}</td>
              <td className="px-3 py-2 text-sm">{r.v}</td>
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
