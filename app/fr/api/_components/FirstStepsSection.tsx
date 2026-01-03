import { cn } from "@/lib/utils"

export function FirstStepsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Premiers pas</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">Comment démarrer avec l'API :</p>
      </div>

      <div className="space-y-4">
        {[
          {
            step: "1",
            title: "Créer une paire de clés",
            description:
              "En tant qu'administrateur de l'organisation, vous pouvez créer une paire de clés dans les paramètres de l'organisation de votre compte Claimity. Ensuite, téléchargez la clé privée et conservez-la en lieu sûr.",
          },
          {
            step: "2",
            title: "S'authentifier",
            description:
              "À l'aide de la paire de clés créée et de votre identifiant client, vous pouvez vous authentifier auprès de l'API Claimity et ainsi obtenir un jeton d'accès pour vos requêtes.",
          },
          {
            step: "3",
            title: "Préparer l'en-tête DPoP",
            description:
              "Pour envoyer une requête à l'API, il est nécessaire de créer un en-tête DPoP. Cet en-tête est signé avec la clé privée et sécurise la requête contre les risques de sécurité potentiels.",
          },
          {
            step: "4",
            title: "Première requête",
            description: "Envoyez une requête authentifiée à un point de terminaison avec votre jeton d'accès et l'en-tête DPoP.",
          },
        ].map((item) => (
          <div key={item.step} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:gap-4 sm:p-5">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg"
              style={{ backgroundColor: "#2a8289" }}
            >
              {item.step}
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-balance sm:text-lg">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-muted p-4 sm:p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Exemple de requête</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-xs sm:text-sm">
          <code className="font-mono text-foreground">{`curl -X GET \\
  https://app.claimity.ch/v1/experts/cases \\
  -H 'Accept: application/json' \\
  -H 'Authorization: DPoP {access-token}' \\
  -H 'DPoP: {dpop-header}`}</code>
        </pre>
        <h3 className="mt-8 mb-3 font-mono text-sm font-semibold">Notebooks Python</h3>
        <p className="mb-4 text-sm leading-relaxed text-pretty">
          Pour un démarrage rapide, nous mettons à votre disposition des notebooks Python avec lesquels vous pouvez exécuter des requêtes API et consulter directement les réponses.
        </p>
        <a
          href="https://github.com/Claimity-AG/v1-api"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            "h-9 px-4 py-2",
            "bg-teal-600 text-white hover:bg-teal-700"
          )}
        >
          Voir les notebooks sur GitHub
        </a>
      </div>
    </div>
  )
}
