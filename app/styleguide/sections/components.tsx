"use client"

import * as React from "react"
import { ArrowRight, Clock, Phone, ShoppingCart, Lightbulb, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { PHONE_DISPLAY } from "@/lib/contact"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ThemeToggle,
  HeroCTA,
  WatchButton,
  IncludesBar,
  FloatingCard,
  HERO_CODE,
  ShopPill,
  RatingsBar,
  ServiceCard,
  SERVICE_CARD_CODE,
  WhyCard,
  WHY_CARD_CODE,
  Testimonial,
  ProductCard,
  PRODUCT_CARD_CODE,
  EventCard,
  EVENT_CARD_CODE,
} from "../site-parts"
import { Section, SubHead, PreviewCode, Note } from "../ui"

type SectionProps = { id: string; num: number }

const INPUT =
  "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.10] text-white text-[14px] placeholder-white/35 focus:outline-none focus:border-[#FF2D6F]/50 transition-colors"

const BUTTONS_CODE = `${HERO_CODE}

{/* Header CTA — inline gradient style → shimmer ring applies automatically */}
<button className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-white font-extrabold text-[13px] tracking-[0.02em] transition-all hover:-translate-y-0.5"
  style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", boxShadow: "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)" }}>
  Get a Quote <ArrowRight className="w-3.5 h-3.5" />
</button>

{/* Header phone — glass + .shimmer-stroke */}
<a className="shimmer-stroke inline-flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] bg-white/[0.04] border border-white/[0.10] text-white/85 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.20] transition-all text-[13px] font-semibold">
  <Phone className="w-3.5 h-3.5" /> {PHONE_DISPLAY}
</a>

{/* Theme toggle + cart — 40px glass squares */}
<ThemeToggle />
<button className="relative inline-flex items-center justify-center w-10 h-10 rounded-[10px] bg-white/[0.04] border border-white/[0.10] text-white/85 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.20] transition-all">
  <ShoppingCart className="w-[18px] h-[18px]" />
</button>

{/* Text link */}
<span className="inline-flex items-center gap-2 text-[#FF2D6F] font-bold text-[14px] group-hover:gap-3 transition-all">Get a Quote <ArrowRight className="w-4 h-4" /></span>`

const INPUTS_CODE = `const input = "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.10] text-white text-[14px] placeholder-white/35 focus:outline-none focus:border-[#FF2D6F]/50 transition-colors"

// Error
className={\`\${base} \${error ? "border-red-500/50 focus:border-red-500/70" : "border-white/[0.10] focus:border-[#FF2D6F]/50"}\`}
{error && <p className="text-red-400 text-xs mt-2">{error}</p>}

// Mobile: globals.css forces 16px on every text control so iOS never zooms on focus.`

const PILLS_CODE = `<span className="ds-pill"><span className="dot" />Why Prime Line</span>

{/* Shop eyebrow — home-products-section.tsx */}
<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase"
  style={{ background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)", border: "1px solid rgba(255,94,58,0.25)", color: "#FFB366" }}>
  <Package className="w-3.5 h-3.5" /> Rent the Gear
</span>

{/* Event-type tag */}
<span className="inline-block px-2 py-0.5 rounded-md bg-[#FF2D6F] text-white text-[9px] font-extrabold tracking-[0.08em] uppercase">Brand activations</span>

{/* Floating stat card — hero */}
<div className="inline-flex items-center gap-3 px-4 py-3.5 rounded-[14px] border border-[#FF2D6F]/25 backdrop-blur-2xl animate-float-y"
  style={{ background: "rgba(8,18,26,0.85)", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}>…</div>`

export function ComponentsSection({ id, num }: SectionProps) {
  return (
    <Section
      id={id}
      num={num}
      eyebrow="Core UI components"
      title="Built from the"
      accent="real parts."
      source="components/landing · product-card.tsx · services-grid-section.tsx"
      lede="Every preview is the live site’s own markup, copied class-for-class (ThemeToggle is imported directly). Brand-gradient buttons pick up the site’s rotating shimmer ring on their own — exactly as in production. Switch the theme in the sidebar to see the light-mode inversion."
    >
      <SubHead meta="landing-hero.tsx · header.tsx">Buttons</SubHead>
      <PreviewCode
        code={BUTTONS_CODE}
        preview={
          <div className="flex flex-wrap items-center gap-4">
            <HeroCTA />
            <WatchButton />
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-[13px] font-extrabold tracking-[0.02em] text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", boxShadow: "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)" }}
            >
              Get a Quote <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <span className="shimmer-stroke inline-flex items-center gap-2 rounded-[10px] border border-white/[0.10] bg-white/[0.04] px-3.5 py-2.5 text-[13px] font-semibold text-white/85 transition-all hover:border-white/[0.20] hover:bg-white/[0.08] hover:text-white">
              <Phone className="h-3.5 w-3.5" /> <span suppressHydrationWarning>{PHONE_DISPLAY}</span>
            </span>
            <ThemeToggle />
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.10] bg-white/[0.04] text-white/85 transition-all hover:border-white/[0.20] hover:bg-white/[0.08] hover:text-white">
              <ShoppingCart className="h-[18px] w-[18px]" />
              <span className="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-extrabold text-white" style={{ background: "linear-gradient(135deg, #FF2D6F, #FF5E3A)" }}>
                2
              </span>
            </span>
            <span className="inline-flex cursor-pointer items-center gap-2 text-[14px] font-bold text-[#FF2D6F] transition-all hover:gap-3">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        }
      />

      <SubHead meta="quote-form.tsx">Inputs &amp; states</SubHead>
      <PreviewCode
        code={INPUTS_CODE}
        preview={
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <Field label="Default">
              <input className={INPUT} placeholder="Your name" />
            </Field>
            <Field label="Hover">
              <input className={cn(INPUT, "border-white/[0.20]")} placeholder="Company" />
            </Field>
            <Field label="Focus">
              <input className={cn(INPUT, "border-[#FF2D6F]/50")} defaultValue="Jordan Lee" />
            </Field>
            <Field label="Disabled">
              <input className={cn(INPUT, "cursor-not-allowed opacity-50")} placeholder="Locked" disabled />
            </Field>
            <Field label="Error">
              <input className={cn(INPUT.replace("border-white/[0.10]", ""), "border-red-500/50 focus:border-red-500/70")} defaultValue="aa" />
              <p className="mt-2 text-xs text-red-400">Please enter your real name</p>
            </Field>
            <Field label="Phone · mono">
              <input suppressHydrationWarning className={cn(INPUT, "font-mono tabular-nums")} defaultValue={PHONE_DISPLAY} />
            </Field>
            <Field label="Textarea" className="sm:col-span-2 xl:col-span-3">
              <textarea className={cn(INPUT, "resize-none")} rows={3} placeholder="Tell us about your event…" />
            </Field>
          </div>
        }
      />

      <SubHead meta="ds-pill · home-products-section.tsx · landing-hero.tsx">Pills, badges &amp; floating cards</SubHead>
      <PreviewCode
        code={PILLS_CODE}
        preview={
          <div className="flex flex-wrap items-center gap-4">
            <span className="ds-pill">
              <span className="dot" /> Why Prime Line
            </span>
            <ShopPill />
            <span className="inline-block rounded-md bg-[#FF2D6F] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.08em] text-white">Brand activations</span>
            <IncludesBar />
            <FloatingCard />
            <FloatingCard title="2 Hours Early" sub="Tested before doors" Icon={Clock} />
          </div>
        }
      />

      <SubHead meta="product-card.tsx · data/products.json">Product card</SubHead>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,380px)_1fr]">
        <div className="mx-auto w-full max-w-[380px]">
          <ProductCard />
        </div>
        <PreviewCode
          code={PRODUCT_CARD_CODE}
          preview={
            <div className="grid gap-3 text-[13px] text-white/60">
              <p>
                <b className="text-white">Anatomy.</b> Gold → orange <b className="text-[#FFD24A]">Best Seller</b> badge top-left, pink → coral discount ribbon with a{" "}
                <code className="font-mono text-white/70">#C41F55</code> fold top-right, glass category chip on the photo, “Quick View” pill on hover.
              </p>
              <p>Price set in 900 weight with “/ 24h” at 40% white; the strike-through original and coral “Save” line keep a fixed 20px row so cards align.</p>
              <p>Delivery / setup fees sit in a coral-tinted strip; “Add to Quote” is a brand-gradient button, so it shimmers.</p>
            </div>
          }
        />
      </div>

      <SubHead meta="services-grid-section.tsx · landing-why-us.tsx · event-types-section.tsx">Cards</SubHead>
      <div className="grid gap-5 xl:grid-cols-2">
        <PreviewCode
          code={SERVICE_CARD_CODE}
          preview={
            <div className="grid grid-cols-2 gap-3">
              <ServiceCard />
              <ServiceCard title="Lighting Equipment Rental" body="Designed, pre-vis’d and programmed by a senior LD — moving heads, washes and GrandMA3 console." image="/images/services/lighting-rental-card.webp" Icon={Lightbulb} />
            </div>
          }
        />
        <PreviewCode
          code={WHY_CARD_CODE}
          preview={
            <div className="grid gap-3 sm:grid-cols-2">
              <WhyCard />
              <WhyCard title="Your Event, Our Reputation" body="Your Technical Director is on call 24/7 because your event is our name on the line." Icon={ShieldCheck} />
            </div>
          }
        />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <PreviewCode
          code={EVENT_CARD_CODE}
          preview={
            <div className="grid grid-cols-2 gap-3">
              <EventCard />
              <EventCard title="Festivals" tag="Live music & stages" image="/images/events/festivals.webp" />
            </div>
          }
        />
        <PreviewCode
          code={`{/* landing-why-us.tsx */}\n<div className="relative rounded-[24px] border border-white/[0.08] px-6 py-7 md:px-10 md:py-9 overflow-hidden"\n  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)" }}>\n  <Quote className="absolute -top-2 left-4 w-14 h-14 text-[#FF2D6F]/10 -scale-x-100" />\n  <p className="text-center text-[18px] md:text-[22px] leading-relaxed text-white/90 font-medium">… <span className="ds-accent-text">night and day</span> …</p>\n</div>`}
          preview={<Testimonial />}
        />
      </div>

      <div className="mt-12 grid gap-5 xl:grid-cols-2">
        <div>
          <SubHead meta="faq-section.tsx">Accordion</SubHead>
          <PreviewCode
            code={`<Accordion type="single" collapsible className="space-y-2">\n  <AccordionItem value="item-0" className="rounded-[14px] px-5 border border-white/[0.08] bg-white/[0.03] backdrop-blur-md hover:border-[#FF2D6F]/20 transition-colors">\n    <AccordionTrigger className="text-left font-semibold text-white hover:no-underline text-sm md:text-base">…</AccordionTrigger>\n    <AccordionContent className="text-white/55">…</AccordionContent>\n  </AccordionItem>\n</Accordion>`}
            preview={
              <Accordion type="single" collapsible defaultValue="a" className="space-y-2">
                {[
                  ["a", "How fast can I get a quote?", "Within hours. We send a detailed proposal plus a 3D render of your space."],
                  ["b", "Full production or equipment rental only?", "Both. Most clients choose full-service; dry-hire is available if you have your own crew."],
                ].map(([v, q, a]) => (
                  <AccordionItem key={v} value={v} className="rounded-[14px] border border-white/[0.08] bg-white/[0.03] px-5 backdrop-blur-md transition-colors hover:border-[#FF2D6F]/20">
                    <AccordionTrigger className="text-left text-sm font-semibold text-white hover:no-underline md:text-base">{q}</AccordionTrigger>
                    <AccordionContent className="text-white/55">{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            }
          />
        </div>
        <div>
          <SubHead meta="ratings-bar.tsx">Ratings bar</SubHead>
          <PreviewCode
            code={`<div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 rounded-2xl px-6 py-5"\n  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.10)" }}>\n  <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/45">Trusted &amp; top-rated</span>\n  <span className="text-[14px] font-bold text-white">Google</span>\n  <Star className="w-3.5 h-3.5 text-[#FFD24A]" fill="currentColor" /> ×5\n  <span className="text-[14px] font-black text-white">4.9</span>\n  <span className="text-[12px] text-white/45">180+ reviews</span>\n</div>`}
            preview={<RatingsBar />}
          />
          <Note>The numbers mirror ratings-bar.tsx, which marks them as placeholders — don’t reuse them in ads until they’re replaced with real profile data.</Note>
        </div>
      </div>

      <SubHead meta="trusted-by-section.tsx · scroll-left 120s">Logo ticker</SubHead>
      <Ticker />

      <SubHead meta="header.tsx">Header bar</SubHead>
      <PreviewCode
        stageClassName="p-3 md:p-5"
        code={`<div className="flex items-center justify-between gap-4 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-md backdrop-saturate-150"\n  style={{ background: headerBg, boxShadow: "0 12px 36px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" }}>\n  <Image src="/favicon.svg" className="h-9 w-9 sm:hidden" />                       {/* mobile mark */}\n  <Image src="/images/prime-line-av-logo-dark-bg.svg" className="h-9 w-auto theme-logo-dark" />\n  <Image src="/images/prime-line-av-logo-light-bg.svg" className="h-9 w-auto theme-logo-light" />\n  <DesktopNav /> <ThemeToggle /> <a className="shimmer-stroke …">{PHONE_DISPLAY}</a> <button style={{ background: BRAND }}>Get a Quote</button> <CartButton />\n</div>`}
        preview={
          <div
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 px-3 py-3 backdrop-blur-md backdrop-saturate-150 sm:px-5"
            style={{ background: "rgba(10, 8, 24, 0.62)", boxShadow: "0 12px 36px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/prime-line-av-logo-dark-bg.svg" alt="" className="theme-logo-dark h-7 w-auto sm:h-9" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/prime-line-av-logo-light-bg.svg" alt="" className="theme-logo-light h-7 w-auto sm:h-9" />
            <nav className="hidden items-center gap-1 2xl:flex">
              {["Shop", "Services", "Company", "Locations"].map((n) => (
                <span key={n} className="rounded-[10px] px-3.5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-white/65 transition-all hover:bg-white/[0.04] hover:text-white">
                  {n}
                </span>
              ))}
            </nav>
            <div className="flex items-center gap-2.5">
              <ThemeToggle />
              <button
                type="button"
                className="hidden items-center gap-2 rounded-[10px] px-4 py-2.5 text-[13px] font-extrabold tracking-[0.02em] text-white sm:inline-flex"
                style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", boxShadow: "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)" }}
              >
                Get a Quote <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.10] bg-white/[0.04] text-white/85">
                <ShoppingCart className="h-[18px] w-[18px]" />
              </span>
            </div>
          </div>
        }
      />
    </Section>
  )
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/40">{label}</p>
      {children}
    </div>
  )
}

const BRANDS = ["walmart", "amazon", "google", "apple", "meta", "nike", "coca-cola", "disney", "tesla", "tiktok"]

function Ticker() {
  const items = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS]
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02] py-6">
      <div className="animate-scroll-left flex w-max items-center" style={{ animationDuration: "120s" }}>
        {items.map((b, i) => (
          <div key={i} className="mr-4 grid h-[56px] min-w-[140px] flex-shrink-0 place-items-center rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-5 backdrop-blur-md" aria-hidden={i >= BRANDS.length}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/brands/${b}.svg`} alt={b} className="h-6 w-auto max-w-[110px] object-contain md:h-7" style={{ filter: "brightness(0) invert(1) opacity(0.65)" }} />
          </div>
        ))}
      </div>
    </div>
  )
}

