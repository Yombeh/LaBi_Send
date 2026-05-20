import { MapPin, Banknote } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="py-24 px-10 bg-white">
      <div className="max-w-6xl mx-auto flex items-center gap-16">

        {/* Left - Text Content */}
        <div className="flex-1">
          
          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-[#2c2c2c] leading-tight mb-10">
           Find the Traveller&apos;s Location <br />
            <span className="text-[#2c4a1e]">& Make</span>{" "}
            <span className="text-[#f5c842] italic">Payments.</span>
          </h2>

          {/* Feature 1 */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#2c4a1e] flex items-center justify-center shrink-0">
              <MapPin size={28} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#2c2c2c] mb-1">
                Find the Traveller&apos;s Location
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Track your package in real time via Google Maps. Know exactly where your traveller is and when your package will arrive.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#f5c842] flex items-center justify-center shrink-0">
              <Banknote size={28} color="#2c4a1e" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#2c2c2c] mb-1">
                Make Payments via Wave through HexAi
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pay seamlessly on wave through HexAi payment gateway. Flexible, simple and secure.
              </p>
            </div>
          </div>
        </div>

       {/* Right - Overlapping Photos */}
<div className="flex-1 relative h-[480px]">
  
  {/* Back photo */}
  <div className="absolute top-0 right-0 w-64 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
    <img
      src="/mapforlabi.jpg"
      alt="Feature 1"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Middle photo */}
  <div className="absolute top-16 right-16 w-64 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
    <img
     src="/wave.webp"
      alt="Feature 2"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Front photo */}
  <div className="absolute bottom-0 left-0 w-64 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20">
    <img
      
       src="/HexAi.jpeg"
      alt="Feature 3"
      className="w-full h-full object-cover"
    />
  </div>



</div>

        

      </div>
      
    </section>

    
  )
}