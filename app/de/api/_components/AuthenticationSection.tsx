import type React from "react"

import Image from "next/image"

export function AuthenticationSection() {
  const CodeBlock = ({ title, children }: { title: string; children: string }) => (
    <div className="rounded-lg border border-border bg-muted/20">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="text-xs font-medium text-muted-foreground">{title}</div>
      </div>
      <pre className="overflow-x-auto p-3 text-xs">
        <code className="font-mono text-foreground">{children}</code>
      </pre>
    </div>
  )

  const KvpTable = ({ rows }: { rows: { k: string; v: React.ReactNode }[] }) => (
    <div className="overflow-x-auto rounded-lg border border-border bg-muted/20">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className="border-t border-border/60 first:border-t-0 align-top">
              <td className="w-56 px-3 py-2 font-mono text-xs text-muted-foreground">{r.k}</td>
              <td className="px-3 py-2 text-sm">{r.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Authentifizierung</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Die Claimity Partner API nutzt <strong>OAuth 2.0 Client Credentials</strong> mit <strong>JWT Client Assertion (RS256) </strong>
          und sichert jede Anfrage zusätzlich mit <strong>DPoP Proof-of-Possession (ES256)</strong>. Dadurch ist der Access Token an die
          konkrete Anfrage gebunden.
        </p>
      </div>

      {/* Auth Flow (Sequence) */}
      <div id="auth-flow" className="rounded-lg border border-border bg-card p-6 space-y-4 scroll-mt-24">
        <h3 className="text-xl font-semibold">Authentication Flow</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">So funktioniert der OAuth2 Client-Credentials Flow.</p>

        <div className="grid gap-6 md:grid-cols-[440px_1fr] md:items-start">
          <div className="overflow-hidden rounded-lg bg-background">
            <Image
              src="/assets/Auth_Sqeuence.png"
              alt="Authentication Flow Sequenzdiagramm (OAuth2 Client Credentials + DPoP)"
              width={1200}
              height={675}
              className="h-auto w-full rounded-md"
              sizes="(min-width: 1024px) 440px, 100vw"
              priority
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Ablauf</h4>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Key Pair</strong>: Organisation erstellt RSA Key Pair in Claimity (Private Key wird sicher
                gespeichert).
              </li>
              <li>
                <strong className="text-foreground">JWT Client Assertion</strong>: Client erzeugt ein kurzlebiges JWT (RS256).
              </li>
              <li>
                <strong className="text-foreground">Token Request</strong>: Client sendet <span className="font-mono">POST /v1/oauth/token</span> (Client-Credentials + Assertion).
              </li>
              <li>
                <strong className="text-foreground">Validierung</strong>: Auth-Server prüft Signatur der Assertion und die Berechtigungen und liefert
                Token-Response.
              </li>
              <li>
                <strong className="text-foreground">Abfrage-URL</strong>: Der Client erstellt die Abfrage-URL (inkl. Query-Parameter).
              </li>
              <li>
                <strong className="text-foreground">DPoP Proof</strong>: Client erstellt pro Request ein DPoP-JWT (ES256) gebunden an Methode + URL.
              </li>
              <li>
                <strong className="text-foreground">API Call</strong>: Client ruft Endpunkt auf mit <span className="font-mono">Authorization: DPoP </span>
                <span className="font-mono">access_token</span> und <span className="font-mono">DPoP: …</span>.
              </li>
              <li>
                <strong className="text-foreground">Response</strong>: API prüft Token/DPoP und verarbeitet die Anfrage / liefert die Response.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Anchor 1 */}
      <div id="auth-access-token" className="rounded-lg border border-border bg-card p-6 space-y-4 scroll-mt-24">
        <h3 className="text-xl font-semibold">Access Token auslesen</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">
          Für Partner-Integrationen authentifiziert sich Ihre Organisation über eine <strong>signierte JWT Client Assertion</strong>.
        </p>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">Voraussetzungen</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span className="text-pretty">
                <strong>Client ID</strong> (z. B. <span className="font-mono">org-expo-00001</span>) auslesbar aus den Claimity Organisationseinstellungen
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span className="text-pretty">
                <strong>Private RSA Key</strong> aus den Claimity Organisationseinstellungen (sicher aufbewaren und niemals teilen)
              </span>
            </li>
          </ul>
        </div>

        <h4 className="text-sm font-semibold">Token Endpoint</h4>
        <KvpTable
          rows={[
            { k: "URL", v: <span className="font-mono">POST https://app.claimity.ch/v1/oauth/token</span> },
            { k: "Content-Type", v: <span className="font-mono">application/x-www-form-urlencoded</span> },
            {
              k: "Form Fields",
              v: (
                <div className="space-y-1 text-muted-foreground">
                  <div>
                    <span className="font-mono">grant_type</span> = <span className="font-mono">client_credentials</span>
                  </div>
                  <div>
                    <span className="font-mono">client_id</span> = <span className="font-mono">&lt;Ihre client id&gt;</span>
                  </div>
                  <div>
                    <span className="font-mono">client_assertion_type</span> ={` `}
                    <span className="font-mono">urn:ietf:params:oauth:client-assertion-type:jwt-bearer</span>
                  </div>
                  <div>
                    <span className="font-mono">client_assertion</span> = <span className="font-mono">&lt;JWT (RS256)&gt;</span>
                  </div>
                  <div>
                    <span className="font-mono">scope</span> <span className="font-mono">(optional)</span>
                  </div>
                </div>
              ),
            },
          ]}
        />

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">JWT Client Assertion (RS256)</summary>
          <div className="mt-3 grid gap-4 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-sm text-muted-foreground text-pretty">
                Die Assertion ist ein kurzlebiges JWT (10 Minuten) und wird mit deinem <strong>RSA Private Key</strong> signiert.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <span className="font-mono">iss</span>/<span className="font-mono">sub</span> = <span className="font-mono">client_id</span>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <span className="font-mono">aud</span> = https://app.claimity.ch/realms/claimity/protocol/openid-connect/token
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <span className="font-mono">jti</span> = UUID (einzigartig)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <span className="font-mono">iat</span>/<span className="font-mono">exp</span> = “now” / “now+90s”
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <span className="font-mono">kid</span> (optional)
                  </span>
                </li>
              </ul>
            </div>

            <CodeBlock
              title="Beispiel: Token Request (cURL, Platzhalter)"
              children={`curl -X POST \\
  'https://app.claimity.ch/v1/oauth/token' \\
  -H 'Content-Type: application/x-www-form-urlencoded' \\
  -d 'grant_type=client_credentials' \\
  -d 'client_id=org-expo-00001' \\
  -d 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \\
  -d 'client_assertion=<RS256-JWT-CLIENT-ASSERTION>' \\
  -d 'scope=roles'`}
            />
          </div>
        </details>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">Token Response</h4>
          <p className="text-sm text-muted-foreground text-pretty">
            Die Response enthält ein <span className="font-mono">access_token</span>. Wichtig: Für API-Aufrufe wird dieser Token als
            <strong> DPoP Token</strong> verwendet.
          </p>
        </div>
      </div>

      {/* Anchor 2 */}
      <div id="auth-dpop" className="rounded-lg border border-border bg-card p-6 space-y-4 scroll-mt-24">
        <h3 className="text-xl font-semibold">API Requests senden</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">
          Jede Anfrage benötigt zusätzlich einen <strong>DPoP Proof JWT</strong>. Dieser wird <strong>pro Request</strong> erzeugt und signiert
          (ES256) und bindet die Anfrage an Methode + URL.
        </p>

        <h4 className="text-sm font-semibold">Erforderliche Headers</h4>
        <KvpTable
          rows={[
            { k: "Authorization", v: <span className="font-mono">DPoP {"{access_token}"}</span> },
            { k: "DPoP", v: <span className="font-mono">{"{dpop_proof_jwt}"}</span> },
            { k: "Accept", v: <span className="font-mono">application/json</span> },
            { k: "Content-Type", v: <span className="font-mono">application/json</span> },
          ]}
        />

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">DPoP Proof Inhalt</summary>
          <div className="mt-3 grid gap-4 md:grid-cols-2 md:items-start">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">htu</span> muss die <strong>exakte URL</strong> inkl. Query-String sein
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">htm</span> muss exakt der HTTP-Methode entsprechen (GET/POST/PUT/DELETE)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">jti</span> muss <strong>pro Request neu</strong> sein (keine Replays)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">iat</span> muss innerhalb des erlaubten Zeitfensters liegen (Clock-Skew vermeiden)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">ath</span> = <span className="font-mono">base64url(SHA-256(access_token))</span>
                </span>
              </li>
            </ul>

            <CodeBlock
              title="Beispiel: Authentifizierter API Call (cURL)"
              children={`curl -X GET \\
  'https://app.claimity.ch/v1/experts/cases?page=1&size=50' \\
  -H 'Accept: application/json' \\
  -H 'Authorization: DPoP {access_token}' \\
  -H 'DPoP: {dpop_proof_jwt}'`}
            />
          </div>
        </details>

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">Troubleshooting: 401 invalid_dpop</summary>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">Häufige Ursachen:</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>htu mismatch</strong>: URL muss exakt inkl. Query sein
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>htm mismatch</strong>: Methode muss passen
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>iat</strong> außerhalb des Fensters: Systemzeit korrigieren
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>replay</strong>: <span className="font-mono">jti</span> muss pro Request neu sein
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>ath mismatch</strong>: <span className="font-mono">SHA-256(access_token)</span> base64url
              </span>
            </li>
          </ul>
        </details>
      </div>
    </div>
  )
}

