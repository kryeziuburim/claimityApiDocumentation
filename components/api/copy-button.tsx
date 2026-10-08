"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"

import { useLocale } from "@/hooks/use-locale"
import { copyJsonToClipboard } from "@/lib/clipboard"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const copyButtonMessages: Record<Locale, { copy: string; copied: string }> = {
  de: { copy: "Kopieren", copied: "Kopiert" },
  en: { copy: "Copy", copied: "Copied" },
  fr: { copy: "Copier", copied: "Copié" },
  it: { copy: "Copia", copied: "Copiato" },
}

/** Small copy-to-clipboard button for the header bar of a (dark) code block. */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const t = copyButtonMessages[useLocale()]
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <button
      type="button"
      onClick={async () => setCopied(await copyJsonToClipboard(text))}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? t.copied : t.copy}</span>
    </button>
  )
}
