 "use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import { Lock, Eye, Database, Share2, UserCheck, Bell } from "lucide-react"

const sections = [
  {
    id: "collection",
    icon: Database,
    title: "What We Collect",
    content: `When you create an account on LaBi_Send, we collect the following information:

- Full name, email address, phone number and physical address
- Profile photo and ID or passport details (for travelers only)
- Trip details including destinations, dates and luggage capacity
- Booking history and transaction records
- Device information and IP address for security purposes
- Location data when you are actively using the tracking feature

We only collect information that is necessary to provide you with a safe and reliable service. We do not collect any information beyond what is listed above.`
  },
  {
    id: "use",
    icon: Eye,
    title: "How We Use Your Data",
    content: `Your data is used exclusively to provide and improve the LaBi_Send service:

- To create and manage your account
- To connect customers with verified travelers
- To process bookings and facilitate payments
- To provide real-time package tracking through Google Maps
- To verify traveler identities and maintain platform safety
- To send you booking confirmations and important notifications
- To improve our platform based on how you use it
- To comply with legal obligations and prevent fraud

We will never use your data for purposes beyond what is listed here without your explicit consent.`
  },
  {
    id: "sharing",
    icon: Share2,
    title: "Who We Share It With",
    content: `LaBi_Send does not sell your personal data to any third party. We only share your information in the following limited circumstances:

- With the traveler or customer you are matched with — only the information necessary to complete the booking such as name and contact details
- With Supabase, our secure database provider, who stores your data under strict data protection standards
- With Google Maps for location tracking features — only when actively in use
- With Wave for payment processing — only transaction relevant data
- With law enforcement or regulatory authorities if legally required to do so

All third parties we work with are bound by strict data protection agreements.`
  },
  {
    id: "security",
    icon: Lock,
    title: "How We Protect It",
    content: `We take the security of your personal data seriously and have implemented the following measures:

- All data is encrypted in transit using industry standard SSL/TLS encryption
- Passwords are hashed and never stored in plain text
- Our database is hosted on Supabase with Row Level Security ensuring users can only access their own data
- Admin access to sensitive data is strictly controlled and logged
- Traveler ID documents are stored securely and only accessible to verified admins
- We conduct regular security reviews of our platform

Despite our best efforts, no system is 100% secure. We encourage you to use a strong password and never share your login details with anyone.`
  },
  {
    id: "rights",
    icon: UserCheck,
    title: "Your Rights",
    content: `As a LaBi_Send user you have the following rights over your personal data:

- Right to Access — you can request a copy of all data we hold about you at any time
- Right to Correction — you can update or correct your personal information through your profile settings
- Right to Deletion — you can request that we delete your account and all associated data
- Right to Portability — you can request your data in a portable format
- Right to Object — you can object to how we process your data in certain circumstances
- Right to Withdraw Consent — you can withdraw consent for optional data processing at any time

To exercise any of these rights, contact us at support@labisend.com and we will respond within 30 days.`
  },
  {
    id: "updates",
    icon: Bell,
    title: "Policy Updates",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. When we make significant changes we will:

- Notify you by email at the address associated with your account
- Display a prominent notice on the LaBi_Send platform
- Update the effective date at the top of this policy

Your continued use of LaBi_Send after any changes constitutes your acceptance of the updated policy. We encourage you to review this policy periodically.

This Privacy Policy was last updated on January 1, 2025 and is effective immediately upon posting.`
  }
]

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("collection")

  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

     {/* Hero */}
      <section className="bg-[#1a1a2e] py-20 px-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
              <Lock size={40} color="#f5c842" />
            </div>
          </div>
          <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
            Your Privacy Matters
          </p>
          <h1 className="text-5xl font-extrabold mb-4">
            Privacy <span className="text-[#f5c842] italic">Policy</span>
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed">
            At LaBi_Send we believe you have the right to know exactly what data 
            we collect, why we collect it, and how we protect it. This policy is 
            written in plain language so everyone can understand it.
          </p>
          <p className="text-blue-300 text-xs mt-4">
            Effective Date: January 1, 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-10">
        <div className="max-w-6xl mx-auto flex gap-10">

          {/* Sidebar Navigation */}
          <div className="w-64 shrink-0">
            <div className="sticky top-10 bg-white rounded-2xl shadow-md p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-2">
                Jump to Section
              </p>
              <div className="flex flex-col gap-1">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                         setActiveSection(section.id)
                         document.getElementById(section.id)?.scrollIntoView({ 
                          behavior: "smooth" 
                            })
                                  }}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                        activeSection === section.id
                          ? "bg-[#2c4a1e] text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={16} />
                      {section.title}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <div
                  key={section.id}
                  id={section.id}
                  className={`bg-white rounded-2xl shadow-sm p-8 mb-6 border-l-4 transition-all ${
                    activeSection === section.id
                      ? "border-[#2c4a1e] shadow-md"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#2c4a1e15] flex items-center justify-center">
                      <Icon size={20} color="#2c4a1e" />
                    </div>
                    <h2 className="text-xl font-extrabold text-[#2c2c2c]">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-10 bg-[#1a1a2e] text-center text-white">
        <h2 className="text-3xl font-extrabold mb-4">
          Questions about your privacy?
        </h2>
        <p className="text-blue-200 text-sm mb-8 max-w-md mx-auto">
          We are committed to transparency. If you have any questions about how 
          we handle your data, do not hesitate to reach out.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/contact"
            className="px-8 py-3 bg-[#f5c842] text-[#1a1a2e] rounded-full font-bold text-sm hover:bg-yellow-400 transition-all"
          >
            Contact Us →
          </a>
          <a
            href="/auth"
            className="px-8 py-3 border-2 border-white text-white rounded-full font-bold text-sm hover:bg-white hover:text-[#1a1a2e] transition-all"
          >
            Create Account
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}