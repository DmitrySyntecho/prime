"use client"

import * as React from "react"
import { Clock, Phone, Users, ShieldCheck, Sparkles, Timer, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { PHONE_DISPLAY } from "@/lib/contact"
import tokens from "@/lib/brand/design-tokens.json"
import kit from "@/lib/brand/asset-manifest.json"
import { HeroCTA, WatchButton, IncludesBar, HeroBullets, FloatingCard, WhyCard, ProductCard } from "../site-parts"
import { Section, SubHead, Panel, Stage, CodeBlock, CopyChip, Copy, DownloadLink, Verdict, Fact, Uses, Note, type StageTone } from "../ui"

type SectionProps = { id: string; num: number }

const BRAND_GRADIENT = "linear-gradient(135deg, var(--emerald) 0%, var(--emerald-deep) 100%)"

/* ══ 01 · Overview ═══════════════════════════════════════════════════════ */

const DNA = [
  { k: "Flawless — or we fix it", v: "“Your event runs flawlessly — or we make it right.” Every surface should feel rehearsed, never improvised.", Icon: ShieldCheck },
  { k: "One team, one contract", v: "Same crew from site survey to strike. No handoffs, no miscommunication, zero surprises.", Icon: Users },
  { k: "Fast and early", v: "Quote delivered in under 4 hours, show tested 2 hours before doors. Speed is part of the brand.", Icon: Timer },
  { k: "Proof first", v: "1,986+ events, real behind-the-scenes video, real gear with real prices. Show, don’t claim.", Icon: Sparkles },
]

export function OverviewSection({ id, num }: SectionProps) {
  const swatches = tokens.palette.flatMap((g) => g.colors).filter((c) => ["--emerald", "--emerald-deep", "--teal", "#FFB366", "--orb-violet", "--orb-blue", "--page-ink", "--ink"].includes(c.token))
  return (
    <Section id={id} num={num} eyebrow="Brand overview" title="Prime Line AV," accent="at a glance." source="components/landing/landing-hero.tsx">
      {/* Cover — the live landing hero, recomposed */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 p-6 sm:p-10 lg:p-14" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)" }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-50 blur-[90px]" style={{ background: "#7C3AED" }} />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full opacity-40 blur-[100px]" style={{ background: "#3B5CF6" }} />
        <div className="relative grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,340px)] xl:items-center 2xl:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div className="flex flex-col items-start gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo/prime-line-av-logo.svg" alt="Prime Line AV" className="theme-logo-dark h-8 w-auto sm:h-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo/prime-line-av-logo-light.svg" alt="Prime Line AV" className="theme-logo-light h-8 w-auto sm:h-10" />
            <div>
              <h3 className="mb-4 text-[30px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[38px] lg:text-[48px]">
                Full-Service <span className="ds-accent-text">AV Production</span> in Los Angeles
              </h3>
              <p className="max-w-[520px] text-[15px] leading-relaxed text-white/65 md:text-[17px]">
                Your event runs flawlessly — or we make it right. One team, one contract, zero surprises.
              </p>
            </div>
            <HeroBullets />
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap [&_button]:whitespace-nowrap">
              <HeroCTA />
              <WatchButton />
            </div>
            <IncludesBar />
          </div>
          <div className="relative hidden h-[420px] xl:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/services/stage-rental-card.webp" alt="" className="absolute right-0 top-0 h-[58%] w-[78%] rounded-[18px] border border-white/10 object-cover" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/services/sound-system-card.webp" alt="" className="absolute bottom-0 left-0 h-[48%] w-[56%] rounded-[18px] border border-white/10 object-cover" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/services/lighting-rental-card.webp" alt="" className="absolute bottom-6 right-0 h-[40%] w-[42%] rounded-[18px] border border-white/10 object-cover" />
            <div className="absolute right-2 top-[-10px] z-10">
              <FloatingCard />
            </div>
            <div className="absolute bottom-[34%] left-[-14px] z-10">
              <FloatingCard title="2 Hours Early" sub="Tested before doors" Icon={Clock} />
            </div>
          </div>
        </div>
      </div>

      {/* Palette + type + DNA */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Panel padded={false}>
          <div data-keep-color className="flex h-44 sm:h-56">
            {swatches.map((c, i) => (
              <Copy key={c.token} value={c.hex} className={cn("h-full min-w-0", i < 2 ? "flex-[2]" : "flex-1")}>
                <div className="flex h-full flex-col justify-end p-2.5 sm:p-3" style={{ background: c.css }}>
                  <span className={cn("truncate text-[9px] font-extrabold uppercase tracking-[0.08em] sm:text-[10px]", c.contrastWithWhite < 2.2 ? "text-[#03070a]/80" : "text-white/85")}>{c.name}</span>
                  <span className={cn("truncate font-mono text-[9px] sm:text-[10px]", c.contrastWithWhite < 2.2 ? "text-[#03070a]/60" : "text-white/55")}>{c.hex}</span>
                </div>
              </Copy>
            ))}
          </div>
          <div data-keep-color className="h-2" style={{ background: BRAND_GRADIENT }} />
        </Panel>
        <Panel className="flex flex-col justify-between">
          <div className="flex items-end justify-between gap-4">
            <span className="text-[88px] font-extrabold leading-[0.85] tracking-[-0.04em] text-white sm:text-[110px]">Aa</span>
            <div className="text-right">
              <p className="text-[20px] font-extrabold text-white">Manrope</p>
              <p className="text-[12px] text-white/45">400 · 500 · 600 · 700 · 800</p>
              <p className="mt-2 font-mono text-[12px] text-white/45">JetBrains Mono · 400 · 500</p>
            </div>
          </div>
          <p className="mt-6 text-[13px] leading-relaxed text-white/50">
            One family does everything. Headlines run extrabold with tight negative tracking; labels run tiny, uppercase and wide. Prices run black (900).
          </p>
        </Panel>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {DNA.map((d) => (
          <WhyCard key={d.k} title={d.k} body={d.v} Icon={d.Icon} />
        ))}
      </div>
    </Section>
  )
}

/* ══ 02 · Logo ═══════════════════════════════════════════════════════════ */

const GROUND: Record<string, StageTone> = { ink: "ink", paper: "paper", brand: "brand" }

export function LogoSection({ id, num }: SectionProps) {
  const g = tokens.logoGeometry
  const vbW = g.viewBox.width
  const vbH = g.viewBox.height
  const x = g.capHeight
  // Clear-space frame around the ink box, in viewBox units → percentages of the padded artboard.
  const pad = x
  const frameW = g.inkBox.width + pad * 2
  const frameH = g.inkBox.height + pad * 2

  const lockups = kit.logos.filter((l) => l.kind === "lockup")
  const monos = kit.logos.filter((l) => l.kind === "monogram")

  return (
    <Section
      id={id}
      num={num}
      eyebrow="Logo system"
      title="The lockup and"
      accent="the monogram."
      source="public/images/prime-line-av-logo-*.svg · public/icon.svg"
      lede={
        <>
          PRIMELINE set in a geometric sans, <b className="text-white">AV</b> and the underline swoosh in the logo gradient{" "}
          <code className="font-mono text-[13px] text-[#FF3467]">#FF3467 → #FF593F</code>. The PL monogram on a pink-to-indigo disc is the
          app icon and favicon. Every file below is generated from the SVGs the site ships.
        </>
      }
    >
      {/* Primary + clear space */}
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Stage tone="ink" className="min-h-[18rem] flex-col gap-8 p-6 sm:p-12">
          <div className="relative w-full max-w-[640px]" style={{ aspectRatio: `${frameW} / ${frameH}` }}>
            <div className="absolute inset-0 rounded-sm border border-dashed border-[#FF2D6F]/50 bg-[#FF2D6F]/[0.04]" />
            <div
              className="absolute border border-[#FF2D6F]/30"
              style={{ left: `${(pad / frameW) * 100}%`, top: `${(pad / frameH) * 100}%`, width: `${(g.inkBox.width / frameW) * 100}%`, height: `${(g.inkBox.height / frameH) * 100}%` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo/prime-line-av-logo.svg"
                alt="Prime Line AV primary logo"
                className="absolute max-w-none"
                style={{
                  width: `${(vbW / g.inkBox.width) * 100}%`,
                  left: `${(-g.inkBox.x / g.inkBox.width) * 100}%`,
                  top: `${(-g.inkBox.y / g.inkBox.height) * 100}%`,
                }}
              />
            </div>
            {/* x markers */}
            {[
              { l: 0, t: 50, w: pad / frameW, h: 0, label: "x" },
              { l: 100 - (pad / frameW) * 100, t: 50, w: pad / frameW, h: 0, label: "x" },
            ].map((m, i) => (
              <span key={i} className="absolute -translate-y-1/2 border-t border-[#FFD24A] text-center" style={{ left: `${m.l}%`, top: `${m.t}%`, width: `${m.w * 100}%` }}>
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#FFD24A]">x</span>
              </span>
            ))}
            <span className="absolute left-1/2 top-0 -translate-x-1/2 border-l border-[#FFD24A]" style={{ height: `${(pad / frameH) * 100}%` }} />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <DownloadLink href="/brand/logo/prime-line-av-logo.svg" label="SVG" primary />
            <DownloadLink href="/brand/logo/png/prime-line-av-logo-2048.png" label="PNG 2048" />
            <DownloadLink href={kit.docs.clearspace} label="Construction notes" />
          </div>
        </Stage>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <Panel>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FFD24A]">Clear space · x</p>
            <p className="mt-2 text-[14px] leading-relaxed text-white/60">
              <b className="text-white">x = cap height of the P.</b> Keep x clear on every side. Nothing — type, photo edge, button — enters
              it.
            </p>
          </Panel>
          <Panel>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FFD24A]">Minimum size</p>
            <div className="mt-3 flex flex-wrap items-end gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo/prime-line-av-logo.svg" alt="" className="w-[140px]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo/prime-line-monogram.svg" alt="" className="h-4 w-4" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Fact label="Screen" value={`${g.minSize.lockupScreenPx}px`} />
              <Fact label="Print" value={`${g.minSize.lockupPrintMm}mm`} />
              <Fact label="Mark" value={`${g.minSize.monogramScreenPx}px`} />
            </div>
          </Panel>
          <Panel className="sm:col-span-2 xl:col-span-1">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FFD24A]">In the product</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Fact label="Header desktop" value={`${g.headerHeightPx.desktop}px tall`} />
              <Fact label="Header mobile" value={`${g.headerHeightPx.mobile}px tall`} />
              <Fact label="Footer" value={`${g.footerHeightPx}px tall`} />
              <Fact label="Aspect" value={`${g.aspect} : 1`} />
            </div>
          </Panel>
        </div>
      </div>

      <SubHead meta="SVG + PNG 128 → 2048">Lockup variants</SubHead>
      <div className="grid gap-4 sm:grid-cols-2">
        {lockups.map((l) => (
          <LogoCard key={l.slug} label={l.label} ground={GROUND[l.ground]} svg={l.svg} pngs={l.pngs}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.svg} alt={l.label} className="h-auto w-full max-w-[300px]" />
          </LogoCard>
        ))}
      </div>

      <SubHead meta="The favicon / avatar / app icon">Monogram</SubHead>
      <div className="grid gap-4 sm:grid-cols-3">
        {monos.map((l) => (
          <LogoCard key={l.slug} label={l.label} ground={GROUND[l.ground]} svg={l.svg} pngs={l.pngs}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.svg} alt={l.label} className="h-24 w-24" />
          </LogoCard>
        ))}
      </div>

      <SubHead>On real grounds</SubHead>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="keep-original relative flex aspect-[16/10] items-end overflow-hidden rounded-[16px] border border-white/[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/services/stage-rental.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo/prime-line-av-logo.svg" alt="" className="relative m-5 h-6 w-auto" />
          <span className="absolute right-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-bold text-white/70 backdrop-blur">Photo + scrim</span>
        </div>
        <div className="keep-original relative flex aspect-[16/10] items-center justify-center rounded-[16px]" style={{ background: BRAND_GRADIENT }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo/prime-line-av-logo-white.svg" alt="" className="h-7 w-auto" />
          <span className="absolute right-3 top-3 rounded-md bg-black/20 px-2 py-1 text-[10px] font-bold text-white/80">Brand gradient → white</span>
        </div>
        <div className="keep-original relative flex aspect-[16/10] items-center justify-center rounded-[16px] border border-white/10 bg-[#f4f4f5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo/prime-line-av-logo-light.svg" alt="" className="h-7 w-auto" />
          <span className="absolute right-3 top-3 rounded-md bg-black/5 px-2 py-1 text-[10px] font-bold text-black/50">Light → light lockup</span>
        </div>
      </div>

      <SubHead>Logo do &amp; don’t</SubHead>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Verdict ok title="Dark lockup on ink" note="The default. White wordmark, gradient AV, nothing touching it.">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo/prime-line-av-logo.svg" alt="" className="w-full max-w-[200px]" />
        </Verdict>
        <Verdict ok={false} title="Recoloured AV" note="AV is always the logo gradient (or the flat tone of the whole lockup).">
          <div className="w-full max-w-[200px]" style={{ filter: "hue-rotate(150deg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo/prime-line-av-logo.svg" alt="" className="w-full" />
          </div>
        </Verdict>
        <Verdict ok={false} title="Stretched" note="Never scale on one axis. Lock the aspect ratio.">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo/prime-line-av-logo.svg" alt="" className="h-12 w-[200px]" style={{ objectFit: "fill" }} />
        </Verdict>
        <Verdict ok={false} title="Dark lockup on light" note="Use the light or black lockup on pale grounds.">
          <div className="absolute inset-0 bg-[#f4f4f5]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo/prime-line-av-logo.svg" alt="" className="relative w-full max-w-[200px]" />
        </Verdict>
      </div>
    </Section>
  )
}

function LogoCard({
  label,
  ground,
  svg,
  pngs,
  children,
}: {
  label: string
  ground: StageTone
  svg: string
  pngs: { width: number; src: string }[]
  children: React.ReactNode
}) {
  return (
    <Panel padded={false}>
      <Stage tone={ground} className="m-2 min-h-[11rem] rounded-[14px]">
        {children}
      </Stage>
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pb-4 pt-2">
        <span className="text-[13px] font-bold text-white">{label}</span>
        <div className="flex flex-wrap gap-1.5">
          <DownloadLink href={svg} label="SVG" />
          {pngs
            .filter((p) => [512, 2048].includes(p.width))
            .map((p) => (
              <DownloadLink key={p.width} href={p.src} label={`PNG ${p.width}`} />
            ))}
        </div>
      </div>
    </Panel>
  )
}

/* ══ 03 · Colour ═════════════════════════════════════════════════════════ */

type Color = (typeof tokens.palette)[number]["colors"][number]

export function ColorSection({ id, num }: SectionProps) {
  return (
    <Section
      id={id}
      num={num}
      eyebrow="Colour system"
      title="Stage black,"
      accent="lit in pink."
      source=":root in app/globals.css"
      lede="Only the colours the site actually renders, grouped by job. Swatches paint with the live CSS variables, so this page changes when globals.css does. Click any value to copy it."
    >
      {tokens.palette.map((group) => (
        <div key={group.id} className="mb-12 last:mb-0">
          <SubHead meta={`${group.colors.length} colours`}>{group.name}</SubHead>
          <p className="-mt-3 mb-5 max-w-3xl text-[13.5px] leading-relaxed text-white/50">{group.blurb}</p>
          <div className={cn("grid gap-4", group.id === "primary" ? "md:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-3")}>
            {group.colors.map((c, i) => (
              <Swatch key={c.token} c={c} big={group.id === "primary" && i < 2} />
            ))}
          </div>
        </div>
      ))}

      <SubHead meta="Click to copy CSS">Gradients</SubHead>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tokens.gradients.map((g) => (
          <Copy key={g.id} value={g.css} className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
            {g.id === "accent-text" ? (
              <div data-keep-color className="grid h-36 place-items-center bg-[#050310]">
                <span className="ds-accent-text text-[52px] font-extrabold tracking-[-0.03em]">Trust</span>
              </div>
            ) : (
              <div data-keep-color className="h-36" style={{ background: g.id === "atmosphere" ? `${g.resolved}, #050310` : g.resolved }} />
            )}
            <div className="p-4">
              <p className="text-[14px] font-bold text-white">{g.name}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-white/45">{g.usage}</p>
              <p className="mt-3 line-clamp-2 break-all font-mono text-[10.5px] text-white/50">{g.resolved}</p>
            </div>
          </Copy>
        ))}
      </div>
      <Note>The accent-text card shows the gradient as the site uses it — clipped to italic type and drifting on gradientShift 6s.</Note>

      <SubHead meta="Read from the logo SVGs">Logo palette</SubHead>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {tokens.logoPalette.map((c) => (
          <Copy key={c.role} value={c.hex} className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.02]">
            <div data-keep-color className="h-20" style={{ background: c.hex }} />
            <div className="p-3">
              <p className="font-mono text-[12px] text-white">{c.hex}</p>
              <p className="mt-1 text-[11px] leading-snug text-white/45">{c.role}</p>
            </div>
          </Copy>
        ))}
      </div>
    </Section>
  )
}

function Swatch({ c, big }: { c: Color; big?: boolean }) {
  const lightChip = c.contrastWithWhite < 2.2
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
      <Copy value={c.hex}>
        <div data-keep-color className={cn("relative flex flex-col justify-between p-4", big ? "h-48 md:h-56" : "h-32")} style={{ background: c.css }}>
          {c.alpha < 1 && <div className="absolute inset-0 -z-10 bg-[#050310]" />}
          <span className={cn("self-start rounded-md px-2 py-0.5 font-mono text-[10px]", lightChip ? "bg-black/10 text-black/70" : "bg-black/25 text-white/80")}>
            {c.isVar ? `var(${c.token})` : "literal"}
          </span>
          <span className={cn("text-[22px] font-extrabold tracking-[-0.02em]", lightChip ? "text-[#03070a]" : "text-white", big && "md:text-[30px]")}>{c.name}</span>
        </div>
      </Copy>
      <div className="space-y-3 p-4">
        <p className="text-[12px] leading-snug text-white/50">{c.role}</p>
        <div className="flex flex-wrap gap-1.5">
          <CopyChip label="hex" value={c.hex} tone="pink" />
          <CopyChip label="rgb" value={c.rgb} />
          <CopyChip label="hsl" value={c.hsl} />
          {c.isVar && <CopyChip label="css" value={`var(${c.token})`} />}
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/40">
          <span>
            on ink <b className="font-mono text-white/70">{c.contrastOnInk}:1</b>
          </span>
          {c.alpha < 1 && (
            <span>
              ≈ <b className="font-mono text-white/70">{c.hexOnInk}</b> solid
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ══ 04 · Typography ═════════════════════════════════════════════════════ */

export function TypographySection({ id, num }: SectionProps) {
  const t = tokens.typography
  const [text, setText] = React.useState("Nothing goes wrong at our events")
  const [accent, setAccent] = React.useState(true)

  return (
    <Section
      id={id}
      num={num}
      eyebrow="Typography"
      title="Manrope,"
      accent="turned up."
      source="next/font/google in app/layout.tsx"
      lede="One geometric sans for everything, loaded through next/font with stylistic sets ss01 and cv11 switched on site-wide. JetBrains Mono handles phone numbers, timers and codes."
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel className="relative overflow-hidden">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FF2D6F]">Primary · {t.families[0].token}</p>
          <p className="mt-4 text-[96px] font-extrabold leading-[0.85] tracking-[-0.04em] text-white sm:text-[150px]">Aa</p>
          <p className="mt-4 text-[26px] font-extrabold tracking-[-0.02em] text-white">Manrope</p>
          <p className="mt-1 break-words text-[13px] text-white/45">ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789 · &amp;@#→</p>
          <div className="mt-6 grid grid-cols-5 gap-2">
            {t.families[0].weights.map((w) => (
              <div key={w} className="rounded-[12px] border border-white/[0.08] bg-white/[0.03] p-3 text-center">
                <p className="text-[28px] leading-none text-white" style={{ fontWeight: w }}>
                  Ag
                </p>
                <p className="mt-2 font-mono text-[10px] text-white/45">{w}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <CopyChip value={t.families[0].stack} label="stack" />
            <CopyChip value={t.families[0].features ?? ""} label="features" />
          </div>
        </Panel>
        <div className="grid gap-5">
          <Panel>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FF2D6F]">Mono · {t.families[1].token}</p>
            <p suppressHydrationWarning className="mt-3 whitespace-nowrap font-mono text-[28px] leading-none text-white sm:text-[34px]">{PHONE_DISPLAY}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/50">{t.families[1].role}</p>
            <div className="mt-3">
              <CopyChip value={t.families[1].stack} label="stack" />
            </div>
          </Panel>
          <Panel>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FF2D6F]">Weights in use</p>
            <div className="mt-3 space-y-2">
              {t.weights.map((w) => (
                <div key={w.key} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-[14px] text-white" style={{ fontWeight: w.weight }}>
                    {w.key}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                    <div className="h-full rounded-full" style={{ width: `${(w.uses / Math.max(...t.weights.map((x) => x.uses))) * 100}%`, background: BRAND_GRADIENT }} />
                  </div>
                  <Uses n={w.uses} />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <SubHead meta="Classes are copy-paste ready">Type scale</SubHead>
      <div className="divide-y divide-white/[0.06] overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
        {t.scale.map((s) => (
          <div key={s.key} className="grid gap-4 p-5 md:grid-cols-[9rem_1fr] md:p-6">
            <div className="space-y-1">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FFD24A]">{s.key}</p>
              <p className="font-mono text-[10.5px] leading-relaxed text-white/40">
                {s.size}
                <br />
                lh {s.lineHeight} · {s.weight}
                <br />
                tr {s.tracking}
              </p>
            </div>
            <div className="min-w-0">
              <TypeSample s={s} />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <CopyChip value={s.classes} className="max-w-full" />
                <span className="text-[11px] text-white/35">{s.usage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SubHead meta="Type to preview in every style">Playground</SubHead>
      <Panel>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a headline…"
            className="w-full flex-1 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder-white/35 transition-colors focus:border-[#FF2D6F]/50 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setAccent((a) => !a)}
            className={cn(
              "shrink-0 rounded-xl border px-4 py-3 text-[13px] font-bold transition-colors",
              accent ? "border-[#FF2D6F]/40 bg-[#FF2D6F]/15 text-[#FF2D6F]" : "border-white/[0.10] bg-white/[0.04] text-white/60",
            )}
          >
            Accent last word: {accent ? "on" : "off"}
          </button>
        </div>
        <div className="mt-6 space-y-6">
          {t.scale
            .filter((s) => ["Display", "H2", "H3 · card", "Lede", "Eyebrow", "Microcopy"].includes(s.key))
            .map((s) => (
              <div key={s.key} className="min-w-0">
                <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/30">{s.key}</p>
                <TypeSample s={{ ...s, sample: text || "Type something", accent: accent && s.accent !== undefined ? (text.trim().split(/\s+/).pop() ?? "") : undefined }} />
              </div>
            ))}
        </div>
      </Panel>

      <SubHead meta="Every arbitrary text-[px] the site uses">Measured sizes</SubHead>
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
        {t.sizes
          .filter((s) => s.uses >= 2)
          .map((s) => (
            <Copy key={s.px} value={`text-[${s.px}px]`} className="!w-auto">
              <div className="flex flex-col items-start">
                <span className="font-extrabold leading-none text-white" style={{ fontSize: Math.min(s.px, 72) }}>
                  Aa
                </span>
                <span className="mt-1 font-mono text-[10px] text-white/40">
                  {s.px} · {s.uses}×
                </span>
              </div>
            </Copy>
          ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {t.tracking
          .filter((tr) => tr.uses >= 3)
          .map((tr) => (
            <CopyChip key={tr.value} value={`tracking-[${tr.value}]`} label={`${tr.uses}×`} />
          ))}
      </div>
    </Section>
  )
}

type Scale = (typeof tokens.typography.scale)[number] & { accent?: string }

function TypeSample({ s }: { s: Scale }) {
  if (s.classes === "ds-pill") {
    return (
      <span className="ds-pill">
        <span className="dot" />
        {s.sample}
      </span>
    )
  }
  const sample = s.sample
  const acc = s.accent && sample.endsWith(s.accent) ? s.accent : null
  const head = acc ? sample.slice(0, sample.length - acc.length) : sample
  return (
    <p className={cn(s.classes, "break-words text-white")}>
      {head}
      {acc && <span className="ds-accent-text">{acc}</span>}
    </p>
  )
}

/* ══ 05 · Spacing, grid, responsive ══════════════════════════════════════ */

export function SpacingSection({ id, num }: SectionProps) {
  const sp = tokens.spacing
  const maxUses = Math.max(...sp.scale.map((s) => s.uses))
  return (
    <Section
      id={id}
      num={num}
      eyebrow="Spacing, grid & responsive"
      title="A 4px rhythm,"
      accent="a 1280 stage."
      source="measured from app/ + components/"
      lede="Tailwind’s 4px step, measured by how often each value appears. Every section sits in a max-w-7xl container with a 16px gutter and breathes on py-20 → md:py-28."
    >
      <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        <Panel>
          <SubHead meta="bar = size · badge = uses">Spacing scale</SubHead>
          <div className="space-y-1.5">
            {sp.scale.map((s) => (
              <Copy key={s.step} value={`${s.px}px`}>
                <div className="flex items-center gap-3 rounded-lg px-1 py-1 hover:bg-white/[0.03]">
                  <span className="w-10 shrink-0 font-mono text-[11px] text-white/60">{s.step}</span>
                  <span className="w-12 shrink-0 font-mono text-[11px] text-white/35">{s.px}px</span>
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="h-3 shrink-0 rounded-[3px]" style={{ width: Math.min(s.px * 1.6, 220), background: BRAND_GRADIENT, opacity: 0.35 + (s.uses / maxUses) * 0.65 }} />
                    <Uses n={s.uses} />
                  </div>
                </div>
              </Copy>
            ))}
          </div>
        </Panel>
        <div className="grid content-start gap-5">
          <Panel>
            <SubHead>Section rhythm</SubHead>
            <div className="flex flex-wrap gap-2">
              {sp.sectionPadding.slice(0, 8).map((p) => (
                <CopyChip key={p.key} value={p.key} label={`${p.uses}×`} />
              ))}
            </div>
            <Note>Services / event types: py-24 md:py-28 · products: py-20 md:py-24 · why-us: py-16 md:py-24 · hero: pt-6 pb-2 → md:pt-10.</Note>
          </Panel>
          <Panel>
            <SubHead>Gutter</SubHead>
            <p className="text-[13.5px] leading-relaxed text-white/55">{sp.gutter}</p>
            <div className="mt-3">
              <CopyChip value="max-w-7xl mx-auto px-4" tone="pink" />
            </div>
          </Panel>
        </div>
      </div>

      <SubHead meta="Scaled to the 1280px stage">Containers</SubHead>
      <Panel>
        <div className="space-y-2">
          {tokens.containers.map((c) => (
            <Copy key={c.key} value={c.key}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 shrink-0 items-center rounded-[10px] border border-[#FF2D6F]/25 bg-[#FF2D6F]/[0.07] px-3"
                  style={{ width: `${(c.px / 1280) * 100}%`, minWidth: "7rem" }}
                >
                  <span className="truncate font-mono text-[11px] text-white/80">{c.key}</span>
                </div>
                <span className="hidden shrink-0 font-mono text-[11px] text-white/40 sm:inline">{c.px}px</span>
                <span className="hidden truncate text-[11px] text-white/35 md:inline">{c.role}</span>
                <Uses n={c.uses} />
              </div>
            </Copy>
          ))}
        </div>
      </Panel>

      <SubHead meta="4 → 8 → 12 columns, 16 → 24px gaps">Layout grid</SubHead>
      <Panel>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-12 lg:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={cn("h-28 rounded-[10px] border border-[#FF2D6F]/20 bg-[#FF2D6F]/[0.08]", i >= 4 && "hidden sm:block", i >= 8 && "sm:hidden lg:block")}
            >
              <span className="block p-2 font-mono text-[10px] text-[#FF2D6F]/70">{i + 1}</span>
            </div>
          ))}
        </div>
        <Note>
          The site composes on this grid with explicit column templates — hero <code className="font-mono text-white/60">lg:grid-cols-[1.05fr_0.95fr]</code>,
          footer <code className="font-mono text-white/60">lg:grid-cols-[1.6fr_1fr_1fr_0.9fr]</code>, services <code className="font-mono text-white/60">grid-cols-2 lg:grid-cols-4</code>, event types <code className="font-mono text-white/60">grid-cols-2 lg:grid-cols-5</code>.
        </Note>
      </Panel>

      <SubHead meta="min-width, mobile first">Breakpoints</SubHead>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {tokens.breakpoints.map((b) => (
          <Copy key={b.key} value={b.key === "base" ? "0px" : `${b.px}px`} className="rounded-[16px] border border-white/[0.08] bg-white/[0.02] p-4">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[14px] font-medium text-white">{b.key}</span>
              <span className="font-mono text-[12px] text-[#FF2D6F]">{b.px ? `≥ ${b.px}px` : "0"}</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
              <div className="h-full rounded-full" style={{ width: `${Math.max(4, (b.px / 1280) * 100)}%`, background: BRAND_GRADIENT }} />
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-[12px] text-white/45">{b.note}</span>
              <Uses n={b.uses} />
            </div>
          </Copy>
        ))}
      </div>
    </Section>
  )
}

/* ══ 06 · Radius, borders, shadows, effects ══════════════════════════════ */

const SHADOWS = [
  { name: "CTA glow", css: "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)", usage: "Hero + header CTAs" },
  { name: "Add to Quote", css: "0 8px 20px -4px rgba(255,45,111,0.5)", usage: "Product card button" },
  { name: "Product card", css: "0 8px 32px -8px rgba(0,0,0,0.5)", usage: "product-card.tsx" },
  { name: "Service card", css: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)", usage: "services-grid · testimonial" },
  { name: "Floating card", css: "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)", usage: "Hero stat cards" },
  { name: "Best-seller glow", css: "0 4px 12px rgba(255,210,74,0.4)", usage: "Gold Best Seller badge" },
]

const BORDERS = [
  { name: "Hairline", css: "1px solid rgba(255,255,255,0.08)", cls: "border-white/[0.08]", usage: "Event cards, testimonial, FAQ rows" },
  { name: "Glass line", css: "1px solid rgba(255,255,255,0.10)", cls: "border-white/[0.10]", usage: "Product cards, inputs, glass buttons" },
  { name: "Service card", css: "1px solid rgba(255,45,111,0.20)", cls: "border-[#FF2D6F]/20", usage: "Service cards (hover → /45)" },
  { name: "Gold line", css: "1px solid rgba(255,210,74,0.25)", cls: "border-[#FFD24A]/25", usage: "Includes bar" },
]

export function EffectsSection({ id, num }: SectionProps) {
  const fx = (sel: string) => tokens.effects.find((e) => e.selector === sel)?.css ?? ""
  return (
    <Section
      id={id}
      num={num}
      eyebrow="Radius, borders, shadows & effects"
      title="Glow, shimmer"
      accent="and haze."
      source="app/globals.css · product-card.tsx · landing-hero.tsx"
      lede="Soft, generous radii; hairline borders built from white at 8–25%; shadows that are mostly darkness, a pink glow under anything you can press, and a rotating cream-to-gold shimmer ring around every brand button."
    >
      <SubHead meta="Merged from rounded-* and rounded-[px]">Radius</SubHead>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        {tokens.radius.scale.map((r) => (
          <Copy key={r.px} value={r.px >= 9999 ? "9999px" : `${r.px}px`} className="rounded-[16px] border border-white/[0.08] bg-white/[0.02] p-3">
            <div
              className="mx-auto h-16 w-full border border-[#FF2D6F]/40"
              style={{ borderRadius: Math.min(r.px, 999), background: "linear-gradient(135deg, rgba(255,45,111,0.18), rgba(255,94,58,0.06))" }}
            />
            <div className="mt-2.5 flex items-center justify-between">
              <span className="font-mono text-[12px] text-white">{r.px >= 9999 ? "full" : `${r.px}px`}</span>
              <Uses n={r.uses} />
            </div>
            <p className="mt-1 line-clamp-2 text-[10.5px] leading-snug text-white/40">{r.role}</p>
          </Copy>
        ))}
      </div>
      <Note>
        shadcn base: <code className="font-mono text-white/60">--radius: {tokens.radius.base}</code> → sm {tokens.radius.theme.sm} · lg = var(--radius). Brand sections mostly set
        explicit px radii.
      </Note>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <div>
          <SubHead>Borders</SubHead>
          <div className="grid gap-3 sm:grid-cols-2">
            {BORDERS.map((b) => (
              <Copy key={b.name} value={b.css} className="rounded-[16px] bg-white/[0.02] p-4" >
                <div className="h-14 rounded-[12px] bg-white/[0.02]" style={{ border: b.css }} />
                <p className="mt-3 text-[13px] font-bold text-white">{b.name}</p>
                <p className="font-mono text-[10.5px] text-white/45">{b.cls}</p>
                <p className="mt-1 text-[11px] text-white/35">{b.usage}</p>
              </Copy>
            ))}
          </div>
        </div>
        <div>
          <SubHead>Shadows</SubHead>
          <div className="grid gap-3 sm:grid-cols-2">
            {SHADOWS.map((s) => (
              <Copy key={s.name} value={s.css} className="rounded-[16px] bg-white/[0.02] p-4">
                <div className="h-14 rounded-[12px] border border-white/[0.06] bg-[#0a0820]" style={{ boxShadow: s.css }} />
                <p className="mt-4 text-[13px] font-bold text-white">{s.name}</p>
                <p className="mt-0.5 text-[11px] text-white/35">{s.usage}</p>
              </Copy>
            ))}
          </div>
        </div>
      </div>

      <SubHead meta="Live — straight from the site">Signature effects</SubHead>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <EffectCard name=".shimmer-stroke (auto on brand buttons)" code={`/* globals.css — applied to every button/a with the #FF2D6F → #FF5E3A gradient, and to .shimmer-stroke */\n${fx(".shimmer-stroke")}\n\n${fx(".shimmer-stroke::after")}`}>
          <HeroCTA />
        </EffectCard>
        <EffectCard name=".shimmer-stroke (glass)" code={`<button className="shimmer-stroke … bg-white/[0.05] border border-white/[0.12]">…</button>`}>
          <WatchButton />
        </EffectCard>
        <EffectCard name=".ds-card (hover)" code={`${fx(".ds-card")}\n\n/* :hover */\n${fx(".ds-card:hover")}\n\n/* ::before */\n${fx(".ds-card::before")}`}>
          <div className="w-full max-w-[260px]">
            <WhyCard title="Hover me" body="Lifts 4px, border warms to pink, a pink radial blooms from the top." />
          </div>
        </EffectCard>
        <EffectCard name=".ds-pill" code={`${fx(".ds-pill")}\n\n${fx(".ds-pill .dot")}`}>
          <span className="ds-pill">
            <span className="dot" /> Event types
          </span>
        </EffectCard>
        <EffectCard name=".ds-accent-text" code={fx(".ds-accent-text")}>
          <span className="text-[38px] font-extrabold tracking-[-0.025em] text-white">
            Our Recent <span className="ds-accent-text">Work</span>
          </span>
        </EffectCard>
        <EffectCard name="Floating card · floatY 5s" code={`/* landing-hero.tsx */\nbackground: rgba(8,18,26,0.85);\nborder: 1px solid rgba(255,45,111,0.25);\nborder-radius: 14px;\nbackdrop-filter: blur(40px);\nbox-shadow: 0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);\nanimation: floatY 5s ease-in-out infinite;  /* second card: delay -2.5s */`}>
          <FloatingCard />
        </EffectCard>
        <EffectCard name="Play button pulse" code={`/* landing-why-us.tsx showreel */\nbackground: linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%);\nbox-shadow: 0 16px 48px -8px rgba(255,45,111,0.6);\n/* ring: animate-ping rgba(255,45,111,0.25) · hover: scale-110 duration-300 */`}>
          <div className="group relative grid h-20 w-20 cursor-pointer place-items-center rounded-full transition-all duration-300 hover:scale-110" style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", boxShadow: "0 16px 48px -8px rgba(255,45,111,0.6)" }}>
            <span className="absolute inset-0 animate-ping rounded-full" style={{ background: "rgba(255,45,111,0.25)" }} />
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </EffectCard>
        <EffectCard name="Ribbon + Best Seller" code={`/* product-card.tsx */\nclip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%);   /* ribbon notch */\nborder-top: 4px solid #C41F55;                                   /* ribbon fold */\nbackground: linear-gradient(135deg, #FFD24A 0%, #FF9500 100%);   /* Best Seller */`}>
          <div className="relative h-full w-full">
            <span className="absolute left-4 top-6 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "linear-gradient(135deg, #FFD24A 0%, #FF9500 100%)", color: "#000", boxShadow: "0 4px 12px rgba(255,210,74,0.4)" }}>
              <Star className="h-3 w-3" fill="currentColor" /> Best Seller
            </span>
            <div className="absolute -right-[2px] top-6">
              <div className="relative px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-white" style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%)", boxShadow: "0 4px 12px rgba(255,45,111,0.5)" }}>
                -9% OFF
              </div>
              <div className="absolute -bottom-1 right-0 h-0 w-0" style={{ borderLeft: "6px solid transparent", borderTop: "4px solid #C41F55" }} />
            </div>
          </div>
        </EffectCard>
        <EffectCard name=".bg-grid + .bg-orb" code={`${fx(".bg-grid")}\n\n${fx(".bg-orb")}`}>
          <div className="absolute inset-0 overflow-hidden rounded-[14px] bg-[#050310]">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-70 blur-[50px]" style={{ background: "#7C3AED", animation: "orbA 22s ease-in-out infinite" }} />
            <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full opacity-60 blur-[50px]" style={{ background: "#3B5CF6", animation: "orbB 26s ease-in-out infinite" }} />
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, rgba(255,45,111,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,45,111,0.08) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          </div>
          <span className="relative text-[12px] font-bold uppercase tracking-[0.16em] text-white/70">Stage atmosphere</span>
        </EffectCard>
      </div>
      <Note>The shimmer ring is driven by <code className="font-mono text-white/60">@property --shimmer-angle</code> and stops under prefers-reduced-motion. Any new button that uses the brand gradient inherits it automatically.</Note>
    </Section>
  )
}

function EffectCard({ name, code, children }: { name: string; code: string; children: React.ReactNode }) {
  const [show, setShow] = React.useState(false)
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
      <div className="relative m-2 flex h-48 items-center justify-center overflow-hidden rounded-[14px] p-6" style={{ background: "radial-gradient(ellipse 80% 70% at 70% 0%, rgba(255,45,111,0.16), transparent 70%), #07051a" }}>
        {children}
      </div>
      <div className="flex items-center justify-between gap-2 px-4 pb-3 pt-1">
        <code className="truncate font-mono text-[12px] text-white/80">{name}</code>
        <button type="button" onClick={() => setShow((s) => !s)} className="shrink-0 text-[11px] font-bold text-[#FF2D6F] hover:text-white">
          {show ? "Hide CSS" : "CSS"}
        </button>
      </div>
      {show && <CodeBlock code={code} className="mx-2 mb-2" maxHeight="16rem" />}
    </div>
  )
}
