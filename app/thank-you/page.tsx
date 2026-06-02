"use client"

import { useEffect } from "react"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { TrustedBySection } from "@/components/trusted-by-section"
import { CheckCircle2, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PHONE_TEL } from "@/lib/contact"

export default function ThankYouPage() {
  useEffect(() => {
    const container = document.getElementById("thankyou-vidalytics-container")
    if (!container || container.hasChildNodes()) return

    // Create the embed div
    const embedDiv = document.createElement("div")
    embedDiv.id = "vidalytics_embed_thankyou"
    embedDiv.style.cssText = "width: 100%; position: relative; padding-top: 56.25%;"
    container.appendChild(embedDiv)

    // Create and inject the Vidalytics script
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.innerHTML = `
      (function (v, i, d, a, l, y, t, c, s) {
        y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}
        var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
        if (!vsl){vsl=function(u,cb){
          if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
          if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}
          else{s.onload=function(){vlf=1;cb();};}
          i.getElementsByTagName("head")[0].appendChild(s);
        };}
        vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
      })(window, document, 'Vidalytics', 'vidalytics_embed_thankyou', 'https://fast.vidalytics.com/embeds/o5ZPHiF7/M1gJkHNjodX8sVP6/');
    `
    container.appendChild(script)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="relative bg-[#0B1217] text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/dji-0996.jpeg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1217]/90 via-[#0B1217]/80 to-[#14532D]/85" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN - Text */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-md px-4 py-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-medium">Quote Request Received</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
                <span className="text-white">Thank You!</span>
                <br />
                <span className="text-[#4ADE80]">We're On It.</span>
              </h1>

              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                Our team has received your quote request and will be in touch within 24 hours. In the meantime, watch
                this video to learn more about how we work.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                <h3 className="text-white font-bold mb-4">What Happens Next?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#4ADE80] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#0B1217] text-sm font-bold">1</span>
                    </div>
                    <span className="text-gray-300">Our team reviews your project requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#4ADE80] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#0B1217] text-sm font-bold">2</span>
                    </div>
                    <span className="text-gray-300">We prepare a customized proposal for your event</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#4ADE80] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#0B1217] text-sm font-bold">3</span>
                    </div>
                    <span className="text-gray-300">A specialist contacts you to discuss details</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4ADE80] text-[#0B1217] font-semibold rounded-lg hover:bg-[#3ab8c9] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN - Video */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <div id="thankyou-vidalytics-container" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* Client Testimonials */}
      <TestimonialsCarousel />

      {/* Explore More Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">While You Wait, Explore Our Work</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out some of our recent projects and see what we can do for your event.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/portfolio"
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#4ADE80] hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#4ADE80] transition-colors">
                View Portfolio
              </h3>
              <p className="text-gray-600 text-sm mb-4">See our past events and productions</p>
              <span className="inline-flex items-center gap-2 text-[#4ADE80] font-medium text-sm">
                Explore
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              href="/services/full-av-production"
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#4ADE80] hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#4ADE80] transition-colors">
                Our Services
              </h3>
              <p className="text-gray-600 text-sm mb-4">Learn about our full range of AV services</p>
              <span className="inline-flex items-center gap-2 text-[#4ADE80] font-medium text-sm">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              href="/about"
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#4ADE80] hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#4ADE80] transition-colors">
                About Us
              </h3>
              <p className="text-gray-600 text-sm mb-4">Meet the team behind the productions</p>
              <span className="inline-flex items-center gap-2 text-[#4ADE80] font-medium text-sm">
                Meet Us
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      </div>
  )
}
