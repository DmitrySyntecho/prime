"use client"

import { useState, use, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductBySlug, CATEGORY_LABEL } from "@/lib/products-data"
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Phone,
  Eye,
  Monitor,
  Sun,
  RefreshCw,
  Activity,
  Timer,
} from "lucide-react"
import { Icon3D, type Icon3DName } from "@/components/icon-3d"
import { PriceBreakdown } from "@/components/price-breakdown"
import { FrequentlyTogether } from "@/components/frequently-together"
import { RecentlyViewed, recordRecentlyViewed } from "@/components/recently-viewed"
import { useCart } from "@/lib/cart-context"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

// Consistent number formatting to avoid hydration mismatch
function formatPrice(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

function Stepper({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <span className="mb-2 block text-[14px] font-bold text-[#3B3446]">{label}</span>
      <div className="flex items-center justify-between rounded-2xl bg-[#F5F1F8] p-1.5 ring-1 ring-[#E9E2EE]">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          aria-label={`Decrease ${label.toLowerCase()}`}
          className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#120B1A] shadow-sm transition-colors hover:bg-[#FFE8F0]"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="text-[22px] font-extrabold tabular-nums text-[#120B1A]">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          aria-label={`Increase ${label.toLowerCase()}`}
          className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#120B1A] shadow-sm transition-colors hover:bg-[#FFE8F0]"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function ShopProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params)
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const [quantity, setQuantity] = useState(1)
  const [rentalDays, setRentalDays] = useState(1)
  const { addItem, openCart } = useCart()

  // remember this product for the "Recently Viewed" rail
  useEffect(() => {
    if (product) recordRecentlyViewed(product.slug)
  }, [product?.slug])

  const addToQuote = () => {
    addItem(product, quantity, rentalDays)
    openCart()
  }
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image]
  const [activeImage, setActiveImage] = useState(gallery[0])

  const subtotal = product.price * quantity * rentalDays
  const savings = (product.originalPrice - product.price) * quantity * rentalDays
  const deliveryTotal = product.deliveryFee * quantity
  const installationTotal = product.installationFee * quantity
  const total = subtotal + deliveryTotal + installationTotal

  const specIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    pixelPitch: Monitor,
    resolution: Eye,
    brightness: Sun,
    refreshRate: RefreshCw,
    viewingAngle: Activity,
    lifespan: Timer,
  }

  const specLabels: Record<string, string> = {
    pixelPitch: "Pixel Pitch",
    resolution: "Resolution",
    brightness: "Brightness",
    refreshRate: "Refresh Rate",
    viewingAngle: "Viewing Angle",
    lifespan: "Lifespan",
  }
  const labelFor = (key: string) =>
    specLabels[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())
  const hasSpecs = Object.keys(product.specs || {}).length > 0

  return (
    <>
      <div className="relative min-h-screen">
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-medium md:mb-8">
          <Link href="/shop" className="text-white/85 underline-offset-4 hover:text-white hover:underline">
            Shop
          </Link>
          <span className="text-white/50">/</span>
          <Link href={`/shop?category=${product.category}`} className="text-white/85 underline-offset-4 hover:text-white hover:underline">
            {CATEGORY_LABEL[product.category]}
          </Link>
          <span className="text-white/50">/</span>
          <span className="font-semibold text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Image */}
          <div className="space-y-4">
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              {product.discount > 0 && (
                <div className="absolute -right-[2px] top-6 z-20">
                  <div
                    className="relative px-4 py-2 text-[13px] font-black tracking-wide text-white uppercase"
                    style={{
                      background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px 50%)",
                      boxShadow: "0 6px 20px rgba(255, 45, 111, 0.6)",
                    }}
                  >
                    -{product.discount}% OFF
                  </div>
                </div>
              )}

              {product.featured && (
                <div className="absolute top-6 left-6 z-20">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-extrabold uppercase tracking-wider"
                    style={{
                      background: "linear-gradient(135deg, #FFD24A 0%, #FF9500 100%)",
                      color: "#000",
                      boxShadow: "0 6px 16px rgba(255,210,74,0.5)",
                    }}
                  >
                    <Star className="w-3.5 h-3.5" fill="currentColor" />
                    Best Seller
                  </span>
                </div>
              )}

              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Gallery thumbnails */}
            {gallery.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {gallery.slice(0, 8).map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    aria-label={`Show photo ${i + 1}`}
                    className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all"
                    style={{
                      border: `2px solid ${activeImage === img ? "#FF2D6F" : "rgba(255,255,255,0.18)"}`,
                    }}
                  >
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              {([
                { icon: "shield", title: "Full Insurance", desc: "Coverage included" },
                { icon: "delivery-truck", title: "White-Glove Delivery", desc: "Professional setup" },
                { icon: "headset", title: "24/7 Support", desc: "On-call technicians" },
                { icon: "stopwatch", title: "Same-Day Setup", desc: "Quick turnaround" },
              ] as { icon: Icon3DName; title: string; desc: string }[]).map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-xl p-3"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <Icon3D name={icon} size={48} className="flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
                  <div>
                    <div className="text-[15px] font-bold text-white">{title}</div>
                    <div className="text-[13.5px] text-white/80">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details — one white sheet, dark ink */}
          <div className="sheet keep-original self-start rounded-[24px] p-5 sm:p-7">
            <div className="mb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-[#FFE8F0] px-2.5 py-1 text-[12px] font-extrabold uppercase tracking-wider text-[#C8124F]">
                  {product.dimensions}
                </span>
                {product.inStock && (
                  <span className="rounded-lg bg-[#FFF4D6] px-2.5 py-1 text-[12px] font-extrabold uppercase tracking-wider text-[#8A5A00]">In Stock</span>
                )}
              </div>
              <h1 className="mb-3 text-[28px] font-black leading-[1.15] tracking-[-0.02em] text-[#120B1A] md:text-[36px]">{product.name}</h1>
              <p className="text-[16px] leading-relaxed text-[#3B3446]">{product.description}</p>
            </div>

            {/* Pricing */}
            <div className="mb-6 rounded-[20px] bg-white p-4 ring-1 ring-[#EFE7F3] sm:p-5">
              <div className="mb-5">
                <div className="mb-1 text-[14px] font-bold text-[#5B5368]">Rental price</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[40px] font-black leading-none tracking-[-0.02em] text-[#120B1A]">${formatPrice(product.price)}</span>
                  <span className="text-[16px] font-semibold text-[#5B5368]">/ 24h</span>
                </div>
                {product.discount > 0 && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="text-[16px] font-medium text-[#6B6475] line-through">${formatPrice(product.originalPrice)}</span>
                    <span className="rounded-md bg-[#FFE8F0] px-2 py-0.5 text-[14px] font-extrabold text-[#C8124F]">
                      You save ${formatPrice(product.originalPrice - product.price)} per day
                    </span>
                  </div>
                )}
              </div>

              {/* Quantity & Days */}
              <div className="mb-5 grid grid-cols-2 gap-3 sm:gap-4">
                <Stepper label="Quantity" value={quantity} onChange={setQuantity} />
                <Stepper label="Rental days" value={rentalDays} onChange={setRentalDays} />
              </div>

              {/* Cost breakdown */}
              <PriceBreakdown
                tone="light"
                total={total}
                rows={[
                  { kind: "rental", label: "Rental", detail: `${plural(quantity, "unit", "units")} × ${plural(rentalDays, "day", "days")}`, amount: subtotal },
                  { kind: "delivery", label: "Delivery", detail: plural(quantity, "unit", "units"), amount: deliveryTotal },
                  { kind: "setup", label: "Setup & installation", detail: "By our own crew", amount: installationTotal },
                  ...(savings > 0 ? [{ kind: "savings" as const, label: "You save", detail: `${product.discount}% off the regular price`, amount: savings }] : []),
                ]}
              />
            </div>

            {/* Action buttons */}
            <div className="mb-6 flex gap-3">
              <button
                type="button"
                onClick={addToQuote}
                className="cta-pink flex flex-1 items-center justify-center gap-3 rounded-xl py-4 text-[17px] font-extrabold"
                style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" }}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Quote
              </button>
            </div>

            {/* Contact */}
            <a
              href={PHONE_TEL}
              className="mb-8 flex items-center gap-4 rounded-2xl bg-[#FFF6DA] p-4 ring-1 ring-[#F7DD8C] transition-colors hover:bg-[#FFF0C2]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#FFD24A] text-[#120B1A]">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[15px] font-bold text-[#120B1A]">Need help? Call us</span>
                <span suppressHydrationWarning className="block text-[18px] font-extrabold tabular-nums text-[#C8124F]">
                  {PHONE_DISPLAY}
                </span>
              </span>
            </a>

            {/* Technical Specs */}
            {hasSpecs && (
              <div className="mb-8">
                <h3 className="mb-4 text-[20px] font-extrabold text-[#120B1A]">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {Object.entries(product.specs).map(([key, value]) => {
                    const Icon = specIcons[key] || Monitor
                    return (
                      <div key={key} className="rounded-xl bg-[#F5F1F8] p-3 ring-1 ring-[#EFE7F3]">
                        <div className="mb-1 flex items-center gap-2">
                          <Icon className="h-4 w-4 shrink-0 text-[#E0245E]" />
                          <span className="text-[12px] font-bold uppercase tracking-wider text-[#5B5368]">{labelFor(key)}</span>
                        </div>
                        <span className="text-[16px] font-extrabold text-[#120B1A]">{value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* What's Included */}
            <div>
              <h3 className="mb-4 text-[20px] font-extrabold text-[#120B1A]">{"What's Included"}</h3>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium leading-snug text-[#2A2433]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E0245E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Frequently ordered together (cross-category) */}
        <FrequentlyTogether category={product.category} excludeId={product.id} />

        {/* Recently viewed */}
        <RecentlyViewed excludeSlug={product.slug} />

        {/* Back button */}
        <div className="mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-white/85 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
      </div>
    </>
  )
}
