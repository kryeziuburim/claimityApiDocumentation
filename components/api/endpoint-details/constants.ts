import type { HttpMethod } from "../openapi-utils"

export const METHOD_ACCENTS: Partial<Record<HttpMethod, string>> = {
  GET: "#E1EDFF",
  POST: "#E4F7EE",
  PUT: "#FFF1DC",
  PATCH: "#FFF1DC",
  DELETE: "#FFE5E5",
}
export const DEFAULT_ACCENT_COLOR = "#2a8289"
export const SCHEMA_EXPLORER_MAX_DEPTH = 6
export const PAYLOAD_FIELD_LINKS = {
  PayloadJson: "#claim-payloads",
  payloadJson: "#claim-payloads",
}
