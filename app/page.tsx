"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import ModernLoader from "@/components/modern-loader"

export default function RootRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/de/")
  }, [router])

  return (
    <>
      <ModernLoader message="Daten werden geladen …" />
      <noscript>
        <main className="min-h-screen flex items-center justify-center p-8">
          <div className="text-center text-sm text-foreground/70">
            <p>
              JavaScript ist deaktiviert. Bitte öffnen Sie{" "}
              <a href="/de/" className="underline">/de/</a>.
            </p>
          </div>
        </main>
      </noscript>
    </>
  )
}
