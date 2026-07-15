import { EndpointCard } from "@/components/api/EndpointCard"

export function ExpertsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Experts</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Endpoints for experts to work with cases, documents, and report submissions.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        <h4 className="mb-2 text-sm font-semibold text-foreground">Incremental sync &amp; timestamps</h4>
        <ul className="space-y-1.5">
          <li>
            <span className="font-mono">LastChangedAt</span> — UTC timestamp of the last partner-relevant change to the case
            (status, expert comment, reports, documents, …). Use it as a sync cursor: store the highest value you have seen and
            pass it back as <span className="font-mono">updatedSince</span> to fetch only what has changed since.
          </li>
        </ul>
      </div>

      {/* ========== CASES ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Cases</h3>

        <div className="space-y-4">
          <div id="experts-cases-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases"
              label="List"
              description="Paginated list of cases. Filters: status (Created, Assigned, Accepted, Rejected, InProgress, ExpertCompleted, Final), category (vehicle, appraiser, fraud, special), inspectionType (onsite, workshop, private, live_expertise, estimate_review, invoice_review), q (free-text), createdFrom/createdTo, completedFrom/completedTo, updatedSince (incremental sync). Each item includes LastChangedAt."
            />
          </div>

          <div id="experts-cases-get" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/experts/cases/{caseId}" label="Get" description="Get details of a case." />
          </div>

          <div id="experts-cases-comment" className="scroll-mt-24">
            <EndpointCard
              method="PUT"
              path="/v1/experts/cases/{caseId}/expert-comment"
              label="Update"
              description="Set/update expert comment."
            />
          </div>

          <div id="experts-cases-reopen" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/cases/{caseId}:reopen"
              label="Reopen"
              description="Reopen a completed case to continue working on it (e.g. a corrected report). A reason is required. Returns 204 No Content."
            />
          </div>
        </div>
      </div>

      {/* ========== CASE DOCUMENTS ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Case Documents</h3>

        <div className="space-y-4">
          <div id="experts-cases-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/documents"
              label="List"
              description="Paginated list of case documents."
            />
          </div>

          <div id="experts-cases-docs-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/documents/{documentId}"
              label="Get"
              description="Get document content (incl. ContentBase64)."
            />
          </div>
        </div>
      </div>

      {/* ========== REPORTS (DRAFT + LIST) ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Reports & Submissions</h3>

        <div className="space-y-4">
          <div id="experts-reports-draft-create" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/cases/{caseId}/reports:draft"
              label="Create"
              description="Create draft submission for a case."
            />
          </div>

          <div id="experts-reports-draft-update" className="scroll-mt-24">
            <EndpointCard
              method="PUT"
              path="/v1/experts/cases/{caseId}/reports:draft"
              label="Update"
              description="Update draft submission (e.g. comment)."
            />
          </div>

          <div id="experts-reports-list" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/experts/cases/{caseId}/reports" label="List" description="List reports for a case." />
          </div>

          <div id="experts-reports-submission-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/reports/{submissionId}"
              label="Get"
              description="Get details of a submission."
            />
          </div>
        </div>
      </div>

      {/* ========== SUBMISSION DOCUMENTS + SUBMIT ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Submission Documents</h3>

        <div className="space-y-4">
          <div id="experts-submission-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/reports/{submissionId}/documents"
              label="List"
              description="Paginated list of documents of a submission."
            />
          </div>

          <div id="experts-submission-docs-add" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/reports/{submissionId}/documents"
              label="Create"
              description="Upload document to a submission."
            />
          </div>

          <div id="experts-submission-docs-delete" className="scroll-mt-24">
            <EndpointCard
              method="DELETE"
              path="/v1/experts/reports/{submissionId}/documents/{docId}"
              label="Delete"
              description="Delete document from submission."
            />
          </div>

          <div id="experts-submission-submit" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/reports/{submissionId}/submit"
              label="Submit"
              description="Finally submit submission."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
