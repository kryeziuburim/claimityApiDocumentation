import type { Metadata } from "next"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { MinimalFooter } from "@/components/minimal-footer"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BookOpen, Code, ArrowRight, MailPlus } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { type Locale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"

import { homeMessages } from "./messages"

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({ locale, path: "", ...homeMessages[locale].meta })
}

const cards: { key: keyof (typeof homeMessages)[Locale]["cards"]; path: string; icon: LucideIcon }[] = [
  { key: "manual", path: "manual/", icon: BookOpen },
  { key: "api", path: "api/", icon: Code },
  { key: "support", path: "support/", icon: MailPlus },
]

export default async function Home({ params }: Props) {
  const { locale } = await params
  const t = homeMessages[locale]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero + Tiles Section */}
      <section className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-x-0 top-[-16rem] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-teal-500/60 via-cyan-400/40 to-sky-500/40 opacity-70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-24 md:pt-16 lg:pb-28 lg:pt-20">
          {/* Language Switcher top right */}
          <div className="absolute right-6 top-6 z-10">
            <LanguageSwitcher variant="dark" />
          </div>
          {/* Hero */}
          <div className="w-full">
            <p className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-teal-200 ring-1 ring-white/10">
              {t.badge}
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              {t.title}
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-200/80">{t.intro}</p>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ key, path, icon: Icon }) => {
              const card = t.cards[key]
              return (
                <Link key={key} href={`/${locale}/${path}`} aria-label={card.ariaLabel} className="group block h-full">
                  <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                        <Icon className="relative h-6 w-6 text-[#7AE3E9]" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-50">{card.title}</CardTitle>
                        <CardDescription className="text-slate-300">{card.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-200/80">
                      <p>{card.body}</p>
                      <ul className="space-y-1.5">
                        {card.items.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                      <span>{card.cta}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <MinimalFooter />
    </div>
  )
}
