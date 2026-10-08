// Build-time data for the API page (server components only: reads from public/ via the file system).
// Loading it here instead of fetching it in the browser puts endpoint and schema content into the
// exported HTML (crawlable, no loading skeleton, no layout shift).
import fs from "node:fs"
import path from "node:path"

import type { OpenApiDocument } from "@/components/api/openapi-utils"
import { getClaimPayloads } from "@/app/[locale]/api/_components/claim-payload/payloads"
import { dereferenceSchema } from "@/lib/claim-schema"
import type { JsonSchema } from "@/lib/json-schema"

const PUBLIC_DIR = path.join(process.cwd(), "public")

function readPublicJson(publicPath: string): unknown {
  return JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, publicPath), "utf8"))
}

export function loadOpenApiSpec(): OpenApiDocument {
  // Validated in CI (lib/openapi-spec.test.ts).
  return readPublicJson("/assets/openapi.json") as OpenApiDocument
}

/** Claim payload schemas by category key, with `$ref`s inlined. */
export function loadClaimSchemas(): Record<string, JsonSchema> {
  return Object.fromEntries(
    getClaimPayloads("de").map((payload) => [payload.key, dereferenceSchema(readPublicJson(payload.schemaPath))]),
  )
}
