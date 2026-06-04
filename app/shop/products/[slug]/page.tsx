"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductBySlug, CATEGORY_LABEL } from "@/lib/products-data"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Minus,
  Plus,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  Wrench,
  Zap,
  Phone,
  Eye,
  Monitor,
  Sun,
  RefreshCw,
  Activity,
  Timer,
} from "lucide-react"
import { FrequentlyTogether } from "@/components/frequently-together"
import { useCart } from "@/lib/cart-context"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

// Consistent number formatting to avoid hydration mismatch
function formatPrice(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
        <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 85% 0%, rgba(255,45,111,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 0% 25%, rgba(255,94,58,0.12) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,45,111,0.08) 0%, transparent 60%), linear-gradient(180deg, #060A18 0%, #0A0F1F 50%, #060A18 100%)",
            }}
          />
        </div>

      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] mb-8">
          <Link href="/shop" className="text-white/50 hover:text-white transition-colors">
            Shop
          </Link>
          <span className="text-white/30">/</span>
          <Link href="/shop" className="text-white/50 hover:text-white transition-colors">
            {CATEGORY_LABEL[product.category]}
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
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
                    onClick={() => setActiveImage(img)}
                    className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all"
                    style={{
                      border: `2px solid ${activeImage === img ? "#FF2D6F" : "rgba(255,255,255,0.12)"}`,
                    }}
                  >
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, title: "Full Insurance", desc: "Coverage included" },
                { icon: Truck, title: "White-Glove Delivery", desc: "Professional setup" },
                { icon: Zap, title: "24/7 Support", desc: "On-call technicians" },
                { icon: Clock, title: "Same-Day Setup", desc: "Quick turnaround" },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255,45,111,0.15)" }}
                  >
                    <Icon className="w-5 h-5 text-[#FF5E3A]" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-white">{title}</div>
                    <div className="text-[11px] text-white/50">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: "rgba(255,45,111,0.15)", color: "#FF5E3A" }}
                >
                  {product.dimensions}
                </span>
                {product.inStock && (
                  <span
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: "rgba(255,45,111,0.15)", color: "#FF5E3A" }}
                  >
                    In Stock
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{product.name}</h1>
              <p className="text-white/60 text-[15px] leading-relaxed">{product.description}</p>
            </div>

            {/* Pricing */}
            <div
              className="p-5 rounded-2xl mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(255,45,111,0.10) 0%, rgba(255,94,58,0.05) 100%)",
                border: "1px solid rgba(255,45,111,0.20)",
              }}
            >
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-[13px] text-white/50 mb-1">Rental Price</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">${formatPrice(product.price)}</span>
                    <span className="text-white/40">/ 24h</span>
                  </div>
                  {product.discount > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[14px] text-white/40 line-through">
                        ${formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-[12px] font-bold text-[#FF5E3A]">
                        Save ${formatPrice(product.originalPrice - product.price)}/day
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity & Days */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[12px] text-white/50 mb-2 block">Quantity</label>
                  <div
                    className="flex items-center justify-between p-2 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[12px] text-white/50 mb-2 block">Rental Days</label>
                  <div
                    className="flex items-center justify-between p-2 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    <button
                      onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-bold text-white">{rentalDays}</span>
                    <button
                      onClick={() => setRentalDays(rentalDays + 1)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">Rental ({quantity} x {rentalDays} days)</span>
                  <span className="text-white">${formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">Delivery ({quantity} unit)</span>
                  <span className="text-white">${formatPrice(deliveryTotal)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">Setup & Installation</span>
                  <span className="text-white">${formatPrice(installationTotal)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#FF5E3A]">You Save</span>
                    <span className="text-[#FF5E3A] font-bold">-${formatPrice(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-white">${formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={addToQuote}
                className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-[15px] font-bold transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                  color: "#fff",
                  boxShadow: "0 12px 32px -8px rgba(255,45,111,0.6)",
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Quote
              </button>
            </div>

            {/* Contact */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl mb-8"
              style={{
                background: "rgba(255,210,74,0.08)",
                border: "1px solid rgba(255,210,74,0.20)",
              }}
            >
              <Phone className="w-5 h-5 text-[#FFD24A]" />
              <div>
                <div className="text-[13px] font-bold text-white">Need help? Call us</div>
                <a href={PHONE_TEL} className="text-[14px] text-[#FFD24A] font-bold hover:underline">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Technical Specs */}
            {hasSpecs && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(product.specs).map(([key, value]) => {
                    const Icon = specIcons[key] || Monitor
                    return (
                      <div
                        key={key}
                        className="p-3 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4 text-[#FF5E3A]" />
                          <span className="text-[11px] text-white/50 uppercase tracking-wider">
                            {labelFor(key)}
                          </span>
                        </div>
                        <span className="text-[14px] font-bold text-white">{value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* What's Included */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">{"What's Included"}</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[13px] text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5E3A] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Frequently ordered together (cross-category) */}
        <FrequentlyTogether category={product.category} excludeId={product.id} />

        {/* Back button */}
        <div className="mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors"
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
