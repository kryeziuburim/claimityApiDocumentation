import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { SupportTicketForm } from "@/components/support-ticket-form"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Mail, Phone, Linkedin, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Claimity – Support",
  description: "Support, help and contact around the Claimity platform.",
  alternates: {
    canonical: "/en/support/",
    languages: {
      "de-CH": "/de/support/",
      en: "/en/support/",
      fr: "/fr/support/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Support",
    description: "Support, help and contact around the Claimity platform.",
    url: "/en/support/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Support",
    description: "Support, help and contact around the Claimity platform.",
  },
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden">
        {/* Subtle background glow (Light) */}
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
              Claimity Support
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              How can we help?
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600">
              Quick answers in the FAQs or send us your request directly via the form.
            </p>
          </div>

        {/* FAQ Block */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h2>
              <p className="mt-1 text-sm text-gray-600">
                Answers to the most common questions about using Claimity.
              </p>
            </div>
            <div className="px-6 py-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger className="text-gray-900">
                    There are many cases in my organization — how do I keep track of my responsibilities?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    In the case list, use the filter next to the search field to show only cases assigned to you.
                    This helps you keep track of your responsibilities.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger className="text-gray-900">
                    How do I add additional users to Claimity?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    As an organization admin, you can add new users in the organization settings.
                    They will automatically receive an invitation email.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger className="text-gray-900">
                    How do I remove users from my Claimity organization?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    As an organization admin, you can remove existing users in the organization settings.
                    They will then no longer have access to your data. There must always be at least one admin user to manage the organization.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                  <AccordionTrigger className="text-gray-900">
                    How do I receive notifications about important activities?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    As an organization admin, you can enable email notifications in the organization settings.
                    For integrations, webhooks are also available in the API.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-5">
                  <AccordionTrigger className="text-gray-900">
                    Is there an API and example integrations?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes. The API documentation describes endpoints, data models and webhooks.
                    Example snippets help you get started quickly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-6">
                  <AccordionTrigger className="text-gray-900">
                    Who can I contact in case of technical issues?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Use the support form below. For critical incidents, please additionally mention the status note in your report.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Contact Block */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Contact</h2>
              <p className="mt-1 text-sm text-gray-600">You can reach us via the following channels.</p>
            </div>
            <div className="px-6 py-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Email</div>
                    <a href="mailto:info@claimity.ch" className="text-sm text-teal-700 hover:underline">
                      info@claimity.ch
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Phone</div>
                    <a href="tel:+41783447736" className="text-sm text-teal-700 hover:underline">
                      +41 78 344 77 36
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Linkedin className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">LinkedIn</div>
                    <a href="https://www.linkedin.com/company/claimity-ag/" target="_blank" rel="noopener noreferrer" className="text-sm text-teal-700 hover:underline">
                      Claimity AG
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Address</div>
                    <p className="text-sm text-gray-600">
                      Claimity AG<br />
                      Wisentalstrasse 7a<br />
                      8185 Winkel<br />
                      Switzerland
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support-Ticket Form */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Support ticket</h2>
              <p className="mt-1 text-sm text-gray-600">
                Didn’t find an answer? Send us the details — we’ll get back to you shortly.
              </p>
            </div>
            <div className="px-6 py-6">
              <SupportTicketForm locale="en" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}