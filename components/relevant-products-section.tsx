"use client"

import Link from "next/link"
import { getProductsByCategory, CATEGORY_LABEL } from "@/lib/products-data"
import type { ProductCategory } from "@/lib/cart-context"
import { ProductCard } from "@/components/product-card"
import { Package, ArrowRight } from "lucide-react"

interface RelevantProductsSectionProps {
  category: ProductCategory
  /** how many cards to show */
  limit?: number
}

export function RelevantProductsSection({ category, limit = 3 }: RelevantProductsSectionProps) {
  const all = getProductsByCategory(category)
  if (all.length === 0) return null

  // featured first, then priciest — a representative top slice
  const items = [...all]
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.price - a.price)
    .slice(0, limit)

  const label = CATEGORY_LABEL[category]

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
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
              Available to Rent
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Featured{" "}
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
            <p className="text-white/50 text-[15px] mt-3 max-w-xl">
              Hand-picked equipment ready for your event. Browse the full catalog for every size and
              configuration.
            </p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
