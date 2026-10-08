import type { OpenAPIV3 } from "openapi-types"

import { prettyJson, type OpenApiDocument, type SchemaNode } from "../openapi-utils"
import { SchemaExplorer } from "../SchemaExplorer"
import { PAYLOAD_FIELD_LINKS, SCHEMA_EXPLORER_MAX_DEPTH } from "./constants"
import type { EndpointDetailsMessages } from "./EndpointDetails.messages"
import { ParamTable } from "./ParamTable"
import { CodeBlock, DetailBlock, HeaderList, type HeaderRow } from "./primitives"

export function RequestTab({
  t,
  spec,
  headerRows,
  grouped,
  requestSchema,
  reqExample,
}: {
  t: EndpointDetailsMessages
  spec: OpenApiDocument | null
  headerRows: HeaderRow[]
  grouped: Record<string, OpenAPIV3.ParameterObject[]>
  requestSchema: SchemaNode | null
  reqExample: unknown
}) {
  return (
    <div className="space-y-4">
      <DetailBlock title={t.headers}>
        <HeaderList rows={headerRows} />
      </DetailBlock>

      {grouped.path.length > 0 && (
        <DetailBlock title={t.pathParams}>
          <ParamTable params={grouped.path} t={t} />
        </DetailBlock>
      )}

      {grouped.query.length > 0 && (
        <DetailBlock title={t.queryParams}>
          <ParamTable params={grouped.query} t={t} />
        </DetailBlock>
      )}

      {requestSchema && spec && (
        <DetailBlock title={t.requestBody}>
          <SchemaExplorer
            spec={spec}
            schema={requestSchema}
            title="Request Schema"
            maxDepth={SCHEMA_EXPLORER_MAX_DEPTH}
            fieldLinks={PAYLOAD_FIELD_LINKS}
          />
          <CodeBlock title={t.exampleBody}>{reqExample ? prettyJson(reqExample) : null}</CodeBlock>
        </DetailBlock>
      )}
    </div>
  )
}
