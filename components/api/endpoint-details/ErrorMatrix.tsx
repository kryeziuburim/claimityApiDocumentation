import type { OpenAPIV3 } from "openapi-types"
import type { SchemaNode } from "../openapi-utils"
import type { EndpointDetailsMessages } from "./EndpointDetails.messages"

export function ErrorMatrix({ responses, t }: { responses: [string, OpenAPIV3.ResponseObject][]; t: EndpointDetailsMessages }) {
  const errors = responses.filter(([code]) => code === "default" || Number(code) >= 400)
  if (!errors.length) return <div className="text-sm text-muted-foreground">{t.noErrors}</div>

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 bg-background/80">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="text-[11px] uppercase tracking-wide text-muted-foreground sm:text-xs">
          <tr className="[&>th]:px-2.5 [&>th]:py-2 sm:[&>th]:px-3">
            <th>{t.status}</th>
            <th>{t.description}</th>
            <th>{t.schema}</th>
          </tr>
        </thead>
        <tbody>
          {errors.map(([code, resp]) => {
            const schema: SchemaNode | null = resp?.content ? (resp.content["application/json"]?.schema ?? null) : null
            const schemaLabel = schema?.$ref ? schema.$ref.split("/").pop() : schema?.type ?? ""
            return (
              <tr key={code} className="border-t border-border/40">
                <td className="px-2.5 py-2 font-mono text-[11px] sm:px-3 sm:text-xs">{code}</td>
                <td className="px-2.5 py-2 text-xs text-muted-foreground sm:px-3 sm:text-sm">{resp?.description ?? ""}</td>
                <td className="px-2.5 py-2 font-mono text-[11px] text-muted-foreground sm:px-3 sm:text-xs">{schemaLabel}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
