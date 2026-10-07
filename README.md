# Claimity Help Center & API Documentation

Static Next.js site (help center, manual, support form and API documentation) deployed to GitHub Pages.

## Development

```bash
npm ci
cp .env.example .env   # EmailJS keys for the support form (optional locally)
npm run dev            # http://localhost:3000
```

| Script              | Purpose                                 |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Dev server                              |
| `npm run build`     | Static export to `out/`                 |
| `npm run lint`      | ESLint (Next core-web-vitals + TS)      |
| `npm run typecheck` | `tsc --noEmit`                          |

CI (`.github/workflows/ci.yml`) runs lint, typecheck and build on every pull request.
Pushes to `main` deploy to GitHub Pages (`.github/workflows/deploy.yml`).

## Structure

```
app/
  [locale]/              one route tree for all languages (de, en, fr)
    page.tsx             help center home
    api/                 API documentation (sections in _components/)
    manual/ support/ legal-notice/
  page.tsx               redirects / to the default locale
  not-found.tsx          404 page (locale detected from the URL)
components/
  api/                   OpenAPI rendering (endpoints, schema explorer)
  ui/                    shadcn/ui primitives
lib/
  i18n.ts                locales, path helpers, hreflang alternates
  metadata.ts            pageMetadata(): title, description, canonical, OG/Twitter
public/assets/
  openapi.json           API spec rendered on the API page
  schemas/               JSON schemas for claim payloads
  <locale>/              PDF guides per language
```

## Translations

Every locale-dependent component has a colocated messages file, e.g.
`OverviewSection.tsx` + `OverviewSection.messages.ts`:

```ts
const de = { title: "Übersicht", /* ... */ }
export const overviewMessages: Record<Locale, typeof de> = { de, en: { /* ... */ }, fr: { /* ... */ } }
```

`Record<Locale, typeof de>` makes TypeScript fail the build if a language is missing a key.
Pages get the locale from `params`; shared client components use `useLocale()` (`hooks/use-locale.ts`).

**Adding a language** (e.g. `it`): add it to `locales` in `lib/i18n.ts`, then let `npm run typecheck`
list every messages file that needs the new translations.

**Adding a page**: create `app/[locale]/<name>/page.tsx` with `generateMetadata` using `pageMetadata({ locale, path: "<name>/", ... })`.
