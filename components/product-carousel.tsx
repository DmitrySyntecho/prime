"use client"

import { useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/lib/cart-context"
import { ProductCard } from "@/components/product-card"

interface ProductCarouselProps {
  products: Product[]
  autoplay?: boolean
  intervalMs?: number
  /** card width on desktop */
  cardClassName?: string
}

export function ProductCarousel({
  products,
  autoplay = true,
  intervalMs = 3500,
  cardClassName = "w-[280px] sm:w-[320px]",
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  const scrollByCards = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (!autoplay || products.length <= 1) return
    const id = setInterval(() => {
      const el = scrollRef.current
      if (!el || pausedRef.current) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        el.scrollBy({ left: el.clientWidth * 0.5, behavior: "smooth" })
      }
    }, intervalMs)
    return () => clearInterval(id)
  }, [autoplay, intervalMs, products.length])

  if (products.length === 0) return null

  return (
    <div className="relative">
      <button
        onClick={() => scrollByCards("left")}
        className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white/[0.06] border border-white/[0.12] hover:bg-[#FF2D6F]/15 hover:border-[#FF2D6F]/40 rounded-xl p-2.5 backdrop-blur-md hidden md:block transition-all"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <div
        ref={scrollRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        className="flex gap-5 overflow-x-auto pb-4 px-1 md:px-10 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className={`flex-shrink-0 snap-start ${cardClassName}`}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollByCards("right")}
        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white/[0.06] border border-white/[0.12] hover:bg-[#FF2D6F]/15 hover:border-[#FF2D6F]/40 rounded-xl p-2.5 backdrop-blur-md hidden md:block transition-all"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  )
}
