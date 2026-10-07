import { EndpointCard } from "@/components/api/EndpointCard"

export function InsurerSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Assureurs</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Points de terminaison pour les assureurs pour créer/valider/récupérer des sinistres, des documents et des aperçus de rapports.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        <h4 className="mb-2 text-sm font-semibold text-foreground">Horodatages & synchronisation incrémentale</h4>
        <p className="mb-3 text-pretty">Quatre horodatages pilotent le filtrage des listes et la synchronisation. Les filtres de synchronisation portent le nom du champ qu'ils filtrent et comparent inclusivement (&gt;=).</p>
        <ul className="space-y-1.5">
          <li>
            <span className="font-mono">CreatedAt</span> — Date de création du sinistre. Filtres : createdFrom / createdTo.
          </li>
          <li>
            completedFrom / completedTo filtrent sur le moment de la clôture la plus récente (événement Finalized ; pour les dossiers rouverts, la clôture la plus récente compte). Prévu pour des fenêtres d'analyse (« tous les dossiers clôturés au T2 ») — pas pour la synchronisation.
          </li>
          <li>
            <span className="font-mono">LastChangedAt</span> — Dernière modification pertinente pour le partenaire (statut, documents, rapports, commentaires, montants). Filtre : lastChangedSince.
          </li>
          <li>
            <span className="font-mono">LastReportApprovedAt</span> — Moment de la dernière approbation de rapport (null si aucune). Filtre : lastReportApprovedSince — les sinistres sans rapport approuvé ne correspondent jamais.
          </li>
        </ul>
        <h4 className="mb-1.5 mt-4 text-sm font-semibold text-foreground">Recette de synchronisation (poller quotidien)</h4>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Interroger avec lastChangedSince=&lt;curseur enregistré&gt; (premier passage : sans le filtre).</li>
          <li>Traiter les résultats de manière idempotente — la comparaison est inclusive, la valeur limite peut réapparaître.</li>
          <li>Enregistrer comme nouveau curseur le maximum des LastChangedAt observés.</li>
          <li>Seuls les nouveaux rapports approuvés vous intéressent ? Même déroulement avec lastReportApprovedSince et LastReportApprovedAt.</li>
        </ol>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        <h4 className="mb-2 text-sm font-semibold text-foreground">Montants (CHF)</h4>
        <p className="mb-3 text-pretty">La liste et le détail des sinistres fournissent les montants saisis par l'expert en CHF (null = pas encore saisi).</p>
        <ul className="space-y-1.5">
          <li>
            <span className="font-mono">CostEstimateAmount</span> — Devis du garage.
          </li>
          <li>
            <span className="font-mono">ApprovedAmount</span> — Montant validé par l'expertise.
          </li>
          <li>
            <span className="font-mono">SavingsAmount</span> — Économie = CostEstimateAmount − ApprovedAmount ; uniquement si les deux sont renseignés et que le devis est plus élevé, sinon null.
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Sinistres</h3>

        <div className="space-y-4">
          <div id="insurer-claims-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims"
              label="List"
              description="Liste paginée des sinistres."
            />
          </div>

          <div id="insurer-claims-create" className="scroll-mt-24">
            <EndpointCard method="POST" path="/v1/insurers/claims" label="Create" description="Créer un sinistre." />
          </div>

          <div id="insurer-claims-validate" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/insurers/claims:validate"
              label="Validate"
              description="Valider la demande de sinistre (sans pièce jointe)."
            />
          </div>

          <div id="insurer-claims-get" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/insurers/claims/{claimId}" label="Get" description="Obtenir les détails du sinistre." />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Documents de sinistre</h3>

        <div className="space-y-4">
          <div id="insurer-claim-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents"
              label="List"
              description="Liste paginée des documents de sinistre."
            />
          </div>

          <div id="insurer-claim-docs-add" className="scroll-mt-24">
            <EndpointCard method="POST" path="/v1/insurers/claims/{claimId}/documents" label="Create" description="Télécharger un document." />
          </div>

          <div id="insurer-claim-docs-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents/{documentId}"
              label="Get"
              description="Obtenir le contenu du document (y compris ContentBase64)."
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Rapports sur les sinistres</h3>

        <div className="space-y-4">
          <div id="insurer-claim-reports-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports"
              label="List"
              description="Lister les rapports (soumissions) pour un sinistre."
            />
          </div>

          <div id="insurer-claim-report-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports/{submissionId}/documents"
              label="List"
              description="Obtenir le contenu des documents d'une soumission de rapport."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
