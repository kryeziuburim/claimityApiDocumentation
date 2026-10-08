import type { MetadataRoute } from "next"

import { defaultLocale, languageAlternates, locales } from "@/lib/i18n"
import { absoluteUrl, PAGE_PATHS } from "@/lib/site"

export const dynamic = "force-static"

// Every page in every language, each listing its language versions (hreflang) so search engines
// can pair them even before crawling the pages.
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    PAGE_PATHS.map((path) => ({
      url: absoluteUrl(`/${locale}/${path}`),
      changeFrequency: path === "api/" ? "weekly" : "monthly",
      priority: path === "" || path === "api/" ? (locale === defaultLocale ? 1 : 0.8) : 0.5,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([hreflang, href]) => [hreflang, absoluteUrl(href)]),
        ),
      },
    })),
  )
}
