"use client"

import { useState, useEffect , use} from "react"

import Footer from "@/components/Footer"
import Link from "next/link"
import { MapPin, Calendar, Package, Star, Shield, Phone, Mail, ArrowLeft, Upload } from "lucide-react"
import { createClient } from "@/lib/supabase"



export default function TripDetailPage({ params }: { params: Promise<{ id: string }> })  {
    const { id } = use(params)

  const [trip, setTrip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  const [kgNeeded, setKgNeeded] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [itemImage, setItemImage] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [booking, setBooking] = useState(false)
  const [booked, setBooked] = useState(false)
  const [error, setError] = useState("")



  useEffect(() => {
    fetchTrip()
  }, [])
 
  const fetchTrip = async () => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.log("Error:", error)
    setLoading(false)
    return
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone_number, address")
    .eq("id", data.traveler_id)
    .single()

  // Fetch traveler_details for profile photo
  const { data: travelerDetails } = await supabase
    .from("traveler_details")
    .select("profile_photo_url")
    .eq("profile_id", data.traveler_id)
    .single()

  setTrip({ ...data, profiles: profile, traveler_details: travelerDetails })
  setLoading(false)
}


  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setItemImage(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  const handleBooking = async () => {
    setError("")

    if (!kgNeeded || !itemDescription) {
      setError("Please fill in all required fields")
      return
    }

    if (parseFloat(kgNeeded) > trip.available_kg) {
      setError(`Maximum available weight is ${trip.available_kg} KG`)
      return
    }

    setBooking(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError("You must be logged in to book")
      setBooking(false)
      return
    }

    let item_image_url = ""

    // Upload item image if provided
    if (itemImage) {
      const fileExt = itemImage.name.split(".").pop()
      const uploadName = `${user.id}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("item-images")
        .upload(uploadName, itemImage)

      if (uploadError) {
        setError("Failed to upload image. Please try again.")
        setBooking(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from("item-images")
        .getPublicUrl(uploadName)

      item_image_url = urlData.publicUrl
    }

    // Save booking
    const { error: bookingError } = await supabase
      .from("bookings")
      .insert({
        trip_id: trip.id,
        customer_id: user.id,
        kg_requested: parseFloat(kgNeeded),
        item_description: itemDescription,
        item_image_url,
      })

    if (bookingError) {
      console.log("Booking error:", bookingError)
      setError("Failed to submit booking. Please try again.")
      setBooking(false)
      return
    }

    setBooking(false)
    setBooked(true)
  }

  const googleMapsLink = (location: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdfaf7]">
   
        <div className="flex items-center justify-center py-40">
          <p className="text-gray-400">Loading trip details...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!trip) {
    return (
      <main className="min-h-screen bg-[#fdfaf7]">
    
        <div className="flex items-center justify-center py-40">
          <p className="text-gray-400">Trip not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
  
      </div>

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
                  {trip.traveler_details?.profile_photo_url ? (
  <img
    src={trip.traveler_details.profile_photo_url}
    alt={trip.profiles?.full_name || "Traveler"}
    className="w-24 h-24 rounded-2xl object-cover border-4 border-[#f5c842]"
  />
) : (
  <div className="w-24 h-24 rounded-2xl bg-[#2c4a1e] flex items-center justify-center border-4 border-[#f5c842]">
    <span className="text-white font-extrabold text-4xl">
      {trip.profiles?.full_name?.charAt(0) || "?"}
    </span>
  </div>
)}

                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#2c4a1e] flex items-center justify-center">
                    <Shield size={14} color="white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-extrabold text-[#2c2c2c]">
                      {trip.profiles?.full_name || "Unknown"}
                    </h2>
                    <span className="px-3 py-1 bg-green-100 text-[#2c4a1e] rounded-full text-xs font-bold">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    {trip.profiles?.address || "Gambia"}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star size={14} color="#f5c842" fill="#f5c842" />
                    <span className="font-bold text-sm text-[#2c2c2c]">5.0</span>
                    <span className="text-gray-400 text-sm">· Verified Traveler</span>
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
                  <p className="font-extrabold text-[#2c2c2c]">{trip.from_city}</p>
                  <p className="text-gray-400 text-xs">{trip.departure_date}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex-1 h-0.5 bg-gray-200"></div>
                  <div className="mx-3 w-8 h-8 rounded-full bg-[#f5c842] flex items-center justify-center">
                    <span className="text-xs">✈️</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-200"></div>
                </div>
                <div className="text-center">
                  <p className="font-extrabold text-[#2c2c2c]">{trip.to_city}</p>
                  <p className="text-gray-400 text-xs">{trip.arrival_date || "TBD"}</p>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h3 className="font-extrabold text-[#2c4a1e] mb-6 flex items-center gap-2">
                <Package size={18} /> Trip Details
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Available Weight", value: `${trip.available_kg} KG` },
                  { label: "Price Per KG", value: `D${trip.price_per_kg}` },
                  { label: "Accepted Items", value: trip.accepted_items },
                  { label: "Departure Date", value: trip.departure_date },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      {item.label}
                    </p>
                    <p className="font-semibold text-[#2c2c2c] text-sm">{item.value || "N/A"}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right - Booking Card */}
          <div className="w-80 shrink-0 sticky top-10">
            {!booked ? (
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

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <p className="text-red-600 text-xs">{error}</p>
                  </div>
                )}

                {/* KG Needed */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    KG Needed *
                  </label>
                  <input
                    type="number"
                    placeholder={`Max ${trip.available_kg} KG`}
                    value={kgNeeded}
                    onChange={(e) => setKgNeeded(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                  />
                </div>

                {/* Item Description */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    What are you sending? *
                  </label>
                  <textarea
                    placeholder="Describe the items you are sending..."
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors resize-none"
                  />
                </div>

                {/* Item Image */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    Upload Item Photo
                  </label>
                  <label className="w-full flex flex-col items-center justify-center px-4 py-4 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#2c4a1e] transition-colors">
                    <Upload size={18} color="#2c4a1e" className="mb-1" />
                    <p className="text-xs font-semibold text-[#2c4a1e]">
                      {fileName || "Click to upload photo"}
                    </p>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Total Price */}
                {kgNeeded && (
                  <div className="bg-[#2c4a1e] rounded-xl p-4 text-center">
                    <p className="text-green-300 text-xs mb-1">Estimated Total</p>
                    <p className="text-white font-extrabold text-2xl">
                      D{(parseFloat(kgNeeded) * trip.price_per_kg).toFixed(0)}
                    </p>
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  disabled={booking}
                  className="w-full py-4 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all disabled:opacity-50"
                >
                  {booking ? "Submitting..." : "Book Now →"}
                </button>

                {/* Safety Note */}
                <div className="bg-green-50 rounded-xl p-4 flex items-start gap-2">
                  <Shield size={14} color="#2c4a1e" className="shrink-0 mt-0.5" />
                  <p className="text-xs text-[#2c4a1e] leading-relaxed">
                    This traveler is verified. Contact details will be shared after booking is accepted.
                  </p>
                </div>

              </div>
            ) : (

              /* Success State */
              <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Package size={28} color="#2c4a1e" />
                </div>
                <h3 className="text-xl font-extrabold text-[#2c4a1e] mb-2">
                  Booking Submitted! 🎉
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Your booking request has been sent to {trip.profiles?.full_name}. 
                  You will be notified once they accept.
                </p>
                <Link
                  href="/dashboard/customer"
                  className="block w-full py-3 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all text-center"
                >
                  View My Bookings
                </Link>
              </div>
            )}
          </div>

        </div>
      
      </section>

      <Footer />
    </main>
  )
}