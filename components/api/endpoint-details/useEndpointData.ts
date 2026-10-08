import { useMemo } from "react"
import type { OpenAPIV3 } from "openapi-types"

import {
  generateExample,
  getOperation,
  getServersBaseUrl,
  isReference,
  listParameters,
  pickJsonSchemaFromContent,
  type HttpMethod,
} from "../openapi-utils"
import { useOpenApi } from "../OpenApiProvider"
import { buildCurl, buildFetch, buildPython } from "./code-samples"
import type { HeaderRow } from "./primitives"

export type ExampleBlock = { key: string; title: string; content: string }

/** Derives everything EndpointDetails renders for one operation from the loaded OpenAPI spec. */
export function useEndpointData(method: HttpMethod, path: string) {
  const ctx = useOpenApi()
  const spec = ctx.spec

  const op = useMemo(() => (spec ? getOperation(spec, method, path) : null), [spec, method, path])
  const baseUrl = useMemo(() => (spec ? getServersBaseUrl(spec) : null) ?? "https://app.claimity.ch", [spec])

  const params = useMemo(() => listParameters(op), [op])

  const grouped = useMemo(() => {
    const g: Record<string, OpenAPIV3.ParameterObject[]> = { path: [], query: [], header: [] }
    for (const p of params) {
      if (p?.in && g[p.in]) g[p.in].push(p)
    }
    return g
  }, [params])

  const requestSchema = useMemo(() => {
    const body = op?.requestBody
    return pickJsonSchemaFromContent(body && !isReference(body) ? body.content : undefined)
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
    // The spec defines responses inline; `$ref` responses would be skipped.
    const entries = Object.entries(op?.responses ?? {}).filter(
      (entry): entry is [string, OpenAPIV3.ResponseObject] => !isReference(entry[1])
    )
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

  const exampleBlocks = useMemo<ExampleBlock[]>(
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

  return {
    loading: ctx.loading,
    error: ctx.error,
    spec,
    op,
    grouped,
    requestSchema,
    headerRows,
    responses,
    reqExample,
    exampleBlocks,
  }
}
