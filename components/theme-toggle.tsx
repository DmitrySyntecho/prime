"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

/**
 * Flips the entire site between the dark brand theme and a fully light one.
 * The light theme is a true inversion applied to the <html> root (the spec
 * exempts the document root from creating a containing block, so position:fixed
 * keeps working). Media is counter-inverted in globals.css so photos stay true.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(false)

  useEffect(() => {
    setLight(document.documentElement.classList.contains("theme-light"))
  }, [])

  const toggle = () => {
    const next = !document.documentElement.classList.contains("theme-light")
    document.documentElement.classList.toggle("theme-light", next)
    try {
      localStorage.setItem("theme", next ? "light" : "dark")
    } catch {}
    setLight(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      title={light ? "Dark mode" : "Light mode"}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-[10px] bg-white/[0.04] border border-white/[0.10] text-white/85 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.20] transition-all ${className}`}
    >
      {light ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
    </button>
  )
}
