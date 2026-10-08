import { Callout, primaryLinkClassName } from "@/components/api/doc-primitives"
import LocalizedLink from "@/components/localized-link"
import type { Locale } from "@/lib/i18n"

import { reportingMessages } from "./ReportingSection.messages"

export function ReportingSection({ locale }: { locale: Locale }) {
  const t = reportingMessages[locale]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl mb-4 font-bold tracking-tight text-balance">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <h3 className="text-base sm:text-lg mb-4 font-semibold">{t.beforeTitle}</h3>
        <ul className="space-y-3 text-sm">
          {t.doItems.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-primary">✓</span>
              <span className="text-pretty">{item}</span>
            </li>
          ))}
          <li className="flex gap-3">
            <span className="text-destructive">✗</span>
            <span className="text-pretty">{t.dontItem}</span>
          </li>
        </ul>
      </div>

      <Callout title={t.submitTitle}>
        <p className="text-sm mb-4 text-pretty">{t.submitText}</p>
        <LocalizedLink href="/support" targetLang={locale} className={primaryLinkClassName}>
          {t.submitButton}
        </LocalizedLink>
      </Callout>

      <div className="rounded-lg bg-muted p-4 sm:p-6">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          <strong className="text-foreground">{t.noteLabel}</strong> {t.noteText}
        </p>
      </div>
    </div>
  )
}
