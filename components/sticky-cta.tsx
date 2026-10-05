"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, Sparkles, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_HREF } from "@/lib/contact"

interface StickyCTAProps {
  visible?: boolean
  onStartQuote: () => void
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function StickyCTA({ onStartQuote }: StickyCTAProps) {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  const isFifa = pathname?.startsWith("/fifa-2026-packages")

  useEffect(() => {
    let raf = 0
    let pending = false

    const handle = () => {
      pending = false
      const y = window.scrollY
      const delta = y - lastScrollY.current

      if (y < 400) {
        setShow(false)
        setOpen(false)
      } else if (delta < -3) {
        setShow(true)
      } else if (delta > 3) {
        setShow(false)
        setOpen(false)
      }

      lastScrollY.current = y
    }

    const onScroll = () => {
      if (!pending) {
        pending = true
        raf = requestAnimationFrame(handle)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-fab]")) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const actions = [
    {
      key: "quote",
      label: "Request a Quote",
      icon: <Sparkles className="w-4 h-4" />,
      onClick: () => {
        setOpen(false)
        onStartQuote()
      },
      style: {
        background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
      },
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: <WhatsAppIcon className="w-4 h-4" />,
      href: WHATSAPP_HREF,
      style: {
        background: "rgba(37,211,102,0.12)",
        color: "#25D366",
        border: "1px solid rgba(37,211,102,0.25)",
      },
    },
    {
      key: "call",
      label: PHONE_DISPLAY,
      icon: <Phone className="w-4 h-4" />,
      href: PHONE_TEL,
      style: {
        background: "rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.9)",
        border: "1px solid rgba(255,255,255,0.12)",
      },
    },
  ]

  return (
    // Only shown on desktop (hidden on mobile — mobile uses bottom nav)
    <div
      data-fab
      className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-3"
    >
      {/* Action items — slide up when open */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {actions.map((action, i) => {
          const delay = `${i * 40}ms`
          const inner = (
            <span
              suppressHydrationWarning
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-[13px] font-bold whitespace-nowrap backdrop-blur-xl transition-all duration-200 hover:scale-105 active:scale-95 ${action.key === "quote" ? "cta-yellow" : ""}`}
              style={{ ...action.style, width: "200px", justifyContent: "flex-start" }}
            >
              {action.icon}
              {action.label}
            </span>
          )
          return (
            <div key={action.key} style={{ transitionDelay: open ? delay : "0ms" }}>
              {action.href ? (
                <a suppressHydrationWarning href={action.href} target={action.key === "whatsapp" ? "_blank" : undefined} rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <button type="button" onClick={action.onClick}>
                  {inner}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Main FAB button — chat bubble with pulse */}
      <div className="relative">
        {/* Pulse rings */}
        {!open && (
          <>
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(255,210,74,0.35)", animationDuration: "1.8s" }}
            />
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(255,210,74,0.2)", animationDuration: "1.8s", animationDelay: "0.6s" }}
            />
          </>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Contact us"}
          className="cta-yellow relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
          style={{
            background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
          }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
