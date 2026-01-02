import { EndpointCard } from "@/components/api/EndpointCard"

export function ExpertsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Experten</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Endpoints für Experten zum Arbeiten mit Fällen, Dokumenten und Gutachten-/Report-Submissions.
        </p>
      </div>

      {/* ========== CASES ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Fälle</h3>

        <div className="space-y-4">
          <div id="experts-cases-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases"
              label="List"
              description="Paginierte Liste von Fällen. Optional filterbar via status, category."
            />
          </div>

          <div id="experts-cases-get" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/experts/cases/{caseId}" label="Get" description="Details zu einem Fall abrufen." />
          </div>

          <div id="experts-cases-comment" className="scroll-mt-24">
            <EndpointCard
              method="PUT"
              path="/v1/experts/cases/{caseId}/expert-comment"
              label="Update"
              description="Expertenkommentar setzen/aktualisieren."
            />
          </div>
        </div>
      </div>

      {/* ========== CASE DOCUMENTS ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Falldokumente</h3>

        <div className="space-y-4">
          <div id="experts-cases-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/documents"
              label="List"
              description="Paginierte Liste der Falldokumente."
            />
          </div>

          <div id="experts-cases-docs-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/documents/{documentId}"
              label="Get"
              description="Dokumentinhalt abrufen (inkl. ContentBase64)."
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
              description="Draft-Submission zu einem Fall erstellen."
            />
          </div>

          <div id="experts-reports-draft-update" className="scroll-mt-24">
            <EndpointCard
              method="PUT"
              path="/v1/experts/cases/{caseId}/reports:draft"
              label="Update"
              description="Draft-Submission aktualisieren (z.B. Comment)."
            />
          </div>

          <div id="experts-reports-list" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/experts/cases/{caseId}/reports" label="List" description="Reports zu einem Fall auflisten." />
          </div>

          <div id="experts-reports-submission-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/reports/{submissionId}"
              label="Get"
              description="Details einer Submission abrufen."
            />
          </div>
        </div>
      </div>

      {/* ========== SUBMISSION DOCUMENTS + SUBMIT ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Submission-Dokumente</h3>

        <div className="space-y-4">
          <div id="experts-submission-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/reports/{submissionId}/documents"
              label="List"
              description="Paginierte Liste der Dokumente einer Submission."
            />
          </div>

          <div id="experts-submission-docs-add" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/reports/{submissionId}/documents"
              label="Create"
              description="Dokument zu einer Submission hochladen."
            />
          </div>

          <div id="experts-submission-docs-delete" className="scroll-mt-24">
            <EndpointCard
              method="DELETE"
              path="/v1/experts/reports/{submissionId}/documents/{docId}"
              label="Delete"
              description="Dokument aus Submission löschen."
            />
          </div>

          <div id="experts-submission-submit" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/reports/{submissionId}/submit"
              label="Submit"
              description="Submission final einreichen."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

