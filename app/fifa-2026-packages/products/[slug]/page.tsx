"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductBySlug, products } from "@/lib/products-data"
import { useCart } from "@/lib/cart-context"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Minus,
  Package,
  Plus,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  Wrench,
  Zap,
  Calendar,
  Phone,
  Eye,
  Monitor,
  Sun,
  RefreshCw,
  Activity,
  Timer,
} from "lucide-react"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

export default function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params)
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const { addItem, items } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [rentalDays, setRentalDays] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const isInCart = items.some((item) => item.product.id === product.id)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product, quantity, rentalDays)
    setTimeout(() => setIsAdding(false), 1500)
  }

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

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 85% 0%, rgba(60,172,59,0.20) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 0% 25%, rgba(42,57,141,0.28) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 110%, rgba(230,29,37,0.12) 0%, transparent 60%), linear-gradient(180deg, #060A18 0%, #0A0F1F 50%, #060A18 100%)",
          }}
        />
      </div>

      {/* Tricolor stripe */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #3CAC3B 0% 33.33%, #E61D25 33.33% 66.66%, #2A398D 66.66% 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] mb-8">
          <Link href="/fifa-2026-packages" className="text-white/75 hover:text-white transition-colors">
            FIFA 2026 Packages
          </Link>
          <span className="text-white/50">/</span>
          <Link href="/fifa-2026-packages#products" className="text-white/75 hover:text-white transition-colors">
            LED Screens
          </Link>
          <span className="text-white/50">/</span>
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
              {/* Discount ribbon */}
              {product.discount > 0 && (
                <div className="absolute -right-[2px] top-6 z-20">
                  <div
                    className="relative px-4 py-2 text-[13px] font-black tracking-wide text-white uppercase"
                    style={{
                      background: "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)",
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px 50%)",
                      boxShadow: "0 6px 20px rgba(230, 29, 37, 0.6)",
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
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

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
                    style={{ background: "rgba(91,194,90,0.15)" }}
                  >
                    <Icon className="w-5 h-5 text-[#5BC25A]" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-white">{title}</div>
                    <div className="text-[11px] text-white/75">{desc}</div>
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
                  style={{ background: "rgba(91,194,90,0.15)", color: "#7ED77D" }}
                >
                  {product.dimensions}
                </span>
                {product.inStock && (
                  <span
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: "rgba(91,194,90,0.15)", color: "#5BC25A" }}
                  >
                    In Stock
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{product.name}</h1>
              <p className="text-white/85 text-[15px] leading-relaxed">{product.description}</p>
            </div>

            {/* Pricing */}
            <div
              className="p-5 rounded-2xl mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(91,194,90,0.10) 0%, rgba(60,172,59,0.05) 100%)",
                border: "1px solid rgba(91,194,90,0.20)",
              }}
            >
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-[13px] text-white/75 mb-1">Rental Price</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">${product.price.toLocaleString()}</span>
                    <span className="text-white/65">/ 24h</span>
                  </div>
                  {product.discount > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[14px] text-white/65 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-[12px] font-bold text-[#5BC25A]">
                        Save ${(product.originalPrice - product.price).toLocaleString()}/day
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity & Days */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[12px] text-white/75 mb-2 block">Quantity</label>
                  <div
                    className="flex items-center justify-between p-2 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white/85 hover:bg-white/10 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white/85 hover:bg-white/10 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[12px] text-white/75 mb-2 block">Rental Days</label>
                  <div
                    className="flex items-center justify-between p-2 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    <button
                      onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white/85 hover:bg-white/10 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-bold text-white">{rentalDays}</span>
                    <button
                      onClick={() => setRentalDays(rentalDays + 1)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white/85 hover:bg-white/10 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/75">
                    Rental ({quantity} x {rentalDays} days)
                  </span>
                  <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/75">Delivery ({quantity} unit)</span>
                  <span className="text-white">${deliveryTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/75">Setup & Installation</span>
                  <span className="text-white">${installationTotal.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#5BC25A]">You Save</span>
                    <span className="text-[#5BC25A] font-bold">-${savings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-white">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-[15px] font-bold transition-all hover:-translate-y-0.5 disabled:opacity-70"
                style={{
                  background: isInCart
                    ? "linear-gradient(135deg, #5BC25A 0%, #3CAC3B 100%)"
                    : "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)",
                  color: "#fff",
                  boxShadow: isInCart
                    ? "0 12px 32px -8px rgba(91,194,90,0.6)"
                    : "0 12px 32px -8px rgba(230,29,37,0.6)",
                }}
              >
                {isAdding ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 animate-bounce" />
                    Added to Cart!
                  </>
                ) : isInCart ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Update Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <Link
                href="/fifa-2026-packages/cart"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[14px] font-bold text-white transition-all hover:bg-white/10"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <ArrowRight className="w-5 h-5" />
                Checkout
              </Link>
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
                        <Icon className="w-4 h-4 text-[#5BC25A]" />
                        <span className="text-[11px] text-white/75 uppercase tracking-wider">
                          {specLabels[key]}
                        </span>
                      </div>
                      <span className="text-[14px] font-bold text-white">{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* What's Included */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">What&apos;s Included</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[13px] text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#5BC25A] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/fifa-2026-packages/products/${p.slug}`}
                  className="group rounded-xl overflow-hidden transition-all hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="relative aspect-video">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-white mb-1 group-hover:text-[#FF2D6F] transition-colors">
                      {p.name}
                    </h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-white">${p.price.toLocaleString()}</span>
                      <span className="text-[12px] text-white/65">/ 24h</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Back button */}
        <div className="mt-12">
          <Link
            href="/fifa-2026-packages"
            className="inline-flex items-center gap-2 text-[14px] text-white/85 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to FIFA 2026 Packages
          </Link>
        </div>
      </div>
    </div>
  )
}
