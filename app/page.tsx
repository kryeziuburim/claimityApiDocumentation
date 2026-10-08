"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import ModernLoader from "@/components/modern-loader"
import { defaultLocale } from "@/lib/i18n"

const home = `/${defaultLocale}/`

export default function RootRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace(home)
  }, [router])

  return (
    <>
      <ModernLoader variant="dark" message="Daten werden geladen …" className="px-6" />
      <noscript>
        <main className="min-h-screen flex items-center justify-center bg-slate-950 p-8 text-slate-50">
          <div className="text-center text-sm text-slate-200/80">
            <p>
              JavaScript ist deaktiviert. Bitte öffnen Sie{" "}
              <a href={home} className="text-teal-200 underline">
                {home}
              </a>
              .
            </p>
          </div>
        </main>
      </noscript>
    </>
  )
}
