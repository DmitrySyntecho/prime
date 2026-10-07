"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight, Play, X } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false })

type Study = { title: string; location: string; category: string; mux: string; thumb: number }

// Behind-the-scenes films (same set as primelineav.com "Browse our event portfolio").
const STUDIES: Study[] = [
  { title: "TikTok Shop Summit 2026", location: "Los Angeles Convention Center", category: "Conference", mux: "KfJ00XD74CFG01AI5eclQ58q439V3U004sBcuSENC2A9IU", thumb: 120 },
  { title: "Nike After Dark Tour", location: "Los Angeles", category: "Brand activation", mux: "iqYRqLK301aUIzbLxa9zMXyQ8FxOZIIGTgagNB02spvpY", thumb: 12 },
  { title: "IDB Group Corporate Summit", location: "Intercontinental Miami", category: "Corporate", mux: "a1VM513vYaAw3u8rBfLB8bG4MMma2FbIFN2YGepuxiA", thumb: 60 },
  { title: "Young Fashion Show BTS", location: "Los Angeles", category: "Fashion show", mux: "eMtzfn01vmRsGxIZ9SWpnmxiavJCupHsJfOV2K68M400E", thumb: 40 },
  { title: "Last Chance for Animals Gala", location: "Los Angeles", category: "Gala", mux: "02w1uQtRVTaeIYfYMvYnHvIFZbFF19lAyoDYU00M00fGHk", thumb: 81 },
  { title: "Amagi FAST Conference", location: "Los Angeles", category: "Conference", mux: "BrD9vKSat02duCjNodPZ00a02ZRc5QfKAno007TIKGF5vOU", thumb: 63 },
]

function StudyCard({ s, onPlay }: { s: Study; onPlay: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onPlay}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="keep-original group relative block aspect-video w-full overflow-hidden rounded-[18px] border border-white/10 bg-black text-left outline-none ring-[#FF2D6F]/60 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#FF2D6F]/40 focus-visible:ring-2"
        aria-label={`Play ${s.title} behind-the-scenes video`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://image.mux.com/${s.mux}/thumbnail.webp?time=${s.thumb}&width=720`}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {hover && (
          // Live preview: Mux renders a short animated WebP from the same film.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://image.mux.com/${s.mux}/animated.webp?start=${s.thumb}&end=${s.thumb + 4}&width=640&fps=12`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-md bg-[#FF2D6F] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white">{s.category}</span>
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-6 w-6 fill-white text-white" />
          </span>
        </span>
      </button>
      <div className="mt-3 px-0.5">
        <h3 className="truncate text-[17px] font-bold leading-tight text-white md:text-[18px]">{s.title}</h3>
        <p className="truncate text-[14.5px] font-semibold text-[#FFC48A] md:text-[15px]">{s.location}</p>
      </div>
    </div>
  )
}

/** Block 05 — behind-the-scenes portfolio grid with an in-page player. */
export function HomePortfolioSection() {
  const [active, setActive] = useState<Study | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null)
    document.body.classList.add("modal-open")
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.classList.remove("modal-open")
      window.removeEventListener("keydown", onKey)
    }
  }, [active])

  return (
    <section id="portfolio" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Our case studies" title="Browse our event portfolio" accent="event portfolio">
          Any AV company can promise you a flawless show. Here at Prime Line AV, we show you exactly how we make it:{" "}
          <span className="hl">watch our crews bring real events to life behind the scenes.</span>
        </SectionHeader>

        <div className="reveal-stagger grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {STUDIES.map((s) => (
            <StudyCard key={s.mux} s={s} onPlay={() => setActive(s)} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/portfolio" className="shimmer-stroke inline-flex items-center gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.05] px-6 py-3.5 text-[14px] font-bold text-white backdrop-blur-md transition-[background-color,border-color] hover:border-white/[0.22] hover:bg-white/[0.10]">
            View all case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
          <div className="keep-original relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-[18px] border border-white/10 bg-black">
              <MuxPlayer playbackId={active.mux} autoPlay="any" streamType="on-demand" accentColor="#FF2D6F" style={{ aspectRatio: "16 / 9", width: "100%" }} />
            </div>
            <p className="mt-3 text-[15px] font-bold text-white">
              {active.title} <span className="font-medium text-[#FFB366]">· {active.location}</span>
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
