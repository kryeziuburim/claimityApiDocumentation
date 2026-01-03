import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LegalNoticeFR() {
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
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl mb-8">
              Mentions Légales
            </h1>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl p-8 md:p-12 space-y-8">
              <p className="text-gray-600">Informations selon l'art. 8 LCD</p>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Adresse</h2>
                <div className="space-y-1">
                  <p className="font-semibold">Claimity AG</p>
                  <p>Wisentalstrasse 7a</p>
                  <p>8185 Winkel</p>
                  <p>Suisse</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Téléphone :</span> +41 78 344 77 36
                  </p>
                  <p>
                    <span className="font-semibold">E-mail :</span>{" "}
                    <a href="mailto:info@claimity.ch" className="text-teal-600 hover:underline">
                      info@claimity.ch
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Registre du commerce</h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Registre du commerce :</span> CH-020.3.056.095-8
                  </p>
                  <p>
                    <span className="font-semibold">Office du registre du commerce du canton de Zurich</span>
                  </p>
                  <p>
                    <span className="font-semibold">IDE :</span> CHE-215.217.236
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Personnes autorisées à représenter</h2>
                <p>Direction : Burim Kryeziu</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Exclusion de responsabilité</h2>
                <p className="leading-relaxed">
                  L'auteur n'assume aucune responsabilité quant à l'exactitude, la précision, l'actualité, la fiabilité et l'exhaustivité des informations. Les recours en responsabilité contre l'auteur pour des dommages matériels ou immatériels résultant de l'accès ou de l'utilisation ou de la non-utilisation des informations publiées, d'une mauvaise utilisation de la connexion ou de problèmes techniques sont exclus.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsabilité pour les liens</h2>
                <p className="leading-relaxed">
                  Les renvois et liens vers des sites web de tiers ne relèvent pas de notre responsabilité. Toute responsabilité pour de tels sites web est rejetée. L'accès et l'utilisation de ces sites web se font aux risques et périls de l'utilisateur.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Droits d'auteur</h2>
                <p className="leading-relaxed">
                  Les droits d'auteur et tous les autres droits sur le contenu, les images, les photos ou autres fichiers du site web appartiennent exclusivement à Claimity AG ou aux détenteurs de droits spécifiquement nommés. Pour la reproduction de tout élément, le consentement écrit des détenteurs des droits d'auteur doit être obtenu au préalable.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
