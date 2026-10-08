"use client"

import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import ReactCountryFlag from "react-country-flag"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useLocale } from "@/hooks/use-locale"
import { locales, switchLocaleInPath, type Locale } from "@/lib/i18n"

const languageInfo: Record<Locale, { label: string; country: string }> = {
  de: { label: "Deutsch", country: "DE" },
  en: { label: "English", country: "GB" },
  fr: { label: "Français", country: "FR" },
}
const languages = locales.map((code) => ({ code, ...languageInfo[code] }))

const variants = {
  light: {
    trigger: "h-8 px-3 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50",
    content: "w-44 rounded-lg border border-gray-200 shadow-md",
    item: "cursor-pointer text-gray-700 hover:bg-gray-50 focus:bg-gray-50 data-[highlighted]:bg-gray-50 data-[highlighted]:text-gray-900",
  },
  dark: {
    trigger:
      "h-8 px-3 rounded-lg border-slate-700/70 bg-white/5 text-slate-100 hover:text-white hover:bg-white/10 hover:border-teal-400/40 backdrop-blur-sm",
    content: "w-44 rounded-lg border border-slate-800 bg-slate-900/90 backdrop-blur-xl text-slate-200 shadow-2xl",
    item: "cursor-pointer text-slate-200 hover:bg-white/10 focus:bg-white/10 data-[highlighted]:bg-white/10 data-[highlighted]:text-slate-100",
  },
}

function Flag({ country }: { country: string }) {
  return (
    <ReactCountryFlag
      countryCode={country}
      svg
      title={country}
      style={{ width: "1.1rem", height: "1.1rem", borderRadius: "2px" }}
      aria-label={`${country} flag`}
    />
  )
}

export function LanguageSwitcher({ variant = "light" }: { variant?: keyof typeof variants }) {
  const router = useRouter()
  const pathname = usePathname() || "/"
  const current = useLocale()
  const styles = variants[variant]

  const selectLang = useCallback(
    (target: Locale) => {
      if (target === current) return
      const { search, hash } = window.location
      router.push(`${switchLocaleInPath(pathname, target)}${search}${hash}`)
    },
    [current, pathname, router],
  )

  const currentLang = languageInfo[current]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Language selection" className={styles.trigger}>
          <span className="mr-2 inline-flex items-center" aria-hidden="true">
            <Flag country={currentLang.country} />
          </span>
          <span className="uppercase tracking-wide text-xs">{current}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={styles.content}>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => selectLang(lang.code)}
            aria-checked={lang.code === current}
            className={styles.item}
          >
            <span className="text-lg mt-0" aria-hidden="true">
              <Flag country={lang.country} />
            </span>
            <span className="ml-2 mt-0">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
