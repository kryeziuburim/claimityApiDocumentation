import { defineConfig, devices } from "@playwright/test"

const PORT = 4173

/**
 * End-to-end tests run against the static export (`npm run build` first), served like GitHub Pages.
 * Locally an installed browser can be used instead of Playwright's: PLAYWRIGHT_CHANNEL=msedge npm run test:e2e
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Each test drives a full browser; more workers mostly cause timeouts on busy machines.
  workers: process.env.CI ? 2 : 4,
  timeout: 60_000,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1400, height: 1000 },
        channel: process.env.PLAYWRIGHT_CHANNEL,
      },
    },
  ],
  webServer: {
    command: `node scripts/serve-static.mjs out ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
})
