export async function copyJsonToClipboard(json: string): Promise<boolean> {
  if (!json) return false
  const fallbackCopy = () => {
    const textarea = document.createElement("textarea")
    textarea.value = json
    textarea.style.position = "fixed"
    textarea.style.left = "-9999px"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
  }

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(json)
    } else {
      fallbackCopy()
    }
    return true
  } catch {
    fallbackCopy()
    return false
  }
}
