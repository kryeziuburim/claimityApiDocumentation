import { EndpointCard } from "@/components/api/EndpointCard"
import type { Locale } from "@/lib/i18n"

import { insurerMessages } from "./InsurerSection.messages"

export function InsurerSection({ locale }: { locale: Locale }) {
  const t = insurerMessages[locale]
  const e = t.endpoints

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl mb-4 font-bold tracking-tight text-balance">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        <h4 className="mb-2 text-sm font-semibold text-foreground">{t.timestampsTitle}</h4>
        <p className="text-sm mb-3 text-pretty">{t.timestampsIntro}</p>
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
        <h4 className="mb-1.5 mt-4 text-sm font-semibold text-foreground">{t.syncRecipeTitle}</h4>
        <ol className="list-decimal space-y-1 pl-5">
          {t.syncRecipeSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="text-base sm:text-lg mb-4 font-semibold">{t.claimsTitle}</h3>

        <div className="space-y-4">
          <div id="insurer-claims-list" className="scroll-mt-8">
            <EndpointCard method="GET" path="/v1/insurers/claims" description={e.claimsList} />
          </div>

          <div id="insurer-claims-create" className="scroll-mt-8">
            <EndpointCard method="POST" path="/v1/insurers/claims" description={e.claimsCreate} />
          </div>

          <div id="insurer-claims-validate" className="scroll-mt-8">
            <EndpointCard method="POST" path="/v1/insurers/claims:validate" description={e.claimsValidate} />
          </div>

          <div id="insurer-claims-get" className="scroll-mt-8">
            <EndpointCard method="GET" path="/v1/insurers/claims/{claimId}" description={e.claimsGet} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base sm:text-lg mb-4 font-semibold">{t.claimDocsTitle}</h3>

        <div className="space-y-4">
          <div id="insurer-claim-docs-list" className="scroll-mt-8">
            <EndpointCard method="GET" path="/v1/insurers/claims/{claimId}/documents" description={e.claimDocsList} />
          </div>

          <div id="insurer-claim-docs-add" className="scroll-mt-8">
            <EndpointCard method="POST" path="/v1/insurers/claims/{claimId}/documents" description={e.claimDocsAdd} />
          </div>

          <div id="insurer-claim-docs-get" className="scroll-mt-8">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents/{documentId}"
              description={e.claimDocsGet}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base sm:text-lg mb-4 font-semibold">{t.claimReportsTitle}</h3>

        <div className="space-y-4">
          <div id="insurer-claim-reports-list" className="scroll-mt-8">
            <EndpointCard method="GET" path="/v1/insurers/claims/{claimId}/reports" description={e.claimReportsList} />
          </div>

          <div id="insurer-claim-report-docs-list" className="scroll-mt-8">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports/{submissionId}/documents"
              description={e.claimReportDocsList}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
