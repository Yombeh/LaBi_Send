 "use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Wallet, Plane, Shield, Users, Zap, Package } from "lucide-react"

const benefits = [
  {
    icon: Wallet,
    title: "Earn Extra Income",
    description: "Turn your spare luggage weight into real cash. Every KG you carry is money in your pocket.",
    bg: "bg-[#2c4a1e]",
    text: "text-white",
    size: ""
  },
  {
    icon: Plane,
    title: "Travel on Your Schedule",
    description: "List trips whenever you want. No fixed schedules, no obligations.",
    bg: "bg-[#f5c842]",
    text: "text-[#2c4a1e]",
    size: ""
  },
  {
    icon: Shield,
    title: "Fully Protected",
    description: "Our safety guide keeps you legally safe at every border crossing.",
    bg: "bg-[#fdfaf7]",
    text: "text-[#2c4a1e]",
    size: ""
  },
  
 
]

export default function BecomeTravelerPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    id_number: "",
    photo: null as File | null
  })

  const [submitted, setSubmitted] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] })
      setFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = () => {
    if (formData.full_name && formData.email && formData.phone_number && formData.id_number) {
      setSubmitted(true)
    }
  }

  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="bg-[#2c4a1e] py-8 px-8 text-white text-center">
        <div className="max-w-3xl mx-auto">
        <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-2 pt-10">
            Join Our Traveler Network
          </p>
          <h1 className="text-4xl font-extrabold">
            Turn Every Journey Into <br />
            <span className="text-[#f5c842] italic">An Opportunity.</span>
          </h1>
          
        </div>
      </section>

      {/* Benefits - Pinterest Grid */}
      <section className="py-4 px-10 bg-white">
        <div className="max-w-5xl mx-auto">
         

          <div className="grid grid-cols-3 gap-4 auto-rows-[180px]">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className={`${benefit.bg} ${benefit.text} ${benefit.size} rounded-3xl p-6 flex flex-col justify-between`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold leading-tight">{benefit.title}</h3>
              
                  </div>
                  <div>
                    <h3 className="">{benefit.description}</h3>
              
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-10 px-10 bg-[#fdfaf7]">
        <div className="max-w-2xl mx-auto">
          
          {!submitted ? (
            <div className="bg-white rounded-3xl shadow-lg p-10">
              
              {/* Form Header */}
              <div className="text-center mb-10">
                <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-2">
                  Apply Now
                </p>
                <h2 className="text-3xl font-extrabold text-[#2c4a1e]">
                  Start Your Application
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Fill in your details below. Our admin team will review and 
                  get back to you within 24 to 48 hours.
                </p>
              </div>

              <div className="flex flex-col gap-5">

                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    Full Name
                  </label>
                  <input
                    name="full_name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      name="phone_number"
                      type="tel"
                      placeholder="+220 XXXXXXX"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                    />
                  </div>
                </div>

                {/* ID Number */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    ID / Passport Number
                  </label>
                  <input
                    name="id_number"
                    type="text"
                    placeholder="Enter your ID or passport number"
                    value={formData.id_number}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                  />
                </div>

                {/* ID Document Upload */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                     Passport Photo
                  </label>
                  <label className="w-full flex flex-col items-center justify-center px-4 py-8 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#2c4a1e] transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#f5f0e8] flex items-center justify-center mb-3">
                      <Package size={20} color="#2c4a1e" />
                    </div>
                    <p className="text-sm font-semibold text-[#2c4a1e]">
                      {fileName || "Click to upload your document"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG or JPGup to 5MB
                    </p>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-400 text-center">
                  By submitting this application you agree to our{" "}
                  <a href="/terms" className="text-[#2c4a1e] font-semibold underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/safety" className="text-[#2c4a1e] font-semibold underline">
                    Safety Guide
                  </a>
                </p>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all"
                >
                  Submit Application →
                </button>

              </div>
            </div>

          ) : (

            /* Success State */
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Shield size={40} color="#2c4a1e" />
              </div>
              <h2 className="text-3xl font-extrabold text-[#2c4a1e] mb-3">
                Application Submitted! 🎉
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
                Thank you {formData.full_name}! Our admin team will review your 
                application and get back to you at {formData.email} within 
                24 to 48 hours.
              </p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
             <Link
                   href="/"
                       className="px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm hover:bg-green-800 transition-all"
               >
                  Back to Home
                 </Link>
                 <Link
                  href="/faq"
                  className="px-8 py-3 border-2 border-[#2c4a1e] text-[#2c4a1e] rounded-full font-bold text-sm hover:bg-[#2c4a1e] hover:text-white transition-all"
                      >
                        View FAQ
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