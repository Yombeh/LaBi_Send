 import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import { AlertTriangle, XCircle, AlertCircle, CheckCircle, ShieldCheck } from "lucide-react"

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="bg-[#7b1a1a] py-20 px-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
              <ShieldCheck size={40} color="#f5c842" />
            </div>
          </div>
          <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
            Traveler Safety Guide
          </p>
          <h1 className="text-5xl font-extrabold mb-4">
            Know Before You <span className="text-[#f5c842] italic">Carry.</span>
          </h1>
          <p className="text-red-200 text-lg leading-relaxed">
            As a LaBi_Send traveler you are responsible for everything in your luggage 
            at border control. Read this guide carefully before accepting any package. 
            Your safety and freedom depend on it.
          </p>
        </div>
      </section>

      {/* Warning Banner */}
      <div className="bg-[#f5c842] py-4 px-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <AlertTriangle size={20} color="#7b1a1a" />
          <p className="text-[#7b1a1a] text-sm font-bold">
            You have the right to inspect and refuse any package before accepting it. 
            If something feels wrong — trust your instincts and decline.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 px-10 max-w-5xl mx-auto">

        {/* Prohibited Items */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle size={24} color="#7b1a1a" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#7b1a1a]">
                Absolutely Prohibited
              </h2>
              <p className="text-gray-400 text-sm">
                Never carry these under any circumstances
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Illegal Drugs",
                description: "Any form of narcotics, cannabis, cocaine, heroin, or any controlled substance not prescribed by a licensed doctor. Drug trafficking carries severe criminal penalties including imprisonment in both Gambia and European countries."
              },
              {
                title: "Weapons & Firearms",
                description: "Guns, ammunition, knives beyond permitted blade lengths, tasers, and any other weapon. Carrying weapons across international borders without proper licensing is a serious criminal offense."
              },
              {
                title: "Counterfeit Goods",
                description: "Fake currency, counterfeit branded products, or forged documents of any kind. Customs officials are trained to detect these and confiscation and arrest will follow."
              },
              {
                title: "Explosive Materials",
                description: "Fireworks, flammable materials, gases, and any substance classified as dangerous goods by airline regulations. These are strictly forbidden in both carry-on and checked luggage."
              },
              {
                title: "Endangered Animal Products",
                description: "Ivory, certain animal skins, live animals without proper documentation, and products derived from protected species. These violate international wildlife protection laws."
              },
              {
                title: "Child Exploitation Material",
                description: "Any material that exploits or endangers children in any form. This carries the most severe criminal penalties in every jurisdiction worldwide."
              }
            ].map((item) => (
              <div key={item.title} className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <XCircle size={18} color="#7b1a1a" className="shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-extrabold text-[#7b1a1a] mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restricted Items */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertCircle size={24} color="#b8860b" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#b8860b]">
                Restricted Items
              </h2>
              <p className="text-gray-400 text-sm">
                These require special documentation or have strict limits
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Large Amounts of Cash",
                description: "Carrying more than €10,000 (or equivalent) into the EU must be declared at customs. Failure to declare can result in confiscation and fines."
              },
              {
                title: "Prescription Medications",
                description: "If carrying medication for a customer, ensure it comes with a valid doctor's prescription and is within permitted quantities. Some medications legal in Gambia may be controlled in Europe."
              },
              {
                title: "Food & Agricultural Products",
                description: "Certain fresh foods, meats, and agricultural products are restricted when entering the EU. Sealed and commercially packaged items are generally permitted within limits."
              },
              {
                title: "Commercial Quantities of Goods",
                description: "Items in quantities suggesting commercial resale may attract customs duties. Always be aware of the duty-free limits of your destination country."
              }
            ].map((item) => (
              <div key={item.title} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} color="#b8860b" className="shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-extrabold text-[#b8860b] mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safe Items */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={24} color="#2c4a1e" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#2c4a1e]">
                Generally Safe to Carry
              </h2>
              <p className="text-gray-400 text-sm">
                These items are typically permitted across borders
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Personal clothing and shoes",
              "Sealed food items within permitted limits",
              "Personal electronics and accessories",
              "Documents, letters and cards",
              "Books and educational materials",
              "Cosmetics and personal care products",
              "Household items and kitchenware",
              "Children's toys and games",
              "Fabric and textiles for personal use"
            ].map((item) => (
              <div key={item} className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle size={16} color="#2c4a1e" className="shrink-0" />
                <p className="text-gray-600 text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

       {/* Traveler Checklist */}
        <div className="bg-[#2c4a1e] rounded-3xl p-10 text-white">
          <h2 className="text-2xl font-extrabold mb-2">
            Before You Accept a Package ✓
          </h2>
          <p className="text-green-300 text-sm mb-8">
            Go through this checklist every time before accepting a booking
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "I have physically inspected the contents of the package",
              "The package does not contain any prohibited items",
              "I am satisfied with what the customer has told me is inside",
              "The package is properly sealed and labelled",
              "I have taken photos of the package before accepting",
              "I understand I am legally responsible for my luggage at customs",
              "I have read and understood the LaBi_Send safety guide",
              "I feel comfortable and safe carrying this package"
            ].map((check, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                <CheckCircle size={18} color="#f5c842" className="shrink-0 mt-0.5" />
                <p className="text-green-100 text-sm leading-relaxed">{check}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* CTA */}
      <section className="py-20 px-10 bg-[#f5f0e8] text-center">
        <h2 className="text-3xl font-extrabold text-[#2c4a1e] mb-4">
          Your safety is our priority.
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          If you ever feel unsafe or unsure about a package — report it immediately. 
          We are always here to help.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/contact"
            className="px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm hover:bg-green-800 transition-all"
          >
            Report a Concern →
          </a>
         <a 
            href="/faq"
            className="px-8 py-3 border-2 border-[#2c4a1e] text-[#2c4a1e] rounded-full font-bold text-sm hover:bg-[#2c4a1e] hover:text-white transition-all"
          >
            View FAQ
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}