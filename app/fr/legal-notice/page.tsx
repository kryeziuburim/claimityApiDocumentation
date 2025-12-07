import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LegalNoticeFR() {
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
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl mb-8">
              Mentions légales
            </h1>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl p-8 md:p-12 space-y-8">
              <p className="text-gray-600">
                Informations conformément à l’art. 8 LCD (Loi fédérale contre la concurrence déloyale)
              </p>

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
                    <span className="font-semibold">E‑mail :</span>{" "}
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
                    <span className="font-semibold">No. du registre :</span> CH-020.3.056.095-8
                  </p>
                  <p>
                    <span className="font-semibold">Office du registre du commerce du canton de Zurich</span>
                  </p>
                  <p>
                    <span className="font-semibold">UID :</span> CHE-215.217.236
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
                  L’auteur n’assume aucune responsabilité quant à l’exactitude, la précision, l’actualité, la fiabilité
                  ou l’exhaustivité des informations. Toute prétention en responsabilité à l’encontre de l’auteur pour des
                  dommages matériels ou immatériels découlant de l’accès ou de l’utilisation/non‑utilisation des informations
                  publiées, de l’abus de la connexion ou de perturbations techniques est exclue.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsabilité pour les liens</h2>
                <p className="leading-relaxed">
                  Les renvois et liens vers des sites Web de tiers se situent en dehors de notre domaine de responsabilité.
                  Toute responsabilité pour ces sites est déclinée. L’accès et l’utilisation de ces sites s’effectuent aux
                  risques des utilisateur·rice·s.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Droits d’auteur</h2>
                <p className="leading-relaxed">
                  Les droits d’auteur et tous les autres droits sur les contenus, images, photos ou autres fichiers du site
                  appartiennent exclusivement à Claimity AG ou aux titulaires de droits expressément cités. Toute reproduction
                  d’éléments nécessite l’autorisation écrite préalable des titulaires des droits.
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