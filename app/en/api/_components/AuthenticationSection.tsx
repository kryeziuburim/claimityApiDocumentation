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
    <div className="rounded-lg border border-border bg-muted/20">
      <table className="hidden w-full text-left text-sm sm:table">
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className="border-t border-border/60 first:border-t-0 align-top">
              <td className="w-56 px-3 py-2 font-mono text-xs text-muted-foreground">{r.k}</td>
              <td className="px-3 py-2 text-sm">{r.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="space-y-3 p-3 text-sm text-muted-foreground sm:hidden">
        {rows.map((r) => (
          <div key={`${r.k}-mobile`} className="rounded-lg border border-border/60 bg-background/80 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{r.k}</p>
            <div className="mt-2 text-sm text-foreground">{r.v}</div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Authentication</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          The Claimity Partner API uses <strong>OAuth 2.0 Client Credentials</strong> with <strong>JWT Client Assertion (RS256) </strong>
          and additionally secures every request with <strong>DPoP Proof-of-Possession (ES256)</strong>. This binds the Access Token to the
          specific request.
        </p>
      </div>

      {/* Auth Flow (Sequence) */}
      <div id="auth-flow" className="space-y-4 rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:space-y-5 sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">Authentication Flow</h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">How the OAuth2 Client-Credentials Flow works.</p>

        <div className="grid gap-4 md:grid-cols-[440px_1fr] md:items-start md:gap-6">
          <div className="overflow-hidden rounded-lg bg-background">
            <Image
              src="/assets/Auth_Sqeuence.png"
              alt="Authentication Flow Sequence Diagram (OAuth2 Client Credentials + DPoP)"
              width={1200}
              height={675}
              className="h-auto w-full rounded-md"
              sizes="(min-width: 1024px) 440px, 100vw"
              priority
            />
          </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Process</h4>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Key Pair</strong>: Organization creates RSA Key Pair in Claimity (Private Key is stored securely).
              </li>
              <li>
                <strong className="text-foreground">JWT Client Assertion</strong>: Client generates a short-lived JWT (RS256).
              </li>
              <li>
                <strong className="text-foreground">Token Request</strong>: Client sends <span className="font-mono">POST /v1/oauth/token</span> (Client-Credentials + Assertion).
              </li>
              <li>
                <strong className="text-foreground">Validation</strong>: Auth server checks signature of the assertion and permissions and returns Token Response.
              </li>
              <li>
                <strong className="text-foreground">Query URL</strong>: The client creates the query URL (incl. query parameters).
              </li>
              <li>
                <strong className="text-foreground">DPoP Proof</strong>: Client creates a DPoP JWT (ES256) per request bound to method + URL.
              </li>
              <li>
                <strong className="text-foreground">API Call</strong>: Client calls endpoint with <span className="font-mono">Authorization: DPoP </span>
                <span className="font-mono">access_token</span> and <span className="font-mono">DPoP: …</span>.
              </li>
              <li>
                <strong className="text-foreground">Response</strong>: API checks Token/DPoP and processes the request / returns the response.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Anchor 1 */}
      <div id="auth-access-token" className="space-y-4 rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:space-y-5 sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">Read Access Token</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">
          For partner integrations, your organization authenticates via a <strong>signed JWT Client Assertion</strong>.
        </p>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">Prerequisites</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span className="text-pretty">
                <strong>Client ID</strong> (e.g. <span className="font-mono">org-expo-00001</span>) readable from Claimity organization settings
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span className="text-pretty">
                <strong>Private RSA Key</strong> from Claimity organization settings (keep safe and never share)
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
                    <span className="font-mono">client_id</span> = <span className="font-mono">{"<Your client id>"}</span>
                  </div>
                  <div>
                    <span className="font-mono">client_assertion_type</span> ={` `}
                    <span className="font-mono">urn:ietf:params:oauth:client-assertion-type:jwt-bearer</span>
                  </div>
                  <div>
                    <span className="font-mono">client_assertion</span> = <span className="font-mono">{"<JWT (RS256)>"}</span>
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
            <div className="space-y-3 break-words text-sm text-muted-foreground">
              <p className="text-pretty">
                The assertion is a short-lived JWT (10 minutes) and is signed with your <strong>RSA Private Key</strong>.
              </p>
              <ul className="space-y-2">
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
                    <span className="font-mono">jti</span> = UUID (unique)
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

            <div className="overflow-x-auto">
              <CodeBlock
                title="Example: Token Request (cURL, placeholder)"
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
          </div>
        </details>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">Token Response</h4>
          <p className="text-sm text-muted-foreground text-pretty">
            The response contains an <span className="font-mono">access_token</span>. Important: For API calls, this token is used as a
            <strong> DPoP Token</strong>.
          </p>
        </div>
      </div>

      {/* Anchor 2 */}
      <div id="auth-dpop" className="space-y-4 rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:space-y-5 sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">Send API Requests</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">
          Every request additionally requires a <strong>DPoP Proof JWT</strong>. This is generated <strong>per request</strong> and signed
          (ES256) and binds the request to method + URL.
        </p>

        <h4 className="text-sm font-semibold">Required Headers</h4>
        <KvpTable
          rows={[
            { k: "Authorization", v: <span className="font-mono">DPoP {"{access_token}"}</span> },
            { k: "DPoP", v: <span className="font-mono">{"{dpop_proof_jwt}"}</span> },
            { k: "Accept", v: <span className="font-mono">application/json</span> },
            { k: "Content-Type", v: <span className="font-mono">application/json</span> },
          ]}
        />

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">DPoP Proof Content</summary>
          <div className="mt-3 grid gap-4 md:grid-cols-2 md:items-start">
            <ul className="space-y-2 break-words text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">htu</span> must be the <strong>exact URL</strong> incl. query string
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">htm</span> must correspond exactly to the HTTP method (GET/POST/PUT/DELETE)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">jti</span> must be <strong>new per request</strong> (no replays)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">iat</span> must be within the allowed time window (avoid clock skew)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">ath</span> = <span className="font-mono">base64url(SHA-256(access_token))</span>
                </span>
              </li>
            </ul>

            <div className="overflow-x-auto">
              <CodeBlock
                title="Example: Authenticated API Call (cURL)"
                children={`curl -X GET \\
  'https://app.claimity.ch/v1/experts/cases?page=1&size=50' \\
  -H 'Accept: application/json' \\
  -H 'Authorization: DPoP {access_token}' \\
  -H 'DPoP: {dpop_proof_jwt}'`}
              />
            </div>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">Troubleshooting: 401 invalid_dpop</summary>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">Common causes:</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>htu mismatch</strong>: URL must be exact incl. query
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>htm mismatch</strong>: Method must match
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>iat</strong> outside window: Correct system time
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>replay</strong>: <span className="font-mono">jti</span> must be new per request
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
