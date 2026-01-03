import type { Metadata } from "next"
import Link from "next/link"
import { MinimalFooter } from "@/components/minimal-footer"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BookOpen, Code, ArrowRight, MailPlus } from "lucide-react"
import { LanguageSwitcherDark } from "@/components/language-switcher-dark"

export const metadata: Metadata = {
  title: "Claimity – Centre d'aide",
  description:
    "Centre d'aide de la plateforme Claimity. Claimity connecte automatiquement des experts certifiés – pour un traitement plus rapide, moins d'efforts et une transparence totale.",
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
    title: "Claimity – Centre d'aide",
    description: "Centre d'aide de la plateforme Claimity.",
    url: "/fr/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Centre d'aide",
    description: "Centre d'aide de la plateforme Claimity.",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero + Tiles Section */}
      <section className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-x-0 top-[-16rem] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-teal-500/60 via-cyan-400/40 to-sky-500/40 opacity-70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-24 md:pt-16 lg:pb-28 lg:pt-20">
          {/* Language Switcher top right */}
          <div className="absolute right-6 top-6 z-10">
            <LanguageSwitcherDark />
          </div>
          {/* Hero */}
          <div className="w-full">
            <p className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-teal-200 ring-1 ring-white/10">
              Centre d'aide Claimity
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              Tout ce dont vous avez besoin pour Claimity – au même endroit.
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-200/80">
              Que ce soit pour les premiers pas, des questions approfondies sur le produit ou l'intégration technique : choisissez le domaine qui correspond à vos besoins actuels.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* User Manual */}
            <Link href="/fr/manual/" aria-label="Manuel d'utilisation" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <BookOpen className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">Manuel d'utilisation</CardTitle>
                    <CardDescription className="text-slate-300">
                      Instructions étape par étape pour les flux de travail quotidiens.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    Des premiers pas aux processus de sinistres complexes – parfait pour l'intégration et la formation interne.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Intégration pour les gestionnaires et administrateurs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Saisie et contrôle des sinistres
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Comprendre les rôles, droits et processus
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Accéder au manuel</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>

            {/* API Integration */}
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
                      Documentation technique, exemples et meilleures pratiques.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    Pour les équipes souhaitant intégrer Claimity de manière transparente dans les systèmes existants, portails ou entrepôts de données.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Endpoints REST & Modèles de données
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Authentification, Webhooks & Sécurité
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Exemples d'intégrations & Snippets
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Accéder à la documentation API</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>

            {/* Support */}
            <Link href="/fr/support/" aria-label="Support" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <MailPlus className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">Support</CardTitle>
                    <CardDescription className="text-slate-300">
                      Ligne directe vers Claimity – obtenez de l'aide rapidement.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    Idéal si quelque chose ne fonctionne pas comme prévu au quotidien ou si vous avez des questions spécifiques sur l'utilisation.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Foire aux questions (FAQ)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Tickets
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      E-mail & Canaux de contact
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Accéder à l'espace support</span>
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
