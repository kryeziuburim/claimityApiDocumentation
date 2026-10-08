import { locales, type Locale } from "@/lib/i18n"

import { claimPayloadMessages } from "./ClaimPayloadSection.messages"

export type ClaimPayloadMeta = {
  key: string
  navTitle: string
  anchorId: string
  label: string
  schemaPath: string
  badgeLabel: string
}

const CLAIM_PAYLOAD_DEFINITIONS = [
  { key: "vehicle", anchorId: "payloads-vehicle", schemaPath: "/assets/schemas/vehicle-claim.schema.json" },
  { key: "appraiser", anchorId: "payloads-appraiser", schemaPath: "/assets/schemas/appraiser-claim.schema.json" },
  { key: "fraud", anchorId: "payloads-fraud", schemaPath: "/assets/schemas/fraud-claim.schema.json" },
  { key: "special", anchorId: "payloads-special", schemaPath: "/assets/schemas/special-claim.schema.json" },
] as const

// Built once per locale so every caller gets a referentially stable array.
const CLAIM_PAYLOADS_BY_LOCALE = Object.fromEntries(
  locales.map((locale) => [
    locale,
    CLAIM_PAYLOAD_DEFINITIONS.map((definition) => ({
      ...definition,
      ...claimPayloadMessages[locale].payloads[definition.key],
    })),
  ]),
) as Record<Locale, ClaimPayloadMeta[]>

/** Payload categories with their localized nav titles and labels. Keys, anchors and schema paths are locale-independent. */
export function getClaimPayloads(locale: Locale): ClaimPayloadMeta[] {
  return CLAIM_PAYLOADS_BY_LOCALE[locale]
}
