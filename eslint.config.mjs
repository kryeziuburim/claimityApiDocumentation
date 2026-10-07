import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Quotes in copy text render fine in React; escaping them hurts readability of the translations.
      "react/no-unescaped-entities": "off",
      // TODO: back to "error" once the OpenAPI types are generated and the any-casts are gone.
      "@typescript-eslint/no-explicit-any": "warn",
      // TODO: back to "error" after the locale merge; the derived-state syncs in ApiPageClient/EndpointDetails need a refactor.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", ".kilo/**", "next-env.d.ts", "components/ui/**"]),
])
