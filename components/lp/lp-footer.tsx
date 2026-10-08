import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact"
import { QuoteCTA } from "@/components/section-header"

/** Landing footer: logo, phone, quote CTA, legal links. Extra bottom space on
 *  phones so the sticky call/quote bar never covers it. */
export function LpFooter({ tagline }: { tagline: string }) {
  return (
    <footer className="relative border-t border-white/10 pb-32 pt-12 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Image src="/images/prime-line-av-logo-dark-bg.svg" alt="Prime Line AV" width={210} height={38} className="theme-logo-dark h-9 w-auto" />
          <Image src="/images/prime-line-av-logo-light-bg.svg" alt="Prime Line AV" width={210} height={38} className="theme-logo-light h-9 w-auto" />
          <p className="mt-3 max-w-[380px] text-pretty text-[15px] leading-relaxed text-white/85">{tagline}</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a href={PHONE_TEL} suppressHydrationWarning className="inline-flex items-center gap-2.5 text-[20px] font-extrabold tabular-nums text-white transition-colors hover:text-[#FFD24A]">
            <Phone className="h-5 w-5 text-[#FF2D6F]" />
            <span suppressHydrationWarning>{PHONE_DISPLAY}</span>
          </a>
          <QuoteCTA className="!justify-start" />
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/[0.08] px-4 pt-6 text-[14px] text-white/75 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Prime Line AV. All rights reserved.</p>
        <nav aria-label="Legal" className="flex gap-5">
          <Link href="/legal/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/legal/terms" className="hover:text-white">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  )
}
