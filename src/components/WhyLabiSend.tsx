 import { Wallet, PackageOpen, MapPin, ShieldCheck } from "lucide-react"
import Link from "next/link"

const cards = [
  {
    icon: Wallet,
    title: "Extra Income for Travelers",
    description: "Monetize your travel by carrying packages for others.",
    color: "#2c4a1e",
    link: "/about/travelers"
  },
  {
    icon: PackageOpen,
    title: "Effortless Sending",
    description: "No need to travel yourself. Find a trusted traveler heading your way.",
    color: "#2c4a1e",
    link: "/about/customers"
  },
  {
    icon: MapPin,
    title: "Real-Time Package Tracking",
    description: "Know exactly where your package is at all times.",
    color: "#2c4a1e",
    link: "/about/tracking"
  },
  {
    icon: ShieldCheck,
    title: "Safety Travel Guide",
    description: "We keep travelers safe and compliant.",
    color: "#2c4a1e",
    link: "/about/safety"
  },
]

export default function WhyLabiSend() {
  return (
    <section className="py-24 px-10 bg-[#fdfaf7]">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-[#2c4a1e]">
          Why <span className="text-[#f5c842] italic">LaBi_Send?</span>
        </h2>
        <p className="text-[#2c4a1e] mt-3 text-sm max-w-xl mx-auto">
          We are redefining how packages move across borders — trusted, affordable and community driven.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
       {cards.map((card) => {
  const Icon = card.icon
  return (
    <div
      key={card.title}
      className="bg-amber-300 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center gap-4"
    >
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mt-4"
        style={{ backgroundColor: card.color + "15" }}
      >
        <Icon size={40} color={card.color} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-base font-extrabold text-[#2c2c2c] mt-2">
        {card.title}
      </h3>

      {/* Description */}
      <p className=" text-blue-50 text-sm leading-relaxed flex-1">
        {card.description}
      </p>

      {/* Read More */}
      <Link
        href={card.link}
        className="text-[#2c4a1e] text-sm font-semibold hover:text-[#f5c842] transition-colors mt-2 mb-4"
      >
        Read more →
      </Link>
           </div>
  )
})}
      </div>
    </section>
  )
}