export type VisibleSection = {
  id: string
  /** Distance of the element's top edge from the viewport top, in px. */
  top: number
  /** Small anchors inside a chapter (sub-navigation entries), as opposed to whole chapter sections. */
  isChildAnchor: boolean
}

/**
 * Picks the section to highlight from all sections currently inside the observer's band.
 *
 * Chapter sections are long and stay visible while their child anchors pass by, so a visible child
 * anchor always wins. Among the same kind the topmost one wins: it is the one being read, while the
 * next one is only just entering the band from below.
 */
export function pickActiveSection(visible: readonly VisibleSection[]): string | undefined {
  let best: VisibleSection | undefined
  for (const section of visible) {
    if (
      !best ||
      (section.isChildAnchor && !best.isChildAnchor) ||
      (section.isChildAnchor === best.isChildAnchor && section.top < best.top)
    ) {
      best = section
    }
  }
  return best?.id
}
