// Post-build step: give every exported page the <html lang> of its locale.
//
// The root layout sits above the [locale] segment, so Next renders <html lang="de-CH"> on every page and
// the client fixes it after hydration (components/html-lang-setter.tsx). Moving the root layout into
// [locale] would need Next's experimental global-not-found, so the static HTML is patched here instead.
//
// Usage (runs automatically as npm "postbuild"): node --experimental-strip-types scripts/set-html-lang.ts [outDir]
import fs from "node:fs"
import path from "node:path"

import { defaultLocale, htmlLang, locales } from "../lib/i18n.ts"

const outDir = path.resolve(process.argv[2] ?? "out")
const HTML_LANG_ATTR = /<html([^>]*?)\slang="[^"]*"/

function htmlFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return htmlFiles(full)
    return entry.name.endsWith(".html") ? [full] : []
  })
}

let patched = 0
for (const locale of locales) {
  const dir = path.join(outDir, locale)
  if (!fs.existsSync(dir) || locale === defaultLocale) continue
  for (const file of htmlFiles(dir)) {
    const html = fs.readFileSync(file, "utf8")
    if (!HTML_LANG_ATTR.test(html)) throw new Error(`No <html lang> found in ${file}`)
    fs.writeFileSync(file, html.replace(HTML_LANG_ATTR, `<html$1 lang="${htmlLang[locale]}"`))
    patched++
  }
}
console.log(`set-html-lang: patched ${patched} pages`)
