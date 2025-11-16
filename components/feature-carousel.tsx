"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type FeatureCarouselImage = { src: string; alt: string }

type Lang = "de" | "en" | "fr"

function computeLangFromPath(pathname: string | null | undefined): Lang {
  if (!pathname) return "de"
  if (pathname.startsWith("/en")) return "en"
  if (pathname.startsWith("/fr")) return "fr"
  return "de"
}

const LABELS: Record<
  Lang,
  {
    openFull: string
    dialogDesc: string
    prevImage: string
    nextImage: string
    previousSlide: string
    nextSlide: string
  }
> = {
  de: {
    openFull: "Bild in Vollansicht öffnen",
    dialogDesc: "Escape drücken oder ausserhalb klicken, um zu schliessen",
    prevImage: "Vorheriges Bild",
    nextImage: "Nächstes Bild",
    previousSlide: "Vorherige Folie",
    nextSlide: "Nächste Folie",
  },
  en: {
    openFull: "Open image in full view",
    dialogDesc: "Press Escape or click outside to close",
    prevImage: "Previous image",
    nextImage: "Next image",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
  },
  fr: {
    openFull: "Ouvrir l'image en plein écran",
    dialogDesc: "Appuyez sur Échap ou cliquez à l'extérieur pour fermer",
    prevImage: "Image précédente",
    nextImage: "Image suivante",
    previousSlide: "Diapositive précédente",
    nextSlide: "Diapositive suivante",
  },
}

export function FeatureCarousel({ images, className }: { images: FeatureCarouselImage[]; className?: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const pathname = usePathname() || "/"
  const lang = useMemo(() => computeLangFromPath(pathname), [pathname])
  const t = useMemo(() => LABELS[lang], [lang])

  const openAt = useCallback((idx: number) => {
    setActiveIndex(idx)
    setLightboxOpen(true)
  }, [])

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        showPrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        showNext()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [lightboxOpen, showPrev, showNext])

  if (!images?.length) return null

  return (
    <div className={cn("relative", className)}>
      <Carousel className="w-full">
        {/* Entfernt Standard-Gutter, damit nichts „links abgeschnitten“ wirkt */}
        <CarouselContent className="!ml-0">
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="!pl-0">
              <button
                type="button"
                onClick={() => openAt(idx)}
                className="block w-full cursor-zoom-in rounded-2xl focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                aria-label={t.openFull}
              >
                {/* 7:5 entspricht 700x500 – Bild wird vollständig via object-contain gezeigt */}
                <AspectRatio ratio={7 / 4} className="relative bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-contain"
                    priority={idx === 0}
                  />
                </AspectRatio>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-3 border border-gray-200 bg-white/80 text-gray-700 hover:bg-gray-50 backdrop-blur"
          aria-label={t.previousSlide}
        />
        <CarouselNext
          className="right-3 border border-gray-200 bg-white/80 text-gray-700 hover:bg-gray-50 backdrop-blur"
          aria-label={t.nextSlide}
        />
      </Carousel>

      {/* Lightbox / Vollansicht */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-[95vw] sm:max-w-[95vw]">
          <DialogTitle className="sr-only">{images[activeIndex]?.alt || "Image preview"}</DialogTitle>
          <DialogDescription className="sr-only">{t.dialogDesc}</DialogDescription>
          <div className="relative w-[95vw] max-w-[1400px] h-[85vh] mx-auto bg-black rounded-2xl p-2 sm:p-4">
            <Image
              src={images[activeIndex]?.src ?? ""}
              alt={images[activeIndex]?.alt ?? ""}
              fill
              sizes="100vw"
              className="object-contain bg-white"
              priority
            />

            {/* Klickflächen für Navigation (unsichtbar) */}
            <button
              type="button"
              aria-label={t.prevImage}
              onClick={showPrev}
              className="absolute inset-y-2 left-2 w-1/3 rounded md:inset-y-4 md:left-4 md:w-1/2 cursor-pointer bg-transparent focus:outline-none"
              style={{ background: "transparent" }}
            />
            <button
              type="button"
              aria-label={t.nextImage}
              onClick={showNext}
              className="absolute inset-y-2 right-2 w-1/3 rounded md:inset-y-4 md:right-4 md:w-1/2 cursor-pointer bg-transparent focus:outline-none"
              style={{ background: "transparent" }}
            />

            {/* Sichtbare Pfeil-Buttons */}
            <div className="pointer-events-none">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="pointer-events-auto absolute top-1/2 left-4 -translate-y-1/2 size-9 rounded-full border border-gray-200 bg-white/80 text-gray-700 hover:bg-gray-50 backdrop-blur"
                onClick={showPrev}
                aria-label={t.prevImage}
              >
                <ArrowLeft />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="pointer-events-auto absolute top-1/2 right-4 -translate-y-1/2 size-9 rounded-full border border-gray-200 bg-white/80 text-gray-700 hover:bg-gray-50 backdrop-blur"
                onClick={showNext}
                aria-label={t.nextImage}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}