"use client"

import React, { useEffect, useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { SchemaExplorer } from "./SchemaExplorer"
import {
  HttpMethod,
  generateExample,
  getOperation,
  getServersBaseUrl,
  listParameters,
  pickJsonSchemaFromContent,
  prettyJson,
} from "./openapi-utils"
import { useOpenApi } from "./OpenApiProvider"

const METHOD_ACCENTS: Partial<Record<HttpMethod, string>> = {
  GET: "#E1EDFF",
  POST: "#E4F7EE",
  PUT: "#FFF1DC",
  PATCH: "#FFF1DC",
  DELETE: "#FFE5E5",
}
const DEFAULT_ACCENT_COLOR = "#2a8289"
const SCHEMA_EXPLORER_MAX_DEPTH = 6

type HeaderRow = { k: string; v: string }

export function EndpointDetails({
  method,
  path,
  className,
}: {
  method: HttpMethod
  path: string
  className?: string
}) {
  const ctx = useOpenApi()
  const spec = ctx.spec

  const op = useMemo(() => (spec ? getOperation(spec, method, path) : null), [spec, method, path])
  const baseUrl = useMemo(() => (spec ? getServersBaseUrl(spec) : null) ?? "https://app.claimity.ch", [spec])

  const params = useMemo(() => listParameters(op), [op])

  const grouped = useMemo(() => {
    const g: Record<string, any[]> = { path: [], query: [], header: [] }
    for (const p of params) {
      if (p?.in && g[p.in]) g[p.in].push(p)
    }
    return g
  }, [params])

  const requestSchema = useMemo(() => {
    const content = op?.requestBody?.content
    return pickJsonSchemaFromContent(content)
  }, [op])

  const headerRows = useMemo<HeaderRow[]>(() => {
    const rows: HeaderRow[] = [
      { k: "Accept", v: "application/json" },
      { k: "Authorization", v: "DPoP {access_token}" },
      { k: "DPoP", v: "{dpop_proof_jwt}" },
    ]
    if (requestSchema) {
      rows.push({ k: "Content-Type", v: "application/json" })
    }
    return rows
  }, [requestSchema])

  const responses = useMemo(() => {
    const entries = Object.entries((op?.responses ?? {}) as Record<string, any>) as [string, any][]
    entries.sort(([a], [b]) => {
      if (a === "default") return 1
      if (b === "default") return -1
      return Number(a) - Number(b)
    })
    return entries
  }, [op])

  const reqExample = useMemo(
    () => (spec && requestSchema ? generateExample(spec, requestSchema) : null),
    [spec, requestSchema]
  )

  const exampleBlocks = useMemo(
    () => [
      {
        key: "curl",
        title: "cURL",
        content: buildCurl({ baseUrl, method, path, hasBody: !!requestSchema }),
      },
      {
        key: "js",
        title: "JavaScript (fetch)",
        content: buildFetch({ baseUrl, method, path, hasBody: !!requestSchema }),
      },
      {
        key: "py",
        title: "Python (requests)",
        content: buildPython({ baseUrl, method, path, hasBody: !!requestSchema }),
      },
    ],
    [baseUrl, method, path, requestSchema]
  )

  const [tab, setTab] = useState<"request" | "response" | "errors" | "examples">("request")
  const [activeResponse, setActiveResponse] = useState<string | null>(null)
  const [activeExample, setActiveExample] = useState<string | null>(() => (exampleBlocks[0] ? exampleBlocks[0].key : null))
  const accentColor = METHOD_ACCENTS[method] ?? DEFAULT_ACCENT_COLOR

  useEffect(() => {
    if (responses.length === 0) {
      setActiveResponse(null)
      return
    }
    setActiveResponse((prev) => {
      if (prev && responses.some(([code]) => code === prev)) {
        return prev
      }
      return null
    })
  }, [responses])

  useEffect(() => {
    if (exampleBlocks.length === 0) {
      setActiveExample(null)
      return
    }
    setActiveExample((prev) => {
      if (prev && exampleBlocks.some((block) => block.key === prev)) {
        return prev
      }
      return exampleBlocks[0].key
    })
  }, [exampleBlocks])

  if (ctx.loading) {
    return <div className={cn("text-sm text-muted-foreground", className)}>Lade OpenAPI…</div>
  }
  if (ctx.error) {
    return (
      <div className={cn("rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm", className)}>
        OpenAPI konnte nicht geladen werden: <span className="font-mono">{ctx.error}</span>
      </div>
    )
  }
  if (!op) {
    return (
      <div className={cn("rounded-md border border-border bg-muted/30 p-3 text-sm text-muted-foreground", className)}>
        Keine OpenAPI-Definition für <span className="font-mono">{method} {path}</span> gefunden.
      </div>
    )
  }

  return (
    <div className={cn("mt-3", className)}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <TabButton active={tab === "request"} onClick={() => setTab("request")} accentColor={accentColor}>
          Request
        </TabButton>
        <TabButton active={tab === "response"} onClick={() => setTab("response")} accentColor={accentColor}>
          Response
        </TabButton>
        <TabButton active={tab === "errors"} onClick={() => setTab("errors")} accentColor={accentColor}>
          Errors
        </TabButton>
        <TabButton active={tab === "examples"} onClick={() => setTab("examples")} accentColor={accentColor}>
          Examples
        </TabButton>
      </div>

      {tab === "request" && (
        <div className="space-y-4">
          <DetailBlock title="Headers">
            <HeaderList rows={headerRows} />
          </DetailBlock>

          {grouped.path.length > 0 && (
            <DetailBlock title="Path-Parameter">
              <ParamTable params={grouped.path} />
            </DetailBlock>
          )}

          {grouped.query.length > 0 && (
            <DetailBlock title="Query-Parameter">
              <ParamTable params={grouped.query} />
            </DetailBlock>
          )}

          {requestSchema && spec && (
            <DetailBlock title="Request Body">
              <SchemaExplorer
                spec={spec}
                schema={requestSchema}
                title="Request Schema"
                maxDepth={SCHEMA_EXPLORER_MAX_DEPTH}
              />
               <CodeBlock title="Beispiel-Body" accentColor={accentColor}>
                 {reqExample ? prettyJson(reqExample) : null}
               </CodeBlock>
            </DetailBlock>
          )}
        </div>
      )}

      {tab === "response" && (
        <div className="space-y-4">
          {responses.map(([code, resp]) => {
            const schema = pickJsonSchemaFromContent(resp?.content)
            const example = spec && schema ? generateExample(spec, schema) : null
            const isOpen = activeResponse === code

            return (
              <div key={code} className="overflow-hidden rounded-2xl border border-border/60 bg-muted/15">
                <button
                  type="button"
                  onClick={() => setActiveResponse((prev) => (prev === code ? null : code))}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  aria-expanded={isOpen}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Response {code}</p>
                    {resp?.description ? (
                      <p className="text-sm text-muted-foreground">{resp.description}</p>
                    ) : null}
                  </div>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                </button>

                {isOpen ? (
                  <div className="border-t border-border/40 bg-card/80 p-4">
                    {schema && spec ? (
                      <div className="space-y-3">
                        <SchemaExplorer
                          spec={spec}
                          schema={schema}
                          title="Response Schema"
                          maxDepth={SCHEMA_EXPLORER_MAX_DEPTH}
                        />
                        <CodeBlock title="Beispiel-Response" accentColor={accentColor}>
                          {example ? prettyJson(example) : null}
                        </CodeBlock>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Kein JSON-Schema dokumentiert.</div>
                    )}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      )}

      {tab === "errors" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Diese Sektion zeigt alle Responses, die einen Fehler anzeigen.
          </p>
          <DetailBlock title="Fehlermatrix">
            <ErrorMatrix responses={responses} />
          </DetailBlock>
        </div>
      )}

      {tab === "examples" && (
        <div className="space-y-4">
          {exampleBlocks.map(({ key, title, content }) => {
            const isOpen = activeExample === key
            return (
              <div key={key} className="overflow-hidden rounded-2xl border border-border/60 bg-muted/15">
                <button
                  type="button"
                  onClick={() => setActiveExample(key)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-foreground"
                  aria-expanded={isOpen}
                  style={{ backgroundColor: accentColor }}
                >
                  <span>{title}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen ? (
                  <pre className="border-t border-border/40 bg-background/90 p-4 text-xs leading-relaxed text-muted-foreground">
                    <code className="font-mono text-foreground">{content}</code>
                  </pre>
                ) : null}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function TabButton({
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
        "rounded-md border border-border/60 px-4 py-1.5 text-xs font-semibold transition",
        active ? "text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
      )}
      style={active ? { backgroundColor: accentColor, borderColor: accentColor } : undefined}
    >
      {children}
    </button>
  )
}

function DetailBlock({
  title,
  description,
  children,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
      <div className="mb-3 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function HeaderList({ rows }: { rows: HeaderRow[] }) {
  return (
    <div className="grid gap-2">
      {rows.map((row) => (
        <div
          key={row.k}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/70 px-3 py-2"
        >
          <span className="font-mono text-xs text-muted-foreground">{row.k}</span>
          <span className="font-mono text-xs text-foreground">{row.v}</span>
        </div>
      ))}
    </div>
  )
}

function ParamTable({ params }: { params: any[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 bg-background/80">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-muted-foreground">
          <tr className="[&>th]:px-3 [&>th]:py-2">
            <th>Name</th>
            <th>Typ</th>
            <th>Required</th>
            <th>Default</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={`${p.in}-${p.name}`} className="border-t border-border/40">
              <td className="px-3 py-2 font-mono text-xs">{p.name}</td>
              <td className="px-3 py-2 font-mono text-xs">
                {p.schema?.type}
                {p.schema?.format ? ` (${p.schema.format})` : ""}
              </td>
              <td className="px-3 py-2">{p.required ? "✓" : ""}</td>
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                {p.schema?.default != null ? String(p.schema.default) : ""}
              </td>
              <td className="px-3 py-2 text-sm text-muted-foreground">{p.description ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeBlock({ title, children, accentColor }: { title: string; children: string | null; accentColor: string }) {
  if (!children) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/80">
      <div
        className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground"
        style={{ backgroundColor: accentColor }}
      >
        {title}
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-muted-foreground">
        <code className="font-mono text-foreground">{children}</code>
      </pre>
    </div>
  )
}

function ErrorMatrix({ responses }: { responses: [string, any][] }) {
  const errors = responses.filter(([code]) => code === "default" || Number(code) >= 400)
  if (!errors.length) return <div className="text-sm text-muted-foreground">Keine Error-Responses dokumentiert.</div>

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 bg-background/80">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-muted-foreground">
          <tr className="[&>th]:px-3 [&>th]:py-2">
            <th>Status</th>
            <th>Beschreibung</th>
            <th>Schema</th>
          </tr>
        </thead>
        <tbody>
          {errors.map(([code, resp]) => {
            const schema = resp?.content ? (resp.content["application/json"]?.schema ?? null) : null
            const schemaLabel = schema?.$ref ? schema.$ref.split("/").pop() : schema?.type ?? ""
            return (
              <tr key={code} className="border-t border-border/40">
                <td className="px-3 py-2 font-mono text-xs">{code}</td>
                <td className="px-3 py-2 text-sm text-muted-foreground">{resp?.description ?? ""}</td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{schemaLabel}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function buildCurl({
  baseUrl,
  method,
  path,
  hasBody,
}: {
  baseUrl: string
  method: string
  path: string
  hasBody: boolean
}) {
  const url = `${baseUrl}${path}`.replace(/\{[^}]+\}/g, "REPLACE_ME")
  const body = hasBody ? " \\\n+  -H 'Content-Type: application/json' \\\n+  -d '{...}'" : ""
  return `curl -X ${method} \\\n+  '${url}' \\\n+  -H 'Accept: application/json' \\\n+  -H 'Authorization: DPoP {access-token}' \\\n+  -H 'DPoP: {dpop_proof_jwt}'${body}`
}

function buildFetch({
  baseUrl,
  method,
  path,
  hasBody,
}: {
  baseUrl: string
  method: string
  path: string
  hasBody: boolean
}) {
  const url = `${baseUrl}${path}`.replace(/\{[^}]+\}/g, "REPLACE_ME")
  const body = hasBody ? `,\n  body: JSON.stringify({ /* ... */ })` : ""
  const ct = hasBody ? `,\n    "Content-Type": "application/json"` : ""
  return `const res = await fetch("${url}", {\n  method: "${method}",\n  headers: {\n    "Accept": "application/json",\n    "Authorization": "DPoP ${"{accessToken}"}",\n    "DPoP": "{dpop_proof_jwt}"${ct}\n  }${body}\n});\n\nconst data = await res.json();`
}

function buildPython({
  baseUrl,
  method,
  path,
  hasBody,
}: {
  baseUrl: string
  method: string
  path: string
  hasBody: boolean
}) {
  const url = `${baseUrl}${path}`.replace(/\{[^}]+\}/g, "REPLACE_ME")
  const dataLine = hasBody ? `\npayload = { }\n` : ""
  const jsonArg = hasBody ? `, json=payload` : ""
  const ctHeader = hasBody ? `,\n  "Content-Type": "application/json"` : ""
  return `import requests\n\nurl = "${url}"\nheaders = {\n  "Accept": "application/json",\n  "Authorization": "DPoP <access-token>",\n  "DPoP": "{dpop_proof_jwt}"${ctHeader}\n}\n${dataLine}res = requests.request("${method}", url, headers=headers${jsonArg})\nprint(res.status_code)\nprint(res.text)`
}
