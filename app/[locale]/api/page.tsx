import type { Metadata } from "next"

import { type Locale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"

import ApiPageClient from "./_components/ApiPageClient"
import { apiPageMessages } from "./messages"

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({ locale, path: "api/", ...apiPageMessages[locale].meta })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  return <ApiPageClient locale={locale} />
}
