import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { MapPin, Calendar, Package, Star, Shield, Phone, Mail, ArrowLeft } from "lucide-react"

const mockTrips = [
  {
    id: "1",
    traveler: "Aminata Diallo",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    occupation: "Marketing Manager",
    company: "Orange Senegal",
    from: "Banjul, Gambia",
    to: "London, UK",
    departure: "April 15, 2025",
    arrival: "April 16, 2025",
    available_kg: 10,
    price_per_kg: 150,
    accepted_items: "Anything legal and permitted",
    pickup_location: "Westfield, Banjul",
    dropoff_location: "Central London",
    notes: "I am happy to carry any legal items. Please ensure everything is properly packaged. I prefer to meet at the pickup location the day before departure.",
    rating: 4.8,
    trips_completed: 12,
    flag_from: "gm",
    flag_to: "gb",
    verified: true
  },
]

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const trip = mockTrips.find(t => t.id === params.id) || mockTrips[0]

  return (
    <main className="min-h-screen bg-[#fdfaf7]">
         {/* HEADER SECTION */}
         <header className="bg-[#2c4a1e] w-full pb-20 shadow-xl">
       <Navbar />
     </header>

      {/* Back Button */}
      <div className="px-10 py-6 max-w-6xl mx-auto">
        <Link
          href="/trips"
          className="flex items-center gap-2 text-[#2c4a1e] font-semibold text-sm hover:text-[#f5c842] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to All Trips
        </Link>
      </div>

      {/* Main Content */}
      <section className="px-10 pb-20">
        <div className="max-w-6xl mx-auto flex gap-10 items-start">

          {/* Left - Trip Details */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Traveler Card */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <img
                    src={trip.avatar}
                    alt={trip.traveler}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-[#f5c842]"
                  />
                  {trip.verified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#2c4a1e] flex items-center justify-center">
                      <Shield size={14} color="white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-extrabold text-[#2c2c2c]">{trip.traveler}</h2>
                    {trip.verified && (
                      <span className="px-3 py-1 bg-green-100 text-[#2c4a1e] rounded-full text-xs font-bold">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{trip.occupation} · {trip.company}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={14} color="#f5c842" fill="#f5c842" />
                      <span className="font-bold text-sm text-[#2c2c2c]">{trip.rating}</span>
                    </div>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-400 text-sm">{trip.trips_completed} trips completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Card */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h3 className="font-extrabold text-[#2c4a1e] mb-6 flex items-center gap-2">
                <MapPin size={18} /> Trip Route
              </h3>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <img
                    src={`https://flagcdn.com/w40/${trip.flag_from}.png`}
                    alt={trip.from}
                    className="w-10 h-7 rounded object-cover mx-auto mb-2"
                  />
                  <p className="font-extrabold text-[#2c2c2c] text-sm">{trip.from}</p>
                  <p className="text-gray-400 text-xs">{trip.departure}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex-1 h-0.5 bg-gray-200"></div>
                  <div className="mx-3 w-8 h-8 rounded-full bg-[#f5c842] flex items-center justify-center">
                    <span className="text-xs">✈️</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-200"></div>
                </div>
                <div className="text-center">
                  <img
                    src={`https://flagcdn.com/w40/${trip.flag_to}.png`}
                    alt={trip.to}
                    className="w-10 h-7 rounded object-cover mx-auto mb-2"
                  />
                  <p className="font-extrabold text-[#2c2c2c] text-sm">{trip.to}</p>
                  <p className="text-gray-400 text-xs">{trip.arrival}</p>
                </div>
              </div>
            </div>

            {/* Trip Info */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h3 className="font-extrabold text-[#2c4a1e] mb-6 flex items-center gap-2">
                <Package size={18} /> Trip Details
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Available Weight", value: `${trip.available_kg} KG` },
                  { label: "Price Per KG", value: `D${trip.price_per_kg}` },
                  { label: "Accepted Items", value: trip.accepted_items },
                  { label: "Pickup Location", value: trip.pickup_location },
                  { label: "Dropoff Location", value: trip.dropoff_location },
                  { label: "Departure Date", value: trip.departure },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      {item.label}
                    </p>
                    <p className="font-semibold text-[#2c2c2c] text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h3 className="font-extrabold text-[#2c4a1e] mb-4">
                Note from Traveler
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{trip.notes}</p>
            </div>

          </div>

          {/* Right - Booking Card */}
          <div className="w-80 shrink-0 sticky top-10">
            <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-5">

              {/* Price */}
              <div className="text-center pb-4 border-b border-gray-100">
                <p className="text-4xl font-extrabold text-[#2c4a1e]">
                  D{trip.price_per_kg}
                </p>
                <p className="text-gray-400 text-sm">per KG</p>
              </div>

              {/* Available KG */}
              <div className="bg-[#f5f0e8] rounded-xl p-4 text-center">
                <p className="text-2xl font-extrabold text-[#2c4a1e]">{trip.available_kg} KG</p>
                <p className="text-gray-400 text-xs">available weight</p>
              </div>

              {/* How many KG */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                  How many KG do you need?
                </label>
                <input
                  type="number"
                  placeholder={`Max ${trip.available_kg} KG`}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                />
              </div>

              {/* Book Button */}
              <button className="w-full py-4 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all">
                Book Now →
              </button>

              {/* Contact */}
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center">
                  Contact Traveler
                </p>
                <button className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#2c4a1e] text-[#2c4a1e] rounded-xl font-bold text-sm hover:bg-[#2c4a1e] hover:text-white transition-all">
                  <Phone size={14} />
                  Call Traveler
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-3 border-2 border-gray-200 text-gray-400 rounded-xl font-bold text-sm hover:border-[#2c4a1e] hover:text-[#2c4a1e] transition-all">
                  <Mail size={14} />
                  Send Message
                </button>
              </div>

              {/* Safety Note */}
              <div className="bg-green-50 rounded-xl p-4 flex items-start gap-2">
                <Shield size={14} color="#2c4a1e" className="shrink-0 mt-0.5" />
                <p className="text-xs text-[#2c4a1e] leading-relaxed">
                  This traveler has been verified by our admin team. Always use the platform for payments.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}