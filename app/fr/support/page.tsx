import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { SupportTicketForm } from "@/components/support-ticket-form"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Mail, Phone, Linkedin, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Claimity – Assistance",
  description: "Assistance, aide et contact autour de la plateforme Claimity.",
  alternates: {
    canonical: "/fr/support/",
    languages: {
      "de-CH": "/de/support/",
      en: "/en/support/",
      fr: "/fr/support/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Assistance",
    description: "Assistance, aide et contact autour de la plateforme Claimity.",
    url: "/fr/support/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Assistance",
    description: "Assistance, aide et contact autour de la plateforme Claimity.",
  },
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden">
        {/* Halo d'arrière-plan subtil (clair) */}
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
              Assistance Claimity
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Comment pouvons-nous vous aider ?
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600">
              Trouvez des réponses rapides dans la FAQ ou envoyez-nous votre demande directement via le formulaire.
            </p>
          </div>

          {/* Bloc FAQ */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Questions fréquentes (FAQ)</h2>
              <p className="mt-1 text-sm text-gray-600">
                Réponses aux questions les plus courantes sur l’utilisation de Claimity.
              </p>
            </div>
            <div className="px-6 py-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger className="text-gray-900">
                    Il y a de très nombreux dossiers dans mon organisation — comment garder une vue d’ensemble de mes responsabilités ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Dans la liste des dossiers, utilisez le filtre à côté du champ de recherche pour n’afficher que les dossiers qui vous sont attribués.
                    Cela vous aide à garder une vue d’ensemble de vos responsabilités.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger className="text-gray-900">
                    Comment ajouter d’autres utilisateur·rice·s à Claimity ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    En tant qu’administrateur·rice de l’organisation, vous pouvez ajouter de nouveaux utilisateur·rice·s dans les paramètres de l’organisation.
                    Ils/elles reçoivent automatiquement un e‑mail d’invitation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger className="text-gray-900">
                    Comment supprimer des utilisateur·rice·s de mon organisation Claimity ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    En tant qu’administrateur·rice de l’organisation, vous pouvez supprimer des utilisateur·rice·s existant·e·s dans les paramètres de l’organisation.
                    Ils/elles n’auront alors plus accès à vos données. Il doit toujours y avoir au moins un·e administrateur·rice pour gérer l’organisation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                  <AccordionTrigger className="text-gray-900">
                    Comment recevoir des notifications sur les activités importantes ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    En tant qu’administrateur·rice de l’organisation, vous pouvez activer les notifications par e‑mail dans les paramètres de l’organisation.
                    Pour les intégrations, des webhooks sont également disponibles dans l’API.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-5">
                  <AccordionTrigger className="text-gray-900">
                    Existe‑t‑il une API et des exemples d’intégration ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Oui. La documentation API décrit les endpoints, modèles de données et webhooks. Des extraits d’exemples facilitent la prise en main.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-6">
                  <AccordionTrigger className="text-gray-900">
                    Qui contacter en cas de problème technique ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Utilisez le formulaire d’assistance ci‑dessous. Pour les incidents critiques, merci de mentionner en plus l’état du service dans votre signalement.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Bloc Contact */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Contact</h2>
              <p className="mt-1 text-sm text-gray-600">Vous pouvez nous joindre via les canaux suivants.</p>
            </div>
            <div className="px-6 py-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">E-mail</div>
                    <a href="mailto:info@claimity.ch" className="text-sm text-teal-700 hover:underline">
                      info@claimity.ch
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Téléphone</div>
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
                      Claimity AG<br />
                      Wisentalstrasse 7a<br />
                      8185 Winkel<br />
                      Suisse
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de ticket d'assistance */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Ticket d’assistance</h2>
              <p className="mt-1 text-sm text-gray-600">
                Vous n’avez pas trouvé de réponse ? Envoyez-nous les détails — nous vous recontacterons rapidement.
              </p>
            </div>
            <div className="px-6 py-6">
              <SupportTicketForm locale="fr" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}