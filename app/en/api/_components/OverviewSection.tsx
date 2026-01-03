export function OverviewSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Overview</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          The API uses HTTPS methods and RESTful endpoints to create, edit, and manage resources in the system. JSON is used as the exchange format.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold sm:text-xl">First Steps</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          This API offers comprehensive access to core functions. Whether integrations, automation, or custom applications – the API provides flexibility for connecting Claimity to your systems.
        </p>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-4 sm:p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">Interface Extension</h3>
        <ul className="space-y-2 text-white">
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Check the changelog regularly to stay up to date.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">
              Non-backward-incompatible changes can be introduced without changing the API version.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">You will be informed in good time about significant changes.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
