import type { Metadata } from "next"

import { type Locale } from "@/lib/i18n"
import { JsonLd } from "@/components/json-ld"
import { pageMetadata } from "@/lib/metadata"
import { breadcrumbJsonLd, techArticleJsonLd } from "@/lib/structured-data"

import ApiPageClient from "./_components/ApiPageClient"
import { homeMessages } from "../messages"
import { apiPageMessages } from "./messages"

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({ locale, path: "api/", ...apiPageMessages[locale].meta })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const { meta } = apiPageMessages[locale]
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, homeMessages[locale].meta.title, { path: "api/", name: meta.title }),
          techArticleJsonLd(locale, { path: "api/", title: meta.title, description: meta.description }),
        ]}
      />
      <ApiPageClient locale={locale} />
    </>
  )
}
