import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import { Plane, ShoppingBag, Map, Check, Rocket } from "lucide-react"

export default function FuturePage() {
  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="bg-[#2c4a1e] py-20 px-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
            What comes next
          </p>
          <h1 className="text-5xl font-extrabold mb-4">
            The Future of <span className="text-[#f5c842] italic">LaBi_Send</span>
          </h1>
          <p className="text-green-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Three expansions that will transform how Africa sends, sells, and
            moves across borders.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 - Airline Partnership */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-1.5 bg-[#1D9E75]"></div>
            <div className="p-8 flex flex-col gap-5 flex-1">

              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#E1F5EE] flex items-center justify-center">
                  <Plane size={24} color="#0F6E56" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0F6E56] bg-[#E1F5EE] px-3 py-1 rounded-full">
                  Phase 1
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#2c2c2c] mb-3 leading-snug">
                  Airline Partnership & Flight Verification
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Direct integration with airlines to automatically verify
                  traveler flight tickets, track live flight status, and confirm
                  departure and arrival — no longer relying on the traveler&apos;s
                  own device or manual uploads.
                </p>
              </div>

              <div className="mt-auto pt-5 border-t border-gray-100 flex flex-col gap-3">
                {[
                  "Automated ticket verification",
                  "Live flight tracking",
                  "Airline API integration",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E1F5EE] flex items-center justify-center shrink-0">
                      <Check size={12} color="#1D9E75" />
                    </div>
                    <span className="text-sm text-gray-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 - Marketplace (Featured) */}
          <div className="bg-white rounded-3xl shadow-lg border-2 border-[#378ADD] overflow-hidden flex flex-col relative">
            <div className="h-1.5 bg-[#378ADD]"></div>

            {/* Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1">
              <span className="bg-[#E6F1FB] text-[#185FA5] text-xs font-bold px-4 py-1.5 rounded-full border border-[#B5D4F4] whitespace-nowrap">
                Flagship Expansion
              </span>
            </div>

            <div className="p-8 pt-10 flex flex-col gap-5 flex-1">

              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F1FB] flex items-center justify-center">
                  <ShoppingBag size={24} color="#185FA5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#185FA5] bg-[#E6F1FB] px-3 py-1 rounded-full">
                  Phase 2
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#2c2c2c] mb-3 leading-snug">
                  LaBi_Send Marketplace for Small Businesses
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  A dedicated platform where small business owners across West
                  Africa can list and sell their products online. LaBi_Send
                  handles the entire logistics — connecting sellers to travelers
                  heading to the buyer&apos;s destination, making cross-border
                  e-commerce truly accessible.
                </p>
              </div>

              <div className="mt-auto pt-5 border-t border-gray-100 flex flex-col gap-3">
                {[
                  "Product storefront for sellers",
                  "Traveler-powered delivery",
                  "Cross-border e-commerce",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E6F1FB] flex items-center justify-center shrink-0">
                      <Check size={12} color="#378ADD" />
                    </div>
                    <span className="text-sm text-gray-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3 - Africa Version */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-1.5 bg-[#BA7517]"></div>
            <div className="p-8 flex flex-col gap-5 flex-1">

              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FAEEDA] flex items-center justify-center">
                  <Map size={24} color="#854F0B" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#854F0B] bg-[#FAEEDA] px-3 py-1 rounded-full">
                  Phase 3
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#2c2c2c] mb-3 leading-snug">
                  LaBi_Send Africa — Intra-Continental Version
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  A version built specifically for movement within Africa —
                  buses, shared taxis, motorcycles, and all forms of land
                  transport crossing our borders daily. Affordable,
                  community-driven delivery designed for the African road, not
                  the European sky.
                </p>
              </div>

              <div className="mt-auto pt-5 border-t border-gray-100 flex flex-col gap-3">
                {[
                  "Land & road transport focus",
                  "All African border crossings",
                  "Ultra-affordable micro-delivery",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FAEEDA] flex items-center justify-center shrink-0">
                      <Check size={12} color="#BA7517" />
                    </div>
                    <span className="text-sm text-gray-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-[#2c4a1e] rounded-3xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#f5c842] flex items-center justify-center shrink-0">
              <Rocket size={28} color="#2c4a1e" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-lg mb-1">
                This is only the beginning.
              </h3>
              <p className="text-green-200 text-sm leading-relaxed max-w-3xl">
                LaBi_Send is not just an app — it is the infrastructure that
                cross-border communities in West Africa have always deserved.
                Built in The Gambia, designed for a continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}