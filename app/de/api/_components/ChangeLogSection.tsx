export function ChangeLogSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Änderungsprotokoll</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Alle Änderungen und Updates der aktuellen API‑Version im Überblick.
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            date: "2026-07-15",
            changes:
              "Experten-API: neuer Endpunkt zum Wiedereröffnen eines abgeschlossenen Falls (POST /v1/experts/cases/{caseId}:reopen, liefert 204). List-Endpoints um Filter (Freitextsuche q, Datumsbereiche für Erstellung/Abschluss) und einen updatedSince-Cursor für inkrementelle Synchronisierung erweitert. Fälle liefern nun LastChangedAt; Claims zusätzlich LastReportApprovedAt. Create- und Upload-Endpoints liefern nun 201 Created. Jede Antwort liefert nun einen X-Correlation-Id-Header (ein gültiger eingehender Wert wird zurückgegeben) für Ende-zu-Ende-Tracing; bei Fehlern ist er zugleich die ProblemDetails-instance.",
          },
          {
            date: "2026-06-09",
            changes: "Neue Kategorie „Spezialexpertisen“ inklusive Schema und Payload-Struktur ergänzt.",
          },
          {
            date: "2025-12-30",
            changes: "Ergänzung eines neuen Endpunkts zur Versicherer-API zum Validieren der Fallstruktur.",
          },
          {
            date: "2025-12-28",
            changes: "Erste API‑Version veröffentlicht.",
          },
        ].map((item, index) => (
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

