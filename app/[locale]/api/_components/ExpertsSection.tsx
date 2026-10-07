import { EndpointCard } from "@/components/api/EndpointCard"
import type { Locale } from "@/lib/i18n"

import { expertsMessages } from "./ExpertsSection.messages"

export function ExpertsSection({ locale }: { locale: Locale }) {
  const t = expertsMessages[locale]
  const e = t.endpoints

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">{t.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        <h4 className="mb-2 text-sm font-semibold text-foreground">{t.timestampsTitle}</h4>
        <p className="mb-3 text-pretty">{t.timestampsIntro}</p>
        <ul className="space-y-1.5">
          {t.timestampItems.map((item) => (
            <li key={item.text}>
              {item.field ? (
                <>
                  <span className="font-mono">{item.field}</span> — {item.text}
                </>
              ) : (
                item.text
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        <h4 className="mb-2 text-sm font-semibold text-foreground">{t.amountsTitle}</h4>
        <p className="mb-3 text-pretty">{t.amountsIntro}</p>
        <ul className="space-y-1.5">
          {t.amountItems.map((item) => (
            <li key={item.text}>
              <span className="font-mono">{item.field}</span> — {item.text}
            </li>
          ))}
        </ul>
      </div>

      {/* ========== CASES ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">{t.casesTitle}</h3>

        <div className="space-y-4">
          <div id="experts-cases-list" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/experts/cases" label="List" description={e.casesList} />
          </div>

          <div id="experts-cases-get" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/experts/cases/{caseId}" label="Get" description={e.casesGet} />
          </div>

          <div id="experts-cases-comment" className="scroll-mt-24">
            <EndpointCard
              method="PUT"
              path="/v1/experts/cases/{caseId}/expert-comment"
              label="Update"
              description={e.casesComment}
            />
          </div>

          <div id="experts-cases-amounts" className="scroll-mt-24">
            <EndpointCard
              method="PUT"
              path="/v1/experts/cases/{caseId}/amounts"
              label="Update"
              description={e.casesAmounts}
            />
          </div>

          <div id="experts-cases-reopen" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/cases/{caseId}:reopen"
              label="Reopen"
              description={e.casesReopen}
            />
          </div>
        </div>
      </div>

      {/* ========== CASE DOCUMENTS ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">{t.caseDocsTitle}</h3>

        <div className="space-y-4">
          <div id="experts-cases-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/documents"
              label="List"
              description={e.caseDocsList}
            />
          </div>

          <div id="experts-cases-docs-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/documents/{documentId}"
              label="Get"
              description={e.caseDocsGet}
            />
          </div>
        </div>
      </div>

      {/* ========== REPORTS (DRAFT + LIST) ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">{t.reportsTitle}</h3>

        <div className="space-y-4">
          <div id="experts-reports-draft-create" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/cases/{caseId}/reports:draft"
              label="Create"
              description={e.reportsDraftCreate}
            />
          </div>

          <div id="experts-reports-draft-update" className="scroll-mt-24">
            <EndpointCard
              method="PUT"
              path="/v1/experts/cases/{caseId}/reports:draft"
              label="Update"
              description={e.reportsDraftUpdate}
            />
          </div>

          <div id="experts-reports-list" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/experts/cases/{caseId}/reports" label="List" description={e.reportsList} />
          </div>

          <div id="experts-reports-submission-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/cases/{caseId}/reports/{submissionId}"
              label="Get"
              description={e.reportsSubmissionGet}
            />
          </div>
        </div>
      </div>

      {/* ========== SUBMISSION DOCUMENTS + SUBMIT ========== */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">{t.submissionDocsTitle}</h3>

        <div className="space-y-4">
          <div id="experts-submission-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/experts/reports/{submissionId}/documents"
              label="List"
              description={e.submissionDocsList}
            />
          </div>

          <div id="experts-submission-docs-add" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/reports/{submissionId}/documents"
              label="Create"
              description={e.submissionDocsAdd}
            />
          </div>

          <div id="experts-submission-docs-delete" className="scroll-mt-24">
            <EndpointCard
              method="DELETE"
              path="/v1/experts/reports/{submissionId}/documents/{docId}"
              label="Delete"
              description={e.submissionDocsDelete}
            />
          </div>

          <div id="experts-submission-submit" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/experts/reports/{submissionId}/submit"
              label="Submit"
              description={e.submissionSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
