import Navbar from "@/components/navbar"
import SearchCards from "@/components/SearchCards"
import Testimonials from "@/components/testimonials"
import WhyLabiSend from "@/components/WhyLabiSend"
import FeaturesSection from "@/components/FeaturesSection"
import Newsletter from "@/components/Newsletter"
import HowItWorks from "@/components/HowItWorks"
import Footer from "@/components/Footer"
import Link from "next/link"
import { createClient } from "@/lib/supabase"

const destinations = [
  { 
    city: "Barcelona", 
    country: "Spain", 
    countryCode: "es",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600" 
  },
  { 
    city: "Paris", 
    country: "France", 
    countryCode: "fr",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600" 
  },
  { 
    city: "New York", 
    country: "United States", 
    countryCode: "us",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600" 
  },
  { 
    city: "Stuttgart", 
    country: "Germany", 
    countryCode: "de",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600" 
  },
]

export default async function HomePage() {
 
  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      
      {/* Hero Section */}
     <section id="home"
  className="relative h-[60vh] flex flex-col items-center justify-center px-6"
  style={{
    backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/final.png')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
      
        <Navbar />
  {/* Hero Content */}
  <div className="relative z-10 text-white text-center">
    <h1 className="text-6xl font-extrabold mb-4 leading-tight">
      Send Anything, <br />
      <span className="text-[#f5c842]">Anywhere.</span>
    </h1>
     <Link 
            href= "/become-traveller"
            className="mx-auto flex items-center gap-2 bg-[#fff6d6] text-[#2c4a1e] px-6 py-3 rounded-full font-bold text-sm hover:bg-yellow-400 transition-all"
          >
               Join our traveller network, start earning from your trip now  →
          </Link>
  </div>
</section>    {/* ← closing tag here */}

{/* Search Card - overlaps hero */}
<section className="relative z-10 px-6 -mt-16 bg-[#fff6d6]">
  <div className="max-w-4xl mx-auto">
    <SearchCards />
  </div>
</section>

   {/* Destinations Section */}
<section className="py-20 px-10 bg-[#fff6d6]">
  
  {/* Section Heading */}
  <div className="max-w-6xl mx-auto mb-14">
    <p className="text-4xl font-bold text-[#2c2c2c] leading-snug max-w-2xl">
      Let your package go through the{" "}
      <span className="text-[#2c4a1e] italic underline decoration-[#f5c842] decoration-4 underline-offset-4">
        hurdles of travel
      </span>{" "}
      while you{" "}
      <span className="bg-[#f5c842] px-2 rounded">stay at ease.</span>
    </p> 
        <div className="flex justify-center">
     <Link
    href="/trips"
    className="inline-flex items-center gap-2 bg-[#155a03] text-[#edf3f8] px-6 py-3 rounded-full font-bold text-sm hover:bg-green-500 transition-all"
    >
    All Destinations 
    <span>→</span>
    </Link>
   </div>
  </div>
   

  {/* Pinterest Style Grid */}
  <div className="max-w-6xl mx-auto columns-2 md:columns-4 gap-4 space-y-4">
    {destinations.map((dest, index) => (
      <div 
        key={dest.city} 
        className={`relative rounded-2xl overflow-hidden break-inside-avoid ${
          index % 2 === 0 ? "h-82" : "h-62"
        }`}
      >
        {/* Image */}
        <img
          src={dest.image} 
          alt={dest.city} 
          className="w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

        {/* City name */}
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-xl font-extrabold">{dest.city}</p>
          <div className="flex items-center gap-2 mt-1">
            {/* Flag */}
            <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white">
              <img 
                src={`https://flagcdn.com/w40/${dest.countryCode}.png`}
                alt={dest.country}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-bold text-gray-200">{dest.country}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
 
</section>
     <section>
      <div className="">
   <Testimonials />
  </div>
     </section>

  <section>
      <div className="">
      <WhyLabiSend/>
     </div>
     </section>

     <section>
      <div className="">
      <FeaturesSection/>
     </div>
     </section>

      <section>
      <div className="">
      <Newsletter/>
     </div>
     </section>

      <section>
      <div className="">
     <HowItWorks />
     </div>
     </section>

       <section>
      <div className="">
     <Footer/>
     </div>
     </section>

    </main>
  )
}

