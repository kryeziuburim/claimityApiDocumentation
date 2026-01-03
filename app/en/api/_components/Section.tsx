import type React from "react"

import { cn } from "@/lib/utils"

export function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
      <section
        id={id}
        className={cn(
          "scroll-mt-24",
          id === "overview"
            ? "pt-6 pb-10 sm:pt-8 sm:pb-12 md:pt-10 md:pb-16"
            : "py-10 sm:py-12 md:py-16"
        )}
      >
      {children}
    </section>
  )
}
