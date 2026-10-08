import fs from "node:fs"
import path from "node:path"

import { ImageResponse } from "next/og"

import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n"
import { ogImagePath } from "@/lib/metadata"
import { PAGE_PATHS, type PagePath } from "@/lib/site"

import { apiPageMessages } from "../../api/messages"
import { legalNoticeMessages } from "../../legal-notice/messages"
import { manualMessages } from "../../manual/messages"
import { homeMessages } from "../../messages"
import { supportMessages } from "../../support/messages"

// Social preview images (1200x630), one per page and locale, rendered once at build time (static export).
export const dynamic = "force-static"
export const dynamicParams = false

const SIZE = { width: 1200, height: 630 }

function imageName(page: PagePath) {
  return ogImagePath("de", page).split("/").pop()!
}

export function generateStaticParams() {
  return locales.flatMap((locale) => PAGE_PATHS.map((page) => ({ locale, image: imageName(page) })))
}

function texts(locale: Locale, page: PagePath): { title: string; subtitle: string } {
  switch (page) {
    case "":
      return { title: homeMessages[locale].meta.title, subtitle: homeMessages[locale].meta.socialDescription }
    case "api/":
      return { title: apiPageMessages[locale].meta.title, subtitle: apiPageMessages[locale].meta.socialDescription }
    case "manual/":
      return { title: manualMessages[locale].meta.title, subtitle: manualMessages[locale].meta.description }
    case "support/":
      return { title: supportMessages[locale].meta.title, subtitle: supportMessages[locale].meta.description }
    case "legal-notice/":
      return { title: legalNoticeMessages[locale].title, subtitle: "Claimity AG · Wisentalstrasse 7a · 8185 Winkel" }
  }
}

const logo = `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), "public", "logo_white.png")).toString("base64")}`

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string; image: string }> }) {
  const { locale: rawLocale, image } = await params
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale
  const page = PAGE_PATHS.find((p) => imageName(p) === image) ?? ""
  const { title, subtitle } = texts(locale, page)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: "#0b1220",
        backgroundImage: "radial-gradient(circle at 85% 0%, rgba(50,154,161,0.45), transparent 55%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
      <img src={logo} width={240} height={83} alt="" />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>{title}</div>
        <div style={{ fontSize: 34, lineHeight: 1.35, color: "#cbd5e1", maxWidth: 980 }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#5fc4cb" }}>
        <div style={{ width: 48, height: 4, backgroundColor: "#5fc4cb" }} />
        docs.claimity.ch
      </div>
    </div>,
    SIZE,
  )
}
