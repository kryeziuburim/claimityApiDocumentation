import type { Metadata } from "next"

import ApiPageClient from "./_components/ApiPageClient"

export const metadata: Metadata = {
  title: "Claimity - API Dokumentation",
  description: "Anleitung und Dokumentation zur Nutzung der Claimity API.",
  alternates: {
    canonical: "/de/api/",
    languages: {
      "de-CH": "/de/api/",
      en: "/en/",
      fr: "/fr/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity - API Dokumentation",
    description: "Anleitung und Dokumentation zur Nutzung der Claimity API.",
    url: "/de/api/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity - API Dokumentation",
    description: "Anleitung und Dokumentation zur Nutzung der Claimity API.",
  },
}

export default function Page() {
  return <ApiPageClient />
}
