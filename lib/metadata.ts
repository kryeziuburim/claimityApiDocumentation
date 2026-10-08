import type { Metadata } from "next"

import { locales, pageAlternates, type Locale } from "@/lib/i18n"
import { ogLocale, SITE_NAME, type PagePath } from "@/lib/site"

type PageMetadataInput = {
  locale: Locale
  /** Path relative to the locale root, with trailing slash ("" for the locale home, "api/", ...). */
  path: PagePath
  /** Page name without the brand, e.g. "API-Dokumentation"; rendered as "API-Dokumentation | Claimity". */
  title: string
  description?: string
  /** Shorter description for Open Graph / Twitter; defaults to `description`. */
  socialDescription?: string
}

/** Social preview image for a page (generated at build time by app/[locale]/og/[page]/route.tsx). */
export function ogImagePath(locale: Locale, path: PagePath): string {
  return `/${locale}/og/${path === "" ? "home" : path.replace(/\/$/, "")}.png`
}

export function pageMetadata({ locale, path, title, description, socialDescription }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`
  const social = socialDescription ?? description
  const image = { url: ogImagePath(locale, path), width: 1200, height: 630, alt: fullTitle }

  return {
    title: { absolute: fullTitle },
    description,
    alternates: pageAlternates(locale, path),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description: social,
      url: `/${locale}/${path}`,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: social, images: [image.url] },
  }
}
