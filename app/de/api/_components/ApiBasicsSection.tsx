export function ApiBasicsSection() {
  const METHOD_COLORS = {
    GET: "#61AFFE",
    POST: "#49CC90",
    PUT: "#FCA130",
    DELETE: "#F93E3E",
  } as const

  const MethodBadge = ({ method }: { method: keyof typeof METHOD_COLORS }) => (
    <span
      className="inline-flex h-7 w-14 items-center justify-center rounded-md font-mono text-[11px] font-semibold text-white sm:w-20 sm:text-xs"
      style={{ backgroundColor: METHOD_COLORS[method] }}
    >
      {method}
    </span>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">API‑Grundlagen</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Zentrale Konzepte und Konventionen, die in der gesamten API genutzt werden.
        </p>
      </div>

      <div id="basics-request-format" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">Request‑Format</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          Jeder Request besteht aus <strong>Methode</strong>, <strong>URL</strong>, optionalen <strong>Query‑Parametern</strong>, <strong>Headers </strong>
          und (bei <span className="font-mono">POST</span>/<span className="font-mono">PUT</span>) einem{" "}
          <strong>JSON‑Body</strong>.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">URL‑Aufbau</h4>
            <div className="text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Base URL:</span> <span className="font-mono">https://app.claimity.ch</span>
              </div>
              <div className="mt-1">
                <span className="font-medium text-foreground">Path:</span> <span className="font-mono">/v1/&lt;resource&gt;</span>
              </div>
              <div className="mt-1">
                <span className="font-medium text-foreground">Query:</span> z. B. <span className="font-mono">?page=1&size=50</span>
              </div>
            </div>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Beispiel‑URL</div>
              <div className="font-mono text-xs">https://app.claimity.ch/v1/…?page=1&size=50</div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">HTTP‑Methoden</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <MethodBadge method="GET" />
                <span className="text-sm text-muted-foreground">Ressourcen abrufen</span>
              </div>
              <div className="flex items-center gap-3">
                <MethodBadge method="POST" />
                <span className="text-sm text-muted-foreground">Ressourcen erstellen</span>
              </div>
              <div className="flex items-center gap-3">
                <MethodBadge method="PUT" />
                <span className="text-sm text-muted-foreground">Ressourcen ersetzen/aktualisieren</span>
              </div>
              <div className="flex items-center gap-3">
                <MethodBadge method="DELETE" />
                <span className="text-sm text-muted-foreground">Ressourcen löschen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Typische Headers</h4>
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
                  <span className="font-mono">Content-Type: application/json</span> (bei JSON‑Body)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-mono">Authorization: DPoP &lt;access_token&gt;</span>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-mono">DPoP: &lt;dpop_proof_jwt&gt;</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="basics-response-format" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Response‑Format</h3>

        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          Responses sind grundsätzlich <strong>JSON</strong> (<span className="font-mono">Content-Type: application/json</span>) und verwenden
          HTTP‑Statuscodes, um Erfolg/Fehler zu signalisieren.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Erfolgs‑Responses</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>2xx</strong> (z. B. <span className="font-mono">200</span>, <span className="font-mono">201</span>, <span className="font-mono">204</span>)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Body enthält in der Regel ein Objekt oder eine Liste</span>
              </li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Beispiel (Objekt)</div>
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
            <h4 className="mb-2 text-sm font-semibold">Fehler‑Responses (ProblemDetails)</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>4xx/5xx</strong> (z. B. <span className="font-mono">400</span>, <span className="font-mono">401</span>, <span className="font-mono">403</span>, <span className="font-mono">404</span>, <span className="font-mono">429</span>, <span className="font-mono">500</span>)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Body folgt einer ProblemDetails‑ähnlichen Struktur</span>
              </li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Beispiel (Problem‑JSON)</div>
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
          Die Partner-API ist durch Rate Limiting geschützt, um faire Nutzung und Stabilität sicherzustellen. Limits werden{" "}
          <strong>pro Client-Partition</strong> angewendet.
        </p>

        <div className="space-y-4">
          {/* Policies nebeneinander */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Default policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Standard für die Partner-API</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                Für Standard-Endpunkte wird die Anzahl an Abfragen leicht limitiert.
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>TokenBucket</strong>: ca. <strong>60 Requests/Minute</strong>, <strong>Burst</strong> bis <strong>20</strong>,{" "}
                    <strong>Queue</strong> <strong>0</strong>
                  </span>
                </li>
              </ul>
            </div>

            {/* Documents policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Dokument-Routen</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                Für Endpunkte mit <span className="font-mono">.../documents...</span> gelten strengere Limits (z. B. für Upload/Download).
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>TokenBucket</strong>: ca. <strong>20 Requests/Minute</strong>, <strong>Burst</strong> bis <strong>10</strong>,{" "}
                    <strong>Queue</strong> <strong>0</strong>
                  </span>
                </li>
              </ul>
            </div>

            {/* Token policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Token-Endpunkt</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                Der Token-Endpunkt ist streng limitiert um mögliche Attacken zu verhindern.
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>Fixed Window</strong>: <strong>10 Requests/Minute</strong> je <strong>Client</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 429 behavior (aufklappbar) */}
          <details className="rounded-lg border border-border bg-muted/20 p-4">
            <summary className="cursor-pointer text-sm font-semibold">Wenn ein Limit erreicht wird (HTTP 429)</summary>

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
                    Optionaler Header: <span className="font-mono">Retry-After</span>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    Diagnose/Policy-Hinweis: <span className="font-mono">X-RateLimit-Policy</span>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">Body: <strong>Problem-JSON</strong></span>
                </li>
              </ul>
            </div>
          </details>

          {/* Best practices */}
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 text-sm font-semibold">Empfehlungen für Clients</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  Bei <span className="font-mono">429</span> Requests mit <strong>Backoff</strong> wiederholen und{" "}
                  <span className="font-mono">Retry-After</span> beachten.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">Dokument-Uploads/Downloads throttlen.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">Bursts sind begrenzt (kein Queueing) – bei hoher Parallelität kommt es schneller zu 429.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

