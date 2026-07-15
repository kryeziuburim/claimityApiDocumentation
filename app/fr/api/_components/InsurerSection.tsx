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
        <h4 className="mb-2 text-sm font-semibold text-foreground">Synchronisation incrémentale &amp; horodatages</h4>
        <ul className="space-y-1.5">
          <li>
            <span className="font-mono">LastChangedAt</span> — horodatage UTC de la dernière modification du sinistre pertinente pour
            le partenaire (statut, documents, rapports, …). Utilisable comme curseur de synchronisation : conservez la valeur la plus
            élevée vue et renvoyez-la via <span className="font-mono">updatedSince</span> pour ne récupérer que ce qui a changé depuis.
          </li>
          <li>
            <span className="font-mono">LastReportApprovedAt</span> — horodatage UTC indiquant quand le dernier rapport d'expert
            approuvé du sinistre a été approuvé (<span className="font-mono">null</span> s'il n'y en a pas encore). Permet de détecter
            qu'un rapport nouveau ou mis à jour est disponible pour un sinistre.
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
              description="Liste paginée des sinistres. Filtres : category (vehicle, appraiser, fraud, special), status (Created, Assigned, Accepted, Rejected, InProgress, ExpertCompleted, Final), q (recherche plein texte), createdFrom/createdTo, completedFrom/completedTo, updatedSince (synchronisation incrémentale). Chaque élément inclut LastChangedAt et LastReportApprovedAt."
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
