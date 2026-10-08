import type { OpenAPIV3 } from "openapi-types"

import type { EndpointDetailsMessages } from "./EndpointDetails.messages"
import { ErrorMatrix } from "./ErrorMatrix"
import { DetailBlock } from "./primitives"

export function ErrorsTab({
  t,
  responses,
}: {
  t: EndpointDetailsMessages
  responses: [string, OpenAPIV3.ResponseObject][]
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{t.errorSection}</p>
      <DetailBlock title={t.errorMatrix}>
        <ErrorMatrix responses={responses} t={t} />
      </DetailBlock>
    </div>
  )
}
