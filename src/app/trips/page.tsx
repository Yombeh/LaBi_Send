"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { MapPin, Calendar, Package, Star } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

      function TripsContent() {
const searchParams = useSearchParams()
  const [trips, setTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get("from") || "")
  const [destination, setDestination] = useState(searchParams.get("to") || "")
  const [date, setDate] = useState(searchParams.get("earliest") || "")

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })

    if (error) {
      console.log("Error:", error)
      setLoading(false)
      return
    }

    const tripsWithProfiles = await Promise.all(
      (data || []).map(async (trip) => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, phone_number")
          .eq("id", trip.traveler_id)
          .single()

        return {
          ...trip,
          profiles: profile
        }
      })
    )

    setTrips(tripsWithProfiles)
    setLoading(false)
  }

  const filtered = trips.filter(trip => {
    const matchFrom = search === "" || trip.from_city?.toLowerCase().includes(search.toLowerCase())
    const matchTo = destination === "" || trip.to_city?.toLowerCase().includes(destination.toLowerCase())
    const matchDate = date === "" || trip.departure_date === date
    return matchFrom && matchTo && matchDate
  })

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
              {loading ? "Loading..." : `${filtered.length} travelers available right now`}
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
              placeholder="Sending from..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Sending to..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
            />
          </div>
          <div className="flex-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
            />
          </div>
          <button
            onClick={() => { setSearch(""); setDestination(""); setDate("") }}
            className="px-6 py-3 border-2 border-[#2c4a1e] text-[#2c4a1e] rounded-xl font-bold text-sm hover:bg-[#2c4a1e] hover:text-white transition-all"
          >
            Clear
          </button>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="py-16 px-10">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm">Loading travelers...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm mb-4">No travelers found for your search</p>
              <button
                onClick={() => { setSearch(""); setDestination(""); setDate("") }}
                className="px-6 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.map((trip) => (
                <Link
                  key={trip.id}
                  href={`/trips/${trip.id}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 group"
                >
 {/* Card Header */}
<div className="bg-[#2c4a1e] p-5 flex items-center justify-between">
  <div className="flex items-center gap-3">
    {trip.profiles?.profile_photo_url ? (
      <img
        src={trip.profiles.profile_photo_url}
        alt={trip.profiles?.full_name}
        className="w-12 h-12 rounded-full border-2 border-[#f5c842] object-cover shrink-0"
      />
    ) : (
      <div className="w-12 h-12 rounded-full bg-[#f5c842] flex items-center justify-center border-2 border-[#f5c842] shrink-0">
        <span className="text-[#2c4a1e] font-extrabold text-lg">
          {trip.profiles?.full_name?.charAt(0) || "?"}
        </span>
      </div>
    )}

    <div>
      <p className="font-extrabold text-white text-sm">
        {trip.profiles?.full_name || "Unknown"}
      </p>
      <div className="flex items-center gap-1">
        <Star size={12} color="#f5c842" fill="#f5c842" />
        <span className="text-[#f5c842] text-xs font-bold">5.0</span>
        <span className="text-green-300 text-xs">· Verified ✓</span>
      </div>
    </div>
  </div>

  <div className="text-right">
    <p className="text-[#f5c842] font-extrabold text-lg">
      D{trip.price_per_kg}
    </p>
    <p className="text-green-300 text-xs">per KG</p>
  </div>
</div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col gap-4">

                    {/* Route */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[#2c2c2c]">{trip.from_city}</span>
                      <span className="text-gray-300 text-lg">→</span>
                      <span className="text-sm font-semibold text-[#2c2c2c]">{trip.to_city}</span>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Calendar size={14} />
                        <span>Departs {trip.departure_date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Package size={14} />
                        <span>{trip.available_kg} KG available</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <MapPin size={14} />
                        <span>{trip.accepted_items || "Various items"}</span>
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
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function TripsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfaf7] flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>}>
      <TripsContent />
    </Suspense>
  )
}