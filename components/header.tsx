"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const pathname = usePathname() || "/"
  const lang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : "de"
  const base = `/${lang}`

  const L =
    lang === "de"
      ? {
          navTitle: "Navigation",
          home: "Startseite",
          support: "Support",
          manual: "Bedienungsanleitung",
          api: "API Integration",
          clientLogin: "Anmelden",
        }
      : lang === "en"
      ? {
          navTitle: "Navigation",
          support: "Support",
          manual: "Manual",
          api: "API-Integration",
          clientLogin: "Login",
        }
      : {
          navTitle: "Navigation",
          support: "Assistance",
          manual: "Mode d'emploi",
          api: "Intégration API",
          clientLogin: "Connexion",
        }

  const homeHref = `${base}/`
  const supportHref = `${base}/support`
  const manualHref = `${base}/manual`
  const apiHref = `${base}/api`

  const menu = [
    { href: supportHref, label: L.support },
    { href: manualHref, label: L.manual },
    { href: apiHref, label: L.api },
  ]

  return (
    <>
      {/* Mobile: fixed; ab md: sticky */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href={homeHref} aria-label="Claimity home" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Claimity Logo" width={100} height={28} priority />
        </Link>

        {/* Navigation Menu */}
        {/* <nav className="hidden md:flex items-center gap-8">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-small text-gray-700 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav> */}

        {/* CTAs + Language */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6">
            <Link href="https://app.claimity.ch" target="_blank" rel="noopener noreferrer">
              {L.clientLogin}
            </Link>
          </Button>
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-gray-900 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-gray-900 font-semibold">{L.navTitle}</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 grid gap-2">
                {menu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2 text-base font-medium text-gray-900 hover:text-gray-700 ml-4"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 grid gap-2">
                <Button asChild className="justify-start bg-teal-600 hover:bg-teal-700 text-white ml-4 mr-4">
                  <Link href="https://app.claimity.ch" target="_blank" rel="noopener noreferrer">
                    {L.clientLogin}
                  </Link>
                </Button>
                <div className="px-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    {/* Spacer nur auf Mobile, um den fixed Header auszugleichen */}
    <div className="h-16" aria-hidden="true" />
    </>
  )
}
