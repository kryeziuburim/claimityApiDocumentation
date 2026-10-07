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

const amountItems: FieldItem[] = [
  { field: "CostEstimateAmount", text: "Kostenvoranschlag der Werkstatt." },
  { field: "ApprovedAmount", text: "Durch das Gutachten freigegebener Betrag." },
  {
    field: "SavingsAmount",
    text: "Einsparung = CostEstimateAmount − ApprovedAmount; nur wenn beide gesetzt sind und der Kostenvoranschlag höher ist, sonst null.",
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
  amountsTitle: "Beträge (CHF)",
  amountsIntro: "Claim-Liste und Claim-Details liefern die vom Experten erfassten Beträge in CHF (null = noch nicht erfasst).",
  amountItems,
  claimsTitle: "Schäden",
  claimDocsTitle: "Schadendokumente",
  claimReportsTitle: "Reports zu Claims",
  endpoints: {
    claimsList: "Paginierte Liste der Claims.",
    claimsCreate: "Claim erstellen.",
    claimsValidate: "Claim-Request validieren (ohne Anlage).",
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
    amountsTitle: "Amounts (CHF)",
    amountsIntro: "Claim list and claim details carry the amounts entered by the expert in CHF (null = not entered yet).",
    amountItems: [
      { field: "CostEstimateAmount", text: "The workshop's cost estimate." },
      { field: "ApprovedAmount", text: "The amount approved by the expert report." },
      {
        field: "SavingsAmount",
        text: "Savings = CostEstimateAmount − ApprovedAmount; only when both are set and the estimate is higher, otherwise null.",
      },
    ],
    claimsTitle: "Claims",
    claimDocsTitle: "Claim Documents",
    claimReportsTitle: "Reports on Claims",
    endpoints: {
      claimsList: "Paginated list of claims.",
      claimsCreate: "Create claim.",
      claimsValidate: "Validate claim request (without attachment).",
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
    amountsTitle: "Montants (CHF)",
    amountsIntro:
      "La liste et le détail des sinistres fournissent les montants saisis par l'expert en CHF (null = pas encore saisi).",
    amountItems: [
      { field: "CostEstimateAmount", text: "Devis du garage." },
      { field: "ApprovedAmount", text: "Montant validé par l'expertise." },
      {
        field: "SavingsAmount",
        text: "Économie = CostEstimateAmount − ApprovedAmount ; uniquement si les deux sont renseignés et que le devis est plus élevé, sinon null.",
      },
    ],
    claimsTitle: "Sinistres",
    claimDocsTitle: "Documents de sinistre",
    claimReportsTitle: "Rapports sur les sinistres",
    endpoints: {
      claimsList: "Liste paginée des sinistres.",
      claimsCreate: "Créer un sinistre.",
      claimsValidate: "Valider la demande de sinistre (sans pièce jointe).",
      claimsGet: "Obtenir les détails du sinistre.",
      claimDocsList: "Liste paginée des documents de sinistre.",
      claimDocsAdd: "Télécharger un document.",
      claimDocsGet: "Obtenir le contenu du document (y compris ContentBase64).",
      claimReportsList: "Lister les rapports (soumissions) pour un sinistre.",
      claimReportDocsList: "Obtenir le contenu des documents d'une soumission de rapport.",
    },
  },
}
