"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu } from "lucide-react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { footerMessages } from "@/components/footer.messages"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useLocale } from "@/hooks/use-locale"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const headerMessages: Record<Locale, { navTitle: string; clientLogin: string }> = {
  de: { navTitle: "Navigation", clientLogin: "Anmelden" },
  en: { navTitle: "Navigation", clientLogin: "Login" },
  fr: { navTitle: "Navigation", clientLogin: "Connexion" },
  it: { navTitle: "Navigazione", clientLogin: "Accedi" },
}

/** Sticky site header: logo, links to the help center areas, login and language. Height: h-16 (4rem). */
export function Header() {
  const locale = useLocale()
  const pathname = usePathname() || "/"
  const base = `/${locale}`
  // Nav labels are shared with the footer.
  const L = { ...footerMessages[locale], ...headerMessages[locale] }

  const menu = [
    { href: `${base}/manual/`, label: L.manual },
    { href: `${base}/api/`, label: L.api },
    { href: `${base}/support/`, label: L.support },
  ]
  const isActive = (href: string) => pathname.replace(/\/?$/, "/").startsWith(href)

  return (
    <header className="sticky top-0 z-40 h-16 border-b backdrop-blur-md border-border bg-background/80 supports-[backdrop-filter]:bg-background/70">
      {/* Three columns so the navigation sits exactly in the middle, independent of the side widths. */}
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href={`${base}/`} aria-label="Claimity home" className="flex shrink-0 items-center justify-self-start">
          <Image
            src="/logo.png"
            alt="Claimity Logo"
            width={84}
            height={27}
            className="h-[27px] w-[84px] object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex lg:gap-6" aria-label={L.navTitle}>
          {menu.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  active &&
                    "after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-brand",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          <LanguageSwitcher />
          <Link
            href="https://app.claimity.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center gap-1 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:inline-flex"
          >
            {L.clientLogin}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md md:hidden text-foreground hover:bg-muted"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="font-semibold text-foreground">{L.navTitle}</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-1 px-4">
                {menu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted",
                      isActive(item.href) && "bg-teal-50 text-teal-900",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="px-4 pt-4">
                <Link
                  href="https://app.claimity.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-full items-center justify-center gap-1 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {L.clientLogin}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
