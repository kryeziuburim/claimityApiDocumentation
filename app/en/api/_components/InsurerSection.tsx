import { EndpointCard } from "@/components/api/EndpointCard"

export function InsurerSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Insurers</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Endpoints for insurers to create/validate/retrieve claims, documents, and report overviews.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        <h4 className="mb-2 text-sm font-semibold text-foreground">Incremental sync &amp; timestamps</h4>
        <ul className="space-y-1.5">
          <li>
            <span className="font-mono">LastChangedAt</span> — UTC timestamp of the last partner-relevant change to the claim
            (status, documents, reports, …). Use it as a sync cursor: store the highest value you have seen and pass it back as
            <span className="font-mono"> updatedSince</span> to fetch only what has changed since.
          </li>
          <li>
            <span className="font-mono">LastReportApprovedAt</span> — UTC timestamp of when the most recently approved expert report
            for the claim was approved (<span className="font-mono">null</span> if none yet). Use it to detect that a new or updated
            report has become available for a claim.
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Claims</h3>

        <div className="space-y-4">
          <div id="insurer-claims-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims"
              label="List"
              description="Paginated list of claims. Filters: category (vehicle, appraiser, fraud, special), status (Created, Assigned, Accepted, Rejected, InProgress, ExpertCompleted, Final), q (free-text), createdFrom/createdTo, completedFrom/completedTo, updatedSince (incremental sync). Each item includes LastChangedAt and LastReportApprovedAt."
            />
          </div>

          <div id="insurer-claims-create" className="scroll-mt-24">
            <EndpointCard method="POST" path="/v1/insurers/claims" label="Create" description="Create claim." />
          </div>

          <div id="insurer-claims-validate" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/insurers/claims:validate"
              label="Validate"
              description="Validate claim request (without attachment)."
            />
          </div>

          <div id="insurer-claims-get" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/insurers/claims/{claimId}" label="Get" description="Get claim details." />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Claim Documents</h3>

        <div className="space-y-4">
          <div id="insurer-claim-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents"
              label="List"
              description="Paginated list of claim documents."
            />
          </div>

          <div id="insurer-claim-docs-add" className="scroll-mt-24">
            <EndpointCard method="POST" path="/v1/insurers/claims/{claimId}/documents" label="Create" description="Upload document." />
          </div>

          <div id="insurer-claim-docs-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents/{documentId}"
              label="Get"
              description="Get document content (incl. ContentBase64)."
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Reports on Claims</h3>

        <div className="space-y-4">
          <div id="insurer-claim-reports-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports"
              label="List"
              description="List reports (submissions) for a claim."
            />
          </div>

          <div id="insurer-claim-report-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports/{submissionId}/documents"
              label="List"
              description="Get document contents of a report submission."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
