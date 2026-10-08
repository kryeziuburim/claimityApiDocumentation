import { serializeJsonLd } from "@/lib/structured-data"

/** Structured data for search engines; rendered into the static HTML of server components. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
}
