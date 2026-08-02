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
        <h4 className="mb-2 text-sm font-semibold text-foreground">Timestamps & incremental synchronisation</h4>
        <p className="mb-3 text-pretty">Four timestamps drive list filtering and synchronisation. The sync filters are named after the field they filter and compare inclusively (&gt;=).</p>
        <ul className="space-y-1.5">
          <li>
            <span className="font-mono">CreatedAt</span> — When the claim was created. Filters: createdFrom / createdTo.
          </li>
          <li>
            completedFrom / completedTo filter on the moment of the most recent completion (Finalized event; for reopened cases the newest completion counts). Meant for reporting windows (“all cases completed in Q2”) — not for synchronisation.
          </li>
          <li>
            <span className="font-mono">LastChangedAt</span> — Last partner-relevant change (status, documents, reports, comments). Filter: lastChangedSince.
          </li>
          <li>
            <span className="font-mono">LastReportApprovedAt</span> — When the most recent report approval happened (null if none yet). Filter: lastReportApprovedSince — claims without an approved report never match.
          </li>
        </ul>
        <h4 className="mb-1.5 mt-4 text-sm font-semibold text-foreground">Sync recipe (daily poller)</h4>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Query with lastChangedSince=&lt;stored cursor&gt; (first run: without the filter).</li>
          <li>Process results idempotently — the comparison is inclusive, so the boundary value can appear again.</li>
          <li>Store the maximum LastChangedAt you saw as the new cursor.</li>
          <li>Only interested in newly approved reports? Same flow with lastReportApprovedSince and LastReportApprovedAt.</li>
        </ol>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Claims</h3>

        <div className="space-y-4">
          <div id="insurer-claims-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims"
              label="List"
              description="Paginated list of claims."
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
