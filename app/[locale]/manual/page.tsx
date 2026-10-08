import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { FileDown, Users, ShieldCheck, Mail, FormInput } from "lucide-react"
import { type Locale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"

import { manualMessages } from "./messages"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import { homeMessages } from "../messages"

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({ locale, path: "manual/", ...manualMessages[locale].meta })
}

export default async function ManualPage({ params }: Props) {
  const { locale } = await params
  const t = manualMessages[locale]
  const guides = [
    { key: "experts", icon: Users, ...t.experts },
    { key: "insurers", icon: ShieldCheck, ...t.insurers },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <JsonLd
        data={breadcrumbJsonLd(locale, homeMessages[locale].meta.title, { path: "manual/", name: t.meta.title })}
      />
      <section className="relative overflow-hidden">
        {/* Subtle Background Glow (Light) */}
        <div className="pointer-events-none absolute inset-x-0 top-[-12rem] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-teal-500/20 via-cyan-400/15 to-sky-500/15" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
          <div className="absolute right-6 top-6 z-10">
            <LanguageSwitcher />
          </div>

          {/* Hero */}
          <div className="w-full">
            <p className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 ring-1 ring-teal-100">
              {t.badge}
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              {t.title}
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600">{t.intro}</p>
          </div>

          <div className="mt-8 md:mt-12">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="mt-1 text-xl font-semibold text-gray-900 md:mt-3">{t.downloadTitle}</h2>
                  <p className="mt-1 text-sm text-gray-600 md:mt-2 md:text-base">{t.downloadText}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {guides.map(({ key, icon: Icon, title, description, pdf }) => (
                  <div
                    key={key}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur"
                  >
                    <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-white" />
                    <div className="relative">
                      <div className="flex items-start gap-4">
                        <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 ring-1 ring-teal-200/60 sm:flex">
                          <Icon className="h-5 w-5 text-teal-800" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                          <p className="mt-1 text-sm text-gray-600">{description}</p>
                        </div>
                      </div>

                      <Button asChild className="mt-5 w-full rounded-lg bg-teal-600 px-6 text-white hover:bg-teal-700">
                        <a href={pdf} download>
                          <FileDown className="h-4 w-4" aria-hidden="true" />
                          {t.downloadButton}
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 border-t border-slate-200 pt-8">
                <p className="text-sm font-semibold text-gray-900 md:text-base">{t.helpTitle}</p>
                <p className="mt-2 text-sm text-gray-600">{t.helpText}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild className="rounded-lg bg-teal-600 px-6 text-white hover:bg-teal-700">
                    <Link href={`/${locale}/support`}>
                      <FormInput className="h-4 w-4" aria-hidden="true" />
                      {t.contactForm}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-lg">
                    <a href="mailto:info@claimity.ch">
                      <Mail className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      info@claimity.ch
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
