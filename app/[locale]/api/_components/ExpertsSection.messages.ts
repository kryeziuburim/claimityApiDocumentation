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
]

const amountItems: FieldItem[] = [
  { field: "CostEstimateAmount", text: "Kostenvoranschlag der Werkstatt." },
  { field: "ApprovedAmount", text: "Durch das Gutachten freigegebener Betrag." },
  {
    field: "SavingsAmount",
    text: "Einsparung = CostEstimateAmount − ApprovedAmount; nur wenn beide gesetzt sind und der Kostenvoranschlag höher ist, sonst null.",
  },
]

const de = {
  title: "Experten",
  intro: "Endpoints für Experten zum Arbeiten mit Fällen, Dokumenten und Gutachten-/Report-Submissions.",
  timestampsTitle: "Zeitstempel & inkrementelle Synchronisierung",
  timestampsIntro: "Zeitstempel und Sync-Filter (inklusiv >=), benannt nach dem Feld, das sie filtern:",
  timestampItems,
  amountsTitle: "Beträge (CHF)",
  amountsIntro:
    "Fall-Liste und Fall-Details liefern drei Beträge in CHF (null = noch nicht erfasst). Gesetzt werden sie über PUT /v1/experts/cases/{caseId}/amounts.",
  amountItems,
  casesTitle: "Fälle",
  caseDocsTitle: "Falldokumente",
  reportsTitle: "Reports & Submissions",
  submissionDocsTitle: "Submission-Dokumente",
  endpoints: {
    casesList: "Paginierte Liste von Fällen.",
    casesGet: "Details zu einem Fall abrufen.",
    casesComment: "Expertenkommentar setzen/aktualisieren.",
    casesAmounts:
      "Beträge des Falls in CHF setzen: { CostEstimateAmount, ApprovedAmount }. Ersetzt beide Werte (null löscht einen), ≥ 0, max. 2 Nachkommastellen. Nur bis zum Fallabschluss (danach 409 – Fall zuerst wieder öffnen). Liefert 204 No Content.",
    casesReopen:
      "Einen abgeschlossenen Fall wieder öffnen, um weiterzuarbeiten (z.B. korrigierter Report). Ein Grund ist erforderlich. Liefert 204 No Content.",
    caseDocsList: "Paginierte Liste der Falldokumente.",
    caseDocsGet: "Dokumentinhalt abrufen (inkl. ContentBase64).",
    reportsDraftCreate: "Draft-Submission zu einem Fall erstellen.",
    reportsDraftUpdate: "Draft-Submission aktualisieren (z.B. Comment).",
    reportsList: "Reports zu einem Fall auflisten.",
    reportsSubmissionGet: "Details einer Submission abrufen.",
    submissionDocsList: "Paginierte Liste der Dokumente einer Submission.",
    submissionDocsAdd: "Dokument zu einer Submission hochladen.",
    submissionDocsDelete: "Dokument aus Submission löschen.",
    submissionSubmit: "Submission final einreichen.",
  },
}

export const expertsMessages: Record<Locale, typeof de> = {
  de,
  en: {
    title: "Experts",
    intro: "Endpoints for experts to work with cases, documents, and report submissions.",
    timestampsTitle: "Timestamps & incremental synchronisation",
    timestampsIntro: "Timestamps and sync filters (inclusive >=), named after the field they filter:",
    timestampItems: [
      { field: "CreatedAt", text: "When the claim was created. Filters: createdFrom / createdTo." },
      {
        text: "completedFrom / completedTo filter on the moment of the most recent completion (Finalized event; for reopened cases the newest completion counts). Meant for reporting windows (“all cases completed in Q2”) — not for synchronisation.",
      },
      {
        field: "LastChangedAt",
        text: "Last partner-relevant change (status, documents, reports, comments, amounts). Filter: lastChangedSince.",
      },
    ],
    amountsTitle: "Amounts (CHF)",
    amountsIntro:
      "Case list and case details carry three amounts in CHF (null = not entered yet). Set them with PUT /v1/experts/cases/{caseId}/amounts.",
    amountItems: [
      { field: "CostEstimateAmount", text: "The workshop's cost estimate." },
      { field: "ApprovedAmount", text: "The amount approved by the expert report." },
      {
        field: "SavingsAmount",
        text: "Savings = CostEstimateAmount − ApprovedAmount; only when both are set and the estimate is higher, otherwise null.",
      },
    ],
    casesTitle: "Cases",
    caseDocsTitle: "Case Documents",
    reportsTitle: "Reports & Submissions",
    submissionDocsTitle: "Submission Documents",
    endpoints: {
      casesList: "Paginated list of cases.",
      casesGet: "Get details of a case.",
      casesComment: "Set/update expert comment.",
      casesAmounts:
        "Set the case amounts in CHF: { CostEstimateAmount, ApprovedAmount }. Replaces both values (null clears one), ≥ 0, max. 2 decimals. Only until the case is completed (409 afterwards – reopen the case first). Returns 204 No Content.",
      casesReopen:
        "Reopen a completed case to continue working on it (e.g. a corrected report). A reason is required. Returns 204 No Content.",
      caseDocsList: "Paginated list of case documents.",
      caseDocsGet: "Get document content (incl. ContentBase64).",
      reportsDraftCreate: "Create draft submission for a case.",
      reportsDraftUpdate: "Update draft submission (e.g. comment).",
      reportsList: "List reports for a case.",
      reportsSubmissionGet: "Get details of a submission.",
      submissionDocsList: "Paginated list of documents of a submission.",
      submissionDocsAdd: "Upload document to a submission.",
      submissionDocsDelete: "Delete document from submission.",
      submissionSubmit: "Finally submit submission.",
    },
  },
  fr: {
    title: "Experts",
    intro:
      "Points de terminaison pour les experts pour travailler avec des dossiers, des documents et des soumissions de rapports.",
    timestampsTitle: "Horodatages & synchronisation incrémentale",
    timestampsIntro:
      "Horodatages et filtres de synchronisation (inclusifs >=), nommés d'après le champ qu'ils filtrent :",
    timestampItems: [
      { field: "CreatedAt", text: "Date de création du sinistre. Filtres : createdFrom / createdTo." },
      {
        text: "completedFrom / completedTo filtrent sur le moment de la clôture la plus récente (événement Finalized ; pour les dossiers rouverts, la clôture la plus récente compte). Prévu pour des fenêtres d'analyse (« tous les dossiers clôturés au T2 ») — pas pour la synchronisation.",
      },
      {
        field: "LastChangedAt",
        text: "Dernière modification pertinente pour le partenaire (statut, documents, rapports, commentaires, montants). Filtre : lastChangedSince.",
      },
    ],
    amountsTitle: "Montants (CHF)",
    amountsIntro:
      "La liste et le détail des dossiers fournissent trois montants en CHF (null = pas encore saisi). Ils se définissent via PUT /v1/experts/cases/{caseId}/amounts.",
    amountItems: [
      { field: "CostEstimateAmount", text: "Devis du garage." },
      { field: "ApprovedAmount", text: "Montant validé par l'expertise." },
      {
        field: "SavingsAmount",
        text: "Économie = CostEstimateAmount − ApprovedAmount ; uniquement si les deux sont renseignés et que le devis est plus élevé, sinon null.",
      },
    ],
    casesTitle: "Dossiers",
    caseDocsTitle: "Documents du dossier",
    reportsTitle: "Rapports & Soumissions",
    submissionDocsTitle: "Documents de soumission",
    endpoints: {
      casesList: "Liste paginée de dossiers.",
      casesGet: "Obtenir les détails d'un dossier.",
      casesComment: "Définir/mettre à jour le commentaire de l'expert.",
      casesAmounts:
        "Définir les montants du dossier en CHF : { CostEstimateAmount, ApprovedAmount }. Remplace les deux valeurs (null en efface une), ≥ 0, 2 décimales max. Uniquement jusqu'à la clôture du dossier (ensuite 409 – rouvrir d'abord le dossier). Renvoie 204 No Content.",
      casesReopen:
        "Rouvrir un dossier clôturé pour continuer à y travailler (par ex. un rapport corrigé). Un motif est requis. Renvoie 204 No Content.",
      caseDocsList: "Liste paginée des documents du dossier.",
      caseDocsGet: "Obtenir le contenu du document (y compris ContentBase64).",
      reportsDraftCreate: "Créer une soumission brouillon pour un dossier.",
      reportsDraftUpdate: "Mettre à jour la soumission brouillon (par ex. commentaire).",
      reportsList: "Lister les rapports pour un dossier.",
      reportsSubmissionGet: "Obtenir les détails d'une soumission.",
      submissionDocsList: "Liste paginée des documents d'une soumission.",
      submissionDocsAdd: "Télécharger un document vers une soumission.",
      submissionDocsDelete: "Supprimer un document de la soumission.",
      submissionSubmit: "Soumettre la soumission finale.",
    },
  },
  it: {
    title: "Periti",
    intro: "Endpoint per i periti per lavorare con casi, documenti e submission di perizie/rapporti.",
    timestampsTitle: "Timestamp & sincronizzazione incrementale",
    timestampsIntro: "Timestamp e filtri di sincronizzazione (inclusivi >=), denominati come il campo che filtrano:",
    timestampItems: [
      { field: "CreatedAt", text: "Momento di creazione del sinistro. Filtri: createdFrom / createdTo." },
      {
        text: "completedFrom / completedTo filtrano in base al momento della chiusura più recente del caso (evento Finalized; per i casi riaperti conta la chiusura più recente). Pensati per periodi di analisi («tutti i casi chiusi nel Q2») — non per la sincronizzazione.",
      },
      {
        field: "LastChangedAt",
        text: "Ultima modifica rilevante per il partner (stato, documenti, rapporti, commenti, importi). Filtro: lastChangedSince.",
      },
    ],
    amountsTitle: "Importi (CHF)",
    amountsIntro:
      "L'elenco dei casi e i dettagli del caso forniscono tre importi in CHF (null = non ancora registrato). Vengono impostati tramite PUT /v1/experts/cases/{caseId}/amounts.",
    amountItems: [
      { field: "CostEstimateAmount", text: "Preventivo dell'officina." },
      { field: "ApprovedAmount", text: "Importo approvato dalla perizia." },
      {
        field: "SavingsAmount",
        text: "Risparmio = CostEstimateAmount − ApprovedAmount; solo se entrambi sono impostati e il preventivo è più alto, altrimenti null.",
      },
    ],
    casesTitle: "Casi",
    caseDocsTitle: "Documenti del caso",
    reportsTitle: "Rapporti & Submission",
    submissionDocsTitle: "Documenti della submission",
    endpoints: {
      casesList: "Elenco paginato dei casi.",
      casesGet: "Recuperare i dettagli di un caso.",
      casesComment: "Impostare/aggiornare il commento del perito.",
      casesAmounts:
        "Impostare gli importi del caso in CHF: { CostEstimateAmount, ApprovedAmount }. Sostituisce entrambi i valori (null ne cancella uno), ≥ 0, max. 2 decimali. Solo fino alla chiusura del caso (dopo 409 – riaprire prima il caso). Restituisce 204 No Content.",
      casesReopen:
        "Riaprire un caso chiuso per continuare a lavorarci (ad es. rapporto corretto). È necessario indicare un motivo. Restituisce 204 No Content.",
      caseDocsList: "Elenco paginato dei documenti del caso.",
      caseDocsGet: "Recuperare il contenuto del documento (incl. ContentBase64).",
      reportsDraftCreate: "Creare una submission in bozza per un caso.",
      reportsDraftUpdate: "Aggiornare la submission in bozza (ad es. Comment).",
      reportsList: "Elencare i rapporti di un caso.",
      reportsSubmissionGet: "Recuperare i dettagli di una submission.",
      submissionDocsList: "Elenco paginato dei documenti di una submission.",
      submissionDocsAdd: "Caricare un documento in una submission.",
      submissionDocsDelete: "Eliminare un documento dalla submission.",
      submissionSubmit: "Inviare definitivamente la submission.",
    },
  },
}
