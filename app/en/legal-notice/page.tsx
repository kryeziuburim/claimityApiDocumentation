import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LegalNoticeEN() {
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
              Legal Notice
            </h1>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl p-8 md:p-12 space-y-8">
              <p className="text-gray-600">Information according to Art. 8 UWG</p>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Address</h2>
                <div className="space-y-1">
                  <p className="font-semibold">Claimity AG</p>
                  <p>Wisentalstrasse 7a</p>
                  <p>8185 Winkel</p>
                  <p>Switzerland</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Phone:</span> +41 78 344 77 36
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a href="mailto:info@claimity.ch" className="text-teal-600 hover:underline">
                      info@claimity.ch
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Commercial Register</h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Commercial Register:</span> CH-020.3.056.095-8
                  </p>
                  <p>
                    <span className="font-semibold">Commercial Register Office of the Canton of Zurich</span>
                  </p>
                  <p>
                    <span className="font-semibold">UID:</span> CHE-215.217.236
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Authorized Representatives</h2>
                <p>Management: Burim Kryeziu</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
                <p className="leading-relaxed">
                  The author assumes no liability for the correctness, accuracy, timeliness, reliability, and completeness of the information. Liability claims against the author for material or immaterial damage resulting from access to or use or non-use of the published information, misuse of the connection, or technical faults are excluded.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Liability for Links</h2>
                <p className="leading-relaxed">
                  References and links to third-party websites are outside our area of responsibility. Any responsibility for such websites is rejected. Access to and use of such websites is at the user's own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Copyrights</h2>
                <p className="leading-relaxed">
                  The copyright and all other rights to content, images, photos, or other files on the website belong exclusively to Claimity AG or the specifically named rights holders. For the reproduction of any elements, the written consent of the copyright holders must be obtained in advance.
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
