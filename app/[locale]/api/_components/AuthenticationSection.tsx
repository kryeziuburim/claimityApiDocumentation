import Image from "next/image"

import { CodeBlock, KvpTable } from "@/components/api/doc-primitives"
import type { Locale } from "@/lib/i18n"

import { authenticationMessages } from "./AuthenticationSection.messages"

export function AuthenticationSection({ locale }: { locale: Locale }) {
  const t = authenticationMessages[locale]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">{t.intro}</p>
      </div>

      {/* Auth Flow (Sequence) */}
      <div id="auth-flow" className="space-y-4 rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:space-y-5 sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">{t.flowTitle}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.flowIntro}</p>

        <div className="grid gap-4 md:grid-cols-[440px_1fr] md:items-start md:gap-6">
          <div className="overflow-hidden rounded-lg bg-background">
            <Image
              src="/assets/auth-sequence.webp"
              alt={t.flowImageAlt}
              width={1600}
              height={1342}
              className="h-auto w-full rounded-md"
              sizes="(min-width: 1024px) 440px, 100vw"
              priority
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.flowStepsTitle}</h4>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              {t.flowSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Anchor 1 */}
      <div id="auth-access-token" className="space-y-4 rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:space-y-5 sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">{t.accessTokenTitle}</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">{t.accessTokenIntro}</p>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">{t.prerequisitesTitle}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {t.prerequisites.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <h4 className="text-sm font-semibold">{t.tokenEndpointTitle}</h4>
        <KvpTable
          rows={[
            { k: "URL", v: <span className="font-mono">POST https://app.claimity.ch/v1/oauth/token</span> },
            { k: "Content-Type", v: <span className="font-mono">application/x-www-form-urlencoded</span> },
            {
              k: t.formFieldsLabel,
              v: (
                <div className="space-y-1 text-muted-foreground">
                  <div>
                    <span className="font-mono">grant_type</span> = <span className="font-mono">client_credentials</span>
                  </div>
                  <div>
                    <span className="font-mono">client_id</span> = <span className="font-mono">{t.clientIdPlaceholder}</span>
                  </div>
                  <div>
                    <span className="font-mono">client_assertion_type</span> ={` `}
                    <span className="font-mono">urn:ietf:params:oauth:client-assertion-type:jwt-bearer</span>
                  </div>
                  <div>
                    <span className="font-mono">client_assertion</span> = <span className="font-mono">{"<JWT (RS256)>"}</span>
                  </div>
                  <div>
                    <span className="font-mono">scope</span> <span className="font-mono">{t.optional}</span>
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
              <p className="text-pretty">{t.assertionIntro}</p>
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
                    <span className="font-mono">jti</span> = {t.jtiValue}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <span className="font-mono">iat</span>/<span className="font-mono">exp</span> = “now” / “now+600s” (10 min)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <span className="font-mono">kid</span> {t.optional}
                  </span>
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <CodeBlock title={t.tokenRequestExampleTitle}>
                {`curl -X POST \\
  'https://app.claimity.ch/v1/oauth/token' \\
  -H 'Content-Type: application/x-www-form-urlencoded' \\
  -d 'grant_type=client_credentials' \\
  -d 'client_id=org-expo-00001' \\
  -d 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \\
  -d 'client_assertion=<RS256-JWT-CLIENT-ASSERTION>' \\
  -d 'scope=roles'`}
              </CodeBlock>
            </div>
          </div>
        </details>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">{t.tokenResponseTitle}</h4>
          <p className="text-sm text-muted-foreground text-pretty">{t.tokenResponseText}</p>
        </div>
      </div>

      {/* Anchor 2 */}
      <div id="auth-dpop" className="space-y-4 rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:space-y-5 sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">{t.sendRequestsTitle}</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">{t.sendRequestsIntro}</p>

        <h4 className="text-sm font-semibold">{t.requiredHeadersTitle}</h4>
        <KvpTable
          rows={[
            { k: "Authorization", v: <span className="font-mono">DPoP {"{access_token}"}</span> },
            { k: "DPoP", v: <span className="font-mono">{"{dpop_proof_jwt}"}</span> },
            { k: "Accept", v: <span className="font-mono">application/json</span> },
            { k: "Content-Type", v: <span className="font-mono">application/json</span> },
          ]}
        />

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">{t.dpopContentTitle}</summary>
          <div className="mt-3 grid gap-4 md:grid-cols-2 md:items-start">
            <ul className="space-y-2 break-words text-sm text-muted-foreground">
              {t.dpopContentItems.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">ath</span> = <span className="font-mono">base64url(SHA-256(access_token))</span>
                </span>
              </li>
            </ul>

            <div className="overflow-x-auto">
              <CodeBlock title={t.apiCallExampleTitle}>
                {`curl -X GET \\
  'https://app.claimity.ch/v1/experts/cases?page=1&size=50' \\
  -H 'Accept: application/json' \\
  -H 'Authorization: DPoP {access_token}' \\
  -H 'DPoP: {dpop_proof_jwt}'`}
              </CodeBlock>
            </div>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">{t.troubleshootingTitle}</summary>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">{t.troubleshootingIntro}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {t.troubleshootingItems.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>

        <div id="auth-correlation" className="space-y-3 rounded-lg border border-border bg-muted/20 p-4 scroll-mt-24">
          <h4 className="text-sm font-semibold">{t.correlationTitle}</h4>
          {t.correlationParagraphs.map((paragraph, index) => (
            <p key={index} className="text-sm text-muted-foreground text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
