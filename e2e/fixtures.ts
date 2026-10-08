import { test as base, expect, type Page } from "@playwright/test"

/** Every test fails on uncaught page errors (including React hydration mismatches). */
export const test = base.extend<{ pageErrors: string[] }>({
  pageErrors: [
    async ({ page }, use) => {
      const errors: string[] = []
      page.on("pageerror", (error) => errors.push(error.message))
      await use(errors)
      expect(errors, "uncaught errors in the page").toEqual([])
    },
    { auto: true },
  ],
})

export { expect }

/** The URL hash and the highlighted sidebar entry of the API page. */
export async function navState(page: Page) {
  return page.evaluate(() => ({
    hash: location.hash,
    activeNav:
      document.querySelector<HTMLElement>('aside [aria-current="page"]:not([aria-expanded])')?.dataset.navId ?? null,
  }))
}

/** Distance of an element's top edge from the viewport top. */
export async function topOf(page: Page, id: string) {
  return page.evaluate((elementId) => document.getElementById(elementId)?.getBoundingClientRect().top ?? NaN, id)
}

/** Waits until the claim payload schemas are loaded (the active panel renders its accordion instead of a skeleton). */
export async function waitForClaimSchemas(page: Page) {
  await page.locator('#claim-payloads [role="tabpanel"][data-state="active"] button[aria-expanded]').first().waitFor()
}
