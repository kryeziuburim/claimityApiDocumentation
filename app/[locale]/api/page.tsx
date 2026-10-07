import type { Metadata } from "next"

import { type Locale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"

import ApiPageClient from "./_components/ApiPageClient"

type Props = { params: Promise<{ locale: Locale }> }

const meta: Record<Locale, { title: string; description: string }> = {
  de: {
    title: "Claimity - API Dokumentation",
    description: "Anleitung und Dokumentation zur Nutzung der Claimity API.",
  },
  en: {
    title: "Claimity - API Documentation",
    description: "Instructions and documentation for using the Claimity API.",
  },
  fr: {
    title: "Claimity - Documentation API",
    description: "Instructions et documentation pour l'utilisation de l'API Claimity.",
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({ locale, path: "api/", ...meta[locale] })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  return <ApiPageClient locale={locale} />
}
