import type { JsonSchema } from "@/lib/json-schema"

import type { ClaimPayloadMeta } from "./payloads"

export type SchemaLoadState = {
  loading: boolean
  schema: JsonSchema | null
  error: string | null
}

/**
 * Per-category schema state. The schemas are loaded at build time (lib/api-docs-data.ts), so a category is
 * either ready or, if its schema is missing, shows the error state.
 */
export function claimSchemaStates(
  payloads: ClaimPayloadMeta[],
  schemas: Record<string, JsonSchema>,
  missingMessage: (label: string) => string,
): Record<string, SchemaLoadState> {
  return Object.fromEntries(
    payloads.map((payload) => {
      const schema = schemas[payload.key] ?? null
      return [payload.key, { loading: false, schema, error: schema ? null : missingMessage(payload.label) }]
    }),
  )
}
