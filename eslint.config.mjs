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
      // Leading underscore marks intentionally unused values (e.g. next/font loaders kept for their side effect).
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", ".kilo/**", "next-env.d.ts", "components/ui/**"]),
])
