import { cn } from "@/lib/utils"
import LocalizedLink from "@/components/localized-link"

export function ReportingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Problem melden</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Wenn Sie auf einen Fehler gestossen sind, helfen wir weiter. Stellen Sie vorab sicher, dass das Problem
          reproduzierbar ist.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Vor dem Melden</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Reproduzierbarkeit prüfen</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">API‑Tests mit Postman/Insomnia durchführen</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Details zu Request und Response sammeln</span>
          </li>
          <li className="flex gap-3">
            <span className="text-destructive">✗</span>
            <span className="text-pretty">Keine Zugangsdaten im Report mitschicken</span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-4 sm:p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-base font-semibold text-white sm:text-lg">Report einreichen</h3>
        <p className="mb-4 text-sm leading-relaxed text-white text-pretty">
          Bitte beschreiben Sie Schritte zur Reproduktion. Unser Support prüft den Fall zeitnah und meldet sich schnellstmöglich
          bei Ihnen.
        </p>
        <LocalizedLink
          href="/support"
          className={cn(
            // Button-Basestyles aus components/simple-button.tsx für Link-Nutzung
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            "h-9 px-4 py-2",
            "bg-white text-black hover:bg-white/90"
          )}
        >
          Problem melden
        </LocalizedLink>
      </div>

      <div className="rounded-lg bg-muted p-4 sm:p-6">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          <strong className="text-foreground">Hinweis:</strong> Die API wird auf Basis dieser Dokumentation bereitgestellt. Es gibt
          keine geführte Implementierung oder Code‑Support.
        </p>
      </div>
    </div>
  )
}

