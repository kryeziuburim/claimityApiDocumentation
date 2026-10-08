import type { Dispatch, SetStateAction } from "react"
import { ChevronDown } from "lucide-react"
import type { OpenAPIV3 } from "openapi-types"

import { cn } from "@/lib/utils"
import { generateExample, pickJsonSchemaFromContent, prettyJson, type OpenApiDocument } from "../openapi-utils"
import { SchemaExplorer } from "../SchemaExplorer"
import { PAYLOAD_FIELD_LINKS, SCHEMA_EXPLORER_MAX_DEPTH } from "./constants"
import type { EndpointDetailsMessages } from "./EndpointDetails.messages"
import { CodeBlock } from "./primitives"

export function ResponseTab({
  t,
  spec,
  responses,
  activeResponse,
  setActiveResponse,
  accentColor,
}: {
  t: EndpointDetailsMessages
  spec: OpenApiDocument | null
  responses: [string, OpenAPIV3.ResponseObject][]
  activeResponse: string | null
  setActiveResponse: Dispatch<SetStateAction<string | null>>
  accentColor: string
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
          <div key={code} className="overflow-hidden rounded-xl border border-border/60 bg-muted/15 sm:rounded-xl">
            <button
              type="button"
              onClick={() => setActiveResponse((prev) => (prev === code ? null : code))}
              className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left sm:px-4 sm:py-3"
              aria-expanded={isOpen}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Response {code}</p>
                {resp?.description ? <p className="text-sm text-muted-foreground">{resp.description}</p> : null}
              </div>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
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
                    <CodeBlock title={t.exampleResponse} accentColor={accentColor}>
                      {example ? prettyJson(example) : null}
                    </CodeBlock>
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
