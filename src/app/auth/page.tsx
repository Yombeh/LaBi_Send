"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    role: ""
  })
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    setError("")
    const { data, error } = await createClient().auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })

    if (error) {
      setError("Invalid email or password")
      return
    }

    if (data.session) {
      window.location.href = "/"
    }
  }

  const handleSignup = async () => {
      console.log("Signup clicked!")

    setError("")

    const { error } = await createClient().auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          role: "customer",
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          address: formData.address
        }
      }
    })

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      window.location.href = "/auth"
    }, 2700)
  }

  return (

  <main className="min-h-screen bg-gradient-to-br from-[#f5f0e8] to-[#e8ddd0] flex items-center justify-center p-5">
    <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-2xl">
      

  {/* Success Banner */}
  
  {success && (
    <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
      <span className="text-green-600 text-lg">✅</span>
      <p className="text-green-700 text-sm font-semibold">
        Account created successfully! Redirecting...
      </p>
    </div>
  )}
     <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-[#2c4a1e]"> LaBi_Send</h1>
        <p className="text-[#3d2f20] mt-2 text-sm]">  Connecting travellers and vendors across borders</p>

     </div>
      <div className= " flex bg-[#f5f0e8] rounded-lg p-1 mb-7" > 
          {["login","signup"].map(tab => (
        <button key= {tab} onClick = {() => setActiveTab(tab)} 
        className= {`flex-1 py-2 rounded-md front-semibold text-sm transition-all duration-200 ${
            activeTab === tab
            ? "bg-[#2c4a1e] text-white"
            : "text-[#8a7560] bg-transparent"
            }`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            
            </button>
    ))}
    </div>
    
   {activeTab === "login" && (
  <div className="flex flex-col gap-4">
        {error && (
  <p className="text-red-500 text-sm text-center">{error}</p>
)}
    
    <input
      name="email"
      type="email"
      placeholder="Email address"
      value={formData.email}
      onChange={handleChange}
      className="px-4 py-3 rounded-lg border border-[#e8ddd0] bg-[#fdfaf7] text-sm outline-none"
    />
    <input
      name="password"
      type="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="px-4 py-3 rounded-lg border border-[#e8ddd0] bg-[#fdfaf7] text-sm outline-none"
    />
    <button className="py-3 bg-[#2c4a1e] text-white rounded-lg font-bold text-sm mt-1" onClick={handleLogin}>
      Login
    </button>

  </div>
)}


{activeTab === "signup" && (
  <div className="flex flex-col gap-4">
    <input
      name="full_name"
      type="text"
      placeholder="Full name"
      value={formData.full_name}
      onChange={handleChange}
      className="px-4 py-3 rounded-lg border border-[#e8ddd0] bg-[#fdfaf7] text-sm outline-none"
    />
    <input
      name="email"
      type="email"
      placeholder="Email address"
      value={formData.email}
      onChange={handleChange}
      className="px-4 py-3 rounded-lg border border-[#e8ddd0] bg-[#fdfaf7] text-sm outline-none"
    />
    <input
      name="password"
      type="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="px-4 py-3 rounded-lg border border-[#e8ddd0] bg-[#fdfaf7] text-sm outline-none"
    />
    <input
      name="phone_number"
      type="tel"
      placeholder="Phone number"
      value={formData.phone_number}
      onChange={handleChange}
      className="px-4 py-3 rounded-lg border border-[#e8ddd0] bg-[#fdfaf7] text-sm outline-none"
    />
    <input
      name="address"
      type="text"
      placeholder="Address"
      value={formData.address}
      onChange={handleChange}
      className="px-4 py-3 rounded-lg border border-[#e8ddd0] bg-[#fdfaf7] text-sm outline-none"
    />
  
 <button 
  onClick={handleSignup}
  className="py-3 bg-[#2c4a1e] text-white rounded-lg font-bold text-sm mt-1"
>
  Create Account
</button>
   
  </div>
  
)}
    </div>
   
</main>)}