import type { Locale } from "@/lib/i18n"

import { changeLogMessages } from "./ChangeLogSection.messages"

export function ChangeLogSection({ locale }: { locale: Locale }) {
  const t = changeLogMessages[locale]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">{t.intro}</p>
      </div>

      <div className="space-y-4">
        {t.entries.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 sm:flex-row sm:gap-6 sm:p-5"
          >
            <div className="sm:shrink-0">
              <div className="rounded-md bg-muted px-3 py-1.5 text-center font-mono text-xs font-medium text-foreground sm:text-sm">
                {item.date}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-pretty sm:text-base">{item.changes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
