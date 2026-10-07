/* eslint-disable @typescript-eslint/no-explicit-any -- JSON Schema documents are untyped input. */

export const VALIDATION_ENDPOINT = "https://app.claimity.ch/v1/insurers/claims:validate"

export type ValidationResult = {
  valid: boolean
  errors: Record<string, string[]> | null
}

export type ValidationState =
  | { status: "idle" }
  | { status: "running" }
  | { status: "error"; message: string; statusCode?: number; errors?: Record<string, string[]> | null }
  | { status: "success"; statusCode: number; data: ValidationResult }

export function normalizeValidationResponse(payload: any): ValidationResult {
  const validValue = typeof payload?.Valid === "boolean" ? payload.Valid : Boolean(payload?.valid)
  const errors = normalizeValidationErrors(payload?.Errors ?? payload?.errors)
  return {
    valid: validValue,
    errors,
  }
}

export function normalizeValidationErrors(errors: any): Record<string, string[]> | null {
  if (!errors || typeof errors !== "object") {
    return null
  }
  const normalized: Record<string, string[]> = {}
  Object.entries(errors).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      normalized[key] = value.map((entry) => String(entry))
      return
    }
    if (value === undefined || value === null) {
      return
    }
    normalized[key] = [String(value)]
  })
  return Object.keys(normalized).length ? normalized : null
}
