"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Users, Clock, CheckCircle, XCircle, Eye, LogOut } from "lucide-react"


export default function AdminPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [trips, setTrips] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null)
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("applications")
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchApplications()
    fetchTrips()
  }, [])

  const fetchApplications = async () => {
    setLoading(true)
    const response = await fetch("/api/admin/applications")
    const data = await response.json()
    setApplications(data || [])
    setLoading(false)
  }

  const fetchTrips = async () => {
    const response = await fetch("/api/admin/trips")
    const data = await response.json()
    setTrips(data || [])
  }

  const updateStatus = async (id: string, status: string, profileId: string) => {
    const role = status === "approved" ? "traveler" : "customer"

    await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, profile_id: profileId, role })
    })

    await fetchApplications()
    setSelected(null)
  }

  const updateTripStatus = async (id: string, status: string) => {
    if (updating) return
    setUpdating(true)

    await fetch("/api/admin/trips", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    })

    await fetchTrips()
    setSelectedTrip(null)
    setUpdating(false)
  }

  const filtered = filter === "all"
    ? applications
    : applications.filter(app => app.status === filter)

  const counts = {
    all: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    approved: applications.filter(a => a.status === "approved").length,
    waiting: applications.filter(a => a.status === "waiting").length,
    denied: applications.filter(a => a.status === "denied").length,
  }

  const tripCounts = {
    all: trips.length,
    pending: trips.filter(t => t.status === "pending").length,
    active: trips.filter(t => t.status === "active").length,
    denied: trips.filter(t => t.status === "denied").length,
  }

  const statusStyle = (status: string) => {
    switch (status) {
      case "approved":
      case "active": return "bg-green-100 text-green-700"
      case "denied": return "bg-red-100 text-red-700"
      case "waiting": return "bg-yellow-100 text-yellow-700"
      default: return "bg-gray-100 text-gray-600"
    }
  }
  

  return (
    <main className="min-h-screen bg-[#f5f0e8]">

      {/* Admin Navbar */}
      <nav className="bg-[#2c4a1e] px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#f5c842] flex items-center justify-center">
            <Shield size={16} color="#2c4a1e" />
          </div>
          <div>
            <h1 className="text-white font-extrabold text-lg leading-none">
              LaBi<span className="text-[#f5c842]">_Send</span>
            </h1>
            <p className="text-green-400 text-xs">Admin Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-green-300 text-sm">Welcome, Admin</p>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 border border-green-700 text-green-300 rounded-full text-xs font-semibold hover:bg-white/10 transition-all"
          >
            <LogOut size={14} />
            Exit
          </Link>
        </div>
      </nav>

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 p-6 shrink-0">

          {/* Tab Switch */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("applications")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "applications"
                  ? "bg-[#2c4a1e] text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab("trips")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "trips"
                  ? "bg-[#2c4a1e] text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Trips
            </button>
          </div>

          {/* Application Filters */}
          {activeTab === "applications" && (
            <>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Filter Applications
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "All Applications", value: "all", icon: Users, count: counts.all },
                  { label: "Pending", value: "pending", icon: Clock, count: counts.pending },
                  { label: "Approved", value: "approved", icon: CheckCircle, count: counts.approved },
                  { label: "Waiting List", value: "waiting", icon: Clock, count: counts.waiting },
                  { label: "Denied", value: "denied", icon: XCircle, count: counts.denied },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.value}
                      onClick={() => setFilter(item.value)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        filter === item.value
                          ? "bg-[#2c4a1e] text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} />
                        {item.label}
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        filter === item.value
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {item.count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {/* Trip Filters */}
          {activeTab === "trips" && (
            <>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Trip Stats
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Total Trips", value: tripCounts.all, color: "text-[#2c4a1e]" },
                  { label: "Pending Review", value: tripCounts.pending, color: "text-yellow-600" },
                  { label: "Active", value: tripCounts.active, color: "text-green-600" },
                  { label: "Denied", value: tripCounts.denied, color: "text-red-600" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 text-sm">{item.label}</span>
                    <span className={`font-extrabold text-sm ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Quick Stats */}
          <div className="mt-8 bg-[#2c4a1e] rounded-2xl p-4">
            <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-3">
              Quick Stats
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-green-200 text-xs">Total Applications</span>
                <span className="text-white font-bold text-xs">{counts.all}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200 text-xs">Pending Review</span>
                <span className="text-[#f5c842] font-bold text-xs">{counts.pending}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200 text-xs">Approved Travelers</span>
                <span className="text-green-300 font-bold text-xs">{counts.approved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200 text-xs">Active Trips</span>
                <span className="text-green-300 font-bold text-xs">{tripCounts.active}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#2c4a1e]">
                {activeTab === "applications" ? "Traveler Applications" : "Trip Listings"}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {activeTab === "applications"
                  ? "Review and manage all traveler applications"
                  : "Review and approve traveler trip listings"
                }
              </p>
            </div>
          </div>

          {/* Applications Table */}
          {activeTab === "applications" && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#2c4a1e]">
                    {["Applicant", "Phone", "ID Number", "Date", "Status", "Action"].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-bold text-green-200 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-16 text-gray-400 text-sm">
                        Loading applications...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-16 text-gray-400 text-sm">
                        No applications in this category
                      </td>
                    </tr>
                  ) : (
                    filtered.map((app, index) => (
                      <tr
                        key={app.id}
                        className={`border-b border-gray-50 hover:bg-[#fdfaf7] transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#2c4a1e] flex items-center justify-center shrink-0">
                              <span className="text-white font-bold text-sm">
                                {app.profiles?.full_name?.charAt(0) || "?"}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-[#2c2c2c] text-sm">
                                {app.profiles?.full_name || "Unknown"}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {app.profiles?.address || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">
                            {app.profiles?.phone_number || "N/A"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-mono text-gray-600">
                            {app.id_number || "N/A"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-gray-400">
                            {new Date(app.created_at).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusStyle(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelected(app)}
                            className="flex items-center gap-1 px-4 py-2 bg-[#2c4a1e] text-white rounded-full text-xs font-bold hover:bg-green-800 transition-all"
                          >
                            <Eye size={12} />
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Trips Table */}
          {activeTab === "trips" && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#2c4a1e]">
                    {["Traveler", "Route", "Date", "KG", "Price/KG", "Status", "Action"].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-bold text-green-200 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trips.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-gray-400 text-sm">
                        No trips submitted yet
                      </td>
                    </tr>
                  ) : (
                    trips.map((trip, index) => (
                      <tr
                        key={trip.id}
                        className={`border-b border-gray-50 hover:bg-[#fdfaf7] transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#2c4a1e] flex items-center justify-center shrink-0">
                              <span className="text-white font-bold text-sm">
                                {trip.profiles?.full_name?.charAt(0) || "?"}
                              </span>
                            </div>
                            <p className="font-semibold text-[#2c2c2c] text-sm">
                              {trip.profiles?.full_name || "Unknown"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">
                            {trip.from_city} → {trip.to_city}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-gray-400">{trip.departure_date}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">{trip.available_kg} KG</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">D{trip.price_per_kg}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusStyle(trip.status)}`}>
                            {trip.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedTrip(trip)}
                            className="flex items-center gap-1 px-4 py-2 bg-[#2c4a1e] text-white rounded-full text-xs font-bold hover:bg-green-800 transition-all"
                          >
                            <Eye size={12} />
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Application Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="bg-[#2c4a1e] rounded-t-3xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#f5c842] flex items-center justify-center">
                  <span className="text-[#2c4a1e] font-extrabold text-lg">
                    {selected.profiles?.full_name?.charAt(0) || "?"}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-lg">
                    {selected.profiles?.full_name || "Unknown"}
                  </h3>
                  <p className="text-green-300 text-xs">
                    {selected.profiles?.address || "N/A"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-green-300 hover:text-white transition-colors text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">

              <div className="flex justify-center">
                <span className={`px-4 py-2 rounded-full text-sm font-bold capitalize ${statusStyle(selected.status)}`}>
                  Current Status: {selected.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: selected.profiles?.full_name },
                  { label: "Phone Number", value: selected.profiles?.phone_number },
                  { label: "Address", value: selected.profiles?.address },
                  { label: "ID Number", value: selected.id_number },
                  { label: "Application Date", value: new Date(selected.created_at).toLocaleDateString() },
                  { label: "Status", value: selected.status },
                ].map((item) => (
                  <div key={item.label} className="bg-[#fdfaf7] rounded-xl p-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-[#2c2c2c]">{item.value || "N/A"}</p>
                  </div>
                ))}
              </div>

              {selected.id_document_url && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    ID Document
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-gray-200 h-48">
                    <img
                      src={selected.id_document_url}
                      alt="ID Document"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 mt-2">
                <button
                  onClick={() => updateStatus(selected.id, "approved", selected.profile_id)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    selected.status === "approved"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-700 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  <CheckCircle size={16} />
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(selected.id, "waiting", selected.profile_id)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    selected.status === "waiting"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-500 hover:text-white"
                  }`}
                >
                  <Clock size={16} />
                  Waiting List
                </button>
                <button
                  onClick={() => updateStatus(selected.id, "denied", selected.profile_id)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    selected.status === "denied"
                      ? "bg-red-600 text-white"
                      : "bg-red-100 text-red-700 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  <XCircle size={16} />
                  Deny
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Trip Detail Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="bg-[#2c4a1e] rounded-t-3xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#f5c842] flex items-center justify-center">
                  <span className="text-[#2c4a1e] font-extrabold text-lg">✈️</span>
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-lg">
                    {selectedTrip.from_city} → {selectedTrip.to_city}
                  </h3>
                  <p className="text-green-300 text-xs">
                    {selectedTrip.profiles?.full_name || "Unknown Traveler"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrip(null)}
                className="text-green-300 hover:text-white transition-colors text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">

              <div className="flex justify-center">
                <span className={`px-4 py-2 rounded-full text-sm font-bold capitalize ${statusStyle(selectedTrip.status)}`}>
                  Current Status: {selectedTrip.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Traveler", value: selectedTrip.profiles?.full_name },
                  { label: "Phone", value: selectedTrip.profiles?.phone_number },
                  { label: "From", value: selectedTrip.from_city },
                  { label: "To", value: selectedTrip.to_city },
                  { label: "Departure", value: selectedTrip.departure_date },
                  { label: "Arrival", value: selectedTrip.arrival_date },
                  { label: "Available KG", value: `${selectedTrip.available_kg} KG` },
                  { label: "Price Per KG", value: `D${selectedTrip.price_per_kg}` },
                  { label: "Accepted Items", value: selectedTrip.accepted_items },
                  { label: "Pickup", value: selectedTrip.pickup_location },
                  { label: "Dropoff", value: selectedTrip.dropoff_location },
                ].map((item) => (
                  <div key={item.label} className="bg-[#fdfaf7] rounded-xl p-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-[#2c2c2c]">{item.value || "N/A"}</p>
                  </div>
                ))}
              </div>

              {selectedTrip.flight_ticket_url && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Flight Ticket
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-gray-200 h-48">
                    <img
                      src={selectedTrip.flight_ticket_url}
                      alt="Flight Ticket"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 mt-2">
                <button
                  onClick={() => updateTripStatus(selectedTrip.id, "active")}
                   disabled={updating}
                  className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    selectedTrip.status === "active"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-700 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  <CheckCircle size={16} />
                  Approve
                </button>
                <button
                  onClick={() => updateTripStatus(selectedTrip.id, "pending")}
                   disabled={updating}
                  className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    selectedTrip.status === "pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-500 hover:text-white"
                  }`}
                >
                  <Clock size={16} />
                  Pending
                </button>
                <button
                  onClick={() => updateTripStatus(selectedTrip.id, "denied")}
                   disabled={updating}
                  className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    selectedTrip.status === "denied"
                      ? "bg-red-600 text-white"
                      : "bg-red-100 text-red-700 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  <XCircle size={16} />
                  Deny
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  )
}