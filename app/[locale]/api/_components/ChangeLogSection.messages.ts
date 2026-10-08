import type { Locale } from "@/lib/i18n"

type ChangeLogEntry = {
  date: string
  changes: string
  /** Only set on one en/fr entry; not rendered. */
  breaking?: boolean
}

const de: { title: string; intro: string; entries: ChangeLogEntry[] } = {
  title: "Änderungsprotokoll",
  intro: "Alle Änderungen und Updates der aktuellen API‑Version im Überblick.",
  entries: [
    {
      date: "2026-10-07",
      changes:
        "Neu: Beträge am Fall. Claims (Versicherer) und Fälle (Experten) liefern in Liste und Details CostEstimateAmount (Kostenvoranschlag), ApprovedAmount (durch das Gutachten freigegebener Betrag) und SavingsAmount (Einsparung = Kostenvoranschlag − freigegebener Betrag, nur wenn positiv) – alle in CHF, null = nicht erfasst. Experten setzen die Beträge über PUT /v1/experts/cases/{caseId}/amounts (204). Eine Änderung der Beträge verschiebt LastChangedAt. Die Erweiterung ist rückwärtskompatibel.",
    },
    {
      date: "2026-08-02",
      changes:
        "Sync-Filter überarbeitet: updatedSince heisst neu lastChangedSince (beide Endpunkte /v1/insurers/claims und /v1/experts/cases) — der Filter trägt damit den Namen des Feldes, das er filtert (LastChangedAt). Neu: lastReportApprovedSince auf /v1/insurers/claims liefert nur Claims, deren letzte Report-Genehmigung am/nach dem angegebenen Zeitpunkt liegt (Claims ohne genehmigten Report matchen nie). completedFrom/completedTo bleiben unverändert und filtern den Zeitpunkt des jüngsten Fallabschlusses.",
    },
    {
      date: "2026-07-15",
      changes:
        "Experten-API: neuer Endpunkt zum Wiedereröffnen eines abgeschlossenen Falls (POST /v1/experts/cases/{caseId}:reopen, liefert 204). List-Endpoints um Filter (Freitextsuche q, Datumsbereiche für Erstellung/Abschluss) und einen updatedSince-Cursor für inkrementelle Synchronisierung erweitert. Fälle liefern nun LastChangedAt; Claims zusätzlich LastReportApprovedAt. Create- und Upload-Endpoints liefern nun 201 Created. Jede Antwort liefert nun einen X-Correlation-Id-Header (ein gültiger eingehender Wert wird zurückgegeben) für Ende-zu-Ende-Tracing; bei Fehlern ist er zugleich die ProblemDetails-instance.",
    },
    {
      date: "2026-06-09",
      changes: "Neue Kategorie „Spezialexpertisen“ inklusive Schema und Payload-Struktur ergänzt.",
    },
    {
      date: "2025-12-30",
      changes: "Ergänzung eines neuen Endpunkts zur Versicherer-API zum Validieren der Fallstruktur.",
    },
    {
      date: "2025-12-28",
      changes: "Erste API‑Version veröffentlicht.",
    },
  ],
}

export const changeLogMessages: Record<Locale, typeof de> = {
  de,
  en: {
    title: "Changelog",
    intro: "All changes and updates of the current API version at a glance.",
    entries: [
      {
        date: "2026-10-07",
        changes:
          "New: case amounts. Claims (insurers) and cases (experts) carry CostEstimateAmount (cost estimate), ApprovedAmount (amount approved by the expert report) and SavingsAmount (savings = estimate − approved amount, only when positive) in list and details – all in CHF, null = not entered. Experts set the amounts with PUT /v1/experts/cases/{caseId}/amounts (204). Changing an amount advances LastChangedAt. The extension is backwards compatible.",
      },
      {
        date: "2026-08-02",
        breaking: true,
        changes:
          "Reworked the sync filters: updatedSince is now lastChangedSince (both endpoints /v1/insurers/claims and /v1/experts/cases) — the filter now carries the name of the field it filters (LastChangedAt). New: lastReportApprovedSince on /v1/insurers/claims returns only claims whose latest report approval is at/after the given instant (claims without an approved report never match). completedFrom/completedTo are unchanged and filter the moment of the most recent completion.",
      },
      {
        date: "2026-07-15",
        changes:
          "Expert API: new endpoint to reopen a completed case (POST /v1/experts/cases/{caseId}:reopen, returns 204). List endpoints gained filters (free-text search q, created/completed date ranges) and an updatedSince cursor for incremental sync. Cases now expose LastChangedAt; claims additionally expose LastReportApprovedAt. Create and upload endpoints now return 201 Created. Every response now returns an X-Correlation-Id header (echoing a valid inbound one) for end-to-end tracing; on errors it is also the ProblemDetails instance.",
      },
      {
        date: "2026-06-09",
        changes: 'Added new "Special Appraisals" category including schema and payload structure.',
      },
      {
        date: "2025-12-30",
        changes: "Addition of a new endpoint to the insurer API for validating the case structure.",
      },
      {
        date: "2025-12-28",
        changes: "First API version published.",
      },
    ],
  },
  fr: {
    title: "Journal des modifications",
    intro: "Toutes les modifications et mises à jour de la version actuelle de l'API en un coup d'œil.",
    entries: [
      {
        date: "2026-10-07",
        changes:
          "Nouveau : montants du dossier. Les sinistres (assureurs) et les dossiers (experts) fournissent dans la liste et le détail CostEstimateAmount (devis), ApprovedAmount (montant validé par l'expertise) et SavingsAmount (économie = devis − montant validé, uniquement si positive) – tous en CHF, null = non saisi. Les experts définissent les montants via PUT /v1/experts/cases/{caseId}/amounts (204). Une modification des montants fait avancer LastChangedAt. L'extension est rétrocompatible.",
      },
      {
        date: "2026-08-02",
        breaking: true,
        changes:
          "Refonte des filtres de synchronisation : updatedSince devient lastChangedSince (les deux points de terminaison /v1/insurers/claims et /v1/experts/cases) — le filtre porte désormais le nom du champ qu'il filtre (LastChangedAt). Nouveau : lastReportApprovedSince sur /v1/insurers/claims ne renvoie que les sinistres dont la dernière approbation de rapport est au/après l'instant donné (les sinistres sans rapport approuvé ne correspondent jamais). completedFrom/completedTo restent inchangés et filtrent le moment de la clôture la plus récente.",
      },
      {
        date: "2026-07-15",
        changes:
          "API Expert : nouveau point de terminaison pour rouvrir un dossier clôturé (POST /v1/experts/cases/{caseId}:reopen, renvoie 204). Les points de terminaison de liste ont reçu des filtres (recherche plein texte q, plages de dates de création/clôture) et un curseur updatedSince pour la synchronisation incrémentale. Les dossiers exposent désormais LastChangedAt ; les sinistres exposent en plus LastReportApprovedAt. Les points de terminaison de création et de téléversement renvoient désormais 201 Created. Chaque réponse renvoie désormais un en-tête X-Correlation-Id (une valeur entrante valide est répercutée) pour le traçage de bout en bout ; en cas d'erreur, il correspond aussi à l'instance ProblemDetails.",
      },
      {
        date: "2026-06-09",
        changes:
          "Ajout de la nouvelle catégorie « Expertises spéciales », incluant le schéma et la structure de payload.",
      },
      {
        date: "2025-12-30",
        changes: "Ajout d'un nouveau point de terminaison à l'API assureur pour valider la structure du dossier.",
      },
      {
        date: "2025-12-28",
        changes: "Première version de l'API publiée.",
      },
    ],
  },
  it: {
    title: "Registro delle modifiche",
    intro: "Tutte le modifiche e gli aggiornamenti della versione attuale dell'API in sintesi.",
    entries: [
      {
        date: "2026-10-07",
        changes:
          "Novità: importi del caso. I sinistri (assicuratori) e i casi (periti) forniscono nell'elenco e nei dettagli CostEstimateAmount (preventivo), ApprovedAmount (importo approvato dalla perizia) e SavingsAmount (risparmio = preventivo − importo approvato, solo se positivo) – tutti in CHF, null = non registrato. I periti impostano gli importi tramite PUT /v1/experts/cases/{caseId}/amounts (204). Una modifica degli importi aggiorna LastChangedAt. L'estensione è retrocompatibile.",
      },
      {
        date: "2026-08-02",
        changes:
          "Filtri di sincronizzazione rivisti: updatedSince si chiama ora lastChangedSince (entrambi gli endpoint /v1/insurers/claims e /v1/experts/cases) — il filtro porta così il nome del campo che filtra (LastChangedAt). Novità: lastReportApprovedSince su /v1/insurers/claims restituisce solo i sinistri la cui ultima approvazione di un rapporto è avvenuta in corrispondenza o dopo il momento indicato (i sinistri senza rapporto approvato non corrispondono mai). completedFrom/completedTo restano invariati e filtrano il momento della chiusura più recente del caso.",
      },
      {
        date: "2026-07-15",
        changes:
          "API per periti: nuovo endpoint per riaprire un caso chiuso (POST /v1/experts/cases/{caseId}:reopen, restituisce 204). Gli endpoint di elenco sono stati ampliati con filtri (ricerca a testo libero q, intervalli di date per creazione/chiusura) e un cursore updatedSince per la sincronizzazione incrementale. I casi forniscono ora LastChangedAt; i sinistri anche LastReportApprovedAt. Gli endpoint di creazione e di caricamento restituiscono ora 201 Created. Ogni risposta restituisce ora un header X-Correlation-Id (un valore valido in entrata viene restituito) per il tracing end-to-end; in caso di errore corrisponde anche all'instance di ProblemDetails.",
      },
      {
        date: "2026-06-09",
        changes: "Aggiunta la nuova categoria «Perizie speciali», inclusi schema e struttura del payload.",
      },
      {
        date: "2025-12-30",
        changes: "Aggiunta di un nuovo endpoint all'API per assicuratori per la validazione della struttura del caso.",
      },
      {
        date: "2025-12-28",
        changes: "Pubblicata la prima versione dell'API.",
      },
    ],
  },
}
