import type { Metadata } from "next"
import Link from "next/link"
import { MinimalFooter } from "@/components/minimal-footer"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BookOpen, Code, ArrowRight, MailPlus } from "lucide-react"
import { LanguageSwitcherDark } from "@/components/language-switcher-dark"

export const metadata: Metadata = {
  title: "Claimity – Documentation",
  description:
    "Documentation de la plateforme Claimity. Claimity met automatiquement en relation des expert·e·s certifié·e·s — pour un traitement plus rapide, moins d’efforts et une transparence totale.",
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
    title: "Claimity – Documentation",
    description: "Documentation de la plateforme Claimity.",
    url: "/fr/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Documentation",
    description: "Documentation de la plateforme Claimity.",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Section Héro + cartes */}
      <section className="relative overflow-hidden">
        {/* Halo d’arrière-plan */}
        <div className="pointer-events-none absolute inset-x-0 top-[-16rem] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-teal-500/60 via-cyan-400/40 to-sky-500/40 opacity-70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-24 md:pt-16 lg:pb-28 lg:pt-20">
          {/* Sélecteur de langue en haut à droite */}
          <div className="absolute right-6 top-6 z-10">
            <LanguageSwitcherDark />
          </div>

          {/* Héro */}
          <div className="w-full">
            <p className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-teal-200 ring-1 ring-white/10">
              Centre d’aide Claimity
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              Tout ce dont vous avez besoin pour Claimity — en un seul endroit.
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-200/80">
              Que vous débutiez, que vous ayez des questions produit approfondies ou que vous souhaitiez une intégration
              technique, choisissez la section adaptée à votre besoin.
            </p>
          </div>

          {/* Cartes */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Mode d’emploi */}
            <Link href="/fr/manual/" aria-label="Mode d’emploi" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <BookOpen className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">Mode d’emploi</CardTitle>
                    <CardDescription className="text-slate-300">
                      Guides pas à pas pour les workflows du quotidien.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    Des premiers pas aux dossiers de sinistre complexes — idéal pour l’onboarding et les formations internes.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Onboarding pour gestionnaires et administrateurs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Création de sinistre & pilotage des expert·e·s
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Comprendre rôles, autorisations & processus
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Accéder au mode d’emploi</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>

            {/* Intégration API */}
            <Link href="/fr/api/" aria-label="Intégration API" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <Code className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">Intégration API</CardTitle>
                    <CardDescription className="text-slate-300">
                      Documentation technique, exemples et bonnes pratiques.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    Pour les équipes qui souhaitent intégrer Claimity de manière fluide aux systèmes cœur, portails ou data warehouses.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Endpoints REST & modèles de données
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Authentification, webhooks & sécurité
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Exemples d’intégration & snippets
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Accéder à la documentation API</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>

            {/* Assistance */}
            <Link href="/fr/support/" aria-label="Assistance" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <MailPlus className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">Assistance</CardTitle>
                    <CardDescription className="text-slate-300">
                      Ligne directe avec Claimity — obtenez de l’aide rapidement.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    Idéal lorsque quelque chose ne fonctionne pas comme prévu au quotidien ou si vous avez des questions spécifiques.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Questions fréquentes (FAQ)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Tickets
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      E‑mail & canaux de contact
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Accéder à l’assistance</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <MinimalFooter />
    </div>
  )
}
