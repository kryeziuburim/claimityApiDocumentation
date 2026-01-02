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
  fieldLinks?: Record<string, string>
}

export function SchemaExplorer({
  spec,
  schema,
  title,
  depth = 0,
  maxDepth = 6,
  fieldLinks,
}: SchemaExplorerProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const normalized = useMemo(() => normalizeSchemaWithRef(spec, schema), [spec, schema])

  if (!normalized) {
    return <div className="text-sm text-muted-foreground">Kein Schema vorhanden.</div>
  }

  const schemaTitle = title ?? normalized.__refName ?? "Schema"

  const props = normalized.properties ?? null

  if (!props || typeof props !== "object") {
    return (
      <div className="rounded-md border border-border bg-muted/30 p-3">
        <div className="mb-2 text-sm font-medium">{schemaTitle}</div>
        <div className="text-sm text-muted-foreground">Typ: {schemaTypeLabel(spec, normalized)}</div>
      </div>
    )
  }

  const keys = Object.keys(props)

  const isRoot = depth === 0
  const containerClasses = cn(
    "space-y-3",
    isRoot ? "rounded-lg border border-border bg-muted/30 p-4" : "rounded-md border border-border/50 bg-muted/15 p-3"
  )
  const headerClasses = cn(
    "flex items-center justify-between gap-3",
    isRoot ? "mb-3" : "mb-2 text-xs text-muted-foreground"
  )
  const bodyWrapperClasses = "overflow-x-auto"

  const renderPropertyRows = (
    currentSchema: any,
    currentTitle: string,
    currentDepth: number,
    parentPath: string
  ): React.ReactNode => {
    const currentProps = currentSchema.properties ?? {}
    const currentRequired: string[] = Array.isArray(currentSchema.required) ? currentSchema.required : []
    const propKeys = Object.keys(currentProps)

    return propKeys.map((field) => {
      const fieldSchema = currentProps[field]
      const type = schemaTypeLabel(spec, fieldSchema)
      const isReq = currentRequired.includes(field)
      const nullable = !!fieldSchema?.nullable
      const enumVals = Array.isArray(fieldSchema?.enum) ? fieldSchema.enum : null
      const fieldPath = parentPath ? `${parentPath}.${field}` : field
      const descRaw = safeString(fieldSchema?.description)
      const descNode = renderInlineLinks(descRaw)
      const enumNode =
        enumVals && enumVals.length ? (
          <div className="flex justify-start">
            <div className="flex flex-wrap gap-1 text-[11px] font-mono text-muted-foreground">
              {enumVals.map((value: string, idx: number) => {
                return (
                  <span
                    key={`${fieldPath}-enum-${idx}-${value}`}
                    className="rounded border border-border/60 bg-muted/20 px-2 py-0.5"
                  >
                    {value}
                  </span>
                )
              })}
            </div>
          </div>
        ) : null

      const canExpand =
        currentDepth < maxDepth &&
        (Boolean(fieldSchema?.$ref) ||
          fieldSchema?.type === "object" ||
          Boolean(fieldSchema?.properties) ||
          (fieldSchema?.type === "array" && (fieldSchema?.items?.$ref || fieldSchema?.items?.properties)))

      const open = !!expanded[fieldPath]
      const indentLevel = Math.max(0, currentDepth - depth)

      const toggleRow = () => setExpanded((p) => ({ ...p, [fieldPath]: !p[fieldPath] }))
      const linkHref = fieldLinks?.[fieldPath] ?? fieldLinks?.[field]

      return (
        <React.Fragment key={fieldPath}>
          <tr
            className={cn(
              "border-t border-border/60 align-top",
              canExpand && "cursor-pointer hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border"
            )}
            onClick={canExpand ? () => toggleRow() : undefined}
            onKeyDown={
              canExpand
                ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      toggleRow()
                    }
                  }
                : undefined
            }
            tabIndex={canExpand ? 0 : undefined}
            aria-expanded={canExpand ? open : undefined}
           >
            <td className="pr-3 py-2 font-mono text-xs align-top" style={{ paddingLeft: indentLevel * 16 }}>
              <div className="flex items-center gap-2">
                {canExpand ? (
                  <>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 rounded-sm border border-border/40 bg-muted/40 p-0.5 transition-transform",
                        open && "rotate-90"
                      )}
                    />
                    {linkHref ? (
                      <a
                        href={linkHref}
                        className="text-primary underline underline-offset-2"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {field}
                      </a>
                    ) : (
                      <span>{field}</span>
                    )}
                  </>
                ) : (
                  <>
                    {linkHref ? (
                      <a href={linkHref} className="text-primary underline underline-offset-2">
                        {field}
                      </a>
                    ) : (
                      <span>{field}</span>
                    )}
                  </>
                )}
              </div>
            </td>
            <td className="pr-3 py-2 font-mono text-xs align-top">{type}</td>
            <td className="pr-3 py-2 align-top text-center">{isReq ? "✓" : ""}</td>
            <td className="pr-3 py-2 align-top text-center">{nullable ? "✓" : ""}</td>
            <td className="pr-3 py-2 align-top text-left">{enumNode}</td>
          </tr>

          {canExpand && open
            ? renderChildRows(fieldSchema, childTitle(field, fieldSchema), currentDepth + 1, fieldPath)
            : null}
        </React.Fragment>
      )
    })
  }

  const renderChildRows = (
    childSchema: any,
    childLabel: string,
    nextDepth: number,
    parentPath: string
  ): React.ReactNode => {
    const expandedSchema = expandChildSchema(childSchema, spec)
    const normalizedChild = normalizeSchemaWithRef(spec, expandedSchema)
    if (!normalizedChild) {
      return (
        <tr key={`${childLabel}-${nextDepth}-empty`} className="border-t border-border/40">
          <td colSpan={6} className="pl-6 py-3 text-xs text-muted-foreground">
            Keine weiteren Felder dokumentiert.
          </td>
        </tr>
      )
    }

    if (!normalizedChild.properties || typeof normalizedChild.properties !== "object") {
      return (
        <tr key={`${childLabel}-${nextDepth}-leaf`} className="border-t border-border/40">
          <td colSpan={6} className="pl-6 py-3 text-xs text-muted-foreground">
            {childLabel}: {schemaTypeLabel(spec, normalizedChild)}
          </td>
        </tr>
      )
    }

    return renderPropertyRows(normalizedChild, childLabel, nextDepth, parentPath)
  }

  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <div className={cn(isRoot ? "text-sm font-semibold" : "text-xs font-semibold text-foreground/80")}>{schemaTitle}</div>
        <div className={cn("text-xs text-muted-foreground", !isRoot && "text-[11px]")}>Typ: {schemaTypeLabel(spec, normalized)}</div>
      </div>

      <div className={bodyWrapperClasses}>
        <table className="w-full min-w-[640px] table-auto text-left text-sm">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[18%]" />
            <col className="w-[10%]" />
            <col className="w-[10%]" />
            <col className="w-[40%]" />
          </colgroup>
          <thead className="text-xs text-muted-foreground">
            <tr className="[&>th]:pb-2 text-left">
              <th className="pr-3">Feld</th>
              <th className="pr-3">Typ</th>
              <th className="pr-3 text-center">Required</th>
              <th className="pr-3 text-center">Nullable</th>
              <th className="pr-3">Enum</th>
            </tr>
          </thead>
          <tbody>{renderPropertyRows(normalized, schemaTitle, depth, "")}</tbody>
        </table>
      </div>
    </div>
  )
}

function childTitle(field: string, schema: any) {
  // if (schema?.$ref) return `${field}: ${refName(schema.$ref)}`
  // if (schema?.type === "array" && schema?.items?.$ref) return `${field}: array<${refName(schema.items.$ref)}>`
  return field
}

function expandChildSchema(schema: any, spec: any) {
  if (!schema) return schema
  if (schema.$ref) return schema
  if (schema.type === "array") return schema.items
  return schema
}

function normalizeSchemaWithRef(spec: any, schema: any) {
  if (!schema) return null
  if (schema.$ref) {
    const resolved = resolveRef(spec, schema.$ref)
    if (!resolved) return null
    return { ...resolved, __refName: refName(schema.$ref) }
  }
  return schema
}

function renderInlineLinks(text: string) {
  if (!text) return null
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <a key={`${match.index}-${match[2]}`} href={match[2]} className="text-primary underline underline-offset-2">
        {match[1]}
      </a>
    )
    lastIndex = linkRegex.lastIndex
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts.length ? parts : text
}
