import type { Metadata } from "next"

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
      <noscript>
        <main className="flex min-h-screen items-center justify-center bg-background p-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Weiter zu{" "}
              <a href={home} className="text-primary underline">
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
