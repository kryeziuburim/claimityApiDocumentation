import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { SupportTicketForm } from "@/components/support-ticket-form"
import { Header } from "@/components/header"
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

          {/* FAQ Block */}
          <section id="faq" className="space-y-6 pt-8 md:pt-10">
            <div>
              <h2 className="mb-4 text-xl font-bold tracking-tight text-balance sm:text-2xl">{t.faqTitle}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.faqIntro}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-2 sm:px-6">
              <Accordion type="single" collapsible className="w-full">
                {t.faqs.map(({ question, answer }, i) => (
                  <AccordionItem key={i} value={`faq-${i + 1}`}>
                    <AccordionTrigger className="text-gray-900">{question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Contact Block */}
          <section id="contact" className="space-y-6 pt-12 md:pt-14">
            <div>
              <h2 className="mb-4 text-xl font-bold tracking-tight text-balance sm:text-2xl">{t.contactTitle}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.contactIntro}</p>
            </div>
            {/* Card with the brand accent bar, like the guide cards on /manual */}
            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 sm:p-6">
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-400 to-teal-700"
                aria-hidden="true"
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-700 shadow-sm shadow-teal-700/20">
                    <Mail className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t.email}</div>
                    <a href="mailto:info@claimity.ch" className="text-sm text-teal-700 hover:underline">
                      info@claimity.ch
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-700 shadow-sm shadow-teal-700/20">
                    <Phone className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t.phone}</div>
                    <a href="tel:+41783447736" className="text-sm text-teal-700 hover:underline">
                      +41 78 344 77 36
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-700 shadow-sm shadow-teal-700/20">
                    <Linkedin className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
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
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-700 shadow-sm shadow-teal-700/20">
                    <MapPin className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
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
          </section>

          {/* Support Ticket Form */}
          <section id="ticket" className="space-y-6 pt-12 md:pt-14">
            <div>
              <h2 className="mb-4 text-xl font-bold tracking-tight text-balance sm:text-2xl">{t.ticketTitle}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.ticketIntro}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <SupportTicketForm locale={locale} />
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  )
}
