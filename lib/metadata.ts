import type { Metadata } from "next"

import { pageAlternates, type Locale } from "@/lib/i18n"

type PageMetadataInput = {
  locale: Locale
  /** Path relative to the locale root, with trailing slash ("" for the locale home, "api/", ...). */
  path: string
  title?: string
  description?: string
  /** Shorter description for Open Graph / Twitter; defaults to `description`. */
  socialDescription?: string
}

export function pageMetadata({ locale, path, title, description, socialDescription }: PageMetadataInput): Metadata {
  const metadata: Metadata = { alternates: pageAlternates(locale, path) }
  if (!title) return metadata

  const social = socialDescription ?? description
  return {
    ...metadata,
    title,
    description,
    openGraph: { title, description: social, url: `/${locale}/${path}` },
    twitter: { card: "summary_large_image", title, description: social },
  }
}
