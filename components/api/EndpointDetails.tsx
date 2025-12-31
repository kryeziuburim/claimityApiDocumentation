"use client"

import React, { useMemo, useState } from "react"
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
  const s = ctx.spec

  const op = useMemo(() => (s ? getOperation(s, method, path) : null), [s, method, path])
  const baseUrl = useMemo(() => (s ? getServersBaseUrl(s) : null) ?? "https://app.claimity.ch", [s])

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

  const responses = useMemo(() => {
    // OpenAPI typings sind hier absichtlich "loose", weil die Spec aus JSON kommt.
    // Ohne Cast inferred TS `{}` und blockiert Zugriffe wie `resp.content`.
    const r = (op?.responses ?? {}) as Record<string, any>
    const entries = Object.entries(r) as [string, any][]
    // status codes first, then default
    entries.sort(([a], [b]) => {
      if (a === "default") return 1
      if (b === "default") return -1
      return Number(a) - Number(b)
    })
    return entries
  }, [op])

  const reqExample = useMemo(() => (s && requestSchema ? generateExample(s, requestSchema) : null), [s, requestSchema])

  const [tab, setTab] = useState<"request" | "response" | "errors" | "examples">("request")

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
    <div className={cn("mt-3 rounded-lg border border-border bg-card p-4", className)}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <TabButton active={tab === "request"} onClick={() => setTab("request")}>Request</TabButton>
        <TabButton active={tab === "response"} onClick={() => setTab("response")}>Response</TabButton>
        <TabButton active={tab === "errors"} onClick={() => setTab("errors")}>Errors</TabButton>
        <TabButton active={tab === "examples"} onClick={() => setTab("examples")}>Examples</TabButton>
      </div>

      {tab === "request" && (
        <div className="space-y-5">
          <SectionTitle>Headers</SectionTitle>
          <KeyValueTable
            rows={[
              { k: "Accept", v: "application/json" },
              { k: "Authorization", v: "Bearer {access-token}" },
              { k: "Content-Type", v: requestSchema ? "application/json" : "-" },
            ]}
          />

          {grouped.path.length > 0 && (
            <>
              <SectionTitle>Path-Parameter</SectionTitle>
              <ParamTable params={grouped.path} />
            </>
          )}

          {grouped.query.length > 0 && (
            <>
              <SectionTitle>Query-Parameter</SectionTitle>
              <ParamTable params={grouped.query} />
            </>
          )}

          {requestSchema && s && (
            <>
              <SectionTitle>Request Body</SectionTitle>
              <SchemaExplorer spec={s} schema={requestSchema} title="Request Schema" />
              <CodeBlock title="Beispiel-Body (generiert)">{prettyJson(reqExample)}</CodeBlock>
            </>
          )}
        </div>
      )}

      {tab === "response" && (
        <div className="space-y-5">
          {responses.map(([code, resp]) => {
            const schema = pickJsonSchemaFromContent(resp?.content)
            const example = s && schema ? generateExample(s, schema) : null

            return (
              <div key={code} className="rounded-lg border border-border bg-muted/20 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="font-mono text-sm font-semibold">{code}</div>
                  <div className="text-xs text-muted-foreground">{resp?.description ?? ""}</div>
                </div>

                {schema && s ? (
                  <div className="space-y-3">
                    <SchemaExplorer spec={s} schema={schema} title="Response Schema" />
                    <CodeBlock title="Beispiel-Response (generiert)">{prettyJson(example)}</CodeBlock>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">Kein JSON-Schema dokumentiert.</div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {tab === "errors" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Diese Sektion zeigt alle nicht-2xx Responses aus der OpenAPI. (Empfehlung: überall konsistent `ProblemDetails` / `ValidationProblemDetails`.)
          </p>
          <ErrorMatrix responses={responses} />
        </div>
      )}

      {tab === "examples" && (
        <div className="space-y-4">
          <CodeBlock title="cURL">
            {buildCurl({ baseUrl, method, path, hasBody: !!requestSchema })}
          </CodeBlock>
          <CodeBlock title="JavaScript (fetch)">
            {buildFetch({ baseUrl, method, path, hasBody: !!requestSchema })}
          </CodeBlock>
          <CodeBlock title="Python (requests)">
            {buildPython({ baseUrl, method, path, hasBody: !!requestSchema })}
          </CodeBlock>
        </div>
      )}
    </div>
  )
}

function TabButton({
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
      className={cn(
        "rounded-md px-3 py-1.5 text-sm transition-colors",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "bg-muted/40 text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="text-sm font-semibold">{children}</h4>
}

function KeyValueTable({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-muted/20">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className="border-t border-border/60 first:border-t-0">
              <td className="w-44 px-3 py-2 font-mono text-xs text-muted-foreground">{r.k}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ParamTable({ params }: { params: any[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-muted/20">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-muted-foreground">
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
            <tr key={`${p.in}-${p.name}`} className="border-t border-border/60">
              <td className="px-3 py-2 font-mono text-xs">{p.name}</td>
              <td className="px-3 py-2 font-mono text-xs">
                {p.schema?.type}{p.schema?.format ? ` (${p.schema.format})` : ""}
              </td>
              <td className="px-3 py-2">{p.required ? "✓" : ""}</td>
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                {p.schema?.default != null ? String(p.schema.default) : ""}
              </td>
              <td className="px-3 py-2 text-muted-foreground">{p.description ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/20">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="text-xs font-medium text-muted-foreground">{title}</div>
      </div>
      <pre className="overflow-x-auto p-3 text-xs">
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  )
}

function ErrorMatrix({ responses }: { responses: [string, any][] }) {
  const errors = responses.filter(([code]) => code === "default" || Number(code) >= 400)
  if (!errors.length) return <div className="text-sm text-muted-foreground">Keine Error-Responses dokumentiert.</div>

  return (
    <div className="overflow-x-auto rounded-md border border-border bg-muted/20">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-muted-foreground">
          <tr className="[&>th]:px-3 [&>th]:py-2">
            <th>Status</th>
            <th>Beschreibung</th>
            <th>Schema</th>
          </tr>
        </thead>
        <tbody>
          {errors.map(([code, resp]) => {
            const schema = resp?.content ? (resp.content["application/json"]?.schema ?? null) : null
            const schemaLabel =
              schema?.$ref ? schema.$ref.split("/").pop() : (schema?.type ?? "")
            return (
              <tr key={code} className="border-t border-border/60">
                <td className="px-3 py-2 font-mono text-xs">{code}</td>
                <td className="px-3 py-2 text-muted-foreground">{resp?.description ?? ""}</td>
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
  const body = hasBody ? " \\\n  -H 'Content-Type: application/json' \\\n  -d '{...}'" : ""
  return `curl -X ${method} \\\n  '${url}' \\\n  -H 'Accept: application/json' \\\n  -H 'Authorization: Bearer {access-token}'${body}`
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
  return `const res = await fetch("${url}", {\n  method: "${method}",\n  headers: {\n    "Accept": "application/json",\n    "Authorization": "Bearer ${"{accessToken}"}"${ct}\n  }${body}\n});\n\nconst data = await res.json();`
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
  return `import requests\n\nurl = "${url}"\nheaders = {\n  "Accept": "application/json",\n  "Authorization": "Bearer <access-token>",\n}\n${dataLine}res = requests.request("${method}", url, headers=headers${jsonArg})\nprint(res.status_code)\nprint(res.text)`
}
