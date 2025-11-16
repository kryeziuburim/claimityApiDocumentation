"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function HtmlLangSetter() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof document === "undefined") return
    const isEN = pathname?.startsWith("/en")
    const isFR = pathname?.startsWith("/fr")
    document.documentElement.lang = isEN ? "en" : isFR ? "fr-CH" : "de-CH"
  }, [pathname])

  return null
}