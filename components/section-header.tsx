import type React from "react"

/**
 * The site's section heading: gold .ds-pill eyebrow, extrabold H2 with one
 * .ds-accent-text phrase, optional lede. Used by the homepage blocks so every
 * section speaks with the same hierarchy.
 */
export function SectionHeader({
  eyebrow,
  title,
  accent,
  children,
  align = "center",
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string
  /** Full title text. */
  title: string
  /** Substring of title rendered in the accent gradient. */
  accent?: string
  /** Lede paragraph(s). */
  children?: React.ReactNode
  align?: "center" | "left"
  className?: string
  as?: "h2" | "h3"
}) {
  const centered = align === "center"
  let heading: React.ReactNode = title
  if (accent && title.includes(accent)) {
    const i = title.indexOf(accent)
    heading = (
      <>
        {title.slice(0, i)}
        <span className="ds-accent-text">{accent}</span>
        {/* Punctuation hugs the italic accent (its padding would leave a gap). */}
        {(() => {
          const rest = title.slice(i + accent.length)
          const m = rest.match(/^[,.:;!?]/)
          return m ? (
            <>
              <span className="-ml-[0.12em]">{m[0]}</span>
              {rest.slice(1)}
            </>
          ) : (
            rest
          )
        })()}
      </>
    )
  }
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} mb-10 md:mb-12 ${className}`}>
      {eyebrow && (
        <span className="ds-pill mb-5">
          <span className="dot" />
          {eyebrow}
        </span>
      )}
      <Tag className="text-balance text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white md:text-[42px]">{heading}</Tag>
      {children && <div className={`mt-4 text-pretty text-[15px] leading-relaxed text-white/60 md:text-[17px] ${centered ? "mx-auto max-w-[680px]" : "max-w-[680px]"}`}>{children}</div>}
    </div>
  )
}

/** Primary quote CTA with the copy-deck microcopy, centred under a block. */
export function QuoteCTA({ label = "Get your custom quote", microcopy = "Quote in 30 minutes · No obligation", className = "" }: { label?: string; microcopy?: string; className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <button
        type="button"
        onClick={() => document.dispatchEvent(new CustomEvent("openQuoteForm"))}
        className="group inline-flex flex-col items-center justify-center gap-0.5 rounded-xl bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] px-8 py-3 text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
        style={{ boxShadow: "0 12px 36px -8px rgba(255, 45, 111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)" }}
      >
        <span className="inline-flex items-center gap-2.5 text-[15px] font-extrabold tracking-[0.01em]">
          {label}
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
        <span className="text-[11px] font-semibold tracking-[0.01em] text-white/85">{microcopy}</span>
      </button>
    </div>
  )
}
