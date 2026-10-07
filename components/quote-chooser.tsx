"use client"

import { useEffect } from "react"
import { ClipboardList, Phone, ArrowRight, X } from "lucide-react"
import { WHATSAPP_HREF, PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function QuoteChooser({
  open,
  onClose,
  onForm,
}: {
  open: boolean
  onClose: () => void
  onForm: () => void
}) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-[120] transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 w-full h-full bg-black/70 backdrop-blur-[2px]" />

      {/* Sheet (bottom on mobile, centered on desktop) */}
      <div className="absolute inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="How would you like your quote?"
          className={`mx-3 mb-3 sm:m-0 sm:w-full sm:max-w-lg rounded-3xl border backdrop-blur-2xl overflow-hidden transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "translate-y-full sm:translate-y-0"
          }`}
          style={{
            background: "rgba(10,8,24,0.97)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 24px 60px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
            paddingBottom: "max(env(safe-area-inset-bottom), 14px)",
          }}
        >
          <div className="flex justify-center pt-3 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-white/15" />
          </div>

          <div className="px-5 pt-4 pb-5 flex items-start justify-between gap-3">
            <h3 className="text-white text-[20px] md:text-[22px] font-extrabold tracking-[-0.01em]">
              How would you like your quote?
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/90 hover:text-white transition-colors shrink-0"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3 pb-4 flex flex-col gap-2.5">
            {/* Fill out the form */}
            <button
              type="button"
              onClick={onForm}
              className="cta-yellow flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-transform active:scale-[0.99] hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
              }}
            >
              <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.18)" }}>
                <ClipboardList className="w-5 h-5" />
              </span>
              <span className="flex flex-col flex-1 min-w-0">
                <span className="text-[16px] font-extrabold leading-tight">Fill Out the Form</span>
                <span className="text-[12.5px] font-medium text-white/85 leading-snug">
                  Takes 60 seconds — your account manager calls within 5 minutes
                </span>
              </span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>

            {/* Call */}
            <a
              href={PHONE_TEL}
              suppressHydrationWarning
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-transform active:scale-[0.99] hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.92)" }}
            >
              <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-[#FF5E3A]" style={{ background: "rgba(255,45,111,0.14)" }}>
                <Phone className="w-5 h-5" />
              </span>
              <span className="flex flex-col flex-1 min-w-0">
                <span className="text-[16px] font-bold leading-tight">Call Us Now</span>
                <span className="text-[12.5px] font-medium text-white/80 leading-snug" suppressHydrationWarning>
                  {PHONE_DISPLAY} · Mon–Fri 8am–7pm PT
                </span>
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-transform active:scale-[0.99] hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.92)" }}
            >
              <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-[#25D366]" style={{ background: "rgba(37,211,102,0.15)" }}>
                <WhatsAppGlyph className="w-5 h-5" />
              </span>
              <span className="flex flex-col flex-1 min-w-0">
                <span className="text-[16px] font-bold leading-tight">WhatsApp</span>
                <span className="text-[12.5px] font-medium text-white/80 leading-snug">
                  For international clients — reply in minutes
                </span>
              </span>
            </a>
          </div>

          <p className="px-5 pb-4 text-center text-[12px] text-white/55">
            All channels connect you to the same account manager.
          </p>
        </div>
      </div>
    </div>
  )
}
