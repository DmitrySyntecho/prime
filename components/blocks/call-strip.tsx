import { Phone } from "lucide-react"
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact"
import { Icon3D } from "@/components/icon-3d"

/** "Ready to discuss your event?" strip with the yellow click-to-call button. */
export function CallStrip({ title, subtitle, className = "" }: { title: string; subtitle: string; className?: string }) {
  return (
    <div
      className={`reveal-zoom flex flex-col items-center justify-between gap-5 overflow-hidden rounded-[24px] border border-white/10 px-6 py-6 text-center md:flex-row md:px-9 md:text-left ${className}`}
      style={{ background: "linear-gradient(135deg, rgba(255,45,111,0.16), rgba(255,94,58,0.08))", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
    >
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <Icon3D name="headset" size={64} className="shrink-0 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)]" />
        <div>
          <p className="text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-white md:text-[26px]">{title}</p>
          <p className="mt-1 text-[16px] font-semibold text-white/90">{subtitle}</p>
        </div>
      </div>
      <a href={PHONE_TEL} suppressHydrationWarning className="cta-yellow shimmer-stroke inline-flex shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl px-7 py-3">
        <span className="inline-flex items-center gap-2 text-[15px] font-extrabold">
          <Phone className="h-4 w-4" /> Click here to call
        </span>
        <span suppressHydrationWarning className="font-mono text-[13px] font-semibold tabular-nums opacity-75">
          {PHONE_DISPLAY}
        </span>
      </a>
    </div>
  )
}
