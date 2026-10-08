/**
 * Badge colors per HTTP method: the familiar Swagger hues, darkened just enough for white text to meet
 * WCAG AA contrast (≥ 4.5:1, checked by the accessibility e2e tests).
 */
export const METHOD_COLORS = {
  GET: "#0172e3",
  POST: "#258358",
  PUT: "#ad6103",
  PATCH: "#ad6103",
  DELETE: "#e80707",
} as const

export type ColoredMethod = keyof typeof METHOD_COLORS
