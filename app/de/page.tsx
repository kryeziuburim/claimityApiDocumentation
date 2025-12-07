import type { Metadata } from "next"
import Link from "next/link"
import { MinimalFooter } from "@/components/minimal-footer"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { LifeBuoy, BookOpen, Code, ArrowRight, MessageCircleCode, MailPlus } from "lucide-react"
import { LanguageSwitcherDark } from "@/components/language-switcher-dark"

export const metadata: Metadata = {
  title: "Claimity – Dokumentation",
  description:
    "Dokumentation der Claimity Plattform. Claimity vermittelt zertifizierte Expert:innen automatisch – für schnellere Bearbeitung, weniger Aufwand und volle Transparenz.",
  alternates: {
    canonical: "/de/",
    languages: {
      "de-CH": "/de/",
      en: "/en/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Dokumentation",
    description: "Dokumentation der Claimity Plattform.",
    url: "/de/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Dokumentation",
    description: "Dokumentation der Claimity Plattform.",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero + Kacheln Section */}
      <section className="relative overflow-hidden">
        {/* Hintergrund-Glow */}
        <div className="pointer-events-none absolute inset-x-0 top-[-16rem] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-teal-500/60 via-cyan-400/40 to-sky-500/40 opacity-70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-24 md:pt-16 lg:pb-28 lg:pt-20">
          {/* Language Switcher oben rechts */}
          <div className="absolute right-6 top-6 z-10">
            <LanguageSwitcherDark />
          </div>
          {/* Hero */}
          <div className="w-full">
            <p className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-teal-200 ring-1 ring-white/10">
              Claimity Hilfe-Center
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              Alles, was Sie für Claimity brauchen – an einem Ort.
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-200/80">
              Ob erste Schritte, tiefere Produktfragen oder technische Integration: Wählen Sie den Bereich,
              der zu Ihrem aktuellen Bedarf passt.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Bedienungsanleitung */}
            <Link href="/de/manual/" aria-label="Bedienungsanleitung" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <BookOpen className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">Bedienungsanleitung</CardTitle>
                    <CardDescription className="text-slate-300">
                      Schritt-für-Schritt-Anleitungen für tägliche Workflows.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    Von den ersten Schritten bis zu komplexen Schadenvorgängen – perfekt für Onboarding
                    und interne Schulungen.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Onboarding für Sachbearbeitung & Admins
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Schadenerfassung & Expert:innen-Steuerung
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Rollen, Rechte & Prozesse verstehen
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Zur Bedienungsanleitung</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>

            {/* API Integration */}
            <Link href="/de/api/" aria-label="API Integration" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <Code className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">API Integration</CardTitle>
                    <CardDescription className="text-slate-300">
                      Technische Dokumentation, Beispiele und Best Practices.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    Für Teams, die Claimity nahtlos in Bestandssysteme, Portale oder Data Warehouse Systeme integrieren möchten.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      REST-Endpoints & Datenmodelle
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Authentifizierung, Webhooks & Sicherheit
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Beispiel-Integrationen & Snippets
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Zur API-Dokumentation</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>

            {/* Support */}
            <Link href="/de/support/" aria-label="Support" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <MailPlus className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">Support</CardTitle>
                    <CardDescription className="text-slate-300">
                      Direkter Draht zu Claimity - schnell Hilfe bekommen.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    Ideal, wenn im Tagesgeschäft etwas nicht wie erwartet funktioniert oder Sie konkrete Fragen
                    zur Nutzung haben.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Häufig gestellte Fragen (FAQ)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Tickets
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      E-Mail & Kontaktwege
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Zum Support-Bereich</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <MinimalFooter />
    </div>
  )
}
