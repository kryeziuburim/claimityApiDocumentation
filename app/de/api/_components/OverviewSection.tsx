export function OverviewSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Übersicht</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Die API nutzt HTTPS-Methoden und RESTful Endpoints, um Ressourcen im System zu erstellen, zu bearbeiten und zu
          verwalten. Als Austauschformat dient JSON.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">Erste Schritte</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          Diese API bietet umfassenden Zugriff auf zentrale Funktionen. Ob Integrationen, Automatisierung oder eigene
          Anwendungen – die API liefert Flexibilität für die Anbindung von Claimity an Ihre Systeme.
        </p>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-4 sm:p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">Erweiterung der Schnittstellen</h3>
        <ul className="space-y-2 text-white">
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Prüfen Sie regelmässig das Änderungsprotokoll um auf dem Laufenden zu bleiben.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">
              Nicht abwärtsinkompatible Änderungen können eingeführt werden, ohne die API-Version zu ändern.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Über wesentliche Änderungen werden Sie rechtzeitig informiert.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

