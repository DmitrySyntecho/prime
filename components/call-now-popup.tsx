"use client"

import { useEffect, useRef, useState } from "react"
import { X, Phone } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact"

const SESSION_KEY = "callPopupDismissed"

export function CallNowPopup() {
  const [visible, setVisible] = useState(false)
  const formOpenRef = useRef(false)
  const formWasOpenedRef = useRef(false)
  const pathname = usePathname()
  const isFifa = pathname?.startsWith("/fifa-2026-packages")

  const accent = isFifa ? "#E61D25" : "#FF2D6F"
  const accentDeep = isFifa ? "#BF1119" : "#FF5E3A"
  const ctaShadow = isFifa
    ? "0 8px 22px -6px rgba(230,29,37,0.55), inset 0 1px 0 rgba(255,255,255,0.25)"
    : "0 8px 22px -6px rgba(255,45,111,0.45), inset 0 1px 0 rgba(255,255,255,0.30)"

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    let abandonTimer: ReturnType<typeof setTimeout>

    const show = () => {
      if (sessionStorage.getItem(SESSION_KEY)) return
      if (formOpenRef.current) return
      setVisible(true)
    }

    // Condition 1: user on site > 1 minute
    const minuteTimer = setTimeout(show, 60_000)

    // Track form open/close for condition 2
    const onFormOpen = () => {
      formOpenRef.current = true
      formWasOpenedRef.current = true
      clearTimeout(abandonTimer)
      setVisible(false)
    }

    const onFormClose = () => {
      formOpenRef.current = false
      // Condition 2: form was opened then closed (abandoned)
      if (formWasOpenedRef.current) {
        abandonTimer = setTimeout(show, 1500)
      }
    }

    document.addEventListener("openQuoteForm", onFormOpen)
    document.addEventListener("quoteFormClosed", onFormClose)

    return () => {
      clearTimeout(minuteTimer)
      clearTimeout(abandonTimer)
      document.removeEventListener("openQuoteForm", onFormOpen)
      document.removeEventListener("quoteFormClosed", onFormClose)
    }
  }, [])

  // Trigger CTM scan when popup appears (popup is late-rendered, missed by initial scan)
  useEffect(() => {
    if (!visible) return
    const scan = () => {
      try {
        const ctm = (window as any).__ctm
        if (!ctm) return
        ctm.main?.scan?.()
        ctm.main?.runNow?.()
      } catch (e) {}
    }
    const t1 = setTimeout(scan, 50)
    const t2 = setTimeout(scan, 400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [visible])

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden
      />

      {/* Popup — centered */}
      <div
        className="fixed z-[71] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        role="dialog"
        aria-modal="true"
        aria-labelledby="callpopup-title"
      >
        <style href="call-popup" precedence="default">{`
          @keyframes callPopupIn {
            from { opacity: 0; transform: scale(0.94) translateY(10px); }
            to   { opacity: 1; transform: scale(1)    translateY(0); }
          }
          .call-popup-inner {
            animation: callPopupIn 0.22s ease-out forwards;
          }
        `}</style>

        <div
          className="call-popup-inner relative w-[calc(100vw-48px)] max-w-[360px] md:max-w-[600px] rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: "rgba(10, 8, 24, 0.97)",
            boxShadow: "0 32px 64px -16px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)",
            backdropFilter: "blur(32px)",
          }}
        >
          {/* Close */}
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-all backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Photo — left on desktop, top on mobile */}
            <div
              className="shrink-0 flex items-end justify-center md:w-[200px] h-[220px] md:h-auto overflow-hidden"
              style={{ background: `linear-gradient(160deg, ${accent} 0%, ${accentDeep} 100%)` }}
            >
              <Image
                src="/egor.webp"
                alt="AV specialist"
                width={200}
                height={260}
                className="w-full md:w-[200px] h-full md:h-[260px] object-cover object-top"
              />
            </div>

            {/* Right: text + CTA */}
            <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
              {/* Badge */}
              <span
                className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase border"
                style={{ color: accent, borderColor: `${accent}40`, background: `${accent}12` }}
              >
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                AV Production Specialist
              </span>

              <div className="flex flex-col gap-2">
                <h3
                  id="callpopup-title"
                  className="text-[20px] md:text-[22px] font-extrabold text-white leading-tight tracking-[-0.01em]"
                >
                  Need help with your event?
                </h3>
                <p className="text-[13px] text-white/55 leading-relaxed">
                  Talk to a real AV expert right now. We'll help you pick the right setup for your event.
                </p>
              </div>

              {/* CTA */}
              <a
                href={PHONE_TEL}
                suppressHydrationWarning
                onClick={dismiss}
                className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-white font-extrabold text-[15px] tracking-[0.01em] transition-all active:scale-95 hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, ${accentDeep} 100%)`,
                  boxShadow: ctaShadow,
                }}
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Now</span>
                <span suppressHydrationWarning className="opacity-85">{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
