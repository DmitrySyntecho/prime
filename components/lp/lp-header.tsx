"use client"

import Image from "next/image"
import { ArrowRight, Phone, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact"

/**
 * Landing header: same glass bar as the site header, but only in-page anchors,
 * the phone, the quote CTA and the quote cart. No menus, no links off the page.
 */
export function LpHeader({ nav, onQuote }: { nav: { label: string; href: string }[]; onQuote: () => void }) {
  const { itemCount, openCart } = useCart()
  return (
    <div className="sticky top-0 z-50">
      <header className="py-3">
        <div className="mx-auto max-w-7xl px-4">
          <div
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 px-4 py-3 backdrop-blur-md backdrop-saturate-150 sm:px-5"
            style={{ background: "rgba(10, 8, 24, 0.62)", boxShadow: "0 12px 36px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" }}
          >
            <a href="#top" aria-label="Prime Line AV, back to top" className="flex shrink-0 items-center">
              <Image src="/favicon.svg" alt="Prime Line AV" width={36} height={36} className="h-9 w-9 sm:hidden" />
              <span className="hidden items-center sm:flex">
                <Image src="/images/prime-line-av-logo-dark-bg.svg" alt="Prime Line AV" width={210} height={38} className="theme-logo-dark h-9 w-auto" />
                <Image src="/images/prime-line-av-logo-light-bg.svg" alt="Prime Line AV" width={210} height={38} className="theme-logo-light h-9 w-auto" />
              </span>
            </a>

            <nav aria-label="On this page" className="hidden items-center gap-0.5 lg:flex">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-[14px] font-bold text-white/85 transition-colors hover:bg-white/[0.06] hover:text-white">
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={PHONE_TEL}
                suppressHydrationWarning
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-white/[0.10] bg-white/[0.04] px-3 text-[14px] font-bold text-white/90 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <Phone className="h-4 w-4" />
                <span suppressHydrationWarning className="hidden xl:inline">
                  {PHONE_DISPLAY}
                </span>
              </a>
              <button
                type="button"
                onClick={onQuote}
                className="hidden items-center gap-2 rounded-[10px] px-4 py-2.5 text-[14px] font-extrabold tracking-[0.02em] text-white transition-transform hover:-translate-y-0.5 md:inline-flex"
                style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", boxShadow: "0 8px 22px -6px rgba(255,45,111,0.45), inset 0 1px 0 rgba(255,255,255,0.30)" }}
              >
                Get a Quote
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={openCart}
                aria-label="Open quote cart"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.10] bg-white/[0.04] text-white/90 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <ShoppingCart className="h-[18px] w-[18px]" />
                {itemCount > 0 && (
                  <span
                    className="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-extrabold text-white"
                    style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" }}
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
