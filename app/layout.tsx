import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { CalendlyHandler } from "@/components/calendly-handler"
import { HtmlLangSetter } from "@/components/html-lang-setter"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Claimity – Schadenmanagement. Digital. Effizient.",
  description:
    "Claimity vermittelt zertifizierte Expert:innen automatisch – für schnellere Bearbeitung, weniger Aufwand und volle Transparenz.",
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
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased overflow-x-hidden`}>
        <HtmlLangSetter />
        <CalendlyHandler />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
