import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { FileDown, Users, ShieldCheck, Mail, Phone, ArrowRight, FormInput } from "lucide-react"

export const metadata: Metadata = {
  title: "Claimity - Bedienungsanleitung",
  description: "Anleitungen und Hilfen zur Nutzung der Claimity Plattform.",
  alternates: {
    canonical: "/de/manual/",
    languages: {
      "de-CH": "/de/manual/",
      en: "/en/",
      fr: "/fr/",
      "x-default": "/de/",
    },
  },
  openGraph: {
  title: "Claimity - Bedienungsanleitung",
    description: "Anleitungen und Hilfen zur Nutzung der Claimity Plattform.",
    url: "/de/manual/",
  },
  twitter: {
    card: "summary_large_image",
  title: "Claimity - Bedienungsanleitung",
    description: "Anleitungen und Hilfen zur Nutzung der Claimity Plattform.",
  },
}

export default function ManualPage() {
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
              Claimity Bedienungsanleitung
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Unterstützung und Anleitungen
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600">
              Schrittweise Anleitungen und Best Practices zur Nutzung von Claimity.
            </p>
          </div>

          <div className="mt-12">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="mt-3 text-xl font-semibold text-gray-900">Bedienungsanleitungen herunterladen</h2>
                  <p className="mt-2 text-sm text-gray-600 md:text-base">
                    Hier finden Sie die vollständigen PDF-Handbücher für Experten und Versicherer.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {/* Experten */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur">
                  <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-white" />
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 ring-1 ring-teal-200/60">
                        <Users className="h-5 w-5 text-teal-800" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">Für Experten</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Claimity Bedienungsanleitung (PDF) – Rollen, Workflows und Best Practices für Experten.
                        </p>
                      </div>
                    </div>

                    <a
                      href="/assets/de/manual/Claimity_Bedienungsanleitung_Experten.pdf"
                      download
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-800"
                    >
                      <FileDown className="h-4 w-4" aria-hidden="true" />
                      PDF herunterladen
                    </a>
                  </div>
                </div>

                {/* Versicherer */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur">
                  <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-white" />
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 ring-1 ring-teal-200/60">
                        <ShieldCheck className="h-5 w-5 text-teal-800" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">Für Versicherer</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Claimity Bedienungsanleitung (PDF) – Rollen, Workflows und Best Practices für Versicherer.
                        </p>
                      </div>
                    </div>

                    <a
                      href="/assets/de/manual/Claimity_Bedienungsanleitung_Versicherungen.pdf"
                      download
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-800"
                    >
                      <FileDown className="h-4 w-4" aria-hidden="true" />
                      PDF herunterladen
                    </a>
                  </div>
                </div>
              </div>
              <p className="mt-10 text-sm font-semibold text-gray-900 md:text-base">
                Sie benötigen weitere Informationen oder zusätzliche Hilfe?
              </p>
              <div>
                <p className="mt-2 text-sm text-gray-600">
                  Kontaktieren Sie uns oder vereinbaren Sie einen Termin – wir unterstützen Sie gerne.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/de/support"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-800"
                  >
                    <FormInput className="h-4 w-4" aria-hidden="true" />
                    Kontaktformular
                  </Link>
                  <a
                    href="mailto:info@claimity.ch"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-slate-50"
                  >
                    <Mail className="h-4 w-4 text-slate-500" aria-hidden="true" />
                    info@claimity.ch
                  </a>
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
