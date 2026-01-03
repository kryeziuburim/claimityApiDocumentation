import type { Metadata } from "next"
import Link from "next/link"
import { MinimalFooter } from "@/components/minimal-footer"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BookOpen, Code, ArrowRight, MailPlus } from "lucide-react"
import { LanguageSwitcherDark } from "@/components/language-switcher-dark"

export const metadata: Metadata = {
  title: "Claimity – Help Center",
  description:
    "Claimity Platform Help Center. Claimity automatically connects certified experts – for faster processing, less effort, and full transparency.",
  alternates: {
    canonical: "/en/",
    languages: {
      "de-CH": "/de/",
      en: "/en/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Help Center",
    description: "Claimity Platform Help Center.",
    url: "/en/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Help Center",
    description: "Claimity Platform Help Center.",
  },
}

export default function Home() {
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
            <LanguageSwitcherDark />
          </div>
          {/* Hero */}
          <div className="w-full">
            <p className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-teal-200 ring-1 ring-white/10">
              Claimity Help Center
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              Everything you need for Claimity – in one place.
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-200/80">
              Whether first steps, deeper product questions, or technical integration: Choose the area that fits your current needs.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* User Manual */}
            <Link href="/en/manual/" aria-label="User Manual" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <BookOpen className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">User Manual</CardTitle>
                    <CardDescription className="text-slate-300">
                      Step-by-step instructions for daily workflows.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    From first steps to complex claim processes – perfect for onboarding and internal training.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Onboarding for clerks & admins
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Claim entry & control
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Understanding roles, rights & processes
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Go to User Manual</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>

            {/* API Integration */}
            <Link href="/en/api/" aria-label="API Integration" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <Code className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">API Integration</CardTitle>
                    <CardDescription className="text-slate-300">
                      Technical documentation, examples, and best practices.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    For teams wanting to seamlessly integrate Claimity into existing systems, portals, or data warehouse systems.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      REST Endpoints & Data Models
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Authentication, Webhooks & Security
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Example Integrations & Snippets
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Go to API Documentation</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>

            {/* Support */}
            <Link href="/en/support/" aria-label="Support" className="group block h-full">
              <Card className="flex h-full flex-col justify-between border-slate-800/60 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/60 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25" />
                    <MailPlus className="relative h-6 w-6 text-[#7AE3E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-50">Support</CardTitle>
                    <CardDescription className="text-slate-300">
                      Direct line to Claimity – get help quickly.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-200/80">
                  <p>
                    Ideal if something doesn't work as expected in daily business or you have specific usage questions.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Frequently Asked Questions (FAQ)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Tickets
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Email & Contact Channels
                    </li>
                  </ul>
                </CardContent>
                <div className="flex items-center justify-between border-t border-slate-800/70 px-6 py-3 text-sm font-medium text-teal-200">
                  <span>Go to Support Area</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <MinimalFooter />
    </div>
  )
}
