"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, Trophy, MapPin } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const FIFA_2026_CITIES = [
  "LOS ANGELES",
  "NEW YORK / NJ",
  "MIAMI",
  "HOUSTON",
  "DALLAS",
  "SEATTLE",
  "SF BAY AREA",
  "ATLANTA",
  "BOSTON",
  "PHILADELPHIA",
  "KANSAS CITY",
  "MEXICO CITY",
  "GUADALAJARA",
  "MONTERREY",
  "TORONTO",
  "VANCOUVER",
]

const STORAGE_KEY = "pl_promo_dismissed_v2"

export function PromoTopBanner() {
  const pathname = usePathname()
  const isFifa = pathname?.startsWith("/fifa-2026-packages")
  const [dismissed, setDismissed] = useState(true) // start hidden until we read storage to avoid SSR flash
  const [cityIndex, setCityIndex] = useState(0)

  // Read dismissal flag once on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      setDismissed(stored === "1")
    } catch {
      setDismissed(false)
    }
  }, [])

  // Auto-dismiss permanently when user reaches FIFA page
  useEffect(() => {
    if (isFifa && typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, "1")
      } catch {}
      setDismissed(true)
    }
  }, [isFifa])

  // City rotation
  useEffect(() => {
    if (dismissed) return
    const interval = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % FIFA_2026_CITIES.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [dismissed])

  if (dismissed || isFifa) return null

  const handleClose = () => {
    setDismissed(true)
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "1")
      }
    } catch {}
  }

  return (
    <div className="relative overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03070a] via-[#0a0818] to-[#03070a]" aria-hidden />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 100% at 50% 50%, rgba(255,45,111,0.18) 0%, transparent 70%), radial-gradient(ellipse 30% 100% at 100% 50%, rgba(255,210,74,0.12) 0%, transparent 60%), radial-gradient(ellipse 30% 100% at 0% 50%, rgba(255,94,58,0.14) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      {/* Bauhaus pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='200' height='80' viewBox='0 0 200 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Crect x='0' y='0' width='40' height='40' fill='%23FF2D6F'/%3E%3Ccircle cx='80' cy='30' r='20' fill='%23FFD24A'/%3E%3Cpath d='M120 0 L160 0 L160 40 Z' fill='%23FF5E3A'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "200px",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,45,111,0.55), transparent)" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-nowrap pr-9">
          {/* FIFA TROPHY block */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span
              className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #FFD24A, #FF5E3A)",
                boxShadow: "0 6px 16px -4px rgba(255,210,74,0.45)",
              }}
            >
              <Trophy className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#03070a]" strokeWidth={2.4} />
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-[9px] tracking-[0.18em] uppercase font-bold text-[#FFD24A]">FIFA World Cup</span>
              <span className="text-[14px] font-extrabold text-white tracking-tight">2026 — Watch Parties</span>
            </span>
            <span className="sm:hidden text-[12px] font-extrabold text-white tracking-tight">FIFA 2026</span>
          </div>

          {/* Host city — desktop+tablet */}
          <span
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase backdrop-blur-md min-w-[150px] justify-center"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,210,74,0.25)",
              color: "#FFD24A",
            }}
          >
            <MapPin className="w-3 h-3" />
            <span className="transition-all duration-300">{FIFA_2026_CITIES[cityIndex]}</span>
          </span>

          {/* Tagline — large screens only */}
          <span className="hidden lg:inline-flex items-center gap-2">
            <span className="w-px h-4 bg-white/15" />
            <span className="text-white/80 text-[13px] font-medium">
              Big Screens · Pro Sound · LED Walls — book early, dates fill fast
            </span>
          </span>

          {/* CTA */}
          <Link
            href="/fifa-2026-packages"
            className="ml-auto sm:ml-0 group inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-[12px] font-extrabold tracking-[0.04em] uppercase whitespace-nowrap text-[#03070a] transition-all hover:-translate-y-px"
            style={{
              background: "linear-gradient(135deg, #FFD24A, #FF5E3A)",
              boxShadow: "0 8px 22px -6px rgba(255,210,74,0.55), inset 0 1px 0 rgba(255,255,255,0.30)",
            }}
          >
            <span className="hidden sm:inline">View Packages</span>
            <span className="sm:hidden">View</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <button
          onClick={handleClose}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md hover:bg-white/[0.08] text-white/70 hover:text-white transition-colors flex items-center justify-center"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
