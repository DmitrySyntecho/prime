"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Site-wide motion helpers, ~1 KB:
 *  - Spotlight: one delegated pointermove listener writes --mx/--my on the
 *    hovered .fx-spot card (rAF-throttled, passive).
 *  - Reveal fallback: browsers without scroll-driven animations get .sda-off on
 *    <html> and a single IntersectionObserver that adds .in-view.
 */
const REVEAL = ".reveal, .reveal-stagger > *, .reveal-left, .reveal-right, .reveal-zoom"

export function MotionFX() {
  const pathname = usePathname()

  useEffect(() => {
    let frame = 0
    let last: PointerEvent | null = null
    const onMove = (e: PointerEvent) => {
      last = e
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const ev = last
        if (!ev) return
        const el = (ev.target as Element | null)?.closest?.(".fx-spot") as HTMLElement | null
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty("--mx", `${ev.clientX - r.left}px`)
        el.style.setProperty("--my", `${ev.clientY - r.top}px`)
      })
    }
    if (window.matchMedia("(hover: hover)").matches) document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      document.removeEventListener("pointermove", onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()")) return
    document.documentElement.classList.add("sda-off")
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    // Wait a frame so the new route's DOM is in place.
    const id = requestAnimationFrame(() => document.querySelectorAll(REVEAL).forEach((el) => io.observe(el)))
    return () => {
      cancelAnimationFrame(id)
      io.disconnect()
    }
  }, [pathname])

  return null
}
