import type React from "react"
import type { Metadata, Viewport } from "next"

import Script from "next/script"
import "./globals.css"

import { Manrope, JetBrains_Mono } from "next/font/google"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { CartProvider } from "@/lib/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundFX } from "@/components/background-fx"
import { GlobalCTA } from "@/components/global-cta"
import { CTMScanner } from "@/components/ctm-scanner"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#03070a",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://primelineav.com"),
  title: "Prime Line AV | When Everything Is Just Perfect",
  description:
    "The AV partner brands trust for corporate events, brand activations, experiential marketing, and studio work. Full-service audio, video, lighting, and staging production.",
  generator: "v0.app",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    siteName: "Prime Line AV",
    title: "Prime Line AV | When Everything Is Just Perfect",
    description:
      "Full AV production for corporate events, brand activations, experiential marketing, and studio work.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Prime Line AV — Full-service audio, video, lighting & staging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Line AV | When Everything Is Just Perfect",
    description:
      "Full AV production for corporate events, brand activations, experiential marketing, and studio work.",
    images: ["/og-image.webp"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="gtm" strategy="beforeInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}</Script>
        )}
      </head>
      <body className="font-sans antialiased text-[#e6f4ee]">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`} height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
        )}
        <BackgroundFX />
        <div className="page-content">
          <LanguageProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <GlobalCTA />
              <CTMScanner />
            </CartProvider>
          </LanguageProvider>
        </div>
      </body>
    </html>
  )
}
