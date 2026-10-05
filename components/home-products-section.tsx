"use client"

import Link from "next/link"
import { products, getFeaturedProducts } from "@/lib/products-data"
import { ProductCarousel } from "@/components/product-carousel"
import { Package, ArrowRight } from "lucide-react"

export function HomeProductsSection() {
  // featured first, then fill with the most premium gear, deduped
  const featured = getFeaturedProducts()
  const rest = products
    .filter((p) => !featured.includes(p))
    .sort((a, b) => b.price - a.price)
  const items = [...featured, ...rest].slice(0, 12)

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
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
              Rent the Gear
            </span>
            <h2 className="text-[28px] sm:text-[34px] md:text-[42px] font-extrabold tracking-[-0.025em] leading-[1.1] text-white">
              Equipment Behind{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                The Work
              </span>
            </h2>
            <p className="text-white/50 text-[15px] mt-3 max-w-xl">
              The same LED walls, sound systems and stage gear from our productions — available to rent
              for your next event.
            </p>
          </div>

          <Link
            href="/shop"
            className="cta-yellow inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all hover:-translate-y-0.5 self-start md:self-auto"
            style={{
              background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
            }}
          >
            Shop All Equipment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductCarousel products={items} intervalMs={3800} />
      </div>
    </section>
  )
}
