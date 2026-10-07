import { MethodBadge } from "@/components/api/doc-primitives"

export function ApiBasicsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">API Basics</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Core concepts and conventions used throughout the API.
        </p>
      </div>

      <div id="basics-request-format" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">Request Format</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          Every request consists of <strong>Method</strong>, <strong>URL</strong>, optional <strong>Query Parameters</strong>, <strong>Headers </strong>
          and (for <span className="font-mono">POST</span>/<span className="font-mono">PUT</span>) a{" "}
          <strong>JSON Body</strong>.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">URL Structure</h4>
            <div className="text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Base URL:</span> <span className="font-mono">https://app.claimity.ch</span>
              </div>
              <div className="mt-1">
                <span className="font-medium text-foreground">Path:</span> <span className="font-mono">{"/v1/<resource>"}</span>
              </div>
              <div className="mt-1">
                <span className="font-medium text-foreground">Query:</span> e.g. <span className="font-mono">?page=1&size=50</span>
              </div>
            </div>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Example URL</div>
              <div className="font-mono text-xs">https://app.claimity.ch/v1/…?page=1&size=50</div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">HTTP Methods</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <MethodBadge method="GET" />
                <span className="text-sm text-muted-foreground">Retrieve resources</span>
              </div>
              <div className="flex items-center gap-3">
                <MethodBadge method="POST" />
                <span className="text-sm text-muted-foreground">Create resources</span>
              </div>
              <div className="flex items-center gap-3">
                <MethodBadge method="PUT" />
                <span className="text-sm text-muted-foreground">Replace/update resources</span>
              </div>
              <div className="flex items-center gap-3">
                <MethodBadge method="DELETE" />
                <span className="text-sm text-muted-foreground">Delete resources</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Typical Headers</h4>
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
                  <span className="font-mono">Content-Type: application/json</span> (for JSON Body)
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
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Response Format</h3>

        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          Responses are generally <strong>JSON</strong> (<span className="font-mono">Content-Type: application/json</span>) and use
          HTTP status codes to signal success/error.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Success Responses</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>2xx</strong> (e.g. <span className="font-mono">200</span>, <span className="font-mono">201</span>, <span className="font-mono">204</span>)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Body usually contains an object or a list</span>
              </li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Example (Object)</div>
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

          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Error Responses (ProblemDetails)</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>4xx/5xx</strong> (e.g. <span className="font-mono">400</span>, <span className="font-mono">401</span>, <span className="font-mono">403</span>, <span className="font-mono">404</span>, <span className="font-mono">429</span>, <span className="font-mono">500</span>)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Body follows a ProblemDetails-like structure</span>
              </li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Example (Problem JSON)</div>
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
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Rate Limiting</h3>

        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          The Partner API is protected by rate limiting to ensure fair usage and stability. Limits are applied{" "}
          <strong>per client partition</strong>.
        </p>

        <div className="space-y-4">
          {/* Policies side by side */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* validate-anon policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Anonymous validation</h4>
              </div>
              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                POST /v1/insurers/claims:validate is usable without a token and therefore limited more strictly.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>FixedWindow: 10 requests/minute per client/IP</strong>
                  </span>
                </li>
              </ul>
            </div>
            {/* Default policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Standard for Partner API</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                For standard endpoints, the number of requests is slightly limited.
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>TokenBucket</strong>: approx. <strong>60 Requests/Minute</strong>, <strong>Burst</strong> up to <strong>20</strong>,{" "}
                    <strong>Queue</strong> <strong>0</strong>
                  </span>
                </li>
              </ul>
            </div>

            {/* Documents policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Document Routes</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                For endpoints with <span className="font-mono">.../documents...</span>, stricter limits apply (e.g. for upload/download).
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>TokenBucket</strong>: approx. <strong>20 Requests/Minute</strong>, <strong>Burst</strong> up to <strong>10</strong>,{" "}
                    <strong>Queue</strong> <strong>0</strong>
                  </span>
                </li>
              </ul>
            </div>

            {/* Token policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Token Endpoint</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                The token endpoint is strictly limited to prevent possible attacks.
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>Fixed Window</strong>: <strong>10 Requests/Minute</strong> per <strong>Client</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 429 behavior (collapsible) */}
          <details className="rounded-lg border border-border bg-muted/20 p-4">
            <summary className="cursor-pointer text-sm font-semibold">When a limit is reached (HTTP 429)</summary>

            <div className="mt-3">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    Response: <strong>429 Too Many Requests</strong> (Rejection Code 429)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    Optional Header: <span className="font-mono">Retry-After</span>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    Diagnostic/Policy Hint: <span className="font-mono">X-RateLimit-Policy</span>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">Body: <strong>Problem JSON</strong></span>
                </li>
              </ul>
            </div>
          </details>

          {/* Best practices */}
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 text-sm font-semibold">Recommendations for Clients</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  Retry <span className="font-mono">429</span> requests with <strong>backoff</strong> and{" "}
                  respect <span className="font-mono">Retry-After</span>.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">Throttle document uploads/downloads.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">Bursts are limited (no queuing) – high parallelism leads to 429 faster.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="basics-idempotency" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">Idempotency (Idempotency-Key)</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">POST requests may carry an Idempotency-Key header (any unique value, e.g. a UUID). If the same request is repeated — say after a timeout — the API returns the stored response again without executing the operation a second time.</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary">•</span><span className="text-pretty">The key is bound to method, path, client and payload hash — the same key with a different payload counts as a new request.</span></li>
          <li className="flex gap-2"><span className="text-primary">•</span><span className="text-pretty">Stored responses are kept for replay for 24 hours.</span></li>
          <li className="flex gap-2"><span className="text-primary">•</span><span className="text-pretty">Request bodies over 16 MB bypass idempotency; responses over 16 MB are not stored for replay (a retry re-executes the operation).</span></li>
          <li className="flex gap-2"><span className="text-primary">•</span><span className="text-pretty">Recommendation: always set it on POST /v1/insurers/claims — retries after network errors are then guaranteed to be duplicate-free.</span></li>
        </ul>
      </div>

      <div id="basics-errors" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">Error catalog</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">Errors follow the ProblemDetails structure (title, status, detail). Payload validation errors arrive as ValidationProblemDetails with an errors map; every message names the field path and the concrete expectation.</p>
        <div className="mb-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold">title</th>
                <th className="py-2 font-semibold">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/40">
                <td className="py-2 pr-4 align-top font-mono text-xs">invalid_org_context</td>
                <td className="py-2 text-muted-foreground">The token is not associated with a (single) organization of the expected type.</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 pr-4 align-top font-mono text-xs">forbidden</td>
                <td className="py-2 text-muted-foreground">Access to the resource is not allowed with this token.</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 pr-4 align-top font-mono text-xs">org_without_members</td>
                <td className="py-2 text-muted-foreground">The organization has no members — creation/retrieval is not possible.</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 pr-4 align-top font-mono text-xs">invalid_category</td>
                <td className="py-2 text-muted-foreground">Unknown claim category (allowed: vehicle, appraiser, fraud, special).</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 pr-4 align-top font-mono text-xs">invalid_payload</td>
                <td className="py-2 text-muted-foreground">PayloadJson is missing or not valid JSON.</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 pr-4 align-top font-mono text-xs">invalid_state</td>
                <td className="py-2 text-muted-foreground">The action is not allowed in the current claim status (e.g. reopening a case that is not completed).</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 pr-4 align-top font-mono text-xs">invalid_document / missing_documents</td>
                <td className="py-2 text-muted-foreground">Document invalid, or required documents are missing.</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 pr-4 align-top font-mono text-xs">unsupported_content_type / size_limit_exceeded</td>
                <td className="py-2 text-muted-foreground">File type not allowed, or the upload limit was exceeded.</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 pr-4 align-top font-mono text-xs">upstream_timeout / upstream_error</td>
                <td className="py-2 text-muted-foreground">A downstream service did not respond (in time) — retry with backoff.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <div className="mb-2 text-xs font-medium text-muted-foreground">Example: 400 from payload validation (POST /v1/insurers/claims:validate)</div>
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
      "incidentDate: the incident date cannot be in the future \u2014 got 2099-01-15, today is 2026-08-02 (Europe/Zurich)."
    ]
  }
}`}</code>
          </pre>
        </div>
      </div>

    </div>
  )
}
