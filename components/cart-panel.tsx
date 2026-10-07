'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { PriceBreakdown } from '@/components/price-breakdown'
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  Truck,
  Wrench,
  CheckCircle2,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  FileText,
} from 'lucide-react'

function formatPrice(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

type Step = 'cart' | 'details' | 'confirmed'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  eventAddress: string
  eventDate: string
  notes: string
}

export function CartPanel() {
  const { items, removeItem, updateQuantity, updateRentalDays, clearCart, isCartOpen, closeCart } = useCart()
  const [step, setStep] = useState<Step>('cart')
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    eventAddress: '',
    eventDate: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isCartOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [isCartOpen])

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity * i.rentalDays, 0)
  const delivery = items.reduce((sum, i) => sum + i.product.deliveryFee * i.quantity, 0)
  const installation = items.reduce((sum, i) => sum + i.product.installationFee * i.quantity, 0)
  const savings = items.reduce((sum, i) => sum + (i.product.originalPrice - i.product.price) * i.quantity * i.rentalDays, 0)
  const total = subtotal + delivery + installation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setStep('confirmed')
    }, 1500)
  }

  const handleClose = () => {
    closeCart()
    // Reset step when fully closed (after animation)
    setTimeout(() => {
      if (step === 'confirmed') {
        clearCart()
        setStep('cart')
        setForm({ firstName: '', lastName: '', email: '', phone: '', company: '', eventAddress: '', eventDate: '', notes: '' })
      }
    }, 350)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: isCartOpen ? 'blur(4px)' : 'none',
          opacity: isCartOpen ? 1 : 0,
          pointerEvents: isCartOpen ? 'auto' : 'none',
        }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-screen w-full sm:w-[420px] z-50 flex flex-col transition-transform duration-350 ease-in-out"
        style={{
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          background: 'linear-gradient(180deg, #0D0D18 0%, #0A0A14 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '-24px 0 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Step: Cart */}
        {step === 'cart' && (
          <>
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)' }}
                >
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-white">Your Cart</h2>
                  <p className="text-[13px] text-white/85">
                    {items.length === 0 ? 'Empty' : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/8"
                style={{ border: '1px solid rgba(255,255,255,0.10)' }}
              >
                <X className="w-4 h-4 text-white/85" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 gap-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(255,45,111,0.10)', border: '1px solid rgba(255,45,111,0.2)' }}
                  >
                    <ShoppingCart className="w-6 h-6 text-[#FF2D6F]" />
                  </div>
                  <p className="text-white/65 text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => {
                  const lineTotal = item.product.price * item.quantity * item.rentalDays
                  return (
                    <div
                      key={item.product.id}
                      className="rounded-xl p-4"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <div className="flex gap-3 mb-3">
                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={64}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[15.5px] font-bold text-white leading-tight line-clamp-2">{item.product.name}</p>
                          <p className="text-[13px] text-white/85 mt-0.5">{item.product.dimensions}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md transition-colors hover:bg-red-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-white/50 hover:text-red-400" />
                        </button>
                      </div>

                      {/* Qty + Rental Days */}
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center gap-1 rounded-lg px-1"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                        >
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-white/10"
                          >
                            <Minus className="w-3 h-3 text-white/85" />
                          </button>
                          <span className="text-[15px] font-bold text-white w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-white/10"
                          >
                            <Plus className="w-3 h-3 text-white/85" />
                          </button>
                        </div>

                        <div
                          className="flex items-center gap-1 rounded-lg px-1"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                        >
                          <button
                            onClick={() => updateRentalDays(item.product.id, item.rentalDays - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-white/10"
                          >
                            <Minus className="w-3 h-3 text-white/85" />
                          </button>
                          <span className="text-[15px] font-bold text-white w-10 text-center">{item.rentalDays}d</span>
                          <button
                            onClick={() => updateRentalDays(item.product.id, item.rentalDays + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-white/10"
                          >
                            <Plus className="w-3 h-3 text-white/85" />
                          </button>
                        </div>

                        <span className="ml-auto text-[17px] font-extrabold text-white">
                          ${formatPrice(lineTotal)}
                        </span>
                      </div>

                      {/* Fees row */}
                      <div className="flex gap-3 mt-2">
                        <span className="flex items-center gap-1 text-[12.5px] font-medium text-white/85">
                          <Truck className="w-3 h-3" />
                          +${item.product.deliveryFee} delivery
                        </span>
                        <span className="flex items-center gap-1 text-[12.5px] font-medium text-white/85">
                          <Wrench className="w-3 h-3" />
                          +${item.product.installationFee} setup
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="flex-shrink-0 px-6 py-5 space-y-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                <PriceBreakdown
                  compact
                  total={total}
                  rows={[
                    { kind: 'rental', label: 'Rental', amount: subtotal },
                    { kind: 'delivery', label: 'Delivery', amount: delivery },
                    { kind: 'setup', label: 'Setup & installation', amount: installation },
                    ...(savings > 0 ? [{ kind: 'savings' as const, label: 'You save', amount: savings }] : []),
                  ]}
                />

                <Link
                  href="/shop/checkout"
                  onClick={closeCart}
                  className="cta-yellow w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[16px] font-extrabold transition-all hover:opacity-90 active:scale-[0.99]"
                  style={{
                    background: 'linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)',
                  }}
                >
                  Proceed to Checkout
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[15px] font-semibold text-white/90 hover:text-white transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </>
        )}

        {/* Step: Details form */}
        {step === 'details' && (
          <>
            <div
              className="flex items-center gap-3 px-6 py-5 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button
                onClick={() => setStep('cart')}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/8"
                style={{ border: '1px solid rgba(255,255,255,0.10)' }}
              >
                <ArrowLeft className="w-4 h-4 text-white/85" />
              </button>
              <div>
                <h2 className="text-[15px] font-bold text-white">Your Details</h2>
                <p className="text-[13px] text-white/85">Event & contact information</p>
              </div>
              <button
                onClick={handleClose}
                className="ml-auto w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/8"
                style={{ border: '1px solid rgba(255,255,255,0.10)' }}
              >
                <X className="w-4 h-4 text-white/85" />
              </button>
            </div>

            {/* Order summary strip */}
            <div
              className="mx-6 mt-4 px-4 py-3 rounded-xl flex items-center justify-between flex-shrink-0"
              style={{
                background: 'rgba(255,45,111,0.08)',
                border: '1px solid rgba(255,45,111,0.18)',
              }}
            >
              <span className="text-[14px] text-white/90">
                {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''} &middot; {items.map(i => i.product.dimensions).join(', ')}
              </span>
              <span className="text-[17px] font-extrabold text-white">${formatPrice(total)}</span>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12.5px] font-bold text-white/90 mb-1.5 uppercase tracking-wider">First Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50" />
                      <input
                        required
                        type="text"
                        value={form.firstName}
                        onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[16px] text-white placeholder-white/50 outline-none focus:border-[#FF2D6F] transition-colors"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-bold text-white/90 mb-1.5 uppercase tracking-wider">Last Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50" />
                      <input
                        required
                        type="text"
                        value={form.lastName}
                        onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[16px] text-white placeholder-white/50 outline-none focus:border-[#FF2D6F] transition-colors"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[12.5px] font-bold text-white/90 mb-1.5 uppercase tracking-wider">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50" />
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[16px] text-white placeholder-white/50 outline-none focus:border-[#FF2D6F] transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[12.5px] font-bold text-white/90 mb-1.5 uppercase tracking-wider">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50" />
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[16px] text-white placeholder-white/50 outline-none focus:border-[#FF2D6F] transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-[12.5px] font-bold text-white/90 mb-1.5 uppercase tracking-wider">Company / Organization</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50" />
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[16px] text-white placeholder-white/50 outline-none focus:border-[#FF2D6F] transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                      placeholder="Acme Events LLC"
                    />
                  </div>
                </div>

                {/* Event Address */}
                <div>
                  <label className="block text-[12.5px] font-bold text-white/90 mb-1.5 uppercase tracking-wider">Event Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-3.5 h-3.5 text-white/50" />
                    <input
                      required
                      type="text"
                      value={form.eventAddress}
                      onChange={e => setForm(f => ({ ...f, eventAddress: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[16px] text-white placeholder-white/50 outline-none focus:border-[#FF2D6F] transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                      placeholder="123 Venue St, Los Angeles, CA"
                    />
                  </div>
                </div>

                {/* Event Date */}
                <div>
                  <label className="block text-[12.5px] font-bold text-white/90 mb-1.5 uppercase tracking-wider">Event Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50" />
                    <input
                      required
                      type="date"
                      value={form.eventDate}
                      onChange={e => setForm(f => ({ ...f, eventDate: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[16px] text-white placeholder-white/50 outline-none focus:border-[#FF2D6F] transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[12.5px] font-bold text-white/90 mb-1.5 uppercase tracking-wider">Additional Notes</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-3.5 h-3.5 text-white/50" />
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[16px] text-white placeholder-white/50 outline-none focus:border-[#FF2D6F] transition-colors resize-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                      placeholder="Special setup requirements, power needs, access details..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-6 pb-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="cta-yellow w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[16px] font-extrabold transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)',
                  }}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      Submit Order Request
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[13px] text-white/80 text-center mt-3">
                  Our team will confirm availability and contact you within 2 hours.
                </p>
              </div>
            </form>
          </>
        )}

        {/* Step: Confirmed */}
        {step === 'confirmed' && (
          <div className="flex flex-col items-center justify-center flex-1 px-8 text-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(255,45,111,0.20) 0%, rgba(255,94,58,0.20) 100%)', border: '2px solid rgba(255,45,111,0.4)' }}
            >
              <CheckCircle2 className="w-10 h-10 text-[#FF5E3A]" />
            </div>
            <div>
              <h2 className="text-[22px] font-black text-white mb-2">Request Sent!</h2>
              <p className="text-[15px] text-white/90 leading-relaxed">
                Thanks, <span className="text-white">{form.firstName}</span>! We&apos;ve received your order request and will reach out to <span className="text-[#FF5E3A]">{form.email}</span> within 2 hours to confirm availability.
              </p>
            </div>
            <div
              className="w-full rounded-xl p-4 space-y-2 text-left"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-[15px]">
                  <span className="text-white/85 truncate mr-2">{item.product.name}</span>
                  <span className="text-white flex-shrink-0">${formatPrice(item.product.price * item.quantity * item.rentalDays)}</span>
                </div>
              ))}
              <div
                className="flex justify-between text-[16px] font-extrabold pt-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="text-white/90">Total</span>
                <span className="text-white">${formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-xl text-[16px] font-extrabold text-white transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)',
                boxShadow: '0 8px 24px rgba(255,45,111,0.35)',
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </>
  )
}
