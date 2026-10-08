import { describe, expect, it } from "vitest"

import { normalizeValidationErrors, normalizeValidationResponse } from "./validation"

describe("normalizeValidationResponse", () => {
  it("accepts PascalCase and camelCase responses", () => {
    expect(normalizeValidationResponse({ Valid: true, Errors: null })).toEqual({ valid: true, errors: null })
    expect(normalizeValidationResponse({ valid: false, errors: { a: ["x"] } })).toEqual({
      valid: false,
      errors: { a: ["x"] },
    })
  })

  it("treats a missing body as invalid without errors", () => {
    expect(normalizeValidationResponse(null)).toEqual({ valid: false, errors: null })
  })
})

describe("normalizeValidationErrors", () => {
  it("turns single values into arrays and drops empty entries", () => {
    expect(normalizeValidationErrors({ a: "msg", b: ["x", 2], c: null, d: undefined })).toEqual({
      a: ["msg"],
      b: ["x", "2"],
    })
  })

  it("returns null when nothing is left", () => {
    expect(normalizeValidationErrors({})).toBeNull()
    expect(normalizeValidationErrors("oops")).toBeNull()
  })
})
