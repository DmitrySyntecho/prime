"use client"

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { INDUSTRIES } from "@/lib/sitemap-data"
import { Building2, ArrowRight } from "lucide-react"

/** Industries — accordion block (Home/Industry templates). Data from sitemap-data. */
export function IndustriesAccordion({ heading = "Industries We Serve" }: { heading?: string }) {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{
              background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
              border: "1px solid rgba(255,94,58,0.25)",
              color: "#FFB366",
            }}
          >
            <Building2 className="w-3.5 h-3.5" />
            Industries
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            {heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {heading.split(" ").slice(-1)}
            </span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {INDUSTRIES.map((ind) => (
            <AccordionItem
              key={ind.slug}
              value={ind.slug}
              className="rounded-2xl border-none px-5"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <AccordionTrigger className="text-left text-[16px] md:text-[18px] font-bold text-white hover:no-underline py-5">
                {ind.name}
              </AccordionTrigger>
              <AccordionContent className="text-white/55 text-[14px] leading-relaxed pb-5">
                {ind.subheadline}
                <Link
                  href={`/industries/${ind.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#FF5E3A] hover:text-[#FF2D6F] transition-colors"
                >
                  Explore {ind.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
