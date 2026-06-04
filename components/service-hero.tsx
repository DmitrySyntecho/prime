"use client"

import Image from "next/image"
import { ArrowRight, Phone } from "lucide-react"
import { useFitHeading } from "@/lib/use-fit-heading"

interface ServiceHeroProps {
  eyebrow: string
  h1: string
  subheadline: string
  heroCta: string
  image: string
  onStartQuote: () => void
}

import { PHONE_DISPLAY as PHONE } from "@/lib/contact"

// Real alpha-fade at the bottom: a CSS mask is applied to the wrapper holding
// the photo + the left-side dim layer, so the actual pixels become transparent
// (revealing the page background) — instead of being painted over by a dark
// gradient block.
const BOTTOM_FADE_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0) 100%)"

export function ServiceHero({ eyebrow, h1, subheadline, heroCta, image, onStartQuote }: ServiceHeroProps) {
  const h1Ref = useFitHeading<HTMLHeadingElement>(h1, { maxDesktopPx: 80, maxMobilePx: 40 })
  return (
    <section
      className="relative isolate overflow-hidden flex items-center
                 -mt-[100px] md:-mt-[120px] lg:-mt-[140px]
                 pt-[160px] md:pt-[200px] lg:pt-[220px] pb-16 md:pb-20"
    >
      {/* Masked wrapper — photo + left dim layer fade to transparent at the bottom */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          WebkitMaskImage: BOTTOM_FADE_MASK,
          maskImage: BOTTOM_FADE_MASK,
        }}
        aria-hidden
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />

        {/* Darken left side (text area), fade out toward the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,7,10,0.92) 0%, rgba(3,7,10,0.85) 30%, rgba(3,7,10,0.55) 55%, rgba(3,7,10,0.25) 78%, rgba(3,7,10,0.05) 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Subtle top fade so the header sits over a slightly darker area */}
      <div
        className="absolute inset-x-0 top-0 h-40 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,7,10,0.55) 0%, rgba(3,7,10,0.25) 60%, rgba(3,7,10,0) 100%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-[820px]">
          <span className="ds-pill mb-5 md:mb-7 text-[10px] md:text-[12px]">
            <span className="dot" />
            {eyebrow}
          </span>

          <h1
            ref={h1Ref}
            className="font-extrabold tracking-[-0.03em] text-white mb-5 md:mb-7"
            style={{ fontSize: "clamp(32px, 5.5vw, 80px)", lineHeight: 1.05 }}
          >
            {h1}
          </h1>

          <p className="text-white/70 text-[15px] md:text-[18px] leading-relaxed max-w-[560px] mb-7 md:mb-10">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onStartQuote}
              className="group inline-flex items-center justify-center gap-2.5 px-6 md:px-7 py-3.5 md:py-4 rounded-xl bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] text-white font-extrabold text-[14px] md:text-[15px] tracking-[0.01em] transition-all hover:-translate-y-0.5"
              style={{
                boxShadow:
                  "0 12px 36px -8px rgba(255, 45, 111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              {heroCta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <a
              href={`tel:${PHONE.replace(/\D/g, "")}`}
              suppressHydrationWarning
              className="inline-flex items-center justify-center gap-2.5 px-6 md:px-7 py-3.5 md:py-4 rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-md text-white font-bold text-[14px] md:text-[15px] hover:bg-white/[0.08] transition-all"
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
