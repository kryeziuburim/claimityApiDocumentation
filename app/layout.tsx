import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { HtmlLangSetter } from "@/components/html-lang-setter"
import { Toaster } from "@/components/ui/toaster"
import { SITE_NAME, SITE_URL } from "@/lib/site"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  // Makes canonical, hreflang, og:url and og:image absolute.
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
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
        <Toaster />
      </body>
    </html>
  )
}
