"use client"

import Link from "next/link"
import { getProductsByTier, getProductsByCategory, CATEGORY_LABEL } from "@/lib/products-data"
import { FILTER_META } from "@/lib/product-filters"
import type { Product, ProductCategory } from "@/lib/cart-context"
import { ProductCarousel } from "@/components/product-carousel"
import { NeedHelpBanner } from "@/components/need-help-banner"
import { Package, ArrowRight, Layers, Crown, Monitor, Sun, Circle, Square, type LucideIcon } from "lucide-react"

interface Lane {
  title: string
  blurb: string
  Icon: LucideIcon
  items: Product[]
}

const TIERS = [
  { key: "basic" as const, title: "Basic Packages", blurb: "Reliable, budget-friendly setups for everyday events.", Icon: Layers },
  { key: "premium" as const, title: "Premium Packages", blurb: "Top-tier, large-format gear for flagship productions.", Icon: Crown },
]

// Stage is grouped by stage TYPE instead of tier, so customers can quickly find
// the right kind (with LED screen, outdoor, portable, round, platform kit).
const STAGE_GROUPS: Record<string, { title: string; blurb: string; Icon: LucideIcon }> = {
  led: { title: "Stages + LED Screen", blurb: "Stage decks paired with an LED video wall backdrop.", Icon: Monitor },
  outdoor: { title: "Outdoor Stages", blurb: "Weather-ready stages for outdoor events & festivals.", Icon: Sun },
  portable: { title: "Portable Stages", blurb: "Quick-deploy modular stages, risers & backdrops.", Icon: Layers },
  round: { title: "Round Stages", blurb: "Circular stages for in-the-round setups.", Icon: Circle },
  "platform-kit": { title: "Platform Kits", blurb: "Compact deck kits for risers & podiums.", Icon: Square },
}

function buildLanes(category: ProductCategory): Lane[] {
  const all = getProductsByCategory(category)

  if (category === "stage") {
    const lanes: Lane[] = []
    const used = new Set<string>()
    for (const key of FILTER_META.stageType.order) {
      const meta = STAGE_GROUPS[key]
      if (!meta) continue
      const items = all.filter((p) => p.filters?.stageType === key).sort((a, b) => b.price - a.price)
      if (items.length) {
        items.forEach((i) => used.add(i.id))
        lanes.push({ ...meta, items })
      }
    }
    const other = all.filter((p) => !used.has(p.id)).sort((a, b) => b.price - a.price)
    if (other.length) lanes.push({ title: "More Stage Equipment", blurb: "Additional staging & AV gear.", Icon: Package, items: other })
    return lanes
  }

  return TIERS.map((t) => ({ title: t.title, blurb: t.blurb, Icon: t.Icon, items: getProductsByTier(category, t.key) }))
    .filter((l) => l.items.length)
}

export function CategoryProductsShowcase({ category }: { category: ProductCategory }) {
  const all = getProductsByCategory(category)
  if (all.length === 0) return null
  const label = CATEGORY_LABEL[category]
  const lanes = buildLanes(category)
  const subtitle =
    category === "stage"
      ? "Browse by stage type — with LED screen, outdoor, portable, round and platform kits."
      : "Browse our full range by tier — from essential setups to flagship production-grade systems."

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{
              background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
              border: "1px solid rgba(255,94,58,0.25)",
              color: "#FFB366",
            }}
          >
            <Package className="w-3.5 h-3.5" />
            {all.length}+ Options Available
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Rent{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {label}
            </span>
          </h2>
          <p className="text-white/50 text-[15px] mt-3 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Lanes — stacked vertically */}
        <div className="space-y-16">
          {lanes.map(({ title, blurb, Icon, items }) => (
            <div key={title}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                  style={{ background: "rgba(255,45,111,0.14)" }}
                >
                  <Icon className="w-5 h-5 text-[#FF5E3A]" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">{title}</h3>
                  <p className="text-white/45 text-[13px]">{blurb}</p>
                </div>
                <span className="ml-auto text-[12px] text-white/40">{items.length} items</span>
              </div>

              <ProductCarousel products={items} />

              <NeedHelpBanner label={title.replace(/ Packages| Stages?| Kits?/i, "")} />
            </div>
          ))}
        </div>

        {/* Catalog CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-[14px] uppercase tracking-wide transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
              boxShadow: "0 12px 36px -8px rgba(255,45,111,0.5)",
            }}
          >
            Explore Full {label} Catalog
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
