"use client"

import { useCallback, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import ReactCountryFlag from "react-country-flag"

type Lang = "de" | "en" | "fr"

const languages: Array<{ code: Lang; label: string; country: string }> = [
  { code: "de", label: "Deutsch", country: "DE" },
  { code: "en", label: "English", country: "GB" },
  { code: "fr", label: "Français", country: "FR" },
]

function computeLangFromPath(pathname: string | null | undefined): Lang {
  if (!pathname) return "de"
  if (pathname.startsWith("/en")) return "en"
  if (pathname.startsWith("/fr")) return "fr"
  return "de"
}

function buildPathForLang(pathname: string, target: Lang): string {
  if (pathname === "/" || pathname === "") {
    return `/${target}/`
  }

  if (pathname.startsWith("/de/") || pathname === "/de") {
    return pathname.replace(/^\/de(\/|$)/, `/${target}/`)
  }
  if (pathname.startsWith("/en/") || pathname === "/en") {
    return pathname.replace(/^\/en(\/|$)/, `/${target}/`)
  }
  if (pathname.startsWith("/fr/") || pathname === "/fr") {
    return pathname.replace(/^\/fr(\/|$)/, `/${target}/`)
  }

  return `/${target}${pathname.endsWith("/") ? "" : "/"}`
}

const Flag = ({ country }: { country: string }) => (
  <ReactCountryFlag
    countryCode={country}
    svg
    title={country}
    style={{ width: "1.1rem", height: "1.1rem", borderRadius: "2px" }}
    aria-label={`${country} flag`}
  />
)

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname() || "/"
  const current = useMemo(() => computeLangFromPath(pathname), [pathname])

  const selectLang = useCallback(
    (target: Lang) => {
      if (target === current) return
      const nextPath = buildPathForLang(pathname, target)
      const search = typeof window !== "undefined" ? window.location.search : ""
      const hash = typeof window !== "undefined" ? window.location.hash : ""
      router.push(`${nextPath}${search}${hash}`)
    },
    [current, pathname, router]
  )

  const currentLang = languages.find((l) => l.code === current) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label="Language selection"
          className="h-8 px-3 rounded-lg border-gray-100 text-gray-700 hover:bg-gray-50"
        >
          <span className="mr-2 inline-flex items-center" aria-hidden="true">
            <Flag country={currentLang.country} />
          </span>
          <span className="uppercase tracking-wide text-xs">{current}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 rounded-lg border border-gray-200 shadow-md">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => selectLang(lang.code)}
            aria-checked={lang.code === current}
            className="cursor-pointer text-gray-700 hover:bg-gray-50 focus:bg-gray-50 data-[highlighted]:bg-gray-50 data-[highlighted]:text-gray-900"
          >
            <span className="text-lg mt-0" aria-hidden="true"><Flag country={lang.country} /></span>
            <span className="ml-2 mt-0">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}