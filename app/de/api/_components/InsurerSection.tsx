import { EndpointCard } from "@/components/api/EndpointCard"

export function InsurerSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Versicherer</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Endpoints für Versicherer zum Erstellen/Validieren/Abrufen von Schäden, Dokumenten und Report-Übersichten.
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold">Schäden</h3>

        <div className="space-y-4">
          <div id="insurer-claims-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims"
              label="List"
              description="Paginierte Liste der Claims. Optional filterbar via category, status."
            />
          </div>

          <div id="insurer-claims-create" className="scroll-mt-24">
            <EndpointCard method="POST" path="/v1/insurers/claims" label="Create" description="Claim erstellen." />
          </div>

          <div id="insurer-claims-validate" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/insurers/claims:validate"
              label="Validate"
              description="Claim-Request validieren (ohne Anlage)."
            />
          </div>

          <div id="insurer-claims-get" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/insurers/claims/{claimId}" label="Get" description="Claim-Details abrufen." />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold">Schadendokumente</h3>

        <div className="space-y-4">
          <div id="insurer-claim-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents"
              label="List"
              description="Paginierte Liste der Claim-Dokumente."
            />
          </div>

          <div id="insurer-claim-docs-add" className="scroll-mt-24">
            <EndpointCard method="POST" path="/v1/insurers/claims/{claimId}/documents" label="Create" description="Dokument hochladen." />
          </div>

          <div id="insurer-claim-docs-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents/{documentId}"
              label="Get"
              description="Dokumentinhalt abrufen (inkl. ContentBase64)."
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold">Reports zu Claims</h3>

        <div className="space-y-4">
          <div id="insurer-claim-reports-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports"
              label="List"
              description="Reports (Submissions) zu einem Claim auflisten."
            />
          </div>

          <div id="insurer-claim-report-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports/{submissionId}/documents"
              label="List"
              description="Dokumentinhalte einer Report-Submission abrufen."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

