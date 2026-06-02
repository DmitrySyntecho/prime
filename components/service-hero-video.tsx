"use client"

import { useEffect } from "react"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PHONE_TEL } from "@/lib/contact"

interface ServiceHeroVideoProps {
  title: string
  subtitle: string
  onStartQuote: () => void
}

export function ServiceHeroVideo({ title, subtitle, onStartQuote }: ServiceHeroVideoProps) {
  useEffect(() => {
    const container = document.getElementById("service-vidalytics-container")
    if (!container || container.hasChildNodes()) return

    // Create the embed div
    const embedDiv = document.createElement("div")
    embedDiv.id = "vidalytics_embed_M1gJkHNjodX8sVP6_service"
    embedDiv.style.cssText = "width: 100%; position: relative; padding-top: 56.25%;"
    container.appendChild(embedDiv)

    // Create and inject the Vidalytics script (same video as homepage)
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
      })(window, document, 'Vidalytics', 'vidalytics_embed_M1gJkHNjodX8sVP6_service', 'https://fast.vidalytics.com/embeds/o5ZPHiF7/M1gJkHNjodX8sVP6/');
    `
    container.appendChild(script)
  }, [])

  return (
    <section className="relative bg-[#0B1217] text-white py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/dji-0996.jpeg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1217]/90 via-[#0B1217]/80 to-[#7C2D5A]/85" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN - Text */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
              <span className="text-white" dangerouslySetInnerHTML={{ __html: title }} />
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-lg">{subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onStartQuote}
                className="bg-[#FF2D6F] hover:bg-[#FF2D6F]/90 text-[#0B1217] font-bold px-8 py-6 text-base rounded-lg"
              >
                Start Your Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a
                href={PHONE_TEL}
                suppressHydrationWarning
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Talk to Our Team
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - Video */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <div id="service-vidalytics-container" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
