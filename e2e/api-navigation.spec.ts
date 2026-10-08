import { expect, navState, test, topOf, waitForClaimSchemas } from "./fixtures"

// Anchors land below the sticky header (scroll-padding-top 64px); sections add scroll-mt-8 (96px in total),
// payload tab sections have no margin.
const HEADER_HEIGHT = 64
const SECTION_TOP = 96

test.describe("API page navigation", () => {
  test("sidebar entry scrolls to its section and is highlighted (not the next one)", async ({ page }) => {
    await page.goto("/de/api/")
    // Start inside the content, past the hero.
    await page.evaluate(() => document.getElementById("overview")!.scrollIntoView())
    await page.locator('[data-nav-id="insurer"]').click()
    await page.locator('[data-nav-id="insurer-claims-create"]').click()

    await expect
      .poll(() => navState(page))
      .toEqual({ hash: "#insurer-claims-create", activeNav: "insurer-claims-create" })
    await expect.poll(() => topOf(page, "insurer-claims-create")).toBeCloseTo(SECTION_TOP, -1)
  })

  test("scrolling manually updates hash and highlight", async ({ page }) => {
    await page.goto("/de/api/")
    await page.evaluate(() => {
      const experts = document.getElementById("experts")!
      window.scrollTo(0, experts.getBoundingClientRect().top + window.scrollY + 1500)
    })
    await expect.poll(async () => (await navState(page)).hash).toMatch(/^#experts-/)
  })

  test("payload tab click scrolls to the tab and keeps its anchor", async ({ page }) => {
    await page.goto("/de/api/")
    await waitForClaimSchemas(page)
    await page.locator("#claim-payloads").getByRole("tab", { name: "Sachverständiger" }).click()

    await expect.poll(() => navState(page)).toEqual({ hash: "#payloads-appraiser", activeNav: "payloads-appraiser" })
    await expect.poll(() => topOf(page, "payloads-appraiser")).toBeCloseTo(HEADER_HEIGHT, -1)
  })

  test("deep link to a payload tab selects and shows it", async ({ page }) => {
    await page.goto("/de/api/#payloads-fraud")

    await expect(page.locator("#claim-payloads").getByRole("tab", { selected: true })).toHaveText(
      "Bekämpfung Versicherungsmissbrauch",
    )
    await expect.poll(() => topOf(page, "payloads-fraud"), { timeout: 10_000 }).toBeCloseTo(HEADER_HEIGHT, -1)
    await expect.poll(() => navState(page)).toEqual({ hash: "#payloads-fraud", activeNav: "payloads-fraud" })
  })

  test("deep link to a section stays aligned while the page settles", async ({ page }) => {
    await page.goto("/de/api/#basics-errors")
    await page.waitForTimeout(3000) // past the layout shifts (sidebar padding, fonts)
    expect(await topOf(page, "basics-errors")).toBeCloseTo(SECTION_TOP, -1)
    expect(await navState(page)).toEqual({ hash: "#basics-errors", activeNav: "basics-errors" })
  })

  test("hash change selects the payload tab", async ({ page }) => {
    await page.goto("/de/api/")
    // Change the hash only once the page is interactive (Next.js resets it while its router initializes).
    await waitForClaimSchemas(page)
    await page.evaluate(() => {
      location.hash = "payloads-special"
    })
    await expect(page.locator("#claim-payloads").getByRole("tab", { selected: true })).toHaveText("Spezialexpertisen")
    await expect.poll(() => topOf(page, "payloads-special")).toBeCloseTo(HEADER_HEIGHT, -1)
  })
})
