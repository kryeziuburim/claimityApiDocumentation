"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Inlined localization helpers (removed lib/i18n dependency)
type Lang = "de" | "en" | "fr"

function detectLangFromPath(pathname: string | null | undefined): Lang {
  if (!pathname) return "de"
  if (pathname.startsWith("/en")) return "en"
  if (pathname.startsWith("/fr")) return "fr"
  return "de"
}

/**
 * Build a localized path by ensuring the first segment is /de or /en
 * - Accepts relative in-app hrefs like "/", "/contact", "/#anchor", "#anchor"
 * - Keeps trailing slash consistency (app has trailingSlash enabled)
 */
function buildLocalizedHref(currentPathname: string, href: string, target?: Lang): string {
  // External or mailto / tel / protocol-based links: return as-is
  if (/^[a-zA-Z]+:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href
  }

  // Pure hash like "#book": prefix with current language path root
  if (href.startsWith("#")) {
    const currentLang = target ?? detectLangFromPath(currentPathname)
    return `/${currentLang}/${href}`
  }

  // Normalize pathname and target language
  const currentLang = target ?? detectLangFromPath(currentPathname)
  const normalized = href.startsWith("/") ? href : `/${href}`

  // If href already contains language segment, replace to target/currentLang
  if (normalized.startsWith("/de/") || normalized === "/de") {
    return normalized.replace(/^\/de(\/|$)/, `/${currentLang}/`)
  }
  if (normalized.startsWith("/en/") || normalized === "/en") {
    return normalized.replace(/^\/en(\/|$)/, `/${currentLang}/`)
  }
  if (normalized.startsWith("/fr/") || normalized === "/fr") {
    return normalized.replace(/^\/fr(\/|$)/, `/${currentLang}/`)
  }

  // Otherwise prefix with language (respect trailing slash)
  return `/${currentLang}${normalized.endsWith("/") ? normalized : `${normalized}/`}`
}

export type LocalizedLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string
  targetLang?: Lang
}

export default function LocalizedLink({ href, targetLang, ...rest }: LocalizedLinkProps) {
  const pathname = usePathname() || "/"
  const localizedHref = buildLocalizedHref(pathname, href, targetLang)
  return <Link href={localizedHref} {...rest} />
}