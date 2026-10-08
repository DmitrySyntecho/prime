"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

/**
 * Site rule (phones): the bottom nav and floating call/quote bars appear only once
 * the visitor has scrolled a little past the middle of the first block, so the
 * first screen shows the hero untouched. The first block is the hero (`#top`);
 * pages without one use 60% of the viewport. Toggles back when scrolling up.
 */
export function usePastFirstBlock(ratio = 0.55) {
  const pathname = usePathname()
  const [past, setPast] = useState(false)

  useEffect(() => {
    let threshold = window.innerHeight * 0.6
    let raf = 0

    const measure = () => {
      const hero = document.getElementById("top")
      if (hero) {
        const r = hero.getBoundingClientRect()
        threshold = r.top + window.scrollY + r.height * ratio
      } else {
        threshold = window.innerHeight * 0.6
      }
    }
    const check = () => {
      raf = 0
      setPast(window.scrollY >= threshold)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    check()
    // The hero's height settles after fonts, video posters and images load.
    const settle = window.setTimeout(onResize, 700)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.clearTimeout(settle)
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [pathname, ratio])

  return past
}
