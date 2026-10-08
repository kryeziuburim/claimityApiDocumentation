import { CodeBlock, primaryLinkClassName } from "@/components/api/doc-primitives"
import type { Locale } from "@/lib/i18n"

import { firstStepsMessages } from "./FirstStepsSection.messages"

export function FirstStepsSection({ locale }: { locale: Locale }) {
  const t = firstStepsMessages[locale]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl mb-4 font-bold tracking-tight text-balance">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.intro}</p>
      </div>

      <div className="space-y-4">
        {t.steps
          .map((item, index) => ({ ...item, step: String(index + 1) }))
          .map((item) => (
            <div
              key={item.step}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:gap-4 sm:p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-base font-semibold text-teal-800 ring-1 ring-teal-200 sm:h-10 sm:w-10">
                {item.step}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-balance">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{item.description}</p>
              </div>
            </div>
          ))}
      </div>

      <CodeBlock title={t.exampleRequestTitle}>{`curl -X GET \\
  https://app.claimity.ch/v1/experts/cases \\
  -H 'Accept: application/json' \\
  -H 'Authorization: DPoP {access-token}' \\
  -H 'DPoP: {dpop-header}'`}</CodeBlock>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <h3 className="text-base mb-2 font-semibold">{t.notebooksTitle}</h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground text-pretty">{t.notebooksText}</p>
        <a
          href="https://github.com/Claimity-AG/v1-api"
          target="_blank"
          rel="noopener noreferrer"
          className={primaryLinkClassName}
        >
          {t.notebooksLink}
        </a>
      </div>
    </div>
  )
}
