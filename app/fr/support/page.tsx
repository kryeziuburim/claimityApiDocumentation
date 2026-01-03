import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { SupportTicketForm } from "@/components/support-ticket-form"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Mail, Phone, Linkedin, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Claimity – Support",
  description: "Support, aide et contact pour la plateforme Claimity.",
  alternates: {
    canonical: "/fr/support/",
    languages: {
      "de-CH": "/de/support/",
      en: "/en/",
      fr: "/fr/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Support",
    description: "Support, aide et contact pour la plateforme Claimity.",
    url: "/fr/support/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Support",
    description: "Support, aide et contact pour la plateforme Claimity.",
  },
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden">
        {/* Subtle Background Glow (Light) */}
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
              Support Claimity
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Comment pouvons-nous aider ?
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600">
              Réponses rapides dans la FAQ ou envoyez-nous votre demande directement via le formulaire.
            </p>
          </div>

          {/* FAQ Block */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Foire aux questions (FAQ)</h2>
              <p className="mt-1 text-sm text-gray-600">
                Réponses aux questions les plus fréquentes sur l'utilisation de Claimity.
              </p>
            </div>
            <div className="px-6 py-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger className="text-gray-900">
                    Il y a beaucoup de dossiers dans mon organisation, comment garder une vue d'ensemble de mes responsabilités ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Vous pouvez filtrer les dossiers qui vous sont attribués dans la liste des dossiers à côté du champ de recherche.
                    Cela vous permet de garder une vue d'ensemble de vos responsabilités.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger className="text-gray-900">
                    Comment ajouter d'autres utilisateurs à Claimity ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    En tant qu'administrateur de l'organisation, vous pouvez ajouter de nouveaux utilisateurs dans les paramètres de l'organisation. Ils recevront automatiquement un e-mail avec un lien d'invitation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger className="text-gray-900">
                    Comment supprimer des utilisateurs de mon organisation Claimity ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    En tant qu'administrateur de l'organisation, vous pouvez supprimer des utilisateurs existants dans les paramètres de l'organisation. Ils n'auront alors plus accès à vos données.
                    Cependant, il doit toujours y avoir au moins un utilisateur administrateur pouvant gérer l'organisation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                  <AccordionTrigger className="text-gray-900">
                    Comment recevoir des notifications sur les activités importantes ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    En tant qu'administrateur de l'organisation, vous pouvez activer les notifications par e-mail dans les paramètres de l'organisation. Pour les intégrations,
                    des webhooks sont également disponibles dans l'API.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-5">
                  <AccordionTrigger className="text-gray-900">
                    Existe-t-il une API et des exemples d'intégrations ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Oui. La documentation API décrit les points de terminaison, les modèles de données et les webhooks. Des extraits d'exemples aident
                    à un démarrage rapide.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-6">
                  <AccordionTrigger className="text-gray-900">
                    Qui puis-je contacter en cas de problèmes techniques ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Utilisez le formulaire de support ci-dessous. En cas de perturbations critiques, veuillez également noter l'indication de statut
                    dans votre rapport.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Contact Block */}
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
                      Wisentalstrasse 7a<br />
                      8185 Winkel<br />
                      Suisse
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Ticket Form */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
            <div className="border-b border-slate-200 px-6 py-6">
              <h2 className="text-xl font-semibold">Ticket de support</h2>
              <p className="mt-1 text-sm text-gray-600">
                Pas trouvé de réponse appropriée ? Envoyez-nous les détails – nous vous répondrons rapidement.
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
