"use client"

import Link from "next/link"

import { footerMessages, websiteLinks } from "@/components/footer.messages"
import { useLocale } from "@/hooks/use-locale"

export function MinimalFooter() {
  const locale = useLocale()
  const L = footerMessages[locale]

  const imprintHref = `/${locale}/legal-notice`
  const { privacy: privacyHref, terms: termsHref } = websiteLinks(locale)

  return (
    <footer className="py-2 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Bottom Bar - Copyright & Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">
            © 2026 {L.companyName}. {L.rights}
          </p>
          <div className="flex flex-wrap gap-6 md:flex-nowrap justify-center md:justify-start w-full md:w-auto">
            <Link href={imprintHref} className="text-sm text-gray-300 hover:text-white transition-colors">
              {L.imprint}
            </Link>
            <Link href={privacyHref} className="text-sm text-gray-300 hover:text-white transition-colors">
              {L.privacy}
            </Link>
            <Link
              href={termsHref}
              className="text-sm text-gray-300 hover:text-white transition-colors w-full text-center md:w-auto md:text-left"
            >
              {L.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
