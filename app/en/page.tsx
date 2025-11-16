import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import {
  ArrowRight,
  Shield,
  FileText,
  CheckCircle,
  Clock,
  FileCheck,
  TrendingDown,
  Users,
  Zap,
  BarChart3,
  RefreshCw,
  CheckCircle2,
  Check,
  Settings,
  ChevronLeft,
  ChevronRight,
  Car,
  ShieldAlert,
  UserCog,
} from "lucide-react"
import { FeatureCarousel } from "@/components/feature-carousel"

export const metadata: Metadata = {
  title: "Claimity – Claims management. Digital. Efficient.",
  description:
    "Claimity automatically matches certified experts — for faster processing, less effort, and full transparency.",
  alternates: {
    canonical: "/en/",
    languages: {
      "de-CH": "/de/",
      en: "/en/",
      fr: "/fr/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "Claimity – Claims management. Digital. Efficient.",
    description:
      "Claimity automates the assignment of certified experts — with transparency, quality, and speed.",
    url: "/en/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claimity – Claims management. Digital. Efficient.",
    description:
      "Claimity automatically matches certified experts — for faster processing, less effort, and full transparency.",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-20 lg:py-20 mb-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-sm font-semibold text-[#329AA1] tracking-wide uppercase">
                  Where Claims Find Clarity
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight lg:pr-8">
                  Claims management.
                  <br />
                  Digital. Efficient.
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Claimity automatically assigns certified experts — for faster processing, less administration, and full transparency.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/en/#book">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg">
                    Request a demo
                  </Button>
                </Link>
                <Link href="/en/contact">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-900 hover:bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg flex items-center gap-2 bg-transparent"
                  >
                    Contact us
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-6 pt-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Swiss hosting</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">GDPR-compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Certified experts</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full h-64 md:h-96 lg:h-[550px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/Hero.png"
                alt="Digital claims processing"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Why Claimity */}
      <section id="why" className="bg-gray-50 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Why Claimity</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">From manual to digital</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Traditional claims handling costs time and money. Claimity digitizes the process.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Clock className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Time pressure & limited resources</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Manual processes consume capacity and delay processing
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <FileCheck className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Media breaks & lack of transparency</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                No unified overview of cases and statuses
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <TrendingDown className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Quality & compliance</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Decentralized data jeopardizes quality and auditability
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Users className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Limited availability</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Qualified experts not available in the region
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Zap className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Automated assignment</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Experts are assigned automatically by availability and domain
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <BarChart3 className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Real-time reporting</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Full transparency on statuses, deadlines, and costs in the dashboard
              </p>
            </div>

            {/* Card 7 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <RefreshCw className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">API integration</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Seamless integration into existing systems without media breaks
              </p>
            </div>

            {/* Card 8 */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-[#329AA1]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Rapid expertise</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Large network of qualified experts for quick availability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - How it works */}
      <section id="process" className="bg-white py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-6 md:mb-8">
            {/* Left - Heading */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">How it works</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Four steps to digital claims management
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-2">
                From notification to settlement — fully automated and transparent.
              </p>
            </div>

            {/* Right - Carousel */}
            <FeatureCarousel
              images={[
                { src: "/assets/en/new_claim.png", alt: "Automatic assignment – new claim" },
                { src: "/assets/en/claim.png", alt: "Report damage – upload and recording" },
                { src: "/assets/en/report.png", alt: "Report and closure – standardized documents" },
              ]}
            />
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Dashed Line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 border-t-2 border-dashed border-gray-300"></div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Report a claim</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Upload via portal, API integration, or email — flexible and simple
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Automatic assignment</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The system selects the best expert by availability, domain, and region
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Processing & report</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Expert produces a standardized report — central, digital, and auditable
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Closure & settlement</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Digital approval, automatic settlement, complete documentation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {/* <section className="bg-[#1a1f2e] py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Value in numbers</h2>
              <p className="text-lg text-gray-300">Measurable results through digital transformation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">30%</div>
                <p className="text-sm text-gray-300">Less admin effort</p>
              </div>

              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">24h</div>
                <p className="text-sm text-gray-300">Response time</p>
              </div>

              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">100%</div>
                <p className="text-sm text-gray-300">Digital integration</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Core Functions Section */}
      <section id="features" className="bg-white py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Core functions</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Everything you need for efficient
              <br />
              claims management
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              One platform that digitizes the process from claim notification to settlement.
            </p>
          </div>

          {/* Feature Cards Grid - 2x2 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 - Automated expert assignment */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Zap className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Automated expert assignment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">No more manual search</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Optimal network utilization</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Faster response times</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Transparent assignment criteria</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Real-time status & dashboard */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <BarChart3 className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Real-time status & dashboard</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Live tracking of all cases</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">KPI dashboards for management</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Automatic deadline monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Export & reporting features</span>
                </div>
              </div>
            </div>

            {/* Card 3 - Roles & permissions */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Users className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Roles & permissions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Flexible role definitions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Secure authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Multi-factor authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Granular access control</span>
                </div>
              </div>
            </div>

            {/* Card 4 - GDPR & Swiss hosting */}
            <div className="bg-gray-50 rounded-2xl p-10 space-y-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Shield className="h-7 w-7 text-[#329AA1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">GDPR & Swiss hosting</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Swiss data centers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">End-to-end encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Complete audit trail</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-700">Secure infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Service Areas Section */}
      <section id="modules" className="bg-gray-50 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Service areas</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Three services — one platform</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From vehicle damage to building assessments to fraud investigation: Claimity covers them all.
            </p>
          </div>

          {/* Service Cards Grid - 3 columns */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Vehicle assessments */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              {/* Icon shown below instead of image */}

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="space-y-6 flex-1">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Car className="h-7 w-7 text-[#329AA1]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Vehicle assessments</h3>
                    <p className="text-sm text-gray-600">Comprehensive reports for all vehicle types</p>
                  </div>

                  {/* Checkmark List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Standard damage assessments with detailed calculations
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Short and live assessments for quick decisions
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Invoice review and plausibility checks</span>
                    </div>
                  </div>
                </div>

                <Link href="/en/#book">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg mt-6">
                    Request consultation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 2 - Surveyors */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              {/* Icon shown below instead of image */}

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="space-y-6 flex-1">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <UserCog className="h-7 w-7 text-[#329AA1]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Surveyors</h3>
                    <p className="text-sm text-gray-600">Professional assessment of building and household damage</p>
                  </div>

                  {/* Checkmark List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Building damage: fire, water, storm, earthquake</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Civil engineering damage: foundations, pipelines, infrastructure
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Household damage: inventory, furnishings, valuables</span>
                    </div>
                  </div>
                </div>

                <Link href="/en/#book">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg mt-6">
                    Request consultation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 3 - Fraud investigation */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              {/* Icon shown below instead of image */}

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="space-y-6 flex-1">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <ShieldAlert className="h-7 w-7 text-[#329AA1]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Fraud investigation</h3>
                    <p className="text-sm text-gray-600">Discreet and professional clarification of suspected cases</p>
                  </div>

                  {/* Checkmark List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Clarification of conspicuous damage patterns</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Evidence preservation by certified investigators</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        Comprehensive investigation reports with recommendations
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/en/#book">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg mt-6">
                    Request consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Integration Section */}
      <section id="integration" className="bg-white py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Digital integration</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Integration made easy</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Claimity integrates seamlessly into your existing IT landscape — without complex migration.
                </p>
              </div>

              {/* Checkmark List */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-base text-gray-900">API-first</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-base text-gray-900">Swiss hosting</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-base text-gray-900">GDPR-compliant</span>
                </div>
              </div>

              <Link href="/en/contact">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg font-medium">
                  Schedule a technical call
                </Button>
              </Link>
            </div>

            {/* Right Column - Feature List */}
            <div className="space-y-8">
              {/* Feature 1 - Open API */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="h-6 w-6 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">API integration</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    RESTful API for simple integration with insurance and core systems
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Feature 2 - Secure data transfer */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="h-6 w-6 text-teal-400 rotate-90" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Secure data transfer</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    TLS 1.3, end-to-end encryption, Swiss data centers
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Feature 3 - Customizable workflows */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="h-6 w-6 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Customizable workflows</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Individual assignment logic by region, domain, and priority
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Feature 4 - Zero-trust ready */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Zero-trust ready</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Modern security architecture for the highest compliance requirements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section id="references" className="bg-gray-50 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-0 mb-16">
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">References</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Trust through results</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Learn how Claimity supports insurers and service providers in digitization.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-teal-600 hover:text-teal-600 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="w-12 h-12 rounded-full border-2 border-teal-600 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm">
              <p className="text-base text-gray-900 leading-relaxed">
                “With Claimity we reduced our processing time by 40%. The automatic assignment and constant availability of qualified experts saves us hours every day.”
              </p>
              <div className="border-t border-gray-200"></div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/assets/professional-man-glasses.png" alt="Amin Gerber" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Amin Gerber</div>
                  <div className="text-sm text-gray-600">Management | AFES Switzerland AG</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm">
              <p className="text-base text-gray-900 leading-relaxed">
                “Claimity provides us with a steady stream of expert requests from many insurers. That’s more effective than any sales campaign.”
              </p>
              <div className="border-t border-gray-200"></div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/assets/professional-man-business-executive.jpg"
                    alt="Toni Tulliani"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Toni Tulliani</div>
                  <div className="text-sm text-gray-600">CEO | Car-Logistics AG (HCG)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm">
              <p className="text-base text-gray-900 leading-relaxed">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.”
              </p>
              <div className="border-t border-gray-200"></div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/assets/professional-business-woman.png" alt="Tracy Borer" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Tracy Borer</div>
                  <div className="text-sm text-gray-600">Senior Assurance Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Frequently asked questions</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Everything you need to know</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Answers to the most important questions about Claimity, data protection, and integration.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-0">
            {/* Question 1 */}
            <AccordionItem value="item-1" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Where is our data stored?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                All data is stored exclusively in Swiss data centers. The platform architecture is FINMA-compliant. We ensure full compliance with the Swiss Data Protection Act (DSG) and the EU GDPR.
              </AccordionContent>
            </AccordionItem>

            {/* Question 2 */}
            <AccordionItem value="item-2" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                How does integration into our existing systems work?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                We provide a REST API that lets you seamlessly connect your systems to the Claimity platform. On request, we can develop a custom integration or support you during implementation.
              </AccordionContent>
            </AccordionItem>

            {/* Question 3 */}
            <AccordionItem value="item-3" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                How long does onboarding take?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                You can basically start right away within 24 hours. If you want to customize the process, onboarding typically takes two weeks.
              </AccordionContent>
            </AccordionItem>

            {/* Question 4 */}
            <AccordionItem value="item-4" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                What SLAs do you offer?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                We offer reliable service level agreements tailored to your specific requirements. Individual SLAs can be agreed contractually.
              </AccordionContent>
            </AccordionItem>

            {/* Question 5 */}
            <AccordionItem value="item-5" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                How is expert quality ensured?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                All experts undergo a multi-stage certification process. We verify qualifications, insurances, and conduct regular quality checks.
              </AccordionContent>
            </AccordionItem>

            {/* Question 6 */}
            <AccordionItem value="item-6" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                Are there contract terms?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                We offer complete flexibility: our contracts can be terminated monthly, so you always remain in control of your collaboration with Claimity.
              </AccordionContent>
            </AccordionItem>

            {/* Question 7 */}
            <AccordionItem value="item-7" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-900 py-6 hover:no-underline">
                How does billing work?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-6">
                Our pricing is transparent and contains no hidden costs. You can choose between monthly or per-case billing. All billing reports are available in the dashboard at any time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gray-50 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-white rounded-3xl px-6 md:px-12 py-16 lg:py-20 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center space-y-8">
              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-700 leading-tight">
                  Ready for digital claims management?
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Start today with a non-binding demo and experience how Claimity transforms your processes.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/en/#book">
                  <Button variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg flex items-center gap-2 bg-transparent">
                    Request a demo
                  </Button>
                </Link>
                <Link href="/en/contact">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base rounded-lg font-medium">
                    Contact us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
