import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    languages: {
      "de-CH": "/de/",
      en: "/en/",
      fr: "/fr/",
      "x-default": "/de/",
    },
  },
}

export default function ENLayout({ children }: { children: React.ReactNode }) {
  return children
}