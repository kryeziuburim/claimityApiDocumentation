/**
 * Client-side spam heuristics for forms that send directly to a third-party service (no backend of our own).
 * They don't stop a determined attacker, but they filter the bulk of form-filling bots cheaply.
 */

/** Humans need longer than this to fill in a form; bots usually submit immediately. */
export const MIN_FILL_TIME_MS = 3000
/** Minimum gap between two successful sends from the same browser. */
export const SEND_COOLDOWN_MS = 60_000

/** True when the submission looks automated: the hidden honeypot field was filled or it was submitted too fast. */
export function looksLikeBot({
  honeypot,
  startedAt,
  now,
}: {
  honeypot: string
  startedAt: number
  now: number
}): boolean {
  return honeypot.trim() !== "" || now - startedAt < MIN_FILL_TIME_MS
}

/** Milliseconds until another send is allowed (0 = allowed). */
export function cooldownRemaining(lastSentAt: number | null, now: number, cooldownMs = SEND_COOLDOWN_MS): number {
  if (lastSentAt === null) return 0
  return Math.max(0, lastSentAt + cooldownMs - now)
}
