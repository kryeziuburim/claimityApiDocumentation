import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { type Locale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"

import { legalNoticeMessages } from "./messages"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import { homeMessages } from "../messages"

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = legalNoticeMessages[locale]
  return pageMetadata({
    locale,
    path: "legal-notice/",
    title: t.title,
    description: `${t.title} – Claimity AG, Wisentalstrasse 7a, 8185 Winkel`,
  })
}

export default async function LegalNotice({ params }: Props) {
  const { locale } = await params
  const t = legalNoticeMessages[locale]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <JsonLd
        data={breadcrumbJsonLd(locale, homeMessages[locale].meta.title, { path: "legal-notice/", name: t.title })}
      />
      <section className="relative overflow-hidden">
        {/* Subtle Background Glow (Light) */}

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
          <div className="absolute right-6 top-6 z-10">
            <LanguageSwitcher />
          </div>
          {/* Hero */}
          <div className="w-full">
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl mb-8">
              {t.title}
            </h1>
            <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8 md:p-12 space-y-8">
              <p className="text-gray-600">{t.legalBasis}</p>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.addressTitle}</h2>
                <div className="space-y-1">
                  <p className="font-semibold">Claimity AG</p>
                  <p>Wisentalstrasse 7a</p>
                  <p>8185 Winkel</p>
                  <p>{t.country}</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.contactTitle}</h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">{t.phoneLabel}</span> +41 78 344 77 36
                  </p>
                  <p>
                    <span className="font-semibold">{t.emailLabel}</span>{" "}
                    <a href="mailto:info@claimity.ch" className="text-teal-600 hover:underline">
                      info@claimity.ch
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.registerTitle}</h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">{t.registerLabel}</span> CH-020.3.056.095-8
                  </p>
                  <p>
                    <span className="font-semibold">{t.registerOffice}</span>
                  </p>
                  <p>
                    <span className="font-semibold">{t.uidLabel}</span> CHE-215.217.236
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.representativesTitle}</h2>
                <p>{t.management}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.disclaimerTitle}</h2>
                <p className="leading-relaxed">{t.disclaimerText}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.linksTitle}</h2>
                <p className="leading-relaxed">{t.linksText}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.copyrightTitle}</h2>
                <p className="leading-relaxed">{t.copyrightText}</p>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
