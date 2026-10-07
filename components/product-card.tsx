"use client"

import Image from "next/image"
import Link from "next/link"
import { type Product, useCart } from "@/lib/cart-context"
import { CheckCircle2, ShoppingCart, ArrowRight, Star, Eye } from "lucide-react"
import { Icon3D, type Icon3DName } from "@/components/icon-3d"

// Consistent number formatting to avoid hydration mismatch
export function formatPrice(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function DiscountRibbon({ discount }: { discount: number }) {
  return (
    <div className="pointer-events-none absolute -right-[2px] top-4 z-20">
      <div
        className="relative px-3 py-1.5 text-[12px] font-black tracking-wide text-white uppercase"
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

function Fee({ icon, label, amount }: { icon: Icon3DName; label: string; amount: number }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-[#FFF1F5] py-1.5 pl-1.5 pr-2.5 ring-1 ring-[#FFD6E3]">
      <Icon3D name={icon} size={32} className="shrink-0" />
      <span className="min-w-0 leading-tight">
        <span className="block text-[12px] font-semibold text-[#5B5368]">{label}</span>
        <span className="block text-[15px] font-extrabold tabular-nums text-[#120B1A]">${formatPrice(amount)}</span>
      </span>
    </div>
  )
}

/**
 * Product tile on a white .sheet: dark ink on white reads on any phone, and the
 * neutral surface works with product photos shot on any background. The whole card
 * is one link (stretched title link); only the quote buttons sit above it.
 */
export function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart()

  const savings = product.originalPrice - product.price
  const badge = product.dimensions.split("(")[0].trim()
  const href = `/shop/products/${product.slug}`

  const addToQuote = () => {
    addItem(product)
    openCart()
  }

  return (
    <article className="sheet keep-original group relative flex h-full flex-col overflow-hidden rounded-[22px] transition-[translate,box-shadow] duration-300 focus-within:ring-2 focus-within:ring-[#FF2D6F]/60 hover:-translate-y-1 hover:shadow-[0_30px_60px_-24px_rgba(255,45,111,0.55)]">
      {product.discount > 0 && <DiscountRibbon discount={product.discount} />}

      {product.featured && (
        <div className="pointer-events-none absolute top-4 left-4 z-20">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider"
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

      <div className="relative aspect-[4/3] overflow-hidden bg-[#F1ECF4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {badge && (
          <span className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-black/70 px-2.5 py-1 text-[12px] font-bold text-white backdrop-blur-md">
            {badge}
          </span>
        )}
        <span className="absolute inset-0 hidden items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100 md:flex">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold text-white"
            style={{ background: "rgba(255,45,111,0.92)", boxShadow: "0 8px 24px rgba(255,45,111,0.5)" }}
          >
            <Eye className="w-4 h-4" />
            View details
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-[18px] font-extrabold leading-snug tracking-[-0.01em] text-[#120B1A] transition-colors group-hover:text-[#C8124F]">
          {/* Stretched link: the whole card opens the product page. */}
          <Link href={href} className="outline-none after:absolute after:inset-0 after:z-[1] after:content-['']">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[#4A4356]">{product.description}</p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="inline-flex items-center gap-1 rounded-full bg-[#F5F0F8] px-2.5 py-1 text-[12.5px] font-semibold text-[#3B3446]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#E0245E]" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Price + actions pinned to bottom */}
        <div className="mt-auto pt-5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[30px] font-black leading-none tracking-[-0.02em] text-[#120B1A]">${formatPrice(product.price)}</span>
            <span className="text-[15px] font-semibold text-[#5B5368]">/ 24h</span>
          </div>
          {/* Reserve the line so cards without a discount stay the same height */}
          <div className="mt-1.5 flex h-6 items-center gap-2">
            {product.discount > 0 && (
              <>
                <span className="text-[15px] font-medium text-[#6B6475] line-through">${formatPrice(product.originalPrice)}</span>
                <span className="text-[14px] font-extrabold text-[#C8124F]">You save ${formatPrice(savings)}</span>
              </>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Fee icon="delivery-truck" label="Delivery" amount={product.deliveryFee} />
            <Fee icon="setup-tools" label="Setup" amount={product.installationFee} />
          </div>

          <div className="relative z-[2] mt-4 flex gap-2">
            <button
              type="button"
              onClick={addToQuote}
              className="cta-pink flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-extrabold"
              style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" }}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Quote
            </button>
            <Link
              href={href}
              tabIndex={-1}
              aria-hidden
              className="grid w-12 place-items-center rounded-xl bg-[#F1ECF4] text-[#120B1A] transition-colors hover:bg-[#E7DEEE]"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
