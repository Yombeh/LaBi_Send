"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown, HelpCircle, Shield, Lock, FileText, Phone, Rocket } from "lucide-react"
import { createClient } from "@/lib/supabase"

export default function Navbar() {
  const [supportOpen, setSupportOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()

      if (authUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", authUser.id)
          .single()

        if (profile) {
          setUser({
            name: profile.full_name || "User",
            role: profile.role
          })
        }
      }
    }

    fetchUser()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = "/"
  }

  return (
    <nav className="absolute top-0 left-0 w-full px-10 py-5 flex items-center justify-between z-10">

      {/* Logo */}
      <Link href="/" className="text-3xl font-extrabold text-white tracking-wide">
        LaBi<span className="text-[#f5c842]">_Send</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-8 text-white text-base font-semibold">

        <Link href="/dashboard/customer/bookings" className="hover:text-[#f5c842] transition-colors">
          Bookings
        </Link>
         
          <Link href="/about" className="hover:text-[#f5c842] transition-colors">
          About
        </Link> 

        <Link href="/trips" className="hover:text-[#f5c842] transition-colors">
          Find Travelers
        </Link>


       

        {/* Traveler only */}
        {user?.role === "traveler" && (
          <Link href="/alltrips/new" className="text-[#f5c842] font-bold hover:text-yellow-300 transition-colors">
            ✈️ List a Trip
          </Link>
          
        )}

        
        {/* Traveler only */}
        {user?.role === "traveler" && (
          <Link href="/become-traveller/customer-list" className="text-[#f5c842] font-bold hover:text-yellow-300 transition-colors">
            ✈️ My Trip
          </Link>
          
        )}

        {/* Admin only */}
        {user?.role === "admin" && (
          <Link href="/admin" className="text-[#f5c842] font-bold hover:text-yellow-300 transition-colors">
            🛡️ Admin Panel
          </Link>
        )}

        {/* Support Dropdown */}
        <div className="relative">
          <button
            onClick={() => setSupportOpen(!supportOpen)}
            className="flex items-center gap-1 hover:text-[#f5c842] transition-colors"
          >
            Support
            <ChevronDown
              size={16}
              className={`transition-transform ${supportOpen ? "rotate-180" : ""}`}
            />
          </button>

          {supportOpen && (
            <div className="absolute top-10 left-0 bg-white rounded-2xl shadow-2xl p-3 w-56 flex flex-col gap-1">
              {[
                { label: "FAQ", href: "/faq", icon: HelpCircle },
                { label: "Safety Guide", href: "/safety", icon: Shield },
                { label: "Privacy Policy", href: "/privacy", icon: Lock },
                { label: "Terms of Service", href: "/terms", icon: FileText },
                { label: "Contact Us", href: "/contact", icon: Phone },
                { label: "Plan", href: "/future", icon: Rocket },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSupportOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-[#2c4a1e] hover:text-white transition-all"
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {user ? (
          /* Logged in */
          <>
            <span className="text-white text-base font-bold">
              Welcome, {user.name.split(" ")[0]}
            </span>
            <button
              onClick={handleSignOut}
              className="px-6 py-2 border-2 border-white text-white rounded-full text-base font-bold hover:bg-red-500 hover:border-red-500 transition-all"
            >
              Sign Out
            </button>
          </>
        ) : (
          /* Not logged in */
          <>
            <Link
              href="/auth"
              className="px-6 py-2 border-2 border-white text-white rounded-full text-base font-bold hover:bg-[#f5c842] hover:text-[#2c4a1e] hover:border-[#f5c842] transition-all"
            >
              Login / Sign Up
            </Link>
       
          </>
        )}

      </div>
    </nav>
  )
}