"use client"

import { useCallback, useEffect, useRef } from "react"

interface FitOpts {
  /** starting (max) font size on desktop, px */
  maxDesktopPx?: number
  /** starting (max) font size on mobile, px */
  maxMobilePx?: number
  /** lower bound, px */
  minPx?: number
  /** max lines allowed on desktop (>=768px) */
  desktopLines?: number
  /** max lines allowed on mobile */
  mobileLines?: number
  /** unitless line-height applied while measuring */
  lineHeight?: number
}

/**
 * Shrink-to-fit a heading: reduces font-size until the text wraps within the
 * allowed number of lines (2 on desktop, 3 on mobile by default), so long
 * location-based H1s never overflow. Re-fits on resize and after fonts load.
 */
export function useFitHeading<T extends HTMLElement = HTMLHeadingElement>(
  text: string,
  opts: FitOpts = {},
) {
  const {
    maxDesktopPx = 80,
    maxMobilePx = 40,
    minPx = 22,
    desktopLines = 2,
    mobileLines = 3,
    lineHeight = 1.05,
  } = opts
  const ref = useRef<T>(null)

  const fit = useCallback(() => {
    const el = ref.current
    if (!el) return
    const mobile = window.innerWidth < 768
    const maxLines = mobile ? mobileLines : desktopLines
    let fs = mobile ? maxMobilePx : maxDesktopPx
    el.style.lineHeight = String(lineHeight)
    el.style.fontSize = `${fs}px`
    let guard = 0
    while (guard++ < 80 && fs > minPx) {
      const lines = Math.round(el.scrollHeight / (fs * lineHeight))
      if (lines <= maxLines) break
      fs -= 2
      el.style.fontSize = `${fs}px`
    }
  }, [maxDesktopPx, maxMobilePx, minPx, desktopLines, mobileLines, lineHeight])

  useEffect(() => {
    fit()
    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(fit)
    }
    window.addEventListener("resize", onResize)
    // re-fit once the web font is ready (metrics differ from fallback)
    if (typeof document !== "undefined" && (document as Document).fonts?.ready) {
      ;(document as Document).fonts.ready.then(fit).catch(() => {})
    }
    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
    }
  }, [fit, text])

  return ref
}
