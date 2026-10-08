"use client"

import { useEffect } from "react"

import { useLocale } from "@/hooks/use-locale"
import { htmlLang } from "@/lib/i18n"

/**
 * Keeps <html lang> in sync on client-side navigation between locales (the <html> element is not
 * re-rendered). The exported HTML already has the right value (scripts/set-html-lang.ts).
 */
export function HtmlLangSetter() {
  const locale = useLocale()

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale]
  }, [locale])

  return null
}
