"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type ModernLoaderProps = {
  message?: string
  className?: string
  variant?: "light" | "dark"
}

export default function ModernLoader({ message = "Laden …", className, variant = "light" }: ModernLoaderProps) {
  const isDark = variant === "dark"

  return (
    <div
      className={cn(
        "min-h-screen grid place-items-center",
        isDark ? "bg-slate-950 text-slate-50" : "bg-gray-50",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative w-full max-w-sm">
        <div
          className={cn(
            "relative rounded-xl p-8 text-center ring-1",
            isDark ? "border border-slate-800/60 bg-white/10 ring-white/10" : "bg-white ring-gray-200",
          )}
        >
          <Image
            src={isDark ? "/logo_white.png" : "/logo.png"}
            alt="Claimity AG"
            width={142}
            // The two logo files have different aspect ratios (480x166 white, 480x153 colored).
            height={isDark ? 49 : 45}
            priority
            className="mx-auto mb-5"
          />
          <div
            className={cn(
              "mx-auto mb-5 h-10 w-10 rounded-full border-4 animate-spin",
              isDark ? "border-white/10 border-t-teal-400" : "border-[#329AA1]/20 border-t-[#329AA1]",
            )}
            aria-label="Loading"
          />
          <p className={cn("text-sm", isDark ? "text-slate-200/80" : "text-gray-600")}>{message}</p>
        </div>
      </div>
    </div>
  )
}
