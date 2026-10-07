'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-white/85 text-lg">Last updated: May 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-white/90 leading-relaxed">
              By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Prime Line AV's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-3 text-white/90">
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Modify or copy the materials</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Use the materials for any commercial purpose or for any public display</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Attempt to decompile or reverse engineer any software contained on the website</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Remove any copyright or other proprietary notations from the materials</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Transfer the materials to another person or "mirror" the materials on any other server</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <p className="text-white/90 leading-relaxed">
              The materials on Prime Line AV's website are provided on an 'as is' basis. Prime Line AV makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
            <p className="text-white/90 leading-relaxed">
              In no event shall Prime Line AV or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Prime Line AV's website, even if Prime Line AV or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
            <p className="text-white/90 leading-relaxed">
              The materials appearing on Prime Line AV's website could include technical, typographical, or photographic errors. Prime Line AV does not warrant that any of the materials on its website are accurate, complete, or current. Prime Line AV may make changes to the materials contained on its website at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">6. Service Engagement</h2>
            <div className="space-y-4 text-white/90">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Quote Requests</h3>
                <p className="leading-relaxed">
                  All quote requests are subject to review and confirmation. A quote does not constitute an accepted offer and does not create a binding contract until mutually signed.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Payment Terms</h3>
                <p className="leading-relaxed">
                  Payment is typically required according to terms outlined in the service agreement or invoice. Late payments may incur additional fees as specified in the contract.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Cancellation Policy</h3>
                <p className="leading-relaxed">
                  Cancellations must be made in writing. Cancellation fees apply based on the timing of cancellation relative to the event date, as specified in the service agreement.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">7. Limitations of Liability</h2>
            <p className="text-white/90 leading-relaxed">
              In no case shall Prime Line AV, its directors, officers, or agents be liable to you for any indirect, special, incidental, or consequential damages arising out of or in connection with your use of the website or services, even if advised of the possibility of such damages.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">8. Intellectual Property Rights</h2>
            <p className="text-white/90 leading-relaxed">
              All materials on Prime Line AV's website, including text, graphics, logos, and images, are the property of Prime Line AV or its content suppliers and are protected by international copyright laws. Reproduction in any form without explicit permission is prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">9. User Conduct</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="space-y-3 text-white/90">
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Harass or cause distress or inconvenience to any person</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Transmit obscene or offensive content</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Disrupt the normal flow of dialogue within our website</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF2D6F] flex-shrink-0">•</span>
                <span>Attempt to gain unauthorized access to our systems</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">10. Modifications</h2>
            <p className="text-white/90 leading-relaxed">
              Prime Line AV may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">11. Indemnification</h2>
            <p className="text-white/90 leading-relaxed">
              You agree to indemnify and hold harmless Prime Line AV from and against any and all claims, liabilities, damages, losses, costs, and expenses including reasonable attorney's fees arising out of or related to your violation of these terms or your use of the website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
            <p className="text-white/90 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the State of Florida, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
            <p className="text-white/90 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
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
