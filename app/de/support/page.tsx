import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { SupportTicketForm } from "@/components/support-ticket-form"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Mail, Phone, Linkedin, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Claimity – Support",
  description: "Support, Hilfe und Kontakt rund um die Claimity Plattform.",
  alternates: {
    canonical: "/de/support/",
    languages: {
      "de-CH": "/de/support/",
      en: "/en/",
      fr: "/fr/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Support",
    description: "Support, Hilfe und Kontakt rund um die Claimity Plattform.",
    url: "/de/support/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Support",
    description: "Support, Hilfe und Kontakt rund um die Claimity Plattform.",
  },
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden">
        {/* Subtiles Hintergrund-Glow (Light) */}
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
              Wie können wir helfen?
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600">
              Schnelle Antworten in den FAQs oder senden Sie uns Ihr Anliegen direkt über das Formular.
            </p>
          </div>

          {/* FAQ Block */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Häufige Fragen (FAQ)</h2>
              <p className="mt-1 text-sm text-gray-600">
                Antworten auf die am häufigsten gestellten Fragen zur Nutzung von Claimity.
              </p>
            </div>
            <div className="px-6 py-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger className="text-gray-900">
                    Es gibt sehr viele Fälle in meiner Organisation, wie behalte ich die Übersicht über meine Verantwortlichkeiten?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Sie könnnen in der Fallliste neben dem Suchfeld nach Fällen filtern, die an sie zugewiesen sind.
                    So können sie den Überblick über ihre Verantwortlichkeiten behalten.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger className="text-gray-900">
                    Wie füge ich weitere Nutzer zu Claimity hinzu?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Als Organisationsadmin können Sie neue Nutzer in den Organisationseinstellungen hinzufügen. Diese erhalten dann automatisch eine E-Mail mit einem Einladungslink.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger className="text-gray-900">
                    Wie entferne ich Nutzer aus meiner Claimity-Organisation?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Als Organisationsadmin können Sie bestehende Nutzer in den Organisationseinstellungen entfernen. Diese haben dann keinen Zugriff mehr auf Ihre Daten.
                    Allerdings muss es immer mindestens einen Admin-Nutzer geben, der die Organisation verwalten kann.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                  <AccordionTrigger className="text-gray-900">
                    Wie erhalte ich Benachrichtigungen zu wesentlichen Aktivitäten?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Als Organisationsadmin können Sie E-Mail-Benachrichtigungen in den Organisationseinstellungen aktivieren. Für Integrationen stehen
                    zusätzlich Webhooks in der API zur Verfügung.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-5">
                  <AccordionTrigger className="text-gray-900">
                    Gibt es eine API und Beispiel-Integrationen?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Ja. Die API-Dokumentation beschreibt Endpunkte, Datenmodelle und Webhooks. Beispiel-Snippets helfen
                    beim schnellen Einstieg.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-6">
                  <AccordionTrigger className="text-gray-900">
                    An wen kann ich mich bei technischen Problemen wenden?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Nutzen Sie das Support-Formular unten. Bei kritischen Störungen bitte zusätzlich den Statushinweis
                    in Ihrer Meldung vermerken.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Kontakt Block */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Kontakt</h2>
              <p className="mt-1 text-sm text-gray-600">Sie erreichen uns über folgende Kanäle.</p>
            </div>
            <div className="px-6 py-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">E-Mail</div>
                    <a href="mailto:info@claimity.ch" className="text-sm text-teal-700 hover:underline">
                      info@claimity.ch
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Telefon</div>
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
                    <div className="text-sm font-medium text-gray-900">Adresse</div>
                    <p className="text-sm text-gray-600">
                      Wisentalstrasse 7a<br />
                      8185 Winkel<br />
                      Schweiz
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support-Ticket Formular */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Support-Ticket</h2>
              <p className="mt-1 text-sm text-gray-600">
                Keine passende Antwort gefunden? Senden Sie uns die Details – wir melden uns zeitnah zurück.
              </p>
            </div>
            <div className="px-6 py-6">
              <SupportTicketForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}