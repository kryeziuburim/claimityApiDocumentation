"use client"

import React, { createContext, useContext, useMemo } from "react"

import type { OpenApiDocument } from "./openapi-utils"

export type OpenApiSpec = OpenApiDocument

type OpenApiContextValue = {
  spec: OpenApiSpec | null
  loading: boolean
  error: string | null
}

const OpenApiContext = createContext<OpenApiContextValue>({
  spec: null,
  loading: false,
  error: null,
})

/** Provides the OpenAPI document, loaded at build time by the page (lib/api-docs-data.ts). */
export function OpenApiProvider({ spec, children }: { spec: OpenApiSpec; children: React.ReactNode }) {
  const value = useMemo(() => ({ spec, loading: false, error: null }), [spec])
  return <OpenApiContext.Provider value={value}>{children}</OpenApiContext.Provider>
}

export function useOpenApi() {
  return useContext(OpenApiContext)
}
