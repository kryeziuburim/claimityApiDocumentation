"use client"

import React, { useMemo, useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { refName, resolveRef, schemaTypeLabel, safeString } from "./openapi-utils"

type SchemaExplorerProps = {
  spec: any
  schema: any
  title?: string
  depth?: number
  maxDepth?: number
}

export function SchemaExplorer({
  spec,
  schema,
  title,
  depth = 0,
  maxDepth = 2,
}: SchemaExplorerProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const normalized = useMemo(() => {
    if (!schema) return null
    if (schema.$ref) {
      const resolved = resolveRef(spec, schema.$ref)
      return { ...resolved, __refName: refName(schema.$ref) }
    }
    return schema
  }, [spec, schema])

  if (!normalized) {
    return <div className="text-sm text-muted-foreground">Kein Schema vorhanden.</div>
  }

  const schemaTitle = title ?? normalized.__refName ?? "Schema"

  const props = normalized.properties ?? null
  const required: string[] = Array.isArray(normalized.required) ? normalized.required : []

  if (!props || typeof props !== "object") {
    return (
      <div className="rounded-md border border-border bg-muted/30 p-3">
        <div className="mb-2 text-sm font-medium">{schemaTitle}</div>
        <div className="text-sm text-muted-foreground">Typ: {schemaTypeLabel(spec, normalized)}</div>
      </div>
    )
  }

  const keys = Object.keys(props)

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-sm font-semibold">{schemaTitle}</div>
        <div className="text-xs text-muted-foreground">
          Typ: {schemaTypeLabel(spec, normalized)}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr className="[&>th]:pb-2">
              <th className="pr-3">Feld</th>
              <th className="pr-3">Typ</th>
              <th className="pr-3">Required</th>
              <th className="pr-3">Nullable</th>
              <th className="pr-3">Enum</th>
              <th>Beschreibung</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => {
              const s = props[k]
              const type = schemaTypeLabel(spec, s)
              const isReq = required.includes(k)
              const nullable = !!s?.nullable
              const enumVals = Array.isArray(s?.enum) ? s.enum : null
              const desc = safeString(s?.description)

              const canExpand =
                depth < maxDepth &&
                (Boolean(s?.$ref) ||
                  s?.type === "object" ||
                  Boolean(s?.properties) ||
                  (s?.type === "array" && (s?.items?.$ref || s?.items?.properties)))

              const keyId = `${schemaTitle}.${k}`
              const open = !!expanded[keyId]

              return (
                <React.Fragment key={k}>
                  <tr className="border-t border-border/60 align-top">
                    <td className="pr-3 py-2 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        {canExpand ? (
                          <button
                            type="button"
                            onClick={() => setExpanded((p) => ({ ...p, [keyId]: !p[keyId] }))}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs hover:bg-muted"
                            aria-expanded={open}
                          >
                            <ChevronRight className={cn("h-4 w-4 transition-transform", open && "rotate-90")} />
                            {k}
                          </button>
                        ) : (
                          <span>{k}</span>
                        )}
                      </div>
                    </td>
                    <td className="pr-3 py-2 font-mono text-xs">{type}</td>
                    <td className="pr-3 py-2">{isReq ? "✓" : ""}</td>
                    <td className="pr-3 py-2">{nullable ? "✓" : ""}</td>
                    <td className="pr-3 py-2">
                      {enumVals ? (
                        <span className="text-xs text-muted-foreground">
                          {enumVals.slice(0, 4).join(", ")}
                          {enumVals.length > 4 ? "…" : ""}
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="py-2 text-muted-foreground">{desc}</td>
                  </tr>

                  {canExpand && open && (
                    <tr className="border-t border-border/40">
                      <td colSpan={6} className="py-3 pl-6">
                        <SchemaExplorer
                          spec={spec}
                          schema={expandChildSchema(s, spec)}
                          title={childTitle(k, s)}
                          depth={depth + 1}
                          maxDepth={maxDepth}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function childTitle(field: string, schema: any) {
  if (schema?.$ref) return `${field}: ${refName(schema.$ref)}`
  if (schema?.type === "array" && schema?.items?.$ref) return `${field}: array<${refName(schema.items.$ref)}>`
  return field
}

function expandChildSchema(schema: any, spec: any) {
  if (!schema) return schema
  if (schema.$ref) return schema
  if (schema.type === "array") return schema.items
  return schema
}
