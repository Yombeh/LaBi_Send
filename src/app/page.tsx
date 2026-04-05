import Navbar from "@/components/navbar"
import SearchCards from "@/components/SearchCards"
import Testimonials from "@/components/testimonials"
import WhyLabiSend from "@/components/WhyLabiSend"
import FeaturesSection from "@/components/FeaturesSection"
import Newsletter from "@/components/Newsletter"
import HowItWorks from "@/components/HowItWorks"
import Footer from "@/components/Footer"
import Link from "next/link"


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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      
      {/* Hero Section */}
      <section id="home"
        className="relative h-screen flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: "url('/gemPlane.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <Navbar />

        {/* Hero Content */}
               <div className="relative z-10 text-white w-full max-w-6xl mx-auto flex items-center justify-between gap-10">
  
                 {/* Left - Text */}
                  <div className="flex-1">
                    <h1 className="text-6xl font-extrabold mb-4 leading-tight">
                       Send Anything, <br />
                           <span className="text-[#f5c842]">Anywhere.</span>
                      </h1>
                          <p className="text-lg mb-6 text-gray-200 max-w-xl">
                               Connect with travelers heading your way and send packages across borders — fast, affordable, and trusted.
                            </p>
                                 <Link href ="/become-traveller" className="mx-auto items-center gap-2 bg-[#f5c842] text-[#2c4a1e] px-6 py-3 rounded-full font-bold text-sm hover:bg-yellow-400 transition-all">
                                
                                    Become Traveller
                                   
                                    <span>→</span>
                                  </Link>
                                          </div>

   {/* Right - Search Card */}
  <div className="w-[480px] shrink-0">
    <SearchCards />
  </div>

</div></section>

   {/* Destinations Section */}
<section className="py-20 px-10 bg-[#fdfaf7]">
  
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
            <button className=" block mx-auto items-center gap-2 bg-[#155a03] text-[#edf3f8] px-6 py-3 rounded-full font-bold text-sm hover:bg-green-500 transition-all">
                                     All Destinations 
            <span>→</span>
            </button>
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

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

