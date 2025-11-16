"use client"

import { usePathname } from "next/navigation"
import LocalizedLink from "@/components/localized-link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const pathname = usePathname() || "/"
  const lang = pathname.startsWith("/en") ? "en" : "de"
  const base = `/${lang}`

  const T =
    lang === "en"
      ? {
          title: "Page not found",
          lead:
            "The page you’re looking for doesn’t exist or may have been moved.",
          ctaPrimary: "Go to Home",
          ctaSecondary: "Contact Sales",
          homeHref: `${base}/`,
          contactHref: `${base}/contact`,
        }
      : {
          title: "Seite nicht gefunden",
          lead:
            "Die angeforderte Seite existiert nicht oder wurde verschoben.",
          ctaPrimary: "Zur Startseite",
          ctaSecondary: "Vertrieb kontaktieren",
          homeHref: `${base}/`,
          contactHref: `${base}/contact`,
        }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="pointer-events-none absolute -inset-12 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(50,154,161,0.08),_transparent_60%)]" />

            <div className="relative rounded-2xl bg-white ring-1 ring-gray-200 shadow-lg p-10 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {T.title}
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {T.lead}
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-teal-600 hover:bg-teal-700 text-white h-11 px-6 rounded-lg"
                >
                  <LocalizedLink href={T.homeHref}>{T.ctaPrimary}</LocalizedLink>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border border-gray-300 text-gray-900 bg-transparent h-11 px-6 rounded-lg hover:bg-gray-50"
                >
                  <LocalizedLink href={T.contactHref}>{T.ctaSecondary}</LocalizedLink>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="border-t border-gray-200" />
      <Footer />
    </div>
  )
}