 import { CheckCircle, Luggage, Package } from "lucide-react"
 import  Link from  "next/link"

const travelerSteps = [
  "Sign up and select Traveler as your role",
  "Wait for admin verification and approval",
  "Set up your profile with trip details",
  "List your trip and start earning",
]

const customerSteps = [
  "Sign up and select Customer as your role",
  "Search and find a traveler heading your way",
  "Book weight and arrange your package",
  "Track your package and receive it",
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-10 bg-[#2c4a1e]">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-white">
          How to use{" "}
          <span className="text-[#f5c842] italic">LaBi_Send?</span>
        </h2>
        <p className="text-green-300 text-sm mt-3">
          Getting started is simple — follow the steps below
        </p>
      </div>

      {/* Two Columns */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Traveler Column */}
        <div className="bg-white/10 rounded-3xl p-8">
          
          {/* Column Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#f5c842] flex items-center justify-center">
              <Luggage size={24} color="#2c4a1e" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              If you are a Traveler
            </h3>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-5">
            {travelerSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle size={22} color="#f5c842" className="shrink-0 mt-0.5" />
                <p className="text-green-100 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link href="/become-traveller" className="mt-8 w-full py-3 bg-[#f5c842] text-[#2c4a1e] rounded-full font-bold text-sm hover:bg-yellow-400 transition-all inline-block text-center">
            Join as Traveler →
          </Link>
        </div>

        {/* Customer Column */}
        <div className="bg-white/10 rounded-3xl p-8">
          
          {/* Column Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#f5c842] flex items-center justify-center">
              <Package size={24} color="#2c4a1e" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              If you are a Customer
            </h3>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-5">
            {customerSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle size={22} color="#f5c842" className="shrink-0 mt-0.5" />
                <p className="text-green-100 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link href="/trips" className="mt-8 w-full py-3 bg-[#f5c842] text-[#2c4a1e] rounded-full font-bold text-sm hover:bg-yellow-400 transition-all inline-block text-center">
            Start Sending →
          </Link>
        </div>

      </div>
    </section>
  )
}