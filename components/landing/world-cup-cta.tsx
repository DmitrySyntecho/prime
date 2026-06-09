"use client"

/**
 * Header CTA for the A/B landing — replaces "Get a Quote" on /lp routes.
 * Same footprint/height as the old button (px-4 py-2.5); a fixed-width text
 * window keeps it from resizing while the line vertically swaps through three
 * phrases: World Cup 2026 → June–July dates filling fast → Book your crew now.
 * Clicking opens the quote form (openQuoteForm event).
 */
export function WorldCupCTA({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] text-white font-extrabold transition-all hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
        boxShadow: "0 8px 22px -6px rgba(255,45,111,0.45), inset 0 1px 0 rgba(255,255,255,0.30)",
      }}
      aria-label="World Cup 2026 — book your crew now"
    >
      <span className="relative block h-[18px] w-[150px] overflow-hidden text-center tracking-[0.02em]">
        <span className="block will-change-transform" style={{ animation: "wcSwap 8s ease-in-out infinite" }}>
          <span className="block h-[18px] leading-[18px] whitespace-nowrap text-[13px]">World Cup 2026</span>
          <span className="block h-[18px] leading-[18px] whitespace-nowrap text-[10px]">June–July dates filling fast</span>
          <span className="block h-[18px] leading-[18px] whitespace-nowrap text-[12px]">Book your crew now</span>
          <span className="block h-[18px] leading-[18px] whitespace-nowrap text-[13px]">World Cup 2026</span>
        </span>
      </span>
      <style href="wc-swap-cta" precedence="default">{`
        @keyframes wcSwap {
          0%, 24%   { transform: translateY(0); }
          33%, 57%  { transform: translateY(-25%); }
          66%, 90%  { transform: translateY(-50%); }
          100%      { transform: translateY(-75%); }
        }
      `}</style>
    </button>
  )
}
