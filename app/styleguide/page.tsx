import type { Metadata } from "next"
import { StyleguideShell } from "./styleguide-shell"

export const metadata: Metadata = {
  title: "Brand & UI Style Guide | Prime Line AV",
  description:
    "The Prime Line AV brand and interface system: logo, colour, typography, spacing, effects, components, motion, design tokens, banners, social formats, AI visual guidelines and the brand asset download centre.",
  alternates: { canonical: "/styleguide" },
  // A working reference, not a landing page — kept out of the index.
  robots: { index: false, follow: false },
}

export default function StyleguidePage() {
  return <StyleguideShell />
}
