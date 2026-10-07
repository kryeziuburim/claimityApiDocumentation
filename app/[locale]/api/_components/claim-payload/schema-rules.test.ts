import fs from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { locales } from "@/lib/i18n"
import { dereferenceSchema } from "@/lib/claim-schema"

import { claimPayloadMessages } from "./ClaimPayloadSection.messages"
import { buildClaimRuleGroups, extractFormatHints } from "./schema-rules"
import { buildSchemaStats } from "./schema-stats"
import { getClaimPayloads } from "./payloads"

// Characterization tests: the human-readable rule and format texts shown on the API page are derived from the
// claim schemas. These snapshots make every change to that output visible in review (update with `vitest -u`).

const PUBLIC_DIR = path.join(process.cwd(), "public")

describe.each(getClaimPayloads("de"))("$key schema", ({ key, schemaPath }) => {
  const schema = dereferenceSchema(JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, schemaPath), "utf8")))

  it("stats", () => {
    expect(buildSchemaStats(schema)).toMatchSnapshot()
  })

  it.each(locales)("rules and format hints (%s)", (locale) => {
    const t = claimPayloadMessages[locale].rules
    const ruleGroups = buildClaimRuleGroups(schema, t)
    expect(ruleGroups.length, `${key} should produce rules`).toBeGreaterThan(0)
    expect({ ruleGroups, formatHints: extractFormatHints(schema, t) }).toMatchSnapshot()
  })
})
