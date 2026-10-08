import type { OpenAPIV3 } from "openapi-types"
import type { SchemaNode } from "../openapi-utils"
import type { EndpointDetailsMessages } from "./EndpointDetails.messages"

const schemaOf = (param: OpenAPIV3.ParameterObject): SchemaNode | undefined => param.schema

export function ParamTable({ params, t }: { params: OpenAPIV3.ParameterObject[]; t: EndpointDetailsMessages }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 bg-background/80">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="text-[11px] uppercase tracking-wide text-muted-foreground sm:text-xs">
          <tr className="[&>th]:px-2.5 [&>th]:py-2 sm:[&>th]:px-3">
            <th>{t.name}</th>
            <th>{t.type}</th>
            <th>{t.required}</th>
            <th>{t.default}</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={`${p.in}-${p.name}`} className="border-t border-border/40">
              <td className="px-2.5 py-2 font-mono text-[11px] sm:px-3 sm:text-xs">{p.name}</td>
              <td className="px-2.5 py-2 font-mono text-[11px] sm:px-3 sm:text-xs">
                {schemaOf(p)?.type}
                {schemaOf(p)?.format ? ` (${schemaOf(p)?.format})` : ""}
              </td>
              <td className="px-2.5 py-2 text-center sm:px-3">{p.required ? "✓" : ""}</td>
              <td className="px-2.5 py-2 font-mono text-[11px] text-muted-foreground sm:px-3 sm:text-xs">
                {schemaOf(p)?.default != null ? String(schemaOf(p)?.default) : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
