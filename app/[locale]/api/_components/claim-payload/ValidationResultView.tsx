import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import type { ClaimPayloadMessages } from "./ClaimPayloadSection.messages"
import type { ValidationState } from "./validation"

const renderErrorDetails = (errors?: Record<string, string[]> | null) => {
  if (!errors) return null
  const entries = Object.entries(errors)
    .map<[string, string[]] | null>(([field, raw]) => {
      const normalized = Array.isArray(raw) ? raw : raw === undefined || raw === null ? [] : [raw]
      const cleaned = normalized.map((msg) => String(msg).trim()).filter((msg) => msg.length)
      return cleaned.length ? [field, cleaned] : null
    })
    .filter((entry): entry is [string, string[]] => entry !== null)
  if (!entries.length) return null
  return (
    <div className="space-y-3">
      {entries.map(([field, messages]) => (
        <div key={field} className="rounded-xl border border-border/40 bg-background/80 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{field}</p>
          <ul className="mt-2 space-y-1 text-sm text-foreground">
            {messages.map((message, index) => (
              <li key={`${field}-${index}`} className="flex gap-2 text-pretty">
                <span className="text-primary">•</span>
                <span>{message}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** Response panel of the payload tester for each validation state. */
export function ValidationResultView({
  state: validationState,
  t,
}: {
  state: ValidationState
  t: ClaimPayloadMessages
}) {
  if (validationState.status === "running") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-sm font-medium">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span>{t.validationRunning}</span>
      </div>
    )
  }
  if (validationState.status === "error") {
    return (
      <div className="space-y-4">
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>{t.validationFailed}</AlertTitle>
          <AlertDescription className="space-y-2 text-sm">
            <p>{validationState.message}</p>
            {typeof validationState.statusCode === "number" ? (
              <p className="text-xs uppercase tracking-wide text-muted-foreground">HTTP {validationState.statusCode}</p>
            ) : null}
          </AlertDescription>
        </Alert>
        {renderErrorDetails(validationState.errors)}
      </div>
    )
  }
  if (validationState.status === "success") {
    const { data, statusCode } = validationState
    const errorDetails = renderErrorDetails(data.errors)
    return (
      <div className="space-y-4">
        <Alert
          variant={data.valid ? "default" : "destructive"}
          className={data.valid ? "border-green-500/70 bg-green-500/10" : "border-destructive/50 bg-destructive/10"}
        >
          {data.valid ? <ShieldCheck className="h-4 w-4 text-primary" /> : <ShieldAlert className="h-4 w-4" />}
          <AlertTitle>{data.valid ? t.payloadValid : t.payloadInvalid}</AlertTitle>
          <AlertDescription className="space-y-2 text-sm">
            <p>{data.valid ? t.validatorNoDeviations : t.validatorRuleViolated}</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">HTTP {statusCode}</p>
          </AlertDescription>
        </Alert>
        {errorDetails ??
          (!data.valid ? (
            <p className="rounded-xl border border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
              {t.invalidWithoutErrors}
            </p>
          ) : null)}
      </div>
    )
  }
  return (
    <div className="space-y-3 text-sm text-muted-foreground">
      <p>{t.responseAppearsHere}</p>
      <ol className="list-decimal space-y-1 pl-4 text-xs">
        {t.responseSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  )
}
