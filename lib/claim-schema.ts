import { isRecord, itemSchemaOf, type JsonSchema } from "./json-schema"

// The claim schemas factor shared definitions (dates, country enum, contact blocks) into `$defs` and
// reference them with `$ref`. Every renderer walks the schema structurally, so a `{ "$ref": ... }`
// node would render as an empty field. Inlining the targets once, at load time, keeps all of them
// working without each having to understand references.
export function dereferenceSchema(root: unknown): JsonSchema {
  const resolvePointer = (pointer: string): unknown => {
    if (!pointer.startsWith("#")) return null
    return pointer
      .slice(1)
      .split("/")
      .filter(Boolean)
      .reduce<unknown>((node, rawSegment) => {
        if (!isRecord(node)) return null
        const segment = rawSegment.replace(/~1/g, "/").replace(/~0/g, "~")
        return node[segment] ?? null
      }, root)
  }

  // `seen` breaks reference cycles; a self-referential schema would otherwise recurse forever.
  const inline = (node: unknown, seen: Set<string>): unknown => {
    if (Array.isArray(node)) return node.map((item) => inline(item, seen))
    if (!isRecord(node)) return node

    const { $ref, ...siblings } = node
    if (typeof $ref === "string") {
      if (seen.has($ref)) return {}
      const target = resolvePointer($ref)
      if (!target) return {}
      // A pointer into a schema targets a subschema (an object); spreading keeps whatever it is as before.
      return { ...(inline(target, new Set([...seen, $ref])) as object), ...inlineEntries(siblings, seen) }
    }

    return inlineEntries(node, seen)
  }

  const inlineEntries = (node: Record<string, unknown>, seen: Set<string>): Record<string, unknown> =>
    Object.fromEntries(Object.entries(node).map(([key, value]) => [key, inline(value, seen)]))

  const resolved = inline(root, new Set())
  // $defs has served its purpose once everything is inlined, and keeping it would make the renderers
  // report the shared definitions as if they were payload fields.
  if (isRecord(resolved)) delete resolved.$defs
  // The input is parsed JSON that is trusted to be a schema document; this is the boundary where it gets its type.
  return resolved as JsonSchema
}

export function buildExamplePayload(schema: JsonSchema | null | undefined): unknown {
  if (!schema) return null
  if (schema.const !== undefined) return schema.const
  if (schema.default !== undefined) return schema.default
  if (Array.isArray(schema.examples) && schema.examples.length) return schema.examples[0]
  if (schema.example !== undefined) return schema.example

  if (Array.isArray(schema.oneOf) && schema.oneOf.length) {
    return buildExamplePayload(schema.oneOf[0])
  }

  if (Array.isArray(schema.anyOf) && schema.anyOf.length) {
    return buildExamplePayload(schema.anyOf[0])
  }

  const type = Array.isArray(schema.type) ? schema.type[0] : schema.type

  if (type === "object" || schema.properties) {
    const result: Record<string, unknown> = {}
    Object.entries(schema.properties ?? {}).forEach(([key, value]) => {
      result[key] = buildExamplePayload(value)
    })
    return result
  }

  if (type === "array" || schema.items) {
    const itemSchema = itemSchemaOf(schema.items)
    const sampleItem = buildExamplePayload(itemSchema)
    return sampleItem === undefined ? [] : [sampleItem]
  }

  return samplePrimitiveValue(type, schema)
}

function samplePrimitiveValue(type: string | undefined, schema: JsonSchema): unknown {
  if (Array.isArray(schema.enum) && schema.enum.length) {
    return schema.enum[0]
  }

  if (schema.format) {
    return sampleForFormat(schema.format)
  }

  if (schema.pattern) {
    return sampleForPattern(schema.pattern)
  }

  switch (type) {
    case "string":
      return schema.minLength === 0 ? "" : "string"
    case "number":
    case "integer":
      return 0
    case "boolean":
      return true
    case "null":
      return null
    default:
      return null
  }
}

function sampleForFormat(format: string): string {
  switch (format) {
    case "date":
      return "2024-01-31"
    case "date-time":
      return "2024-01-31T10:30:00Z"
    case "time":
      return "10:30:00"
    case "email":
      return "user@example.com"
    case "uri":
      return "https://example.com"
    default:
      return `${format}-value`
  }
}

function sampleForPattern(pattern: string): string {
  if (pattern === "^([01]\\d|2[0-3]):([0-5]\\d)$") {
    return "10:30"
  }
  if (pattern === "^\\d+(\\.\\d+)?$") {
    return "1234.00"
  }
  if (
    pattern === "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$" ||
    pattern === "^(\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))?$"
  ) {
    return "2024-01-31"
  }
  return "pattern-value"
}
