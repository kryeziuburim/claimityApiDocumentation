// schema.org JSON-LD for search engines (https://developers.google.com/search/docs/appearance/structured-data).
import { htmlLang, type Locale } from "@/lib/i18n"
import { ogImagePath } from "@/lib/metadata"
import { absoluteUrl, SITE_NAME, type PagePath } from "@/lib/site"

type JsonLd = Record<string, unknown>

const ORGANIZATION_ID = "https://www.claimity.ch/#organization"

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Claimity AG",
    url: "https://www.claimity.ch/",
    logo: absoluteUrl("/logo.png"),
    sameAs: ["https://www.linkedin.com/company/claimity-ag/"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Wisentalstrasse 7a",
      postalCode: "8185",
      addressLocality: "Winkel",
      addressCountry: "CH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@claimity.ch",
      telephone: "+41 78 344 77 36",
      availableLanguage: ["German", "English", "French", "Italian"],
    },
  }
}

export function websiteJsonLd(locale: Locale, name: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${name} | ${SITE_NAME}`,
    url: absoluteUrl(`/${locale}/`),
    inLanguage: htmlLang[locale],
    publisher: { "@id": ORGANIZATION_ID },
  }
}

/** Help center home › page. */
export function breadcrumbJsonLd(locale: Locale, homeName: string, page: { path: PagePath; name: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeName, item: absoluteUrl(`/${locale}/`) },
      { "@type": "ListItem", position: 2, name: page.name, item: absoluteUrl(`/${locale}/${page.path}`) },
    ],
  }
}

export function techArticleJsonLd(
  locale: Locale,
  page: { path: PagePath; title: string; description: string },
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.title,
    description: page.description,
    url: absoluteUrl(`/${locale}/${page.path}`),
    inLanguage: htmlLang[locale],
    image: absoluteUrl(ogImagePath(locale, page.path)),
    about: { "@type": "SoftwareApplication", name: "Claimity Partner API", applicationCategory: "BusinessApplication" },
    publisher: { "@id": ORGANIZATION_ID },
  }
}

/** Serialized for a <script type="application/ld+json">; "<" is escaped so the content can't close the tag. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
