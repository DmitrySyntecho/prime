"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  CreditCard,
  Lock,
  Minus,
  Package,
  Phone,
  Plus,
  Shield,
  ShoppingCart,
  Trash2,
  Truck,
  User,
  Mail,
  MapPin,
  Clock,
  Zap,
} from "lucide-react"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

// Consistent number formatting to avoid hydration mismatch
function formatPrice(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

type CheckoutStep = "cart" | "details" | "payment" | "confirmation"

export default function ShopCartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    updateRentalDays,
    clearCart,
    getSubtotal,
    getDeliveryTotal,
    getInstallationTotal,
    getSavings,
    getTotal,
  } = useCart()

  const [step, setStep] = useState<CheckoutStep>("cart")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    eventDate: "",
    eventTime: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmitOrder = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStep("confirmation")
    setIsSubmitting(false)
  }

  const bgGradient =
    "radial-gradient(ellipse 70% 50% at 85% 0%, rgba(60,172,59,0.20) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 0% 25%, rgba(42,57,141,0.28) 0%, transparent 60%), linear-gradient(180deg, #060A18 0%, #0A0F1F 50%, #060A18 100%)"

  const tricolorBar = (
    <div
      className="h-1 w-full"
      style={{
        background: "linear-gradient(90deg, #3CAC3B 0% 33.33%, #E61D25 33.33% 66.66%, #2A398D 66.66% 100%)",
      }}
    />
  )

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="relative min-h-screen">
        {tricolorBar}
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div
            className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <ShoppingCart className="w-10 h-10 text-white/30" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-white/50 mb-8">Browse our LED wall rentals and add items to your cart to get started.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)",
              boxShadow: "0 12px 32px -8px rgba(230,29,37,0.6)",
            }}
          >
            <Package className="w-5 h-5" />
            Browse LED Screens
          </Link>
        </div>
      </div>
    )
  }

  if (step === "confirmation") {
    return (
      <div className="relative min-h-screen">
        {tricolorBar}
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div
            className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: "rgba(91,194,90,0.15)" }}
          >
            <CheckCircle2 className="w-12 h-12 text-[#5BC25A]" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4">Order Confirmed!</h1>
          <p className="text-white/60 text-lg mb-8">
            Thank you for your order. Our team will contact you within 2 hours to confirm your rental details and
            schedule delivery.
          </p>

          <div
            className="p-6 rounded-2xl mb-8 text-left"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            <h3 className="text-lg font-bold text-white mb-4">What happens next?</h3>
            <div className="space-y-4">
              {[
                { icon: Phone, text: "Our team will call you to confirm order details" },
                { icon: Calendar, text: "We'll schedule delivery and setup time" },
                { icon: Truck, text: "White-glove delivery to your venue" },
                { icon: Zap, text: "24/7 support during your event" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(91,194,90,0.15)" }}
                  >
                    <Icon className="w-4 h-4 text-[#5BC25A]" />
                  </div>
                  <span className="text-[14px] text-white/70">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              onClick={() => clearCart()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #5BC25A 0%, #3CAC3B 100%)",
                boxShadow: "0 12px 32px -8px rgba(91,194,90,0.5)",
              }}
            >
              Back to Shop
            </Link>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <Phone className="w-5 h-5" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {tricolorBar}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] mb-8">
          <Link href="/shop" className="text-white/50 hover:text-white transition-colors">
            Shop
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">Cart & Checkout</span>
        </nav>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { key: "cart", label: "Cart", icon: ShoppingCart },
            { key: "details", label: "Details", icon: User },
            { key: "payment", label: "Confirm", icon: CreditCard },
          ].map(({ key, label, icon: Icon }, index) => {
            const stepOrder = ["cart", "details", "payment"]
            const isActive = step === key
            const isDone = stepOrder.indexOf(step) > stepOrder.indexOf(key)
            return (
              <div key={key} className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (key === "cart") setStep("cart")
                    else if (key === "details" && step !== "cart") setStep("details")
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold transition-all"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)"
                      : isDone
                      ? "rgba(91,194,90,0.15)"
                      : "rgba(255,255,255,0.05)",
                    color: isActive ? "#fff" : isDone ? "#5BC25A" : "rgba(255,255,255,0.4)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
                {index < 2 && <div className="w-8 h-px bg-white/20" />}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* STEP: Cart */}
            {step === "cart" && (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-white mb-6">Your Cart ({items.length} items)</h1>

                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex gap-4">
                      <Link
                        href={`/shop/products/${item.product.slug}`}
                        className="relative w-32 h-24 rounded-xl overflow-hidden flex-shrink-0"
                      >
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/shop/products/${item.product.slug}`}
                              className="font-bold text-white hover:text-[#FF2D6F] transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-[12px] text-white/50">{item.product.dimensions}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 rounded-lg text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-white/50 uppercase">Qty:</span>
                            <div
                              className="flex items-center rounded-lg overflow-hidden"
                              style={{ background: "rgba(255,255,255,0.06)" }}
                            >
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-white/60 hover:bg-white/10"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-[13px] font-bold text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-white/60 hover:bg-white/10"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-white/50 uppercase">Days:</span>
                            <div
                              className="flex items-center rounded-lg overflow-hidden"
                              style={{ background: "rgba(255,255,255,0.06)" }}
                            >
                              <button
                                onClick={() => updateRentalDays(item.product.id, item.rentalDays - 1)}
                                className="w-8 h-8 flex items-center justify-center text-white/60 hover:bg-white/10"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-[13px] font-bold text-white">{item.rentalDays}</span>
                              <button
                                onClick={() => updateRentalDays(item.product.id, item.rentalDays + 1)}
                                className="w-8 h-8 flex items-center justify-center text-white/60 hover:bg-white/10"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="ml-auto text-right">
                            <div className="text-lg font-bold text-white">
                              ${formatPrice(item.product.price * item.quantity * item.rentalDays)}
                            </div>
                            <div className="text-[11px] text-white/40">
                              ${formatPrice(item.product.price)} x {item.quantity} x {item.rentalDays}d
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setStep("details")}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-[15px] transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)",
                    boxShadow: "0 12px 32px -8px rgba(230,29,37,0.5)",
                  }}
                >
                  Continue to Details
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* STEP: Details */}
            {step === "details" && (
              <div>
                <h1 className="text-2xl font-bold text-white mb-6">Rental Details</h1>
                <div
                  className="p-6 rounded-2xl space-y-6"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#5BC25A]" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#5BC25A] focus:outline-none transition-colors"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#5BC25A] focus:outline-none transition-colors"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#5BC25A] focus:outline-none transition-colors"
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#5BC25A] focus:outline-none transition-colors"
                        required
                      />
                      <input
                        type="text"
                        name="company"
                        placeholder="Company (Optional)"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="md:col-span-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#5BC25A] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#5BC25A]" />
                      Delivery Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="address"
                        placeholder="Street Address *"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="md:col-span-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#5BC25A] focus:outline-none transition-colors"
                        required
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#5BC25A] focus:outline-none transition-colors"
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="state"
                          placeholder="State *"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#5BC25A] focus:outline-none transition-colors"
                          required
                        />
                        <input
                          type="text"
                          name="zip"
                          placeholder="ZIP *"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#5BC25A] focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#5BC25A]" />
                      Event Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#5BC25A] focus:outline-none transition-colors"
                        required
                      />
                      <input
                        type="time"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#5BC25A] focus:outline-none transition-colors"
                        required
                      />
                      <textarea
                        name="notes"
                        placeholder="Special instructions or notes (Optional)"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="md:col-span-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#5BC25A] focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep("cart")}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-bold transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={() => setStep("payment")}
                    disabled={!formData.firstName || !formData.email || !formData.phone || !formData.address}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-[15px] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{
                      background: "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)",
                      boxShadow: "0 12px 32px -8px rgba(230,29,37,0.5)",
                    }}
                  >
                    Review Order
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP: Confirm */}
            {step === "payment" && (
              <div>
                <h1 className="text-2xl font-bold text-white mb-6">Review & Confirm</h1>

                <div
                  className="p-6 rounded-2xl mb-6"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <h3 className="text-lg font-bold text-white mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-4">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{item.product.name}</div>
                          <div className="text-[12px] text-white/50">{item.quantity} x {item.rentalDays} days</div>
                        </div>
                        <div className="text-right font-bold text-white">
                          ${formatPrice(item.product.price * item.quantity * item.rentalDays)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="p-6 rounded-2xl mb-6"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <h3 className="text-lg font-bold text-white mb-4">Delivery Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-[14px]">
                    <div>
                      <div className="text-white/50 mb-1">Contact</div>
                      <div className="text-white">{formData.firstName} {formData.lastName}</div>
                      <div className="text-white/70">{formData.email}</div>
                      <div className="text-white/70">{formData.phone}</div>
                    </div>
                    <div>
                      <div className="text-white/50 mb-1">Delivery Address</div>
                      <div className="text-white">{formData.address}</div>
                      <div className="text-white/70">{formData.city}, {formData.state} {formData.zip}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-white/50 mb-1">Event Date & Time</div>
                      <div className="text-white">{formData.eventDate} at {formData.eventTime}</div>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl mb-6 flex items-start gap-3"
                  style={{ background: "rgba(255,210,74,0.08)", border: "1px solid rgba(255,210,74,0.20)" }}
                >
                  <Lock className="w-5 h-5 text-[#FFD24A] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[14px] font-bold text-white mb-1">Payment on Confirmation</div>
                    <div className="text-[13px] text-white/60">
                      Our team will contact you to confirm your order and process payment securely. No payment is
                      required now.
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep("details")}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-bold transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-[15px] transition-all hover:-translate-y-0.5 disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg, #5BC25A 0%, #3CAC3B 100%)",
                      boxShadow: "0 12px 32px -8px rgba(91,194,90,0.5)",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Confirm Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="p-6 rounded-2xl sticky top-24"
              style={{
                background: "linear-gradient(135deg, rgba(91,194,90,0.08) 0%, rgba(60,172,59,0.04) 100%)",
                border: "1px solid rgba(91,194,90,0.20)",
              }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>

              <div className="space-y-3 text-[14px] mb-6">
                <div className="flex justify-between">
                  <span className="text-white/60">Subtotal ({items.length} items)</span>
                  <span className="text-white">${formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Delivery</span>
                  <span className="text-white">${formatPrice(getDeliveryTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Installation</span>
                  <span className="text-white">${formatPrice(getInstallationTotal())}</span>
                </div>
                {getSavings() > 0 && (
                  <div className="flex justify-between text-[#5BC25A]">
                    <span>You Save</span>
                    <span className="font-bold">-${formatPrice(getSavings())}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-white/10 flex justify-between">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-lg font-bold text-white">${formatPrice(getTotal())}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                {[
                  { icon: Shield, text: "Full insurance coverage" },
                  { icon: Truck, text: "White-glove delivery" },
                  { icon: Clock, text: "On-time guarantee" },
                  { icon: Zap, text: "24/7 technical support" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-[12px] text-white/60">
                    <Icon className="w-4 h-4 text-[#5BC25A]" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-[12px] text-white/50 mb-2">Questions? Call us</div>
                <a
                  href={PHONE_TEL}
                  className="flex items-center gap-2 text-[14px] font-bold text-[#FFD24A] hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
