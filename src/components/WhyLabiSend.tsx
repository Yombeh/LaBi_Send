"use client"

import { Wallet, PackageOpen, MapPin, ShieldCheck, LucideIcon } from "lucide-react"

type CardType = {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

const cards: CardType[] = [
  {
    icon: Wallet,
    title: "Extra Income for Travelers",
    description:
      "Earn money by carrying packages for others while you travel. Turn every trip into an opportunity.",
    color: "#2c4a1e",
  },
  {
    icon: PackageOpen,
    title: "Effortless Sending",
    description:
      "Send packages without traveling. Connect with verified travelers heading your way.",
    color: "#2c4a1e",
  },
  {
    icon: MapPin,
    title: "Real-Time Package Tracking",
    description:
      "Stay informed with live updates and know exactly where your package is at any moment.",
    color: "#2c4a1e",
  },
  {
    icon: ShieldCheck,
    title: "Safety Travel Guide",
    description:
      "Follow clear safety guidelines to ensure secure and compliant package delivery.",
    color: "#2c4a1e",
  },
]

export default function WhyLabiSend() {
  return (
    <section className="py-24 px-6 md:px-10 bg-[#fdfaf7]">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-[#2c4a1e]">
          Why <span className="text-[#f5c842] italic">LaBi_Send?</span>
        </h2>
        <p className="text-[#2c4a1e] mt-3 text-sm max-w-xl mx-auto">
          We are redefining how packages move across borders — trusted,
          affordable and community driven.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {cards.map((card) => {
          const Icon = card.icon

          return (
            <div key={card.title} className="perspective group">
              
              <div className="relative w-full h-64 transition-transform duration-500 transform-style group-hover:rotate-y-180">
                
                {/* FRONT */}
                <div className="absolute inset-0 bg-amber-300 rounded-2xl p-6 shadow-md flex flex-col items-center justify-center text-center backface-hidden">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: card.color + "15" }}
                  >
                    <Icon size={40} color={card.color} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-base font-extrabold text-[#2c2c2c]">
                    {card.title}
                  </h3>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 bg-[#2c4a1e] text-white rounded-2xl p-6 shadow-md flex items-center justify-center text-center backface-hidden rotate-y-180">
                  <p className="text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}