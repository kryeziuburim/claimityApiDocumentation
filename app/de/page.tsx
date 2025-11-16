import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import {
  ArrowRight,
  Shield,
  FileText,
  CheckCircle,
  Clock,
  FileCheck,
  TrendingDown,
  Users,
  Zap,
  BarChart3,
  RefreshCw,
  CheckCircle2,
  Check,
  Settings,
  ChevronLeft,
  ChevronRight,
  Car,
  ShieldAlert,
  UserCog,
} from "lucide-react"
import { FeatureCarousel } from "@/components/feature-carousel"

export const metadata: Metadata = {
  title: "Claimity – Schadenmanagement. Digital. Effizient.",
  description:
    "Claimity vermittelt zertifizierte Expert:innen automatisch – für schnellere Bearbeitung, weniger Aufwand und volle Transparenz.",
  alternates: {
    canonical: "/de/",
    languages: {
      "de-CH": "/de/",
      en: "/en/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Schadenmanagement. Digital. Effizient.",
    description:
      "Claimity automatisiert die Zuweisung zertifizierter Expert:innen – mit Transparenz, Qualität und Tempo.",
    url: "/de/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Schadenmanagement. Digital. Effizient.",
    description:
      "Claimity vermittelt zertifizierte Expert:innen automatisch – für schnellere Bearbeitung, weniger Aufwand und volle Transparenz.",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-20 lg:py-20 mb-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-sm font-semibold text-[#329AA1] tracking-wide uppercase">
                  Where Claims Find Clarity
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight lg:pr-8">
                  Schadenmanagement.
                  <br />
                  Digital. Effizient.
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Claimity vermittelt zertifizierte Experten automatisch – für schnellere Bearbeitung, weniger Aufwand
                  und volle Transparenz.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/de/#book">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg">
                    Demo anfordern
                  </Button>
                </Link>
                <Link href="/de/contact">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-900 hover:bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg flex items-center gap-2 bg-transparent"
                  >
                    Kontakt aufnehmen
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-6 pt-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Schweizer Hosting</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">DSGVO-konform</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Zertifizierte Experten</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full h-64 md:h-96 lg:h-[550px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/Hero.png"
                alt="Digitale Schadenabwicklung"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Warum Claimity */}
      <section id="why" className="bg-gray-50 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Warum Claimity</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Von manuell zu digital</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Traditionelle Schadenabwicklung kostet Zeit und Geld. Claimity automatisiert den Prozess.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Clock className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Zeitdruck &amp; Ressourcenmangel</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Manuelle Prozesse binden Kapazitäten und verzögern die Bearbeitung
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <FileCheck className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Medienbrüche &amp; Intransparenz</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Kein einheitlicher Überblick über Schadenfälle und Status
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <TrendingDown className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Qualität &amp; Compliance</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dezentrale Datenhaltung gefährdet Qualität und Nachweispflichten
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Users className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Fehlende Verfügbarkeit</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Qualifizierte Experten in der Region nicht verfügbar
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Zap className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Automatisierte Zuweisung</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Experten nach Verfügbarkeit und Fachgebiet automatisch zugeteilt
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <BarChart3 className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Echtzeit-Reporting</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Transparenz über Status, Fristen und Kosten im Dashboard
              </p>
            </div>

            {/* Card 7 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <RefreshCw className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">API-Anbindung</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nahtlose Integration in bestehende Systeme ohne Medienbruch
              </p>
            </div>

            {/* Card 8 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Schnelle Expertise</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Grosses Netzwerk qualifizierter Experten für schnelle Verfügbarkeit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - So funktioniert's */}
      <section id="process" className="bg-white py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-6 md:mb-8">
            {/* Left - Heading */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">So funktioniert&apos;s</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Vier Schritte zum digitalen Schadenmanagement
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-2">
                Von der Meldung bis zur Abrechnung – vollständig automatisiert und transparent.
              </p>
            </div>

            {/* Right - Carousel */}
            <FeatureCarousel
              images={[
                { src: "/assets/de/new_claim.png", alt: "Automatische Zuweisung – neuer Schadenfall" },
                { src: "/assets/de/claim.png", alt: "Schaden melden – Upload und Erfassung" },
                { src: "/assets/de/report.png", alt: "Bericht und Abschluss – standardisierte Dokumente" },
              ]}
            />
          </div>
          {/* Process Steps */}
          <div className="relative">
            {/* Dashed Line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 border-t-2 border-dashed border-gray-300"></div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Schaden melden</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Upload via Portal, API-Integration oder E-Mail – flexibel und unkompliziert
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Automatische Zuweisung</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    System wählt passenden Experten nach Verfügbarkeit, Fachgebiet und Region
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Bearbeitung &amp; Bericht</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Experte erstellt standardisierten Bericht – zentral, digital, revisionssicher
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Abschluss &amp; Abrechnung</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Digitale Freigabe, automatische Abrechnung, vollständige Dokumentation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {/* <section className="bg-[#1a1f2e] py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Der Mehrwert in Zahlen</h2>
              <p className="text-lg text-gray-300">Messbare Ergebnisse durch digitale Transformation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">30%</div>
                <p className="text-sm text-gray-300">Weniger Admin-Aufwand</p>
              </div>

              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">24h</div>
                <p className="text-sm text-gray-300">Reaktionszeit</p>
              </div>

              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">100%</div>
                <p className="text-sm text-gray-300">Digitale Integration</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Core Functions Section */}
      <section id="features" className="bg-white py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Kernfunktionen</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Alles, was Sie für effizientes
              <br />
              Schadenmanagement brauchen
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Eine Plattform, die den Prozess von der Schadenmeldung bis zur Abrechnung digitalisiert.
            </p>
          </div>

          {/* Feature Cards Grid - 2x2 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 - Automatisierte Expertenzuweisung */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Zap className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Automatisierte Expertenzuweisung</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Keine manuelle Suche mehr</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Optimale Netzwerk-Auslastung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Schnellere Reaktionszeiten</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Transparente Zuteilungskriterien</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Echtzeit-Status & Dashboard */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <BarChart3 className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Echtzeit-Status &amp; Dashboard</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Live-Tracking aller Schadenfälle</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">KPI-Dashboards für Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Automatische Fristüberwachung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Export &amp; Reporting-Funktionen</span>
                </div>
              </div>
            </div>

            {/* Card 3 - Rollen & Rechte */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Users className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Rollen &amp; Rechte</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Flexible Rollendefinition</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Sichere Anmeldung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Multi-Faktor-Authentifizierung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Granulare Zugriffssteuerung</span>
                </div>
              </div>
            </div>

            {/* Card 4 - DSG/DSGVO & Hosting Schweiz */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Shield className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">DSG/DSGVO &amp; Hosting Schweiz</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Schweizer Rechenzentren</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Ende-zu-Ende-Verschlüsselung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Vollständiger Audit-Trail</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Sichere Infrastruktur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Service Areas Section */}
      <section id="modules" className="bg-gray-50 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Leistungsbereiche</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Drei Dienstleistungen – eine Plattform</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Von Fahrzeugschäden über Gebäudegutachten bis zur Betrugsermittlung: Claimity deckt alle Bereiche ab.
            </p>
          </div>

          {/* Service Cards Grid - 3 columns */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Fahrzeugexpertisen */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              {/* Icon shown below instead of image */}

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="space-y-6 flex-1">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Car className="h-7 w-7 text-[#329AA1]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Fahrzeugexpertisen</h3>
                    <p className="text-sm text-gray-600">Umfassende Gutachten für alle Fahrzeugtypen</p>
                  </div>

                  {/* Checkmark List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Standard-Schadengutachten mit detaillierter Kalkulation
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Kurz- und Live-Expertisen für schnelle Entscheidungen
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Rechnungsprüfung und Plausibilitätschecks</span>
                    </div>
                  </div>
                </div>

                <Link href="/de/#book">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg mt-6">
                    Beratung anfragen
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 2 - Sachverständige */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              {/* Icon shown below instead of image */}

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="space-y-6 flex-1">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <UserCog className="h-7 w-7 text-[#329AA1]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Sachverständiger</h3>
                    <p className="text-sm text-gray-600">Professionelle Begutachtung von Gebäude- und Hausratschäden</p>
                  </div>

                  {/* Checkmark List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Gebäudeschäden: Feuer, Wasser, Sturm, Erdbeben</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Tiefbauschäden: Fundamente, Leitungen, Infrastruktur
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Hausratschäden: Inventar, Einrichtung, Wertsachen</span>
                    </div>
                  </div>
                </div>

                <Link href="/de/#book">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg mt-6">
                    Beratung anfragen
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 3 - Betrugsmittlung */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              {/* Icon shown below instead of image */}

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="space-y-6 flex-1">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <ShieldAlert className="h-7 w-7 text-[#329AA1]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Betrugsermittlung</h3>
                    <p className="text-sm text-gray-600">Diskrete und professionelle Aufklärung von Verdachtsfällen</p>
                  </div>

                  {/* Checkmark List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Verdachtsabklärung bei auffälligen Schadenmustern</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Beweissicherung durch zertifizierte Ermittler</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Umfassende Ermittlungsberichte mit Handlungsempfehlungen
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/de/#book">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg mt-6">
                    Beratung anfragen
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Integration Section */}
      <section id="integration" className="bg-white py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Digitale Integration</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Integration leicht gemacht</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Claimity fügt sich nahtlos in Ihre bestehende IT-Landschaft ein – ohne aufwändige Migration.
                </p>
              </div>

              {/* Checkmark List */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-base text-gray-900">API-first</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-base text-gray-900">Schweizer Hosting</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-base text-gray-900">DSGVO-konform</span>
                </div>
              </div>

              <Link href="/de/contact">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg font-medium">
                  Technisches Gespräch vereinbaren
                </Button>
              </Link>
            </div>

            {/* Right Column - Feature List */}
            <div className="space-y-8">
              {/* Feature 1 - Offene API */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="h-6 w-6 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">API-Anbindung</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    RESTful API für einfache Anbindung an Versicherungs- und Bestandssoftware
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Feature 2 - Sichere Datenübertragung */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="h-6 w-6 text-teal-400 rotate-90" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Sichere Datenübertragung</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    TLS 1.3, Ende-zu-Ende-Verschlüsselung, Schweizer Rechenzentren
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Feature 3 - Anpassbare Workflows */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="h-6 w-6 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Anpassbare Workflows</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Individuelle Zuweisungslogik nach Region, Fachgebiet und Priorität
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Feature 4 - Zero-Trust Ready */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Zero-Trust Ready</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Moderne Sicherheitsarchitektur für höchste Compliance-Anforderungen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Referenzen */}
      {/* <section id="references" className="bg-gray-50 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-0 mb-16">
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Referenzen</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Vertrauen durch Ergebnisse</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Erfahren Sie, wie Claimity Versicherungen und Dienstleister bei der Digitalisierung unterstützt
              </p>
            </div>

            {/* Navigation Arrows (statisch) */}
            {/* <div className="flex gap-3">
              <button
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-teal-600 hover:text-teal-600 transition-colors"
                aria-label="Zurück"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="w-12 h-12 rounded-full border-2 border-teal-600 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors"
                aria-label="Weiter"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm">
              <p className="text-base text-gray-900 leading-relaxed">
                "Mit Claimity haben wir unsere Bearbeitungszeit um 40% reduziert. Die automatische Zuweisung und die
                ständige Verfügbarkeit qualifizierter Experten spart uns täglich Stunden."
              </p>
              <div className="border-t border-gray-200"></div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/assets/professional-man-glasses.png" alt="Amin Gerber" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Amin Gerber</div>
                  <div className="text-sm text-gray-600">Management | AFES Switzerland AG</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm">
              <p className="text-base text-gray-900 leading-relaxed">
                "Durch Claimity erhalten wir einen durchgängigen Zufluss an Expertenanfragen von zahlreichen
                Versicherungen. Das ist effektiver als jede Vertriebskampagne."
              </p>
              <div className="border-t border-gray-200"></div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/assets/professional-man-business-executive.jpg"
                    alt="Toni Tulliani"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Toni Tulliani</div>
                  <div className="text-sm text-gray-600">Geschäftsführung | Car-Logistics AG (HCG)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm">
              <p className="text-base text-gray-900 leading-relaxed">
                "Lorem ipsum dolor sit amet consectetur. At in scelerisque nunc velit at amet quam elit egestas.
                Sollicitdin varius vel nullam mauris etiam massa proin massa."
              </p>
              <div className="border-t border-gray-200"></div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/assets/professional-business-woman.png" alt="Tracy Borer" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Tracy Borer</div>
                  <div className="text-sm text-gray-600">Senior Assurance Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section - Häufige Fragen */}
      <section id="faq" className="bg-white py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Häufige Fragen</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Alles, was Sie wissen müssen</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Antworten auf die wichtigsten Fragen zu Claimity, Datenschutz und Integration.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-0">
            {/* Question 1 */}
            <AccordionItem value="item-1" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Wo werden unsere Daten gespeichert?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Alle Daten werden ausschliesslich in Schweizer Rechenzentren gespeichert. Die Plattformarchitektur ist
                FINMA-konform. Wir garantieren vollständige Compliance mit dem Schweizer Datenschutzgesetz (DSG) und der
                EU-DSGVO.
              </AccordionContent>
            </AccordionItem>

            {/* Question 2 */}
            <AccordionItem value="item-2" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Wie funktioniert die Integration in unsere bestehenden Systeme?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Wir bieten eine REST API Schnittstelle zur Verfügung, über die Sie ihre Systeme nahtlos an die
                Claimity-Plattform anbinden können. Auf Anfrage können wir auch eine individuelle Schnittstelle
                entwickeln oder Sie bei der Integration unterstützen.
              </AccordionContent>
            </AccordionItem>

            {/* Question 3 */}
            <AccordionItem value="item-3" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Wie lange dauert das Onboarding?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Grundsätzlich können Sie sofort starten, innerhalb von 24 Stunden. Falls Sie den Prozess individuell
                anpassen möchten, dauert das Onboarding typischerweise 2 Wochen.
              </AccordionContent>
            </AccordionItem>

            {/* Question 4 */}
            <AccordionItem value="item-4" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Welche SLAs bieten Sie an?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Wir bieten zuverlässige Service Level Agreements an, die auf Ihre spezifischen Anforderungen
                zugeschnitten werden können. Individuelle SLAs können vertraglich vereinbart werden.
              </AccordionContent>
            </AccordionItem>

            {/* Question 5 */}
            <AccordionItem value="item-5" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Wie wird die Qualität der Experten sichergestellt?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Alle Experten durchlaufen einen mehrstufigen Zertifizierungsprozess. Wir prüfen Qualifikationen,
                Versicherungen und führen regelmässige Qualitätskontrollen durch.
              </AccordionContent>
            </AccordionItem>

            {/* Question 6 */}
            <AccordionItem value="item-6" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Gibt es Vertragslaufzeiten?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Wir bieten vollkommene Flexibilität: Unsere Verträge sind monatlich kündbar, sodass Sie jederzeit die
                volle Kontrolle über Ihre Zusammenarbeit mit Claimity behalten.
              </AccordionContent>
            </AccordionItem>

            {/* Question 7 */}
            <AccordionItem value="item-7" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Wie funktioniert die Abrechnung?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Unsere Preisgestaltung ist transparent und enthält keine versteckten Kosten. Sie können zwischen
                monatlicher oder fallbasierter Abrechnung wählen. Alle Abrechnungsberichte sind jederzeit im Dashboard
                einsehbar.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gray-50 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-white rounded-3xl px-6 md:px-12 py-16 lg:py-20 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center space-y-8">
              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-700 leading-tight">
                  Bereit für digitales Schadenmanagement?
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Starten Sie noch heute mit einer unverbindlichen Demo und erleben Sie, wie Claimity Ihre Prozesse
                  transformiert.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/de/#book">
                  <Button variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg flex items-center gap-2 bg-transparent">
                    Demo anfordern
                  </Button>
                </Link>
                <Link href="/de/contact">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg font-medium">
                    Kontakt aufnehmen
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
