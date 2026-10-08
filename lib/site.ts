import type { Locale } from "@/lib/i18n"

/** Production origin (GitHub Pages custom domain). Used for absolute URLs in metadata, sitemap and JSON-LD. */
export const SITE_URL = "https://docs.claimity.ch"

export const SITE_NAME = "Claimity"

/** Pages that exist in every locale, as paths relative to the locale root (trailing slash, "" = home). */
export const PAGE_PATHS = ["", "api/", "manual/", "support/", "legal-notice/"] as const
export type PagePath = (typeof PAGE_PATHS)[number]

/** Value for og:locale. */
export const ogLocale: Record<Locale, string> = { de: "de_CH", en: "en_US", fr: "fr_CH", it: "it_CH" }

/** Absolute URL for a path on this site ("/de/api/" -> "https://docs.claimity.ch/de/api/"). */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}
