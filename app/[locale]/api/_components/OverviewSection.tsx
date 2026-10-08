import { Callout } from "@/components/api/doc-primitives"
import type { Locale } from "@/lib/i18n"

import { overviewMessages } from "./OverviewSection.messages"

export function OverviewSection({ locale }: { locale: Locale }) {
  const t = overviewMessages[locale]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl mb-4 font-bold tracking-tight text-balance">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <h3 className="text-base sm:text-lg mb-3 font-semibold">{t.firstStepsTitle}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.firstStepsText}</p>
      </div>

      <Callout title={t.extensionTitle}>
        <ul className="space-y-2">
          {t.extensionItems.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-primary">•</span>
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      </Callout>
    </div>
  )
}
