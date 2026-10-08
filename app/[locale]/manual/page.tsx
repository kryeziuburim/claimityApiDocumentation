import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { footerMessages } from "@/components/footer.messages"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, FileDown, FormInput, HelpCircle, LifeBuoy, Mail, ShieldCheck, Users } from "lucide-react"
import { type Locale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"

import { manualMessages } from "./messages"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import { homeMessages } from "../messages"
import { supportMessages } from "../support/messages"

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
  const support = supportMessages[locale]
  const furtherLinks = [
    { href: `/${locale}/support/#faq`, label: support.faqTitle, icon: HelpCircle },
    { href: `/${locale}/support/#ticket`, label: support.ticketTitle, icon: LifeBuoy },
    { href: `/${locale}/api/`, label: footerMessages[locale].api, icon: Code },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <JsonLd
        data={breadcrumbJsonLd(locale, homeMessages[locale].meta.title, { path: "manual/", name: t.meta.title })}
      />
      <Header />
      <section className="relative overflow-hidden">
        {/* Subtle Background Glow (Light) */}

        {/* Hero like the API page; the sections are closer together than the API chapters. */}
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20 md:pt-14">
          {/* Hero */}
          <div className="border-b border-border pb-8">
            <p className="text-sm font-semibold text-primary">{t.eyebrow}</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{t.title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{t.intro}</p>
          </div>

          <section className="pt-8 md:pt-10">
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-xl font-bold tracking-tight text-balance sm:text-2xl">{t.downloadTitle}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.downloadText}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {guides.map(({ key, icon: Icon, title, description, pdf }) => (
                  <div
                    key={key}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-[border-color,box-shadow] hover:border-brand/60 hover:shadow-lg hover:shadow-teal-900/5 sm:p-6"
                  >
                    {/* Accent bar along the top edge */}
                    <span
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-400 to-teal-700"
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-700 shadow-sm shadow-teal-700/20">
                        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

                    <Button
                      asChild
                      className="mt-6 w-full rounded-lg bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                    >
                      <a href={pdf} download>
                        <FileDown className="h-4 w-4" aria-hidden="true" />
                        {t.downloadButton}
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <h3 className="mb-3 text-base font-semibold sm:text-lg">{t.helpTitle}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground text-pretty">{t.helpText}</p>
                <div className="flex flex-wrap gap-3">
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
          </section>

          {/* Further resources: shortcuts to the other help center areas */}
          <section className="pt-10 md:pt-12">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t.furtherTitle}
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {furtherLinks.map(({ href, label, icon: LinkIcon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand/60 hover:bg-teal-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <LinkIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0 flex-1">{label}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  )
}
