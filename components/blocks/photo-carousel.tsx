"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type Photo = { src: string; caption: string; event: string; stage: "Load-in" | "Showtime" }

/** Swipeable photo row with captions, a progress bar and paging arrows. */
export function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [s, setS] = useState({ atStart: true, atEnd: false, progress: 0, visible: 1 })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setS({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
      progress: max > 0 ? el.scrollLeft / max : 0,
      visible: el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1,
    })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure])

  const page = (dir: 1 | -1) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" })
  }

  return (
    <div className="reveal">
      <div
        ref={ref}
        onScroll={measure}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 md:gap-5"
        style={{ scrollbarWidth: "none" }}
      >
        {photos.map((p) => (
          <figure
            key={p.src}
            className="keep-original group relative aspect-[4/3] w-[86%] shrink-0 snap-start overflow-hidden rounded-[22px] border border-white/10 sm:w-[62%] lg:w-[calc((100%-2.5rem)/2.4)]"
          >
            <Image
              src={p.src}
              alt={`${p.caption} — ${p.event}`}
              fill
              sizes="(max-width: 640px) 86vw, (max-width: 1024px) 62vw, 520px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
            <span
              className={`absolute left-4 top-4 rounded-md px-2.5 py-1 text-[12px] font-extrabold uppercase tracking-[0.1em] ${
                p.stage === "Load-in" ? "bg-[#FFD24A] text-[#0a0612]" : "bg-[#FF2D6F] text-white"
              }`}
            >
              {p.stage}
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <p className="text-[16px] font-bold leading-snug text-white md:text-[17px]">{p.caption}</p>
              <p className="mt-0.5 text-[14.5px] font-semibold text-[#FFC48A]">{p.event}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
          <span
            className="absolute inset-y-0 left-0 rounded-full transition-transform duration-150"
            style={{
              width: `${s.visible * 100}%`,
              transform: `translateX(${s.visible < 1 ? ((s.progress * (1 - s.visible)) / s.visible) * 100 : 0}%)`,
              background: "linear-gradient(90deg, #FF2D6F, #FF5E3A)",
            }}
          />
        </div>
        {(["prev", "next"] as const).map((d) => {
          const Icon = d === "prev" ? ChevronLeft : ChevronRight
          return (
            <button
              key={d}
              type="button"
              onClick={() => page(d === "prev" ? -1 : 1)}
              disabled={d === "prev" ? s.atStart : s.atEnd}
              aria-label={d === "prev" ? "Previous photos" : "Next photos"}
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.12] bg-white/[0.05] text-white backdrop-blur-md transition-[background-color,border-color,opacity] hover:border-[#FF2D6F]/45 hover:bg-[#FF2D6F]/15 disabled:pointer-events-none disabled:opacity-30"
            >
              <Icon className="h-5 w-5" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
