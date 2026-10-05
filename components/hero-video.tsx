"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Hero video showcase. Plays a list of 10s muted clips back to back with a
 * cross-fade, inside the site's glass hero frame.
 *
 * - Two stacked <video> layers: the hidden one preloads the next clip so the
 *   swap is seamless.
 * - Pauses when scrolled out of view; under prefers-reduced-motion it shows the
 *   poster frame only.
 * - Clips live in public/videos/hero/<name>.mp4 with a <name>.webp poster.
 */
export function HeroVideo({ clips, className = "", label = "Prime Line AV event footage" }: { clips: string[]; className?: string; label?: string }) {
  const list = clips.length ? clips : ["home-1"]
  const [active, setActive] = useState(0) // index into list for the visible layer
  const [layer, setLayer] = useState<0 | 1>(0) // which <video> element is on top
  const [reduced, setReduced] = useState(false)
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)]
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Play/pause the top layer with visibility.
  useEffect(() => {
    const v = refs[layer].current
    if (!v || reduced) return
    if (visible) v.play().catch(() => {})
    else v.pause()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, layer, reduced])

  const next = (active + 1) % list.length

  // Keep the hidden layer loaded with the next clip.
  useEffect(() => {
    const hidden = refs[layer === 0 ? 1 : 0].current
    if (!hidden || list.length < 2) return
    const src = `/videos/hero/${list[next]}.mp4`
    if (!hidden.src.endsWith(src)) {
      hidden.src = src
      hidden.load()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, layer, list.length])

  const onEnded = () => {
    if (list.length < 2) return
    const hiddenIdx = layer === 0 ? 1 : 0
    const hidden = refs[hiddenIdx].current
    if (!hidden) return
    hidden.currentTime = 0
    hidden.play().catch(() => {})
    setLayer(hiddenIdx as 0 | 1)
    setActive(next)
  }

  return (
    <div ref={wrap} className={`relative overflow-hidden bg-black ${className}`} aria-label={label} role="img">
      {[0, 1].map((i) => {
        const isTop = layer === i
        const clip = i === 0 ? list[0] : list[Math.min(1, list.length - 1)]
        return (
          <video
            key={i}
            ref={refs[i]}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: isTop ? 1 : 0 }}
            src={reduced && i === 1 ? undefined : `/videos/hero/${clip}.mp4`}
            poster={`/videos/hero/${clip}.webp`}
            muted
            playsInline
            autoPlay={i === 0 && !reduced}
            loop={list.length < 2}
            preload={i === 0 ? "auto" : "metadata"}
            onEnded={isTop ? onEnded : undefined}
            aria-hidden
            tabIndex={-1}
          />
        )
      })}
      {/* Progress pips */}
      {list.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5" aria-hidden>
          {list.map((_, i) => (
            <span key={i} className={`h-1 rounded-full transition-[width,background-color] duration-300 ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>
      )}
    </div>
  )
}
