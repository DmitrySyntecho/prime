"use client"

import { ArrowRight } from "lucide-react"
import { Icon3D } from "@/components/icon-3d"

export function NeedHelpBanner({ label }: { label?: string }) {
  const openQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl px-6 py-5 mt-6"
      style={{
        background: "linear-gradient(135deg, rgba(255,45,111,0.12) 0%, rgba(255,94,58,0.07) 100%)",
        border: "1px solid rgba(255,94,58,0.22)",
      }}
    >
      <div className="flex items-center gap-4 text-center sm:text-left">
        <Icon3D name="headset" size={56} className="hidden sm:block flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
        <div>
          <div className="text-white font-bold text-[16px] md:text-[18px]">
            Need Help Setting {label ? `Up ${label}` : "This Up"}? Hire Our AV Team.
          </div>
          <div className="text-white/80 text-[13px] mt-0.5">
            Delivery, professional install and on-site technicians — we handle everything.
          </div>
        </div>
      </div>

      <button
        onClick={openQuote}
        className="cta-yellow inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold uppercase tracking-wide whitespace-nowrap transition-all hover:-translate-y-0.5 flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
        }}
      >
        Get a Quote
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
