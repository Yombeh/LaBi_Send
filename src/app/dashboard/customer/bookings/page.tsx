 "use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Package, CheckCircle, XCircle, Clock, MapPin, Phone, CreditCard, Star, Receipt } from "lucide-react"
import { createClient } from "@/lib/supabase"

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("bookings")
  const [waveModal, setWaveModal] = useState<any | null>(null)
  const [modempayModal, setModempayModal] = useState<any | null>(null)
  const [receiptModal, setReceiptModal] = useState<any | null>(null)
  const [ratingModal, setRatingModal] = useState<any | null>(null)
  const [wavePhone, setWavePhone] = useState("")
  const [wavePin, setWavePin] = useState("")
  const [modempayWallet, setModempayWallet] = useState("")
  const [modempayPin, setModempayPin] = useState("")
  const [rating, setRating] = useState(0)
  const [paying, setPaying] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = "/auth"
      return
    }

    setCurrentUser(user)

    // Fetch bookings
    const { data: bookingsData } = await supabase
      .from("bookings")
      .select("*")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })

    const bookingsWithDetails = await Promise.all(
      (bookingsData || []).map(async (booking) => {
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

        return { ...booking, trip, traveler }
      })
    )

    setBookings(bookingsWithDetails)

    // Fetch transactions
    const { data: transactionsData } = await supabase
      .from("transactions")
      .select("*")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })

    const transactionsWithDetails = await Promise.all(
      (transactionsData || []).map(async (tx) => {
        const { data: booking } = await supabase
          .from("bookings")
          .select("*")
          .eq("id", tx.booking_id)
          .single()

        const { data: trip } = await supabase
          .from("trips")
          .select("*")
          .eq("id", booking?.trip_id)
          .single()

        const { data: traveler } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", trip?.traveler_id)
          .single()

        return { ...tx, booking, trip, traveler }
      })
    )

    setTransactions(transactionsWithDetails)
    setLoading(false)
  }
const handleWavePayment = async (booking: any) => {
  if (!wavePhone) return
  setPaying(true)

  const response = await fetch("/api/payment/initiate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      booking_id: booking.id,
      customer_phone: wavePhone,
      customer_name: booking.traveler?.full_name || "Customer"
    })
  })

  const data = await response.json()

  if (data.error) {
    alert("Payment failed: " + data.error)
    setPaying(false)
    return
  }

  // Redirect customer to Wave checkout
  window.location.href = data.wave_launch_url
  setPaying(false)
}

  const handleRating = async (bookingId: string, stars: number) => {
    const supabase = createClient()

    await supabase
      .from("bookings")
      .update({ rating: stars })
      .eq("id", bookingId)

    setRatingModal(null)
    setRating(0)
    await fetchAll()
  }

  const googleMapsLink = (location: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`

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
            My Account
          </p>
          <h1 className="text-4xl font-extrabold mb-2">
            Bookings & <span className="text-[#f5c842] italic">Payments</span>
          </h1>
          <p className="text-green-200 text-sm">
            Track your packages and manage your payments
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-10 py-6 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto flex gap-6 border-b border-gray-200">
          {[
            { label: "My Bookings", value: "bookings" },
           
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
            </button>
          ))}
        </div>
      </section>

      <section className="py-10 px-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <>
              {bookings.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
                  <Package size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-extrabold text-gray-400 mb-2">No bookings yet</h3>
                  <Link href="/trips" className="px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm">
                    Find Travelers →
                  </Link>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-3xl shadow-sm overflow-hidden">

                    {/* Header */}
                    <div className="bg-[#2c4a1e] p-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#f5c842] flex items-center justify-center">
                          <span className="text-[#2c4a1e] font-extrabold">
                            {booking.traveler?.full_name?.charAt(0) || "?"}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-extrabold">{booking.traveler?.full_name || "Unknown"}</p>
                          <p className="text-green-300 text-xs">{booking.trip?.from_city} → {booking.trip?.to_city}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold capitalize px-3 py-1 rounded-full ${
                        booking.status === "accepted" ? "bg-green-500 text-white" :
                        booking.status === "rejected" ? "bg-red-500 text-white" :
                        booking.delivered ? "bg-blue-500 text-white" :
                        "bg-yellow-400 text-[#2c4a1e]"
                      }`}>
                        {booking.delivered ? "Delivered ✅" : booking.status}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col gap-4">

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#fdfaf7] rounded-xl p-3 text-center">
                          <p className="text-xl font-extrabold text-[#2c4a1e]">{booking.kg_requested} KG</p>
                          <p className="text-xs text-gray-400">Requested</p>
                        </div>
                        <div className="bg-[#fdfaf7] rounded-xl p-3 text-center">
                          <p className="text-xl font-extrabold text-[#2c4a1e]">
                            D{booking.kg_requested * booking.trip?.price_per_kg}
                          </p>
                          <p className="text-xs text-gray-400">Total</p>
                        </div>
                        <div className="bg-[#fdfaf7] rounded-xl p-3 text-center">
                          <p className="text-xl font-extrabold text-[#2c4a1e]">{booking.trip?.departure_date}</p>
                          <p className="text-xs text-gray-400">Departure</p>
                        </div>
                      </div>

                      {/* Item */}
                      <div className="bg-[#fdfaf7] rounded-xl p-4">
                        <p className="text-xs font-bold text-gray-400 mb-1">Items Sent</p>
                        <p className="text-sm text-gray-600">{booking.item_description}</p>
                      </div>

                      {/* Pending */}
                      {booking.status === "pending" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
                          <Clock size={20} color="#f5c842" />
                          <div>
                            <p className="font-bold text-yellow-700 text-sm">Waiting for traveler</p>
                            <p className="text-yellow-600 text-xs">Your request has been sent. The traveler will respond soon.</p>
                          </div>
                        </div>
                      )}

                      {/* Rejected */}
                      {booking.status === "rejected" && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                          <XCircle size={20} color="#ef4444" />
                          <div>
                            <p className="font-bold text-red-700 text-sm">Request Rejected</p>
                            <p className="text-red-600 text-xs">Please find another traveler.</p>
                          </div>
                        </div>
                      )}

                      {/* Accepted - Payment Required */}
                      {booking.status === "accepted" && !booking.paid && (
                        <div className="flex flex-col gap-4">
                          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <p className="font-bold text-green-700 text-sm mb-1">
                              🎉 Your booking has been accepted!
                            </p>
                            <p className="text-green-600 text-xs">
                              Make your payment below to unlock traveler contact and pickup details.
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => setWaveModal(booking)}
                              className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 "
                            >
                              <CreditCard size={18} />
                              Pay via Wave
                            </button>
                         
                          </div>
                        </div>
                      )}

                      {/* Paid - Details Revealed */}
                      {booking.status === "accepted" && booking.paid && (
                        <div className="flex flex-col gap-4">
                          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CheckCircle size={20} color="#2c4a1e" />
                              <div>
                                <p className="font-bold text-green-700 text-sm">
                                  Payment confirmed via {booking.payment_method === "wave" ? "Wave" : "ModemPay"} ✅
                                </p>
                                <p className="text-green-600 text-xs">Traveler details unlocked</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setReceiptModal(booking)}
                              className="flex items-center gap-1 px-4 py-2 bg-[#2c4a1e] text-white rounded-full text-xs font-bold"
                            >
                              <Receipt size={12} />
                              Receipt
                            </button>
                          </div>

                          {/* Traveler Contact */}
                          <div className="bg-[#fdfaf7] rounded-xl p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                              Traveler Contact
                            </p>
                            <div className="flex items-center gap-2">
                              <Phone size={14} color="#2c4a1e" />
                              <p className="text-sm font-semibold text-[#2c2c2c]">
                                {booking.traveler?.phone_number || "N/A"}
                              </p>
                            </div>
                          </div>
                           {/* Track Package */}
{booking.tracking_url && (
  <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4">
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
        Track Your Package
      </p>
      <p className="text-sm text-blue-600 font-semibold">
        See your traveler&apos;s live location
      </p>
    </div>
    <a
      href={booking.tracking_url}
      target="_blank"
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-all"
    >
      <MapPin size={12} />
      Track Now
    </a>
  </div>
)}
                          

                          {/* Locations */}
                          {booking.trip?.pickup_location && (
                            <div className="flex items-center justify-between bg-[#fdfaf7] rounded-xl p-4">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Package Pickup</p>
                                <p className="font-semibold text-[#2c2c2c] text-sm">{booking.trip.pickup_location}</p>
                              </div>
                              <a href={googleMapsLink(booking.trip.pickup_location)} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-[#2c4a1e] text-white rounded-full text-xs font-bold">
                                <MapPin size={12} />
                                Open in Maps
                              </a>
                            </div>
                          )}

                          {booking.trip?.dropoff_location && (
                            <div className="flex items-center justify-between bg-[#fdfaf7] rounded-xl p-4">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Package Dropoff</p>
                                <p className="font-semibold text-[#2c2c2c] text-sm">{booking.trip.dropoff_location}</p>
                              </div>
                              <a href={googleMapsLink(booking.trip.dropoff_location)} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-[#2c4a1e] text-white rounded-full text-xs font-bold">
                                <MapPin size={12} />
                                Open in Maps
                              </a>
                            </div>
                          )}

                          {/* Rate after delivery */}
                          {booking.delivered && !booking.rating && (
                            <button
                              onClick={() => setRatingModal(booking)}
                              className="w-full py-3 bg-[#f5c842] text-[#2c4a1e] rounded-xl font-bold text-sm"
                            >
                              ⭐ Rate Your Experience
                            </button>
                          )}

                          {booking.delivered && booking.rating && (
                            <div className="bg-[#fdfaf7] rounded-xl p-4 text-center">
                              <p className="text-xs font-bold text-gray-400 mb-2">Your Rating</p>
                              <div className="flex justify-center gap-1">
                                {[1,2,3,4,5].map((star) => (
                                  <Star
                                    key={star}
                                    size={20}
                                    color="#f5c842"
                                    fill={star <= booking.rating ? "#f5c842" : "none"}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* Wave Transactions Tab */}
          {activeTab === "wave" && (
            <div className="flex flex-col gap-4">
              <div className="bg-blue-600 rounded-2xl p-6 text-white flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <span className="text-blue-600 font-extrabold text-xl">W</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-xl">Wave Transactions</h3>
                  <p className="text-blue-200 text-sm">
                    {transactions.filter(t => t.payment_method === "wave").length} transactions
                  </p>
                </div>
              </div>

              {transactions.filter(t => t.payment_method === "wave").length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center">
                  <p className="text-gray-400 text-sm">No Wave transactions yet</p>
                </div>
              ) : (
                transactions.filter(t => t.payment_method === "wave").map((tx) => (
                  <div key={tx.id} className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-extrabold">W</span>
                      </div>
                      <div>
                        <p className="font-extrabold text-[#2c2c2c]">{tx.traveler?.full_name || "Unknown"}</p>
                        <p className="text-gray-400 text-xs">{tx.trip?.from_city} → {tx.trip?.to_city}</p>
                        <p className="text-gray-400 text-xs">{new Date(tx.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-[#2c4a1e] text-lg">D{tx.amount}</p>
                      <button
                        onClick={() => setReceiptModal({ ...tx.booking, trip: tx.trip, traveler: tx.traveler, payment_method: "wave", transaction_ref: tx.transaction_ref })}
                        className="text-xs text-blue-600 font-bold hover:underline"
                      >
                        View Receipt
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </section>

      <Footer />

      {/* Wave Modal */}
      {waveModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-blue-600 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-extrabold text-2xl">W</span>
              </div>
              <h3 className="text-white font-extrabold text-xl">Wave</h3>
              <p className="text-blue-200 text-sm">Mobile Money</p>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-blue-600 text-xs font-bold uppercase mb-1">Amount to Pay</p>
                <p className="text-3xl font-extrabold text-blue-600">
                  D{waveModal.kg_requested * waveModal.trip?.price_per_kg}
                </p>
                <p className="text-blue-400 text-xs">To: LaBi_Send</p>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                  Wave Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+220 XXXXXXX"
                  value={wavePhone}
                  onChange={(e) => setWavePhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>

          

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setWaveModal(null); setWavePhone(""); setWavePin("") }}
                  className="py-3 border-2 border-gray-200 text-gray-500 rounded-xl font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleWavePayment(waveModal)}
                  disabled={!wavePhone|| paying}
                  className="py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {paying ? "Processing..." : "Confirm Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Rating Modal */}
      {ratingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-xl font-extrabold text-[#2c4a1e] text-center mb-2">
              Rate Your Experience
            </h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              How was your experience with {ratingModal.traveler?.full_name}?
            </p>

            <div className="flex justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={36}
                    color="#f5c842"
                    fill={star <= rating ? "#f5c842" : "none"}
                  />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setRatingModal(null); setRating(0) }}
                className="py-3 border-2 border-gray-200 text-gray-500 rounded-xl font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRating(ratingModal.id, rating)}
                disabled={rating === 0}
                className="py-3 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm disabled:opacity-50"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}