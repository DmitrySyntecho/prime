"use client"

import { LandingHero } from "@/components/landing/landing-hero"
import { TrustedBySection } from "@/components/trusted-by-section"
import { RatingsBar } from "@/components/ratings-bar"
import { SectionHeader } from "@/components/section-header"
import { LinkCardGrid } from "@/components/blocks/link-card-grid"
import { ImageBento } from "@/components/blocks/image-bento"
import { CallStrip } from "@/components/blocks/call-strip"
import { ReasonsSplit } from "@/components/blocks/reasons-split"
import { ChecklistSplit } from "@/components/blocks/checklist-split"
import { ProcessSteps } from "@/components/blocks/process-steps"
import { ProseSection } from "@/components/blocks/prose-section"
import { CtaPair } from "@/components/blocks/cta-pair"
import { PullQuote } from "@/components/blocks/pull-quote"
import { PhotoCarousel } from "@/components/blocks/photo-carousel"
import { rt, plain } from "@/components/blocks/rich-text"
import { HomePortfolioSection } from "@/components/home/home-portfolio-section"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { TeamSection } from "@/components/team-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { WrittenReviewsSection } from "@/components/written-reviews-section"
import { BlogSection } from "@/components/blog-section"
import { FAQSection } from "@/components/faq-section"
import { clipsForPath } from "@/lib/hero-clips"
import { PHONE_DISPLAY } from "@/lib/contact"
import { STUDY, PHOTO } from "@/lib/copy/media"
import type { Deck, DeckBlock, Heading } from "@/lib/copy/deck-types"

/** H2 with the accent phrase in the gradient (for split layouts that take a node). */
function accented(h: Heading) {
  const i = h.title.indexOf(h.accent)
  if (!h.accent || i < 0) return h.title
  return (
    <>
      {h.title.slice(0, i)}
      <span className="ds-accent-text">{h.accent}</span>
      {h.title.slice(i + h.accent.length)}
    </>
  )
}

/** "[phone number]" placeholders in the deck → the real number. */
const phone = (s: string) => s.replace(/\[phone number\]/gi, PHONE_DISPLAY)
const md = (s: string) => rt(phone(s))

const pairSecondary = (p: { label: string; href?: string } | "portfolio") => (p === "portfolio" ? { label: "View event portfolio", href: "/portfolio" } : p)

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">{children}</div>
    </section>
  )
}

function Block({ b }: { b: DeckBlock }) {
  switch (b.type) {
    case "ratings":
      return <RatingsBar only={["Google", "G2"]} />

    case "cards":
      return (
        <Section id={b.id}>
          <SectionHeader eyebrow={b.eyebrow} title={b.title} accent={b.accent}>
            {b.lede && md(b.lede)}
          </SectionHeader>
          <LinkCardGrid items={b.items.map((it) => ({ ...it, body: md(it.body) }))} cols={b.cols} ctaLabel={b.ctaLabel} />
          {b.ctaPair && <CtaPair className="mt-12" secondary={pairSecondary(b.ctaPair)} />}
          {b.callStrip && <CallStrip className="mt-10" title={b.callStrip.title} subtitle={b.callStrip.subtitle} />}
        </Section>
      )

    case "bento":
      return (
        <Section id={b.id}>
          <SectionHeader eyebrow={b.eyebrow} title={b.title} accent={b.accent}>
            {b.lede?.map((p, i) => (
              <p key={i} className={i ? "mt-3" : ""}>
                {md(p)}
              </p>
            ))}
          </SectionHeader>
          <ImageBento items={b.items.map((it) => ({ ...it, body: it.body ? md(it.body) : null }))} />
          {b.ctaPair && <CtaPair className="mt-12" secondary={pairSecondary(b.ctaPair)} />}
          {b.callStrip && <CallStrip className="mt-10" title={b.callStrip.title} subtitle={b.callStrip.subtitle} />}
        </Section>
      )

    case "reasons":
      return (
        <ReasonsSplit
          id={b.id}
          eyebrow={b.eyebrow}
          heading={accented(b)}
          lede={b.lede?.length ? b.lede.map((p, i) => <p key={i}>{md(p)}</p>) : undefined}
          reasons={b.items.map((it) => ({ ...it, body: md(it.body) }))}
        />
      )

    case "checklist":
      return (
        <ChecklistSplit
          id={b.id}
          eyebrow={b.eyebrow}
          heading={accented(b)}
          lede={b.lede.map((p, i) => (
            <p key={i}>{md(p)}</p>
          ))}
          listTitle={b.listTitle}
          items={b.items}
          cta={b.secondary && <CtaPair align="left" secondary={b.secondary} />}
        />
      )

    case "steps":
      return (
        <Section id={b.id}>
          <SectionHeader eyebrow={b.eyebrow} title={b.title} accent={b.accent}>
            {b.lede && md(b.lede)}
          </SectionHeader>
          <ProcessSteps steps={b.items} />
        </Section>
      )

    case "prose":
      return (
        <ProseSection
          id={b.id}
          eyebrow={b.eyebrow}
          heading={accented(b)}
          paragraphs={b.paragraphs.map((p) => md(p))}
          image={b.image}
          imageAlt={b.imageAlt}
          cta={b.secondary && <CtaPair align="left" secondary={b.secondary} />}
        />
      )

    case "videos":
      return (
        <HomePortfolioSection
          id={b.id}
          studies={b.studies.map((k) => STUDY[k])}
          filters={b.filters}
          ctaLabel={b.ctaLabel}
          header={
            <SectionHeader eyebrow={b.eyebrow} title={b.title} accent={b.accent}>
              {b.lede && md(b.lede)}
            </SectionHeader>
          }
        />
      )

    case "photos":
      return (
        <Section id={b.id}>
          <SectionHeader eyebrow={b.eyebrow} title={b.title} accent={b.accent}>
            {b.lede && md(b.lede)}
          </SectionHeader>
          <PhotoCarousel photos={b.photos.map((k) => PHOTO[k])} />
        </Section>
      )

    case "products":
      return (
        <HomeShopSection
          category={b.category}
          categories={b.categories}
          header={
            b.heading ? (
              <SectionHeader eyebrow={b.heading.eyebrow} title={b.heading.title} accent={b.heading.accent}>
                {b.lede && md(b.lede)}
              </SectionHeader>
            ) : undefined
          }
        />
      )

    case "team":
      return (
        <TeamSection
          header={
            <SectionHeader eyebrow={b.eyebrow ?? "Our team"} title={b.title ?? "Meet our professional AV team"} accent={b.accent ?? "professional AV team"}>
              {b.lede && md(b.lede)}
            </SectionHeader>
          }
        />
      )

    case "testimonials":
      return (
        <TestimonialsCarousel
          header={
            <>
              <SectionHeader eyebrow={b.eyebrow} title={b.title} accent={b.accent}>
                {b.lede && md(b.lede)}
              </SectionHeader>
              {b.quote && <PullQuote {...b.quote} />}
            </>
          }
        />
      )

    case "reviews":
      return (
        <WrittenReviewsSection
          header={
            <>
              <SectionHeader eyebrow={b.eyebrow} title={b.title} accent={b.accent}>
                {b.lede && md(b.lede)}
              </SectionHeader>
              {b.quote && <PullQuote {...b.quote} />}
            </>
          }
        />
      )

    case "blog":
      return (
        <BlogSection
          header={<SectionHeader eyebrow="Resources" title={b.title ?? "From the blog"} accent={b.accent ?? "the blog"} align="left" className="!mb-0" />}
        />
      )

    case "faq":
      return (
        <FAQSection
          items={b.items.map((f) => ({
            question: f.q,
            answer: f.a.map((p, i) => <p key={i}>{md(p)}</p>),
            answerText: f.a.map((p) => plain(phone(p))).join(" "),
          }))}
          header={<SectionHeader eyebrow={b.eyebrow} title={b.title} accent={b.accent} />}
          after={b.callStrip && <CallStrip className="mt-10" title={b.callStrip.title} subtitle={b.callStrip.subtitle} />}
        />
      )

    case "callStrip":
      return (
        <Section>
          <CallStrip title={b.title} subtitle={b.subtitle} />
        </Section>
      )
  }
}

/** Renders a copy-deck page (lib/copy/decks/*) in the site design. */
export function DeckPage({ deck }: { deck: Deck }) {
  const onQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm", { detail: deck.quoteSlug ? { serviceSlug: deck.quoteSlug } : undefined }))
  const sec = deck.secondary

  return (
    <div className="min-h-screen">
      <div className="flex min-h-[calc(100svh-92px)] flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <LandingHero
            hero={{
              title: deck.h1,
              accentPhrase: deck.accent,
              pillLabel: deck.pill,
              lede: md(deck.lede),
              bullets: deck.bullets,
              ctaLabel: deck.ctaLabel,
              microcopy: deck.microcopy,
              ...(sec === "portfolio"
                ? { secondary: "portfolio" as const }
                : sec
                  ? { secondaryLink: sec.href ? { label: sec.label, href: sec.href } : { label: sec.label, onClick: onQuote } }
                  : {}),
              showIncludes: false,
              stats: deck.stats,
              clips: deck.clips ?? clipsForPath(deck.path),
            }}
            onQuote={onQuote}
          />
        </div>
        {deck.logos !== false && <TrustedBySection compact />}
      </div>

      {deck.blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}
    </div>
  )
}
