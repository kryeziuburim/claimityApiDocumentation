import type { Dispatch, SetStateAction } from "react"
import { ChevronDown } from "lucide-react"
import type { OpenAPIV3 } from "openapi-types"

import { cn } from "@/lib/utils"
import { generateExample, pickJsonSchemaFromContent, prettyJson, type OpenApiDocument } from "../openapi-utils"
import { SchemaExplorer } from "../SchemaExplorer"
import { PAYLOAD_FIELD_LINKS, SCHEMA_EXPLORER_MAX_DEPTH } from "./constants"
import type { EndpointDetailsMessages } from "./EndpointDetails.messages"
import { CodeBlock } from "./primitives"

/** Status code with a colored dot: green for 2xx, amber for 4xx, red for 5xx. */
function StatusCode({ code }: { code: string }) {
  const dot = code.startsWith("2")
    ? "bg-emerald-500"
    : code.startsWith("4")
      ? "bg-amber-500"
      : code.startsWith("5")
        ? "bg-red-500"
        : "bg-slate-400"
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs font-semibold text-foreground">
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} aria-hidden="true" />
      {code}
    </span>
  )
}

export function ResponseTab({
  t,
  spec,
  responses,
  activeResponse,
  setActiveResponse,
}: {
  t: EndpointDetailsMessages
  spec: OpenApiDocument | null
  responses: [string, OpenAPIV3.ResponseObject][]
  activeResponse: string | null
  setActiveResponse: Dispatch<SetStateAction<string | null>>
}) {
  return (
    <div className="space-y-4">
      {responses.map(([code, resp]) => {
        const schema = pickJsonSchemaFromContent(resp?.content)
        const example = spec && schema ? generateExample(spec, schema) : null
        const isOpen = activeResponse === code
        // Success responses are always rendered (hidden while collapsed) so their fields are crawlable;
        // error responses share one problem schema and are rendered on demand.
        const keepMounted = code.startsWith("2")

        return (
          <div key={code} className="overflow-hidden rounded-xl border border-border/70 bg-card">
            <button
              type="button"
              onClick={() => setActiveResponse((prev) => (prev === code ? null : code))}
              className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/40 sm:px-4 sm:py-3"
              aria-expanded={isOpen}
            >
              <div className="flex min-w-0 items-center gap-3">
                <StatusCode code={code} />
                {resp?.description ? <p className="text-sm text-muted-foreground">{resp.description}</p> : null}
              </div>
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")}
              />
            </button>

            {isOpen || keepMounted ? (
              <div hidden={!isOpen} className="border-t border-border/40 bg-card/80 p-3 sm:p-4">
                {schema && spec ? (
                  <div className="space-y-3">
                    <SchemaExplorer
                      spec={spec}
                      schema={schema}
                      title={t.responseSchema}
                      maxDepth={SCHEMA_EXPLORER_MAX_DEPTH}
                      fieldLinks={PAYLOAD_FIELD_LINKS}
                    />
                    <CodeBlock title={t.exampleResponse}>{example ? prettyJson(example) : null}</CodeBlock>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">{t.noJsonSchema}</div>
                )}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
