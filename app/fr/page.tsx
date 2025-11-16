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
  title: "Claimity – Gestion des sinistres. Digital. Efficace.",
  description:
    "Claimity met automatiquement en relation des experts certifiés – pour un traitement plus rapide, moins d’efforts et une transparence totale.",
  alternates: {
    canonical: "/fr/",
    languages: {
      "de-CH": "/de/",
      en: "/en/",
      fr: "/fr/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Gestion des sinistres. Digital. Efficace.",
    description:
      "Claimity automatise l’attribution d’experts certifiés — avec transparence, qualité et rapidité.",
    url: "/fr/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Gestion des sinistres. Digital. Efficace.",
    description:
      "Claimity met automatiquement en relation des experts certifiés – pour un traitement plus rapide, moins d’efforts et une transparence totale.",
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
                  La clarté pour chaque sinistre
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight lg:pr-8">
                  Gestion des sinistres.
                  <br />
                  Digitale. Efficace.
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Claimity met automatiquement en relation des experts certifiés – pour un traitement plus rapide, moins d’efforts et une transparence totale.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/fr/#book">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg">
                    Demander une démo
                  </Button>
                </Link>
                <Link href="/fr/contact">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-900 hover:bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg flex items-center gap-2 bg-transparent"
                  >
                    Nous contacter
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-6 pt-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Hébergement en Suisse</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Conforme au RGPD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Experts certifiés</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full h-64 md:h-96 lg:h-[550px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/Hero.png"
                alt="Gestion digitale des sinistres"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Pourquoi Claimity */}
      <section id="why" className="bg-gray-50 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Pourquoi Claimity</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Du manuel au digital</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              La gestion traditionnelle des sinistres prend du temps et coûte cher. Claimity automatise le processus.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Clock className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Pression temporelle & manque de ressources</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Les processus manuels mobilisent des capacités et retardent le traitement.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <FileCheck className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Ruptures de médias & manque de transparence</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Aucune vue d’ensemble uniforme sur les sinistres et leur statut.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <TrendingDown className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Qualité & conformité</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                La décentralisation des données compromet la qualité et les obligations de traçabilité.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Users className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Disponibilité limitée</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Les experts qualifiés ne sont pas toujours disponibles dans la région.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Zap className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Attribution automatisée</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Les experts sont assignés automatiquement selon leur disponibilité et leur domaine de compétence.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <BarChart3 className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Reporting en temps réel</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Transparence sur les statuts, les délais et les coûts via un tableau de bord.
              </p>
            </div>

            {/* Card 7 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <RefreshCw className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Intégration API</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Intégration fluide dans les systèmes existants sans rupture de médias.
              </p>
            </div>

            {/* Card 8 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Expertise rapide</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Un large réseau d’experts qualifiés pour une disponibilité immédiate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Comment ça fonctionne */}
      <section id="process" className="bg-white py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-6 md:mb-8">
            {/* Left - Heading */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Comment ça fonctionne</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Quatre étapes vers une gestion des sinistres numérique
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-2">
                De la déclaration à la facturation – entièrement automatisé et transparent.
              </p>
            </div>

            {/* Right - Carousel */}
            <FeatureCarousel
              images={[
                { src: "/assets/fr/new_claim.png", alt: "Attribution automatique – nouveau sinistre" },
                { src: "/assets/fr/claim.png", alt: "Déclarer un sinistre – téléchargement et saisie" },
                { src: "/assets/fr/report.png", alt: "Rapport et clôture – documents standardisés" },
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
                  <h3 className="text-xl font-bold text-gray-900">Déclaration du sinistre</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Upload via portail, intégration API ou e-mail – flexible et simple.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Attribution automatique</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Le système sélectionne l’expert approprié selon la disponibilité, le domaine et la région.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Traitement & rapport</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    L’expert établit un rapport standardisé – centralisé, numérique et conforme aux exigences d’audit.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Clôture & facturation</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Validation digitale, facturation automatique et documentation complète.
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white">La valeur ajoutée en chiffres</h2>
              <p className="text-lg text-gray-300">Des résultats mesurables grâce à la transformation numérique</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">30%</div>
                <p className="text-sm text-gray-300">de réduction de la charge administrative</p>
              </div>

              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">24h</div>
                <p className="text-sm text-gray-300">de délai de réaction</p>
              </div>

              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">100%</div>
                <p className="text-sm text-gray-300">d’intégration numérique</p>
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
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Fonctions principales</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Tout ce dont vous avez besoin pour une
              <br />
              gestion des sinistres efficace
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une plateforme qui digitalise l’ensemble du processus, de la déclaration du sinistre jusqu’à la facturation.
            </p>
          </div>

          {/* Feature Cards Grid - 2x2 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 - Automated expert assignment */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Zap className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Attribution automatisée des experts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Plus de recherche manuelle</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Utilisation optimale du réseau</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Temps de réaction plus courts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Critères d’attribution transparents</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Real-time status & dashboard */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <BarChart3 className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Statut en temps réel & Dashboard</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Live-Tracking de tous les dossiers de sinistre</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">KPI-Dashboards pour le Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Surveillance automatique des délais</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Fonctions d’exportation et de reporting</span>
                </div>
              </div>
            </div>

            {/* Card 3 - Roles & permissions */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Users className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Rôles & droits d’accès</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Définition flexible des rôles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Authentification sécurisée</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Authentification multi‑facteurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Gestion granulaire des accès</span>
                </div>
              </div>
            </div>

            {/* Card 4 - GDPR & Swiss hosting */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Shield className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">LPD/RGPD & Hosting en Suisse</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Data center situés en Suisse</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">End-to-end encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Traçabilité complète (audit trail)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Infrastructure sécurisée</span>
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
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Domaines de compétence</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Trois services – une seule plateforme</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des dommages automobiles aux expertises immobilières en passant par la détection de fraud : Claimity couvre l’ensemble des domaines.
            </p>
          </div>

          {/* Service Cards Grid - 3 columns */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Vehicle assessments */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              {/* Icon shown below instead of image */}

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="space-y-6 flex-1">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Car className="h-7 w-7 text-[#329AA1]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Expertises automobiles</h3>
                    <p className="text-sm text-gray-600">Expertises complètes pour tous types de véhicules</p>
                  </div>

                  {/* Checkmark List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Rapports d’expertise standard avec calcul détaillé des dommages
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Expertises rapides ou en direct pour des décisions immédiates
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Vérification des factures et contrôles de plausibilité</span>
                    </div>
                  </div>
                </div>

                <Link href="/fr/#book">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg mt-6">
                    Demander un conseil
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 2 - Surveyors */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              {/* Icon shown below instead of image */}

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="space-y-6 flex-1">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <UserCog className="h-7 w-7 text-[#329AA1]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Experts immobilier</h3>
                    <p className="text-sm text-gray-600">Évaluations professionnelles des dommages aux bâtiments et aux biens mobiliers</p>
                  </div>

                  {/* Checkmark List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Dommages aux bâtiments : incendie, eau, tempête, tremblement de terre</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Dommages au génie civil : fondations, canalisations, infrastructures
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Dommages aux biens : inventaire, aménagement, objets de valeur</span>
                    </div>
                  </div>
                </div>

                <Link href="/fr/#book">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg mt-6">
                    Demander un conseil
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 3 - Fraud investigation */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              {/* Icon shown below instead of image */}

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="space-y-6 flex-1">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <ShieldAlert className="h-7 w-7 text-[#329AA1]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Enquêtes sur les fraudes</h3>
                    <p className="text-sm text-gray-600">Enquêtes discrètes et professionnelles en cas de suspicion</p>
                  </div>

                  {/* Checkmark List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Vérification des cas suspects présentant des schémas de dommages inhabituels</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Conservation des preuves par des enquêteurs certifiés</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Rapports d’enquête complets avec recommandations d’action
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/fr/#book">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg mt-6">
                    Demander un conseil
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
                <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Intégration digitale</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Une intégration simplifiée</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Claimity s’intègre parfaitement dans votre environnement informatique existant – sans migration complexe.
                </p>
              </div>

              {/* Checkmark List */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-base text-gray-900">API‑first</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-base text-gray-900">Hosting en suisse</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-base text-gray-900">Conforme RGPD</span>
                </div>
              </div>

              <Link href="/fr/contact">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg font-medium">
                  Planifier un entretien technique
                </Button>
              </Link>
            </div>

            {/* Right Column - Feature List */}
            <div className="space-y-8">
              {/* Feature 1 - Open API */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="h-6 w-6 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Intégration API</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    API RESTful pour une connexion simple avec les logiciels d’assurance et de gestion des dossiers.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Feature 2 - Secure data transfer */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="h-6 w-6 text-teal-400 rotate-90" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Transmission sécurisée des données</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    TLS 1.3, end-to-end encryption, data center situés en Suisse.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Feature 3 - Customizable workflows */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="h-6 w-6 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Workflows personnalisables</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Logique d’attribution configurable selon la région, le domaine d’expertise et la priorité.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Feature 4 - Zero-trust ready */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Zero-Trust Ready</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Architecture de sécurité moderne répondant aux plus hautes exigences de conformité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Références */}
      {/* <section id="references" className="bg-gray-50 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-0 mb-16">
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Références</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">La confiance par les résultats</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Découvrez comment Claimity aide les compagnies d’assurance et les prestataires de services à réussir leur transformation numérique.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-teal-600 hover:text-teal-600 transition-colors"
                aria-label="Précédent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="w-12 h-12 rounded-full border-2 border-teal-600 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors"
                aria-label="Suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm">
              <p className="text-base text-gray-900 leading-relaxed">
                « Avec Claimity, nous avons réduit notre temps de traitement de 40%. L’attribution automatique et la
                disponibilité constante d’experts qualifiés nous font gagner des heures chaque jour. »
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
                « Grâce à Claimity, nous recevons un flux continu de demandes d’expertise de nombreuses assurances.
                C’est plus efficace que n’importe quelle campagne commerciale. »
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
                  <div className="text-sm text-gray-600">Direction | Car-Logistics AG (HCG)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm">
              <p className="text-base text-gray-900 leading-relaxed">
                « Lorem ipsum dolor sit amet consectetur. At in scelerisque nunc velit at amet quam elit egestas. »
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

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Questions fréquentes</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Tout ce que vous devez savoir</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Réponses aux questions les plus importantes sur Claimity, la protection des données et l’intégration.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-0">
            {/* Question 1 */}
            <AccordionItem value="item-1" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Où sont stockées nos données ?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Toutes les données sont hébergées exclusivement dans des centres de données situés en Suisse. L’architecture de la plateforme est conforme aux exigences de la FINMA. Nous garantissons une conformité totale avec la Loi suisse sur la protection des données (LPD) et le RGPD de l’Union européenne.
              </AccordionContent>
            </AccordionItem>

            {/* Question 2 */}
            <AccordionItem value="item-2" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Comment fonctionne l’intégration avec nos systèmes existants ?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Nous mettons à disposition une interface API REST permettant de connecter facilement vos systèmes à la plateforme Claimity. Sur demande, nous pouvons développer une interface personnalisée ou vous accompagner durant l’intégration.
              </AccordionContent>
            </AccordionItem>

            {/* Question 3 */}
            <AccordionItem value="item-3" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Combien de temps dure l’onboarding ?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Vous pouvez commencer immédiatement — sous 24 heures. Si vous souhaitez une configuration personnalisée, la phase d’onboarding dure généralement deux semaines.
              </AccordionContent>
            </AccordionItem>

            {/* Question 4 */}
            <AccordionItem value="item-4" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Quels SLA proposez-vous ?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Nous offrons des accords de niveau de service (SLA) fiables, adaptables à vos besoins spécifiques. Des SLA personnalisés peuvent être définis contractuellement.
              </AccordionContent>
            </AccordionItem>

            {/* Question 5 */}
            <AccordionItem value="item-5" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Comment garantissez-vous la qualité des experts ?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Tous nos experts suivent un processus de certification en plusieurs étapes. Nous vérifions leurs qualifications, leurs assurances et réalisons des contrôles qualité réguliers.
              </AccordionContent>
            </AccordionItem>

            {/* Question 6 */}
            <AccordionItem value="item-6" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Existe-t-il une durée contractuelle minimale ?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Nous offrons une flexibilité totale : nos contrats sont résiliables mensuellement, vous gardant ainsi un contrôle complet sur votre collaboration avec Claimity.
              </AccordionContent>
            </AccordionItem>

            {/* Question 7 */}
            <AccordionItem value="item-7" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Comment fonctionne la facturation ?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Notre tarification est transparente et sans frais cachés. Vous pouvez choisir entre une facturation mensuelle ou par dossier. Tous les rapports de facturation sont disponibles à tout moment dans le tableau de bord.
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
                  Prêt pour la gestion digitale des sinistres ?
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Commencez dès aujourd’hui avec une démo sans engagement et découvrez comment Claimity transforme vos processus.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/fr/#book">
                  <Button variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg flex items-center gap-2 bg-transparent">
                    Demander une démo
                  </Button>
                </Link>
                <Link href="/fr/contact">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg font-medium">
                    Prendre contact
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
