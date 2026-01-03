import type { Metadata } from "next"

import ApiPageClient from "./_components/ApiPageClient"

export const metadata: Metadata = {
  title: "Claimity - Documentation API",
  description: "Instructions et documentation pour l'utilisation de l'API Claimity.",
  alternates: {
    canonical: "/fr/api/",
    languages: {
      "de-CH": "/de/api/",
      en: "/en/",
      fr: "/fr/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity - Documentation API",
    description: "Instructions et documentation pour l'utilisation de l'API Claimity.",
    url: "/fr/api/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity - Documentation API",
    description: "Instructions et documentation pour l'utilisation de l'API Claimity.",
  },
}

export default function Page() {
  return <ApiPageClient />
}
