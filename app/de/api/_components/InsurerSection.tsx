import { EndpointCard } from "@/components/api/EndpointCard"

export function InsurerSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Versicherer</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Endpoints für Versicherer zum Erstellen/Validieren/Abrufen von Schäden, Dokumenten und Report-Übersichten.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        <h4 className="mb-2 text-sm font-semibold text-foreground">Zeitstempel & inkrementelle Synchronisierung</h4>
        <p className="mb-3 text-pretty">Vier Zeitstempel steuern Listen-Filter und Synchronisierung. Die Sync-Filter sind nach dem Feld benannt, das sie filtern, und vergleichen inklusiv (&gt;=).</p>
        <ul className="space-y-1.5">
          <li>
            <span className="font-mono">CreatedAt</span> — Erstellzeitpunkt des Claims. Filter: createdFrom / createdTo.
          </li>
          <li>
            completedFrom / completedTo filtern auf den Zeitpunkt des jüngsten Fallabschlusses (Finalized-Ereignis; bei wiedereröffneten Fällen zählt der neueste Abschluss). Gedacht für Auswertungszeiträume («alle im Q2 abgeschlossenen Fälle») — nicht für Synchronisierung.
          </li>
          <li>
            <span className="font-mono">LastChangedAt</span> — Letzte partnerrelevante Änderung (Status, Dokumente, Reports, Kommentare). Filter: lastChangedSince.
          </li>
          <li>
            <span className="font-mono">LastReportApprovedAt</span> — Zeitpunkt der letzten Report-Genehmigung (null, falls noch keine). Filter: lastReportApprovedSince — Claims ohne genehmigten Report matchen nie.
          </li>
        </ul>
        <h4 className="mb-1.5 mt-4 text-sm font-semibold text-foreground">Sync-Rezept (täglicher Poller)</h4>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Mit lastChangedSince=&lt;gespeicherter Cursor&gt; abfragen (erster Lauf: ohne Filter).</li>
          <li>Ergebnisse idempotent verarbeiten — der Vergleich ist inklusiv, der Grenzwert kann erneut erscheinen.</li>
          <li>Als neuen Cursor das Maximum der gesehenen LastChangedAt speichern.</li>
          <li>Nur an neuen genehmigten Reports interessiert? Gleicher Ablauf mit lastReportApprovedSince und LastReportApprovedAt.</li>
        </ol>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Schäden</h3>

        <div className="space-y-4">
          <div id="insurer-claims-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims"
              label="List"
              description="Paginierte Liste der Claims."
            />
          </div>

          <div id="insurer-claims-create" className="scroll-mt-24">
            <EndpointCard method="POST" path="/v1/insurers/claims" label="Create" description="Claim erstellen." />
          </div>

          <div id="insurer-claims-validate" className="scroll-mt-24">
            <EndpointCard
              method="POST"
              path="/v1/insurers/claims:validate"
              label="Validate"
              description="Claim-Request validieren (ohne Anlage)."
            />
          </div>

          <div id="insurer-claims-get" className="scroll-mt-24">
            <EndpointCard method="GET" path="/v1/insurers/claims/{claimId}" label="Get" description="Claim-Details abrufen." />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Schadendokumente</h3>

        <div className="space-y-4">
          <div id="insurer-claim-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents"
              label="List"
              description="Paginierte Liste der Claim-Dokumente."
            />
          </div>

          <div id="insurer-claim-docs-add" className="scroll-mt-24">
            <EndpointCard method="POST" path="/v1/insurers/claims/{claimId}/documents" label="Create" description="Dokument hochladen." />
          </div>

          <div id="insurer-claim-docs-get" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/documents/{documentId}"
              label="Get"
              description="Dokumentinhalt abrufen (inkl. ContentBase64)."
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Reports zu Claims</h3>

        <div className="space-y-4">
          <div id="insurer-claim-reports-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports"
              label="List"
              description="Reports (Submissions) zu einem Claim auflisten."
            />
          </div>

          <div id="insurer-claim-report-docs-list" className="scroll-mt-24">
            <EndpointCard
              method="GET"
              path="/v1/insurers/claims/{claimId}/reports/{submissionId}/documents"
              label="List"
              description="Dokumentinhalte einer Report-Submission abrufen."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

