"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { isLandingPath } from "@/lib/landing-routes"
import { Sparkles } from "lucide-react"
import { QuoteForm } from "./quote-form"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { QuoteChooser } from "./quote-chooser"

export function GlobalCTA() {
  // Landings (/lp/*) have their own call/quote bar; keep only the quote dialogs.
  const landing = isLandingPath(usePathname())
  const [chooserOpen, setChooserOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [serviceSlug, setServiceSlug] = useState<string | undefined>()
  const [eventTypeId, setEventTypeId] = useState<string | undefined>()

  // Every CTA on the site dispatches "openQuoteForm" — that now opens the
  // channel chooser first ("How would you like your quote?").
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setServiceSlug(detail?.serviceSlug || undefined)
      setEventTypeId(detail?.eventTypeId || undefined)
      setChooserOpen(true)
    }
    document.addEventListener("openQuoteForm", handler)
    return () => document.removeEventListener("openQuoteForm", handler)
  }, [])

  const openChooser = () => {
    setServiceSlug(undefined)
    setEventTypeId(undefined)
    setChooserOpen(true)
  }
  const openForm = () => {
    setChooserOpen(false)
    setFormOpen(true)
  }

  return (
    <>
      {/* Desktop floating quote bubble — bottom right */}
      {!landing && (
      <button
        onClick={openChooser}
        aria-label="Get a quote"
        className="cta-yellow hidden md:flex fixed bottom-6 right-6 z-[90] items-center justify-center w-14 h-14 rounded-full transition-transform hover:-translate-y-0.5 active:scale-95"
        style={{
          // .cta-yellow sets position: relative — keep the bubble fixed
          position: "fixed",
          background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
        }}
      >
        <Sparkles className="w-6 h-6" />
      </button>
      )}

      {/* Mobile bottom navigation (<md) */}
      {!landing && <MobileBottomNav onStartQuote={openChooser} />}

      <QuoteChooser open={chooserOpen} onClose={() => setChooserOpen(false)} onForm={openForm} />
      <QuoteForm isOpen={formOpen} onClose={() => setFormOpen(false)} serviceSlug={serviceSlug} eventTypeId={eventTypeId} />
    </>
  )
}
