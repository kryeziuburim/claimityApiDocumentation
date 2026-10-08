import { expect, test, waitForClaimSchemas } from "./fixtures"

const VALIDATE_URL = "https://app.claimity.ch/v1/insurers/claims:validate"

test.describe("claim payloads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/de/api/")
    await waitForClaimSchemas(page)
  })

  test("copies the example JSON and confirms with a toast", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions are Chromium-only")
    await context.grantPermissions(["clipboard-read", "clipboard-write"])
    const panel = page.locator('#claim-payloads [role="tabpanel"][data-state="active"]')

    await panel.getByRole("button", { name: "JSON kopieren" }).click()

    await expect(page.getByText("JSON kopiert").first()).toBeVisible()
    const clipboard = await page.evaluate(() => navigator.clipboard.readText())
    expect(() => JSON.parse(clipboard)).not.toThrow()
  })

  test("shows the rules derived from the schema", async ({ page }) => {
    const panel = page.locator('#claim-payloads [role="tabpanel"][data-state="active"]')
    await panel.getByRole("button", { name: "Regeln & Abhängigkeiten" }).click()
    await expect(panel.getByText(/^Wenn /).first()).toBeVisible()
  })

  test.describe("payload tester", () => {
    const tester = (page: import("@playwright/test").Page) => page.locator("#claim-payload-validation")

    test("inserts the generated example", async ({ page }) => {
      await tester(page).getByRole("button", { name: "Beispiel übernehmen" }).click()
      await expect(page.getByText("Beispiel übernommen").first()).toBeVisible()
      const value = await tester(page).locator("#payload-json-editor").inputValue()
      expect(() => JSON.parse(value)).not.toThrow()
    })

    test("rejects invalid JSON without calling the API", async ({ page }) => {
      let called = false
      await page.route(VALIDATE_URL, (route) => {
        called = true
        return route.abort()
      })
      await tester(page).locator("#payload-json-editor").fill("{ kaputt")
      await tester(page).getByRole("button", { name: "Payload validieren" }).click()
      await expect(tester(page).getByText(/JSON konnte nicht geparst werden/)).toBeVisible()
      expect(called).toBe(false)
    })

    test("shows a valid result from the API", async ({ page }) => {
      await page.route(VALIDATE_URL, (route) => route.fulfill({ json: { Valid: true, Errors: null } }))
      await tester(page).getByRole("button", { name: "Beispiel übernehmen" }).click()
      await tester(page).getByRole("button", { name: "Payload validieren" }).click()
      await expect(tester(page).getByText("Payload ist valide")).toBeVisible()
      await expect(tester(page).getByText("HTTP 200").first()).toBeVisible()
    })

    test("lists field errors returned by the API", async ({ page }) => {
      await page.route(VALIDATE_URL, (route) =>
        route.fulfill({ json: { Valid: false, Errors: { incidentDate: ["darf nicht in der Zukunft liegen"] } } })
      )
      await tester(page).getByRole("button", { name: "Beispiel übernehmen" }).click()
      await tester(page).getByRole("button", { name: "Payload validieren" }).click()
      await expect(tester(page).getByText("Payload verletzt Validierungsregeln")).toBeVisible()
      await expect(tester(page).getByText("darf nicht in der Zukunft liegen")).toBeVisible()
    })

    test("shows a localized message when the request fails", async ({ page }) => {
      await page.route(VALIDATE_URL, (route) => route.abort())
      await tester(page).getByRole("button", { name: "Beispiel übernehmen" }).click()
      await tester(page).getByRole("button", { name: "Payload validieren" }).click()
      await expect(tester(page).getByText("Netzwerkfehler bei der Validierung.")).toBeVisible()
    })
  })
})
