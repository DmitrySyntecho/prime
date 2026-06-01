"use client"

import { getComplementaryProducts } from "@/lib/products-data"
import type { ProductCategory } from "@/lib/cart-context"
import { ProductCarousel } from "@/components/product-carousel"
import { Sparkles } from "lucide-react"

interface FrequentlyTogetherProps {
  category: ProductCategory
  /** product to exclude (when shown on a product detail page) */
  excludeId?: string
  heading?: string
  subheading?: string
}

export function FrequentlyTogether({
  category,
  excludeId,
  heading = "Frequently Ordered Together",
  subheading = "Complete your setup — clients who rent this usually add these too.",
}: FrequentlyTogetherProps) {
  let items = getComplementaryProducts(category, 8)
  if (excludeId) items = items.filter((p) => p.id !== excludeId)
  if (items.length === 0) return null

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
            style={{ background: "rgba(255,210,74,0.14)" }}
          >
            <Sparkles className="w-5 h-5 text-[#FFD24A]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white">{heading}</h2>
            <p className="text-white/45 text-[14px]">{subheading}</p>
          </div>
        </div>

        <ProductCarousel products={items} intervalMs={4200} />
      </div>
    </section>
  )
}
