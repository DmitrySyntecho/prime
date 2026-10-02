"use client"

import * as React from "react"
import { Check, Copy as CopyIcon, Download, Code2, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

/* ── copy to clipboard ───────────────────────────────────────────────────── */

export function useCopy() {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const copy = React.useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Clipboard API needs a secure context (LAN IPs in dev) — textarea fallback.
      const el = document.createElement("textarea")
      el.value = value
      el.style.position = "fixed"
      el.style.opacity = "0"
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1400)
  }, [])

  return { copied, copy }
}

/** Wraps any block so a click copies `value`, with a transient badge. */
export function Copy({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { copied, copy } = useCopy()
  return (
    <button type="button" onClick={() => copy(value)} title={`Copy ${value}`} className={cn("group/copy relative block w-full text-left", className)}>
      {children}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#03070a] transition-all duration-200",
          copied ? "opacity-100" : "opacity-0",
        )}
      >
        <Check className="h-3 w-3" /> Copied
      </span>
    </button>
  )
}

/** Mono value chip — click to copy. */
export function CopyChip({ value, label, className, tone = "default" }: { value: string; label?: string; className?: string; tone?: "default" | "pink" }) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      title={`Copy ${value}`}
      className={cn(
        "group inline-flex max-w-full items-center gap-2 rounded-[10px] border px-2.5 py-1.5 font-mono text-[11px] transition-colors",
        tone === "pink"
          ? "border-[#FF2D6F]/30 bg-[#FF2D6F]/10 text-[#FF2D6F] hover:border-[#FF2D6F]/60"
          : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:border-[#FF2D6F]/40 hover:text-white",
        className,
      )}
    >
      {label && <span className="shrink-0 text-[9px] font-sans font-bold uppercase tracking-[0.14em] text-white/35">{label}</span>}
      <span className="truncate">{value}</span>
      {copied ? <Check className="h-3 w-3 shrink-0 text-[#FF2D6F]" /> : <CopyIcon className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />}
    </button>
  )
}

/* ── layout ──────────────────────────────────────────────────────────────── */

export function Section({
  id,
  num,
  eyebrow,
  title,
  accent,
  lede,
  source,
  children,
}: {
  id: string
  num: number
  eyebrow: string
  title: string
  /** Trailing words rendered in .ds-accent-text, exactly like site headings. */
  accent?: string
  lede?: React.ReactNode
  source?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/[0.06] py-16 first:border-t-0 lg:scroll-mt-8 lg:py-24">
      <header className="mb-10 lg:mb-14">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="ds-pill text-[10px] md:text-[11px]">
            <span className="dot" />
            {String(num).padStart(2, "0")} · {eyebrow}
          </span>
          {source && (
            <code className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-white/40">{source}</code>
          )}
        </div>
        <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white md:text-[44px]">
          {title} {accent && <span className="ds-accent-text">{accent}</span>}
        </h2>
        {lede && <div className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/55 md:text-[17px]">{lede}</div>}
      </header>
      {children}
    </section>
  )
}

export function SubHead({ children, meta, className }: { children: React.ReactNode; meta?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-5 mt-12 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 first:mt-0", className)}>
      <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FF2D6F]">{children}</h3>
      {meta && <span className="text-[12px] text-white/40">{meta}</span>}
    </div>
  )
}

/** The site's own glass panel. */
export function Panel({ children, className, padded = true }: { children: React.ReactNode; className?: string; padded?: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-md", padded && "p-5 md:p-6", className)}>
      {children}
    </div>
  )
}

export type StageTone = "ink" | "paper" | "brand" | "glass" | "photo"

/** Preview ground for marks and components. */
export function Stage({ children, tone = "glass", className }: { children: React.ReactNode; tone?: StageTone; className?: string }) {
  return (
    <div
      className={cn(
        "keep-original relative flex min-h-[10rem] items-center justify-center overflow-hidden rounded-[16px] border p-8",
        tone === "ink" && "border-white/[0.08] bg-[#050310]",
        tone === "paper" && "border-white/10 bg-white",
        tone === "brand" && "border-[#FF2D6F]/30",
        tone === "glass" && "border-white/[0.08] bg-white/[0.03]",
        className,
      )}
      style={tone === "brand" ? { background: "linear-gradient(135deg, var(--emerald) 0%, var(--emerald-deep) 100%)" } : undefined}
    >
      {children}
    </div>
  )
}

/* ── code ────────────────────────────────────────────────────────────────── */

export function CodeBlock({ code, className, maxHeight }: { code: string; className?: string; maxHeight?: string }) {
  const { copied, copy } = useCopy()
  return (
    <div className={cn("group relative overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#03070a]/80", className)}>
      <button
        type="button"
        onClick={() => copy(code)}
        className="absolute right-2 top-2 z-10 inline-flex items-center gap-1.5 rounded-[10px] border border-white/[0.10] bg-white/[0.06] px-2.5 py-1.5 text-[11px] font-bold text-white/70 backdrop-blur-md transition-all hover:border-[#FF2D6F]/40 hover:text-white"
      >
        {copied ? <Check className="h-3 w-3 text-[#FF2D6F]" /> : <CopyIcon className="h-3 w-3" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-4 pr-24 font-mono text-[11.5px] leading-relaxed text-white/70" style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function PreviewCode({
  preview,
  code,
  className,
  stageClassName,
}: {
  preview: React.ReactNode
  code: string
  className?: string
  stageClassName?: string
}) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")
  return (
    <div className={cn("overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]", className)}>
      <div className="flex items-center gap-1 border-b border-white/[0.06] bg-white/[0.02] p-1.5">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-[12px] font-bold transition-colors",
              tab === t ? "bg-[#FF2D6F]/15 text-[#FF2D6F]" : "text-white/45 hover:text-white",
            )}
          >
            {t === "preview" ? <Eye className="h-3.5 w-3.5" /> : <Code2 className="h-3.5 w-3.5" />}
            {t === "preview" ? "Preview" : "Code"}
          </button>
        ))}
      </div>
      {tab === "preview" ? (
        <div className={cn("p-6 md:p-8", stageClassName)}>{preview}</div>
      ) : (
        <CodeBlock code={code} className="rounded-none border-0" maxHeight="28rem" />
      )}
    </div>
  )
}

/* ── downloads ───────────────────────────────────────────────────────────── */

export function DownloadLink({
  href,
  label,
  meta,
  primary = false,
  className,
}: {
  href: string
  label: string
  meta?: string
  primary?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      download
      className={cn(
        "inline-flex items-center gap-2 rounded-[10px] px-3 py-2 text-[12px] font-bold transition-all",
        primary
          ? "text-white hover:-translate-y-0.5"
          : "border border-white/[0.10] bg-white/[0.04] text-white/80 hover:border-[#FF2D6F]/40 hover:text-white",
        className,
      )}
      style={
        primary
          ? { background: "linear-gradient(135deg, var(--emerald) 0%, var(--emerald-deep) 100%)", boxShadow: "0 10px 28px -10px rgba(255,45,111,0.6), inset 0 1px 0 rgba(255,255,255,0.3)" }
          : undefined
      }
    >
      <Download className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{label}</span>
      {meta && <span className="shrink-0 font-mono text-[10px] font-normal opacity-60">{meta}</span>}
    </a>
  )
}

export function formatBytes(bytes?: number) {
  if (!bytes) return ""
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/* ── do / don't ──────────────────────────────────────────────────────────── */

export function Verdict({ ok, title, note, children }: { ok: boolean; title: string; note: string; children: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-[20px] border", ok ? "border-[#FFD24A]/25 bg-[#FFD24A]/[0.03]" : "border-red-500/25 bg-red-500/[0.03]")}>
      <div className="keep-original relative flex min-h-[10rem] items-center justify-center overflow-hidden border-b border-white/[0.06] p-6">{children}</div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-[#03070a]",
              ok ? "bg-[#FFD24A]" : "bg-red-500 text-white",
            )}
          >
            {ok ? "✓" : "✕"}
          </span>
          <span className={cn("text-[10px] font-extrabold uppercase tracking-[0.16em]", ok ? "text-[#FFD24A]" : "text-red-400")}>{ok ? "Do" : "Don’t"}</span>
          <span className="text-[14px] font-bold leading-tight text-white">{title}</span>
        </div>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/50">{note}</p>
      </div>
    </div>
  )
}

/* ── misc ────────────────────────────────────────────────────────────────── */

export function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-[14px] border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">{label}</div>
      <div className="mt-0.5 font-mono text-[13px] font-medium text-white">{value}</div>
    </div>
  )
}

/** "Used N× in the codebase" — every measured scale carries one. */
export function Uses({ n }: { n: number }) {
  if (!n) return null
  return <span className="shrink-0 rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/45">{n}×</span>
}

export function Note({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mt-3 text-[12.5px] leading-relaxed text-white/45", className)}>{children}</p>
}
