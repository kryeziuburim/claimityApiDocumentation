"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

import { companyContact, footerMessages, websiteLinks } from "@/components/footer.messages"
import { useLocale } from "@/hooks/use-locale"

export function Footer() {
  const locale = useLocale()
  const L = footerMessages[locale]
  const base = `/${locale}`

  const homeHref = `${base}/`
  const imprintHref = `${base}/legal-notice`
  const supportHref = `${base}/support`
  const manualHref = `${base}/manual`
  const apiHref = `${base}/api`
  const { website: websiteHref, booking: bookingHref, privacy: privacyHref, terms: termsHref } = websiteLinks(locale)

  return (
    <footer className="bg-[#1a1f2e] border-t border-gray-800 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Left Column - Logo & Description */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href={homeHref} aria-label="Claimity home" className="flex items-center">
                <Image src="/logo_white.png" alt="Claimity Logo" width={120} height={41} priority />
              </Link>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">{L.companyBlurb}</p>

            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/claimity-ag/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Claimity on LinkedIn"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1 - Produkt */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">{L.help}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={manualHref} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {L.manual}
                </Link>
              </li>
              <li>
                <Link href={apiHref} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {L.api}
                </Link>
              </li>
              <li>
                <Link href={supportHref} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {L.support}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Unternehmen */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">{L.company}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={websiteHref} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {L.website}
                </Link>
              </li>
              <li>
                <Link href={bookingHref} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {L.booking}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">{L.contactSection}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${companyContact.email}`} className="hover:text-white transition-colors">
                  {companyContact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={companyContact.phoneHref} className="hover:text-white transition-colors">
                  {companyContact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>
                  {L.companyName}
                  <br />
                  {companyContact.street}
                  <br />
                  {companyContact.city}
                  <br />
                  {L.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Copyright & Legal Links */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
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
