import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import type { ExampleBlock } from "./useEndpointData"

export function ExamplesTab({
  exampleBlocks,
  activeExample,
  setActiveExample,
  accentColor,
}: {
  exampleBlocks: ExampleBlock[]
  activeExample: string | null
  setActiveExample: (key: string) => void
  accentColor: string
}) {
  return (
    <div className="space-y-4">
      {exampleBlocks.map(({ key, title, content }) => {
        const isOpen = activeExample === key
        return (
          <div key={key} className="overflow-hidden rounded-xl border border-border/60 bg-muted/15 sm:rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveExample(key)}
              className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-foreground sm:px-4 sm:text-xs"
              aria-expanded={isOpen}
              style={{ backgroundColor: accentColor }}
            >
              <span>{title}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
            </button>
            {isOpen ? (
              <pre className="border-t border-border/40 bg-background/90 p-3 text-[11px] leading-relaxed text-muted-foreground sm:p-4 sm:text-xs">
                <code className="font-mono text-foreground">{content}</code>
              </pre>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
