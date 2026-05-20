"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Plane, Package, MapPin, Calendar, Upload, CreditCard } from "lucide-react"
import { createClient } from "@/lib/supabase"

export default function NewTripPage() {
  const [formData, setFormData] = useState({
    from_city: "",
    to_city: "",
    departure_date: "",
    arrival_date: "",
    available_kg: "",
    price_per_kg: "",
    accepted_items: "",
    pickup_location: "",
    dropoff_location: "",
  })
  const [flightTicket, setFlightTicket] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [paymentModal, setPaymentModal] = useState(false)
  const [wavePhone, setWavePhone] = useState("")
  const [paying, setPaying] = useState(false)
  const [savedTripId, setSavedTripId] = useState<string | null>(null)

 useEffect(() => {
  // Check if we're returning from a payment
  const pendingTripId = localStorage.getItem('pending_trip_id')
  
  if (pendingTripId && pendingTripId === savedTripId) {
    // Check payment status
    checkPaymentStatus(pendingTripId)
  }
}, [savedTripId])

const checkPaymentStatus = async (tripId: string) => {
  // Give Wave a few seconds to process
  setTimeout(async () => {
    const response = await fetch(`/api/payment/check-status?trip_id=${tripId}`)
    const data = await response.json()
    
    if (data.paid) {
      // Payment confirmed!
      localStorage.removeItem('pending_trip_id')
      localStorage.removeItem('pending_trip_amount')
      localStorage.removeItem('payment_started_at')
      
      // Show success and redirect
      setSubmitted(true) // This shows the success screen
    } else {
      // Still waiting, check again
      const startedAt = localStorage.getItem('payment_started_at')
      const elapsed = Date.now() - parseInt(startedAt || '0')
      
      if (elapsed < 30000) { // Check for 30 seconds
        setTimeout(() => checkPaymentStatus(tripId), 3000)
      } else {
        // Timeout - show error
        setError("Payment confirmation taking longer than expected. Please check your bookings page later.")
        localStorage.removeItem('pending_trip_id')
      }
    }
  }, 3000) // Wait 3 seconds before first check
}
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFlightTicket(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  // Calculate fee
  const totalEarnings = parseFloat(formData.available_kg || "0") * parseFloat(formData.price_per_kg || "0")
  const listingFee = totalEarnings * 0.03

  const handleSubmit = async () => {
    setError("")

    if (!formData.from_city || !formData.to_city || !formData.departure_date || !formData.available_kg || !formData.price_per_kg) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError("You must be logged in to list a trip")
      setLoading(false)
      return
    }

    let flight_ticket_url = ""

    if (flightTicket) {
      const fileExt = flightTicket.name.split(".").pop()
      const uploadName = `${user.id}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("flight-tickets")
        .upload(uploadName, flightTicket)

      if (uploadError) {
        setError("Failed to upload flight ticket. Please try again.")
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from("flight-tickets")
        .getPublicUrl(uploadName)

      flight_ticket_url = urlData.publicUrl
    }

    // Save trip with pending_payment status
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .insert({
        traveler_id: user.id,
        from_city: formData.from_city,
        to_city: formData.to_city,
        departure_date: formData.departure_date,
        arrival_date: formData.arrival_date,
        available_kg: parseFloat(formData.available_kg),
        price_per_kg: parseFloat(formData.price_per_kg),
        accepted_items: formData.accepted_items,
        pickup_location: formData.pickup_location,
        dropoff_location: formData.dropoff_location,
        flight_ticket_url,
        status: "pending_payment"
      })
      .select()
      .single()

    if (tripError) {
      setError("Failed to save trip. Please try again.")
      setLoading(false)
      return
    }

    setSavedTripId(trip.id)
    setLoading(false)
    setPaymentModal(true)
  }

 const handlePayment = async () => {
  if (!wavePhone || !savedTripId) return
  setPaying(true)

  const response = await fetch("/api/payment/trip-fee", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trip_id: savedTripId,
      customer_phone: wavePhone,
      amount: listingFee
    })
  })

  const data = await response.json()

  if (data.error) {
    setError("Payment failed: " + data.error)
    setPaying(false)
    return
  }

  // Store that we're waiting for payment on this trip
  localStorage.setItem('pending_trip_id', savedTripId)
  localStorage.setItem('pending_trip_amount', listingFee.toString())
  localStorage.setItem('payment_started_at', Date.now().toString())
  
  // Redirect to Wave
  window.location.href = data.wave_launch_url
}


  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="bg-[#2c4a1e] py-16 px-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
            List Your Trip
          </p>
          <h1 className="text-4xl font-extrabold mb-4">
            Turn Your Journey Into <span className="text-[#f5c842] italic">Earnings.</span>
          </h1>
          <p className="text-green-200 text-sm leading-relaxed">
            Fill in your trip details below and start receiving booking requests from customers.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 px-10">
        <div className="max-w-3xl mx-auto">
          {!submitted ? (
            <div className="bg-white rounded-3xl shadow-lg p-10">

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-8">

                {/* Route */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Plane size={18} color="#2c4a1e" />
                    <h3 className="font-extrabold text-[#2c4a1e]">Trip Route</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Departing From *
                      </label>
                      <input
                        name="from_city"
                        type="text"
                        placeholder="e.g. Banjul, Gambia"
                        value={formData.from_city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Destination *
                      </label>
                      <input
                        name="to_city"
                        type="text"
                        placeholder="e.g. London, UK"
                        value={formData.to_city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={18} color="#2c4a1e" />
                    <h3 className="font-extrabold text-[#2c4a1e]">Travel Dates</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Departure Date *
                      </label>
                      <input
                        name="departure_date"
                        type="date"
                        value={formData.departure_date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Arrival Date
                      </label>
                      <input
                        name="arrival_date"
                        type="date"
                        value={formData.arrival_date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Capacity & Price */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Package size={18} color="#2c4a1e" />
                    <h3 className="font-extrabold text-[#2c4a1e]">Capacity & Pricing</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Available Weight (KG) *
                      </label>
                      <input
                        name="available_kg"
                        type="number"
                        placeholder="e.g. 10"
                        value={formData.available_kg}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Price Per KG (GMD) *
                      </label>
                      <input
                        name="price_per_kg"
                        type="number"
                        placeholder="e.g. 150"
                        value={formData.price_per_kg}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Fee Calculator */}
                  {totalEarnings > 0 && (
                    <div className="mt-4 bg-[#f5f0e8] rounded-xl p-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Fee Breakdown
                      </p>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Potential Earnings</span>
                          <span className="text-sm font-bold text-[#2c4a1e]">D{totalEarnings.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">LaBi_Send Fee (3%)</span>
                          <span className="text-sm font-bold text-red-500">- D{listingFee.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 flex justify-between">
                          <span className="text-sm font-bold text-[#2c4a1e]">Your Net Earnings</span>
                          <span className="text-sm font-bold text-[#2c4a1e]">D{(totalEarnings - listingFee).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pickup & Dropoff */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={18} color="#2c4a1e" />
                    <h3 className="font-extrabold text-[#2c4a1e]">Pickup & Dropoff</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Package Pickup Location
                      </label>
                      <input
                        name="pickup_location"
                        type="text"
                        placeholder="Where will you collect the package?"
                        value={formData.pickup_location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Package Dropoff Location
                      </label>
                      <input
                        name="dropoff_location"
                        type="text"
                        placeholder="Where will you deliver the package?"
                        value={formData.dropoff_location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Accepted Items */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Package size={18} color="#2c4a1e" />
                    <h3 className="font-extrabold text-[#2c4a1e]">What Will You Accept?</h3>
                  </div>
                  <select
                    name="accepted_items"
                    value={formData.accepted_items}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                  >
                    <option value="">Select what you are willing to carry</option>
                    <option value="anything">Anything legal and permitted</option>
                    <option value="clothing">Clothing & Textiles only</option>
                    <option value="food">Food items only</option>
                    <option value="documents">Documents & Letters only</option>
                    <option value="electronics">Electronics only</option>
                    <option value="mixed">Mixed items — clothing, food & documents</option>
                  </select>
                </div>

                {/* Flight Ticket Upload */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Upload size={18} color="#2c4a1e" />
                    <h3 className="font-extrabold text-[#2c4a1e]">Upload Flight Ticket</h3>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">
                    Your flight ticket will only be visible to the LaBi_Send admin for verification purposes.
                  </p>
                  <label className="w-full flex flex-col items-center justify-center px-4 py-8 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#2c4a1e] transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#f5f0e8] flex items-center justify-center mb-3">
                      <Upload size={20} color="#2c4a1e" />
                    </div>
                    <p className="text-sm font-semibold text-[#2c4a1e]">
                      {fileName || "Click to upload your flight ticket"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG or PDF up to 5MB
                    </p>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving trip..." : "List My Trip →"}
                </button>

              </div>
            </div>

          ) : (

            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Plane size={40} color="#2c4a1e" />
              </div>
              <h2 className="text-3xl font-extrabold text-[#2c4a1e] mb-3">
                Trip Listed Successfully! 🎉
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
                Your trip has been submitted and is pending admin review. You will be notified once it goes live.
              </p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <Link
                  href="/trips"
                  className="px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm hover:bg-green-800 transition-all text-center"
                >
                  View All Trips
                </Link>
                <Link
                  href="/trips/new"
                  className="px-8 py-3 border-2 border-[#2c4a1e] text-[#2c4a1e] rounded-full font-bold text-sm hover:bg-[#2c4a1e] hover:text-white transition-all text-center"
                >
                  List Another Trip
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Payment Modal */}
      {paymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
            
            <div className="bg-[#2c4a1e] p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#f5c842] flex items-center justify-center mx-auto mb-3">
                <CreditCard size={28} color="#2c4a1e" />
              </div>
              <h3 className="text-white font-extrabold text-xl">Listing Fee</h3>
              <p className="text-green-300 text-sm">Pay via Wave to publish your trip</p>
            </div>

            <div className="p-6 flex flex-col gap-4">

              {/* Fee breakdown */}
              <div className="bg-[#f5f0e8] rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 text-sm">Potential Earnings</span>
                  <span className="font-bold text-sm text-[#2c4a1e]">D{totalEarnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 text-sm">LaBi_Send Fee (3%)</span>
                  <span className="font-bold text-sm text-red-500">D{listingFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-bold text-sm text-[#2c4a1e]">Amount to Pay</span>
                  <span className="font-extrabold text-lg text-[#2c4a1e]">D{listingFee.toFixed(2)}</span>
                </div>
              </div>

              {/* Wave Phone */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                  Wave Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+220 XXXXXXX"
                  value={wavePhone}
                  onChange={(e) => setWavePhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentModal(false)}
                  className="py-3 border-2 border-gray-200 text-gray-500 rounded-xl font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!wavePhone || paying}
                  className="py-3 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all disabled:opacity-50"
                >
                  {paying ? "Processing..." : "Pay via Wave"}
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center">
                Your trip will be submitted for admin review after payment
              </p>

            </div>
          </div>
        </div>
      )}

    </main>
  )
}