import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { SupportTicketForm } from "@/components/support-ticket-form"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Mail, Phone, Linkedin, MapPin } from "lucide-react"
import { type Locale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"

import { supportMessages } from "./messages"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import { homeMessages } from "../messages"

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({ locale, path: "support/", ...supportMessages[locale].meta })
}

export default async function SupportPage({ params }: Props) {
  const { locale } = await params
  const t = supportMessages[locale]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <JsonLd
        data={breadcrumbJsonLd(locale, homeMessages[locale].meta.title, { path: "support/", name: t.meta.title })}
      />
      <section className="relative overflow-hidden">
        {/* Subtle Background Glow (Light) */}

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
          <div className="absolute right-6 top-6 z-10">
            <LanguageSwitcher />
          </div>
          {/* Hero */}
          <div className="w-full">
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              {t.title}
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600">{t.intro}</p>
          </div>

          {/* FAQ Block */}
          <div className="mt-10 rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">{t.faqTitle}</h2>
              <p className="mt-1 text-sm text-gray-600">{t.faqIntro}</p>
            </div>
            <div className="px-6 py-4">
              <Accordion type="single" collapsible className="w-full">
                {t.faqs.map(({ question, answer }, i) => (
                  <AccordionItem key={i} value={`faq-${i + 1}`}>
                    <AccordionTrigger className="text-gray-900">{question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Contact Block */}
          <div className="mt-12 rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">{t.contactTitle}</h2>
              <p className="mt-1 text-sm text-gray-600">{t.contactIntro}</p>
            </div>
            <div className="px-6 py-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t.email}</div>
                    <a href="mailto:info@claimity.ch" className="text-sm text-teal-700 hover:underline">
                      info@claimity.ch
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t.phone}</div>
                    <a href="tel:+41783447736" className="text-sm text-teal-700 hover:underline">
                      +41 78 344 77 36
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Linkedin className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">LinkedIn</div>
                    <a
                      href="https://www.linkedin.com/company/claimity-ag/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-teal-700 hover:underline"
                    >
                      Claimity AG
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t.address}</div>
                    <p className="text-sm text-gray-600">
                      Wisentalstrasse 7a
                      <br />
                      8185 Winkel
                      <br />
                      {t.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Ticket Form */}
          <div className="mt-12 rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">{t.ticketTitle}</h2>
              <p className="mt-1 text-sm text-gray-600">{t.ticketIntro}</p>
            </div>
            <div className="px-6 py-6">
              <SupportTicketForm locale={locale} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
