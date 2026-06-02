"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Infinite CSS animations that are wasteful to keep running off-screen.
// Includes inline-animated elements ([style*="animation"]) so the fifa/charity
// orbs, sparkles, floats and pulses are caught too.
const SELECTOR = [
  ".animate-scroll-left",
  ".animate-scroll-right",
  ".animate-eq",
  ".animate-gradient-shift",
  ".animate-scanlines",
  ".animate-float-y",
  ".animate-pulse-ds",
  ".animate-ping",
  '[style*="animation"]',
].join(",")

/**
 * Performance guard for the page's many infinite animations:
 *  - pauses each one while it's off-screen (one shared IntersectionObserver),
 *  - pauses the fixed background orbs + everything when the tab is hidden,
 *  - fully pauses motion under prefers-reduced-motion.
 * Pure progressive enhancement — with JS off, CSS keeps everything running.
 */
export function AnimationObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
    const orbs = Array.from(document.querySelectorAll<HTMLElement>(".bg-orb"))

    const play = (el: HTMLElement, on: boolean) => {
      el.style.animationPlayState = on ? "running" : "paused"
    }

    if (reduce) {
      ;[...targets, ...orbs].forEach((el) => play(el, false))
      return
    }

    if (targets.length === 0 && orbs.length === 0) return

    const visible = new Set<Element>()
    targets.forEach((el) => play(el, false)) // start paused; resume when seen

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target)
          else visible.delete(e.target)
          if (!document.hidden) play(e.target as HTMLElement, e.isIntersecting)
        }
      },
      { rootMargin: "200px" }
    )
    targets.forEach((el) => io.observe(el))

    const onVisibility = () => {
      const hidden = document.hidden
      orbs.forEach((o) => play(o, !hidden))
      targets.forEach((el) => play(el, hidden ? false : visible.has(el)))
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [pathname])

  return null
}
