"use client"

import type React from "react"
import Link from "next/link"

import { useLocale } from "@/hooks/use-locale"
import { localizeHref, type Locale } from "@/lib/i18n"

export type LocalizedLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  /** In-app href like "/", "/support", "#anchor" (prefixed with the locale) or an external URL (unchanged). */
  href: string
  targetLang?: Locale
}

export default function LocalizedLink({ href, targetLang, ...rest }: LocalizedLinkProps) {
  const current = useLocale()
  return <Link href={localizeHref(href, targetLang ?? current)} {...rest} />
}
