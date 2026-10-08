import AxeBuilder from "@axe-core/playwright"

import { expect, test, waitForClaimSchemas } from "./fixtures"

// WCAG 2.1 A/AA rules; the build fails on serious and critical violations.
const BLOCKING = new Set(["serious", "critical"])

for (const path of [
  "/de/",
  "/de/api/",
  "/de/manual/",
  "/de/support/",
  "/de/legal-notice/",
  "/en/api/",
  "/fr/api/",
  "/it/api/",
]) {
  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path)
    if (path.endsWith("/api/")) await waitForClaimSchemas(page)
    // Analyze the final state: mid-animation (fading in) text would report spurious contrast issues.
    await page.addStyleTag({
      content: "*, *::before, *::after { animation: none !important; transition: none !important; }",
    })

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze()
    const blocking = results.violations
      .filter((v) => BLOCKING.has(v.impact ?? ""))
      .map((v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length}× e.g. ${v.nodes[0]?.target.join(" ")}`)

    expect(blocking).toEqual([])
  })
}
