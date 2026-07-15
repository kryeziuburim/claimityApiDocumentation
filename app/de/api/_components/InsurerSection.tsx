import { EndpointCard } from "@/components/api/EndpointCard"

export function InsurerSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Versicherer</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Endpoints für Versicherer zum Erstellen/Validieren/Abrufen von Schäden, Dokumenten und Report-Übersichten.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        <h4 className="mb-2 text-sm font-semibold text-foreground">Inkrementelle Synchronisierung &amp; Zeitstempel</h4>
        <ul className="space-y-1.5">
          <li>
            <span className="font-mono">LastChangedAt</span> — UTC-Zeitstempel der letzten partnerrelevanten Änderung am Claim
            (Status, Dokumente, Reports, …). Als Sync-Cursor nutzbar: den höchsten gesehenen Wert speichern und als
            <span className="font-mono"> updatedSince</span> zurückgeben, um nur die seither geänderten Claims abzurufen.
          </li>
          <li>
            <span className="font-mono">LastReportApprovedAt</span> — UTC-Zeitstempel, wann der zuletzt genehmigte Experten-Report
            des Claims genehmigt wurde (<span className="font-mono">null</span>, falls noch keiner). Damit erkennbar, dass ein neuer
            oder aktualisierter Report zu einem Claim verfügbar ist.
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Schäden</h3>

        <div className="space-y-4">
          <div id="insurer-claims-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims"
              label="List"
              description="Paginierte Liste der Claims. Filter: category (vehicle, appraiser, fraud, special), status (Created, Assigned, Accepted, Rejected, InProgress, ExpertCompleted, Final), q (Freitextsuche), createdFrom/createdTo, completedFrom/completedTo, updatedSince (inkrementelle Synchronisierung). Jeder Eintrag enthält LastChangedAt und LastReportApprovedAt."
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

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Schadendokumente</h3>

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

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Reports zu Claims</h3>

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

