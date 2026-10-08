import { ChevronDown } from "lucide-react"

import { CopyButton } from "@/components/api/copy-button"
import { cn } from "@/lib/utils"
import type { ExampleBlock } from "./useEndpointData"

export function ExamplesTab({
  exampleBlocks,
  activeExample,
  setActiveExample,
}: {
  exampleBlocks: ExampleBlock[]
  activeExample: string | null
  setActiveExample: (key: string) => void
}) {
  return (
    <div className="space-y-3">
      {exampleBlocks.map(({ key, title, content }) => {
        const isOpen = activeExample === key
        return (
          <div key={key} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
            <div className="flex items-center gap-2 pr-2">
              <button
                type="button"
                onClick={() => setActiveExample(key)}
                className="flex min-w-0 flex-1 items-center gap-2 py-2 pl-4 text-left text-xs font-medium text-slate-300 hover:text-white"
                aria-expanded={isOpen}
              >
                <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", !isOpen && "-rotate-90")} />
                <span>{title}</span>
              </button>
              {isOpen ? <CopyButton text={content} /> : null}
            </div>
            {isOpen ? (
              <pre className="overflow-x-auto border-t border-white/10 p-4 text-xs leading-relaxed">
                <code className="font-mono text-slate-100">{content}</code>
              </pre>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
