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
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Authentification</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          L'API Partenaire Claimity utilise **OAuth 2.0 Client Credentials** avec **JWT Client Assertion (RS256)** et sécurise chaque requête avec **DPoP Proof-of-Possession (ES256)**. Cela lie le jeton d'accès à la requête spécifique.
        </p>
      </div>

      {/* Auth Flow (Sequence) */}
      <div id="auth-flow" className="space-y-4 rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:space-y-5 sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">Flux d'authentification</h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">Comment fonctionne le flux OAuth2 Client-Credentials.</p>

        <div className="grid gap-4 md:grid-cols-[440px_1fr] md:items-start md:gap-6">
          <div className="overflow-hidden rounded-lg bg-background">
            <Image
              src="/assets/Auth_Sqeuence.png"
              alt="Diagramme de séquence du flux d'authentification (OAuth2 Client Credentials + DPoP)"
              width={1200}
              height={675}
              className="h-auto w-full rounded-md"
              sizes="(min-width: 1024px) 440px, 100vw"
              priority
            />
          </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Processus</h4>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Paire de clés</strong> : L'organisation crée une paire de clés RSA dans Claimity (la clé privée est stockée en toute sécurité).
              </li>
              <li>
                <strong className="text-foreground">JWT Client Assertion</strong> : Le client génère un JWT de courte durée (RS256).
              </li>
              <li>
                <strong className="text-foreground">Demande de jeton</strong> : Le client envoie <span className="font-mono">POST /v1/oauth/token</span> (Client-Credentials + Assertion).
              </li>
              <li>
                <strong className="text-foreground">Validation</strong> : Le serveur d'authentification vérifie la signature de l'assertion et les autorisations et renvoie la réponse du jeton.
              </li>
              <li>
                <strong className="text-foreground">URL de requête</strong> : Le client crée l'URL de requête (y compris les paramètres de requête).
              </li>
              <li>
                <strong className="text-foreground">Preuve DPoP</strong> : Le client crée un JWT DPoP (ES256) par requête lié à la méthode + URL.
              </li>
              <li>
                <strong className="text-foreground">Appel API</strong> : Le client appelle le point de terminaison avec <span className="font-mono">Authorization: DPoP </span>
                <span className="font-mono">access_token</span> et <span className="font-mono">DPoP: …</span>.
              </li>
              <li>
                <strong className="text-foreground">Réponse</strong> : L'API vérifie le jeton/DPoP et traite la demande / renvoie la réponse.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Anchor 1 */}
      <div id="auth-access-token" className="space-y-4 rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:space-y-5 sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">Lire le jeton d'accès</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">
          Pour les intégrations partenaires, votre organisation s'authentifie via une <strong>JWT Client Assertion signée</strong>.
        </p>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">Prérequis</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span className="text-pretty">
                <strong>Client ID</strong> (par ex. <span className="font-mono">org-expo-00001</span>) lisible dans les paramètres de l'organisation Claimity
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span className="text-pretty">
                <strong>Clé privée RSA</strong> des paramètres de l'organisation Claimity (à conserver en lieu sûr et ne jamais partager)
              </span>
            </li>
          </ul>
        </div>

        <h4 className="text-sm font-semibold">Point de terminaison de jeton</h4>
        <KvpTable
          rows={[
            { k: "URL", v: <span className="font-mono">POST https://app.claimity.ch/v1/oauth/token</span> },
            { k: "Content-Type", v: <span className="font-mono">application/x-www-form-urlencoded</span> },
            {
              k: "Champs de formulaire",
              v: (
                <div className="space-y-1 text-muted-foreground">
                  <div>
                    <span className="font-mono">grant_type</span> = <span className="font-mono">client_credentials</span>
                  </div>
                  <div>
                    <span className="font-mono">client_id</span> = <span className="font-mono">{"<Votre client id>"}</span>
                  </div>
                  <div>
                    <span className="font-mono">client_assertion_type</span> ={` `}
                    <span className="font-mono">urn:ietf:params:oauth:client-assertion-type:jwt-bearer</span>
                  </div>
                  <div>
                    <span className="font-mono">client_assertion</span> = <span className="font-mono">{"<JWT (RS256)>"}</span>
                  </div>
                  <div>
                    <span className="font-mono">scope</span> <span className="font-mono">(optionnel)</span>
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
                L'assertion est un JWT de courte durée (10 minutes) et est signée avec votre <strong>clé privée RSA</strong>.
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
                    <span className="font-mono">kid</span> (optionnel)
                  </span>
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <CodeBlock
                title="Exemple : Demande de jeton (cURL, espace réservé)"
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
          <h4 className="mb-2 text-sm font-semibold">Réponse du jeton</h4>
          <p className="text-sm text-muted-foreground text-pretty">
            La réponse contient un <span className="font-mono">access_token</span>. Important : Pour les appels API, ce jeton est utilisé comme
            <strong> jeton DPoP</strong>.
          </p>
        </div>
      </div>

      {/* Anchor 2 */}
      <div id="auth-dpop" className="space-y-4 rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:space-y-5 sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">Envoyer des requêtes API</h3>

        <p className="leading-relaxed text-muted-foreground text-pretty">
          Chaque requête nécessite en plus un <strong>JWT de preuve DPoP</strong>. Celui-ci est généré <strong>par requête</strong> et signé
          (ES256) et lie la requête à la méthode + URL.
        </p>

        <h4 className="text-sm font-semibold">En-têtes requis</h4>
        <KvpTable
          rows={[
            { k: "Authorization", v: <span className="font-mono">DPoP {"{access_token}"}</span> },
            { k: "DPoP", v: <span className="font-mono">{"{dpop_proof_jwt}"}</span> },
            { k: "Accept", v: <span className="font-mono">application/json</span> },
            { k: "Content-Type", v: <span className="font-mono">application/json</span> },
          ]}
        />

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold">Contenu de la preuve DPoP</summary>
          <div className="mt-3 grid gap-4 md:grid-cols-2 md:items-start">
            <ul className="space-y-2 break-words text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">htu</span> doit être l'<strong>URL exacte</strong> y compris la chaîne de requête
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">htm</span> doit correspondre exactement à la méthode HTTP (GET/POST/PUT/DELETE)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">jti</span> doit être <strong>nouveau par requête</strong> (pas de relectures)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  <span className="font-mono">iat</span> doit être dans la fenêtre de temps autorisée (éviter le décalage d'horloge)
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
                title="Exemple : Appel API authentifié (cURL)"
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
          <summary className="cursor-pointer text-sm font-semibold">Dépannage : 401 invalid_dpop</summary>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">Causes courantes :</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>htu mismatch</strong> : L'URL doit être exacte y compris la requête
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>htm mismatch</strong> : La méthode doit correspondre
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>iat</strong> hors fenêtre : Corriger l'heure système
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>replay</strong> : <span className="font-mono">jti</span> doit être nouveau par requête
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>ath mismatch</strong> : <span className="font-mono">SHA-256(access_token)</span> base64url
              </span>
            </li>
          </ul>
        </details>
      </div>
    </div>
  )
}
