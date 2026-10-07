"use client"

import { useCallback, useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"
import { copyJsonToClipboard } from "@/lib/clipboard"

import type { ClaimPayloadMessages } from "./ClaimPayloadSection.messages"

/** Copies example JSON to the clipboard, shows a toast and marks the copied payload for a moment. */
export function useCopyJson(t: ClaimPayloadMessages) {
  const { toast } = useToast()
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  useEffect(() => {
    if (!copiedKey) return
    const timeout = setTimeout(() => setCopiedKey(null), 2500)
    return () => clearTimeout(timeout)
  }, [copiedKey])

  const copy = useCallback(
    async (payloadKey: string, payloadLabel: string, json: string) => {
      if (!json) return
      const success = await copyJsonToClipboard(json)
      toast({
        title: success ? t.copySuccessTitle : t.copyFailTitle,
        description: success ? t.copySuccessDescription(payloadLabel) : t.copyFailDescription,
        variant: success ? "default" : "destructive",
      })
      if (success) {
        setCopiedKey(payloadKey)
      }
    },
    [t, toast]
  )

  return { copiedKey, copy }
}
