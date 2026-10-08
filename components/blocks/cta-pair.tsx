"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { QuoteCTA } from "@/components/section-header"

const SECONDARY =
  "inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#FFD24A]/55 bg-[#FFD24A]/[0.08] px-6 py-4 text-[15px] font-bold text-[#FFD24A] backdrop-blur-md transition-[background-color,border-color,color] duration-200 hover:border-[#FFD24A] hover:bg-[#FFD24A]/[0.16] hover:text-[#FFE27A] sm:w-auto"

/**
 * Yellow "Get your custom quote" + the yellow-outline secondary button, as in the
 * hero. Without an href the secondary opens the quote form too.
 */
export function CtaPair({
  secondary,
  align = "center",
  className = "",
}: {
  secondary: { label: string; href?: string }
  align?: "center" | "left"
  className?: string
}) {
  return (
    <div className={`flex flex-col items-stretch gap-3 sm:flex-row sm:items-center ${align === "center" ? "sm:justify-center" : ""} ${className}`}>
      <QuoteCTA className="[&>button]:w-full sm:[&>button]:w-auto" />
      {secondary.href ? (
        <Link href={secondary.href} className={SECONDARY}>
          {secondary.label} <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <button type="button" onClick={() => document.dispatchEvent(new CustomEvent("openQuoteForm"))} className={SECONDARY}>
          {secondary.label} <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
