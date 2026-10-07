import type { Metadata } from "next"

export const locales = ["de", "en", "fr"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "de"

/** Value for <html lang>. */
export const htmlLang: Record<Locale, string> = { de: "de-CH", en: "en", fr: "fr-CH" }

/** Value for hreflang alternates. */
const hrefLang: Record<Locale, string> = { de: "de-CH", en: "en", fr: "fr" }

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value)
}

const LOCALE_PREFIX = new RegExp(`^/(${locales.join("|")})(/|$)`)

export function localeFromPathname(pathname: string | null | undefined): Locale {
  const match = pathname?.match(LOCALE_PREFIX)
  return match ? (match[1] as Locale) : defaultLocale
}

/** "/en/api/" -> "/fr/api/"; paths without a locale prefix get one. Keeps the trailing slash convention. */
export function switchLocaleInPath(pathname: string, target: Locale): string {
  if (LOCALE_PREFIX.test(pathname)) return pathname.replace(LOCALE_PREFIX, `/${target}/`)
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
  return `/${target}${normalized.endsWith("/") ? normalized : `${normalized}/`}`
}

/**
 * Localize an in-app href ("/", "/support", "#anchor", "/de/manual") for the given locale.
 * External, mailto: and tel: links are returned unchanged.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(href)) return href
  if (href.startsWith("#")) return `/${locale}/${href}`
  return switchLocaleInPath(href, locale)
}

/**
 * canonical + hreflang alternates for a page, e.g. pageAlternates("de", "api/").
 * `path` is relative to the locale root and keeps the trailing slash.
 */
export function pageAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {}
  for (const l of locales) languages[hrefLang[l]] = `/${l}/${path}`
  languages["x-default"] = `/${defaultLocale}/${path}`
  return { canonical: `/${locale}/${path}`, languages }
}
