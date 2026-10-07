"use client"

import { useEffect } from "react"

import { useLocale } from "@/hooks/use-locale"
import { htmlLang } from "@/lib/i18n"

/**
 * The root layout sits above the [locale] segment and renders <html lang="de-CH">,
 * so the correct language is applied on the client.
 */
export function HtmlLangSetter() {
  const locale = useLocale()

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale]
  }, [locale])

  return null
}
