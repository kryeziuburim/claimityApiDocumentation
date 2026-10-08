import type { Metadata } from "next"

import ModernLoader from "@/components/modern-loader"
import { defaultLocale } from "@/lib/i18n"
import { SITE_NAME } from "@/lib/site"

const home = `/${defaultLocale}/`

// GitHub Pages can't send HTTP redirects. An immediate meta refresh is followed by browsers without
// JavaScript and treated as a permanent redirect by Google; the canonical consolidates "/" into /de/.
export const metadata: Metadata = {
  title: SITE_NAME,
  alternates: { canonical: home },
}

export default function RootRedirect() {
  return (
    <>
      {/* React hoists this into <head>. */}
      <meta httpEquiv="refresh" content={`0; url=${home}`} />
      <ModernLoader variant="dark" message="Daten werden geladen …" className="px-6" />
      <noscript>
        <main className="min-h-screen flex items-center justify-center bg-slate-950 p-8 text-slate-50">
          <div className="text-center text-sm text-slate-200/80">
            <p>
              Weiter zu{" "}
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
