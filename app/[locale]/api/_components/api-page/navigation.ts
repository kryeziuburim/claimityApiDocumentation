import type React from "react"
import { BookOpen, Bug, Code, FileJson, FileText, History, Lock, Shield, Users } from "lucide-react"

import { locales, type Locale } from "@/lib/i18n"

import { apiPageClientMessages } from "../ApiPageClient.messages"
import { getClaimPayloads } from "../claim-payload/payloads"

export interface NavItem {
  id: string
  title: string
  icon: React.ElementType
  children?: { id: string; title: string; method?: "GET" | "POST" | "PUT" | "DELETE" }[]
}

function buildNavigationItems(locale: Locale): NavItem[] {
  const t = apiPageClientMessages[locale].nav
  return [
    { id: "overview", title: t.overview, icon: FileText },
    { id: "first-steps", title: t.firstSteps, icon: BookOpen },
    { id: "reporting", title: t.reporting, icon: Bug },
    { id: "changelog", title: t.changelog, icon: History },
    {
      id: "authentication",
      title: t.authentication,
      icon: Lock,
      children: [
        { id: "auth-flow", title: "Authentication Flow" },
        { id: "auth-access-token", title: "OAuth 2.0 / Access Token" },
        { id: "auth-dpop", title: "DPoP / API Requests" },
      ],
    },
    {
      id: "api-basics",
      title: t.apiBasics,
      icon: Code,
      children: [
        { id: "basics-request-format", title: t.basicsRequestFormat },
        { id: "basics-response-format", title: t.basicsResponseFormat },
        { id: "basics-rate-limiting", title: t.basicsRateLimiting },
        { id: "basics-idempotency", title: t.basicsIdempotency },
        { id: "basics-errors", title: t.basicsErrors },
      ],
    },
    {
      id: "experts",
      title: t.experts,
      icon: Users,
      children: [
        { id: "experts-cases-list", method: "GET", title: "Cases" },
        { id: "experts-cases-get", method: "GET", title: "Case" },
        { id: "experts-cases-comment", method: "PUT", title: "Expert comment" },
        { id: "experts-cases-amounts", method: "PUT", title: "Case amounts" },
        { id: "experts-cases-reopen", method: "POST", title: "Reopen case" },
        { id: "experts-cases-docs-list", method: "GET", title: "Documents" },
        { id: "experts-cases-docs-get", method: "GET", title: "Document" },

        { id: "experts-reports-draft-create", method: "POST", title: "Report draft" },
        { id: "experts-reports-draft-update", method: "PUT", title: "Report draft" },
        { id: "experts-reports-list", method: "GET", title: "Reports" },
        { id: "experts-reports-submission-get", method: "GET", title: "Report submission" },

        { id: "experts-submission-docs-list", method: "GET", title: "Submission documents" },
        { id: "experts-submission-docs-add", method: "POST", title: "Submission document" },
        { id: "experts-submission-docs-delete", method: "DELETE", title: "Submission document" },
        { id: "experts-submission-submit", method: "POST", title: "Submission" },
      ],
    },
    {
      id: "insurer",
      title: t.insurer,
      icon: Shield,
      children: [
        { id: "insurer-claims-list", method: "GET", title: "Claims" },
        { id: "insurer-claims-create", method: "POST", title: "Claim" },
        { id: "insurer-claims-validate", method: "POST", title: "Claims validation" },
        { id: "insurer-claims-get", method: "GET", title: "Claim" },

        { id: "insurer-claim-docs-list", method: "GET", title: "Documents" },
        { id: "insurer-claim-docs-add", method: "POST", title: "Document" },
        { id: "insurer-claim-docs-get", method: "GET", title: "Document" },

        { id: "insurer-claim-reports-list", method: "GET", title: "Reports" },
        { id: "insurer-claim-report-docs-list", method: "GET", title: "Report documents" },
      ],
    },
    {
      id: "payloads",
      title: t.payloads,
      icon: FileJson,
      children: [
        ...getClaimPayloads(locale).map((payload) => ({ id: payload.anchorId, title: payload.navTitle })),
        { id: "claim-payload-validation", title: t.payloadValidation },
      ],
    },
  ]
}

// Built once per locale so the hooks below get a referentially stable array.
const NAVIGATION_ITEMS_BY_LOCALE = Object.fromEntries(
  locales.map((locale) => [locale, buildNavigationItems(locale)]),
) as Record<Locale, NavItem[]>

/** Sub-entry id -> id of the chapter it belongs to. */
function buildChildToParent(items: NavItem[]): Record<string, string> {
  const map: Record<string, string> = {}
  items.forEach((i) => {
    i.children?.forEach((c) => {
      map[c.id] = i.id
    })
  })
  return map
}

const CHILD_TO_PARENT_BY_LOCALE = Object.fromEntries(
  locales.map((locale) => [locale, buildChildToParent(NAVIGATION_ITEMS_BY_LOCALE[locale])]),
) as Record<Locale, Record<string, string>>

/** Sidebar entries for a locale; arrays and maps are referentially stable per locale. */
export function getApiNavigation(locale: Locale) {
  return { items: NAVIGATION_ITEMS_BY_LOCALE[locale], childToParent: CHILD_TO_PARENT_BY_LOCALE[locale] }
}

// Sidebar-Einblendung ab dem ersten Bereich ("Übersicht") und alle nachfolgenden Kapitel.
export const SIDEBAR_CHAPTERS = new Set([
  "overview",
  "first-steps",
  "reporting",
  "changelog",
  "authentication",
  "api-basics",
  "experts",
  "insurer",
  "payloads",
])
