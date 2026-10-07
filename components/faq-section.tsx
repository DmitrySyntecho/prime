import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    {
      question: "What types of events do you handle?",
      answer:
        "Corporate events, brand activations, conferences, fashion shows, festivals, product launches, watch parties, and studio production — anywhere AV can move the needle.",
    },
    {
      question: "Full production or equipment rental only?",
      answer:
        "Both. Most clients choose full-service (delivery, setup, on-site engineer, strike). Dry-hire is available if you have your own crew.",
    },
    {
      question: "How fast can I get a quote?",
      answer:
        "Within hours. We send a detailed proposal plus a 3D render of your space — usually inside 24h.",
    },
    {
      question: "Do you carry insurance & COIs?",
      answer:
        "Yes — Workers' Comp and General Liability. We deliver Certificates of Insurance within 24h and can add venues as additionally insured.",
    },
    {
      question: "Do you work nationwide?",
      answer:
        "Deployed coast to coast. Multi-city tours, corporate roadshows, festival circuits — all covered.",
    },
]

export type FAQItem = {
  question: string
  answer: React.ReactNode
  /** Plain-text answer for FAQPage structured data (emitted when every item has one). */
  answerText?: string
}

export function FAQSection({ items = faqs, header, after }: { items?: FAQItem[]; header?: React.ReactNode; after?: React.ReactNode } = {}) {
  const schema =
    items.length > 0 && items.every((f) => f.answerText)
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answerText } })),
        }
      : null

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
        {header ?? (
          <div className="reveal text-center mb-10">
            <span className="ds-pill mb-5">
              <span className="dot" />
              FAQ
            </span>
            <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.18] text-white">
              Common <span className="ds-accent-text">Questions.</span>
            </h2>
          </div>
        )}

        <Accordion type="single" collapsible className="reveal-stagger space-y-2.5">
          {items.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-[16px] px-5 border border-white/[0.10] bg-white/[0.04] backdrop-blur-md hover:border-[#FF2D6F]/25 transition-colors md:px-6"
            >
              <AccordionTrigger className="py-5 text-left text-[16.5px] font-bold leading-snug text-white hover:no-underline md:text-[18px]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pb-5 text-[15.5px] leading-[1.7] text-white/90 md:text-[16px]">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {after}
        </div>
      </div>
    </section>
  )
}
