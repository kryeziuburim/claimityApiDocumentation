import { expect, navState, test, topOf, waitForClaimSchemas } from "./fixtures"

// Runs in the "mobile" project (phone viewport, touch); see playwright.config.ts.

const PAGES = ["/de/", "/de/api/", "/de/manual/", "/de/support/", "/de/legal-notice/", "/fr/api/", "/en/support/"]

test.describe("mobile layout", () => {
  for (const path of PAGES) {
    test(`${path} has no horizontal overflow`, async ({ page }) => {
      await page.goto(path)
      if (path.endsWith("/api/")) await waitForClaimSchemas(page)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })
  }
})

test.describe("API page menu (off-canvas sidebar)", () => {
  const sidebar = (page: import("@playwright/test").Page) => page.locator("#api-sidebar")
  const isOnScreen = (page: import("@playwright/test").Page) =>
    sidebar(page).evaluate((el) => el.getBoundingClientRect().right > 0)

  test("opens, locks page scrolling and closes via the backdrop", async ({ page }) => {
    await page.goto("/de/api/")
    const menuButton = page.getByRole("button", { name: "Menü", exact: true })

    await expect(menuButton).toHaveAttribute("aria-expanded", "false")
    await menuButton.click()
    await expect(menuButton).toHaveAttribute("aria-expanded", "true")
    await expect.poll(() => isOnScreen(page)).toBe(true)
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden")

    await page.getByRole("button", { name: "Menü schliessen" }).click({ position: { x: 360, y: 400 } })
    await expect.poll(() => isOnScreen(page)).toBe(false)
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("")
  })

  test("navigating from the menu closes it and scrolls to the section", async ({ page }) => {
    await page.goto("/de/api/")
    await page.getByRole("button", { name: "Menü", exact: true }).click()
    await page.locator('[data-nav-id="insurer"]').click()
    await page.locator('[data-nav-id="insurer-claims-create"]').click()

    await expect.poll(() => isOnScreen(page)).toBe(false)
    await expect
      .poll(() => navState(page))
      .toEqual({ hash: "#insurer-claims-create", activeNav: "insurer-claims-create" })
    await expect.poll(() => topOf(page, "insurer-claims-create")).toBeCloseTo(96, -1)
  })

  test("payload tab from the menu selects and shows the tab", async ({ page }) => {
    await page.goto("/de/api/")
    await waitForClaimSchemas(page)
    await page.getByRole("button", { name: "Menü", exact: true }).click()
    await page.locator('[data-nav-id="payloads"]').click()
    await page.locator('[data-nav-id="payloads-special"]').click()

    await expect(page.locator("#claim-payloads").getByRole("tab", { selected: true })).toHaveText("Spezialexpertisen")
    await expect.poll(() => topOf(page, "payloads-special")).toBeCloseTo(64, -1) // below the sticky header
  })

  test("language switcher works on mobile", async ({ page }) => {
    await page.goto("/de/api/")
    // The desktop switcher is hidden below lg; use the one next to the menu button.
    await page.getByRole("button", { name: "Language selection" }).locator("visible=true").click()
    await page.getByRole("menuitem", { name: /English/ }).click()
    await expect(page).toHaveURL(/\/en\/api\/$/)
    await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeVisible()
  })
})

test("404 page header menu opens and links to the localized pages", async ({ page }) => {
  await page.goto("/fr/does-not-exist/")
  await page.getByRole("button", { name: "Open menu" }).click()
  const menu = page.getByRole("dialog")
  await expect(menu.getByRole("link", { name: "Assistance" })).toHaveAttribute("href", /^\/fr\/support/)
  await expect(menu.getByRole("link", { name: "Intégration API" })).toHaveAttribute("href", /^\/fr\/api/)
})
