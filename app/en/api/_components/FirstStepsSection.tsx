import { cn } from "@/lib/utils"

export function FirstStepsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">First Steps</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">How to start with the API:</p>
      </div>

      <div className="space-y-4">
        {[
          {
            step: "1",
            title: "Create Key Pair",
            description:
              "As an organization admin, you can create a key pair in the organization settings of your Claimity account. Subsequently, download the Private Key and keep it safe.",
          },
          {
            step: "2",
            title: "Authenticate",
            description:
              "Using the created key pair and your Client ID, you can authenticate yourself against the Claimity API and thus obtain an Access Token for your requests.",
          },
          {
            step: "3",
            title: "Prepare DPoP Header",
            description:
              "To send a request to the API, it is necessary to create a DPoP header. This header is signed with the Private Key and secures the request against potential security risks.",
          },
          {
            step: "4",
            title: "First Request",
            description: "Send an authenticated request to an endpoint with your Access Token and the DPoP header.",
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
        <h3 className="mb-3 font-mono text-sm font-semibold">Example Request</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-xs sm:text-sm">
          <code className="font-mono text-foreground">{`curl -X GET \\
  https://app.claimity.ch/v1/experts/cases \\
  -H 'Accept: application/json' \\
  -H 'Authorization: DPoP {access-token}' \\
  -H 'DPoP: {dpop-header}`}</code>
        </pre>
        <h3 className="mt-8 mb-3 font-mono text-sm font-semibold">Python Notebooks</h3>
        <p className="mb-4 text-sm leading-relaxed text-pretty">
          For a quick start, we provide Python notebooks with which you can execute API queries and view the responses directly.
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
          View Notebooks on GitHub
        </a>
      </div>
    </div>
  )
}
