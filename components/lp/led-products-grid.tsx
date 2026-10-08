"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { products, CATEGORY_FILTERS } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

// Every LED wall in the catalog, best sellers first.
export const LED_WALLS = products
  .filter((p) => p.category === "led-screens")
  .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.price - a.price)

// Facets that actually split the LED catalog (pixel pitch, screen size).
const FACETS = CATEGORY_FILTERS["led-screens"] ?? []
const FIRST = 6

/** All LED panels as a filterable grid: pitch + size chips with live counts. */
export function LedProductsGrid() {
  const [sel, setSel] = useState<Record<string, string | null>>({})
  const [expanded, setExpanded] = useState(false)

  const matches = (p: (typeof LED_WALLS)[number], skip?: string) => FACETS.every((f) => f.key === skip || !sel[f.key] || p.filters?.[f.key] === sel[f.key])
  const list = LED_WALLS.filter((p) => matches(p))
  const shown = expanded ? list : list.slice(0, FIRST)

  return (
    <div>
      <div className="reveal mb-8 space-y-3">
        {FACETS.map((f) => (
          <div key={f.key} className="sm:flex sm:items-center sm:justify-center sm:gap-2">
            {/* Phones: label above its swipeable chip row, so snapping never hides it */}
            <span className="mb-2 block text-[13px] font-bold uppercase tracking-[0.12em] text-white/80 sm:mb-0 sm:pr-1">{f.label}</span>
            <div
              role="group"
              aria-label={`Filter by ${f.label.toLowerCase()}`}
              className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
              style={{ scrollbarWidth: "none" }}
            >
            {[{ value: null as string | null, label: "All" }, ...f.options].map((o) => {
              const on = (sel[f.key] ?? null) === o.value
              const count = LED_WALLS.filter((p) => matches(p, f.key) && (!o.value || p.filters?.[f.key] === o.value)).length
              return (
                <button
                  key={o.label}
                  type="button"
                  aria-pressed={on}
                  disabled={!on && count === 0}
                  onClick={() => setSel((s) => ({ ...s, [f.key]: o.value }))}
                  className={`inline-flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] font-bold outline-none ring-[#FFD24A]/60 transition-[background-color,border-color,color,opacity] focus-visible:ring-2 disabled:opacity-40 ${
                    on ? "border-[#FF2D6F]/60 text-white" : "border-white/12 bg-white/[0.05] text-white/90 hover:border-white/30 hover:text-white"
                  }`}
                  style={on ? { background: "linear-gradient(135deg, rgba(255,45,111,0.28), rgba(255,94,58,0.14))" } : undefined}
                >
                  {o.label}
                  <span className={`rounded-full px-2 py-0.5 text-[12px] font-extrabold tabular-nums ${on ? "bg-white text-[#C8124F]" : "bg-white/10 text-white/85"}`}>{count}</span>
                </button>
              )
            })}
            </div>
          </div>
        ))}
      </div>

      <p className="mb-6 text-center text-[15px] font-semibold text-white/85" aria-live="polite">
        Showing {shown.length} of {list.length} LED walls
      </p>

      <div key={JSON.stringify(sel)} className="tab-swap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {!expanded && list.length > FIRST && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2.5 rounded-xl border border-[#FFD24A]/55 bg-[#FFD24A]/[0.08] px-7 py-4 text-[16px] font-bold text-[#FFD24A] transition-colors hover:border-[#FFD24A] hover:bg-[#FFD24A]/[0.16]"
          >
            Show all {list.length} LED walls <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
