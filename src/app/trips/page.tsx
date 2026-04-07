import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { MapPin, Calendar, Package, Star } from "lucide-react"

const mockTrips = [
  {
    id: "1",
    traveler: "Aminata Diallo",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    from: "Banjul, Gambia",
    to: "London, UK",
    departure: "April 15, 2025",
    arrival: "April 16, 2025",
    available_kg: 10,
    price_per_kg: 150,
    accepted_items: "Anything legal and permitted",
    rating: 4.8,
    trips_completed: 12,
    flag_from: "gm",
    flag_to: "gb"
  },
  {
    id: "2",
    traveler: "Kwame Mensah",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    from: "Banjul, Gambia",
    to: "Barcelona, Spain",
    departure: "April 18, 2025",
    arrival: "April 18, 2025",
    available_kg: 8,
    price_per_kg: 170,
    accepted_items: "Clothing & Textiles only",
    rating: 4.6,
    trips_completed: 7,
    flag_from: "gm",
    flag_to: "es"
  },
  {
    id: "3",
    traveler: "Fatou Camara",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    from: "Banjul, Gambia",
    to: "Stuttgart, Germany",
    departure: "April 20, 2025",
    arrival: "April 21, 2025",
    available_kg: 15,
    price_per_kg: 160,
    accepted_items: "Mixed items — clothing, food & documents",
    rating: 4.9,
    trips_completed: 20,
    flag_from: "gm",
    flag_to: "de"
  },
  {
    id: "4",
    traveler: "Seun Adesanya",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    from: "Banjul, Gambia",
    to: "New York, USA",
    departure: "April 22, 2025",
    arrival: "April 23, 2025",
    available_kg: 5,
    price_per_kg: 200,
    accepted_items: "Documents & Letters only",
    rating: 4.7,
    trips_completed: 5,
    flag_from: "gm",
    flag_to: "us"
  },
  {
    id: "5",
    traveler: "Amara Kouyaté",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    from: "Banjul, Gambia",
    to: "Paris, France",
    departure: "April 25, 2025",
    arrival: "April 25, 2025",
    available_kg: 12,
    price_per_kg: 165,
    accepted_items: "Anything legal and permitted",
    rating: 4.5,
    trips_completed: 9,
    flag_from: "gm",
    flag_to: "fr"
  },
  {
    id: "6",
    traveler: "Mariama Bah",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    from: "Banjul, Gambia",
    to: "Madrid, Spain",
    departure: "April 28, 2025",
    arrival: "April 28, 2025",
    available_kg: 7,
    price_per_kg: 155,
    accepted_items: "Food items only",
    rating: 4.9,
    trips_completed: 15,
    flag_from: "gm",
    flag_to: "es"
  },
]

export default function TripsPage() {
  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="bg-[#2c4a1e] py-16 px-10 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-2">
              Available Travelers
            </p>
            <h1 className="text-4xl font-extrabold mb-2">
              Find Your <span className="text-[#f5c842] italic">Traveler</span>
            </h1>
            <p className="text-green-200 text-sm">
              {mockTrips.length} travelers available right now
            </p>
          </div>
          <Link
            href="/trips/new"
            className="px-6 py-3 bg-[#f5c842] text-[#2c4a1e] rounded-full font-bold text-sm hover:bg-yellow-400 transition-all"
          >
            + List Your Trip
          </Link>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-10 py-6 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Where are you sending from?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Where are you sending to?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none"
            />
          </div>
          <div className="flex-1">
            <input
              type="date"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none"
            />
          </div>
          <button className="px-8 py-3 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all">
            Search
          </button>
        </div>
      </section>
      {/* Live Traveler Map */}
<section className="py-10 px-10 bg-[#fdfaf7]">
  <div className="max-w-6xl mx-auto">
    
    {/* Section Header */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-extrabold text-[#2c4a1e]">
          Active Traveler Routes
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Live view of travelers currently on the move
        </p>
      </div>
      <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-green-700 text-xs font-bold">6 Active Travelers</span>
      </div>
    </div>

    {/* Map Container */}
    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-gray-200">
      
      {/* Embedded Map — West Africa to Europe routes */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000000!2d-5!3d30!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgm!4v1700000000000!5m2!1sen!2sgm"
        width="100%"
        height="100%"
        style={{ border: 0, filter: "saturate(0.8) hue-rotate(10deg)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Overlay — Traveler Pins */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Banjul → London */}
        <div className="absolute" style={{ top: "62%", left: "18%" }}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#2c4a1e] border-3 border-white shadow-lg flex items-center justify-center">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Aminata"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-md whitespace-nowrap">
              <p className="text-xs font-bold text-[#2c4a1e]">✈ → London</p>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#f5c842] border-2 border-white animate-ping"></div>
          </div>
        </div>

        {/* Banjul → Barcelona */}
        <div className="absolute" style={{ top: "55%", left: "22%" }}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#2c4a1e] border-3 border-white shadow-lg flex items-center justify-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Kwame"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-md whitespace-nowrap">
              <p className="text-xs font-bold text-[#2c4a1e]">✈ → Barcelona</p>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#f5c842] border-2 border-white animate-ping"></div>
          </div>
        </div>

        {/* Stuttgart */}
        <div className="absolute" style={{ top: "28%", left: "46%" }}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#2c4a1e] border-3 border-white shadow-lg flex items-center justify-center">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Fatou"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-md whitespace-nowrap">
              <p className="text-xs font-bold text-[#2c4a1e]">📍 Stuttgart</p>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-green-500 border-2 border-white animate-ping"></div>
          </div>
        </div>

        {/* London */}
        <div className="absolute" style={{ top: "20%", left: "38%" }}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#2c4a1e] border-3 border-white shadow-lg flex items-center justify-center">
              <img
                src="https://randomuser.me/api/portraits/women/26.jpg"
                alt="Seun"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-md whitespace-nowrap">
              <p className="text-xs font-bold text-[#2c4a1e]">📍 London</p>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-green-500 border-2 border-white animate-ping"></div>
          </div>
        </div>

      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 shadow-lg">
        <p className="text-xs font-bold text-[#2c4a1e] mb-2">Legend</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f5c842] animate-ping"></div>
            <span className="text-xs text-gray-500">In transit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-500">Arrived — booking open</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Trips Grid */}
      <section className="py-16 px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTrips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.id}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 group"
            >
              {/* Card Header */}
              <div className="bg-[#2c4a1e] p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={trip.avatar}
                    alt={trip.traveler}
                    className="w-12 h-12 rounded-full border-2 border-[#f5c842] object-cover"
                  />
                  <div>
                    <p className="font-extrabold text-white text-sm">{trip.traveler}</p>
                    <div className="flex items-center gap-1">
                      <Star size={12} color="#f5c842" fill="#f5c842" />
                      <span className="text-[#f5c842] text-xs font-bold">{trip.rating}</span>
                      <span className="text-green-300 text-xs">({trip.trips_completed} trips)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#f5c842] font-extrabold text-lg">D{trip.price_per_kg}</p>
                  <p className="text-green-300 text-xs">per KG</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-4">

                {/* Route */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://flagcdn.com/w20/${trip.flag_from}.png`}
                      alt={trip.from}
                      className="w-5 h-4 rounded object-cover"
                    />
                    <span className="text-sm font-semibold text-[#2c2c2c]">{trip.from}</span>
                  </div>
                  <span className="text-gray-300">→</span>
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://flagcdn.com/w20/${trip.flag_to}.png`}
                      alt={trip.to}
                      className="w-5 h-4 rounded object-cover"
                    />
                    <span className="text-sm font-semibold text-[#2c2c2c]">{trip.to}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Calendar size={14} />
                    <span>Departs {trip.departure}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Package size={14} />
                    <span>{trip.available_kg} KG available</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <MapPin size={14} />
                    <span>{trip.accepted_items}</span>
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full py-3 bg-[#f5f0e8] text-[#2c4a1e] rounded-xl font-bold text-sm group-hover:bg-[#2c4a1e] group-hover:text-white transition-all">
                  View & Book →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}