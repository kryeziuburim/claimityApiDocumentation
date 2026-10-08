import type { Locale } from "@/lib/i18n"

/** A list item rendered as `<span className="font-mono">{field}</span> — {text}` (or just `{text}` without field). */
type FieldItem = { field?: string; text: string }

const timestampItems: FieldItem[] = [
  { field: "CreatedAt", text: "Erstellzeitpunkt des Claims. Filter: createdFrom / createdTo." },
  {
    text: "completedFrom / completedTo filtern auf den Zeitpunkt des jüngsten Fallabschlusses (Finalized-Ereignis; bei wiedereröffneten Fällen zählt der neueste Abschluss). Gedacht für Auswertungszeiträume («alle im Q2 abgeschlossenen Fälle») — nicht für Synchronisierung.",
  },
  {
    field: "LastChangedAt",
    text: "Letzte partnerrelevante Änderung (Status, Dokumente, Reports, Kommentare, Beträge). Filter: lastChangedSince.",
  },
  {
    field: "LastReportApprovedAt",
    text: "Zeitpunkt der letzten Report-Genehmigung (null, falls noch keine). Filter: lastReportApprovedSince — Claims ohne genehmigten Report matchen nie.",
  },
]

const de = {
  title: "Versicherer",
  intro: "Endpoints für Versicherer zum Erstellen/Validieren/Abrufen von Schäden, Dokumenten und Report-Übersichten.",
  timestampsTitle: "Zeitstempel & inkrementelle Synchronisierung",
  timestampsIntro:
    "Vier Zeitstempel steuern Listen-Filter und Synchronisierung. Die Sync-Filter sind nach dem Feld benannt, das sie filtern, und vergleichen inklusiv (>=).",
  timestampItems,
  syncRecipeTitle: "Sync-Rezept (täglicher Poller)",
  syncRecipeSteps: [
    "Mit lastChangedSince=<gespeicherter Cursor> abfragen (erster Lauf: ohne Filter).",
    "Ergebnisse idempotent verarbeiten — der Vergleich ist inklusiv, der Grenzwert kann erneut erscheinen.",
    "Als neuen Cursor das Maximum der gesehenen LastChangedAt speichern.",
    "Nur an neuen genehmigten Reports interessiert? Gleicher Ablauf mit lastReportApprovedSince und LastReportApprovedAt.",
  ],
  claimsTitle: "Schäden",
  claimDocsTitle: "Schadendokumente",
  claimReportsTitle: "Reports zu Claims",
  endpoints: {
    claimsList: "Paginierte Liste der Claims.",
    claimsCreate: "Claim erstellen.",
    claimsValidate: "Claim-Request validieren, ohne den Claim anzulegen.",
    claimsGet: "Claim-Details abrufen.",
    claimDocsList: "Paginierte Liste der Claim-Dokumente.",
    claimDocsAdd: "Dokument hochladen.",
    claimDocsGet: "Dokumentinhalt abrufen (inkl. ContentBase64).",
    claimReportsList: "Reports (Submissions) zu einem Claim auflisten.",
    claimReportDocsList: "Dokumentinhalte einer Report-Submission abrufen.",
  },
}

export const insurerMessages: Record<Locale, typeof de> = {
  de,
  en: {
    title: "Insurers",
    intro: "Endpoints for insurers to create/validate/retrieve claims, documents, and report overviews.",
    timestampsTitle: "Timestamps & incremental synchronisation",
    timestampsIntro:
      "Four timestamps drive list filtering and synchronisation. The sync filters are named after the field they filter and compare inclusively (>=).",
    timestampItems: [
      { field: "CreatedAt", text: "When the claim was created. Filters: createdFrom / createdTo." },
      {
        text: "completedFrom / completedTo filter on the moment of the most recent completion (Finalized event; for reopened cases the newest completion counts). Meant for reporting windows (“all cases completed in Q2”) — not for synchronisation.",
      },
      {
        field: "LastChangedAt",
        text: "Last partner-relevant change (status, documents, reports, comments, amounts). Filter: lastChangedSince.",
      },
      {
        field: "LastReportApprovedAt",
        text: "When the most recent report approval happened (null if none yet). Filter: lastReportApprovedSince — claims without an approved report never match.",
      },
    ],
    syncRecipeTitle: "Sync recipe (daily poller)",
    syncRecipeSteps: [
      "Query with lastChangedSince=<stored cursor> (first run: without the filter).",
      "Process results idempotently — the comparison is inclusive, so the boundary value can appear again.",
      "Store the maximum LastChangedAt you saw as the new cursor.",
      "Only interested in newly approved reports? Same flow with lastReportApprovedSince and LastReportApprovedAt.",
    ],
    claimsTitle: "Claims",
    claimDocsTitle: "Claim Documents",
    claimReportsTitle: "Reports on Claims",
    endpoints: {
      claimsList: "Paginated list of claims.",
      claimsCreate: "Create claim.",
      claimsValidate: "Validate a claim request without creating the claim.",
      claimsGet: "Get claim details.",
      claimDocsList: "Paginated list of claim documents.",
      claimDocsAdd: "Upload document.",
      claimDocsGet: "Get document content (incl. ContentBase64).",
      claimReportsList: "List reports (submissions) for a claim.",
      claimReportDocsList: "Get document contents of a report submission.",
    },
  },
  fr: {
    title: "Assureurs",
    intro:
      "Points de terminaison pour les assureurs pour créer/valider/récupérer des sinistres, des documents et des aperçus de rapports.",
    timestampsTitle: "Horodatages & synchronisation incrémentale",
    timestampsIntro:
      "Quatre horodatages pilotent le filtrage des listes et la synchronisation. Les filtres de synchronisation portent le nom du champ qu'ils filtrent et comparent inclusivement (>=).",
    timestampItems: [
      { field: "CreatedAt", text: "Date de création du sinistre. Filtres : createdFrom / createdTo." },
      {
        text: "completedFrom / completedTo filtrent sur le moment de la clôture la plus récente (événement Finalized ; pour les dossiers rouverts, la clôture la plus récente compte). Prévu pour des fenêtres d'analyse (« tous les dossiers clôturés au T2 ») — pas pour la synchronisation.",
      },
      {
        field: "LastChangedAt",
        text: "Dernière modification pertinente pour le partenaire (statut, documents, rapports, commentaires, montants). Filtre : lastChangedSince.",
      },
      {
        field: "LastReportApprovedAt",
        text: "Moment de la dernière approbation de rapport (null si aucune). Filtre : lastReportApprovedSince — les sinistres sans rapport approuvé ne correspondent jamais.",
      },
    ],
    syncRecipeTitle: "Recette de synchronisation (poller quotidien)",
    syncRecipeSteps: [
      "Interroger avec lastChangedSince=<curseur enregistré> (premier passage : sans le filtre).",
      "Traiter les résultats de manière idempotente — la comparaison est inclusive, la valeur limite peut réapparaître.",
      "Enregistrer comme nouveau curseur le maximum des LastChangedAt observés.",
      "Seuls les nouveaux rapports approuvés vous intéressent ? Même déroulement avec lastReportApprovedSince et LastReportApprovedAt.",
    ],
    claimsTitle: "Sinistres",
    claimDocsTitle: "Documents de sinistre",
    claimReportsTitle: "Rapports sur les sinistres",
    endpoints: {
      claimsList: "Liste paginée des sinistres.",
      claimsCreate: "Créer un sinistre.",
      claimsValidate: "Valider la demande de sinistre sans créer le sinistre.",
      claimsGet: "Obtenir les détails du sinistre.",
      claimDocsList: "Liste paginée des documents de sinistre.",
      claimDocsAdd: "Télécharger un document.",
      claimDocsGet: "Obtenir le contenu du document (y compris ContentBase64).",
      claimReportsList: "Lister les rapports (soumissions) pour un sinistre.",
      claimReportDocsList: "Obtenir le contenu des documents d'une soumission de rapport.",
    },
  },
  it: {
    title: "Assicuratori",
    intro:
      "Endpoint per gli assicuratori per creare/validare/recuperare sinistri, documenti e panoramiche dei rapporti.",
    timestampsTitle: "Timestamp & sincronizzazione incrementale",
    timestampsIntro:
      "Quattro timestamp determinano i filtri degli elenchi e la sincronizzazione. I filtri di sincronizzazione portano il nome del campo che filtrano ed effettuano un confronto inclusivo (>=).",
    timestampItems: [
      { field: "CreatedAt", text: "Momento di creazione del sinistro. Filtri: createdFrom / createdTo." },
      {
        text: "completedFrom / completedTo filtrano in base al momento della chiusura più recente del caso (evento Finalized; per i casi riaperti conta la chiusura più recente). Pensati per periodi di analisi («tutti i casi chiusi nel Q2») — non per la sincronizzazione.",
      },
      {
        field: "LastChangedAt",
        text: "Ultima modifica rilevante per il partner (stato, documenti, rapporti, commenti, importi). Filtro: lastChangedSince.",
      },
      {
        field: "LastReportApprovedAt",
        text: "Momento dell'ultima approvazione di un rapporto (null, se non ancora avvenuta). Filtro: lastReportApprovedSince — i sinistri senza rapporto approvato non corrispondono mai.",
      },
    ],
    syncRecipeTitle: "Procedura di sincronizzazione (poller giornaliero)",
    syncRecipeSteps: [
      "Eseguire la richiesta con lastChangedSince=<cursore salvato> (prima esecuzione: senza filtro).",
      "Elaborare i risultati in modo idempotente — il confronto è inclusivo, il valore limite può ricomparire.",
      "Salvare come nuovo cursore il valore massimo di LastChangedAt ricevuto.",
      "Le interessano solo i nuovi rapporti approvati? Stessa procedura con lastReportApprovedSince e LastReportApprovedAt.",
    ],
    claimsTitle: "Sinistri",
    claimDocsTitle: "Documenti del sinistro",
    claimReportsTitle: "Rapporti sui sinistri",
    endpoints: {
      claimsList: "Elenco paginato dei sinistri.",
      claimsCreate: "Creare un sinistro.",
      claimsValidate: "Validare la richiesta del sinistro senza creare il sinistro.",
      claimsGet: "Recuperare i dettagli del sinistro.",
      claimDocsList: "Elenco paginato dei documenti del sinistro.",
      claimDocsAdd: "Caricare un documento.",
      claimDocsGet: "Recuperare il contenuto del documento (incl. ContentBase64).",
      claimReportsList: "Elencare i rapporti (submission) di un sinistro.",
      claimReportDocsList: "Recuperare i contenuti dei documenti di una submission di rapporto.",
    },
  },
}
