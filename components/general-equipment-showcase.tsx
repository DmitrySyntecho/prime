"use client"

import Link from "next/link"
import { CATEGORIES, getProductsByCategory } from "@/lib/products-data"
import { ProductCarousel } from "@/components/product-carousel"
import { NeedHelpBanner } from "@/components/need-help-banner"
import { Package, ArrowRight } from "lucide-react"

/**
 * Mixed product showcase for service pages that aren't tied to a single
 * product category (e.g. Full AV Production). Pulls the top items from every
 * category so the page still surfaces plenty of rentable gear.
 */
export function GeneralEquipmentShowcase({
  title = "Equipment We Bring",
  subtitle = "A selection of the gear we deploy on productions — all available to rent on its own, too.",
  perCategory = 3,
}: {
  title?: string
  subtitle?: string
  perCategory?: number
}) {
  // interleave top N priciest from each category for variety
  const buckets = CATEGORIES.map((c) =>
    getProductsByCategory(c.slug)
      .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.price - a.price)
      .slice(0, perCategory)
  )
  const items: typeof buckets[number] = []
  for (let i = 0; i < perCategory; i++) {
    for (const b of buckets) if (b[i]) items.push(b[i])
  }
  if (items.length === 0) return null

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold tracking-[0.16em] uppercase"
              style={{
                background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
                border: "1px solid rgba(255,94,58,0.25)",
                color: "#FFB366",
              }}
            >
              <Package className="w-3.5 h-3.5" />
              Rentable Equipment
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {title.split(" ").slice(0, -1).join(" ")}{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {title.split(" ").slice(-1)}
              </span>
            </h2>
            <p className="text-white/50 text-[15px] mt-3 max-w-xl">{subtitle}</p>
          </div>

          <Link
            href="/shop"
            className="cta-yellow inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all hover:-translate-y-0.5 self-start md:self-auto"
            style={{
              background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
            }}
          >
            View All in Shop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductCarousel products={items} intervalMs={3800} />

        <NeedHelpBanner label="Your Production" />
      </div>
    </section>
  )
}
