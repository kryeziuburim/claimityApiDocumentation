"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

export type OpenApiSpec = any

type OpenApiContextValue = {
  spec: OpenApiSpec | null
  loading: boolean
  error: string | null
}

const OpenApiContext = createContext<OpenApiContextValue>({
  spec: null,
  loading: true,
  error: null,
})

export function OpenApiProvider({
  url = "/assets/openapi.json",
  children,
}: {
  url?: string
  children: React.ReactNode
}) {
  const [spec, setSpec] = useState<OpenApiSpec | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(url, { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed to load OpenAPI spec: ${res.status} ${res.statusText}`)
        const json = await res.json()
        if (!cancelled) setSpec(json)
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [url])

  const value = useMemo(() => ({ spec, loading, error }), [spec, loading, error])
  return <OpenApiContext.Provider value={value}>{children}</OpenApiContext.Provider>
}

export function useOpenApi() {
  return useContext(OpenApiContext)
}
