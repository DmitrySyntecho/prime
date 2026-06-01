"use client"

import Link from "next/link"
import { getProductsByTier, getProductsByCategory, CATEGORY_LABEL } from "@/lib/products-data"
import type { ProductCategory } from "@/lib/cart-context"
import { ProductCarousel } from "@/components/product-carousel"
import { NeedHelpBanner } from "@/components/need-help-banner"
import { Package, ArrowRight, Layers, Crown } from "lucide-react"

const TIERS = [
  {
    key: "basic" as const,
    title: "Basic Packages",
    blurb: "Reliable, budget-friendly setups for everyday events.",
    Icon: Layers,
  },
  {
    key: "premium" as const,
    title: "Premium Packages",
    blurb: "Top-tier, large-format gear for flagship productions.",
    Icon: Crown,
  },
]

export function CategoryProductsShowcase({ category }: { category: ProductCategory }) {
  const all = getProductsByCategory(category)
  if (all.length === 0) return null
  const label = CATEGORY_LABEL[category]

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
          <p className="text-white/50 text-[15px] mt-3 max-w-2xl mx-auto">
            Browse our full range by tier — from essential setups to flagship production-grade systems.
          </p>
        </div>

        {/* Tier lanes — stacked vertically */}
        <div className="space-y-16">
          {TIERS.map(({ key, title, blurb, Icon }) => {
            const items = getProductsByTier(category, key)
            if (items.length === 0) return null
            return (
              <div key={key}>
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

                <NeedHelpBanner label={title.replace(" Packages", "")} />
              </div>
            )
          })}
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
