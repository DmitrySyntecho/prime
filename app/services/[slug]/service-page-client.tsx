"use client"

import { ServiceHero } from "@/components/service-hero"
import { ServiceDescriptionSection } from "@/components/service-description-section"
import { TrustedBySection } from "@/components/trusted-by-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { AboutUsSection } from "@/components/about-us-section"
import { EventTypesSection } from "@/components/event-types-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { CharitySection } from "@/components/charity-section"
import { RentalCategoriesSection } from "@/components/rental-categories-section"
import { PromoBannersSection } from "@/components/promo-banners-section"
import { ServicesGridSection } from "@/components/services-grid-section"
import { FAQSection } from "@/components/faq-section"
import { FIFAPromoBanner } from "@/components/fifa-promo-banner"
import { ContactSpecialistBanner } from "@/components/contact-specialist-banner"
import { CategoryProductsShowcase } from "@/components/category-products-showcase"
import { GeneralEquipmentShowcase } from "@/components/general-equipment-showcase"
import { FrequentlyTogether } from "@/components/frequently-together"
import { useCity } from "@/lib/city-context"
import { applyCity } from "@/lib/service-pages"
import { getCategoryForServiceSlug } from "@/lib/products-data"
import type { ServicePage } from "@/lib/service-pages"

interface ServicePageClientProps {
  service: ServicePage
  slug: string
}

export function ServicePageClient({ service, slug }: ServicePageClientProps) {
  const city = useCity()
  const s = city !== "Los Angeles"
    ? {
        ...service,
        h1: applyCity(service.h1, city),
        subheadline: applyCity(service.subheadline, city),
        descriptionHeading: applyCity(service.descriptionHeading, city),
        description: applyCity(service.description, city),
        highlights: service.highlights.map((h) => applyCity(h, city)),
      }
    : service

  const handleStartQuote = () => {
    document.dispatchEvent(new CustomEvent("openQuoteForm", { detail: { serviceSlug: slug } }))
  }

  const productCategory = getCategoryForServiceSlug(slug)

  return (
    <div className="min-h-screen">
      <ServiceHero
        eyebrow={s.eyebrow}
        h1={s.h1}
        subheadline={s.subheadline}
        heroCta={s.heroCta}
        image={s.image}
        onStartQuote={handleStartQuote}
      />

      <TrustedBySection />

      <ServiceDescriptionSection
        heading={s.descriptionHeading}
        description={s.description}
        highlights={s.highlights}
        ctaLabel={s.ctaLabel}
        collage={s.collage}
        collageStats={s.collageStats}
        onStartQuote={handleStartQuote}
      />

      {productCategory ? (
        <CategoryProductsShowcase category={productCategory} />
      ) : (
        <GeneralEquipmentShowcase />
      )}

      <TestimonialsCarousel />
      <WhyChooseUsSection />

      {productCategory && <FrequentlyTogether category={productCategory} />}

      <CaseStudiesSection />
      <ServicesGridSection />
      <RentalCategoriesSection />
      <FIFAPromoBanner />
      <AboutUsSection />
      <PromoBannersSection />
      <EventTypesSection />
      <CharitySection />
      <FAQSection />
      <ContactSpecialistBanner onStartQuote={handleStartQuote} />
    </div>
  )
}
