 "use client"

import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-24 px-10 bg-[#fdfaf7]">
      <div className="max-w-6xl mx-auto flex items-center gap-16">

        {/* Left - Image */}
        <div className="flex-1 h-[550px] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/Newletterimg.png"
            alt="Newsletter"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Text & Form */}
        <div className="flex-1">
          
          {/* Tag */}
          <span className="text-xs font-bold text-[#f5c842] uppercase tracking-widest bg-[#2c4a1e] px-4 py-2 rounded-full">
            Join the Community
          </span>

          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-[#2c2c2c] leading-tight mt-6 mb-4">
            Don&apos;t miss out. <br />
            <span className="text-[#2c4a1e]">Thousands are already</span> <br />
            <span className="text-[#f5c842] italic">shipping smarter.</span>
          </h2>

          {/* Subtext */}
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
            Be part of a movement changing how Africa ships across borders. 
           
          </p>

          {/* Features */}
          <div className="flex flex-col gap-3 mb-8">
            {[
              "✦ Exclusive shipping deals & discounts",
              "✦ New traveler route announcements",
              "✦ Community stories & shipping tips",
            ].map((item) => (
              <p key={item} className="text-sm text-[#2c4a1e] font-semibold">
                {item}
              </p>
            ))}
          </div>

          {/* Email Input */}
          {!submitted ? (
            <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 max-w-md border border-[#e8ddd0]">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-600 bg-transparent px-2"
              />
              <button
                onClick={handleSubmit}
                className="bg-[#2c4a1e] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-green-800 transition-all"
              >
                Subscribe
              </button>
            </div>
          ) : (
            <div className="bg-[#2c4a1e] text-white px-6 py-4 rounded-2xl max-w-md text-sm font-semibold">
              🎉 Welcome to the community! We&apos;ll be in touch soon.
            </div>
          )}

          <p className="text-xs text-gray-400 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>

        </div>
      </div>
    </section>
  )
}