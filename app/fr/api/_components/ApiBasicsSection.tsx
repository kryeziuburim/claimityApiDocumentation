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
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Bases de l'API</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Concepts et conventions de base utilisés dans toute l'API.
        </p>
      </div>

      <div id="basics-request-format" className="rounded-lg border border-border bg-card p-4 scroll-mt-24 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">Format de requête</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          Chaque requête se compose de **Méthode**, **URL**, **Paramètres de requête** optionnels, **En-têtes** et (pour <span className="font-mono">POST</span>/<span className="font-mono">PUT</span>) un{" "}
          <strong>Corps JSON</strong>.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Structure de l'URL</h4>
            <div className="text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Base URL :</span> <span className="font-mono">https://app.claimity.ch</span>
              </div>
              <div className="mt-1">
                <span className="font-medium text-foreground">Chemin :</span> <span className="font-mono">{"/v1/<ressource>"}</span>
              </div>
              <div className="mt-1">
                <span className="font-medium text-foreground">Requête :</span> par ex. <span className="font-mono">?page=1&size=50</span>
              </div>
            </div>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Exemple d'URL</div>
              <div className="font-mono text-xs">https://app.claimity.ch/v1/…?page=1&size=50</div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Méthodes HTTP</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <MethodBadge method="GET" />
                <span className="text-sm text-muted-foreground">Récupérer des ressources</span>
              </div>
              <div className="flex items-center gap-3">
                <MethodBadge method="POST" />
                <span className="text-sm text-muted-foreground">Créer des ressources</span>
              </div>
              <div className="flex items-center gap-3">
                <MethodBadge method="PUT" />
                <span className="text-sm text-muted-foreground">Remplacer/mettre à jour des ressources</span>
              </div>
              <div className="flex items-center gap-3">
                <MethodBadge method="DELETE" />
                <span className="text-sm text-muted-foreground">Supprimer des ressources</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">En-têtes typiques</h4>
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
                  <span className="font-mono">Content-Type: application/json</span> (pour le corps JSON)
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
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Format de réponse</h3>

        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          Les réponses sont généralement en <strong>JSON</strong> (<span className="font-mono">Content-Type: application/json</span>) et utilisent
          des codes d'état HTTP pour signaler le succès/l'erreur.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 text-sm font-semibold">Réponses de succès</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>2xx</strong> (par ex. <span className="font-mono">200</span>, <span className="font-mono">201</span>, <span className="font-mono">204</span>)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Le corps contient généralement un objet ou une liste</span>
              </li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Exemple (Objet)</div>
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
            <h4 className="mb-2 text-sm font-semibold">Réponses d'erreur (ProblemDetails)</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>4xx/5xx</strong> (par ex. <span className="font-mono">400</span>, <span className="font-mono">401</span>, <span className="font-mono">403</span>, <span className="font-mono">404</span>, <span className="font-mono">429</span>, <span className="font-mono">500</span>)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Le corps suit une structure de type ProblemDetails</span>
              </li>
            </ul>

            <div className="mt-3 rounded-md bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Exemple (JSON Problème)</div>
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
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Limitation de débit</h3>

        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          L'API Partenaire est protégée par une limitation de débit pour garantir une utilisation équitable et la stabilité. Les limites sont appliquées{" "}
          <strong>par partition client</strong>.
        </p>

        <div className="space-y-4">
          {/* Policies side by side */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Default policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Standard pour l'API Partenaire</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                Pour les points de terminaison standard, le nombre de requêtes est légèrement limité.
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>TokenBucket</strong> : env. <strong>60 Requêtes/Minute</strong>, <strong>Rafale</strong> jusqu'à <strong>20</strong>,{" "}
                    <strong>File d'attente</strong> <strong>0</strong>
                  </span>
                </li>
              </ul>
            </div>

            {/* Documents policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Routes de documents</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                Pour les points de terminaison avec <span className="font-mono">.../documents...</span>, des limites plus strictes s'appliquent (par ex. pour le téléchargement).
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>TokenBucket</strong> : env. <strong>20 Requêtes/Minute</strong>, <strong>Rafale</strong> jusqu'à <strong>10</strong>,{" "}
                    <strong>File d'attente</strong> <strong>0</strong>
                  </span>
                </li>
              </ul>
            </div>

            {/* Token policy */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">Point de terminaison de jeton</h4>
              </div>

              <p className="mb-2 text-sm text-muted-foreground text-pretty">
                Le point de terminaison de jeton est strictement limité pour empêcher d'éventuelles attaques.
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    <strong>Fenêtre fixe</strong> : <strong>10 Requêtes/Minute</strong> par <strong>Client</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 429 behavior (collapsible) */}
          <details className="rounded-lg border border-border bg-muted/20 p-4">
            <summary className="cursor-pointer text-sm font-semibold">Lorsqu'une limite est atteinte (HTTP 429)</summary>

            <div className="mt-3">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    Réponse : <strong>429 Too Many Requests</strong> (Code de rejet 429)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    En-tête optionnel : <span className="font-mono">Retry-After</span>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">
                    Indice de diagnostic/politique : <span className="font-mono">X-RateLimit-Policy</span>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-pretty">Corps : <strong>JSON Problème</strong></span>
                </li>
              </ul>
            </div>
          </details>

          {/* Best practices */}
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 text-sm font-semibold">Recommandations pour les clients</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">
                  Réessayer les requêtes <span className="font-mono">429</span> avec <strong>backoff</strong> et{" "}
                  respecter <span className="font-mono">Retry-After</span>.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">Limiter les téléchargements de documents.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-pretty">Les rafales sont limitées (pas de file d'attente) – une forte parallélisation entraîne plus rapidement des 429.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
