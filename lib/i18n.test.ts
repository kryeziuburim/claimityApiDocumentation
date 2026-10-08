import { describe, expect, it } from "vitest"

import { localeFromPathname, localizeHref, pageAlternates, switchLocaleInPath } from "./i18n"

describe("localeFromPathname", () => {
  it.each([
    ["/en/api/", "en"],
    ["/fr", "fr"],
    ["/de/support/", "de"],
    ["/english/", "de"],
    ["/", "de"],
    [null, "de"],
  ])("%s -> %s", (pathname, locale) => {
    expect(localeFromPathname(pathname)).toBe(locale)
  })
})

describe("switchLocaleInPath", () => {
  it.each([
    ["/de/api/", "fr", "/fr/api/"],
    ["/de", "en", "/en/"],
    ["/", "en", "/en/"],
    ["/support", "fr", "/fr/support/"],
  ] as const)("%s to %s -> %s", (pathname, target, expected) => {
    expect(switchLocaleInPath(pathname, target)).toBe(expected)
  })
})

describe("localizeHref", () => {
  it("prefixes in-app paths and anchors", () => {
    expect(localizeHref("/support", "fr")).toBe("/fr/support/")
    expect(localizeHref("/de/manual/", "en")).toBe("/en/manual/")
    expect(localizeHref("#book", "en")).toBe("/en/#book")
  })

  it("leaves external, mailto and tel links untouched", () => {
    for (const href of ["https://app.claimity.ch", "mailto:info@claimity.ch", "tel:+41783447736"]) {
      expect(localizeHref(href, "en")).toBe(href)
    }
  })
})

describe("pageAlternates", () => {
  it("points every language at the same page", () => {
    expect(pageAlternates("en", "api/")).toEqual({
      canonical: "/en/api/",
      languages: { "de-CH": "/de/api/", en: "/en/api/", fr: "/fr/api/", it: "/it/api/", "x-default": "/de/api/" },
    })
  })
})
