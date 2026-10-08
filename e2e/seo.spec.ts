import { expect, test } from "@playwright/test"

// Checks the served files directly (no browser rendering): what a crawler gets on the first request.

test("API content is part of the exported HTML", async ({ request }) => {
  const html = await (await request.get("/de/api/")).text()
  // endpoint field description (OpenAPI spec), endpoint path, claim payload rule text (claim schemas)
  expect(html).toContain("Partner-sync cursor")
  expect(html).toContain("/v1/insurers/claims/{claimId}")
  expect(html).toContain("claimInsurance")
  // all four payload categories, not only the active tab
  for (const anchor of ["payloads-vehicle", "payloads-appraiser", "payloads-fraud", "payloads-special"]) {
    expect(html).toContain(`id="${anchor}"`)
  }
})

test("sitemap lists every page in every language and robots.txt points to it", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text()
  expect(sitemap.match(/<url>/g)).toHaveLength(20)
  expect(sitemap).toContain("<loc>https://docs.claimity.ch/it/api/</loc>")
  expect(sitemap).toContain('hreflang="x-default"')

  const robots = await (await request.get("/robots.txt")).text()
  expect(robots).toContain("Sitemap: https://docs.claimity.ch/sitemap.xml")
})

test("pages have absolute canonical/hreflang and a reachable preview image", async ({ request }) => {
  const html = await (await request.get("/fr/support/")).text()
  expect(html).toContain('<link rel="canonical" href="https://docs.claimity.ch/fr/support/"/>')
  expect(html).toContain('hrefLang="it" href="https://docs.claimity.ch/it/support/"')
  expect(html).toContain("<title>Support | Claimity</title>")

  const image = html.match(/<meta property="og:image" content="https:\/\/docs\.claimity\.ch([^"]+)"/)?.[1]
  expect(image).toBe("/fr/og/support.png")
  const response = await request.get(image!)
  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toBe("image/png")
})

test("the root redirects to the default language without JavaScript", async ({ request }) => {
  const html = await (await request.get("/")).text()
  expect(html).toContain('<meta http-equiv="refresh" content="0; url=/de/"/>')
  expect(html).toContain('<link rel="canonical" href="https://docs.claimity.ch/de/"/>')
})
