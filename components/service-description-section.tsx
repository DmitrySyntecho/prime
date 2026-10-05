"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Icon3D } from "@/components/icon-3d"

interface ServiceDescriptionSectionProps {
  heading: string
  description: string
  highlights: string[]
  ctaLabel: string
  collage: string[]
  collageStats: { value: string; label: string }[]
  onStartQuote: () => void
}

export function ServiceDescriptionSection({
  heading,
  description,
  highlights,
  ctaLabel,
  collage,
  collageStats,
  onStartQuote,
}: ServiceDescriptionSectionProps) {
  const photos = collage.slice(0, 6).filter(Boolean)
  const setA = photos.slice(0, 3)
  const setB = photos.slice(3, 6)
  const stat0 = collageStats[0]
  const stat1 = collageStats[1]

  // showingB[i] = true means slot i is showing setB photo (faded in on top)
  const [showingB, setShowingB] = useState([false, false, false])

  useEffect(() => {
    if (photos.length < 4) return

    const FADE_MS = 800
    const STAGGER_MS = 1000
    const HOLD_MS = 5000

    const timeouts: ReturnType<typeof setTimeout>[] = []

    const cycle = (toB: boolean) => {
      for (let i = 0; i < 3; i++) {
        const t = setTimeout(() => {
          setShowingB(prev => {
            const next = [...prev]
            next[i] = toB
            return next
          })
        }, i * STAGGER_MS)
        timeouts.push(t)
      }
      // next cycle starts after: hold + last stagger + fade completes
      const nextT = setTimeout(() => cycle(!toB), HOLD_MS + 2 * STAGGER_MS + FADE_MS)
      timeouts.push(nextT)
    }

    const initial = setTimeout(() => cycle(true), HOLD_MS)
    timeouts.push(initial)

    return () => timeouts.forEach(clearTimeout)
  }, [photos.length])

  // Layout mirrors AboutUsSection: top-center wide, bottom-left rotated, bottom-right rotated
  const slotLayout = [
    {
      className: "absolute top-0 left-[5%] w-[90%] h-[55%] rounded-2xl overflow-hidden border border-white/10 z-10",
      style: { boxShadow: "0 25px 50px -15px rgba(0,0,0,0.5), 0 10px 20px -10px rgba(0,0,0,0.3)" },
    },
    {
      className: "absolute bottom-[5%] left-[-3%] w-[55%] h-[48%] rounded-2xl overflow-hidden border-2 border-white/15 z-20",
      style: { transform: "rotate(-3deg)", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6), 0 15px 30px -10px rgba(0,0,0,0.4)" },
    },
    {
      className: "absolute bottom-[8%] right-[-5%] w-[52%] h-[45%] rounded-2xl overflow-hidden border-2 border-white/15 z-30",
      style: { transform: "rotate(2.5deg)", boxShadow: "0 35px 70px -20px rgba(0,0,0,0.65), 0 18px 36px -12px rgba(0,0,0,0.45)" },
    },
  ]

  return (
    <section className="py-20 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          {/* LEFT — heading, body, highlights, CTA */}
          <div className="reveal-left order-2 lg:order-1">
            <span className="ds-pill mb-5">
              <span className="dot" />
              Service Overview
            </span>

            <h2 className="text-[30px] md:text-[40px] lg:text-[48px] font-extrabold tracking-[-0.025em] leading-[1.08] text-white mb-6">
              {heading}
            </h2>

            <ul className="space-y-3 mb-9">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#FF2D6F]/22 border border-[#FF2D6F]/35 flex items-center justify-center text-[#FF2D6F]">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                  <span className="text-white/75 text-[14px] md:text-[15px] leading-[1.55]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={onStartQuote}
              className="cta-yellow group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] font-extrabold text-[14px] md:text-[15px] tracking-[0.01em] transition-all hover:-translate-y-0.5"
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* RIGHT — 3-photo animated collage */}
          <div className="reveal-right order-1 lg:order-2 relative">
            <div className="relative h-[420px] md:h-[520px]">
              {slotLayout.map((slot, i) => (
                <div key={i} className={slot.className} style={slot.style}>
                  {/* Base image — set A */}
                  {setA[i] && (
                    <Image
                      src={setA[i]}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      className="object-cover"
                    />
                  )}
                  {/* Overlay image — set B, fades in/out */}
                  {setB[i] && (
                    <Image
                      src={setB[i]}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      className="object-cover absolute inset-0 transition-opacity duration-[800ms]"
                      style={{ opacity: showingB[i] ? 1 : 0 }}
                    />
                  )}
                </div>
              ))}

              {/* Floating stat card — top-right */}
              {stat0 && (
                <div
                  className="hidden md:flex absolute top-4 right-[-10px] md:right-[-20px] z-40 items-center gap-3 px-4 py-3.5 rounded-[14px] border border-[#FF2D6F]/25 backdrop-blur-2xl animate-float-y"
                  style={{
                    background: "rgba(8,18,26,0.85)",
                    boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <Icon3D name="award" size={40} className="flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
                  <div>
                    <b className="block text-[13px] font-bold text-white leading-tight">{stat0.value}</b>
                    <span className="text-[11px] text-white/45">{stat0.label}</span>
                  </div>
                </div>
              )}

              {/* Floating stat card — bottom-left */}
              {stat1 && (
                <div
                  className="hidden md:flex absolute bottom-[14%] -left-6 z-40 items-center gap-3 px-4 py-3.5 rounded-[14px] border border-[#FF2D6F]/20 backdrop-blur-2xl animate-float-y"
                  style={{
                    animationDelay: "-2.5s",
                    background: "rgba(8,18,26,0.7)",
                    boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <Icon3D name="stopwatch" size={40} className="flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
                  <div>
                    <b className="block text-[13px] font-bold text-white leading-tight">{stat1.value}</b>
                    <span className="text-[11px] text-white/45">{stat1.label}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
