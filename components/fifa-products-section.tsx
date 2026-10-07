"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/products-data"
import { useCart, type Product } from "@/lib/cart-context"
import {
  Truck,
  Shield,
  Clock,
  Zap,
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  Star,
  Package,
  Wrench,
  Eye,
} from "lucide-react"

function DiscountRibbon({ discount }: { discount: number }) {
  return (
    <div className="absolute -right-[2px] top-4 z-20">
      <div
        className="relative px-3 py-1.5 text-[11px] font-black tracking-wide text-white uppercase"
        style={{
          background: "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%)",
          boxShadow: "0 4px 12px rgba(230, 29, 37, 0.5)",
        }}
      >
        -{discount}% OFF
      </div>
      {/* Triangle fold effect */}
      <div
        className="absolute -bottom-1 right-0 w-0 h-0"
        style={{
          borderLeft: "6px solid transparent",
          borderTop: "4px solid #8B0000",
        }}
      />
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const isInCart = items.some((item) => item.product.id === product.id)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product, 1, 1)
    setTimeout(() => setIsAdding(false), 1000)
  }

  const savings = product.originalPrice - product.price

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)",
      }}
    >
      {/* Discount Ribbon */}
      {product.discount > 0 && <DiscountRibbon discount={product.discount} />}

      {/* Featured Badge */}
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

      {/* Product Image */}
      <Link href={`/fifa-2026-packages/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)",
            }}
          />
          {/* Dimensions badge */}
          <div className="absolute bottom-3 left-3">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white/90 backdrop-blur-md"
              style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {product.dimensions.split("(")[0].trim()}
            </span>
          </div>
          {/* Quick View Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold text-white backdrop-blur-md transition-transform hover:scale-105"
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

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <Link href={`/fifa-2026-packages/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-[#FF2D6F] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Short description */}
        <p className="text-[13px] text-white/75 mb-4 line-clamp-2">
          {product.description.substring(0, 80)}...
        </p>

        {/* Features pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-white/90"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <CheckCircle2 className="w-2.5 h-2.5 text-[#5BC25A]" />
              {feature}
            </span>
          ))}
        </div>

        {/* Price section */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-[13px] text-white/65">/ 24h</span>
            </div>
            {product.discount > 0 && (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[13px] text-white/65 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
                <span className="text-[11px] font-bold text-[#5BC25A]">
                  Save ${savings.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Delivery & Installation info */}
        <div
          className="flex items-center gap-3 p-3 rounded-xl mb-4"
          style={{
            background: "rgba(91,194,90,0.08)",
            border: "1px solid rgba(91,194,90,0.15)",
          }}
        >
          <div className="flex items-center gap-1.5 text-[11px] text-white/90">
            <Truck className="w-3.5 h-3.5 text-[#5BC25A]" />
            <span>Delivery: ${product.deliveryFee}</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-1.5 text-[11px] text-white/90">
            <Wrench className="w-3.5 h-3.5 text-[#5BC25A]" />
            <span>Setup: ${product.installationFee}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold transition-all disabled:opacity-70"
            style={{
              background: isInCart
                ? "linear-gradient(135deg, #5BC25A 0%, #3CAC3B 100%)"
                : "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
              color: "#fff",
              boxShadow: isInCart
                ? "0 8px 20px -4px rgba(91,194,90,0.5)"
                : "0 8px 20px -4px rgba(255,45,111,0.5)",
            }}
          >
            {isAdding ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-bounce" />
                Added!
              </>
            ) : isInCart ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
          <Link
            href={`/fifa-2026-packages/products/${product.slug}`}
            className="flex items-center justify-center w-12 rounded-xl transition-all hover:bg-white/10"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <ArrowRight className="w-4 h-4 text-white/90" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function FifaProductsSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{
              background: "rgba(91,194,90,0.12)",
              border: "1px solid rgba(91,194,90,0.25)",
              color: "#7ED77D",
            }}
          >
            <Package className="w-3.5 h-3.5" />
            LED Wall Rentals
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Professional{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #5BC25A 0%, #3CAC3B 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              LED Screens
            </span>
          </h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Premium LED video walls available for rental. Perfect for FIFA World Cup watch parties,
            corporate events, and outdoor festivals.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { icon: Truck, text: "Free LA Delivery Over $5k" },
            { icon: Clock, text: "Same-Day Setup Available" },
            { icon: Shield, text: "Full Insurance Included" },
            { icon: Zap, text: "24/7 Technical Support" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-[13px] text-white/85">
              <Icon className="w-4 h-4 text-[#5BC25A]" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View Cart CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/fifa-2026-packages/cart"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-[14px] uppercase tracking-wide transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
              boxShadow: "0 12px 36px -8px rgba(255,45,111,0.5)",
            }}
          >
            <ShoppingCart className="w-5 h-5" />
            View Cart & Checkout
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
