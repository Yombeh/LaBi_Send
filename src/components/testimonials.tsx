"use client"

import { useEffect, useRef } from "react"

const testimonials = [
  {
    name: "Anna Fatou Sambou",
    role: "Electrical Engineer",
    company: "GAMTEL",
    image: "/Anna.jpeg",
    text: "LaBi_Send completely changed how I send things home. Fast, affordable and I always know my package is in safe hands. I will never go back to DHL!"
  },
  {
    name: "Hawa Quennala",
    role: "Software Engineer",
    company: "Obentas Global",
    image: "/HQueen.jpeg",
    text: "I was skeptical at first but after my first booking I was hooked. The traveler was professional and my package arrived in perfect condition."
  },
  {
    name: "Binta Bojang",
    role: "Business Owner",
    company: "Banjul Market",
    image: "/mamy.jpeg",
    text: "As a business owner I send products to customers abroad regularly. LaBi_Send has cut my shipping costs by more than half. Absolutely brilliant!"
  },
  {
    name: "Binta Njie",
    role: "Nurse",
    company: "NHS London",
    image: "/njies.jpeg",
    text: "Sending food and clothes back home used to be a nightmare. Now I just find a traveler on LaBi_Send and everything arrives safely. Love this platform!"
  },
  {
    name: "Muminatou Barrow",
    role: "Student",
    company: "University of Stuttgart",
    image: "mimi.jpeg",
    text: "Being a student abroad is tough but LaBi_Send makes it easy to receive things from home. The prices are unbeatable and the service is top notch."
  },
]

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollLeft = 0
        }
      }
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-[#264e05] overflow-hidden">
      
      {/* Heading */}
      <div className="text-center mb-12 px-10">
        <h2 className="text-3xl font-bold text-white mb-2">
          What our customers say
        </h2>
        <p className="text-green-300 text-sm">
          Real experiences from real people across the globe
        </p>
      </div>

      {/* Scrolling Cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-10 scrollbar-hide"
        style={{ scrollBehavior: "auto" }}
      >
        {[...testimonials, ...testimonials].map((t, index) => (
          <div
            key={index}
            className="min-w-[440px] bg-white rounded-2xl p-7 shadow-lg flex-shrink-0"

          >

            
            
            {/* Person */}
            <div className="flex items-center gap-4 mb-5">
              <img
                src={t.image}
                alt={t.name}
                className="w-30 h-30 rounded-full object-cover border-3 border-[#f5c842]"
              />
              <div>
                <p className="font-extrabold text-[#2c4a1e] text-sm">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
                <p className="text-xs font-semibold text-[#f5c842]">{t.company}</p>
              </div>
            </div>

            {/* Quote */}
            <p className="text-gray-700 text-sm leading-relaxed">
             &ldquo;{t.text}&rdquo;
            </p>
          </div>
          
          
        ))}
      </div>
      
         {/* CTA - ADD HERE */}
      <div className="text-center mt-12">
        <p className="text-green-300 text-sm mb-4">
          Join thousands of happy users already shipping smarter
        </p>
          <a
          href="/auth"
          className="inline-block px-8 py-3 bg-[#f5c842] text-[#2c4a1e] rounded-full font-bold text-sm hover:bg-yellow-400 transition-all"
      >
          Join LaBi_Send Today →
        </a>
      </div>
    </section>
  )
}