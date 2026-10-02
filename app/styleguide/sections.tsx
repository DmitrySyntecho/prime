"use client"

import { OverviewSection, LogoSection, ColorSection, TypographySection, SpacingSection, EffectsSection } from "./sections/foundations"
import { ComponentsSection } from "./sections/components"
import { IconsSection, ImagerySection, MotionSection, TokensSection } from "./sections/system"
import { SocialSystemSection, BannersSection, FormatsSection, AiSection, DosDontsSection, DownloadsSection } from "./sections/market"

export const SECTION_GROUPS = ["Foundations", "The system", "Brand in market"] as const

/**
 * The single registry. Sidebar, mobile chips, scrollspy and page body all read
 * from it, so a section can never appear in one and not the others.
 */
export const SECTIONS = [
  { id: "overview", label: "Brand overview", group: "Foundations", Component: OverviewSection },
  { id: "logo", label: "Logo system", group: "Foundations", Component: LogoSection },
  { id: "color", label: "Colour system", group: "Foundations", Component: ColorSection },
  { id: "typography", label: "Typography", group: "Foundations", Component: TypographySection },
  { id: "spacing", label: "Spacing & grid", group: "Foundations", Component: SpacingSection },
  { id: "effects", label: "Radius & effects", group: "Foundations", Component: EffectsSection },

  { id: "components", label: "Core UI components", group: "The system", Component: ComponentsSection },
  { id: "icons", label: "Icons & favicons", group: "The system", Component: IconsSection },
  { id: "imagery", label: "Imagery", group: "The system", Component: ImagerySection },
  { id: "motion", label: "Motion", group: "The system", Component: MotionSection },
  { id: "tokens", label: "Design tokens", group: "The system", Component: TokensSection },

  { id: "social", label: "Social media system", group: "Brand in market", Component: SocialSystemSection },
  { id: "banners", label: "Banner concepts", group: "Brand in market", Component: BannersSection },
  { id: "formats", label: "Formats & adaptation", group: "Brand in market", Component: FormatsSection },
  { id: "ai-visuals", label: "AI visual guidelines", group: "Brand in market", Component: AiSection },
  { id: "do-dont", label: "Do & don’t", group: "Brand in market", Component: DosDontsSection },
  { id: "downloads", label: "Download centre", group: "Brand in market", Component: DownloadsSection },
] as const
