"use client"

import { useEffect, useState } from "react"

import { dereferenceSchema } from "@/lib/claim-schema"
import type { JsonSchema } from "@/lib/json-schema"

import type { ClaimPayloadMeta } from "./payloads"

export type SchemaLoadState = {
  loading: boolean
  schema: JsonSchema | null
  error: string | null
}

/** Fetches the JSON schema of every payload category and inlines its `$ref`s. */
export function useClaimSchemas(
  payloads: ClaimPayloadMeta[],
  loadErrorMessage: (label: string) => string
): Record<string, SchemaLoadState> {
  const [schemas, setSchemas] = useState<Record<string, SchemaLoadState>>(() =>
    Object.fromEntries(payloads.map((payload) => [payload.key, { loading: true, schema: null, error: null }]))
  )

  useEffect(() => {
    let cancelled = false
    payloads.forEach((payload) => {
      fetch(payload.schemaPath)
        .then((res) => {
          if (!res.ok) throw new Error(loadErrorMessage(payload.label))
          return res.json()
        })
        .then((json) => {
          if (cancelled) return
          setSchemas((prev) => ({
            ...prev,
            [payload.key]: { loading: false, schema: dereferenceSchema(json), error: null },
          }))
        })
        .catch((err) => {
          if (cancelled) return
          setSchemas((prev) => ({
            ...prev,
            [payload.key]: { loading: false, schema: null, error: err.message },
          }))
        })
    })
    return () => {
      cancelled = true
    }
  }, [payloads, loadErrorMessage])

  return schemas
}
