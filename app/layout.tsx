import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { HtmlLangSetter } from "@/components/html-lang-setter"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Claimity – Schadenmanagement. Digital. Effizient.",
  description:
    "Claimity vermittelt zertifizierte Experten automatisch – für schnellere Bearbeitung, weniger Aufwand und volle Transparenz.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de-CH">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`font-sans antialiased overflow-x-hidden`}>
        <HtmlLangSetter />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
