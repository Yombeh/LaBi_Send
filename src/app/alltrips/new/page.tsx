 "use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Plane, Package, DollarSign, MapPin, Calendar, FileText } from "lucide-react"

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
    notes: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (formData.from_city && formData.to_city && formData.departure_date && formData.available_kg && formData.price_per_kg) {
      setSubmitted(true)
    }
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
                        Departing From
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
                        Destination
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
                        Departure Date
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
                    <DollarSign size={18} color="#2c4a1e" />
                    <h3 className="font-extrabold text-[#2c4a1e]">Capacity & Pricing</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Available Weight (KG)
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
                        Price Per KG (GMD)
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

                {/* Notes */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={18} color="#2c4a1e" />
                    <h3 className="font-extrabold text-[#2c4a1e]">Additional Notes</h3>
                  </div>
                  <textarea
                    name="notes"
                    placeholder="Any additional information customers should know about your trip..."
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all"
                >
                  List My Trip →
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
                Your trip from {formData.from_city} to {formData.to_city} is now 
                live on LaBi_Send. Customers can now find and book your available weight.
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
    </main>
  )
}