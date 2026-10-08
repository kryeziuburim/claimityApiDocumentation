import { expect, test } from "./fixtures"

const PAGES = ["", "api/", "manual/", "support/", "legal-notice/"]
const LOCALES = ["de", "en", "fr"] as const
const HTML_LANG = { de: "de-CH", en: "en", fr: "fr-CH" }

test.describe("localized pages", () => {
  for (const locale of LOCALES) {
    for (const path of PAGES) {
      test(`/${locale}/${path} renders without errors`, async ({ page }) => {
        const response = await page.goto(`/${locale}/${path}`)
        expect(response?.status()).toBe(200)
        await expect(page.locator("h1, h2").first()).toBeVisible()
        await expect.poll(() => page.evaluate(() => document.documentElement.lang)).toBe(HTML_LANG[locale])
      })
    }
  }

  test("language switcher keeps the current page and section", async ({ page }) => {
    await page.goto("/de/api/")
    await page.getByRole("button", { name: "Language selection" }).first().click()
    await page.getByRole("menuitem", { name: /Français/ }).click()
    await expect(page).toHaveURL(/\/fr\/api\/$/)
    await expect(page.getByRole("heading", { name: "Vue d'ensemble" }).first()).toBeVisible()
  })

  for (const [locale, title, cta] of [
    ["de", "Seite nicht gefunden", "Support kontaktieren"],
    ["en", "Page not found", "Contact Support"],
    ["fr", "Page introuvable", "Contacter l'assistance"],
  ] as const) {
    // 404.html is prerendered once; it must hydrate cleanly and then switch to the URL's language.
    test(`404 page is shown in ${locale}`, async ({ page }) => {
      const response = await page.goto(`/${locale}/does-not-exist/`)
      expect(response?.status()).toBe(404)
      await expect(page.getByRole("heading", { name: title })).toBeVisible()
      await expect(page.getByRole("link", { name: cta })).toHaveAttribute("href", `/${locale}/support/`)
    })
  }
})
