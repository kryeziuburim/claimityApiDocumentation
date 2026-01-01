export function ChangeLogSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Änderungsprotokoll</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Alle Änderungen und Updates der aktuellen API‑Version im Überblick.
        </p>
      </div>

      <div className="space-y-4">
        {[
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
            className="flex gap-6 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="shrink-0">
              <div className="rounded-md bg-muted px-3 py-1.5 font-mono text-sm font-medium">{item.date}</div>
            </div>
            <div className="flex-1">
              <p className="leading-relaxed text-pretty">{item.changes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

