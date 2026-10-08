import Image from "next/image"

/** Long-form copy beside a photo: eyebrow, H2, paragraphs, CTAs. */
export function ProseSection({
  id,
  eyebrow,
  heading,
  paragraphs,
  image,
  imageAlt,
  cta,
}: {
  id?: string
  eyebrow: string
  heading: React.ReactNode
  paragraphs: React.ReactNode[]
  image: string
  imageAlt: string
  cta?: React.ReactNode
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="reveal-left keep-original relative aspect-[4/3] overflow-hidden rounded-[26px] border border-white/10 lg:sticky lg:top-28 lg:aspect-[4/5]">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </div>
        <div className="reveal-right">
          <span className="ds-pill mb-5">
            <span className="dot" />
            {eyebrow}
          </span>
          <h2 className="text-balance text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white md:text-[42px]">{heading}</h2>
          <div className="mt-6 space-y-5 text-pretty text-[16.5px] leading-[1.75] text-white/90 md:text-[17.5px]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {cta && <div className="mt-9">{cta}</div>}
        </div>
      </div>
    </section>
  )
}
