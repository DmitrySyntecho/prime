"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import {
  ShoppingCart, Minus, Plus, Trash2, ArrowLeft, CheckCircle2, Loader2, ShieldCheck, Truck, Wrench,
} from "lucide-react"

function formatPrice(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl text-[14px] text-white bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-[#FF2D6F]/40 placeholder:text-white/30"

export default function CheckoutPage() {
  const { items, updateQuantity, updateRentalDays, removeItem, clearCart } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", company: "", eventAddress: "", eventDate: "", notes: "",
  })
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity * i.rentalDays, 0)
  const delivery = items.reduce((s, i) => s + i.product.deliveryFee * i.quantity, 0)
  const installation = items.reduce((s, i) => s + i.product.installationFee * i.quantity, 0)
  const savings = items.reduce((s, i) => s + (i.product.originalPrice - i.product.price) * i.quantity * i.rentalDays, 0)
  const total = subtotal + delivery + installation

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setDone(true); clearCart() }, 1400)
  }

  const tricolor = <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)" }} />

  if (done) {
    return (
      <div className="relative min-h-screen">
        {tricolor}
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full grid place-items-center" style={{ background: "rgba(60,172,59,0.15)" }}>
            <CheckCircle2 className="w-10 h-10 text-[#3CAC3B]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Quote Request Sent</h1>
          <p className="text-white/55 mb-8 max-w-md mx-auto">
            Thanks{form.firstName ? `, ${form.firstName}` : ""}! Our AV team will review your selection and get back to you with a tailored quote shortly.
          </p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold"
            style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" }}>
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="relative min-h-screen">
        {tricolor}
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full grid place-items-center" style={{ background: "rgba(255,255,255,0.05)" }}>
            <ShoppingCart className="w-9 h-9 text-white/30" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Your Cart is Empty</h1>
          <p className="text-white/50 mb-8">Add equipment to your quote, then come back to check out.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold"
            style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" }}>
            Browse Equipment
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {tricolor}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-[13px] mb-6">
          <Link href="/shop" className="text-white/50 hover:text-white transition-colors">Shop</Link>
          <span className="text-white/30">/</span>
          <span className="text-white">Checkout</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Left: details form */}
          <form onSubmit={submit} className="rounded-2xl p-6 space-y-5"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.10)" }}>
            <h2 className="text-lg font-bold text-white">Your Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className={inputCls} placeholder="First name *" required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
              <input className={inputCls} placeholder="Last name *" required value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
              <input type="email" className={inputCls} placeholder="Email *" required value={form.email} onChange={(e) => set("email", e.target.value)} />
              <input className={inputCls} placeholder="Phone *" required value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              <input className={inputCls} placeholder="Company" value={form.company} onChange={(e) => set("company", e.target.value)} />
              <input type="date" className={inputCls} placeholder="Event date" value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} />
            </div>
            <input className={inputCls} placeholder="Event address / venue" value={form.eventAddress} onChange={(e) => set("eventAddress", e.target.value)} />
            <textarea rows={3} className={inputCls} placeholder="Notes — anything we should know about your event" value={form.notes} onChange={(e) => set("notes", e.target.value)} />

            <div className="flex flex-wrap gap-4 text-[12px] text-white/45 pt-1">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#FF5E3A]" /> Fully insured</span>
              <span className="inline-flex items-center gap-1.5"><Truck className="w-4 h-4 text-[#FF5E3A]" /> Delivery & pickup</span>
              <span className="inline-flex items-center gap-1.5"><Wrench className="w-4 h-4 text-[#FF5E3A]" /> Pro setup</span>
            </div>

            <button type="submit" disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-[15px] transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", boxShadow: "0 12px 32px -8px rgba(255,45,111,0.6)" }}>
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              Request Quote
            </button>
            <p className="text-[11px] text-white/35 text-center">No payment now — we'll send a tailored quote to confirm.</p>
          </form>

          {/* Right: order summary */}
          <div className="rounded-2xl p-6 lg:sticky lg:top-24"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.10)" }}>
            <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
            <div className="space-y-4 max-h-[360px] overflow-y-auto shop-sidebar-scroll pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                    {item.product.image && <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="64px" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] font-semibold text-white leading-tight line-clamp-2">{item.product.name}</p>
                      <button onClick={() => removeItem(item.product.id)} className="text-white/40 hover:text-red-400 flex-shrink-0" aria-label="Remove">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-1 rounded-lg bg-white/5 border border-white/10">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 grid place-items-center text-white/60 hover:text-white"><Minus className="w-3 h-3" /></button>
                        <span className="text-[12px] text-white w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 grid place-items-center text-white/60 hover:text-white"><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="text-[11px] text-white/40">×</span>
                      <div className="flex items-center gap-1 rounded-lg bg-white/5 border border-white/10">
                        <button onClick={() => updateRentalDays(item.product.id, item.rentalDays - 1)} className="w-6 h-6 grid place-items-center text-white/60 hover:text-white"><Minus className="w-3 h-3" /></button>
                        <span className="text-[12px] text-white w-9 text-center">{item.rentalDays}d</span>
                        <button onClick={() => updateRentalDays(item.product.id, item.rentalDays + 1)} className="w-6 h-6 grid place-items-center text-white/60 hover:text-white"><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="ml-auto text-[13px] font-bold text-white">${formatPrice(item.product.price * item.quantity * item.rentalDays)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-5 pt-4 border-t border-white/10 text-[13px]">
              <div className="flex justify-between"><span className="text-white/50">Subtotal</span><span className="text-white">${formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-white/50">Delivery</span><span className="text-white">${formatPrice(delivery)}</span></div>
              <div className="flex justify-between"><span className="text-white/50">Setup / Installation</span><span className="text-white">${formatPrice(installation)}</span></div>
              {savings > 0 && <div className="flex justify-between"><span className="text-[#FF5E3A]">You Save</span><span className="text-[#FF5E3A] font-semibold">-${formatPrice(savings)}</span></div>}
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="text-[15px] font-bold text-white">Total</span>
                <span className="text-[22px] font-black text-white">${formatPrice(total)}</span>
              </div>
            </div>

            <Link href="/shop" className="mt-4 inline-flex items-center gap-2 text-[13px] text-white/55 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
