import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"

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

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Erste Schritte</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Anmelden und Benutzerkonto einrichten</li>
                <li>Schaden erfassen</li>
                <li>Übersicht und Statusverfolgung</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Rollen & Berechtigungen</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Rollenmodell</li>
                <li>Teamverwaltung</li>
                <li>Zwei-Faktor-Authentifizierung</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Fallerstellung</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Fallerstellungsprozess</li>
                <li>Pflichtfelder</li>
                <li>Expertenzuweisung</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Berichte</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Standardberichte</li>
                <li>Export</li>
                <li>Kennzahlen im Dashboard</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">API Integration</h2>
              <p className="text-gray-700">Technische Integrationsdetails findest du in der API-Dokumentation.</p>
              <Link href="/de/api/" className="text-teal-700 hover:underline">
                Zur API-Dokumentation
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}