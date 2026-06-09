"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Forces the window to the very top on every route change. We jump instantly
 * (temporarily overriding the global `scroll-behavior: smooth`) and re-assert it
 * a moment later to counter late layout shifts (images/fonts/first-screen height).
 * In-page anchor navigation (with a #hash) is left untouched.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.location.hash) return

    const html = document.documentElement
    const jump = () => {
      const prev = html.style.scrollBehavior
      html.style.scrollBehavior = "auto"
      window.scrollTo(0, 0)
      html.style.scrollBehavior = prev
    }

    jump()
    const t = setTimeout(jump, 80)
    return () => clearTimeout(t)
  }, [pathname])

  return null
}
