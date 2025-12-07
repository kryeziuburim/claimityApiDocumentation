import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"

export const metadata: Metadata = {
  title: "Claimity – Manual",
  description: "Guides and help for using the Claimity platform.",
  alternates: {
    canonical: "/en/manual/",
    languages: {
      "de-CH": "/de/manual/",
      en: "/en/manual/",
      fr: "/fr/manual/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Manual",
    description: "Guides and help for using the Claimity platform.",
    url: "/en/manual/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Manual",
    description: "Guides and help for using the Claimity platform.",
  },
}

export default function ManualPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden">
        {/* Subtle background glow (Light) */}
        <div className="pointer-events-none absolute inset-x-0 top-[-12rem] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-teal-500/20 via-cyan-400/15 to-sky-500/15" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
          <div className="absolute right-6 top-6 z-10">
            <LanguageSwitcher />
          </div>

          {/* Hero */}
          <div className="w-full">
            <p className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 ring-1 ring-teal-100">
              Claimity Manual
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Support and step-by-step guides
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600">
              Step-by-step instructions and best practices for using Claimity.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Getting started</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Sign in and set up your account</li>
                <li>Create a claim</li>
                <li>Overview and status tracking</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Roles & permissions</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Role model</li>
                <li>Team management</li>
                <li>Two-factor authentication</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Case creation</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Case creation process</li>
                <li>Required fields</li>
                <li>Assigning experts</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Reports</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Standard reports</li>
                <li>Export</li>
                <li>KPIs in the dashboard</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-900">API integration</h2>
              <p className="text-gray-700">
                Technical integration details can be found in the API documentation.
              </p>
              <Link href="/en/api/" className="text-teal-700 hover:underline">
                Go to API documentation
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}