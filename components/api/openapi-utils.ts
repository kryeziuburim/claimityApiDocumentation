import type { OpenAPIV3 } from "openapi-types"

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"

export type OpenApiDocument = OpenAPIV3.Document

/**
 * The parts of a schema the renderers read. OpenAPI 3.0 schema and reference objects are assignable to
 * it, and so are the JSON Schema (draft 2020-12) claim payload schemas rendered by the same components.
 */
export interface SchemaNode {
  $ref?: string
  type?: string | string[]
  format?: string
  description?: string
  nullable?: boolean
  default?: unknown
  enum?: unknown[]
  example?: unknown
  items?: SchemaNode
  properties?: Record<string, SchemaNode>
  required?: string[]
  oneOf?: SchemaNode[]
  anyOf?: SchemaNode[]
  allOf?: SchemaNode[]
}

/** A SchemaNode inlined from a `$ref`, remembering the referenced name for display. */
export type ResolvedSchemaNode = SchemaNode & { __refName?: string }

export function isReference(value: unknown): value is OpenAPIV3.ReferenceObject {
  return typeof value === "object" && value !== null && typeof (value as { $ref?: unknown }).$ref === "string"
}

export function normalizeMethod(m: string): string {
  return m.toLowerCase()
}

export function getOperation(
  spec: OpenApiDocument,
  method: HttpMethod,
  path: string,
): OpenAPIV3.OperationObject | null {
  const item = spec.paths?.[path]
  if (!item) return null
  return item[normalizeMethod(method) as OpenAPIV3.HttpMethods] ?? null
}

export function getServersBaseUrl(spec: OpenApiDocument): string | null {
  const url = spec.servers?.[0]?.url
  return typeof url === "string" && url.length ? url : null
}

export function refName(ref: string): string {
  const parts = String(ref).split("/")
  return parts[parts.length - 1] ?? ref
}

/** Resolves a local JSON pointer like "#/components/schemas/Foo" against any document root. */
export function resolveRef(root: object, ref: string): unknown {
  if (!ref?.startsWith("#/")) return null
  let cur: unknown = root
  for (const key of ref.replace(/^#\//, "").split("/")) {
    cur = typeof cur === "object" && cur !== null ? (cur as Record<string, unknown>)[key] : undefined
    if (cur == null) return null
  }
  return cur
}

export function schemaTypeLabel(schema: SchemaNode | null | undefined): string {
  if (!schema) return "unknown"
  if (schema.$ref) return refName(schema.$ref)

  const t = schema.type
  if (t === "array") {
    return `array<${schemaTypeLabel(schema.items)}>`
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

/** Inline parameters of an operation. The spec doesn't use `$ref` parameters; those would be skipped. */
export function listParameters(op: OpenAPIV3.OperationObject | null): OpenAPIV3.ParameterObject[] {
  return (op?.parameters ?? []).filter((p): p is OpenAPIV3.ParameterObject => !isReference(p))
}

export function pickJsonSchemaFromContent(
  content: Record<string, OpenAPIV3.MediaTypeObject> | undefined,
): SchemaNode | null {
  if (!content) return null
  // prefer application/json
  if (content["application/json"]?.schema) return content["application/json"].schema
  // fallback: first schema we find
  const firstKey = Object.keys(content)[0]
  return firstKey ? (content[firstKey]?.schema ?? null) : null
}

export function safeString(v: unknown): string {
  if (v == null) return ""
  return String(v)
}

export function generateExample(
  spec: object,
  schema: SchemaNode | null | undefined,
  depth = 0,
  maxDepth = 5,
  visitedRefs?: Set<string>,
): unknown {
  if (!schema || depth > maxDepth) return null
  const seen = visitedRefs ?? new Set<string>()

  // Deref
  if (schema.$ref) {
    const refKey = schema.$ref
    if (seen.has(refKey)) return { _ref: refName(refKey) }
    const resolved = resolveRef(spec, refKey) as SchemaNode | null
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
    const merged: Record<string, unknown> = {}
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
    const out: Record<string, unknown> = {}
    const keys = Object.keys(props)
    for (const k of keys.slice(0, 25)) {
      out[k] = generateExample(spec, props[k], depth + 1, maxDepth, seen)
    }
    return out
  }

  return null
}

export function prettyJson(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}
