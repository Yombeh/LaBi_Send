 "use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Package, CheckCircle, XCircle, Clock, MapPin, Phone, CreditCard } from "lucide-react"
import { createClient } from "@/lib/supabase"

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = "/auth"
      return
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.log("Error:", error)
      setLoading(false)
      return
    }

    const bookingsWithDetails = await Promise.all(
      (data || []).map(async (booking) => {
        const { data: trip } = await supabase
          .from("trips")
          .select("*")
          .eq("id", booking.trip_id)
          .single()

        const { data: traveler } = await supabase
          .from("profiles")
          .select("full_name, phone_number, address")
          .eq("id", trip?.traveler_id)
          .single()

        return {
          ...booking,
          trip,
          traveler
        }
      })
    )

    setBookings(bookingsWithDetails)
    setLoading(false)
  }

  const handlePayment = async (bookingId: string, method: string) => {
    setPaying(bookingId)
    const supabase = createClient()

    const { error } = await supabase
      .from("bookings")
      .update({ paid: true, payment_method: method })
      .eq("id", bookingId)

    if (error) {
      console.log("Payment error:", error)
      setPaying(null)
      return
    }

    await fetchBookings()
    setPaying(null)
  }

  const googleMapsLink = (location: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`

  const statusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <CheckCircle size={16} color="#2c4a1e" />
      case "rejected": return <XCircle size={16} color="#ef4444" />
      default: return <Clock size={16} color="#f5c842" />
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdfaf7]">
        <div className="bg-[#2c4a1e]"><Navbar /></div>
        <div className="flex items-center justify-center py-40">
          <p className="text-gray-400">Loading your bookings...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="bg-[#2c4a1e] py-16 px-10 text-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-2">
            My Bookings
          </p>
          <h1 className="text-4xl font-extrabold mb-2">
            Track Your <span className="text-[#f5c842] italic">Packages</span>
          </h1>
          <p className="text-green-200 text-sm">
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </section>

      {/* Bookings */}
      <section className="py-16 px-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">

          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
              <Package size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-extrabold text-gray-400 mb-2">No bookings yet</h3>
              <p className="text-gray-400 text-sm mb-6">
                Find a traveler and book your first package delivery!
              </p>
              <Link
                href="/trips"
                className="px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm"
              >
                Find Travelers →
              </Link>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-3xl shadow-sm overflow-hidden">

                {/* Booking Header */}
                <div className="bg-[#2c4a1e] p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f5c842] flex items-center justify-center">
                      <span className="text-[#2c4a1e] font-extrabold">
                        {booking.traveler?.full_name?.charAt(0) || "?"}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-extrabold">
                        {booking.traveler?.full_name || "Unknown Traveler"}
                      </p>
                      <p className="text-green-300 text-xs">
                        {booking.trip?.from_city} → {booking.trip?.to_city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusIcon(booking.status)}
                    <span className={`text-xs font-bold capitalize ${
                      booking.status === "accepted" ? "text-green-300" :
                      booking.status === "rejected" ? "text-red-300" :
                      "text-[#f5c842]"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Booking Body */}
                <div className="p-6 flex flex-col gap-4">

                  {/* Booking Details */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#fdfaf7] rounded-xl p-3 text-center">
                      <p className="text-xl font-extrabold text-[#2c4a1e]">{booking.kg_requested} KG</p>
                      <p className="text-xs text-gray-400">Requested</p>
                    </div>
                    <div className="bg-[#fdfaf7] rounded-xl p-3 text-center">
                      <p className="text-xl font-extrabold text-[#2c4a1e]">
                        D{booking.kg_requested * booking.trip?.price_per_kg}
                      </p>
                      <p className="text-xs text-gray-400">Total Price</p>
                    </div>
                    <div className="bg-[#fdfaf7] rounded-xl p-3 text-center">
                      <p className="text-xl font-extrabold text-[#2c4a1e]">
                        {booking.trip?.departure_date}
                      </p>
                      <p className="text-xs text-gray-400">Departure</p>
                    </div>
                  </div>

                  {/* Item Description */}
                  <div className="bg-[#fdfaf7] rounded-xl p-4">
                    <p className="text-xs font-bold text-gray-400 mb-1">Items Sent</p>
                    <p className="text-sm text-gray-600">{booking.item_description}</p>
                  </div>

                  {/* Status Messages */}
                  {booking.status === "pending" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
                      <Clock size={20} color="#f5c842" />
                      <div>
                        <p className="font-bold text-yellow-700 text-sm">Waiting for traveler</p>
                        <p className="text-yellow-600 text-xs">
                          Your booking request has been sent. The traveler will respond soon.
                        </p>
                      </div>
                    </div>
                  )}

                  {booking.status === "rejected" && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                      <XCircle size={20} color="#ef4444" />
                      <div>
                        <p className="font-bold text-red-700 text-sm">Request Rejected</p>
                        <p className="text-red-600 text-xs">
                          Unfortunately the traveler could not accept your request. Please find another traveler.
                        </p>
                      </div>
                    </div>
                  )}

                  {booking.status === "accepted" && !booking.paid && (
                    <div className="flex flex-col gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="font-bold text-green-700 text-sm mb-1">
                          🎉 Your booking has been accepted!
                        </p>
                        <p className="text-green-600 text-xs">
                          Please make your payment below to unlock the traveler&apos;s contact details and pickup location.
                        </p>
                      </div>

                      {/* Payment Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handlePayment(booking.id, "wave")}
                          disabled={paying === booking.id}
                          className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-50"
                        >
                          <CreditCard size={18} />
                          Pay via Wave
                        </button>
                        <button
                          onClick={() => handlePayment(booking.id, "modempay")}
                          disabled={paying === booking.id}
                          className="flex items-center justify-center gap-2 py-4 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all disabled:opacity-50"
                        >
                          <CreditCard size={18} />
                          Pay via ModemPay
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Details revealed after payment */}
                  {booking.status === "accepted" && booking.paid && (
                    <div className="flex flex-col gap-4">

                      {/* Payment confirmed */}
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                        <CheckCircle size={20} color="#2c4a1e" />
                        <div>
                          <p className="font-bold text-green-700 text-sm">
                            Payment confirmed via {booking.payment_method === "wave" ? "Wave" : "ModemPay"} ✅
                          </p>
                          <p className="text-green-600 text-xs">
                            Here are your traveler&apos;s details and pickup information.
                          </p>
                        </div>
                      </div>

                      {/* Traveler Contact */}
                      <div className="bg-[#fdfaf7] rounded-xl p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                          Traveler Contact
                        </p>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Phone size={14} color="#2c4a1e" />
                            <p className="text-sm font-semibold text-[#2c2c2c]">
                              {booking.traveler?.phone_number || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Pickup Location */}
                      {booking.trip?.pickup_location && (
                        <div className="flex items-center justify-between bg-[#fdfaf7] rounded-xl p-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                              Package Pickup
                            </p>
                            <p className="font-semibold text-[#2c2c2c] text-sm">
                              {booking.trip.pickup_location}
                            </p>
                          </div>
                          <a
                            href={googleMapsLink(booking.trip.pickup_location)}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 bg-[#2c4a1e] text-white rounded-full text-xs font-bold hover:bg-green-800 transition-all"
                          >
                            <MapPin size={12} />
                            Open in Maps
                          </a>
                        </div>
                      )}

                      {/* Dropoff Location */}
                      {booking.trip?.dropoff_location && (
                        <div className="flex items-center justify-between bg-[#fdfaf7] rounded-xl p-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                              Package Dropoff
                            </p>
                            <p className="font-semibold text-[#2c2c2c] text-sm">
                              {booking.trip.dropoff_location}
                            </p>
                          </div>
                          <a
                            href={googleMapsLink(booking.trip.dropoff_location)}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 bg-[#2c4a1e] text-white rounded-full text-xs font-bold hover:bg-green-800 transition-all"
                          >
                            <MapPin size={12} />
                            Open in Maps
                          </a>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}