'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#03070a] text-white">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/85 text-lg">Last updated: May 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-white/90 leading-relaxed">
              Prime Line AV ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, and interact with us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <div className="space-y-4 text-white/90">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                <p className="leading-relaxed">
                  We may collect personal information such as your name, email address, phone number, company name, and project details when you submit a quote request, contact form, or engage with our services.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Technical Information</h3>
                <p className="leading-relaxed">
                  We automatically collect technical information including your IP address, browser type, operating system, pages visited, and time spent on our website through cookies and similar tracking technologies.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Payment Information</h3>
                <p className="leading-relaxed">
                  When processing payments, we collect billing information. Payment processing is handled by third-party payment processors who comply with PCI-DSS standards.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-3 text-white/90">
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>To process and fulfill quote requests and service orders</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>To communicate with you about your projects and services</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>To send promotional emails and updates (with your consent)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>To improve our website, services, and user experience</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>To comply with legal obligations and prevent fraud</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">4. Sharing Your Information</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="space-y-3 text-white/90">
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Service providers who assist us in operating our website and conducting our business</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Legal authorities when required by law or to protect our rights</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Business partners or vendors with your consent</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">5. Security</h2>
            <p className="text-white/90 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="space-y-3 text-white/90">
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Access and review your personal information</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Request correction of inaccurate data</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Request deletion of your information</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Opt-out of marketing communications</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
            <p className="text-white/90 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">8. Third-Party Links</h2>
            <p className="text-white/90 leading-relaxed">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices of external websites. We encourage you to review their privacy policies before providing personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
            <p className="text-white/90 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website and updating the "Last updated" date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <p className="text-white/90 leading-relaxed">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white font-semibold">Prime Line AV</p>
              <p className="text-white/90">Email: info@primelineav.com</p>
              <p className="text-white/90">Fort Lauderdale, FL 33312</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
