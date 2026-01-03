import { cn } from "@/lib/utils"
import LocalizedLink from "@/components/localized-link"

export function ReportingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Signaler un problème</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Si vous avez rencontré une erreur, nous vous aiderons. Assurez-vous au préalable que le problème est reproductible.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Avant de signaler</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Vérifier la reproductibilité</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Effectuer des tests API avec Postman/Insomnia</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Recueillir des détails sur la requête et la réponse</span>
          </li>
          <li className="flex gap-3">
            <span className="text-destructive">✗</span>
            <span className="text-pretty">Ne pas envoyer de données d'accès dans le rapport</span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-4 sm:p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-base font-semibold text-white sm:text-lg">Soumettre un rapport</h3>
        <p className="mb-4 text-sm leading-relaxed text-white text-pretty">
          Veuillez décrire les étapes pour reproduire. Notre support examinera le cas rapidement et vous répondra dès que possible.
        </p>
        <LocalizedLink
          href="/support"
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            "h-9 px-4 py-2",
            "bg-white text-black hover:bg-white/90"
          )}
        >
          Signaler un problème
        </LocalizedLink>
      </div>

      <div className="rounded-lg bg-muted p-4 sm:p-6">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          <strong className="text-foreground">Remarque :</strong> L'API est fournie sur la base de cette documentation. Il n'y a pas d'implémentation guidée ou de support de code.
        </p>
      </div>
    </div>
  )
}
