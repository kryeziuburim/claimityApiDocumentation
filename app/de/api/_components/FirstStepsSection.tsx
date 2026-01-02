import { cn } from "@/lib/utils"

export function FirstStepsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Erste Schritte</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">So starten Sie mit der API:</p>
      </div>

      <div className="space-y-4">
        {[
          {
            step: "1",
            title: "Schlüsselpaar erstellen",
            description:
              "Als Organisationsadmin können Sie in den Organisationseinstellungen Ihres Claimity Kontos ein Schlüsselpaar erstellen. Laden Sie darauffolgend den Private Key herunter und bewahren Sie diesen sicher auf.",
          },
          {
            step: "2",
            title: "Authentifizieren",
            description:
              "Mit Hilfe des erstellten Schlüsselpaars und Ihrer Client‑ID können Sie sich gegenüber der Claimity API authentifizieren und so einen Access Token für Ihre Requests erhalten.",
          },
          {
            step: "3",
            title: "DPoP-Header vorbereiten",
            description:
              "Zum Senden einer Anfrage an die API ist es notwendig, einen DPoP-Header zu erstellen. Dieser Header wird mit dem Private Key signiert und sichert die Anfrage gegen potentiellen Sichereheitsrisiken.",
          },
          {
            step: "4",
            title: "Erste Anfrage",
            description: "Senden Sie mit Ihrem Access Token und dem DPoP-Header eine authentifizierte Anfrage an einen Endpoint.",
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
        <h3 className="mb-3 font-mono text-sm font-semibold">Beispiel‑Request</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-xs sm:text-sm">
          <code className="font-mono text-foreground">{`curl -X GET \\
  https://app.claimity.ch/v1/experts/cases \\
  -H 'Accept: application/json' \\
  -H 'Authorization: DPoP {access-token}' \\
  -H 'DPoP: {dpop-header}`}</code>
        </pre>
        <h3 className="mt-8 mb-3 font-mono text-sm font-semibold">Python Notebooks</h3>
        <p className="mb-4 text-sm leading-relaxed text-pretty">
          Für den schnellen Einstieg stellen wir Ihnen Python‑Notebooks zur Verfügung, mit denen Sie API‑Abfragen ausführen und
          die Responses direkt einsehen können.
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
          Notebooks auf GitHub ansehen
        </a>
      </div>
    </div>
  )
}

