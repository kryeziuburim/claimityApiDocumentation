export function OverviewSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Vue d'ensemble</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          L'API utilise des méthodes HTTPS et des points de terminaison RESTful pour créer, modifier et gérer des ressources dans le système. JSON est utilisé comme format d'échange.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">Premiers pas</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          Cette API offre un accès complet aux fonctions principales. Qu'il s'agisse d'intégrations, d'automatisation ou d'applications personnalisées, l'API offre la flexibilité nécessaire pour connecter Claimity à vos systèmes.
        </p>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-4 sm:p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">Extension des interfaces</h3>
        <ul className="space-y-2 text-white">
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Consultez régulièrement le journal des modifications pour rester à jour.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">
              Des modifications non rétrocompatibles peuvent être introduites sans changer la version de l'API.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Vous serez informé à temps des changements importants.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
