import type { Metadata } from "next"

import ApiPageClient from "./_components/ApiPageClient"

export const metadata: Metadata = {
  title: "Claimity - API Documentation",
  description: "Instructions and documentation for using the Claimity API.",
  alternates: {
    canonical: "/en/api/",
    languages: {
      "de-CH": "/de/api/",
      en: "/en/",
      fr: "/fr/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity - API Documentation",
    description: "Instructions and documentation for using the Claimity API.",
    url: "/en/api/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity - API Documentation",
    description: "Instructions and documentation for using the Claimity API.",
  },
}

export default function Page() {
  return <ApiPageClient />
}
