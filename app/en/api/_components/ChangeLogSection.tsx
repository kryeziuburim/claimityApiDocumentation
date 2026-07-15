export function ChangeLogSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Changelog</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          All changes and updates of the current API version at a glance.
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            date: "2026-07-15",
            changes:
              "Expert API: new endpoint to reopen a completed case (POST /v1/experts/cases/{caseId}:reopen, returns 204). List endpoints gained filters (free-text search q, created/completed date ranges) and an updatedSince cursor for incremental sync. Cases now expose LastChangedAt; claims additionally expose LastReportApprovedAt. Create and upload endpoints now return 201 Created. Every response now returns an X-Correlation-Id header (echoing a valid inbound one) for end-to-end tracing; on errors it is also the ProblemDetails instance.",
          },
          {
            date: "2026-06-09",
            changes: "Added new \"Special Appraisals\" category including schema and payload structure.",
          },
          {
            date: "2025-12-30",
            changes: "Addition of a new endpoint to the insurer API for validating the case structure.",
          },
          {
            date: "2025-12-28",
            changes: "First API version published.",
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
