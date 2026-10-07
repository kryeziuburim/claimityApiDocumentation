/** Copies text via the async Clipboard API, falling back to execCommand. Resolves to whether copying worked. */
export async function copyJsonToClipboard(json: string): Promise<boolean> {
  if (!json) return false
  const fallbackCopy = (): boolean => {
    const textarea = document.createElement("textarea")
    textarea.value = json
    textarea.style.position = "fixed"
    textarea.style.left = "-9999px"
    document.body.appendChild(textarea)
    try {
      textarea.select()
      return document.execCommand("copy")
    } catch {
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }

  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(json)
      return true
    } catch {
      // e.g. permission denied or document not focused
    }
  }
  return fallbackCopy()
}
