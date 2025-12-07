import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"

export const metadata: Metadata = {
  title: "Claimity – Mode d’emploi",
  description: "Guides et aide pour l’utilisation de la plateforme Claimity.",
  alternates: {
    canonical: "/fr/manual/",
    languages: {
      "de-CH": "/de/manual/",
      en: "/en/manual/",
      fr: "/fr/manual/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Mode d’emploi",
    description: "Guides et aide pour l’utilisation de la plateforme Claimity.",
    url: "/fr/manual/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Mode d’emploi",
    description: "Guides et aide pour l’utilisation de la plateforme Claimity.",
  },
}

export default function ManualPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden">
        {/* Halo d’arrière-plan subtil (clair) */}
        <div className="pointer-events-none absolute inset-x-0 top-[-12rem] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-teal-500/20 via-cyan-400/15 to-sky-500/15" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
          <div className="absolute right-6 top-6 z-10">
            <LanguageSwitcher />
          </div>

          {/* Héro */}
          <div className="w-full">
            <p className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 ring-1 ring-teal-100">
              Mode d’emploi Claimity
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Assistance et guides pas à pas
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600">
              Des instructions étape par étape et des bonnes pratiques pour utiliser Claimity.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Premiers pas</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Se connecter et configurer votre compte</li>
                <li>Créer un sinistre</li>
                <li>Vue d’ensemble et suivi du statut</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Rôles & autorisations</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Modèle de rôles</li>
                <li>Gestion d’équipe</li>
                <li>Authentification à deux facteurs</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Création de dossier</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Processus de création</li>
                <li>Champs obligatoires</li>
                <li>Affectation des expert·e·s</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Rapports</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Rapports standard</li>
                <li>Export</li>
                <li>Indicateurs dans le tableau de bord</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Intégration API</h2>
              <p className="text-gray-700">
                Vous trouverez les détails techniques d’intégration dans la documentation API.
              </p>
              <Link href="/fr/api/" className="text-teal-700 hover:underline">
                Accéder à la documentation API
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}