import type { Locale } from "@/lib/i18n"

const de = {
  title: "API‑Grundlagen",
  intro: "Zentrale Konzepte und Konventionen, die in der gesamten API genutzt werden.",

  requestFormatTitle: "Request‑Format",
  requestFormatText: (
    <>
      Jeder Request besteht aus <strong>Methode</strong>, <strong>URL</strong>, optionalen <strong>Query‑Parametern</strong>, <strong>Headers </strong>
      und (bei <span className="font-mono">POST</span>/<span className="font-mono">PUT</span>) einem{" "}
      <strong>JSON‑Body</strong>.
    </>
  ),
  urlStructureTitle: "URL‑Aufbau",
  baseUrlLabel: "Base URL:",
  pathLabel: "Path:",
  pathValue: "/v1/<resource>",
  queryLabel: "Query:",
  /** "e.g." abbreviation used in several places. */
  eg: "z. B.",
  exampleUrlTitle: "Beispiel‑URL",
  httpMethodsTitle: "HTTP‑Methoden",
  methods: {
    GET: "Ressourcen abrufen",
    POST: "Ressourcen erstellen",
    PUT: "Ressourcen ersetzen/aktualisieren",
    DELETE: "Ressourcen löschen",
  },
  typicalHeadersTitle: "Typische Headers",
  contentTypeNote: "(bei JSON‑Body)",

  responseFormatTitle: "Response‑Format",
  responseFormatText: (
    <>
      Responses sind grundsätzlich <strong>JSON</strong> (<span className="font-mono">Content-Type: application/json</span>) und verwenden
      HTTP‑Statuscodes, um Erfolg/Fehler zu signalisieren.
    </>
  ),
  successTitle: "Erfolgs‑Responses",
  successBody: "Body enthält in der Regel ein Objekt oder eine Liste",
  exampleObjectTitle: "Beispiel (Objekt)",
  errorTitle: "Fehler‑Responses (ProblemDetails)",
  errorBody: "Body folgt einer ProblemDetails‑ähnlichen Struktur",
  exampleProblemTitle: "Beispiel (Problem‑JSON)",

  rateLimitTitle: "Rate Limiting",
  rateLimitIntro: (
    <>
      Die Partner-API ist durch Rate Limiting geschützt, um faire Nutzung und Stabilität sicherzustellen. Limits werden{" "}
      <strong>pro Client-Partition</strong> angewendet.
    </>
  ),
  anonPolicyTitle: "Anonyme Validierung",
  anonPolicyText: "POST /v1/insurers/claims:validate ist ohne Token nutzbar und daher strenger limitiert.",
  anonPolicyLimit: "FixedWindow: 10 Requests/Minute pro Client/IP",
  defaultPolicyTitle: "Standard für die Partner-API",
  defaultPolicyText: "Für Standard-Endpunkte wird die Anzahl an Abfragen leicht limitiert.",
  defaultPolicyLimit: (
    <>
      <strong>TokenBucket</strong>: ca. <strong>60 Requests/Minute</strong>, <strong>Burst</strong> bis <strong>20</strong>,{" "}
      <strong>Queue</strong> <strong>0</strong>
    </>
  ),
  documentsPolicyTitle: "Dokument-Routen",
  documentsPolicyText: (
    <>
      Für Endpunkte mit <span className="font-mono">.../documents...</span> gelten strengere Limits (z. B. für Upload/Download).
    </>
  ),
  documentsPolicyLimit: (
    <>
      <strong>TokenBucket</strong>: ca. <strong>20 Requests/Minute</strong>, <strong>Burst</strong> bis <strong>10</strong>,{" "}
      <strong>Queue</strong> <strong>0</strong>
    </>
  ),
  tokenPolicyTitle: "Token-Endpunkt",
  tokenPolicyText: "Der Token-Endpunkt ist streng limitiert um mögliche Attacken zu verhindern.",
  tokenPolicyLimit: (
    <>
      <strong>Fixed Window</strong>: <strong>10 Requests/Minute</strong> je <strong>Client</strong>
    </>
  ),
  limitReachedTitle: "Wenn ein Limit erreicht wird (HTTP 429)",
  limitReachedItems: [
    <>
      Response: <strong>429 Too Many Requests</strong> (Rejection Code 429)
    </>,
    <>
      Optionaler Header: <span className="font-mono">Retry-After</span>
    </>,
    <>
      Diagnose/Policy-Hinweis: <span className="font-mono">X-RateLimit-Policy</span>
    </>,
    <>
      Body: <strong>Problem-JSON</strong>
    </>,
  ],
  recommendationsTitle: "Empfehlungen für Clients",
  recommendations: [
    <>
      Bei <span className="font-mono">429</span> Requests mit <strong>Backoff</strong> wiederholen und{" "}
      <span className="font-mono">Retry-After</span> beachten.
    </>,
    <>Dokument-Uploads/Downloads throttlen.</>,
    <>Bursts sind begrenzt (kein Queueing) – bei hoher Parallelität kommt es schneller zu 429.</>,
  ],

  idempotencyTitle: "Idempotenz (Idempotency-Key)",
  idempotencyIntro:
    "POST-Requests können den Header Idempotency-Key tragen (frei gewählter, eindeutiger Wert, z. B. eine UUID). Wird derselbe Request wiederholt — etwa nach einem Timeout — liefert die API die gespeicherte Antwort erneut, ohne den Vorgang ein zweites Mal auszuführen.",
  idempotencyItems: [
    "Der Schlüssel ist an Methode, Pfad, Client und Payload-Hash gebunden — derselbe Key mit anderem Payload zählt als neuer Request.",
    "Gespeicherte Antworten werden 24 Stunden für Replay vorgehalten.",
    "Request-Bodies über 16 MB umgehen die Idempotenz; Antworten über 16 MB werden nicht für Replay gespeichert (ein Retry führt den Vorgang erneut aus).",
    "Empfehlung: bei POST /v1/insurers/claims immer setzen — so ist ein Retry nach Netzwerkfehlern garantiert frei von Doppelanlagen.",
  ],

  errorCatalogTitle: "Fehlerkatalog",
  errorCatalogIntro:
    "Fehler folgen der ProblemDetails-Struktur (title, status, detail). Payload-Validierungsfehler kommen als ValidationProblemDetails mit einer errors-Map; jede Meldung nennt den Feldpfad und die konkrete Erwartung.",
  meaningHeader: "Bedeutung",
  errorMeanings: {
    invalid_org_context: "Das Token ist keiner (eindeutigen) Organisation des erwarteten Typs zugeordnet.",
    forbidden: "Zugriff auf die Ressource ist mit diesem Token nicht erlaubt.",
    org_without_members: "Die Organisation hat keine Mitglieder — Anlage/Abruf nicht möglich.",
    invalid_category: "Unbekannte Fallkategorie (erlaubt: vehicle, appraiser, fraud, special).",
    invalid_payload: "PayloadJson fehlt oder ist kein gültiges JSON.",
    invalid_state: "Die Aktion ist im aktuellen Fallstatus nicht erlaubt (z. B. Reopen eines nicht abgeschlossenen Falls).",
    "invalid_document / missing_documents": "Dokument ungültig bzw. erforderliche Dokumente fehlen.",
    "unsupported_content_type / size_limit_exceeded": "Dateityp nicht erlaubt bzw. Upload-Limit überschritten.",
    "upstream_timeout / upstream_error": "Ein nachgelagerter Dienst hat nicht (rechtzeitig) geantwortet — Retry mit Backoff.",
  },
  validationExampleTitle: "Beispiel: 400 bei der Payload-Validierung (POST /v1/insurers/claims:validate)",
}

export const apiBasicsMessages: Record<Locale, typeof de> = {
  de,
  en: {
    title: "API Basics",
    intro: "Core concepts and conventions used throughout the API.",

    requestFormatTitle: "Request Format",
    requestFormatText: (
      <>
        Every request consists of <strong>Method</strong>, <strong>URL</strong>, optional <strong>Query Parameters</strong>, <strong>Headers </strong>
        and (for <span className="font-mono">POST</span>/<span className="font-mono">PUT</span>) a{" "}
        <strong>JSON Body</strong>.
      </>
    ),
    urlStructureTitle: "URL Structure",
    baseUrlLabel: "Base URL:",
    pathLabel: "Path:",
    pathValue: "/v1/<resource>",
    queryLabel: "Query:",
    eg: "e.g.",
    exampleUrlTitle: "Example URL",
    httpMethodsTitle: "HTTP Methods",
    methods: {
      GET: "Retrieve resources",
      POST: "Create resources",
      PUT: "Replace/update resources",
      DELETE: "Delete resources",
    },
    typicalHeadersTitle: "Typical Headers",
    contentTypeNote: "(for JSON Body)",

    responseFormatTitle: "Response Format",
    responseFormatText: (
      <>
        Responses are generally <strong>JSON</strong> (<span className="font-mono">Content-Type: application/json</span>) and use
        HTTP status codes to signal success/error.
      </>
    ),
    successTitle: "Success Responses",
    successBody: "Body usually contains an object or a list",
    exampleObjectTitle: "Example (Object)",
    errorTitle: "Error Responses (ProblemDetails)",
    errorBody: "Body follows a ProblemDetails-like structure",
    exampleProblemTitle: "Example (Problem JSON)",

    rateLimitTitle: "Rate Limiting",
    rateLimitIntro: (
      <>
        The Partner API is protected by rate limiting to ensure fair usage and stability. Limits are applied{" "}
        <strong>per client partition</strong>.
      </>
    ),
    anonPolicyTitle: "Anonymous validation",
    anonPolicyText: "POST /v1/insurers/claims:validate is usable without a token and therefore limited more strictly.",
    anonPolicyLimit: "FixedWindow: 10 requests/minute per client/IP",
    defaultPolicyTitle: "Standard for Partner API",
    defaultPolicyText: "For standard endpoints, the number of requests is slightly limited.",
    defaultPolicyLimit: (
      <>
        <strong>TokenBucket</strong>: approx. <strong>60 Requests/Minute</strong>, <strong>Burst</strong> up to <strong>20</strong>,{" "}
        <strong>Queue</strong> <strong>0</strong>
      </>
    ),
    documentsPolicyTitle: "Document Routes",
    documentsPolicyText: (
      <>
        For endpoints with <span className="font-mono">.../documents...</span>, stricter limits apply (e.g. for upload/download).
      </>
    ),
    documentsPolicyLimit: (
      <>
        <strong>TokenBucket</strong>: approx. <strong>20 Requests/Minute</strong>, <strong>Burst</strong> up to <strong>10</strong>,{" "}
        <strong>Queue</strong> <strong>0</strong>
      </>
    ),
    tokenPolicyTitle: "Token Endpoint",
    tokenPolicyText: "The token endpoint is strictly limited to prevent possible attacks.",
    tokenPolicyLimit: (
      <>
        <strong>Fixed Window</strong>: <strong>10 Requests/Minute</strong> per <strong>Client</strong>
      </>
    ),
    limitReachedTitle: "When a limit is reached (HTTP 429)",
    limitReachedItems: [
      <>
        Response: <strong>429 Too Many Requests</strong> (Rejection Code 429)
      </>,
      <>
        Optional Header: <span className="font-mono">Retry-After</span>
      </>,
      <>
        Diagnostic/Policy Hint: <span className="font-mono">X-RateLimit-Policy</span>
      </>,
      <>
        Body: <strong>Problem JSON</strong>
      </>,
    ],
    recommendationsTitle: "Recommendations for Clients",
    recommendations: [
      <>
        Retry <span className="font-mono">429</span> requests with <strong>backoff</strong> and{" "}
        respect <span className="font-mono">Retry-After</span>.
      </>,
      <>Throttle document uploads/downloads.</>,
      <>Bursts are limited (no queuing) – high parallelism leads to 429 faster.</>,
    ],

    idempotencyTitle: "Idempotency (Idempotency-Key)",
    idempotencyIntro:
      "POST requests may carry an Idempotency-Key header (any unique value, e.g. a UUID). If the same request is repeated — say after a timeout — the API returns the stored response again without executing the operation a second time.",
    idempotencyItems: [
      "The key is bound to method, path, client and payload hash — the same key with a different payload counts as a new request.",
      "Stored responses are kept for replay for 24 hours.",
      "Request bodies over 16 MB bypass idempotency; responses over 16 MB are not stored for replay (a retry re-executes the operation).",
      "Recommendation: always set it on POST /v1/insurers/claims — retries after network errors are then guaranteed to be duplicate-free.",
    ],

    errorCatalogTitle: "Error catalog",
    errorCatalogIntro:
      "Errors follow the ProblemDetails structure (title, status, detail). Payload validation errors arrive as ValidationProblemDetails with an errors map; every message names the field path and the concrete expectation.",
    meaningHeader: "Meaning",
    errorMeanings: {
      invalid_org_context: "The token is not associated with a (single) organization of the expected type.",
      forbidden: "Access to the resource is not allowed with this token.",
      org_without_members: "The organization has no members — creation/retrieval is not possible.",
      invalid_category: "Unknown claim category (allowed: vehicle, appraiser, fraud, special).",
      invalid_payload: "PayloadJson is missing or not valid JSON.",
      invalid_state: "The action is not allowed in the current claim status (e.g. reopening a case that is not completed).",
      "invalid_document / missing_documents": "Document invalid, or required documents are missing.",
      "unsupported_content_type / size_limit_exceeded": "File type not allowed, or the upload limit was exceeded.",
      "upstream_timeout / upstream_error": "A downstream service did not respond (in time) — retry with backoff.",
    },
    validationExampleTitle: "Example: 400 from payload validation (POST /v1/insurers/claims:validate)",
  },
  fr: {
    title: "Bases de l'API",
    intro: "Concepts et conventions de base utilisés dans toute l'API.",

    requestFormatTitle: "Format de requête",
    requestFormatText: (
      <>
        Chaque requête se compose de **Méthode**, **URL**, **Paramètres de requête** optionnels, **En-têtes** et (pour <span className="font-mono">POST</span>/<span className="font-mono">PUT</span>) un{" "}
        <strong>Corps JSON</strong>.
      </>
    ),
    urlStructureTitle: "Structure de l'URL",
    baseUrlLabel: "Base URL :",
    pathLabel: "Chemin :",
    pathValue: "/v1/<ressource>",
    queryLabel: "Requête :",
    eg: "par ex.",
    exampleUrlTitle: "Exemple d'URL",
    httpMethodsTitle: "Méthodes HTTP",
    methods: {
      GET: "Récupérer des ressources",
      POST: "Créer des ressources",
      PUT: "Remplacer/mettre à jour des ressources",
      DELETE: "Supprimer des ressources",
    },
    typicalHeadersTitle: "En-têtes typiques",
    contentTypeNote: "(pour le corps JSON)",

    responseFormatTitle: "Format de réponse",
    responseFormatText: (
      <>
        Les réponses sont généralement en <strong>JSON</strong> (<span className="font-mono">Content-Type: application/json</span>) et utilisent
        des codes d'état HTTP pour signaler le succès/l'erreur.
      </>
    ),
    successTitle: "Réponses de succès",
    successBody: "Le corps contient généralement un objet ou une liste",
    exampleObjectTitle: "Exemple (Objet)",
    errorTitle: "Réponses d'erreur (ProblemDetails)",
    errorBody: "Le corps suit une structure de type ProblemDetails",
    exampleProblemTitle: "Exemple (JSON Problème)",

    rateLimitTitle: "Limitation de débit",
    rateLimitIntro: (
      <>
        L'API Partenaire est protégée par une limitation de débit pour garantir une utilisation équitable et la stabilité. Les limites sont appliquées{" "}
        <strong>par partition client</strong>.
      </>
    ),
    anonPolicyTitle: "Validation anonyme",
    anonPolicyText: "POST /v1/insurers/claims:validate est utilisable sans jeton et donc limité plus strictement.",
    anonPolicyLimit: "FixedWindow : 10 requêtes/minute par client/IP",
    defaultPolicyTitle: "Standard pour l'API Partenaire",
    defaultPolicyText: "Pour les points de terminaison standard, le nombre de requêtes est légèrement limité.",
    defaultPolicyLimit: (
      <>
        <strong>TokenBucket</strong> : env. <strong>60 Requêtes/Minute</strong>, <strong>Rafale</strong> jusqu'à <strong>20</strong>,{" "}
        <strong>File d'attente</strong> <strong>0</strong>
      </>
    ),
    documentsPolicyTitle: "Routes de documents",
    documentsPolicyText: (
      <>
        Pour les points de terminaison avec <span className="font-mono">.../documents...</span>, des limites plus strictes s'appliquent (par ex. pour le téléchargement).
      </>
    ),
    documentsPolicyLimit: (
      <>
        <strong>TokenBucket</strong> : env. <strong>20 Requêtes/Minute</strong>, <strong>Rafale</strong> jusqu'à <strong>10</strong>,{" "}
        <strong>File d'attente</strong> <strong>0</strong>
      </>
    ),
    tokenPolicyTitle: "Point de terminaison de jeton",
    tokenPolicyText: "Le point de terminaison de jeton est strictement limité pour empêcher d'éventuelles attaques.",
    tokenPolicyLimit: (
      <>
        <strong>Fenêtre fixe</strong> : <strong>10 Requêtes/Minute</strong> par <strong>Client</strong>
      </>
    ),
    limitReachedTitle: "Lorsqu'une limite est atteinte (HTTP 429)",
    limitReachedItems: [
      <>
        Réponse : <strong>429 Too Many Requests</strong> (Code de rejet 429)
      </>,
      <>
        En-tête optionnel : <span className="font-mono">Retry-After</span>
      </>,
      <>
        Indice de diagnostic/politique : <span className="font-mono">X-RateLimit-Policy</span>
      </>,
      <>
        Corps : <strong>JSON Problème</strong>
      </>,
    ],
    recommendationsTitle: "Recommandations pour les clients",
    recommendations: [
      <>
        Réessayer les requêtes <span className="font-mono">429</span> avec <strong>backoff</strong> et{" "}
        respecter <span className="font-mono">Retry-After</span>.
      </>,
      <>Limiter les téléchargements de documents.</>,
      <>Les rafales sont limitées (pas de file d'attente) – une forte parallélisation entraîne plus rapidement des 429.</>,
    ],

    idempotencyTitle: "Idempotence (Idempotency-Key)",
    idempotencyIntro:
      "Les requêtes POST peuvent porter l'en-tête Idempotency-Key (valeur unique librement choisie, p. ex. un UUID). Si la même requête est répétée — par exemple après un timeout — l'API renvoie la réponse enregistrée sans exécuter l'opération une seconde fois.",
    idempotencyItems: [
      "La clé est liée à la méthode, au chemin, au client et au hash du payload — la même clé avec un payload différent compte comme une nouvelle requête.",
      "Les réponses enregistrées sont conservées 24 heures pour le replay.",
      "Les corps de requête au-delà de 16 Mo contournent l'idempotence ; les réponses au-delà de 16 Mo ne sont pas enregistrées pour le replay (un retry ré-exécute l'opération).",
      "Recommandation : toujours le définir sur POST /v1/insurers/claims — les retries après erreurs réseau sont alors garantis sans doublons.",
    ],

    errorCatalogTitle: "Catalogue d'erreurs",
    errorCatalogIntro:
      "Les erreurs suivent la structure ProblemDetails (title, status, detail). Les erreurs de validation du payload arrivent en ValidationProblemDetails avec une map errors ; chaque message nomme le chemin du champ et l'attente concrète.",
    meaningHeader: "Signification",
    errorMeanings: {
      invalid_org_context: "Le jeton n'est pas associé à une organisation (unique) du type attendu.",
      forbidden: "L'accès à la ressource n'est pas autorisé avec ce jeton.",
      org_without_members: "L'organisation n'a aucun membre — création/consultation impossible.",
      invalid_category: "Catégorie de sinistre inconnue (autorisées : vehicle, appraiser, fraud, special).",
      invalid_payload: "PayloadJson manquant ou JSON invalide.",
      invalid_state: "L'action n'est pas autorisée dans le statut actuel du dossier (p. ex. rouvrir un dossier non clôturé).",
      "invalid_document / missing_documents": "Document invalide ou documents requis manquants.",
      "unsupported_content_type / size_limit_exceeded": "Type de fichier non autorisé ou limite d'upload dépassée.",
      "upstream_timeout / upstream_error": "Un service en aval n'a pas répondu (à temps) — retry avec backoff.",
    },
    validationExampleTitle: "Exemple : 400 lors de la validation du payload (POST /v1/insurers/claims:validate)",
  },
}
