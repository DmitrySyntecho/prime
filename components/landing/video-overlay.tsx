"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

/* Full-screen video player that slides up from the bottom. Used by the hero's
   "Watch How We Work" button. Same showreel as the Why-Us block. */
const SHOWREEL_MUX_ID = "sotNy01Bw9hXSjlHAaTe4lF9vEG00ZRO2Z7Wpf6QF1Ou00"

export function VideoOverlay({
  open,
  onClose,
  muxId = SHOWREEL_MUX_ID,
}: {
  open: boolean
  onClose: () => void
  muxId?: string
}) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  return (
    <div
      className="fixed inset-0 z-[120] transition-opacity duration-300"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        background: "rgba(3,7,10,0.94)",
        backdropFilter: "blur(6px)",
      }}
      aria-hidden={!open}
      onClick={onClose}
    >
      {/* Sliding panel — eases up from the bottom to fill the screen */}
      <div
        className="absolute inset-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{ transform: open ? "translateY(0)" : "translateY(100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large close button — top right */}
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 12px 32px -10px rgba(0,0,0,0.7)",
          }}
        >
          <X className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.2} />
        </button>

        {/* Video — fills the entire screen (any resolution, incl. 4K) */}
        {open && (
          <iframe
            src={`https://player.mux.com/${muxId}?autoplay=true`}
            className="absolute inset-0 w-full h-full bg-black"
            style={{ border: "none" }}
            allow="autoplay; fullscreen; accelerometer; gyroscope; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  )
}
