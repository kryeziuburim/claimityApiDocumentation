export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"

export function normalizeMethod(m: string): string {
  return m.toLowerCase()
}

export function getOperation(spec: any, method: HttpMethod, path: string) {
  if (!spec?.paths) return null
  const p = spec.paths[path]
  if (!p) return null
  return p[normalizeMethod(method)] ?? null
}

export function getServersBaseUrl(spec: any): string | null {
  const url = spec?.servers?.[0]?.url
  return typeof url === "string" && url.length ? url : null
}

export function refName(ref: string): string {
  const parts = String(ref).split("/")
  return parts[parts.length - 1] ?? ref
}

export function resolveRef(spec: any, ref: string): any {
  // supports refs like "#/components/schemas/Foo"
  if (!ref?.startsWith("#/")) return null
  const path = ref.replace(/^#\//, "").split("/")
  let cur: any = spec
  for (const key of path) {
    cur = cur?.[key]
    if (cur == null) return null
  }
  return cur
}

export function schemaTypeLabel(spec: any, schema: any): string {
  if (!schema) return "unknown"
  if (schema.$ref) return refName(schema.$ref)

  const t = schema.type
  if (t === "array") {
    const it = schema.items
    return `array<${schemaTypeLabel(spec, it)}>`
  }
  if (t) {
    const fmt = schema.format ? `(${schema.format})` : ""
    return `${t}${fmt}`
  }
  if (schema.oneOf) return "oneOf"
  if (schema.allOf) return "allOf"
  if (schema.anyOf) return "anyOf"
  return "object"
}

export function listParameters(op: any): any[] {
  const params = op?.parameters
  return Array.isArray(params) ? params : []
}

export function pickJsonSchemaFromContent(content: any): any | null {
  if (!content) return null
  // prefer application/json
  if (content["application/json"]?.schema) return content["application/json"].schema
  // fallback: first schema we find
  const firstKey = Object.keys(content)[0]
  return firstKey ? content[firstKey]?.schema ?? null : null
}

export function safeString(v: any): string {
  if (v == null) return ""
  return String(v)
}

export function generateExample(spec: any, schema: any, depth = 0, maxDepth = 5, visitedRefs?: Set<string>): any {
  if (!schema || depth > maxDepth) return null
  const seen = visitedRefs ?? new Set<string>()

  // Deref
  if (schema.$ref) {
    const refKey = schema.$ref
    if (seen.has(refKey)) return { _ref: refName(refKey) }
    const resolved = resolveRef(spec, refKey)
    if (!resolved) return { _ref: refName(refKey) }
    const nextSeen = new Set(seen)
    nextSeen.add(refKey)
    return generateExample(spec, resolved, depth, maxDepth, nextSeen)
  }

  // Compositions
  if (schema.oneOf?.length) return generateExample(spec, schema.oneOf[0], depth + 1, maxDepth, seen)
  if (schema.anyOf?.length) return generateExample(spec, schema.anyOf[0], depth + 1, maxDepth, seen)
  if (schema.allOf?.length) {
    // merge objects if possible
    const merged: any = {}
    for (const s of schema.allOf) {
      const ex = generateExample(spec, s, depth + 1, maxDepth, seen)
      if (ex && typeof ex === "object" && !Array.isArray(ex)) Object.assign(merged, ex)
    }
    return Object.keys(merged).length ? merged : null
  }

  // Explicit example
  if (schema.example != null) return schema.example

  const t = schema.type
  if (t === "string") {
    if (schema.format === "uuid") return "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    if (schema.format === "date-time") return "2025-12-31T12:00:00Z"
    if (schema.format === "date") return "2025-12-31"
    if (schema.enum?.length) return schema.enum[0]
    return "string"
  }
  if (t === "integer" || t === "number") return 0
  if (t === "boolean") return false
  if (t === "array") {
    const itemEx = generateExample(spec, schema.items, depth + 1, maxDepth, seen)
    return itemEx == null ? [] : [itemEx]
  }
  if (t === "object" || schema.properties) {
    const props = schema.properties ?? {}
    const out: any = {}
    const keys = Object.keys(props)
    for (const k of keys.slice(0, 25)) {
      const ex = generateExample(spec, props[k], depth + 1, maxDepth, seen)
      out[k] = ex
    }
    return out
  }

  return null
}

export function prettyJson(value: any): string {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}
