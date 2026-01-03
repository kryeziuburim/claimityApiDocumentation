import { cn } from "@/lib/utils"
import LocalizedLink from "@/components/localized-link"

export function ReportingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Report Issue</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          If you have encountered an error, we will help. Ensure beforehand that the problem is reproducible.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <h3 className="mb-4 text-lg font-semibold sm:text-xl">Before Reporting</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Check reproducibility</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Perform API tests with Postman/Insomnia</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Collect details on request and response</span>
          </li>
          <li className="flex gap-3">
            <span className="text-destructive">✗</span>
            <span className="text-pretty">Do not send access data in the report</span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-4 sm:p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-base font-semibold text-white sm:text-lg">Submit Report</h3>
        <p className="mb-4 text-sm leading-relaxed text-white text-pretty">
          Please describe steps to reproduce. Our support will check the case promptly and get back to you as soon as possible.
        </p>
        <LocalizedLink
          href="/support"
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            "h-9 px-4 py-2",
            "bg-white text-black hover:bg-white/90"
          )}
        >
          Report Issue
        </LocalizedLink>
      </div>

      <div className="rounded-lg bg-muted p-4 sm:p-6">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          <strong className="text-foreground">Note:</strong> The API is provided based on this documentation. There is no guided implementation or code support.
        </p>
      </div>
    </div>
  )
}
