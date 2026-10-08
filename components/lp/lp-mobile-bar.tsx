"use client"

import { ArrowRight, Phone } from "lucide-react"
import { PHONE_TEL } from "@/lib/contact"

/** Phones: always-visible Call / Get a quote bar (replaces the site's bottom nav on landings). */
export function LpMobileBar({ onQuote }: { onQuote: () => void }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 px-3 pt-3 backdrop-blur-xl md:hidden"
      style={{ background: "rgba(8, 6, 18, 0.9)", paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      <div className="flex gap-2.5">
        <a
          href={PHONE_TEL}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] py-3.5 text-[16px] font-bold text-white"
        >
          <Phone className="h-4 w-4" /> Call now
        </a>
        <button type="button" onClick={onQuote} className="cta-yellow flex flex-[1.5] items-center justify-center gap-2 rounded-xl py-3.5 text-[16px] font-extrabold">
          Get a quote <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
