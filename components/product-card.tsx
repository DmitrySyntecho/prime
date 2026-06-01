"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/cart-context"
import { QuoteForm } from "@/components/quote-form"
import { CheckCircle2, ShoppingCart, ArrowRight, Star, Eye } from "lucide-react"
import { Truck, Wrench } from "lucide-react"

// Consistent number formatting to avoid hydration mismatch
export function formatPrice(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function DiscountRibbon({ discount }: { discount: number }) {
  return (
    <div className="absolute -right-[2px] top-4 z-20">
      <div
        className="relative px-3 py-1.5 text-[11px] font-black tracking-wide text-white uppercase"
        style={{
          background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%)",
          boxShadow: "0 4px 12px rgba(255,45,111,0.5)",
        }}
      >
        -{discount}% OFF
      </div>
      <div
        className="absolute -bottom-1 right-0 w-0 h-0"
        style={{
          borderLeft: "6px solid transparent",
          borderTop: "4px solid #C41F55",
        }}
      />
    </div>
  )
}

export function ProductCard({ product }: { product: Product }) {
  const [quoteOpen, setQuoteOpen] = useState(false)

  const savings = product.originalPrice - product.price
  const badge = product.dimensions.split("(")[0].trim()

  return (
    <>
      <div
        className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)",
        }}
      >
        {product.discount > 0 && <DiscountRibbon discount={product.discount} />}

        {product.featured && (
          <div className="absolute top-4 left-4 z-20">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: "linear-gradient(135deg, #FFD24A 0%, #FF9500 100%)",
                color: "#000",
                boxShadow: "0 4px 12px rgba(255,210,74,0.4)",
              }}
            >
              <Star className="w-3 h-3" fill="currentColor" />
              Best Seller
            </span>
          </div>
        )}

        <Link href={`/shop/products/${product.slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)",
              }}
            />
            {badge && (
              <div className="absolute bottom-3 left-3">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white/90 backdrop-blur-md"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {badge}
                </span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold text-white backdrop-blur-md"
                style={{
                  background: "rgba(255,45,111,0.9)",
                  boxShadow: "0 8px 24px rgba(255,45,111,0.5)",
                }}
              >
                <Eye className="w-4 h-4" />
                Quick View
              </span>
            </div>
          </div>
        </Link>

        <div className="p-5 flex flex-col flex-1">
          <Link href={`/shop/products/${product.slug}`}>
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-[#FF2D6F] transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-[13px] text-white/50 mb-4 line-clamp-2">
            {product.description.substring(0, 80)}...
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4 min-h-[28px]">
            {product.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-white/70"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-[#FF5E3A]" />
                {feature}
              </span>
            ))}
          </div>

          {/* Price + actions pinned to bottom */}
          <div className="mt-auto">
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">${formatPrice(product.price)}</span>
                <span className="text-[13px] text-white/40">/ 24h</span>
              </div>
              {/* Reserve space so cards without discount stay the same height */}
              <div className="h-5 mt-0.5">
                {product.discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-white/40 line-through">
                      ${formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-[11px] font-bold text-[#FF5E3A]">
                      Save ${formatPrice(savings)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-xl mb-4"
              style={{
                background: "rgba(255,94,58,0.08)",
                border: "1px solid rgba(255,94,58,0.18)",
              }}
            >
              <div
                className="flex items-center gap-1.5 text-[11px] font-semibold"
                style={{ color: "#FF8A5E" }}
              >
                <Truck className="w-3.5 h-3.5" style={{ color: "#FF5E3A" }} />
                <span>Delivery: ${product.deliveryFee}</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div
                className="flex items-center gap-1.5 text-[11px] font-semibold"
                style={{ color: "#FF8A5E" }}
              >
                <Wrench className="w-3.5 h-3.5" style={{ color: "#FF5E3A" }} />
                <span>Setup: ${product.installationFee}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setQuoteOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                  color: "#fff",
                  boxShadow: "0 8px 20px -4px rgba(255,45,111,0.5)",
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Quote
              </button>
              <Link
                href={`/shop/products/${product.slug}`}
                className="flex items-center justify-center w-12 rounded-xl transition-all hover:bg-white/10"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <ArrowRight className="w-4 h-4 text-white/70" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <QuoteForm isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} serviceName={product.name} />
    </>
  )
}
