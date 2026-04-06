"use client"

import { useState } from "react"

export default function SearchCard() {
  const [activeTab, setActiveTab] = useState("connect")

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto">
      
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {["connect", "track"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold transition-all ${
              activeTab === tab
                ? "border-b-2 border-[#2c4a1e] text-[#2c4a1e]"
                : "text-gray-400"
            }`}
          >
            {tab === "connect" ? "Connect with Traveler" : "Track Package"}
          </button>
        ))}
      </div>

      {/* Connect with Traveler */}
      {activeTab === "connect" && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">From</label>
              <input
                type="text"
                placeholder="Current location"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">To</label>
              <input
                type="text"
                placeholder="Destination"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Earliest Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Latest Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none"
              />
            </div>
          </div>

          <button className="w-full  gap-2 bg-[#f5c842] text-[#2c4a1e] px-6 py-3 rounded-full font-bold text-sm hover:bg-yellow-400 transition-all">
            Find Travelers
          </button>
        </div>
      )}

      {/* Track Package */}
      {activeTab === "track" && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <p className="text-sm">Package tracking coming soon...</p>
        </div>
      )}

    </div>
  )
}