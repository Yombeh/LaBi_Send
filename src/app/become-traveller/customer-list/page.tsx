"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Package, CheckCircle, XCircle, Plus, Star, MapPin, Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase"

export default function TravelerDashboard() {
  const [requests, setRequests] = useState<any[]>([])
  const [trips, setTrips] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("requests")
  const [loading, setLoading] = useState(true)
  const [traveler, setTraveler] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = "/auth"
      return
    }

    // Get traveler profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    setTraveler(profile)

    // Get traveler's trips
    const { data: tripsData } = await supabase
      .from("trips")
      .select("*")
      .eq("traveler_id", user.id)
      .order("created_at", { ascending: false })

    setTrips(tripsData || [])

    // Get booking requests for traveler's trips
    if (tripsData && tripsData.length > 0) {
      const tripIds = tripsData.map(t => t.id)

      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*")
        .in("trip_id", tripIds)
        .order("created_at", { ascending: false })

      // Get customer profiles for each booking
      const bookingsWithCustomers = await Promise.all(
        (bookingsData || []).map(async (booking) => {
          const { data: customer } = await supabase
            .from("profiles")
            .select("full_name, phone_number, address")
            .eq("id", booking.customer_id)
            .single()

          const trip = tripsData.find(t => t.id === booking.trip_id)

          return {
            ...booking,
            customer,
            trip
          }
        })
      )

      setRequests(bookingsWithCustomers)
    }

    setLoading(false)
  }

  const updateRequest = async (id: string, status: string, kgRequested: number, tripId: string) => {
  const supabase = createClient()

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)

  if (error) {
    console.log("Error updating booking:", error)
    return
  }

  // If accepted, deduct KG and send email to customer
  if (status === "accepted") {
    const trip = trips.find(t => t.id === tripId)
    if (trip) {
      const newKg = trip.available_kg - kgRequested

      if (newKg <= 0) {
        await supabase
          .from("trips")
          .update({ status: "completed", available_kg: 0 })
          .eq("id", tripId)
      } else {
        await supabase
          .from("trips")
          .update({ available_kg: newKg })
          .eq("id", tripId)
      }
    }

    // Get booking details to send email
    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single()

    if (booking) {
      // Get customer profile
      const { data: customerProfile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", booking.customer_id)
        .single()

      // Get customer email from auth
      const { data: { user } } = await supabase.auth.getUser()

      // Send acceptance email
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: user?.email,
          subject: "Your Booking Has Been Accepted! 🎉 — LaBi_Send",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #2c4a1e; padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">LaBi<span style="color: #f5c842;">_Send</span></h1>
              </div>
              <div style="padding: 40px 30px; background: #fdfaf7;">
                <h2 style="color: #2c4a1e;">Your Booking is Accepted! 🎉</h2>
                <p style="color: #555; line-height: 1.6;">
                  Hello ${customerProfile?.full_name || "Valued Customer"},
                </p>
                <p style="color: #555; line-height: 1.6;">
                  Great news! Your booking request for 
                  <strong>${booking.kg_requested} KG</strong> has been accepted 
                  by your traveler.
                </p>
                <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 12px; padding: 20px; margin: 20px 0;">
                  <h3 style="color: #856404; margin-top: 0;">⚡ Action Required</h3>
                  <p style="color: #856404; margin: 0;">
                    Please log in to your LaBi_Send account and complete your payment 
                    to unlock the traveler contact details and pickup location.
                  </p>
                </div>
                <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0;">
                  <h3 style="color: #2c4a1e; margin-top: 0;">Booking Details</h3>
                  <table style="width: 100%;">
                    <tr>
                      <td style="color: #888; padding: 5px 0;">Items</td>
                      <td style="color: #333; font-weight: bold;">${booking.item_description}</td>
                    </tr>
                    <tr>
                      <td style="color: #888; padding: 5px 0;">Weight</td>
                      <td style="color: #333; font-weight: bold;">${booking.kg_requested} KG</td>
                    </tr>
                  </table>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/customer/bookings" 
                    style="background-color: #2c4a1e; color: white; padding: 14px 30px; border-radius: 50px; text-decoration: none; font-weight: bold;">
                    Complete Payment →
                  </a>
                </div>
              </div>
              <div style="background: #1a2e12; padding: 20px; text-align: center;">
                <p style="color: #86efac; font-size: 12px; margin: 0;">
                  © 2025 LaBi_Send. Made with ❤️ in The Gambia
                </p>
              </div>
            </div>
          `
        })
      })
    }
  }

  await fetchData()
}

  const statusStyle = (status: string) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-700"
      case "rejected": return "bg-red-100 text-red-700"
      default: return "bg-yellow-100 text-yellow-700"
    }
  }

  const pendingCount = requests.filter(r => r.status === "pending").length

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <p className="text-gray-400">Loading your dashboard...</p>
      </main>
    )
  }
  const shareLocation = (bookingId: string) => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser")
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords
      const trackingUrl = `https://www.google.com/maps?q=${latitude},${longitude}`

      const supabase = createClient()
      await supabase
        .from("bookings")
        .update({ tracking_url: trackingUrl })
        .eq("id", bookingId)

      await fetchData()
      alert("Location shared successfully!")
    },
    () => {
      alert("Unable to get your location. Please allow location access.")
    }
  )
}

const endTrip = async (bookingId: string, customerName: string, destination: string) => {
  const supabase = createClient()

  // Get customer email
  const { data: booking } = await supabase
    .from("bookings")
    .select("customer_id")
    .eq("id", bookingId)
    .single()

  if (!booking) return

  const { data: customerProfile } = await supabase
    .from("profiles")
    .select("full_name, email:id")
    .eq("id", booking.customer_id)
    .single()

  // Get customer email from auth
  const { data: { user } } = await supabase.auth.getUser()

  // Mark trip as ended and delivered
  await supabase
    .from("bookings")
    .update({ trip_ended: true, delivered: true })
    .eq("id", bookingId)

  // Send email to customer
  await fetch("/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: customerProfile?.email || user?.email,
      subject: "Your Package Has Arrived! 📦 — LaBi_Send",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2c4a1e; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">LaBi<span style="color: #f5c842;">_Send</span></h1>
          </div>
          <div style="padding: 40px 30px; background: #fdfaf7;">
            <h2 style="color: #2c4a1e;">Your Package Has Arrived! 📦</h2>
            <p style="color: #555; line-height: 1.6;">
              Hello ${customerName || "Valued Customer"},
            </p>
            <p style="color: #555; line-height: 1.6;">
              Great news! Your traveler has arrived at <strong>${destination}</strong> 
              with your package. Please collect your package within <strong>24 hours</strong>.
            </p>
            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #856404; margin-top: 0;">⚠️ Important Notice</h3>
              <p style="color: #856404; margin: 0;">
                If you do not collect your package within <strong>24 hours</strong>, 
                it will be dropped at the nearest <strong>DHL office</strong> for delivery. 
                Please note that DHL delivery costs will be at <strong>your expense</strong>.
              </p>
            </div>
            <p style="color: #555; line-height: 1.6;">
              Please contact your traveler immediately to arrange collection.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/customer/bookings" 
                style="background-color: #2c4a1e; color: white; padding: 14px 30px; border-radius: 50px; text-decoration: none; font-weight: bold;">
                View My Bookings →
              </a>
            </div>
          </div>
          <div style="background: #1a2e12; padding: 20px; text-align: center;">
            <p style="color: #86efac; font-size: 12px; margin: 0;">
              © 2025 LaBi_Send. Made with ❤️ in The Gambia
            </p>
          </div>
        </div>
      `
    })
  })

  await fetchData()
  alert("Trip ended! Customer has been notified by email.")
}

  return (
    <main className="min-h-screen bg-[#f5f0e8]">

      {/* Navbar */}
      <nav className="bg-[#2c4a1e] px-10 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-white">
          LaBi<span className="text-[#f5c842]">_Send</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#f5c842] flex items-center justify-center">
              <span className="text-[#2c4a1e] font-extrabold text-sm">
                {traveler?.full_name?.charAt(0) || "T"}
              </span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">{traveler?.full_name || "Traveler"}</p>
              <p className="text-green-300 text-xs">Verified Traveler ✓</p>
            </div>
          </div>
          <Link
            href="/trips/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#f5c842] text-[#2c4a1e] rounded-full text-sm font-bold hover:bg-yellow-400 transition-all"
          >
            <Plus size={14} />
            List New Trip
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-10 py-10">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Trips", value: trips.length, color: "bg-[#2c4a1e]", textColor: "text-white", subColor: "text-green-300" },
            { label: "Pending Requests", value: pendingCount, color: "bg-[#f5c842]", textColor: "text-[#2c4a1e]", subColor: "text-[#2c4a1e]/70" },
            { label: "Total Bookings", value: requests.length, color: "bg-white", textColor: "text-[#2c4a1e]", subColor: "text-gray-400" },
            { label: "Accepted", value: requests.filter(r => r.status === "accepted").length, color: "bg-white", textColor: "text-[#2c4a1e]", subColor: "text-gray-400" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} rounded-2xl p-5 shadow-sm`}>
              <p className={`text-3xl font-extrabold mb-1 ${stat.textColor}`}>{stat.value}</p>
              <p className={`text-xs font-semibold ${stat.subColor}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {[
            { label: "Booking Requests", value: "requests" },
            { label: "My Trips", value: "trips" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`pb-3 text-sm font-bold transition-all ${
                activeTab === tab.value
                  ? "border-b-2 border-[#2c4a1e] text-[#2c4a1e]"
                  : "text-gray-400"
              }`}
            >
              {tab.label}
              {tab.value === "requests" && pendingCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-[#f5c842] text-[#2c4a1e] rounded-full text-xs font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Booking Requests Tab */}
        {activeTab === "requests" && (
          <div className="flex flex-col gap-4">
            {requests.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center">
                <Package size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-400 text-sm">No booking requests yet</p>
              </div>
            ) : (
              requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl shadow-sm p-6 flex items-start gap-6"
                >
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-[#2c4a1e] flex items-center justify-center shrink-0 border-2 border-[#f5c842]">
                    <span className="text-white font-extrabold text-xl">
                      {req.customer?.full_name?.charAt(0) || "?"}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-extrabold text-[#2c2c2c]">
                        {req.customer?.full_name || "Unknown Customer"}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusStyle(req.status)}`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Package size={13} />
                        <span className="font-semibold text-[#2c2c2c]">{req.kg_requested} KG requested</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <MapPin size={13} />
                        <span>{req.trip?.pickup_location || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Calendar size={13} />
                        <span>{req.trip?.departure_date || "N/A"}</span>
                      </div>
                    </div>

                    {/* Item Description */}
                    <div className="bg-[#fdfaf7] rounded-xl p-3 mb-3">
                      <p className="text-xs font-bold text-gray-400 mb-1">Items Description</p>
                      <p className="text-sm text-gray-600">{req.item_description}</p>
                    </div>

                    {/* Item Image */}
                    {req.item_image_url && (
                      <div className="mb-4">
                        <p className="text-xs font-bold text-gray-400 mb-2">Item Photo</p>
                        <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                          <img
                            src={req.item_image_url}
                            alt="Item"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Contact Details if accepted */}
                    {req.status === "accepted" && (
                      <div className="bg-green-50 rounded-xl p-3 mb-4">
                        <p className="text-xs font-bold text-green-700 mb-2">Customer Contact Details</p>
                        <p className="text-sm text-green-700">📞 {req.customer?.phone_number || "N/A"}</p>
                        <p className="text-sm text-green-700">📍 {req.customer?.address || "N/A"}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {req.status === "pending" && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateRequest(req.id, "accepted", req.kg_requested, req.trip_id)}
                          className="flex items-center gap-2 px-6 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold hover:bg-green-600 hover:text-white transition-all"
                        >
                          <CheckCircle size={16} />
                          Accept
                        </button>
                        <button
                          onClick={() => updateRequest(req.id, "rejected", req.kg_requested, req.trip_id)}
                          className="flex items-center gap-2 px-6 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-all"
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </div>
                    )}
   {req.status === "accepted" && (
  <div className="flex flex-col gap-3">
   
   
    {req.status === "accepted" && (
  <div className="flex flex-col gap-3">
    <p className="text-green-600 text-sm font-bold flex items-center gap-2">
      <CheckCircle size={16} /> Booking accepted
    </p>
    <button
      onClick={() => shareLocation(req.id)}
      className="flex items-center gap-2 px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold hover:bg-blue-600 hover:text-white transition-all"
    >
      <MapPin size={16} />
      Share My Location
    </button>
    {req.tracking_url && (
      <p className="text-xs text-green-600 font-semibold">
        ✅ Location shared with customer
      </p>
    )}
    {!req.trip_ended && (
      <button
        onClick={() => endTrip(req.id, req.customer?.full_name, req.trip?.to_city)}
        className="flex items-center gap-2 px-6 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-all"
      >
        <Package size={16} />
        Mark as Arrived — End Trip
      </button>
    )}
    {req.trip_ended && (
      <p className="text-xs text-orange-600 font-semibold">
        ✅ Trip ended — Customer notified to collect package
      </p>
    )}
  </div>
)}
  
  </div>
)}

                    {req.status === "rejected" && (
                      <p className="text-red-500 text-sm font-bold flex items-center gap-2">
                        <XCircle size={16} /> Booking rejected
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* My Trips Tab */}
        {activeTab === "trips" && (
          <div className="flex flex-col gap-4">
            {trips.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center">
                <p className="text-gray-400 text-sm mb-4">You have no trips listed yet</p>
                <Link
                  href="/trips/new"
                  className="px-6 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm"
                >
                  List Your First Trip
                </Link>
              </div>
            ) : (
              trips.map((trip) => (
                <div key={trip.id} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2c4a1e] flex items-center justify-center">
                        <span className="text-lg">✈️</span>
                      </div>
                      <div>
                        <p className="font-extrabold text-[#2c2c2c]">
                          {trip.from_city} → {trip.to_city}
                        </p>
                        <p className="text-gray-400 text-xs">{trip.departure_date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusStyle(trip.status)}`}>
                      {trip.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#fdfaf7] rounded-xl p-3 text-center">
                      <p className="text-xl font-extrabold text-[#2c4a1e]">{trip.available_kg} KG</p>
                      <p className="text-xs text-gray-400">Available</p>
                    </div>
                    <div className="bg-[#fdfaf7] rounded-xl p-3 text-center">
                      <p className="text-xl font-extrabold text-[#f5c842]">
                        {requests.filter(r => r.trip_id === trip.id && r.status === "accepted")
                          .reduce((sum, r) => sum + r.kg_requested, 0)} KG
                      </p>
                      <p className="text-xs text-gray-400">Booked</p>
                    </div>
                    <div className="bg-[#fdfaf7] rounded-xl p-3 text-center">
                      <p className="text-xl font-extrabold text-[#2c4a1e]">D{trip.price_per_kg}</p>
                      <p className="text-xs text-gray-400">Per KG</p>
                    </div>
                  </div>
                </div>
              ))
            )}

            <Link
              href="/trips/new"
              className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-[#2c4a1e] text-[#2c4a1e] rounded-2xl font-bold text-sm hover:bg-[#2c4a1e] hover:text-white transition-all"
            >
              <Plus size={16} />
              List a New Trip
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}