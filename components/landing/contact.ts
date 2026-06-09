/**
 * Contact details for the A/B landing pages.
 *
 * The Call CTA uses the dedicated landing number from the brief: (888) 508-5001.
 * WhatsApp reuses Prime Line's WhatsApp Business number with a pre-filled message
 * (the brief didn't give a separate WhatsApp line).
 */
export const LANDING_PHONE_DISPLAY = "(888) 508-5001"
export const LANDING_PHONE_TEL = "+18885085001"

// Prime Line's WhatsApp Business number (digits only, with country code).
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "15612202555"

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Prime Line! I'm planning an event and would like a custom AV quote."

export const WHATSAPP_VENUE_MESSAGE =
  "Hi Prime Line! I just requested a quote. Here are some photos/videos of my venue to help build the 3D render:"
