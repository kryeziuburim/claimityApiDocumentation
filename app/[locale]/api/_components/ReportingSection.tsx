import LocalizedLink from "@/components/localized-link"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

import { reportingMessages } from "./ReportingSection.messages"

export function ReportingSection({ locale }: { locale: Locale }) {
  const t = reportingMessages[locale]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">{t.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">{t.beforeTitle}</h3>
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

      <div className="rounded-lg border border-[#2a8289] p-4 sm:p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-base font-semibold text-white sm:text-lg">{t.submitTitle}</h3>
        <p className="mb-4 text-sm leading-relaxed text-white text-pretty">{t.submitText}</p>
        <LocalizedLink
          href="/support"
          targetLang={locale}
          className={cn(
            // Button-Basestyles aus components/simple-button.tsx für Link-Nutzung
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            "h-9 px-4 py-2",
            "bg-white text-black hover:bg-white/90",
          )}
        >
          {t.submitButton}
        </LocalizedLink>
      </div>

      <div className="rounded-lg bg-muted p-4 sm:p-6">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          <strong className="text-foreground">{t.noteLabel}</strong> {t.noteText}
        </p>
      </div>
    </div>
  )
}
