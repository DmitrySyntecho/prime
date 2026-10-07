import { Icon3D, type Icon3DName } from "@/components/icon-3d"
import { QuoteCTA } from "@/components/section-header"

export type Reason = { title: string; icon: Icon3DName; body: React.ReactNode }

/** Sticky heading column on the left, reason rows with 3D icons on the right. */
export function ReasonsSplit({
  id,
  eyebrow,
  heading,
  lede,
  reasons,
}: {
  id?: string
  eyebrow: string
  /** H2 content (may contain a .ds-accent-text span). */
  heading: React.ReactNode
  lede: React.ReactNode
  reasons: Reason[]
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="reveal-left lg:sticky lg:top-28 lg:self-start">
          <span className="ds-pill mb-5">
            <span className="dot" />
            {eyebrow}
          </span>
          <h2 className="text-balance text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white md:text-[42px]">{heading}</h2>
          <p className="mt-5 max-w-[540px] text-pretty text-[17px] font-medium leading-[1.65] text-white/90 md:text-[18px]">{lede}</p>
          <div className="mt-8 hidden lg:block">
            <QuoteCTA className="!justify-start" />
          </div>
        </div>

        <div className="reveal-stagger grid gap-4">
          {reasons.map((r, i) => (
            <article
              key={r.title}
              // Phones: icon beside the title, copy full width below. sm+: icon column spans both rows.
              className="fx-spot group grid grid-cols-[48px_1fr] items-center gap-x-3 gap-y-2.5 rounded-[24px] border border-white/10 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#FF2D6F]/30 sm:grid-cols-[64px_1fr] sm:items-start sm:gap-x-5 sm:gap-y-0 md:p-6"
              style={{
                background:
                  i === 0
                    ? "linear-gradient(135deg, rgba(255,45,111,0.16), rgba(255,94,58,0.08))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <Icon3D
                name={r.icon}
                size={64}
                className="!h-12 !w-12 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 sm:row-span-2 sm:!h-16 sm:!w-16"
              />
              <h3 className="text-[19px] font-extrabold leading-tight text-white sm:text-[20px]">{r.title}</h3>
              <p className="col-span-2 text-pretty text-[15.5px] leading-[1.7] text-white/90 sm:col-span-1 sm:col-start-2 sm:mt-2.5">{r.body}</p>
            </article>
          ))}
          <div className="lg:hidden">
            <QuoteCTA className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
