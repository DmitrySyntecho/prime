"use client"

import { usePathname } from "next/navigation"
import { isLandingPath } from "@/lib/landing-routes"

/** Renders site chrome everywhere except the /lp/* landings. */
export function HideOnLanding({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return isLandingPath(pathname) ? null : <>{children}</>
}
