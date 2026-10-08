import { MethodBadge } from "@/components/api/doc-primitives"
import type { Locale } from "@/lib/i18n"

import { apiBasicsMessages } from "./ApiBasicsSection.messages"

const METHODS = ["GET", "POST", "PUT", "DELETE"] as const

export function ApiBasicsSection({ locale }: { locale: Locale }) {
  const t = apiBasicsMessages[locale]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">{t.intro}</p>
      </div>

      <div id="basics-request-format" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">{t.requestFormatTitle}</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">{t.requestFormatText}</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-4">
            <h4 className="mb-2 text-sm font-semibold">{t.urlStructureTitle}</h4>
            <div className="text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">{t.baseUrlLabel}</span>{" "}
                <span className="font-mono">https://app.claimity.ch</span>
              </div>
              <div className="mt-1">
                <span className="font-medium text-foreground">{t.pathLabel}</span>{" "}
                <span className="font-mono">{t.pathValue}</span>
              </div>
              <div className="mt-1">
                <span className="font-medium text-foreground">{t.queryLabel}</span> {t.eg}{" "}
                <span className="font-mono">?page=1&size=50</span>
              </div>
            </div>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">{t.exampleUrlTitle}</div>
              <div className="font-mono text-xs">https://app.claimity.ch/v1/…?page=1&size=50</div>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-4">
            <h4 className="mb-2 text-sm font-semibold">{t.httpMethodsTitle}</h4>
            <div className="space-y-2">
              {METHODS.map((method) => (
                <div key={method} className="flex items-center gap-3">
                  <MethodBadge method={method} />
                  <span className="text-sm text-muted-foreground">{t.methods[method]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-4">
            <h4 className="mb-2 text-sm font-semibold">{t.typicalHeadersTitle}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-mono">Accept: application/json</span>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-mono">Content-Type: application/json</span> {t.contentTypeNote}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-mono">{"Authorization: DPoP <access_token>"}</span>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-mono">{"DPoP: <dpop_proof_jwt>"}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="basics-response-format" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">{t.responseFormatTitle}</h3>

        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">{t.responseFormatText}</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-4">
            <h4 className="mb-2 text-sm font-semibold">{t.successTitle}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>2xx</strong> ({t.eg} <span className="font-mono">200</span>,{" "}
                  <span className="font-mono">201</span>, <span className="font-mono">204</span>)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{t.successBody}</span>
              </li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">{t.exampleObjectTitle}</div>
              <pre className="overflow-x-auto text-xs">
                <code className="font-mono">{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "…",
  "…": "…"
}`}</code>
              </pre>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-4">
            <h4 className="mb-2 text-sm font-semibold">{t.errorTitle}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>4xx/5xx</strong> ({t.eg} <span className="font-mono">400</span>,{" "}
                  <span className="font-mono">401</span>, <span className="font-mono">403</span>,{" "}
                  <span className="font-mono">404</span>, <span className="font-mono">429</span>,{" "}
                  <span className="font-mono">500</span>)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{t.errorBody}</span>
              </li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">{t.exampleProblemTitle}</div>
              <pre className="overflow-x-auto text-xs">
                <code className="font-mono">{`HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "type": "about:blank",
  "title": "Bad Request",
  "status": 400,
  "detail": "…"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div id="basics-rate-limiting" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">{t.rateLimitTitle}</h3>

        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">{t.rateLimitIntro}</p>

        <div className="space-y-4">
          {/* Policies side by side */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* validate-anon policy */}
            <div className="rounded-lg bg-muted/30 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">{t.anonPolicyTitle}</h4>
              </div>
              <p className="mb-2 text-sm text-muted-foreground text-pretty">{t.anonPolicyText}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>{t.anonPolicyLimit}</strong>
                  </span>
                </li>
              </ul>
            </div>
            {/* Default policy */}
            <div className="rounded-lg bg-muted/30 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">{t.defaultPolicyTitle}</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">{t.defaultPolicyText}</p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">{t.defaultPolicyLimit}</span>
                </li>
              </ul>
            </div>

            {/* Documents policy */}
            <div className="rounded-lg bg-muted/30 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">{t.documentsPolicyTitle}</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">{t.documentsPolicyText}</p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">{t.documentsPolicyLimit}</span>
                </li>
              </ul>
            </div>

            {/* Token policy */}
            <div className="rounded-lg bg-muted/30 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">{t.tokenPolicyTitle}</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">{t.tokenPolicyText}</p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">{t.tokenPolicyLimit}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 429 behavior (collapsible) */}
          <details className="rounded-lg bg-muted/30 p-4">
            <summary className="cursor-pointer text-sm font-semibold">{t.limitReachedTitle}</summary>

            <div className="mt-3">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {t.limitReachedItems.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          {/* Best practices */}
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 text-sm font-semibold">{t.recommendationsTitle}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.recommendations.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id="basics-idempotency" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">{t.idempotencyTitle}</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">{t.idempotencyIntro}</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {t.idempotencyItems.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-primary">•</span>
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div id="basics-errors" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">{t.errorCatalogTitle}</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">{t.errorCatalogIntro}</p>
        <div className="mb-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold">title</th>
                <th className="py-2 font-semibold">{t.meaningHeader}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(t.errorMeanings).map(([title, meaning]) => (
                <tr key={title} className="border-b border-border/40">
                  <td className="py-2 pr-4 align-top font-mono text-xs">{title}</td>
                  <td className="py-2 text-muted-foreground">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <div className="mb-2 text-xs font-medium text-muted-foreground">{t.validationExampleTitle}</div>
          <pre className="overflow-x-auto text-xs leading-relaxed">
            <code className="font-mono">{`HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "PayloadJson": [
      "PayloadJson does not match the required schema for the selected category.",
      "counterparty.email: is required.",
      "workshop.country: must be one of: CH, DE, AT, FR, IT, LI.",
      "incidentDate: the incident date cannot be in the future — got 2099-01-15, today is 2026-08-02 (Europe/Zurich)."
    ]
  }
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
