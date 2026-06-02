"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Infinite CSS animations that are wasteful to keep running off-screen.
const SELECTOR = [
  ".animate-scroll-left",
  ".animate-scroll-right",
  ".animate-eq",
  ".animate-gradient-shift",
  ".animate-scanlines",
  ".animate-float-y",
  ".animate-pulse-ds",
].join(",")

/**
 * Pauses the above infinite animations while they're off-screen and resumes
 * them just before they scroll into view (one shared IntersectionObserver).
 * Pure progressive enhancement — if JS is off, CSS keeps everything running.
 * Also fully pauses motion for users who prefer reduced motion.
 */
export function AnimationObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
    if (els.length === 0) return

    if (reduce) {
      els.forEach((el) => (el.style.animationPlayState = "paused"))
      return
    }

    // start paused, resume on intersection
    els.forEach((el) => (el.style.animationPlayState = "paused"))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ;(e.target as HTMLElement).style.animationPlayState = e.isIntersecting ? "running" : "paused"
        }
      },
      { rootMargin: "200px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
