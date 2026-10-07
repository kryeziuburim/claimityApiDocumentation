"use client"

import { createContext, useContext } from "react"
import { usePathname } from "next/navigation"

import { localeFromPathname, type Locale } from "@/lib/i18n"

const LocaleOverrideContext = createContext<Locale | null>(null)

/**
 * Forces the locale for a subtree. Only needed where the URL can't be trusted during hydration,
 * e.g. the 404 page, which is prerendered once but served for every missing URL.
 */
export const LocaleOverride = LocaleOverrideContext.Provider

/** Current locale, derived from the URL (unless overridden by LocaleOverride). */
export function useLocale(): Locale {
  const override = useContext(LocaleOverrideContext)
  const fromUrl = localeFromPathname(usePathname())
  return override ?? fromUrl
}
