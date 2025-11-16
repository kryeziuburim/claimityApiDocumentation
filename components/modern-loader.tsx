"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type ModernLoaderProps = {
  message?: string
  className?: string
}

export default function ModernLoader({ message = "Laden …", className }: ModernLoaderProps) {
  return (
    <div
      className={cn(
        "min-h-screen grid place-items-center bg-gray-50",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative w-full max-w-sm">
        <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(50,154,161,0.08),_transparent_60%)]" />
        <div className="relative rounded-2xl bg-white ring-1 ring-gray-200 shadow-lg p-8 text-center">
          <Image
            src="/logo.png"
            alt="Claimity AG"
            width={142}
            height={46}
            priority
            className="mx-auto mb-5"
          />
          <div
            className="mx-auto mb-5 h-10 w-10 rounded-full border-4 border-[#329AA1]/20 border-t-[#329AA1] animate-spin"
            aria-label="Loading"
          />
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  )
}