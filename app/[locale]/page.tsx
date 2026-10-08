import type { Metadata } from "next"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, BookOpen, Code, FileJson, History, Lock, MailPlus, ShieldCheck } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { JsonLd } from "@/components/json-ld"
import { type Locale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data"

import { apiPageClientMessages } from "./api/_components/ApiPageClient.messages"
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

/** Shortcuts into the API docs; labels are the API sidebar's. */
const quickLinks: { navKey: keyof (typeof apiPageClientMessages)[Locale]["nav"]; anchor: string; icon: LucideIcon }[] =
  [
    { navKey: "authentication", anchor: "authentication", icon: Lock },
    { navKey: "payloads", anchor: "payloads", icon: FileJson },
    { navKey: "payloadValidation", anchor: "claim-payload-validation", icon: ShieldCheck },
    { navKey: "changelog", anchor: "changelog", icon: History },
  ]

export default async function Home({ params }: Props) {
  const { locale } = await params
  const t = homeMessages[locale]
  const nav = apiPageClientMessages[locale].nav
  // "Everything you need – in one place.": the part after the dash is set in the brand color.
  const [titleLead, titleAccent] = t.title.split(/\s+[–-]\s+/)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(locale, t.meta.title)]} />
      <Header />

      {/* Hero band: light brand gradient with a faint dot grid and a soft glow on the right */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-teal-50/50 to-background">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#a9e5e9_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-12 md:pb-16 md:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            {t.badge}
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {titleLead}
            {titleAccent ? <span className="text-primary"> – {titleAccent}</span> : null}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">{t.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/api/`}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              {t.cards.api.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={`/${locale}/manual/`}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {t.cards.manual.cta}
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20 md:pt-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ key, path, icon: Icon }) => {
            const card = t.cards[key]
            return (
              <Link
                key={key}
                href={`/${locale}/${path}`}
                aria-label={card.ariaLabel}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-lg hover:shadow-teal-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-700 shadow-sm shadow-teal-700/20">
                  <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-base font-semibold text-foreground">{card.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm text-foreground">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-primary">
                  <span>{card.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Popular topics: shortcuts into the API docs */}
        <section className="mt-12 md:mt-14">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t.quickLinksTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map(({ navKey, anchor, icon: Icon }) => (
              <Link
                key={anchor}
                href={`/${locale}/api/#${anchor}`}
                className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand/60 hover:bg-teal-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0 flex-1">{nav[navKey]}</span>
                <span className="font-mono text-[11px] text-muted-foreground">API</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
