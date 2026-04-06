 "use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
    }
  }

  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="bg-[#2c4a1e] py-20 px-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
              <Mail size={40} color="#f5c842" />
            </div>
          </div>
          <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
            Get In Touch
          </p>
          <h1 className="text-5xl font-extrabold mb-4">
            We&apos;d love to <span className="text-[#f5c842] italic">hear from you.</span>
          </h1>
          <p className="text-green-200 text-lg leading-relaxed">
            Whether you have a question, a concern, or just want to say hello — 
            our team is always ready to listen and help.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-10">
        <div className="max-w-6xl mx-auto flex gap-16 items-start">

          {/* Left - Contact Info */}
          <div className="w-80 shrink-0">
            
            <h2 className="text-2xl font-extrabold text-[#2c2c2c] mb-8">
              Contact Information
            </h2>

            <div className="flex flex-col gap-6">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+220 3258735",
                  sub: "Mon - Fri, 8am - 6pm GMT"
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "support@labisend.com",
                  sub: "We reply within 24 hours"
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Banjul, The Gambia",
                  sub: "West Africa"
                },
                {
                  icon: Clock,
                  label: "Working Hours",
                  value: "Mon - Fri",
                  sub: "8:00 AM - 6:00 PM GMT"
                }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#2c4a1e] flex items-center justify-center shrink-0">
                      <Icon size={20} color="#f5c842" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                        {item.label}
                      </p>
                      <p className="font-extrabold text-[#da9e1d] text-sm">{item.value}</p>
                      <p className="text-gray-400 text-xs">{item.sub}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", href: "https://facebook.com/labisend" },
                  { label: "Instagram", href: "https://instagram.com/labisend" },
                  { label: "YouTube", href: "https://youtube.com/@labisend" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    className="px-4 py-2 bg-[#2c4a1e] text-white rounded-full text-xs font-semibold hover:bg-[#f5c842] hover:text-[#2c4a1e] transition-all"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="flex-1">
            {!submitted ? (
              <div className="bg-white rounded-3xl shadow-lg p-10">
                <h2 className="text-2xl font-extrabold text-[#2c2c2c] mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Fill in the form below and we will get back to you as soon as possible.
                </p>

                <div className="flex flex-col gap-5">
                  
                  {/* Name & Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                      />
                    </div>
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
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Issue</option>
                      <option value="payment">Payment Issue</option>
                      <option value="safety">Safety Concern</option>
                      <option value="traveler">Traveler Verification</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2c4a1e] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all"
                  >
                    <Send size={16} />
                    Send Message
                  </button>

                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Mail size={36} color="#2c4a1e" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#2c4a1e] mb-3">
                  Message Sent! 🎉
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
                  Thank you for reaching out. Our team has received your message 
                  and will get back to you within 24 hours at {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: "", email: "", subject: "", message: "" })
                  }}
                  className="px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm hover:bg-green-800 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 px-10 bg-[#f5f0e8] text-center">
        <h2 className="text-2xl font-extrabold text-[#2c4a1e] mb-3">
          Looking for quick answers?
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Check our FAQ page — your question might already be answered there.
        </p>
        <a
          href="/faq"
          className="inline-block px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm hover:bg-green-800 transition-all"
        >
          View FAQ →
        </a>
      </section>

      <Footer />
    </main>
  )
}