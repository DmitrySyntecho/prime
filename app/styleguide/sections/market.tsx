"use client"

import * as React from "react"
import { ArrowRight, Star, CheckCircle2, Heart, MessageCircle, Send, Bookmark, Download, Package, Image as ImageIcon, Palette, Braces, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import kit from "@/lib/brand/asset-manifest.json"
import ai from "@/lib/brand/ai-prompts.json"
import { HeroCTA } from "../site-parts"
import { Section, SubHead, Panel, CopyChip, Copy, DownloadLink, Verdict, Note, formatBytes, useCopy } from "../ui"

type SectionProps = { id: string; num: number }
const BRAND_GRADIENT = "linear-gradient(135deg, var(--emerald) 0%, var(--emerald-deep) 100%)"

/* ══ 12 · Social system ══════════════════════════════════════════════════ */

const SOCIAL_RULES = [
  { k: "Ground", v: "Stage Black or a real event photo with a dark scrim. Never white, never a flat colour fill." },
  { k: "Hierarchy", v: "Logo → gold eyebrow pill → extrabold headline with one italic gradient word → one line of body → CTA." },
  { k: "Type on 1080px", v: "Headline 66–92px · body 21–25px · eyebrow 15–17px, 0.14em. Same ratios as the hero." },
  { k: "Shapes", v: "12px CTAs with the shimmer ring, 999px pills, 16–22px cards. Exactly the site primitives." },
  { k: "Colour budget", v: "White type, one pink→coral CTA, one gold accent. If violet shows up, it’s only in the haze." },
  { k: "Proof", v: "Lead with real numbers: 1,986+ events · quote in under 4 hours · show-ready 2 hours early." },
]

export function SocialSystemSection({ id, num }: SectionProps) {
  return (
    <Section
      id={id}
      num={num}
      eyebrow="Social media system"
      title="The feed is"
      accent="the website."
      lede="Social posts are the site, cropped to a phone: the same dark stage, glass, pills, gradient CTA and Manrope hierarchy. A follower who taps through should not notice a change in voice or look."
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        {/* Profile mock */}
        <Panel padded={false} className="keep-original max-w-md">
          <div className="relative h-28" style={{ background: "radial-gradient(ellipse 70% 90% at 85% 0%, rgba(255,45,111,0.55), transparent 60%), radial-gradient(ellipse 60% 90% at 0% 100%, rgba(124,58,237,0.5), transparent 60%), #050310" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo/prime-line-av-logo.svg" alt="" className="absolute bottom-4 right-4 h-4 w-auto opacity-80" />
          </div>
          <div className="px-5 pb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo/prime-line-monogram.svg" alt="" className="relative z-10 -mt-9 h-[72px] w-[72px] rounded-full border-4 border-[#0a0820]" />
            <p className="mt-2 text-[16px] font-extrabold text-white">Prime Line AV</p>
            <p className="text-[12px] text-white/45">primelineav.com · AV production</p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/70">
              Full-service AV production in Los Angeles. One team, one contract, zero surprises. 1,986+ events
            </p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              {["/images/services/stage-rental.webp", "/images/events/festivals.webp", "/images/services/led-screen.webp", "/images/events/corporate.webp", "/images/services/lighting.webp", "/images/case-studies/tiktok-2.webp"].map((s) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={s} src={s} alt="" loading="lazy" className="aspect-square w-full object-cover" />
              ))}
            </div>
          </div>
        </Panel>

        {/* Live post templates */}
        <div className="grid gap-4 sm:grid-cols-3">
          <PostFrame label="Case study">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/case-studies/tiktok-1.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050310] via-[#050310]/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-[7%]">
              <span className="ds-pill !px-2 !py-1 !text-[7px]">
                <span className="dot !h-1 !w-1" /> LA Convention Center
              </span>
              <p className="mt-2 text-[17px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
                TikTok Shop <span className="ds-accent-text">Summit 2026</span>
              </p>
            </div>
          </PostFrame>
          <PostFrame label="Proof / stat">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 90% 0%, rgba(255,45,111,0.45), transparent 60%), radial-gradient(ellipse 70% 60% at 0% 100%, rgba(124,58,237,0.35), transparent 60%), #050310" }} />
            <div className="relative flex h-full flex-col justify-between p-[8%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo/prime-line-av-logo.svg" alt="" className="h-2.5 w-auto self-start" />
              <div>
                <p className="text-[40px] font-extrabold leading-none tracking-[-0.04em] text-white"><span className="ds-accent-text">1,986+</span></p>
                <p className="mt-1 text-[9px] font-semibold text-white/70">events delivered</p>
              </div>
              <span className="inline-flex items-center gap-1 self-start rounded-[5px] px-2 py-1 text-[8px] font-extrabold text-white" style={{ background: BRAND_GRADIENT }}>
                Get Your Custom Quote <ArrowRight className="h-2 w-2" />
              </span>
            </div>
          </PostFrame>
          <PostFrame label="Client video">
            <div className="absolute inset-0 bg-[#050310]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/case-studies/lca-2.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
            <div className="relative flex h-full items-center p-[7%]">
              <div className="w-full rounded-[10px] border border-white/[0.08] p-3 backdrop-blur-md" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)" }}>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-2.5 w-2.5 fill-[#FFD24A] text-[#FFD24A]" />
                  ))}
                </div>
                <p className="mt-2 text-[11px] font-extrabold leading-snug tracking-[-0.01em] text-white">
                  Every Format. Every Industry. <span className="ds-accent-text">Real Results.</span>
                </p>
                <p className="mt-1.5 text-[7.5px] font-medium text-[#FF2D6F]">Brandon Dawson · Cardone Ventures</p>
              </div>
            </div>
          </PostFrame>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {SOCIAL_RULES.map((r, i) => (
          <div key={r.k} className="ds-card p-5">
            <span className="font-mono text-[11px] text-[#FF2D6F]">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-1.5 text-[15px] font-extrabold text-white">{r.k}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/50">{r.v}</p>
          </div>
        ))}
      </div>
      <Note>Post templates use the site&apos;s own case studies, testimonial names and stats. Real posts follow the same rule: real clients, real numbers.</Note>
    </Section>
  )
}

function PostFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="keep-original overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0a0820]">
        <div className="flex items-center gap-2 px-2.5 py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo/prime-line-monogram.svg" alt="" className="h-5 w-5" />
          <span className="text-[10px] font-bold text-white">Prime Line AV</span>
        </div>
        <div className="relative aspect-square overflow-hidden">{children}</div>
        <div className="flex items-center gap-3 px-2.5 py-2 text-white/70">
          <Heart className="h-3.5 w-3.5" />
          <MessageCircle className="h-3.5 w-3.5" />
          <Send className="h-3.5 w-3.5" />
          <Bookmark className="ml-auto h-3.5 w-3.5" />
        </div>
      </div>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">{label}</p>
    </div>
  )
}

/* ══ 13 · Banners ════════════════════════════════════════════════════════ */

export function BannersSection({ id, num }: SectionProps) {
  const banners = kit.banners
  return (
    <Section
      id={id}
      num={num}
      eyebrow="Banner concepts"
      title="Finished ads,"
      accent="ready to ship."
      source="scripts/brand/banner.mjs"
      lede="Four real ad units: Higgsfield background plate, readability scrim, and a full ad stack set in Manrope outlines — logo, gold eyebrow, headline with the italic gradient word, description, offer chip and the pink→coral CTA. The subject owns one side, the copy owns the other."
    >
      {banners.length === 0 ? (
        <Panel>
          <p className="text-[14px] text-white/60">Banner plates not generated yet — run node scripts/generate-brand-assets.mjs.</p>
        </Panel>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {banners.map((b) => (
            <div key={b.id} className={cn("overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]", b.ratio === "16:9" && "md:col-span-2")}>
              <div className={cn("relative bg-[#050310]", b.ratio === "9:16" ? "mx-auto max-w-[380px]" : "")} style={{ aspectRatio: `${b.width} / ${b.height}` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.preview} alt={`${b.label} — ${b.content.headline.replace(/[[\]\n]/g, " ")}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#FF2D6F]/15 px-2 py-0.5 font-mono text-[11px] font-medium text-[#FF2D6F]">{b.ratio}</span>
                    <span className="text-[13px] font-bold text-white">{b.label}</span>
                  </div>
                  <p className="mt-1 font-mono text-[10.5px] text-white/40">
                    {b.width}×{b.height} · {b.content.eyebrow} · “{b.content.offer}” · CTA “{b.content.cta}”
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <DownloadLink href={b.src} label="JPG" meta={formatBytes(b.bytes)} primary />
                  <DownloadLink href={b.plate} label="Plate" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}

/* ══ 14 · Formats ════════════════════════════════════════════════════════ */

export function FormatsSection({ id, num }: SectionProps) {
  const [safe, setSafe] = React.useState(true)
  const social = kit.social
  return (
    <Section
      id={id}
      num={num}
      eyebrow="Social formats & adaptation"
      title="Recomposed,"
      accent="not cropped."
      lede="One campaign — product launches — rebuilt for each placement. Every size gets its own plate framing, its own anchor and its own type scale; the story version keeps logo, copy and CTA out of the platform UI."
    >
      <div className="mb-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setSafe((s) => !s)}
          className={cn("rounded-xl border px-4 py-2 text-[12px] font-bold transition-colors", safe ? "border-[#FF2D6F]/40 bg-[#FF2D6F]/15 text-[#FF2D6F]" : "border-white/[0.10] bg-white/[0.04] text-white/60")}
        >
          Story safe-zones: {safe ? "on" : "off"}
        </button>
        <span className="text-[12px] text-white/40">Top 250px profile bar · bottom 340px reply bar (of 1920)</span>
      </div>
      <div className="grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {social.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
            <div className="relative bg-[#050310]" style={{ aspectRatio: `${s.width} / ${s.height}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.preview} alt={s.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              {s.safe && safe && (
                <>
                  <div className="absolute inset-x-0 top-0 flex items-end justify-center border-b border-dashed border-[#FFD24A]/80 bg-[#FFD24A]/15" style={{ height: `${(s.safe.top / s.height) * 100}%` }}>
                    <span className="mb-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#FFD24A]">Profile · no copy</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-start justify-center border-t border-dashed border-[#FFD24A]/80 bg-[#FFD24A]/15" style={{ height: `${(s.safe.bottom / s.height) * 100}%` }}>
                    <span className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#FFD24A]">Reply bar · no CTA</span>
                  </div>
                </>
              )}
            </div>
            <div className="space-y-2 p-4">
              <p className="text-[13px] font-bold text-white">{s.label}</p>
              <p className="text-[12px] leading-relaxed text-white/45">{s.note}</p>
              <DownloadLink href={s.src} label="Download" meta={formatBytes(s.bytes)} />
            </div>
          </div>
        ))}
      </div>
      {social.length === 0 && (
        <Panel>
          <p className="text-[14px] text-white/60">Social plates not generated yet — run node scripts/generate-brand-assets.mjs.</p>
        </Panel>
      )}
    </Section>
  )
}

/* ══ 15 · AI visual guidelines ═══════════════════════════════════════════ */

export function AiSection({ id, num }: SectionProps) {
  const [vars, setVars] = React.useState<Record<string, string>>({
    "[SCENE]": "a corporate product launch in a hotel ballroom",
    "[SUBJECT]": "a confident female presenter in her 30s",
    "[CAMPAIGN]": "Full AV Production",
    "[PRODUCT]": "a 15×8 ft outdoor LED wall on a ground-stack truss",
    "[COPY_SIDE]": "LEFT 45%",
    "[OBJECT]": "a wireless in-ear monitor pack",
    "[DETAIL]": "with a coiled earpiece cable",
  })
  const fill = (p: string) => p.replace(/\[[A-Z_]+\]/g, (m) => vars[m] || m)

  return (
    <Section
      id={id}
      num={num}
      eyebrow="AI visual guidelines"
      title="Prompt it"
      accent="like a show."
      source="lib/brand/ai-prompts.json"
      lede={
        <>
          The templates that produced every plate in this kit ({ai.meta.tool} · <code className="font-mono text-[14px]">{ai.meta.model}</code> · {ai.meta.resolution}). Fill the
          variables below — prompts update live — and copy.
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Panel>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FFD24A]">Palette to name in every prompt</p>
          <div className="mt-4 space-y-2">
            {Object.entries(ai.palette).map(([k, v]) => (
              <Copy key={v} value={v}>
                <div className="flex items-center gap-3 rounded-[10px] p-1 hover:bg-white/[0.03]">
                  <span className="h-8 w-8 shrink-0 rounded-[8px] border border-white/10" style={{ background: v }} />
                  <span className="font-mono text-[12px] text-white">{v}</span>
                  <span className="truncate text-[12px] text-white/45">{k}</span>
                </div>
              </Copy>
            ))}
          </div>
        </Panel>
        <Panel>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FFD24A]">Rules</p>
          <ul className="mt-4 space-y-2.5">
            {ai.rules.map((r) => (
              <li key={r} className="flex gap-2.5 text-[13px] leading-relaxed text-white/60">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF2D6F]" /> {r}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <SubHead meta="Edit to fill every template">Variables</SubHead>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Object.keys(vars).map((k) => (
          <label key={k} className="block">
            <span className="mb-1.5 block font-mono text-[11px] text-[#FF2D6F]">{k}</span>
            <input
              value={vars[k]}
              onChange={(e) => setVars((v) => ({ ...v, [k]: e.target.value }))}
              className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 py-2.5 text-[13px] text-white transition-colors focus:border-[#FF2D6F]/50 focus:outline-none"
            />
          </label>
        ))}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {ai.templates.map((t, i) => (
          <PromptCard key={t.id} index={i + 1} name={t.name} use={t.use} ratios={t.aspectRatios} prompt={fill(t.prompt)} raw={t.prompt} />
        ))}
      </div>

      {kit.plates.length > 0 && (
        <>
          <SubHead meta="Raw output, before the ad stack">Generated plates</SubHead>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {kit.plates.map((p) => (
              <a key={p.slug} href={p.src} download className="group relative overflow-hidden rounded-[14px] border border-white/[0.08]" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt={p.slug} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 font-mono text-[9.5px] text-white/80 backdrop-blur">{p.slug.replace("plate-", "")}</span>
              </a>
            ))}
          </div>
        </>
      )}
      <div className="mt-5">
        <DownloadLink href={kit.docs.prompts} label="AI-PROMPTS.md" primary />
      </div>
    </Section>
  )
}

function PromptCard({ index, name, use, ratios, prompt, raw }: { index: number; name: string; use: string; ratios: string[]; prompt: string; raw: string }) {
  const { copied, copy } = useCopy()
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
      <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] p-4">
        <div>
          <p className="font-mono text-[11px] text-[#FF2D6F]">0{index}</p>
          <p className="text-[15px] font-extrabold text-white">{name}</p>
          <p className="mt-1 text-[12px] text-white/45">{use}</p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1">
          {ratios.map((r) => (
            <span key={r} className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/55">
              {r}
            </span>
          ))}
        </div>
      </div>
      <p className="flex-1 p-4 font-mono text-[11.5px] leading-relaxed text-white/65">{prompt}</p>
      <div className="flex gap-2 p-4 pt-0">
        <button
          type="button"
          onClick={() => copy(prompt)}
          className="inline-flex items-center gap-1.5 rounded-[10px] px-3 py-2 text-[12px] font-bold text-white"
          style={{ background: BRAND_GRADIENT }}
        >
          <Sparkles className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy filled prompt"}
        </button>
        <CopyChip value={raw} label="template" className="max-w-[10rem]" />
      </div>
    </div>
  )
}

/* ══ 16 · Do / Don't ═════════════════════════════════════════════════════ */

export function DosDontsSection({ id, num }: SectionProps) {
  const banner = kit.banners.find((b) => b.ratio === "1:1") ?? kit.banners[0]
  const plate = kit.plates[0]
  return (
    <Section id={id} num={num} eyebrow="Do & don’t" title="Keep it" accent="on brand." lede="The fastest way to drift off-brand, and the fix, across colour, type, banners and AI imagery.">
      <SubHead>Colour</SubHead>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Verdict ok title="Gradient CTA on ink" note="Pink → coral, 135°, white label, pink glow, spinning border.">
          <HeroCTA />
        </Verdict>
        <Verdict ok={false} title="Violet as a button" note="Violet is haze only. Buttons are always pink → coral.">
          <span className="inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-3.5 text-[15px] font-extrabold text-white">Get a Quote</span>
        </Verdict>
        <Verdict ok title="Gold for one highlight" note="Eyebrow pills and the gradient midpoint — the follow-spot, used sparingly.">
          <span className="ds-pill">
            <span className="dot" /> Industries we serve
          </span>
        </Verdict>
        <Verdict ok={false} title="Light page grounds" note="Prime Line is dark-only. No white sections, no light mode.">
          <div className="absolute inset-0 bg-white" />
          <span className="relative text-[22px] font-extrabold text-[#FF2D6F]">Get a Quote</span>
        </Verdict>
      </div>

      <SubHead>Typography</SubHead>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Verdict ok title="One accent phrase" note="Extrabold, −0.03em, and a single italic gradient word or phrase at the end.">
          <p className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
            Our Recent <span className="ds-accent-text">Work</span>
          </p>
        </Verdict>
        <Verdict ok={false} title="Everything accented" note="If every word glows, nothing does.">
          <p className="ds-accent-text text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em]">Every Format. Every Industry.</p>
        </Verdict>
        <Verdict ok title="Labels small & wide" note="10–12px, 700–800, uppercase, 0.14–0.16em.">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#FF2D6F]">Services · Company · Legal</p>
        </Verdict>
        <Verdict ok={false} title="Light, loose headlines" note="Thin weights and positive tracking read as a different brand.">
          <p className="text-[30px] font-light leading-[1.3] tracking-[0.06em] text-white">Every Industry</p>
        </Verdict>
      </div>

      <SubHead>Banners &amp; AI imagery</SubHead>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Verdict ok title="Copy on the dark side" note="Subject on one side, scrim and type on the other.">
          {banner ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={banner.preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : null}
        </Verdict>
        <Verdict ok={false} title="Type over the subject" note="No scrim, headline across faces and gear — unreadable and cheap.">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/events/corporate.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <p className="relative text-center text-[26px] font-extrabold leading-tight text-white/90">Every word, heard.</p>
        </Verdict>
        <Verdict ok title="Stage-lit plates" note="Coloured light, haze, deep blacks, eyes open.">
          {plate ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={plate.preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/images/events/festivals.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
        </Verdict>
        <Verdict ok={false} title="Flat daylight stock" note="Washed-out, evenly lit, generic — not a show.">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/events/corporate.webp" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ filter: "saturate(0.15) brightness(1.55) contrast(0.7)" }} />
        </Verdict>
      </div>
    </Section>
  )
}

/* ══ 17 · Download centre ════════════════════════════════════════════════ */

export function DownloadsSection({ id, num }: SectionProps) {
  const p = kit.packages
  const cards = [
    { key: "logo", title: "Logo package", icon: Palette, desc: "4 lockups + 3 monograms · SVG and PNG 128–2048 · construction notes.", pkg: p.logo },
    { key: "icons3d", title: "3D icons", icon: Sparkles, desc: "12 Higgsfield equipment icons in the brand palette · transparent PNG 1024 + 256.", pkg: p.icons3d },
    { key: "favicon", title: "Favicons", icon: ImageIcon, desc: "favicon.svg / .ico, PNG 16–96, apple-touch 180, PWA 192 / 512 + maskable.", pkg: p.favicon },
    { key: "tokens", title: "Design tokens", icon: Braces, desc: "design-tokens.css + design-tokens.json, generated from globals.css.", pkg: p.tokens },
    { key: "social", title: "Banners & social", icon: Sparkles, desc: "4 ad banners, 4 social formats and the raw Higgsfield plates.", pkg: p.social },
  ]
  return (
    <Section id={id} num={num} eyebrow="Brand asset download centre" title="Everything," accent="one click." source="public/brand/zip">
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,45,111,0.16),rgba(255,94,58,0.08))] p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-[80px]" style={{ background: "var(--emerald)" }} />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px]" style={{ background: BRAND_GRADIENT, boxShadow: "0 16px 40px -10px rgba(255,45,111,0.6)" }}>
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-[26px] font-extrabold tracking-[-0.02em] text-white sm:text-[32px]">Full Brand Kit</p>
              <p className="text-[13px] text-white/55">
                Logo, favicons, 3D icons, tokens, banners, social, source SVGs, AI prompts · {p.kit.count} files · {formatBytes(p.kit.bytes)}
              </p>
            </div>
          </div>
          <div className="inline-flex shrink-0 self-start rounded-xl md:self-auto">
            <a
              href={p.kit.src}
              download
              className="inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-extrabold tracking-[0.01em] text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", boxShadow: "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)" }}
            >
              <Download className="h-4 w-4" /> Download ZIP
            </a>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((c) => (
          <div key={c.key} className="ds-card flex flex-col p-5">
            <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#FF2D6F]/15 text-[#FF2D6F]">
              <c.icon className="h-[18px] w-[18px]" strokeWidth={2.4} />
            </div>
            <p className="mt-4 text-[17px] font-extrabold text-white">{c.title}</p>
            <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-white/50">{c.desc}</p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="font-mono text-[10.5px] text-white/40">
                {c.pkg.count} files · {formatBytes(c.pkg.bytes)}
              </span>
              <DownloadLink href={c.pkg.src} label="ZIP" primary />
            </div>
          </div>
        ))}
      </div>

      <SubHead>Quick links</SubHead>
      <div className="flex flex-wrap gap-2">
        <DownloadLink href="/brand/logo/prime-line-av-logo.svg" label="Logo SVG" />
        <DownloadLink href="/brand/logo/png/prime-line-av-logo-2048.png" label="Logo PNG 2048" />
        <DownloadLink href="/brand/logo/prime-line-av-logo-white.svg" label="Logo white SVG" />
        <DownloadLink href="/brand/logo/prime-line-monogram.svg" label="Monogram SVG" />
        <DownloadLink href={kit.favicons.ico} label="favicon.ico" />
        <DownloadLink href="/brand/tokens/design-tokens.css" label="design-tokens.css" />
        <DownloadLink href="/brand/tokens/design-tokens.json" label="design-tokens.json" />
        <DownloadLink href={kit.docs.prompts} label="AI-PROMPTS.md" />
        <DownloadLink href={kit.docs.readme} label="README.txt" />
      </div>
    </Section>
  )
}
