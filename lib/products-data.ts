import type { Product, ProductCategory } from "./cart-context"

// AUTO-GENERATED from scripts/generate-products-data.mjs (source images in /Products).
// Names & dimensions are derived from the source filenames.
// NOTE: prices, discounts and LED spec sheets are REPRESENTATIVE PLACEHOLDERS —
// replace with real rates before launch.

export interface CategoryMeta {
  slug: ProductCategory
  label: string
  shortLabel: string
  /** related rental service page, if any */
  serviceSlug?: string
}

export const CATEGORIES: CategoryMeta[] = [
  { slug: "led-screens", label: "LED Video Walls & Screens", shortLabel: "LED Screens", serviceSlug: "led-screen-rental" },
  { slug: "dj-setups", label: "DJ Setups", shortLabel: "DJ Setups" },
  { slug: "sound-systems", label: "Sound Systems", shortLabel: "Sound", serviceSlug: "sound-system-rental" },
  { slug: "lighting", label: "Lighting", shortLabel: "Lighting", serviceSlug: "lighting-rental" },
  { slug: "stage", label: "Stage & Production", shortLabel: "Stage", serviceSlug: "stage-rental" },
]

export const CATEGORY_LABEL: Record<ProductCategory, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label])
) as Record<ProductCategory, string>

export interface FilterOption {
  value: string
  label: string
}
export interface FilterFacet {
  key: string
  label: string
  options: FilterOption[]
}

// Contextual sub-filters shown when a category is selected in the shop.
export const CATEGORY_FILTERS: Partial<Record<ProductCategory, FilterFacet[]>> = {
  "led-screens": [
    {
      "key": "environment",
      "label": "Environment",
      "options": [
        {
          "value": "indoor",
          "label": "Indoor"
        },
        {
          "value": "outdoor",
          "label": "Outdoor / IP65"
        }
      ]
    },
    {
      "key": "pitch",
      "label": "Pixel Pitch",
      "options": [
        {
          "value": "P1.9mm",
          "label": "P1.9mm"
        },
        {
          "value": "P2.6mm",
          "label": "P2.6mm"
        },
        {
          "value": "P3.9mm",
          "label": "P3.9mm"
        },
        {
          "value": "P4.8mm",
          "label": "P4.8mm"
        }
      ]
    },
    {
      "key": "size",
      "label": "Screen Size",
      "options": [
        {
          "value": "compact",
          "label": "Compact (<60 sq ft)"
        },
        {
          "value": "mid-format",
          "label": "Mid (60–200)"
        },
        {
          "value": "large-format",
          "label": "Large (200–500)"
        },
        {
          "value": "xl-format",
          "label": "XL / Giant (500+)"
        }
      ]
    }
  ],
  "sound-systems": [
    {
      "key": "capacity",
      "label": "Audience Size",
      "options": [
        {
          "value": "350",
          "label": "Up to 350"
        },
        {
          "value": "500",
          "label": "Up to 500"
        },
        {
          "value": "1000",
          "label": "Up to 1,000"
        },
        {
          "value": "2000+",
          "label": "2,000+ guests"
        }
      ]
    },
    {
      "key": "series",
      "label": "Series",
      "options": [
        {
          "value": "A15",
          "label": "A15"
        },
        {
          "value": "Syva",
          "label": "Syva"
        },
        {
          "value": "Fest",
          "label": "Fest"
        }
      ]
    }
  ],
  "dj-setups": [
    {
      "key": "console",
      "label": "Console",
      "options": [
        {
          "value": "controller",
          "label": "Controller (DDJ)"
        },
        {
          "value": "club",
          "label": "Club (CDJ + Mixer)"
        }
      ]
    }
  ],
  "stage": [
    {
      "key": "type",
      "label": "Type",
      "options": [
        {
          "value": "stage",
          "label": "Stage / Deck"
        },
        {
          "value": "monitor",
          "label": "Confidence Monitor"
        }
      ]
    },
    {
      "key": "scale",
      "label": "Scale",
      "options": [
        {
          "value": "medium",
          "label": "Medium"
        },
        {
          "value": "large",
          "label": "Large"
        }
      ]
    }
  ]
}

export const products: Product[] = [
  {
    "id": "main-stadium-scoreboard-screen-60-x-20",
    "name": "Main Stadium Scoreboard Screen",
    "slug": "main-stadium-scoreboard-screen-60-x-20",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "outdoor",
      "xl-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P4.8mm",
      "size": "xl-format",
      "ip": "ip65"
    },
    "description": "60' x 20' (1200 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "60' x 20' (1200 sq ft)",
    "price": 21299,
    "originalPrice": 23149,
    "discount": 8,
    "image": "/images/products/led-screens/main-stadium-scoreboard-screen-60-x-20/main.webp",
    "images": [
      "/images/products/led-screens/main-stadium-scoreboard-screen-60-x-20/main.webp"
    ],
    "features": [
      "P4.8mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P4.8mm",
      "resolution": "3808 x 1264",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 2550,
    "installationFee": 4700,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "main-event-stage-led-wall-40-x-20",
    "name": "Main Event Stage LED Wall",
    "slug": "main-event-stage-led-wall-40-x-20",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "xl-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "xl-format",
      "ip": "indoor"
    },
    "description": "40' x 20' (800 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "40' x 20' (800 sq ft)",
    "price": 14499,
    "originalPrice": 16289,
    "discount": 11,
    "image": "/images/products/led-screens/main-event-stage-led-wall-40-x-20/main.webp",
    "images": [
      "/images/products/led-screens/main-event-stage-led-wall-40-x-20/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "3120 x 1568",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 1750,
    "installationFee": 3200,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "large-scale-billboard-led-wall-48-x-14",
    "name": "Large-Scale Billboard LED Wall",
    "slug": "large-scale-billboard-led-wall-48-x-14",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "outdoor",
      "xl-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P4.8mm",
      "size": "xl-format",
      "ip": "ip65"
    },
    "description": "48' x 14' (672 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "48' x 14' (672 sq ft)",
    "price": 12319,
    "originalPrice": 14159,
    "discount": 13,
    "image": "/images/products/led-screens/large-scale-billboard-led-wall-48-x-14/main.webp",
    "images": [
      "/images/products/led-screens/large-scale-billboard-led-wall-48-x-14/main.webp"
    ],
    "features": [
      "P4.8mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P4.8mm",
      "resolution": "3056 x 896",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 1500,
    "installationFee": 2700,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "grand-outdoor-screen-29-5-x-16-4",
    "name": "Grand Outdoor Screen",
    "slug": "grand-outdoor-screen-29-5-x-16-4",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "outdoor",
      "large-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "ip65"
    },
    "description": "29.5' x 16.4' (484 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "29.5' x 16.4' (484 sq ft)",
    "price": 9129,
    "originalPrice": 10369,
    "discount": 12,
    "image": "/images/products/led-screens/grand-outdoor-screen-29-5-x-16-4/main.webp",
    "images": [
      "/images/products/led-screens/grand-outdoor-screen-29-5-x-16-4/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2304 x 1280",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 1100,
    "installationFee": 2000,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "ultra-large-outdoor-screen-29-5-x-16-4",
    "name": "Ultra-Large Outdoor Screen",
    "slug": "ultra-large-outdoor-screen-29-5-x-16-4",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "outdoor",
      "large-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "ip65"
    },
    "description": "29.5' x 16.4' (484 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "29.5' x 16.4' (484 sq ft)",
    "price": 9129,
    "originalPrice": 9919,
    "discount": 8,
    "image": "/images/products/led-screens/ultra-large-outdoor-screen-29-5-x-16-4/main.webp",
    "images": [
      "/images/products/led-screens/ultra-large-outdoor-screen-29-5-x-16-4/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2304 x 1280",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 1100,
    "installationFee": 2000,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "ultra-wide-indoor-screen-29-5-x-16-4",
    "name": "Ultra-Wide Indoor Screen",
    "slug": "ultra-wide-indoor-screen-29-5-x-16-4",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "29.5' x 16.4' (484 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "29.5' x 16.4' (484 sq ft)",
    "price": 9129,
    "originalPrice": 10259,
    "discount": 11,
    "image": "/images/products/led-screens/ultra-wide-indoor-screen-29-5-x-16-4/main.webp",
    "images": [
      "/images/products/led-screens/ultra-wide-indoor-screen-29-5-x-16-4/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2304 x 1280",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 1100,
    "installationFee": 2000,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "auditorium-presentation-wall-30-x-15",
    "name": "Auditorium Presentation Wall",
    "slug": "auditorium-presentation-wall-30-x-15",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "30' x 15' (450 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "30' x 15' (450 sq ft)",
    "price": 8549,
    "originalPrice": 9609,
    "discount": 11,
    "image": "/images/products/led-screens/auditorium-presentation-wall-30-x-15/main.webp",
    "images": [
      "/images/products/led-screens/auditorium-presentation-wall-30-x-15/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2352 x 1168",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 1050,
    "installationFee": 1900,
    "rentalPeriod": "24h",
    "inStock": true,
    "featured": true
  },
  {
    "id": "entertainment-stage-led-screen-30-x-15",
    "name": "Entertainment Stage LED Screen",
    "slug": "entertainment-stage-led-screen-30-x-15",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "30' x 15' (450 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "30' x 15' (450 sq ft)",
    "price": 8549,
    "originalPrice": 9499,
    "discount": 10,
    "image": "/images/products/led-screens/entertainment-stage-led-screen-30-x-15/main.webp",
    "images": [
      "/images/products/led-screens/entertainment-stage-led-screen-30-x-15/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2352 x 1168",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 1050,
    "installationFee": 1900,
    "rentalPeriod": "24h",
    "inStock": true,
    "featured": true
  },
  {
    "id": "highway-billboard-display-30-x-15",
    "name": "Highway Billboard Display",
    "slug": "highway-billboard-display-30-x-15",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "outdoor",
      "large-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "ip65"
    },
    "description": "30' x 15' (450 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "30' x 15' (450 sq ft)",
    "price": 8549,
    "originalPrice": 9289,
    "discount": 8,
    "image": "/images/products/led-screens/highway-billboard-display-30-x-15/main.webp",
    "images": [
      "/images/products/led-screens/highway-billboard-display-30-x-15/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2352 x 1168",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 1050,
    "installationFee": 1900,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "large-retail-showcase-led-wall-30-x-15",
    "name": "Large Retail Showcase LED Wall",
    "slug": "large-retail-showcase-led-wall-30-x-15",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "30' x 15' (450 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "30' x 15' (450 sq ft)",
    "price": 8549,
    "originalPrice": 9289,
    "discount": 8,
    "image": "/images/products/led-screens/large-retail-showcase-led-wall-30-x-15/main.webp",
    "images": [
      "/images/products/led-screens/large-retail-showcase-led-wall-30-x-15/main.webp",
      "/images/products/led-screens/large-retail-showcase-led-wall-30-x-15/1.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2352 x 1168",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 1050,
    "installationFee": 1900,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "main-terminal-information-wall-30-x-15",
    "name": "Main Terminal Information Wall",
    "slug": "main-terminal-information-wall-30-x-15",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "outdoor",
      "large-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "ip65"
    },
    "description": "30' x 15' (450 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "30' x 15' (450 sq ft)",
    "price": 8549,
    "originalPrice": 9709,
    "discount": 12,
    "image": "/images/products/led-screens/main-terminal-information-wall-30-x-15/main.webp",
    "images": [
      "/images/products/led-screens/main-terminal-information-wall-30-x-15/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2352 x 1168",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 1050,
    "installationFee": 1900,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "led-video-wall-39-36ft-x-9-84ft",
    "name": "LED Video Wall",
    "slug": "led-video-wall-39-36ft-x-9-84ft",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "39.36' x 9.84' (387 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "39.36' x 9.84' (387 sq ft)",
    "price": 7479,
    "originalPrice": 8599,
    "discount": 13,
    "image": "/images/products/led-screens/led-video-wall-39-36ft-x-9-84ft/main.webp",
    "images": [
      "/images/products/led-screens/led-video-wall-39-36ft-x-9-84ft/main.webp",
      "/images/products/led-screens/led-video-wall-39-36ft-x-9-84ft/1.webp",
      "/images/products/led-screens/led-video-wall-39-36ft-x-9-84ft/2.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "3072 x 768",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 900,
    "installationFee": 1650,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "immersive-exhibition-screen-25-x-15",
    "name": "Immersive Exhibition Screen",
    "slug": "immersive-exhibition-screen-25-x-15",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "25' x 15' (375 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "25' x 15' (375 sq ft)",
    "price": 7279,
    "originalPrice": 8089,
    "discount": 10,
    "image": "/images/products/led-screens/immersive-exhibition-screen-25-x-15/main.webp",
    "images": [
      "/images/products/led-screens/immersive-exhibition-screen-25-x-15/main.webp",
      "/images/products/led-screens/immersive-exhibition-screen-25-x-15/1.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1952 x 1168",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 850,
    "installationFee": 1600,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "led-video-wall-24-6ft-x-13-12ft",
    "name": "LED Video Wall",
    "slug": "led-video-wall-24-6ft-x-13-12ft",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "24.6' x 13.12' (323 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "24.6' x 13.12' (323 sq ft)",
    "price": 6389,
    "originalPrice": 7099,
    "discount": 10,
    "image": "/images/products/led-screens/led-video-wall-24-6ft-x-13-12ft/main.webp",
    "images": [
      "/images/products/led-screens/led-video-wall-24-6ft-x-13-12ft/main.webp",
      "/images/products/led-screens/led-video-wall-24-6ft-x-13-12ft/1.webp",
      "/images/products/led-screens/led-video-wall-24-6ft-x-13-12ft/2.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1920 x 1024",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 750,
    "installationFee": 1400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "banquet-hall-led-wall-25-x-12",
    "name": "Banquet Hall LED Wall",
    "slug": "banquet-hall-led-wall-25-x-12",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "25' x 12' (300 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "25' x 12' (300 sq ft)",
    "price": 5999,
    "originalPrice": 6519,
    "discount": 8,
    "image": "/images/products/led-screens/banquet-hall-led-wall-25-x-12/main.webp",
    "images": [
      "/images/products/led-screens/banquet-hall-led-wall-25-x-12/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1952 x 944",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 700,
    "installationFee": 1300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "corporate-atrium-led-display-25-x-12",
    "name": "Corporate Atrium LED Display",
    "slug": "corporate-atrium-led-display-25-x-12",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "25' x 12' (300 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "25' x 12' (300 sq ft)",
    "price": 5999,
    "originalPrice": 6819,
    "discount": 12,
    "image": "/images/products/led-screens/corporate-atrium-led-display-25-x-12/main.webp",
    "images": [
      "/images/products/led-screens/corporate-atrium-led-display-25-x-12/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1952 x 944",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 700,
    "installationFee": 1300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "event-broadcast-led-wall-30-x-10",
    "name": "Event Broadcast LED Wall",
    "slug": "event-broadcast-led-wall-30-x-10",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "30' x 10' (300 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "30' x 10' (300 sq ft)",
    "price": 5999,
    "originalPrice": 6819,
    "discount": 12,
    "image": "/images/products/led-screens/event-broadcast-led-wall-30-x-10/main.webp",
    "images": [
      "/images/products/led-screens/event-broadcast-led-wall-30-x-10/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2352 x 784",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 700,
    "installationFee": 1300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "main-entrance-led-wall-25-x-12",
    "name": "Main Entrance LED Wall",
    "slug": "main-entrance-led-wall-25-x-12",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "25' x 12' (300 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "25' x 12' (300 sq ft)",
    "price": 5999,
    "originalPrice": 6519,
    "discount": 8,
    "image": "/images/products/led-screens/main-entrance-led-wall-25-x-12/main.webp",
    "images": [
      "/images/products/led-screens/main-entrance-led-wall-25-x-12/main.webp",
      "/images/products/led-screens/main-entrance-led-wall-25-x-12/1.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1952 x 944",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 700,
    "installationFee": 1300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "sanctuary-display-wall-25-x-12",
    "name": "Sanctuary Display Wall",
    "slug": "sanctuary-display-wall-25-x-12",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "25' x 12' (300 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "25' x 12' (300 sq ft)",
    "price": 5999,
    "originalPrice": 6899,
    "discount": 13,
    "image": "/images/products/led-screens/sanctuary-display-wall-25-x-12/main.webp",
    "images": [
      "/images/products/led-screens/sanctuary-display-wall-25-x-12/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1952 x 944",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 700,
    "installationFee": 1300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "premium-indoor-display-23-x-13",
    "name": "Premium Indoor Display",
    "slug": "premium-indoor-display-23-x-13",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "23' x 13' (299 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "23' x 13' (299 sq ft)",
    "price": 5979,
    "originalPrice": 6499,
    "discount": 8,
    "image": "/images/products/led-screens/premium-indoor-display-23-x-13/main.webp",
    "images": [
      "/images/products/led-screens/premium-indoor-display-23-x-13/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1792 x 1024",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 700,
    "installationFee": 1300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "premium-outdoor-screen-23-x-13",
    "name": "Premium Outdoor Screen",
    "slug": "premium-outdoor-screen-23-x-13",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "outdoor",
      "large-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "ip65"
    },
    "description": "23' x 13' (299 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "23' x 13' (299 sq ft)",
    "price": 5979,
    "originalPrice": 6569,
    "discount": 9,
    "image": "/images/products/led-screens/premium-outdoor-screen-23-x-13/main.webp",
    "images": [
      "/images/products/led-screens/premium-outdoor-screen-23-x-13/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1792 x 1024",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 700,
    "installationFee": 1300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "led-video-wall-29-52ft-x-9-84ft",
    "name": "LED Video Wall",
    "slug": "led-video-wall-29-52ft-x-9-84ft",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "29.52' x 9.84' (290 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "29.52' x 9.84' (290 sq ft)",
    "price": 5829,
    "originalPrice": 6339,
    "discount": 8,
    "image": "/images/products/led-screens/led-video-wall-29-52ft-x-9-84ft/main.webp",
    "images": [
      "/images/products/led-screens/led-video-wall-29-52ft-x-9-84ft/main.webp",
      "/images/products/led-screens/led-video-wall-29-52ft-x-9-84ft/1.webp",
      "/images/products/led-screens/led-video-wall-29-52ft-x-9-84ft/2.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2304 x 768",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 700,
    "installationFee": 1300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "wide-indoor-screen-29-5-x-9-8",
    "name": "Wide Indoor Screen",
    "slug": "wide-indoor-screen-29-5-x-9-8",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "29.5' x 9.8' (289 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "29.5' x 9.8' (289 sq ft)",
    "price": 5809,
    "originalPrice": 6309,
    "discount": 8,
    "image": "/images/products/led-screens/wide-indoor-screen-29-5-x-9-8/main.webp",
    "images": [
      "/images/products/led-screens/wide-indoor-screen-29-5-x-9-8/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2304 x 768",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 700,
    "installationFee": 1300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "wide-outdoor-screen-29-5-x-9-8",
    "name": "Wide Outdoor Screen",
    "slug": "wide-outdoor-screen-29-5-x-9-8",
    "category": "led-screens",
    "tier": "premium",
    "tags": [
      "outdoor",
      "large-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "ip65"
    },
    "description": "29.5' x 9.8' (289 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "29.5' x 9.8' (289 sq ft)",
    "price": 5809,
    "originalPrice": 6529,
    "discount": 11,
    "image": "/images/products/led-screens/wide-outdoor-screen-29-5-x-9-8/main.webp",
    "images": [
      "/images/products/led-screens/wide-outdoor-screen-29-5-x-9-8/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "2304 x 768",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 700,
    "installationFee": 1300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "baggage-claim-led-sign-20-x-10",
    "name": "Baggage Claim LED Sign",
    "slug": "baggage-claim-led-sign-20-x-10",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "outdoor",
      "large-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "ip65"
    },
    "description": "20' x 10' (200 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "20' x 10' (200 sq ft)",
    "price": 4299,
    "originalPrice": 4719,
    "discount": 9,
    "image": "/images/products/led-screens/baggage-claim-led-sign-20-x-10/main.webp",
    "images": [
      "/images/products/led-screens/baggage-claim-led-sign-20-x-10/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1568 x 784",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 500,
    "installationFee": 950,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "mall-atrium-led-screen-20-x-10",
    "name": "Mall Atrium LED Screen",
    "slug": "mall-atrium-led-screen-20-x-10",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "20' x 10' (200 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "20' x 10' (200 sq ft)",
    "price": 4299,
    "originalPrice": 4889,
    "discount": 12,
    "image": "/images/products/led-screens/mall-atrium-led-screen-20-x-10/main.webp",
    "images": [
      "/images/products/led-screens/mall-atrium-led-screen-20-x-10/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1568 x 784",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 500,
    "installationFee": 950,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "wayfinding-and-sponsor-display-20-x-10",
    "name": "Wayfinding And Sponsor Display",
    "slug": "wayfinding-and-sponsor-display-20-x-10",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "large-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P3.9mm",
      "size": "large-format",
      "ip": "indoor"
    },
    "description": "20' x 10' (200 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "20' x 10' (200 sq ft)",
    "price": 4299,
    "originalPrice": 4669,
    "discount": 8,
    "image": "/images/products/led-screens/wayfinding-and-sponsor-display-20-x-10/main.webp",
    "images": [
      "/images/products/led-screens/wayfinding-and-sponsor-display-20-x-10/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Large-Format"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1568 x 784",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 500,
    "installationFee": 950,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "led-video-wall-19-68ft-x-9-84ft",
    "name": "LED Video Wall",
    "slug": "led-video-wall-19-68ft-x-9-84ft",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "19.68' x 9.84' (194 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "19.68' x 9.84' (194 sq ft)",
    "price": 4199,
    "originalPrice": 4669,
    "discount": 10,
    "image": "/images/products/led-screens/led-video-wall-19-68ft-x-9-84ft/main.webp",
    "images": [
      "/images/products/led-screens/led-video-wall-19-68ft-x-9-84ft/main.webp",
      "/images/products/led-screens/led-video-wall-19-68ft-x-9-84ft/1.webp",
      "/images/products/led-screens/led-video-wall-19-68ft-x-9-84ft/2.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "2304 x 1152",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 500,
    "installationFee": 900,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "large-indoor-screen-19-7-x-9-8",
    "name": "Large Indoor Screen",
    "slug": "large-indoor-screen-19-7-x-9-8",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "19.7' x 9.8' (193 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "19.7' x 9.8' (193 sq ft)",
    "price": 4179,
    "originalPrice": 4589,
    "discount": 9,
    "image": "/images/products/led-screens/large-indoor-screen-19-7-x-9-8/main.webp",
    "images": [
      "/images/products/led-screens/large-indoor-screen-19-7-x-9-8/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "2304 x 1152",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 500,
    "installationFee": 900,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "large-outdoor-screen-19-7-x-9-8",
    "name": "Large Outdoor Screen",
    "slug": "large-outdoor-screen-19-7-x-9-8",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "outdoor",
      "mid-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "mid-format",
      "ip": "ip65"
    },
    "description": "19.7' x 9.8' (193 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "19.7' x 9.8' (193 sq ft)",
    "price": 4179,
    "originalPrice": 4639,
    "discount": 10,
    "image": "/images/products/led-screens/large-outdoor-screen-19-7-x-9-8/main.webp",
    "images": [
      "/images/products/led-screens/large-outdoor-screen-19-7-x-9-8/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1536 x 768",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 500,
    "installationFee": 900,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "main-casino-display-wall-18-x-10",
    "name": "Main Casino Display Wall",
    "slug": "main-casino-display-wall-18-x-10",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "18' x 10' (180 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "18' x 10' (180 sq ft)",
    "price": 3959,
    "originalPrice": 4399,
    "discount": 10,
    "image": "/images/products/led-screens/main-casino-display-wall-18-x-10/main.webp",
    "images": [
      "/images/products/led-screens/main-casino-display-wall-18-x-10/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "2112 x 1168",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 500,
    "installationFee": 850,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "student-center-led-display-18-x-10",
    "name": "Student Center LED Display",
    "slug": "student-center-led-display-18-x-10",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "18' x 10' (180 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "18' x 10' (180 sq ft)",
    "price": 3959,
    "originalPrice": 4549,
    "discount": 13,
    "image": "/images/products/led-screens/student-center-led-display-18-x-10/main.webp",
    "images": [
      "/images/products/led-screens/student-center-led-display-18-x-10/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "2112 x 1168",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 500,
    "installationFee": 850,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "high-impact-outdoor-display-19-6-x-8-2",
    "name": "High-Impact Outdoor Display",
    "slug": "high-impact-outdoor-display-19-6-x-8-2",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "outdoor",
      "mid-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "mid-format",
      "ip": "ip65"
    },
    "description": "19.6' x 8.2' (161 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "19.6' x 8.2' (161 sq ft)",
    "price": 3639,
    "originalPrice": 4039,
    "discount": 10,
    "image": "/images/products/led-screens/high-impact-outdoor-display-19-6-x-8-2/main.webp",
    "images": [
      "/images/products/led-screens/high-impact-outdoor-display-19-6-x-8-2/main.webp",
      "/images/products/led-screens/high-impact-outdoor-display-19-6-x-8-2/1.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1536 x 640",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 450,
    "installationFee": 800,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "led-video-wall-16-4ft-x-9-84ft",
    "name": "LED Video Wall",
    "slug": "led-video-wall-16-4ft-x-9-84ft",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "16.4' x 9.84' (161 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "16.4' x 9.84' (161 sq ft)",
    "price": 3639,
    "originalPrice": 4089,
    "discount": 11,
    "image": "/images/products/led-screens/led-video-wall-16-4ft-x-9-84ft/main.webp",
    "images": [
      "/images/products/led-screens/led-video-wall-16-4ft-x-9-84ft/main.webp",
      "/images/products/led-screens/led-video-wall-16-4ft-x-9-84ft/1.webp",
      "/images/products/led-screens/led-video-wall-16-4ft-x-9-84ft/2.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1920 x 1152",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 450,
    "installationFee": 800,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "large-scale-indoor-display-19-6-x-8-2",
    "name": "Large-Scale Indoor Display",
    "slug": "large-scale-indoor-display-19-6-x-8-2",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "19.6' x 8.2' (161 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "19.6' x 8.2' (161 sq ft)",
    "price": 3639,
    "originalPrice": 3959,
    "discount": 8,
    "image": "/images/products/led-screens/large-scale-indoor-display-19-6-x-8-2/main.webp",
    "images": [
      "/images/products/led-screens/large-scale-indoor-display-19-6-x-8-2/main.webp",
      "/images/products/led-screens/large-scale-indoor-display-19-6-x-8-2/1.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "2304 x 960",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 450,
    "installationFee": 800,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "mid-size-indoor-screen-16-4-x-9-8",
    "name": "Mid-Size Indoor Screen",
    "slug": "mid-size-indoor-screen-16-4-x-9-8",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "16.4' x 9.8' (161 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "16.4' x 9.8' (161 sq ft)",
    "price": 3639,
    "originalPrice": 4039,
    "discount": 10,
    "image": "/images/products/led-screens/mid-size-indoor-screen-16-4-x-9-8/main.webp",
    "images": [
      "/images/products/led-screens/mid-size-indoor-screen-16-4-x-9-8/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1920 x 1152",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 450,
    "installationFee": 800,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "standard-outdoor-screen-16-4-x-9-8",
    "name": "Standard Outdoor Screen",
    "slug": "standard-outdoor-screen-16-4-x-9-8",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "outdoor",
      "mid-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "mid-format",
      "ip": "ip65"
    },
    "description": "16.4' x 9.8' (161 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "16.4' x 9.8' (161 sq ft)",
    "price": 3639,
    "originalPrice": 4139,
    "discount": 12,
    "image": "/images/products/led-screens/standard-outdoor-screen-16-4-x-9-8/main.webp",
    "images": [
      "/images/products/led-screens/standard-outdoor-screen-16-4-x-9-8/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1280 x 768",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 450,
    "installationFee": 800,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "event-hall-led-display-15-x-10",
    "name": "Event Hall LED Display",
    "slug": "event-hall-led-display-15-x-10",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "15' x 10' (150 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "15' x 10' (150 sq ft)",
    "price": 3449,
    "originalPrice": 3959,
    "discount": 13,
    "image": "/images/products/led-screens/event-hall-led-display-15-x-10/main.webp",
    "images": [
      "/images/products/led-screens/event-hall-led-display-15-x-10/main.webp",
      "/images/products/led-screens/event-hall-led-display-15-x-10/1.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1760 x 1168",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 400,
    "installationFee": 750,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "gallery-wall-display-15-x-10",
    "name": "Gallery Wall Display",
    "slug": "gallery-wall-display-15-x-10",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "15' x 10' (150 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "15' x 10' (150 sq ft)",
    "price": 3449,
    "originalPrice": 3829,
    "discount": 10,
    "image": "/images/products/led-screens/gallery-wall-display-15-x-10/main.webp",
    "images": [
      "/images/products/led-screens/gallery-wall-display-15-x-10/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1760 x 1168",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 400,
    "installationFee": 750,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "dynamic-mid-sized-outdoor-display-14-7-x-8-2",
    "name": "Dynamic Mid-Sized Outdoor Display",
    "slug": "dynamic-mid-sized-outdoor-display-14-7-x-8-2",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "outdoor",
      "mid-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "mid-format",
      "ip": "ip65"
    },
    "description": "14.7' x 8.2' (121 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "14.7' x 8.2' (121 sq ft)",
    "price": 2959,
    "originalPrice": 3399,
    "discount": 13,
    "image": "/images/products/led-screens/dynamic-mid-sized-outdoor-display-14-7-x-8-2/main.webp",
    "images": [
      "/images/products/led-screens/dynamic-mid-sized-outdoor-display-14-7-x-8-2/main.webp",
      "/images/products/led-screens/dynamic-mid-sized-outdoor-display-14-7-x-8-2/1.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1152 x 640",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 350,
    "installationFee": 650,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "led-video-wall-14-76ft-x-8-2ft",
    "name": "LED Video Wall",
    "slug": "led-video-wall-14-76ft-x-8-2ft",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "14.76' x 8.2' (121 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "14.76' x 8.2' (121 sq ft)",
    "price": 2959,
    "originalPrice": 3319,
    "discount": 11,
    "image": "/images/products/led-screens/led-video-wall-14-76ft-x-8-2ft/main.webp",
    "images": [
      "/images/products/led-screens/led-video-wall-14-76ft-x-8-2ft/main.webp",
      "/images/products/led-screens/led-video-wall-14-76ft-x-8-2ft/1.webp",
      "/images/products/led-screens/led-video-wall-14-76ft-x-8-2ft/2.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1728 x 960",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 350,
    "installationFee": 650,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "versatile-mid-sized-indoor-display-14-7-x-8-2",
    "name": "Versatile Mid-Sized Indoor Display",
    "slug": "versatile-mid-sized-indoor-display-14-7-x-8-2",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "14.7' x 8.2' (121 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "14.7' x 8.2' (121 sq ft)",
    "price": 2959,
    "originalPrice": 3359,
    "discount": 12,
    "image": "/images/products/led-screens/versatile-mid-sized-indoor-display-14-7-x-8-2/main.webp",
    "images": [
      "/images/products/led-screens/versatile-mid-sized-indoor-display-14-7-x-8-2/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1728 x 960",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 350,
    "installationFee": 650,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "conference-room-presentation-screen-15-x-8",
    "name": "Conference Room Presentation Screen",
    "slug": "conference-room-presentation-screen-15-x-8",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "15' x 8' (120 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "15' x 8' (120 sq ft)",
    "price": 2939,
    "originalPrice": 3229,
    "discount": 9,
    "image": "/images/products/led-screens/conference-room-presentation-screen-15-x-8/main.webp",
    "images": [
      "/images/products/led-screens/conference-room-presentation-screen-15-x-8/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1760 x 944",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 350,
    "installationFee": 650,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "lobby-information-screen-15-x-8",
    "name": "Lobby Information Screen",
    "slug": "lobby-information-screen-15-x-8",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "15' x 8' (120 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "15' x 8' (120 sq ft)",
    "price": 2939,
    "originalPrice": 3379,
    "discount": 13,
    "image": "/images/products/led-screens/lobby-information-screen-15-x-8/main.webp",
    "images": [
      "/images/products/led-screens/lobby-information-screen-15-x-8/main.webp",
      "/images/products/led-screens/lobby-information-screen-15-x-8/1.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1760 x 944",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 350,
    "installationFee": 650,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "local-billboard-led-panel-15-x-8",
    "name": "Local Billboard LED Panel",
    "slug": "local-billboard-led-panel-15-x-8",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "outdoor",
      "mid-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "mid-format",
      "ip": "ip65"
    },
    "description": "15' x 8' (120 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "15' x 8' (120 sq ft)",
    "price": 2939,
    "originalPrice": 3299,
    "discount": 11,
    "image": "/images/products/led-screens/local-billboard-led-panel-15-x-8/main.webp",
    "images": [
      "/images/products/led-screens/local-billboard-led-panel-15-x-8/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "1168 x 624",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 350,
    "installationFee": 650,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "pulpit-display-screen-15-x-8",
    "name": "Pulpit Display Screen",
    "slug": "pulpit-display-screen-15-x-8",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "15' x 8' (120 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "15' x 8' (120 sq ft)",
    "price": 2939,
    "originalPrice": 3229,
    "discount": 9,
    "image": "/images/products/led-screens/pulpit-display-screen-15-x-8/main.webp",
    "images": [
      "/images/products/led-screens/pulpit-display-screen-15-x-8/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1760 x 944",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 350,
    "installationFee": 650,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "compact-scoreboard-led-panel-12-x-8",
    "name": "Compact Scoreboard LED Panel",
    "slug": "compact-scoreboard-led-panel-12-x-8",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "12' x 8' (96 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "12' x 8' (96 sq ft)",
    "price": 2529,
    "originalPrice": 2839,
    "discount": 11,
    "image": "/images/products/led-screens/compact-scoreboard-led-panel-12-x-8/main.webp",
    "images": [
      "/images/products/led-screens/compact-scoreboard-led-panel-12-x-8/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1408 x 944",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 300,
    "installationFee": 550,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "compact-indoor-screen-11-5-x-6-6",
    "name": "Compact Indoor Screen",
    "slug": "compact-indoor-screen-11-5-x-6-6",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "11.5' x 6.6' (76 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "11.5' x 6.6' (76 sq ft)",
    "price": 2189,
    "originalPrice": 2489,
    "discount": 12,
    "image": "/images/products/led-screens/compact-indoor-screen-11-5-x-6-6/main.webp",
    "images": [
      "/images/products/led-screens/compact-indoor-screen-11-5-x-6-6/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1344 x 768",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 250,
    "installationFee": 500,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "portable-outdoor-screen-11-5-x-6-6",
    "name": "Portable Outdoor Screen",
    "slug": "portable-outdoor-screen-11-5-x-6-6",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "outdoor",
      "mid-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "mid-format",
      "ip": "ip65"
    },
    "description": "11.5' x 6.6' (76 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "11.5' x 6.6' (76 sq ft)",
    "price": 2189,
    "originalPrice": 2409,
    "discount": 9,
    "image": "/images/products/led-screens/portable-outdoor-screen-11-5-x-6-6/main.webp",
    "images": [
      "/images/products/led-screens/portable-outdoor-screen-11-5-x-6-6/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "896 x 512",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 250,
    "installationFee": 500,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "led-video-wall-11-48ft-x-6-56ft",
    "name": "LED Video Wall",
    "slug": "led-video-wall-11-48ft-x-6-56ft",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "11.48' x 6.56' (75 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "11.48' x 6.56' (75 sq ft)",
    "price": 2179,
    "originalPrice": 2419,
    "discount": 10,
    "image": "/images/products/led-screens/led-video-wall-11-48ft-x-6-56ft/main.webp",
    "images": [
      "/images/products/led-screens/led-video-wall-11-48ft-x-6-56ft/main.webp",
      "/images/products/led-screens/led-video-wall-11-48ft-x-6-56ft/1.webp",
      "/images/products/led-screens/led-video-wall-11-48ft-x-6-56ft/2.webp",
      "/images/products/led-screens/led-video-wall-11-48ft-x-6-56ft/3.webp",
      "/images/products/led-screens/led-video-wall-11-48ft-x-6-56ft/4.webp",
      "/images/products/led-screens/led-video-wall-11-48ft-x-6-56ft/5.webp",
      "/images/products/led-screens/led-video-wall-11-48ft-x-6-56ft/6.webp",
      "/images/products/led-screens/led-video-wall-11-48ft-x-6-56ft/7.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1344 x 768",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 250,
    "installationFee": 500,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "exhibitor-booth-led-screen-10-x-6",
    "name": "Exhibitor Booth LED Screen",
    "slug": "exhibitor-booth-led-screen-10-x-6",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "10' x 6' (60 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "10' x 6' (60 sq ft)",
    "price": 1919,
    "originalPrice": 2179,
    "discount": 12,
    "image": "/images/products/led-screens/exhibitor-booth-led-screen-10-x-6/main.webp",
    "images": [
      "/images/products/led-screens/exhibitor-booth-led-screen-10-x-6/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1168 x 704",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 250,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "gate-information-display-10-x-6",
    "name": "Gate Information Display",
    "slug": "gate-information-display-10-x-6",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "outdoor",
      "mid-format"
    ],
    "filters": {
      "environment": "outdoor",
      "pitch": "P3.9mm",
      "size": "mid-format",
      "ip": "ip65"
    },
    "description": "10' x 6' (60 sq ft) professional outdoor-rated LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "10' x 6' (60 sq ft)",
    "price": 1919,
    "originalPrice": 2209,
    "discount": 13,
    "image": "/images/products/led-screens/gate-information-display-10-x-6/main.webp",
    "images": [
      "/images/products/led-screens/gate-information-display-10-x-6/main.webp"
    ],
    "features": [
      "P3.9mm Pixel Pitch",
      "Outdoor IP65 Rated",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P3.9mm",
      "resolution": "784 x 464",
      "brightness": "6500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 250,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "lecture-hall-display-screen-10-x-6",
    "name": "Lecture Hall Display Screen",
    "slug": "lecture-hall-display-screen-10-x-6",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "mid-format"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P2.6mm",
      "size": "mid-format",
      "ip": "indoor"
    },
    "description": "10' x 6' (60 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "10' x 6' (60 sq ft)",
    "price": 1919,
    "originalPrice": 2089,
    "discount": 8,
    "image": "/images/products/led-screens/lecture-hall-display-screen-10-x-6/main.webp",
    "images": [
      "/images/products/led-screens/lecture-hall-display-screen-10-x-6/main.webp"
    ],
    "features": [
      "P2.6mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P2.6mm",
      "resolution": "1168 x 704",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 250,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "compact-interactive-led-panel-10-x-5",
    "name": "Compact Interactive LED Panel",
    "slug": "compact-interactive-led-panel-10-x-5",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "compact"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P1.9mm",
      "size": "compact",
      "ip": "indoor"
    },
    "description": "10' x 5' (50 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "10' x 5' (50 sq ft)",
    "price": 1749,
    "originalPrice": 1989,
    "discount": 12,
    "image": "/images/products/led-screens/compact-interactive-led-panel-10-x-5/main.webp",
    "images": [
      "/images/products/led-screens/compact-interactive-led-panel-10-x-5/main.webp"
    ],
    "features": [
      "P1.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P1.9mm",
      "resolution": "1600 x 800",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 200,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "exhibit-interactive-led-panel-8-x-6",
    "name": "Exhibit Interactive LED Panel",
    "slug": "exhibit-interactive-led-panel-8-x-6",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "compact"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P1.9mm",
      "size": "compact",
      "ip": "indoor"
    },
    "description": "8' x 6' (48 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "8' x 6' (48 sq ft)",
    "price": 1719,
    "originalPrice": 1949,
    "discount": 12,
    "image": "/images/products/led-screens/exhibit-interactive-led-panel-8-x-6/main.webp",
    "images": [
      "/images/products/led-screens/exhibit-interactive-led-panel-8-x-6/main.webp"
    ],
    "features": [
      "P1.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P1.9mm",
      "resolution": "1280 x 960",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 200,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "slot-area-led-signage-8-x-6",
    "name": "Slot Area LED Signage",
    "slug": "slot-area-led-signage-8-x-6",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "compact"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P1.9mm",
      "size": "compact",
      "ip": "indoor"
    },
    "description": "8' x 6' (48 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "8' x 6' (48 sq ft)",
    "price": 1719,
    "originalPrice": 1869,
    "discount": 8,
    "image": "/images/products/led-screens/slot-area-led-signage-8-x-6/main.webp",
    "images": [
      "/images/products/led-screens/slot-area-led-signage-8-x-6/main.webp"
    ],
    "features": [
      "P1.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P1.9mm",
      "resolution": "1280 x 960",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 200,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "led-video-wall-8-2ft-x-4-92ft",
    "name": "LED Video Wall",
    "slug": "led-video-wall-8-2ft-x-4-92ft",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "compact"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P1.9mm",
      "size": "compact",
      "ip": "indoor"
    },
    "description": "8.2' x 4.92' (40 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "8.2' x 4.92' (40 sq ft)",
    "price": 1579,
    "originalPrice": 1789,
    "discount": 12,
    "image": "/images/products/led-screens/led-video-wall-8-2ft-x-4-92ft/main.webp",
    "images": [
      "/images/products/led-screens/led-video-wall-8-2ft-x-4-92ft/main.webp",
      "/images/products/led-screens/led-video-wall-8-2ft-x-4-92ft/1.webp",
      "/images/products/led-screens/led-video-wall-8-2ft-x-4-92ft/2.webp"
    ],
    "features": [
      "P1.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P1.9mm",
      "resolution": "1312 x 784",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 200,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "lobby-information-led-screen-8-x-5",
    "name": "Lobby Information LED Screen",
    "slug": "lobby-information-led-screen-8-x-5",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "compact"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P1.9mm",
      "size": "compact",
      "ip": "indoor"
    },
    "description": "8' x 5' (40 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "8' x 5' (40 sq ft)",
    "price": 1579,
    "originalPrice": 1719,
    "discount": 8,
    "image": "/images/products/led-screens/lobby-information-led-screen-8-x-5/main.webp",
    "images": [
      "/images/products/led-screens/lobby-information-led-screen-8-x-5/main.webp",
      "/images/products/led-screens/lobby-information-led-screen-8-x-5/1.webp",
      "/images/products/led-screens/lobby-information-led-screen-8-x-5/2.webp",
      "/images/products/led-screens/lobby-information-led-screen-8-x-5/3.webp",
      "/images/products/led-screens/lobby-information-led-screen-8-x-5/4.webp",
      "/images/products/led-screens/lobby-information-led-screen-8-x-5/5.webp",
      "/images/products/led-screens/lobby-information-led-screen-8-x-5/6.webp"
    ],
    "features": [
      "P1.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P1.9mm",
      "resolution": "1280 x 800",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 200,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "lobby-branding-led-display-8-x-4",
    "name": "Lobby Branding LED Display",
    "slug": "lobby-branding-led-display-8-x-4",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "compact"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P1.9mm",
      "size": "compact",
      "ip": "indoor"
    },
    "description": "8' x 4' (32 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "8' x 4' (32 sq ft)",
    "price": 1439,
    "originalPrice": 1599,
    "discount": 10,
    "image": "/images/products/led-screens/lobby-branding-led-display-8-x-4/main.webp",
    "images": [
      "/images/products/led-screens/lobby-branding-led-display-8-x-4/main.webp"
    ],
    "features": [
      "P1.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P1.9mm",
      "resolution": "1280 x 640",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 200,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "patient-waiting-area-display-8-x-4",
    "name": "Patient Waiting Area Display",
    "slug": "patient-waiting-area-display-8-x-4",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "compact"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P1.9mm",
      "size": "compact",
      "ip": "indoor"
    },
    "description": "8' x 4' (32 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "8' x 4' (32 sq ft)",
    "price": 1439,
    "originalPrice": 1649,
    "discount": 13,
    "image": "/images/products/led-screens/patient-waiting-area-display-8-x-4/main.webp",
    "images": [
      "/images/products/led-screens/patient-waiting-area-display-8-x-4/main.webp",
      "/images/products/led-screens/patient-waiting-area-display-8-x-4/1.webp"
    ],
    "features": [
      "P1.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P1.9mm",
      "resolution": "1280 x 640",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 200,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "small-worship-screen-8-x-4",
    "name": "Small Worship Screen",
    "slug": "small-worship-screen-8-x-4",
    "category": "led-screens",
    "tier": "basic",
    "tags": [
      "indoor",
      "compact"
    ],
    "filters": {
      "environment": "indoor",
      "pitch": "P1.9mm",
      "size": "compact",
      "ip": "indoor"
    },
    "description": "8' x 4' (32 sq ft) professional indoor LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.",
    "dimensions": "8' x 4' (32 sq ft)",
    "price": 1439,
    "originalPrice": 1599,
    "discount": 10,
    "image": "/images/products/led-screens/small-worship-screen-8-x-4/main.webp",
    "images": [
      "/images/products/led-screens/small-worship-screen-8-x-4/main.webp"
    ],
    "features": [
      "P1.9mm Pixel Pitch",
      "High-Brightness Indoor",
      "4K-Ready Processing",
      "Modular Setup"
    ],
    "specs": {
      "pixelPitch": "P1.9mm",
      "resolution": "1280 x 640",
      "brightness": "4500 nits",
      "refreshRate": "3840Hz",
      "viewingAngle": "160°",
      "lifespan": "100,000 hours"
    },
    "includes": [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support"
    ],
    "deliveryFee": 200,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "dj-setup-04",
    "name": "Pro DJ Setup 04",
    "slug": "dj-setup-04",
    "category": "dj-setups",
    "tier": "premium",
    "tags": [],
    "filters": {
      "console": "club",
      "size": "pro"
    },
    "description": "Professional dj setup available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "DJ Setup",
    "price": 1449,
    "originalPrice": 1669,
    "discount": 13,
    "image": "/images/products/dj-setups/dj-setup-04/main.webp",
    "images": [
      "/images/products/dj-setups/dj-setup-04/main.webp",
      "/images/products/dj-setups/dj-setup-04/1.webp",
      "/images/products/dj-setups/dj-setup-04/2.webp",
      "/images/products/dj-setups/dj-setup-04/3.webp",
      "/images/products/dj-setups/dj-setup-04/4.webp",
      "/images/products/dj-setups/dj-setup-04/5.webp",
      "/images/products/dj-setups/dj-setup-04/6.webp",
      "/images/products/dj-setups/dj-setup-04/7.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 175,
    "installationFee": 300,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "dj-setup-03",
    "name": "Pro DJ Setup 03",
    "slug": "dj-setup-03",
    "category": "dj-setups",
    "tier": "premium",
    "tags": [],
    "filters": {
      "console": "controller",
      "size": "pro"
    },
    "description": "Professional dj setup available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "DJ Setup",
    "price": 1399,
    "originalPrice": 1589,
    "discount": 12,
    "image": "/images/products/dj-setups/dj-setup-03/main.webp",
    "images": [
      "/images/products/dj-setups/dj-setup-03/main.webp",
      "/images/products/dj-setups/dj-setup-03/1.webp",
      "/images/products/dj-setups/dj-setup-03/2.webp",
      "/images/products/dj-setups/dj-setup-03/3.webp",
      "/images/products/dj-setups/dj-setup-03/4.webp",
      "/images/products/dj-setups/dj-setup-03/5.webp",
      "/images/products/dj-setups/dj-setup-03/6.webp",
      "/images/products/dj-setups/dj-setup-03/7.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 175,
    "installationFee": 275,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "dj-setup-02",
    "name": "Pro DJ Setup 02",
    "slug": "dj-setup-02",
    "category": "dj-setups",
    "tier": "basic",
    "tags": [],
    "filters": {
      "console": "controller",
      "size": "pro"
    },
    "description": "Professional dj setup available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "DJ Setup",
    "price": 1349,
    "originalPrice": 1519,
    "discount": 11,
    "image": "/images/products/dj-setups/dj-setup-02/main.webp",
    "images": [
      "/images/products/dj-setups/dj-setup-02/main.webp",
      "/images/products/dj-setups/dj-setup-02/1.webp",
      "/images/products/dj-setups/dj-setup-02/2.webp",
      "/images/products/dj-setups/dj-setup-02/3.webp",
      "/images/products/dj-setups/dj-setup-02/4.webp",
      "/images/products/dj-setups/dj-setup-02/5.webp",
      "/images/products/dj-setups/dj-setup-02/6.webp",
      "/images/products/dj-setups/dj-setup-02/7.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 150,
    "installationFee": 275,
    "rentalPeriod": "24h",
    "inStock": true,
    "featured": true
  },
  {
    "id": "dj-setup-01",
    "name": "Pro DJ Setup 01",
    "slug": "dj-setup-01",
    "category": "dj-setups",
    "tier": "basic",
    "tags": [],
    "filters": {
      "console": "controller",
      "size": "pro"
    },
    "description": "Professional dj setup available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "DJ Setup",
    "price": 1299,
    "originalPrice": 1439,
    "discount": 10,
    "image": "/images/products/dj-setups/dj-setup-01/main.webp",
    "images": [
      "/images/products/dj-setups/dj-setup-01/main.webp",
      "/images/products/dj-setups/dj-setup-01/1.webp",
      "/images/products/dj-setups/dj-setup-01/2.webp",
      "/images/products/dj-setups/dj-setup-01/3.webp",
      "/images/products/dj-setups/dj-setup-01/4.webp",
      "/images/products/dj-setups/dj-setup-01/5.webp",
      "/images/products/dj-setups/dj-setup-01/6.webp",
      "/images/products/dj-setups/dj-setup-01/7.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 150,
    "installationFee": 250,
    "rentalPeriod": "24h",
    "inStock": true,
    "featured": true
  },
  {
    "id": "lacoustics-syva-500-package",
    "name": "L-Acoustics Syva 500 Package",
    "slug": "lacoustics-syva-500-package",
    "category": "sound-systems",
    "tier": "premium",
    "tags": [],
    "filters": {
      "capacity": "500",
      "series": "Syva"
    },
    "description": "Professional sound system available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Sound System",
    "price": 3049,
    "originalPrice": 3499,
    "discount": 13,
    "image": "/images/products/sound-lighting/lacoustics-syva-500-package/main.webp",
    "images": [
      "/images/products/sound-lighting/lacoustics-syva-500-package/main.webp",
      "/images/products/sound-lighting/lacoustics-syva-500-package/1.webp",
      "/images/products/sound-lighting/lacoustics-syva-500-package/2.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 375,
    "installationFee": 600,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "lacoustics-a15-fest-1000-package",
    "name": "L-Acoustics A15 FEST-1000 Package",
    "slug": "lacoustics-a15-fest-1000-package",
    "category": "sound-systems",
    "tier": "premium",
    "tags": [],
    "filters": {
      "capacity": "1000",
      "series": "A15"
    },
    "description": "Professional sound system available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Sound System",
    "price": 2899,
    "originalPrice": 3219,
    "discount": 10,
    "image": "/images/products/sound-lighting/lacoustics-a15-fest-1000-package/main.webp",
    "images": [
      "/images/products/sound-lighting/lacoustics-a15-fest-1000-package/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 350,
    "installationFee": 575,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "lacoustics-syva-350-package",
    "name": "L-Acoustics Syva 350 Package",
    "slug": "lacoustics-syva-350-package",
    "category": "sound-systems",
    "tier": "premium",
    "tags": [],
    "filters": {
      "capacity": "350",
      "series": "Syva"
    },
    "description": "Professional sound system available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Sound System",
    "price": 2899,
    "originalPrice": 3219,
    "discount": 10,
    "image": "/images/products/sound-lighting/lacoustics-syva-350-package/main.webp",
    "images": [
      "/images/products/sound-lighting/lacoustics-syva-350-package/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 350,
    "installationFee": 575,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "lacoustics-just-syva-package",
    "name": "L-Acoustics JUSt Syva Package",
    "slug": "lacoustics-just-syva-package",
    "category": "sound-systems",
    "tier": "basic",
    "tags": [],
    "filters": {
      "capacity": "350",
      "series": "Syva"
    },
    "description": "Professional sound system available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Sound System",
    "price": 2799,
    "originalPrice": 3039,
    "discount": 8,
    "image": "/images/products/sound-lighting/lacoustics-just-syva-package/main.webp",
    "images": [
      "/images/products/sound-lighting/lacoustics-just-syva-package/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 325,
    "installationFee": 550,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "lacoustics-fest-2000-package",
    "name": "L-Acoustics Fest-2000 Package",
    "slug": "lacoustics-fest-2000-package",
    "category": "sound-systems",
    "tier": "basic",
    "tags": [],
    "filters": {
      "capacity": "2000+",
      "series": "Fest"
    },
    "description": "Professional sound system available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Sound System",
    "price": 2649,
    "originalPrice": 2979,
    "discount": 11,
    "image": "/images/products/sound-lighting/lacoustics-fest-2000-package/main.webp",
    "images": [
      "/images/products/sound-lighting/lacoustics-fest-2000-package/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 325,
    "installationFee": 525,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "lacoustics-a15-350-package",
    "name": "L-Acoustics A15 350 Package",
    "slug": "lacoustics-a15-350-package",
    "category": "sound-systems",
    "tier": "basic",
    "tags": [],
    "filters": {
      "capacity": "350",
      "series": "A15"
    },
    "description": "Professional sound system available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Sound System",
    "price": 2599,
    "originalPrice": 2889,
    "discount": 10,
    "image": "/images/products/sound-lighting/lacoustics-a15-350-package/main.webp",
    "images": [
      "/images/products/sound-lighting/lacoustics-a15-350-package/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 300,
    "installationFee": 525,
    "rentalPeriod": "24h",
    "inStock": true,
    "featured": true
  },
  {
    "id": "lacoustics-a15-1000-package",
    "name": "L-Acoustics A15 1000 Package",
    "slug": "lacoustics-a15-1000-package",
    "category": "sound-systems",
    "tier": "basic",
    "tags": [],
    "filters": {
      "capacity": "1000",
      "series": "A15"
    },
    "description": "Professional sound system available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Sound System",
    "price": 2549,
    "originalPrice": 2799,
    "discount": 9,
    "image": "/images/products/sound-lighting/lacoustics-a15-1000-package/main.webp",
    "images": [
      "/images/products/sound-lighting/lacoustics-a15-1000-package/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 300,
    "installationFee": 500,
    "rentalPeriod": "24h",
    "inStock": true,
    "featured": true
  },
  {
    "id": "lacoustics-a15-500-package",
    "name": "L-Acoustics A15 500 Package",
    "slug": "lacoustics-a15-500-package",
    "category": "sound-systems",
    "tier": "basic",
    "tags": [],
    "filters": {
      "capacity": "500",
      "series": "A15"
    },
    "description": "Professional sound system available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Sound System",
    "price": 2549,
    "originalPrice": 2799,
    "discount": 9,
    "image": "/images/products/sound-lighting/lacoustics-a15-500-package/main.webp",
    "images": [
      "/images/products/sound-lighting/lacoustics-a15-500-package/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 300,
    "installationFee": 500,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "light-package",
    "name": "Light Package",
    "slug": "light-package",
    "category": "lighting",
    "tier": "basic",
    "tags": [],
    "filters": {
      "type": "package"
    },
    "description": "Professional lighting package available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Lighting Package",
    "price": 1849,
    "originalPrice": 2129,
    "discount": 13,
    "image": "/images/products/sound-lighting/light-package/main.webp",
    "images": [
      "/images/products/sound-lighting/light-package/main.webp",
      "/images/products/sound-lighting/light-package/1.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 225,
    "installationFee": 375,
    "rentalPeriod": "24h",
    "inStock": true,
    "featured": true
  },
  {
    "id": "confidence-monitor",
    "name": "Confidence Monitor",
    "slug": "confidence-monitor",
    "category": "stage",
    "tier": "premium",
    "tags": [],
    "filters": {
      "type": "monitor",
      "scale": "large"
    },
    "description": "Professional stage package available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Stage Package",
    "price": 2349,
    "originalPrice": 2699,
    "discount": 13,
    "image": "/images/products/sound-lighting/confidence-monitor/main.webp",
    "images": [
      "/images/products/sound-lighting/confidence-monitor/main.webp",
      "/images/products/sound-lighting/confidence-monitor/1.webp",
      "/images/products/sound-lighting/confidence-monitor/2.webp",
      "/images/products/sound-lighting/confidence-monitor/3.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 275,
    "installationFee": 475,
    "rentalPeriod": "24h",
    "inStock": true,
    "featured": true
  },
  {
    "id": "package-2",
    "name": "Stage Package 2",
    "slug": "package-2",
    "category": "stage",
    "tier": "premium",
    "tags": [],
    "filters": {
      "type": "stage",
      "scale": "large"
    },
    "description": "Professional stage package available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Stage Package",
    "price": 2349,
    "originalPrice": 2699,
    "discount": 13,
    "image": "/images/products/stage/package-2/main.webp",
    "images": [
      "/images/products/stage/package-2/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 275,
    "installationFee": 475,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "package-1",
    "name": "Stage Package 1",
    "slug": "package-1",
    "category": "stage",
    "tier": "basic",
    "tags": [],
    "filters": {
      "type": "stage",
      "scale": "large"
    },
    "description": "Professional stage package available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Stage Package",
    "price": 2299,
    "originalPrice": 2609,
    "discount": 12,
    "image": "/images/products/stage/package-1/main.webp",
    "images": [
      "/images/products/stage/package-1/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 275,
    "installationFee": 450,
    "rentalPeriod": "24h",
    "inStock": true,
    "featured": true
  },
  {
    "id": "package-8",
    "name": "Stage Package 8",
    "slug": "package-8",
    "category": "stage",
    "tier": "basic",
    "tags": [],
    "filters": {
      "type": "stage",
      "scale": "medium"
    },
    "description": "Professional stage package available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Stage Package",
    "price": 2049,
    "originalPrice": 2359,
    "discount": 13,
    "image": "/images/products/stage/package-8/main.webp",
    "images": [
      "/images/products/stage/package-8/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 250,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "package-7",
    "name": "Stage Package 7",
    "slug": "package-7",
    "category": "stage",
    "tier": "basic",
    "tags": [],
    "filters": {
      "type": "stage",
      "scale": "medium"
    },
    "description": "Professional stage package available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Stage Package",
    "price": 1999,
    "originalPrice": 2269,
    "discount": 12,
    "image": "/images/products/stage/package-7/main.webp",
    "images": [
      "/images/products/stage/package-7/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 250,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  },
  {
    "id": "package-6",
    "name": "Stage Package 6",
    "slug": "package-6",
    "category": "stage",
    "tier": "basic",
    "tags": [],
    "filters": {
      "type": "stage",
      "scale": "medium"
    },
    "description": "Professional stage package available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.",
    "dimensions": "Stage Package",
    "price": 1949,
    "originalPrice": 2189,
    "discount": 11,
    "image": "/images/products/stage/package-6/main.webp",
    "images": [
      "/images/products/stage/package-6/main.webp"
    ],
    "features": [
      "Professional Grade",
      "Delivery & Setup Included",
      "On-Site Tech Support",
      "Event-Ready"
    ],
    "specs": {},
    "includes": [
      "Professional Equipment",
      "Delivery & Pickup",
      "On-Site Setup",
      "Technical Support"
    ],
    "deliveryFee": 225,
    "installationFee": 400,
    "rentalPeriod": "24h",
    "inStock": true
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductsByTier(category: ProductCategory, tier: "basic" | "premium"): Product[] {
  return products
    .filter((p) => p.category === category && p.tier === tier)
    .sort((a, b) => b.price - a.price)
}

/** Complementary products from OTHER categories — for "frequently ordered together". */
export function getComplementaryProducts(category: ProductCategory, limit = 8): Product[] {
  // sensible cross-sell pairings per category
  const pairings: Record<ProductCategory, ProductCategory[]> = {
    "led-screens": ["sound-systems", "stage", "lighting"],
    "dj-setups": ["sound-systems", "lighting", "led-screens"],
    "sound-systems": ["dj-setups", "stage", "lighting"],
    lighting: ["stage", "led-screens", "sound-systems"],
    stage: ["led-screens", "sound-systems", "lighting"],
  }
  const wanted = pairings[category] || []
  const picked: Product[] = []
  // round-robin one from each complementary category, featured/priciest first
  const buckets = wanted.map((c) =>
    products.filter((p) => p.category === c).sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.price - a.price)
  )
  let i = 0
  while (picked.length < limit && buckets.some((b) => b.length)) {
    const b = buckets[i % buckets.length]
    if (b.length) picked.push(b.shift() as Product)
    i++
  }
  return picked.slice(0, limit)
}

/** Map a rental service page slug (incl. city-suffixed variants) to a product category. */
export function getCategoryForServiceSlug(slug: string): ProductCategory | undefined {
  const match = CATEGORIES.find((c) => c.serviceSlug && slug.startsWith(c.serviceSlug))
  return match?.slug
}
