import type { Locale } from "@/lib/i18n"

const de = {
  title: "Authentifizierung",
  intro: (
    <>
      Die Claimity Partner API nutzt <strong>OAuth 2.0 Client Credentials</strong> mit <strong>JWT Client Assertion (RS256) </strong>
      und sichert jede Anfrage zusätzlich mit <strong>DPoP Proof-of-Possession (ES256)</strong>. Der Access Token ist an Ihren
      <strong> DPoP-Schlüssel gebunden</strong> (<span className="font-mono">cnf.jkt</span>): Verwenden Sie <strong>einen Schlüssel</strong>
      für die gesamte Session — den Token-Request <em>und</em> jeden API-Aufruf — und signieren Sie bereits den Token-Request mit einem
      DPoP-Proof.
    </>
  ),

  flowTitle: "Authentication Flow",
  flowIntro: "So funktioniert der OAuth2 Client-Credentials Flow.",
  flowImageAlt: "Authentication Flow Sequenzdiagramm (OAuth2 Client Credentials + DPoP)",
  flowStepsTitle: "Ablauf",
  flowSteps: [
    <>
      <strong className="text-foreground">Key Pair</strong>: Organisation erstellt RSA Key Pair in Claimity (Private Key wird sicher
      gespeichert).
    </>,
    <>
      <strong className="text-foreground">JWT Client Assertion</strong>: Client erzeugt ein kurzlebiges JWT (RS256).
    </>,
    <>
      <strong className="text-foreground">Token Request</strong>: Client sendet <span className="font-mono">POST /v1/oauth/token</span> (Client-Credentials + Assertion) <strong>mit einem DPoP-Proof</strong>, der den ausgestellten Token an den DPoP-Schlüssel bindet.
    </>,
    <>
      <strong className="text-foreground">Validierung</strong>: Auth-Server prüft Signatur der Assertion und die Berechtigungen und liefert
      Token-Response.
    </>,
    <>
      <strong className="text-foreground">Abfrage-URL</strong>: Der Client erstellt die Abfrage-URL (inkl. Query-Parameter).
    </>,
    <>
      <strong className="text-foreground">DPoP Proof</strong>: Client erstellt pro Request ein DPoP-JWT (ES256) gebunden an Methode + URL, signiert mit <strong>demselben Schlüssel</strong> wie beim Token-Request.
    </>,
    <>
      <strong className="text-foreground">API Call</strong>: Client ruft Endpunkt auf mit <span className="font-mono">Authorization: DPoP </span>
      <span className="font-mono">access_token</span> und <span className="font-mono">DPoP: …</span>.
    </>,
    <>
      <strong className="text-foreground">Response</strong>: API prüft Token/DPoP und verarbeitet die Anfrage / liefert die Response.
    </>,
  ],

  accessTokenTitle: "Access Token auslesen",
  accessTokenIntro: (
    <>
      Für Partner-Integrationen authentifiziert sich Ihre Organisation über eine <strong>signierte JWT Client Assertion</strong>.
    </>
  ),
  prerequisitesTitle: "Voraussetzungen",
  prerequisites: [
    <>
      <strong>Client ID</strong> (z. B. <span className="font-mono">org-expo-00001</span>) auslesbar aus den Claimity Organisationseinstellungen
    </>,
    <>
      <strong>Private RSA Key</strong> aus den Claimity Organisationseinstellungen (sicher aufbewahren und niemals teilen)
    </>,
  ],
  tokenEndpointTitle: "Token Endpoint",
  formFieldsLabel: "Form Fields",
  clientIdPlaceholder: "<Ihre client id>",
  optional: "(optional)",
  assertionIntro: (
    <>
      Die Assertion ist ein kurzlebiges JWT (10 Minuten) und wird mit Ihrem <strong>RSA Private Key</strong> signiert.
    </>
  ),
  jtiValue: "UUID (einzigartig)",
  tokenRequestExampleTitle: "Beispiel: Token Request (cURL, Platzhalter)",
  tokenResponseTitle: "Token Response",
  tokenResponseText: (
    <>
      Die Response enthält ein <span className="font-mono">access_token</span>. Wichtig: Für API-Aufrufe wird dieser Token als
      <strong> DPoP Token</strong> verwendet.
    </>
  ),

  sendRequestsTitle: "API Requests senden",
  sendRequestsIntro: (
    <>
      Jede Anfrage benötigt zusätzlich einen <strong>DPoP Proof JWT</strong>. Pro Request wird ein neuer Proof erzeugt und signiert
      (ES256), um die Anfrage an Methode + URL zu binden — jedoch stets mit <strong>demselben Schlüssel</strong>, an den der Access Token
      gebunden ist (<span className="font-mono">cnf.jkt</span>). Ein mit einem anderen Schlüssel signierter Proof wird mit{" "}
      <span className="font-mono">401 &quot;Access token is not bound to the DPoP proof key&quot;</span> abgelehnt.
    </>
  ),
  requiredHeadersTitle: "Erforderliche Headers",
  dpopContentTitle: "DPoP Proof Inhalt",
  /** The trailing `ath` item is identical in all locales and rendered by the component. */
  dpopContentItems: [
    <>
      <span className="font-mono">htu</span> muss die <strong>exakte URL</strong> inkl. Query-String sein
    </>,
    <>
      <span className="font-mono">htm</span> muss exakt der HTTP-Methode entsprechen (GET/POST/PUT/DELETE)
    </>,
    <>
      <span className="font-mono">jti</span> muss <strong>pro Request neu</strong> sein (keine Replays)
    </>,
    <>
      <span className="font-mono">iat</span> muss innerhalb des erlaubten Zeitfensters liegen (Clock-Skew vermeiden)
    </>,
  ],
  apiCallExampleTitle: "Beispiel: Authentifizierter API Call (cURL)",
  troubleshootingTitle: "Troubleshooting: 401 invalid_dpop",
  troubleshootingIntro: "Häufige Ursachen:",
  troubleshootingItems: [
    <>
      <strong>not bound</strong>: Request mit einem anderen Schlüssel als der Token signiert — denselben Session-Schlüssel
      wiederverwenden und den Token-Request mit einem DPoP-Proof versehen
    </>,
    <>
      <strong>htu mismatch</strong>: URL muss exakt inkl. Query sein
    </>,
    <>
      <strong>htm mismatch</strong>: Methode muss passen
    </>,
    <>
      <strong>iat</strong> ausserhalb des Fensters: Systemzeit korrigieren
    </>,
    <>
      <strong>replay</strong>: <span className="font-mono">jti</span> muss pro Request neu sein
    </>,
    <>
      <strong>ath mismatch</strong>: <span className="font-mono">SHA-256(access_token)</span> base64url
    </>,
  ],

  correlationTitle: "Correlation-ID",
  correlationParagraphs: [
    <>
      Jede Antwort liefert einen <span className="font-mono">X-Correlation-Id</span>-Header zurück. Claimity verwendet dieselbe ID
      in seinen Server-Logs und bei Fehlern als <span className="font-mono">instance</span>-Feld des{" "}
      <span className="font-mono">application/problem+json</span>-Bodys — protokollieren Sie sie und geben Sie sie bei Support-Anfragen an.
    </>,
    <>
      Sie können auch eine eigene ID mitgeben, um eine Anfrage Ende-zu-Ende zu verfolgen: Senden Sie einen{" "}
      <span className="font-mono">X-Correlation-Id</span>-Request-Header mit einem kurzen, druckbaren Token (≤ 80 Zeichen). Ein
      gültiger Wert wird unverändert zurückgegeben; ein ungültiger oder zu langer wird ignoriert und Claimity erzeugt eine eigene ID.
      Die Correlation-ID ist unabhängig von DPoP (der Proof bindet nur Methode + URL), das Hinzufügen dieses Headers beeinflusst die
      Signatur also nicht.
    </>,
  ],
}

export const authenticationMessages: Record<Locale, typeof de> = {
  de,
  en: {
    title: "Authentication",
    intro: (
      <>
        The Claimity Partner API uses <strong>OAuth 2.0 Client Credentials</strong> with <strong>JWT Client Assertion (RS256) </strong>
        and additionally secures every request with <strong>DPoP Proof-of-Possession (ES256)</strong>. The Access Token is
        <strong> bound to your DPoP key</strong> (<span className="font-mono">cnf.jkt</span>): use <strong>one key</strong> for the whole
        session — the token request <em>and</em> every API call — and sign the token request itself with a DPoP proof.
      </>
    ),

    flowTitle: "Authentication Flow",
    flowIntro: "How the OAuth2 Client-Credentials Flow works.",
    flowImageAlt: "Authentication Flow Sequence Diagram (OAuth2 Client Credentials + DPoP)",
    flowStepsTitle: "Process",
    flowSteps: [
      <>
        <strong className="text-foreground">Key Pair</strong>: Organization creates RSA Key Pair in Claimity (Private Key is stored securely).
      </>,
      <>
        <strong className="text-foreground">JWT Client Assertion</strong>: Client generates a short-lived JWT (RS256).
      </>,
      <>
        <strong className="text-foreground">Token Request</strong>: Client sends <span className="font-mono">POST /v1/oauth/token</span> (Client-Credentials + Assertion) <strong>with a DPoP proof</strong>, which binds the issued token to the DPoP key.
      </>,
      <>
        <strong className="text-foreground">Validation</strong>: Auth server checks signature of the assertion and permissions and returns Token Response.
      </>,
      <>
        <strong className="text-foreground">Query URL</strong>: The client creates the query URL (incl. query parameters).
      </>,
      <>
        <strong className="text-foreground">DPoP Proof</strong>: Client creates a DPoP JWT (ES256) per request bound to method + URL, signed with the <strong>same key</strong> used for the token request.
      </>,
      <>
        <strong className="text-foreground">API Call</strong>: Client calls endpoint with <span className="font-mono">Authorization: DPoP </span>
        <span className="font-mono">access_token</span> and <span className="font-mono">DPoP: …</span>.
      </>,
      <>
        <strong className="text-foreground">Response</strong>: API checks Token/DPoP and processes the request / returns the response.
      </>,
    ],

    accessTokenTitle: "Read Access Token",
    accessTokenIntro: (
      <>
        For partner integrations, your organization authenticates via a <strong>signed JWT Client Assertion</strong>.
      </>
    ),
    prerequisitesTitle: "Prerequisites",
    prerequisites: [
      <>
        <strong>Client ID</strong> (e.g. <span className="font-mono">org-expo-00001</span>) readable from Claimity organization settings
      </>,
      <>
        <strong>Private RSA Key</strong> from Claimity organization settings (keep safe and never share)
      </>,
    ],
    tokenEndpointTitle: "Token Endpoint",
    formFieldsLabel: "Form Fields",
    clientIdPlaceholder: "<Your client id>",
    optional: "(optional)",
    assertionIntro: (
      <>
        The assertion is a short-lived JWT (10 minutes) and is signed with your <strong>RSA Private Key</strong>.
      </>
    ),
    jtiValue: "UUID (unique)",
    tokenRequestExampleTitle: "Example: Token Request (cURL, placeholder)",
    tokenResponseTitle: "Token Response",
    tokenResponseText: (
      <>
        The response contains an <span className="font-mono">access_token</span>. Important: For API calls, this token is used as a
        <strong> DPoP Token</strong>.
      </>
    ),

    sendRequestsTitle: "Send API Requests",
    sendRequestsIntro: (
      <>
        Every request additionally requires a <strong>DPoP Proof JWT</strong>. A fresh proof is generated <strong>per request</strong> and
        signed (ES256) to bind the request to method + URL, but always with the <strong>same key</strong> the Access Token is bound to
        (<span className="font-mono">cnf.jkt</span>). A proof signed with a different key is rejected with{" "}
        <span className="font-mono">401 &quot;Access token is not bound to the DPoP proof key&quot;</span>.
      </>
    ),
    requiredHeadersTitle: "Required Headers",
    dpopContentTitle: "DPoP Proof Content",
    dpopContentItems: [
      <>
        <span className="font-mono">htu</span> must be the <strong>exact URL</strong> incl. query string
      </>,
      <>
        <span className="font-mono">htm</span> must correspond exactly to the HTTP method (GET/POST/PUT/DELETE)
      </>,
      <>
        <span className="font-mono">jti</span> must be <strong>new per request</strong> (no replays)
      </>,
      <>
        <span className="font-mono">iat</span> must be within the allowed time window (avoid clock skew)
      </>,
    ],
    apiCallExampleTitle: "Example: Authenticated API Call (cURL)",
    troubleshootingTitle: "Troubleshooting: 401 invalid_dpop",
    troubleshootingIntro: "Common causes:",
    troubleshootingItems: [
      <>
        <strong>not bound</strong>: request signed with a different key than the token — reuse the single session key and
        send a DPoP proof on the token request
      </>,
      <>
        <strong>htu mismatch</strong>: URL must be exact incl. query
      </>,
      <>
        <strong>htm mismatch</strong>: Method must match
      </>,
      <>
        <strong>iat</strong> outside window: Correct system time
      </>,
      <>
        <strong>replay</strong>: <span className="font-mono">jti</span> must be new per request
      </>,
      <>
        <strong>ath mismatch</strong>: <span className="font-mono">SHA-256(access_token)</span> base64url
      </>,
    ],

    correlationTitle: "Correlation ID",
    correlationParagraphs: [
      <>
        Every response returns an <span className="font-mono">X-Correlation-Id</span> header. Claimity uses the same id in its
        server logs and, on errors, as the <span className="font-mono">instance</span> field of the{" "}
        <span className="font-mono">application/problem+json</span> body — log it and include it in support requests.
      </>,
      <>
        You can also supply your own id to trace a request end-to-end: send an <span className="font-mono">X-Correlation-Id</span>{" "}
        request header with a short, printable token (≤ 80 characters). A valid value is echoed back unchanged; an invalid or
        oversized one is ignored and Claimity generates its own. The correlation id is independent of DPoP (the proof binds only
        method + URL), so adding this header does not affect signing.
      </>,
    ],
  },
  fr: {
    title: "Authentification",
    intro: (
      <>
        L'API Partenaire Claimity utilise <strong>OAuth 2.0 Client Credentials</strong> avec <strong>JWT Client Assertion (RS256)</strong> et
        sécurise chaque requête avec <strong>DPoP Proof-of-Possession (ES256)</strong>. Le jeton d'accès est <strong>lié à votre clé DPoP</strong>
        (<span className="font-mono">cnf.jkt</span>) : utilisez <strong>une seule clé</strong> pour toute la session — la demande de jeton
        <em> et</em> chaque appel API — et signez déjà la demande de jeton avec une preuve DPoP.
      </>
    ),

    flowTitle: "Flux d'authentification",
    flowIntro: "Comment fonctionne le flux OAuth2 Client-Credentials.",
    flowImageAlt: "Diagramme de séquence du flux d'authentification (OAuth2 Client Credentials + DPoP)",
    flowStepsTitle: "Processus",
    flowSteps: [
      <>
        <strong className="text-foreground">Paire de clés</strong> : L'organisation crée une paire de clés RSA dans Claimity (la clé privée est stockée en toute sécurité).
      </>,
      <>
        <strong className="text-foreground">JWT Client Assertion</strong> : Le client génère un JWT de courte durée (RS256).
      </>,
      <>
        <strong className="text-foreground">Demande de jeton</strong> : Le client envoie <span className="font-mono">POST /v1/oauth/token</span> (Client-Credentials + Assertion) <strong>avec une preuve DPoP</strong>, qui lie le jeton émis à la clé DPoP.
      </>,
      <>
        <strong className="text-foreground">Validation</strong> : Le serveur d'authentification vérifie la signature de l'assertion et les autorisations et renvoie la réponse du jeton.
      </>,
      <>
        <strong className="text-foreground">URL de requête</strong> : Le client crée l'URL de requête (y compris les paramètres de requête).
      </>,
      <>
        <strong className="text-foreground">Preuve DPoP</strong> : Le client crée un JWT DPoP (ES256) par requête lié à la méthode + URL, signé avec la <strong>même clé</strong> que celle utilisée pour la demande de jeton.
      </>,
      <>
        <strong className="text-foreground">Appel API</strong> : Le client appelle le point de terminaison avec <span className="font-mono">Authorization: DPoP </span>
        <span className="font-mono">access_token</span> et <span className="font-mono">DPoP: …</span>.
      </>,
      <>
        <strong className="text-foreground">Réponse</strong> : L'API vérifie le jeton/DPoP et traite la demande / renvoie la réponse.
      </>,
    ],

    accessTokenTitle: "Lire le jeton d'accès",
    accessTokenIntro: (
      <>
        Pour les intégrations partenaires, votre organisation s'authentifie via une <strong>JWT Client Assertion signée</strong>.
      </>
    ),
    prerequisitesTitle: "Prérequis",
    prerequisites: [
      <>
        <strong>Client ID</strong> (par ex. <span className="font-mono">org-expo-00001</span>) lisible dans les paramètres de l'organisation Claimity
      </>,
      <>
        <strong>Clé privée RSA</strong> des paramètres de l'organisation Claimity (à conserver en lieu sûr et ne jamais partager)
      </>,
    ],
    tokenEndpointTitle: "Point de terminaison de jeton",
    formFieldsLabel: "Champs de formulaire",
    clientIdPlaceholder: "<Votre client id>",
    optional: "(optionnel)",
    assertionIntro: (
      <>
        L'assertion est un JWT de courte durée (10 minutes) et est signée avec votre <strong>clé privée RSA</strong>.
      </>
    ),
    jtiValue: "UUID (unique)",
    tokenRequestExampleTitle: "Exemple : Demande de jeton (cURL, espace réservé)",
    tokenResponseTitle: "Réponse du jeton",
    tokenResponseText: (
      <>
        La réponse contient un <span className="font-mono">access_token</span>. Important : Pour les appels API, ce jeton est utilisé comme
        <strong> jeton DPoP</strong>.
      </>
    ),

    sendRequestsTitle: "Envoyer des requêtes API",
    sendRequestsIntro: (
      <>
        Chaque requête nécessite en plus un <strong>JWT de preuve DPoP</strong>. Une nouvelle preuve est générée <strong>par requête</strong> et
        signée (ES256) pour lier la requête à la méthode + URL, mais toujours avec la <strong>même clé</strong> à laquelle le jeton d'accès est
        lié (<span className="font-mono">cnf.jkt</span>). Une preuve signée avec une autre clé est rejetée avec{" "}
        <span className="font-mono">401 &quot;Access token is not bound to the DPoP proof key&quot;</span>.
      </>
    ),
    requiredHeadersTitle: "En-têtes requis",
    dpopContentTitle: "Contenu de la preuve DPoP",
    dpopContentItems: [
      <>
        <span className="font-mono">htu</span> doit être l'<strong>URL exacte</strong> y compris la chaîne de requête
      </>,
      <>
        <span className="font-mono">htm</span> doit correspondre exactement à la méthode HTTP (GET/POST/PUT/DELETE)
      </>,
      <>
        <span className="font-mono">jti</span> doit être <strong>nouveau par requête</strong> (pas de relectures)
      </>,
      <>
        <span className="font-mono">iat</span> doit être dans la fenêtre de temps autorisée (éviter le décalage d'horloge)
      </>,
    ],
    apiCallExampleTitle: "Exemple : Appel API authentifié (cURL)",
    troubleshootingTitle: "Dépannage : 401 invalid_dpop",
    troubleshootingIntro: "Causes courantes :",
    troubleshootingItems: [
      <>
        <strong>not bound</strong> : requête signée avec une clé différente de celle du jeton — réutilisez l'unique clé de
        session et envoyez une preuve DPoP sur la demande de jeton
      </>,
      <>
        <strong>htu mismatch</strong> : L'URL doit être exacte y compris la requête
      </>,
      <>
        <strong>htm mismatch</strong> : La méthode doit correspondre
      </>,
      <>
        <strong>iat</strong> hors fenêtre : Corriger l'heure système
      </>,
      <>
        <strong>replay</strong> : <span className="font-mono">jti</span> doit être nouveau par requête
      </>,
      <>
        <strong>ath mismatch</strong> : <span className="font-mono">SHA-256(access_token)</span> base64url
      </>,
    ],

    correlationTitle: "Identifiant de corrélation",
    correlationParagraphs: [
      <>
        Chaque réponse renvoie un en-tête <span className="font-mono">X-Correlation-Id</span>. Claimity utilise le même identifiant
        dans ses journaux serveur et, en cas d'erreur, comme champ <span className="font-mono">instance</span> du corps{" "}
        <span className="font-mono">application/problem+json</span> — journalisez-le et indiquez-le dans vos demandes de support.
      </>,
      <>
        Vous pouvez aussi fournir votre propre identifiant pour tracer une requête de bout en bout : envoyez un en-tête de requête{" "}
        <span className="font-mono">X-Correlation-Id</span> avec un jeton court et imprimable (≤ 80 caractères). Une valeur valide est
        renvoyée telle quelle ; une valeur invalide ou trop longue est ignorée et Claimity en génère une. L'identifiant de corrélation
        est indépendant de DPoP (la preuve ne lie que la méthode + l'URL), l'ajout de cet en-tête n'affecte donc pas la signature.
      </>,
    ],
  },
}
