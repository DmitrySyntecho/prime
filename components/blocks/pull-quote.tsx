/** Big centred client quote with attribution, above a reviews block. */
export function PullQuote({ quote, author, company, className = "" }: { quote: string; author: string; company: string; className?: string }) {
  return (
    <figure className={`reveal mx-auto mb-12 max-w-3xl text-center ${className}`}>
      <blockquote className="text-balance text-[24px] font-extrabold italic leading-snug tracking-[-0.015em] text-white md:text-[34px]">
        <span className="ds-accent-text not-italic">“</span>
        {quote}
        <span className="ds-accent-text not-italic">”</span>
      </blockquote>
      <figcaption className="mt-4 text-[16px] font-semibold text-white/90 md:text-[17px]">
        <span className="text-[#FFC48A]">{author}</span> · {company}
      </figcaption>
    </figure>
  )
}
