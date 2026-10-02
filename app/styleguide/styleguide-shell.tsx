"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { SECTIONS, SECTION_GROUPS } from "./sections"
import kit from "@/lib/brand/asset-manifest.json"
import { ThemeToggle } from "@/components/theme-toggle"

export function StyleguideShell() {
  const ids = React.useMemo(() => SECTIONS.map((s) => s.id), [])
  const active = useScrollSpy(ids)

  return (
    // overflow-x-clip, not overflow-x-hidden: hidden turns this into a scroll
    // container and silently breaks position: sticky on the sidebar.
    <div className="relative min-h-screen overflow-x-clip">
      {/* The guide brings its own chrome. Rather than touching the site's layout,
          this route-local rule hides the global header / footer / sticky CTA,
          which render as siblings of <main> inside .page-content. It only exists
          while /styleguide is mounted. */}
      <style>{`.page-content > :not(main) { display: none !important; }`}</style>
      <MobileBar active={active} />

      <div className="mx-auto flex w-full max-w-[96rem]">
        {/* Desktop sidebar — pinned to the viewport, scrolls on its own */}
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/[0.06] lg:flex">
          <div className="px-6 pb-5 pt-7">
            <Link href="/" className="inline-flex" title="Back to primelineav.com">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo/prime-line-av-logo.svg" alt="Prime Line AV" className="theme-logo-dark h-7 w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo/prime-line-av-logo-light.svg" alt="Prime Line AV" className="theme-logo-light h-7 w-auto" />
            </Link>
            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/40">Brand &amp; UI Style Guide</p>
              <ThemeToggle className="!h-8 !w-8" />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-6 [scrollbar-width:thin]">
            <SidebarNav active={active} />
          </div>
          <div className="space-y-2 border-t border-white/[0.06] p-4">
            <a
              href={kit.packages.kit.src}
              download
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-extrabold tracking-[0.02em] text-white transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, var(--emerald) 0%, var(--emerald-deep) 100%)",
                boxShadow: "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <Download className="h-3.5 w-3.5" /> Full brand kit
            </a>
            <Link href="/" className="flex items-center justify-center gap-1 py-1 text-[11px] font-semibold text-white/40 transition-colors hover:text-white">
              primelineav.com <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 pb-32 sm:px-8 lg:px-12 xl:px-16">
          {SECTIONS.map((s, i) => (
            <s.Component key={s.id} id={s.id} num={i + 1} />
          ))}
          <Colophon />
        </main>
      </div>
    </div>
  )
}

/* ── mobile / tablet: compact sticky bar with a scrolling chip menu ──────── */

function MobileBar({ active }: { active: string | null }) {
  const stripRef = React.useRef<HTMLDivElement>(null)

  // Keep the active chip centred in the strip as the page scrolls.
  React.useEffect(() => {
    const strip = stripRef.current
    const chip = strip?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (!strip || !chip) return
    strip.scrollTo({ left: chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" })
  }, [active])

  return (
    <div
      className="sticky top-0 z-40 border-b border-white/[0.08] backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
      style={{ background: "rgba(10, 8, 24, 0.78)" }}
    >
      <div className="flex h-12 items-center gap-3 px-4 sm:px-8">
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo/prime-line-monogram.svg" alt="Prime Line AV" className="h-7 w-7" />
        </Link>
        <span className="truncate text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/70">Style Guide</span>
        <ThemeToggle className="ml-auto !h-8 !w-8" />
        <a
          href={kit.packages.kit.src}
          download
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-[11px] font-extrabold text-white"
          style={{ background: "linear-gradient(135deg, var(--emerald) 0%, var(--emerald-deep) 100%)" }}
        >
          <Download className="h-3 w-3" /> Kit
        </a>
      </div>
      <div ref={stripRef} className="flex gap-1.5 overflow-x-auto px-4 pb-2.5 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            data-id={s.id}
            href={`#${s.id}`}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-colors",
              active === s.id ? "border-[#FF2D6F]/40 bg-[#FF2D6F]/15 text-[#FF2D6F]" : "border-white/[0.08] bg-white/[0.03] text-white/55",
            )}
          >
            <span className="mr-1 font-mono text-[9px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
            {s.label}
          </a>
        ))}
      </div>
    </div>
  )
}

/* ── desktop nav ─────────────────────────────────────────────────────────── */

function SidebarNav({ active }: { active: string | null }) {
  const activeRef = React.useRef<HTMLAnchorElement | null>(null)
  React.useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" })
  }, [active])

  return (
    <nav className="space-y-6">
      {SECTION_GROUPS.map((group) => (
        <div key={group}>
          <div className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#FF2D6F]/80">{group}</div>
          <ul className="space-y-0.5">
            {SECTIONS.filter((s) => s.group === group).map((s) => {
              const isActive = active === s.id
              const num = SECTIONS.findIndex((x) => x.id === s.id) + 1
              return (
                <li key={s.id}>
                  <a
                    ref={isActive ? activeRef : undefined}
                    href={`#${s.id}`}
                    className={cn(
                      "relative flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] font-semibold transition-all",
                      isActive ? "bg-[#FF2D6F]/[0.12] text-white" : "text-white/50 hover:bg-white/[0.04] hover:text-white",
                    )}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-y-1.5 left-0 w-[3px] rounded-full"
                        style={{ background: "linear-gradient(180deg, var(--emerald), var(--emerald-deep))" }}
                      />
                    )}
                    <span className={cn("w-5 shrink-0 font-mono text-[10px]", isActive ? "text-[#FF2D6F]" : "text-white/25")}>
                      {String(num).padStart(2, "0")}
                    </span>
                    <span className="truncate">{s.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

/* ── scrollspy ───────────────────────────────────────────────────────────── */

/**
 * The active section is the last one whose top crossed a reading line near the
 * top of the viewport. A fixed line (not "most visible") keeps the highlight
 * stable through tall sections that never fit on screen.
 */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = React.useState<string | null>(ids[0] ?? null)

  React.useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return

    const pick = () => {
      const line = window.innerWidth >= 1024 ? 120 : 160
      let current = els[0]
      for (const el of els) {
        if (el.getBoundingClientRect().top - line <= 0) current = el
        else break
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = els[els.length - 1]
      setActive(current.id)
    }

    let queued = false
    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        pick()
      })
    }
    pick()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids])

  return active
}

/* ── colophon ────────────────────────────────────────────────────────────── */

function Colophon() {
  const code = "rounded-md border border-white/[0.06] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] text-white/60"
  return (
    <footer className="border-t border-white/[0.06] py-12 text-[12px] leading-relaxed text-white/40">
      <p className="max-w-3xl">
        Every value on this page is read out of the running site. <code className={code}>app/globals.css</code> is the source of truth for
        colour, gradients and effects; the logo and PL monogram come from <code className={code}>public/brand/source</code>; radius, type,
        spacing, container and motion scales are measured by scanning the utilities the site&apos;s components actually use. Regenerate with{" "}
        <code className={code}>node scripts/generate-design-tokens.mjs</code> and <code className={code}>node scripts/generate-brand-assets.mjs</code>.
      </p>
      <p className="mt-4 text-white/25">© {new Date().getFullYear()} Prime Line AV · Internal brand reference — not indexed.</p>
    </footer>
  )
}
