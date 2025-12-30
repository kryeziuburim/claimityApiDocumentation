"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function MinimalFooter() {
  const pathname = usePathname() || "/"
  const lang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : "de"
  const base = `/${lang}`

  const L =
    lang === "de"
      ? {
          rights: "Alle Rechte vorbehalten.",
          privacy: "Datenschutzerklärung",
          terms: "Nutzungsbedingungen",
          imprint: "Impressum",
          companyName: "Claimity AG",
        }
      : lang === "en"
      ? {
          rights: "All rights reserved.",
          privacy: "Privacy Policy",
          terms: "Terms of Service",
          imprint: "Legal Notice",
          companyName: "Claimity AG",
        }
      : {
          rights: "Tous droits réservés.",
          privacy: "Politique de confidentialité",
          terms: "Conditions d'utilisation",
          imprint: "Mentions légales",
          companyName: "Claimity SA",
        }

  const imprintHref = `${base}/legal-notice`

  // External website links per language
  const websiteRoot = `https://www.claimity.ch/${lang}/`
  const privacyHref = `${websiteRoot}privacy`
  const termsHref = `${websiteRoot}terms`

  return (
    <footer className="py-2">
      <div className="mx-auto max-w-7xl px-6">
        {/* Bottom Bar - Copyright & Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">© 2026 {L.companyName}. {L.rights}</p>
          <div className="flex flex-wrap gap-6 md:flex-nowrap justify-center md:justify-start w-full md:w-auto">
            <Link href={imprintHref} className="text-sm text-gray-300 hover:text-white transition-colors">
              {L.imprint}
            </Link>
            <Link href={privacyHref} className="text-sm text-gray-300 hover:text-white transition-colors">
              {L.privacy}
            </Link>
            <Link href={termsHref} className="text-sm text-gray-300 hover:text-white transition-colors w-full text-center md:w-auto md:text-left">
              {L.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
