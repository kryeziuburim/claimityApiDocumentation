import { describe, expect, it } from "vitest"

import { breadcrumbJsonLd, organizationJsonLd, serializeJsonLd, techArticleJsonLd } from "./structured-data"

describe("structured data", () => {
  it("uses absolute URLs on the production domain", () => {
    const crumbs = breadcrumbJsonLd("fr", "Centre d'aide", { path: "api/", name: "Documentation API" })
    expect(crumbs.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Centre d'aide", item: "https://docs.claimity.ch/fr/" },
      { "@type": "ListItem", position: 2, name: "Documentation API", item: "https://docs.claimity.ch/fr/api/" },
    ])
    expect(organizationJsonLd().logo).toBe("https://docs.claimity.ch/logo.png")
  })

  it("links the article to its language and preview image", () => {
    const article = techArticleJsonLd("it", { path: "api/", title: "Documentazione API", description: "…" })
    expect(article).toMatchObject({
      inLanguage: "it-CH",
      url: "https://docs.claimity.ch/it/api/",
      image: "https://docs.claimity.ch/it/og/api.png",
    })
  })

  it("escapes < so the JSON cannot close its script tag", () => {
    expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).not.toContain("</script>")
  })
})
