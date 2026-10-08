"use client"

import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Check, ChevronDown, Globe } from "lucide-react"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useLocale } from "@/hooks/use-locale"
import { locales, switchLocaleInPath, type Locale } from "@/lib/i18n"

const languageLabels: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
  it: "Italiano",
}

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname() || "/"
  const current = useLocale()

  const selectLang = useCallback(
    (target: Locale) => {
      if (target === current) return
      const { search, hash } = window.location
      router.push(`${switchLocaleInPath(pathname, target)}${search}${hash}`)
    },
    [current, pathname, router],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Language selection"
        className="inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand text-muted-foreground hover:bg-muted hover:text-foreground data-[state=open]:bg-muted"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">{current}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-44 rounded-lg p-1 shadow-lg border-border bg-popover text-popover-foreground"
      >
        {locales.map((code) => (
          <DropdownMenuItem
            key={code}
            onSelect={() => selectLang(code)}
            aria-checked={code === current}
            className="cursor-pointer gap-2 rounded-md px-2 py-1.5 text-sm text-foreground data-[highlighted]:bg-muted"
          >
            <span className="w-6 font-mono text-xs uppercase text-muted-foreground">{code}</span>
            <span className="flex-1">{languageLabels[code]}</span>
            {code === current ? <Check className="h-4 w-4 text-brand" aria-hidden="true" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
