import type { Metadata } from "next"
import { LedLandingPage } from "@/components/pages/led-landing-page"

// Ad landing: kept out of the index (the SEO version is /av-rental/led-video-wall).
export const metadata: Metadata = {
  title: "LED Video Wall Rental | Prime Line AV",
  description:
    "Rent indoor and outdoor LED video walls with delivery, rigging and an on-site technician anywhere in the USA. Browse every LED wall and get a quote in 30 minutes.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/av-rental/led-video-wall" },
}

export default function LedVideoWallsLandingPage() {
  return <LedLandingPage />
}
