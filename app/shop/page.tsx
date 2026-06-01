import type { Metadata } from "next"
import { ShopCatalog } from "@/components/shop-catalog"

export const metadata: Metadata = {
  title: "Pro AV Equipment Rentals – Prime Line AV",
  description:
    "Rent LED video walls, sound systems, DJ setups, lighting and stage packages for events across Los Angeles.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      <ShopCatalog />
    </div>
  )
}
