import { isRecord } from "@/lib/json-schema"

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

export function normalizeValidationResponse(payload: unknown): ValidationResult {
  const body = isRecord(payload) ? payload : undefined
  const validValue = typeof body?.Valid === "boolean" ? body.Valid : Boolean(body?.valid)
  const errors = normalizeValidationErrors(body?.Errors ?? body?.errors)
  return {
    valid: validValue,
    errors,
  }
}

export function normalizeValidationErrors(errors: unknown): Record<string, string[]> | null {
  if (!isRecord(errors)) {
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
