import { describe, expect, it } from "vitest"

import { pickActiveSection, type VisibleSection } from "./scroll-spy"

const chapter = (id: string, top: number): VisibleSection => ({ id, top, isChildAnchor: false })
const anchor = (id: string, top: number): VisibleSection => ({ id, top, isChildAnchor: true })

describe("pickActiveSection", () => {
  it("returns undefined when nothing is visible", () => {
    expect(pickActiveSection([])).toBeUndefined()
  })

  it("prefers a visible child anchor over its long chapter section", () => {
    expect(pickActiveSection([chapter("insurer", -4000), anchor("insurer-claims-list", 120)])).toBe("insurer-claims-list")
  })

  it("falls back to the chapter once no child anchor is visible", () => {
    // Regression: only the entries of the latest observer callback used to be considered, so the
    // last anchor that entered the band stayed active after it had left.
    expect(pickActiveSection([chapter("payloads", -500)])).toBe("payloads")
  })

  it("picks the topmost section, not the one just entering from below", () => {
    // Regression: after navigating to "Create claim" (scrolled to the top), the next endpoint card
    // below it was highlighted instead.
    expect(pickActiveSection([anchor("insurer-claims-validate", 202), anchor("insurer-claims-create", 96)])).toBe(
      "insurer-claims-create"
    )
    expect(pickActiveSection([chapter("first-steps", 250), chapter("overview", -300)])).toBe("overview")
  })
})
