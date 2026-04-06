"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, HelpCircle, Shield, Lock, FileText, Phone } from "lucide-react"

export default function Navbar() {
    const [supportOpen, setSupportOpen] = useState(false)

  return (
    <nav className="absolute top-0 left-0 w-full px-10 py-5 flex items-center justify-between z-10">
      
      {/* Logo */}
      <Link href="/" className="text-3xl font-extrabold text-white tracking-wide">
        LaBi<span className="text-[#f5c842]">_Send</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-8 text-white text-base font-semibold">
        
        <Link href="/" className="hover:text-[#f5c842] transition-colors">
          Home
        </Link>
        <Link href="/about" className="hover:text-[#f5c842] transition-colors">
          About
        </Link>

        <Link href="/trips" className="hover:text-[#f5c842] transition-colors">
          Find Travelers
        </Link>
        
        <Link href="/become-traveller" className="hover:text-[#f5c842] transition-colors">
          Become Traveler
        </Link>

    

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

      {/* Right Buttons */}
      <div className="flex items-center gap-4">
        <Link
    href="/auth"
    className="px-6 py-2 border-2 border-white text-white rounded-full text-base font-bold hover:bg-[#f5c842] hover:text-[#2c4a1e] hover:border-[#f5c842] transition-all"
  >
    Login / Sign Up
  </Link>
      
      </div>
    </nav>
  )
}