/**
 * Badge colors per HTTP method: the familiar Swagger hues as soft badges (tinted background, darker
 * text in the same hue). Text on background meets WCAG AA contrast (≥ 4.5:1, checked by the
 * accessibility e2e tests).
 */
export const METHOD_COLORS = {
  GET: { fg: "#0b5cad", bg: "#e6f0fb", border: "#bcd5f3" },
  POST: { fg: "#1b6b47", bg: "#e6f4ed", border: "#b9dcc9" },
  PUT: { fg: "#8a4d02", bg: "#fbf0e1", border: "#efd2a8" },
  PATCH: { fg: "#8a4d02", bg: "#fbf0e1", border: "#efd2a8" },
  DELETE: { fg: "#b80606", bg: "#fde8e8", border: "#f5bcbc" },
} as const

export type ColoredMethod = keyof typeof METHOD_COLORS

export const DEFAULT_METHOD_COLOR = { fg: "#334155", bg: "#f1f5f9", border: "#cbd5e1" }

/** Inline style for a method badge; unknown methods get a neutral slate badge. */
export function methodBadgeStyle(method: string) {
  const c = (METHOD_COLORS as Record<string, typeof DEFAULT_METHOD_COLOR>)[method] ?? DEFAULT_METHOD_COLOR
  return { color: c.fg, backgroundColor: c.bg, borderColor: c.border }
}
