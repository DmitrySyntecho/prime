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

export function FAQSection() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
        <div className="reveal text-center mb-10">
          <span className="ds-pill mb-5">
            <span className="dot" />
            FAQ
          </span>
          <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.18] text-white">
            Common <span className="ds-accent-text">Questions.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="reveal-stagger space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-[14px] px-5 border border-white/[0.08] bg-white/[0.03] backdrop-blur-md hover:border-[#FF2D6F]/20 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-white hover:no-underline text-sm md:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/55">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
      </div>
    </section>
  )
}
