/**
 * A JSON Schema (draft 2020-12) node, limited to the keywords the claim-payload renderers read.
 * Values that can be arbitrary JSON (`const`, `enum`, `examples`, `default`) are `unknown`. Boolean
 * subschemas (`true`/`false` in place of a schema) are not modelled: the claim schemas only use them
 * for `additionalProperties`.
 */
export interface JsonSchema {
  $schema?: string
  $id?: string
  $ref?: string
  $defs?: Record<string, JsonSchema>
  $comment?: string
  title?: string
  description?: string
  type?: string | string[]
  format?: string
  pattern?: string
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  const?: unknown
  enum?: unknown[]
  default?: unknown
  examples?: unknown[]
  /** OpenAPI-style single example; not a 2020-12 keyword, but honoured when present. */
  example?: unknown
  properties?: Record<string, JsonSchema>
  required?: string[]
  additionalProperties?: boolean | JsonSchema
  items?: JsonSchema
  minItems?: number
  maxItems?: number
  contains?: JsonSchema
  minContains?: number
  maxContains?: number
  allOf?: JsonSchema[]
  anyOf?: JsonSchema[]
  oneOf?: JsonSchema[]
  not?: JsonSchema
  if?: JsonSchema
  then?: JsonSchema
  else?: JsonSchema
}

/**
 * The schema of an array's items, given a node's `items`. Also accepts the pre-2020-12 tuple form
 * (`items: [...]`) by taking its first entry.
 */
export function itemSchemaOf(items: JsonSchema | JsonSchema[] | undefined): JsonSchema | undefined {
  return Array.isArray(items) ? items[0] : items
}

/** Narrows parsed JSON to something whose keys can be read: any non-null object, arrays included. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}
