"use client"

import { ArrowRight, Phone } from "lucide-react"
import { PHONE_TEL } from "@/lib/contact"
import { usePastFirstBlock } from "@/lib/use-past-first-block"

/**
 * Phones: Call / Get a quote bar (replaces the site's bottom nav on landings).
 * Slides in only after the visitor scrolls past the middle of the hero.
 */
export function LpMobileBar({ onQuote }: { onQuote: () => void }) {
  const visible = usePastFirstBlock()
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 px-3 pt-3 backdrop-blur-xl transition-[translate,opacity] duration-300 ease-out md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{ background: "rgba(8, 6, 18, 0.9)", paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      <div className="flex gap-2.5">
        <a
          href={PHONE_TEL}
          tabIndex={visible ? undefined : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] py-3.5 text-[16px] font-bold text-white"
        >
          <Phone className="h-4 w-4" /> Call now
        </a>
        <button
          type="button"
          onClick={onQuote}
          tabIndex={visible ? undefined : -1}
          className="cta-yellow flex flex-[1.5] items-center justify-center gap-2 rounded-xl py-3.5 text-[16px] font-extrabold"
        >
          Get a quote <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
