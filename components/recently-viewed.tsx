"use client"

import { useEffect, useState } from "react"
import { getProductBySlug } from "@/lib/products-data"
import type { Product } from "@/lib/cart-context"
import { ProductCarousel } from "@/components/product-carousel"
import { History } from "lucide-react"

const KEY = "recentlyViewed"

/** Record a product slug as recently viewed (call from the product page). */
export function recordRecentlyViewed(slug: string) {
  try {
    const arr: string[] = JSON.parse(localStorage.getItem(KEY) || "[]")
    const next = [slug, ...arr.filter((s) => s !== slug)].slice(0, 12)
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {}
}

export function RecentlyViewed({
  excludeSlug,
  heading = "Recently Viewed",
  subheading = "Pick up where you left off.",
}: {
  excludeSlug?: string
  heading?: string
  subheading?: string
}) {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    try {
      const arr: string[] = JSON.parse(localStorage.getItem(KEY) || "[]")
      const list = arr
        .filter((s) => s !== excludeSlug)
        .map((s) => getProductBySlug(s))
        .filter(Boolean) as Product[]
      setItems(list)
    } catch {}
  }, [excludeSlug])

  if (items.length === 0) return null

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
            style={{ background: "rgba(255,45,111,0.14)" }}
          >
            <History className="w-5 h-5 text-[#FF5E3A]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white">{heading}</h2>
            <p className="text-white/70 text-[14px]">{subheading}</p>
          </div>
        </div>

        <ProductCarousel products={items} intervalMs={5200} />
      </div>
    </section>
  )
}
