 import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import { Heart, Globe, Shield, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="bg-[#2c4a1e] py-24 px-10 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Born from a need. <br />
            <span className="text-[#f5c842] italic">Built for a continent.</span>
          </h1>
          <p className="text-green-200 text-lg leading-relaxed max-w-2xl mx-auto">
            LaBi_Send did not start in a boardroom. It started with a Gambian 
            student in Spain, missing home food and realizing that the solution 
            already existed — it just had no structure behind it.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 px-10">
        <div className="max-w-6xl mx-auto flex items-center gap-16">
          
          {/* Founder Image */}
          <div className="shrink-0">
            <div className="w-80 h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#f5c842]">
              <img
                src="/Founder.jpeg"
                alt="Hawa Cham - Founder of LaBi_Send"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-extrabold text-[#2c4a1e] text-lg">Hawa Cham</p>
              <p className="text-[#f5c842] text-sm font-semibold">Founder & Project Lead</p>
            </div>
          </div>

          {/* Story Text */}
          <div className="flex-1">
            <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
              The Founder&apos;s Story
            </p>
            <h2 className="text-4xl font-extrabold text-[#2c4a1e] leading-tight mb-6">
              A semester abroad changed everything.
            </h2>
            <div className="flex flex-col gap-5 text-gray-500 text-sm leading-relaxed">
              <p>
                During my semester abroad in Spain, I found myself desperately missing 
                the tastes and comforts of home. I wanted to send and receive packages 
                from The Gambia but quickly realized how difficult, slow, and expensive 
                the existing options were for someone in my position.
              </p>
              <p>
                I knew the informal system existed — people had been sending packages 
                through travelers for generations. But it ran entirely on word of mouth. 
                If you did not know the right people, you were stuck. There was no 
                platform, no verification, no tracking, and no accountability.
              </p>
              <p>
                And it was not just me. My colleagues on the same journey felt exactly 
                the same way. We all had family back home, things we wanted to send and 
                receive — and no reliable way to do it.
              </p>
              <p>
                That moment planted the seed for LaBi_Send. Not just an app — but a 
                system that West Africa has always deserved. One that leverages the 
                movement of our own people to serve our own communities.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-10 bg-[#2c4a1e] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
            The Problem
          </p>
          <h2 className="text-4xl font-extrabold leading-tight mb-6">
            The solution existed. <br />
            <span className="text-[#f5c842] italic">The system did not.</span>
          </h2>
          <p className="text-green-200 text-lg leading-relaxed mb-16">
            Every day, thousands of travelers cross West African borders with spare 
            luggage capacity going to waste — while millions of people struggle to 
            find a secure, accessible way to send packages across those same borders.
          </p>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Poor Accessibility",
                description: "Traditional courier services are not easily accessible across most of West Africa — leaving millions with no reliable option."
              },
              {
                title: "No Security or Trust",
                description: "The informal system operates with zero accountability. No verification, no tracking, and no recourse if something goes wrong."
              },
              {
                title: "Daily Missed Opportunity",
                description: "Thousands of travelers cross borders daily with spare luggage going to waste while people who need to send packages have no way to reach them."
              }
            ].map((problem) => (
              <div key={problem.title} className="bg-white/10 rounded-2xl p-6 text-left">
                <h3 className="text-[#f5c842] font-extrabold text-lg mb-3">{problem.title}</h3>
                <p className="text-green-200 text-sm leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
              Our Mission
            </p>
            <h2 className="text-4xl font-extrabold text-[#2c4a1e] leading-tight">
              What drives us every day
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Globe,
                title: "Accessibility",
                description: "Making cross-border package delivery accessible to every West African regardless of their connections or location."
              },
              {
                icon: Shield,
                title: "Security",
                description: "Building trust through verified travelers, real-time tracking, and a safety guide that protects everyone involved."
              },
              {
                icon: Users,
                title: "Community",
                description: "Leveraging the power of our own people and their daily movements to serve our own communities."
              },
              {
                icon: Heart,
                title: "Impact",
                description: "Creating real economic opportunity for travelers while solving a real problem for millions of senders across Africa."
              }
            ].map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="bg-white rounded-2xl p-6 shadow-md text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#2c4a1e15] flex items-center justify-center">
                    <Icon size={32} color="#2c4a1e" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-extrabold text-[#2c4a1e]">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-10 bg-[#f5f0e8] text-center">
        <h2 className="text-4xl font-extrabold text-[#2c4a1e] mb-4">
          Be part of the movement.
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto">
          Whether you are a traveler looking to earn or a sender looking for ease — 
          LaBi_Send was built for you.
        </p>
        <a
          href="/auth"
          className="inline-block px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm hover:bg-green-800 transition-all"
        >
          Join LaBi_Send Today →
        </a>
      </section>

      <Footer />
    </main>
  )
}