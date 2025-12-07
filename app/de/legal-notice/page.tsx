import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LegalNoticeDE() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden">
        {/* Subtiles Hintergrund-Glow (Light) */}
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
              Impressum
            </h1>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl p-8 md:p-12 space-y-8">
              <p className="text-gray-600">Angaben gemäss Art. 8 UWG</p>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Anschrift</h2>
                <div className="space-y-1">
                  <p className="font-semibold">Claimity AG</p>
                  <p>Wisentalstrasse 7a</p>
                  <p>8185 Winkel</p>
                  <p>Schweiz</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Telefon:</span> +41 78 344 77 36
                  </p>
                  <p>
                    <span className="font-semibold">E-Mail:</span>{" "}
                    <a href="mailto:info@claimity.ch" className="text-teal-600 hover:underline">
                      info@claimity.ch
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Handelsregister</h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Handelsregister:</span> CH-020.3.056.095-8
                  </p>
                  <p>
                    <span className="font-semibold">Handelsregisteramt des Kanton Zürich</span>
                  </p>
                  <p>
                    <span className="font-semibold">UID:</span> CHE-215.217.236
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Vertretungsberechtigte Personen</h2>
                <p>Geschäftsführung: Burim Kryeziu</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftungsausschluss</h2>
                <p className="leading-relaxed">
                  Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität,
                  Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden
                  materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der
                  veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen
                  entstanden sind, werden ausgeschlossen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftung für Links</h2>
                <p className="leading-relaxed">
                  Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird
                  jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten
                  erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Urheberrechte</h2>
                <p className="leading-relaxed">
                  Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website
                  gehören ausschliesslich der Claimity AG oder den speziell genannten Rechtsinhabern. Für die Reproduktion
                  jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
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