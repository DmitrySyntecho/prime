"use client"

import * as React from "react"
import {
  Check as CheckIcon,
  ArrowRight, ArrowLeft, ChevronRight, ChevronLeft, ChevronDown, X, Play, Download, Phone, MessageCircle, MapPin, Clock, CalendarHeart, Lock, Tv, Monitor, Projector, Lightbulb, Volume2, Mic2, Headphones, Radio, Video, Layers, Columns, Truck, Package, Star, CheckCircle2, Sparkles, Trophy, Users, UserCheck, Heart, HandHeart, Flame, Scale,
} from "lucide-react"
import { PHONE_DISPLAY } from "@/lib/contact"
import { cn } from "@/lib/utils"
import tokens from "@/lib/brand/design-tokens.json"
import kit from "@/lib/brand/asset-manifest.json"
import { Section, SubHead, Panel, PreviewCode, CodeBlock, CopyChip, Copy, DownloadLink, Uses, Note, Fact, useCopy } from "../ui"

// Explicit map, not `import * as`, so the page only ships the icons it shows.
const Icons = { ArrowRight, ArrowLeft, ChevronRight, ChevronLeft, ChevronDown, X, Play, Download, Phone, MessageCircle, MapPin, Clock, CalendarHeart, Lock, Tv, Monitor, Projector, Lightbulb, Volume2, Mic2, Headphones, Radio, Video, Layers, Columns, Truck, Package, Star, CheckCircle2, Sparkles, Trophy, Users, UserCheck, Heart, HandHeart, Flame, Scale }

type SectionProps = { id: string; num: number }

const BRAND_GRADIENT = "linear-gradient(135deg, var(--emerald) 0%, var(--emerald-deep) 100%)"
const CTA_SHADOW = "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)"

/* ══ 08 · Icons & favicons ═══════════════════════════════════════════════ */

// The lucide icons the site imports, grouped by job.
const ICON_SET: { group: string; names: (keyof typeof Icons)[] }[] = [
  { group: "Action", names: ["ArrowRight", "ArrowLeft", "ChevronRight", "ChevronLeft", "ChevronDown", "X", "Play", "Download"] },
  { group: "Contact", names: ["Phone", "MessageCircle", "MapPin", "Clock", "CalendarHeart", "Lock"] },
  { group: "Service", names: ["Tv", "Monitor", "Projector", "Lightbulb", "Volume2", "Mic2", "Headphones", "Radio", "Video", "Layers", "Columns", "Truck", "Package"] },
  { group: "Proof", names: ["Star", "CheckCircle2", "Sparkles", "Trophy", "Users", "UserCheck", "Heart", "HandHeart", "Flame", "Scale"] },
]

export function IconsSection({ id, num }: SectionProps) {
  const [size, setSize] = React.useState(20)
  const [stroke, setStroke] = React.useState(1.7)
  const fav = kit.favicons
  return (
    <Section
      id={id}
      num={num}
      eyebrow="Icons & favicons"
      title="Lucide, drawn"
      accent="a little bolder."
      source="lucide-react · public/brand/favicon"
      lede="Two icon languages. UI icons are lucide-react — light on service tiles (stroke 1.7), regular on why-us cards (2), firm on hero bullets (2.2). Product categories get the 3D icon set below, rendered in Higgsfield in the brand palette. Click a line icon to copy its import."
    >
      <Panel>
        <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <label className="flex items-center gap-3 text-[12px] font-bold text-white/60">
            Size <span className="w-10 font-mono text-white">{size}px</span>
            <input type="range" min={14} max={32} step={2} value={size} onChange={(e) => setSize(+e.target.value)} className="accent-[#FF2D6F]" />
          </label>
          <label className="flex items-center gap-3 text-[12px] font-bold text-white/60">
            Stroke <span className="w-10 font-mono text-white">{stroke}</span>
            <input type="range" min={1.5} max={3} step={0.1} value={stroke} onChange={(e) => setStroke(+e.target.value)} className="accent-[#FF2D6F]" />
          </label>
          <div className="flex gap-1.5">
            {[1.7, 2, 2.2, 2.4].map((s) => (
              <button key={s} type="button" onClick={() => setStroke(s)} className={cn("rounded-lg border px-2 py-1 font-mono text-[11px]", stroke === s ? "border-[#FF2D6F]/40 text-[#FF2D6F]" : "border-white/10 text-white/50")}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          {ICON_SET.map((g) => (
            <div key={g.group}>
              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/35">{g.group}</p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                {g.names.map((n) => (
                  <IconTile key={n} name={n} size={size} stroke={stroke} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <SubHead meta={<a href={kit.packages.icons3d.src} download className="font-bold text-[#FF2D6F] hover:text-white">Download all (ZIP)</a>}>3D equipment icons · Higgsfield</SubHead>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {kit.icons3d.map((ic) => (
          <div key={ic.slug} className="group overflow-hidden rounded-[18px] border border-white/[0.08] transition-all hover:-translate-y-1 hover:border-[#FF2D6F]/30" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 20%, rgba(255,45,111,0.14), transparent 70%), linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ic.web} alt={ic.label} loading="lazy" className="mx-auto aspect-square w-full p-3 transition-transform duration-500 group-hover:scale-105" />
            <div className="px-3 pb-3">
              <span className="block truncate text-[12.5px] font-bold text-white">{ic.label}</span>
              <span className="mt-1.5 flex gap-1">
                <a href={ic.png1024} download className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[9.5px] text-white/60 hover:border-[#FF2D6F]/40 hover:text-white">PNG 1024</a>
                <a href={ic.png256} download className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[9.5px] text-white/60 hover:border-[#FF2D6F]/40 hover:text-white">PNG 256</a>
              </span>
            </div>
          </div>
        ))}
      </div>
      <Note>Transparent PNG, one light setup and one 3/4 camera for the whole set: glossy graphite bodies, pink → coral gradient surfaces, gold trims, soft pink rim light. Use them for product categories, empty states and ads — never mixed with flat line icons in the same row. The prompt template is in AI visual guidelines.</Note>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          { label: "Service tile · 24px / 1.7", cls: "h-14 w-14 rounded-[14px] · rgba(255,45,111,0.22)", el: <div className="flex h-14 w-14 items-center justify-center rounded-[14px] text-[#FF2D6F]" style={{ background: "rgba(255,45,111,0.22)", border: "1px solid rgba(255,45,111,0.35)" }}><Icons.Layers className="h-6 w-6" strokeWidth={1.7} /></div> },
          { label: "Hero bullet · 14px / 2.2", cls: "h-6 w-6 rounded-[8px] border border-[#FF2D6F]/24 bg-[#FF2D6F]/14", el: <span className="grid h-6 w-6 place-items-center rounded-[8px] border border-[#FF2D6F]/24 bg-[#FF2D6F]/14 text-[#FF2D6F]"><CheckIcon className="h-3.5 w-3.5" strokeWidth={2.2} /></span> },
          { label: "Inline arrow · 14–16px", cls: "w-3.5 h-3.5 · w-4 h-4", el: <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#FF2D6F]">Learn More <ArrowRight className="h-4 w-4" /></span> },
        ].map((x) => (
          <Panel key={x.label} className="flex flex-col gap-4">
            <div className="flex h-16 items-center">{x.el}</div>
            <div>
              <p className="text-[13px] font-bold text-white">{x.label}</p>
              <p className="font-mono text-[10.5px] text-white/40">{x.cls}</p>
            </div>
          </Panel>
        ))}
      </div>

      <SubHead meta="Generated from the PL monogram">Favicon set</SubHead>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <Panel className="flex flex-col justify-between gap-6">
          {/* Browser tab mock */}
          <div className="overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#0a0820]">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 pt-2">
              <div className="flex items-center gap-2 rounded-t-lg bg-[#050310] px-3 py-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fav.sizes[0].src} alt="" className="h-4 w-4" />
                <span className="truncate text-[11px] text-white/70">AV Equipment Rental | Prime Line AV</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fav.apple.src} alt="" className="h-16 w-16 rounded-[16px]" />
              <div>
                <p className="text-[13px] font-bold text-white">Prime Line</p>
                <p className="text-[11px] text-white/40">Home-screen icon · 180 px</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <DownloadLink href={fav.svg} label="favicon.svg" primary />
            <DownloadLink href={fav.ico} label="favicon.ico" meta="16·32·48" />
            <DownloadLink href={kit.packages.favicon.src} label="All favicons (ZIP)" />
          </div>
        </Panel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {([...fav.sizes, { size: 180, src: fav.apple.src, label: "Apple 180" }, ...fav.pwa.map((p) => ({ size: p.size, src: p.src, label: `PWA ${p.size}` })), { size: 512, src: fav.pwa[1].maskable, label: "Maskable 512" }] as { size: number; src: string; label: string }[]).map((f) => (
            <a key={f.src} href={f.src} download className="group flex flex-col items-center justify-between gap-3 rounded-[16px] border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-[#FF2D6F]/30">
              <div className="grid h-16 place-items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt="" style={{ width: Math.min(f.size, 64), height: Math.min(f.size, 64), imageRendering: f.size <= 32 ? "pixelated" : undefined }} />
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-white/60 group-hover:text-white">
                <Download className="h-3 w-3" /> {f.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}

function IconTile({ name, size, stroke }: { name: keyof typeof Icons; size: number; stroke: number }) {
  const { copied, copy } = useCopy()
  const I = Icons[name] as React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  if (!I) return null
  return (
    <button
      type="button"
      onClick={() => copy(`import { ${name} } from "lucide-react"`)}
      title={name}
      className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-[14px] border border-white/[0.06] bg-white/[0.02] p-2 transition-all hover:border-[#FF2D6F]/30 hover:bg-[#FF2D6F]/[0.06]"
    >
      <I size={size} strokeWidth={stroke} className="text-white/85 transition-colors group-hover:text-[#FF2D6F]" />
      <span className="w-full truncate text-center text-[9.5px] text-white/35">{copied ? "Copied" : name}</span>
    </button>
  )
}

/* ══ 09 · Imagery ════════════════════════════════════════════════════════ */

const IMAGERY = [
  { src: "/images/services/stage-rental.webp", label: "Stage", ratio: "4/3" },
  { src: "/images/events/corporate.webp", label: "Corporate", ratio: "3/4" },
  { src: "/images/services/led-screen.webp", label: "LED", ratio: "4/3" },
  { src: "/images/services/lighting.webp", label: "Lighting", ratio: "4/3" },
  { src: "/images/events/festivals.webp", label: "Festival", ratio: "3/4" },
  { src: "/images/services/sound-system.webp", label: "Sound", ratio: "4/3" },
  { src: "/images/events/weddings.webp", label: "Wedding", ratio: "3/4" },
  { src: "/images/case-studies/tiktok-1.webp", label: "Brand activation", ratio: "4/3" },
]

const TRAITS = [
  { k: "Light", v: "Shot under show light — coloured LEDs, beams and haze. Never flat daylight or office fluorescents." },
  { k: "Palette", v: "Magenta, coral and warm amber against deep blacks. Cool blues only as a minor counter-tone." },
  { k: "Contrast", v: "High. Crushed shadows so white type and the pink gradient read cleanly on top." },
  { k: "Crop", v: "Gear in context: stage + crowd, wall + audience. Tight crops only for detail moments." },
  { k: "People", v: "Real guests, crew and presenters mid-moment. Eyes open, faces lit — no stock poses." },
  { k: "Negative space", v: "Leave a dark side or bottom third for type; cards add a from-[#03070a]/95 gradient anyway." },
]

const RATIOS = [
  { r: "16 / 9", w: 16, h: 9, use: "Hero video, OG image" },
  { r: "4 / 3", w: 4, h: 3, use: "Service & case-study galleries · 12×" },
  { r: "3 / 4", w: 3, h: 4, use: "Event-type & service cards" },
  { r: "16 / 10", w: 16, h: 10, use: "Wide feature tiles" },
  { r: "9 / 16", w: 9, h: 16, use: "Testimonial video cards" },
]

export function ImagerySection({ id, num }: SectionProps) {
  return (
    <Section
      id={id}
      num={num}
      eyebrow="Imagery"
      title="Real shows,"
      accent="real light."
      source="public/images/{services,events,case-studies}"
      lede="Every image below is a real photo from the site. The common thread: events lit like events — coloured light in the dark, people mid-moment, gear shown working."
    >
      <div className="columns-2 gap-3 md:columns-3 xl:columns-4">
        {IMAGERY.map((im) => (
          <div key={im.src} className="group relative mb-3 break-inside-avoid overflow-hidden rounded-[16px] border border-white/[0.08]" style={{ aspectRatio: im.ratio }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={im.src} alt={im.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070a]/85 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
              <span className="text-[12px] font-bold text-white">{im.label}</span>
              <a href={im.src} download className="grid h-8 w-8 place-items-center rounded-[10px] border border-white/[0.15] bg-black/40 text-white/80 backdrop-blur-md transition-colors hover:text-white" aria-label={`Download ${im.label}`}>
                <Download className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {TRAITS.map((t) => (
          <Panel key={t.k}>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FFD24A]">{t.k}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{t.v}</p>
          </Panel>
        ))}
      </div>

      <SubHead meta="aspect-[…] as used in components">Aspect ratios</SubHead>
      <div className="flex flex-wrap items-end gap-4">
        {RATIOS.map((r) => (
          <Copy key={r.r} value={`aspect-[${r.r.replace(/ /g, "")}]`} className="!w-auto">
            <div className="flex flex-col items-start gap-2">
              <div
                className="overflow-hidden rounded-[12px] border border-[#FF2D6F]/30"
                style={{ width: r.w >= r.h ? 160 : (160 * r.w) / r.h * 0.75, aspectRatio: `${r.w} / ${r.h}`, background: "linear-gradient(135deg, rgba(255,45,111,0.25), rgba(255,94,58,0.06))" }}
              />
              <span className="font-mono text-[12px] text-white">{r.r}</span>
              <span className="max-w-[160px] text-[11px] leading-snug text-white/40">{r.use}</span>
            </div>
          </Copy>
        ))}
      </div>

      <SubHead meta="Overlay used on every photo card">Treatment</SubHead>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Raw", overlay: "" },
          { label: "Card scrim", overlay: "bg-gradient-to-t from-[#03070a]/95 via-[#03070a]/55 to-[#03070a]/15" },
          { label: "Hover · plum", overlay: "bg-gradient-to-t from-[#7C2D5A]/92 via-[#03070a]/55 to-[#03070a]/15" },
        ].map((t) => (
          <div key={t.label} className="relative aspect-[4/3] overflow-hidden rounded-[16px] border border-white/[0.08]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/events/festivals.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
            {t.overlay && <div className={cn("absolute inset-0", t.overlay)} />}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-[16px] font-extrabold text-white">{t.label}</p>
              {t.overlay && <p className="mt-1 truncate font-mono text-[10px] text-white/55">{t.overlay}</p>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ══ 10 · Motion ═════════════════════════════════════════════════════════ */

const PATTERNS = [
  { name: "Shimmer ring", spec: "conic cream → pink → coral → gold on @property --shimmer-angle · 3s linear ∞", file: "globals.css .shimmer-stroke (auto on brand buttons)" },
  { name: "Button lift", spec: "hover:-translate-y-0.5 · arrow group-hover:translate-x-0.5 · transition-all", file: "landing-hero.tsx · header.tsx" },
  { name: "Product card", spec: "hover:-translate-y-1 duration-300 · image scale-105 duration-500 · Quick View fades in", file: "product-card.tsx" },
  { name: "Service card", spec: "hover:-translate-y-0.5 · border /20 → /45 · image scale-105 duration-500", file: "services-grid-section.tsx" },
  { name: "Event card", spec: "hover:-translate-y-1 duration-500 · image scale-[1.08] duration-700 · scrim → plum · CTA pill fades in", file: "event-types-section.tsx" },
  { name: "Floating cards", spec: "floatY 5s ease-in-out ∞ · second card delayed −2.5s", file: "landing-hero.tsx" },
  { name: "Play pulse", spec: "animate-ping ring · hover:scale-110 duration-300", file: "landing-why-us.tsx" },
  { name: "Theme flip", spec: "html filter invert(1) hue-rotate(180deg) · transition filter 0.25s ease", file: "globals.css html.theme-light" },
]

export function MotionSection({ id, num }: SectionProps) {
  const m = tokens.motion
  const [run, setRun] = React.useState(0)
  return (
    <Section
      id={id}
      num={num}
      eyebrow="Motion & interaction"
      title="Smooth, never"
      accent="showy."
      source="@keyframes + duration-* in the codebase"
      lede="300ms for buttons and cards, 500ms for image zoom and the header, 700ms for event-card zoom. The shimmer ring loops every 3s; ambient loops (orbs, gradient, tickers) run slow — 6 to 140 seconds — so the page breathes without distracting."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <SubHead meta="utility + CSS">Durations</SubHead>
          <div className="space-y-2">
            {m.durations.map((d) => (
              <Copy key={d.ms} value={`${d.ms}ms`}>
                <div className="flex items-center gap-3">
                  <span className="w-14 shrink-0 font-mono text-[12px] text-white">{d.ms}ms</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                    <div className="h-full rounded-full" style={{ width: `${(d.ms / 900) * 100}%`, background: BRAND_GRADIENT }} />
                  </div>
                  <span className="hidden w-32 shrink-0 truncate text-[10.5px] text-white/35 sm:inline">{"css" in d && d.css ? d.css.join(", ") : "duration-" + d.ms}</span>
                  <Uses n={d.uses} />
                </div>
              </Copy>
            ))}
          </div>
        </Panel>
        <Panel>
          <SubHead meta={<button type="button" onClick={() => setRun((r) => r + 1)} className="font-bold text-[#FF2D6F] hover:text-white">Replay ↻</button>}>Easing</SubHead>
          <div className="space-y-3">
            {m.easings.filter((e) => e.value !== "1 - (1 - t)^4").map((e) => (
              <div key={e.key}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[12px] text-white">{e.key}</span>
                  <CopyChip value={e.value} />
                </div>
                <div className="relative mt-1.5 h-6 rounded-full bg-white/[0.03]">
                  <span
                    key={run}
                    className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full"
                    style={{ background: BRAND_GRADIENT, boxShadow: "0 0 12px rgba(255,45,111,0.6)", animation: `sg-travel 1.6s ${e.value} infinite alternate` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-white/35">{e.note}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <SubHead meta="Verbatim from globals.css — live">Keyframes</SubHead>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <KF name="fadeIn" note=".animate-fade-in 0.4s" run={run}>
          <div key={run} className="animate-fade-in rounded-[10px] px-3 py-2 text-[12px] font-bold text-white" style={{ background: BRAND_GRADIENT }}>
            Hello
          </div>
        </KF>
        <KF name="floatY" note="5s ease-in-out ∞">
          <div className="animate-float-y h-10 w-10 rounded-[12px] border border-[#FF2D6F]/30 bg-[#FF2D6F]/15" />
        </KF>
        <KF name="pulse-ds" note="2s — pill dot">
          <span className="ds-pill">
            <span className="dot" /> Live
          </span>
        </KF>
        <KF name="gradientShift" note="6s — accent text">
          <span className="ds-accent-text text-[28px] font-extrabold">Trust</span>
        </KF>
        <KF name="eq-bar" note="1.2s — equaliser">
          <div className="flex h-10 items-end gap-1">
            {[0, 0.2, 0.4, 0.1, 0.3].map((d, i) => (
              <span key={i} className="animate-eq w-1.5 rounded-full" style={{ animationDelay: `${d}s`, background: BRAND_GRADIENT }} />
            ))}
          </div>
        </KF>
        <KF name="orbA / B / C" note="22 · 26 · 30s">
          <div className="relative h-14 w-24">
            <span className="absolute h-10 w-10 rounded-full opacity-80 blur-md" style={{ background: "#FF2D6F", animation: "orbA 6s ease-in-out infinite", transform: "scale(.3)" }} />
          </div>
        </KF>
        <KF name="scroll-left" note="76–120s linear — tickers">
          <div className="w-full overflow-hidden">
            <div className="flex w-max gap-2" style={{ animation: "scroll-left 6s linear infinite" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="h-6 w-10 rounded-md border border-white/10 bg-white/[0.05]" />
              ))}
            </div>
          </div>
        </KF>
        <KF name="ping" note="tailwind animate-ping">
          <span className="relative flex h-3 w-3">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#FF2D6F] opacity-75" />
            <span className="relative h-3 w-3 rounded-full bg-[#FF2D6F]" />
          </span>
        </KF>
        <KF name="accordion" note="radix up/down 200ms">
          <Icons.ChevronDown className="h-5 w-5 text-white/60" style={{ animation: "sg-flip 1.6s ease-in-out infinite alternate" }} />
        </KF>
        <KF name="scanlines" note="3s linear">
          <div className="animate-scanlines h-12 w-20 rounded-md" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,45,111,0.35) 0 1px, transparent 1px 4px)" }} />
        </KF>
      </div>

      <SubHead>Interaction patterns</SubHead>
      <div className="grid gap-3 md:grid-cols-2">
        {PATTERNS.map((p) => (
          <div key={p.name} className="flex gap-4 rounded-[16px] border border-white/[0.08] bg-white/[0.02] p-4">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: BRAND_GRADIENT, boxShadow: "0 0 10px rgba(255,45,111,.7)" }} />
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-white">{p.name}</p>
              <p className="mt-0.5 font-mono text-[11px] leading-relaxed text-white/55">{p.spec}</p>
              <p className="mt-1 text-[11px] text-white/30">{p.file}</p>
            </div>
          </div>
        ))}
      </div>
      <Note>
        Heavy background loops pause while a modal is open (<code className="font-mono text-white/60">body.modal-open</code>). The shimmer ring stops under
        prefers-reduced-motion: reduce — new motion must do the same.
      </Note>
      <style>{`@keyframes sg-travel { from { left: 0 } to { left: calc(100% - 1rem) } } @keyframes sg-flip { from { transform: rotate(0) } to { transform: rotate(180deg) } }`}</style>
    </Section>
  )
}

function KF({ name, note, children }: { name: string; note: string; run?: number; children: React.ReactNode }) {
  const css = tokens.keyframes.find((k) => k.name === name.split(" ")[0])?.css
  return (
    <Copy value={css ?? name} className="rounded-[16px] border border-white/[0.08] bg-white/[0.02] p-3">
      <div className="grid h-24 place-items-center overflow-hidden rounded-[12px] bg-[#050310]/60">{children}</div>
      <p className="mt-2 font-mono text-[12px] text-white">{name}</p>
      <p className="text-[10.5px] text-white/35">{note}</p>
    </Copy>
  )
}

/* ══ 11 · Tokens ═════════════════════════════════════════════════════════ */

export function TokensSection({ id, num }: SectionProps) {
  const [tab, setTab] = React.useState<"css" | "json">("css")
  const [src, setSrc] = React.useState<{ css: string; json: string }>({ css: "", json: "" })

  React.useEffect(() => {
    let alive = true
    Promise.all([fetch("/brand/tokens/design-tokens.css").then((r) => r.text()), fetch("/brand/tokens/design-tokens.json").then((r) => r.text())])
      .then(([css, json]) => alive && setSrc({ css, json }))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  const counts = [
    ["Colours", tokens.palette.reduce((n, g) => n + g.colors.length, 0)],
    ["Gradients", tokens.gradients.length],
    ["Effects", tokens.effects.length],
    ["Keyframes", tokens.keyframes.length],
    ["Radii", tokens.radius.scale.length],
    ["Durations", tokens.motion.durations.length],
  ] as const

  return (
    <Section
      id={id}
      num={num}
      eyebrow="Design tokens"
      title="Generated,"
      accent="not typed."
      source="scripts/generate-design-tokens.mjs"
      lede={
        <>
          The token files are built from <code className="font-mono text-[14px] text-white/80">app/globals.css</code> — the same CSS variables the site renders with.
          Change a variable, re-run the generator, and the files, this page and the brand kit all follow.
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1.6fr]">
        <div className="space-y-4">
          <Panel>
            <div className="flex items-center gap-3 text-[12px] font-bold text-white/70">
              {["globals.css", "generator", "tokens + page + kit"].map((s, i) => (
                <React.Fragment key={s}>
                  {i > 0 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#FF2D6F]" />}
                  <span className="rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5">{s}</span>
                </React.Fragment>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {counts.map(([k, v]) => (
                <Fact key={k} label={k} value={v} />
              ))}
            </div>
          </Panel>
          <Panel>
            <p className="text-[13px] font-bold text-white">Download</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <DownloadLink href="/brand/tokens/design-tokens.css" label="design-tokens.css" primary />
              <DownloadLink href="/brand/tokens/design-tokens.json" label="design-tokens.json" />
              <DownloadLink href={kit.packages.tokens.src} label="Both (ZIP)" />
            </div>
          </Panel>
          <CodeBlock code={`# regenerate after editing app/globals.css\nnode scripts/generate-design-tokens.mjs\nnode scripts/generate-brand-assets.mjs`} />
        </div>
        <div className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
          <div className="flex gap-1 border-b border-white/[0.06] p-1.5">
            {(["css", "json"] as const).map((t) => (
              <button key={t} type="button" onClick={() => setTab(t)} className={cn("rounded-[10px] px-3 py-1.5 font-mono text-[12px] font-bold", tab === t ? "bg-[#FF2D6F]/15 text-[#FF2D6F]" : "text-white/45 hover:text-white")}>
                design-tokens.{t}
              </button>
            ))}
          </div>
          <CodeBlock code={(tab === "css" ? src.css : src.json) || "Loading…"} className="rounded-none border-0" maxHeight="34rem" />
        </div>
      </div>
    </Section>
  )
}
