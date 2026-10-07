import type { Locale } from "@/lib/i18n"

import { overviewMessages } from "./OverviewSection.messages"

export function OverviewSection({ locale }: { locale: Locale }) {
  const t = overviewMessages[locale]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">{t.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">{t.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">{t.firstStepsTitle}</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">{t.firstStepsText}</p>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-4 sm:p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">{t.extensionTitle}</h3>
        <ul className="space-y-2 text-white">
          {t.extensionItems.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-white">•</span>
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
