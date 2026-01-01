import type React from "react"

import { cn } from "@/lib/utils"

export function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24",
        // Reduzierter vertikaler Abstand zwischen den Abschnitten
        id === "overview" ? "pt-8 pb-12 md:pt-10 md:pb-16" : "py-12 md:py-16"
      )}
    >
      {children}
    </section>
  )
}

