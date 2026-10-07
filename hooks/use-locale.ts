"use client"

import { usePathname } from "next/navigation"
import { localeFromPathname, type Locale } from "@/lib/i18n"

/** Current locale, derived from the URL. Works everywhere, including not-found. */
export function useLocale(): Locale {
  return localeFromPathname(usePathname())
}
