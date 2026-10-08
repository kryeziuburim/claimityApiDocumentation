import { describe, expect, it } from "vitest"

import { cooldownRemaining, looksLikeBot, MIN_FILL_TIME_MS, SEND_COOLDOWN_MS } from "./spam-guard"

describe("looksLikeBot", () => {
  const startedAt = 1_000_000

  it("accepts a human submission", () => {
    expect(looksLikeBot({ honeypot: "", startedAt, now: startedAt + MIN_FILL_TIME_MS + 1 })).toBe(false)
  })

  it("flags a filled honeypot", () => {
    expect(looksLikeBot({ honeypot: "https://spam.example", startedAt, now: startedAt + 60_000 })).toBe(true)
  })

  it("flags submissions faster than a human could type", () => {
    expect(looksLikeBot({ honeypot: "", startedAt, now: startedAt + 500 })).toBe(true)
  })
})

describe("cooldownRemaining", () => {
  it("allows the first send", () => {
    expect(cooldownRemaining(null, 5_000)).toBe(0)
  })

  it("blocks sends within the cooldown and allows them afterwards", () => {
    expect(cooldownRemaining(10_000, 10_000 + 1_000)).toBe(SEND_COOLDOWN_MS - 1_000)
    expect(cooldownRemaining(10_000, 10_000 + SEND_COOLDOWN_MS)).toBe(0)
  })
})
