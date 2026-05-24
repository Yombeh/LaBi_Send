"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import { Wallet, Plane, Shield, Users, Zap, Package, Upload } from "lucide-react"
import { createClient } from "@/lib/supabase"
import Link from "next/link"



export default function BecomeTravelerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<{ id: string; name: string } | null>(null)
  const [alreadyApplied, setAlreadyApplied] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [profilePhotoName, setProfilePhotoName] = useState("")
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()

      if (authUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", authUser.id)
          .single()

        if (profile) {
          setUser({ id: authUser.id, name: profile.full_name })

          // Check if already a traveler
          if (profile.role === "traveler") {
            setAlreadyApplied(true)
            return
          }

          // Check if already applied
          const { data: existing } = await supabase
            .from("traveler_details")
            .select("id, status")
            .eq("profile_id", authUser.id)
            .single()

          if (existing) {
            setAlreadyApplied(true)
          }
        }
      }
    }

    checkUser()
  }, [])
  const handleProfilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0]
    setProfilePhoto(file)
    setProfilePhotoName(file.name)
    // Create preview
    const reader = new FileReader()
    reader.onload = () => setProfilePhotoPreview(reader.result as string)
    reader.readAsDataURL(file)
  }
}
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0]
      
      // Check file size — max 5MB
      if (selected.size > 5 * 1024 * 1024) {
        setError("File is too large. Maximum size is 5MB.")
        return
      }

      setFile(selected)
      setFileName(selected.name)
      setError("")
    }
  }

const handleSubmit = async () => {
  setError("")

  if (!user) {
    setError("You must be logged in to apply.")
    return
  }

  if (!file) {
    setError("Please upload your ID or passport document.")
    return
  }

  setLoading(true)

  try {
    const supabase = createClient()

    // Step 1 — Upload ID document
    const fileExt = file.name.split(".").pop()
    const filePath = `${user.id}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("traveller-documents")
      .upload(filePath, file)

    if (uploadError) {
      setError(uploadError.message)
      setLoading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from("traveller-documents")
      .getPublicUrl(filePath)

    const documentUrl = urlData.publicUrl

    // Step 2 — Upload profile photo if provided
    let profilePhotoUrl = null

    if (profilePhoto) {
      const photoExt = profilePhoto.name.split(".").pop()
      const photoPath = `profile-${user.id}-${Date.now()}.${photoExt}`

      const { error: photoUploadError } = await supabase.storage
        .from("traveller-documents")
        .upload(photoPath, profilePhoto)

      if (photoUploadError) {
        setError(photoUploadError.message)
        setLoading(false)
        return
      }

      const { data: photoUrlData } = supabase.storage
        .from("traveller-documents")
        .getPublicUrl(photoPath)

      profilePhotoUrl = photoUrlData.publicUrl
    }

    // Step 3 — Save to traveler_details table
    const { error: dbError } = await supabase
      .from("traveler_details")
      .insert({
        profile_id: user.id,
        id_document_url: documentUrl,
        profile_photo_url: profilePhotoUrl,
        status: "pending"
      })

    if (dbError) {
      setError(dbError.message)
      setLoading(false)
      return
    }

    setSubmitted(true)

  } catch {
    setError("Something went wrong. Please try again.")
  }

  setLoading(false)
}

  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="bg-[#2c4a1e] pt-20 pb-16 px-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4 pt-10">
            Join Our Traveler Network
          </p>
          <h1 className="text-5xl font-extrabold mb-4">
            Turn Every Journey Into <br />
            <span className="text-[#f5c842] italic">An Opportunity.</span>
          </h1>
          <p className="text-green-200 text-lg leading-relaxed">
            You are already traveling. Let LaBi_Send help you earn from the
            luggage space you were never going to use anyway.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-10 bg-[#fdfaf7]">
        <div className="max-w-xl mx-auto">

          {/* Already applied or already a traveler */}
          {alreadyApplied ? (
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-6">
                <Shield size={36} color="#2c4a1e" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#2c4a1e] mb-3">
                Application Already Submitted
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                You have already applied to become a traveler. Our admin team 
                is reviewing your application. You will be notified once approved.
              </p>
              <Link
                href="/"
                className="px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm hover:bg-green-800 transition-all"
              >
                Back to Home
              </Link>
            </div>

          ) : !submitted ? (
            <div className="bg-white rounded-3xl shadow-lg p-10">

              {/* Form Header */}
              <div className="text-center mb-10">
                <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-2">
                  Apply Now
                </p>
                <h2 className="text-3xl font-extrabold text-[#2c4a1e]">
                  Verify Your Identity
                </h2>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  Upload a clear photo or scan of your ID card or passport. 
                  Our admin team will review it within 24 to 48 hours.
                </p>
              </div>

              {/* Not logged in warning */}
              {!user && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-center">
                  <p className="text-sm text-yellow-700 font-semibold">
                    You need to be logged in to apply.{" "}
                    <Link href="/auth" className="underline">
                      Login or Sign Up
                    </Link>
                  </p>
                </div>
              )}
              {/* Profile Photo */}
     <div>
     <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
    Profile Photo
    </label>
    <div className="flex items-center gap-6">
    {/* Preview */}
     <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center bg-[#fdfaf7] shrink-0">
      {profilePhotoPreview ? (
        <img
          src={profilePhotoPreview}
          alt="Profile preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-300 text-3xl">👤</span>
      )}
     </div>
     {/* Upload */}
    <label className="flex-1 flex flex-col items-center justify-center px-4 py-6 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#2c4a1e] transition-colors">
      <p className="text-sm font-semibold text-[#2c4a1e]">
        {profilePhotoName || "Click to upload profile photo"}
      </p>
      <p className="text-xs text-gray-400 mt-1">PNG or JPG up to 5MB</p>
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={handleProfilePhoto}
        className="hidden"
      />
    </label>
  </div>
</div>
              {/* File Upload */}
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">
                  ID Card or Passport Document
                </label>
                <label className="w-full flex flex-col items-center justify-center px-4 py-10 rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#2c4a1e] transition-colors">
                  <div className="w-16 h-16 rounded-full bg-[#f5f0e8] flex items-center justify-center mb-4">
                    <Upload size={28} color="#2c4a1e" />
                  </div>
                  {fileName ? (
                    <>
                      <p className="text-sm font-bold text-[#2c4a1e]">{fileName}</p>
                      <p className="text-xs text-gray-400 mt-1">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-[#2c4a1e]">
                        Click to upload your document
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG or PDF — max 5MB
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFile}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}

              {/* Terms */}
              <p className="text-xs text-gray-400 text-center mb-6">
                By submitting you agree to our{" "}
                <Link href="/terms" className="text-[#2c4a1e] font-semibold underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/safety" className="text-[#2c4a1e] font-semibold underline">
                  Safety Guide
                </Link>
              </p>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading || !user}
                className="w-full py-4 bg-[#2c4a1e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Application →"}
              </button>

            </div>

          ) : (

            /* Success */
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Shield size={40} color="#2c4a1e" />
              </div>
              <h2 className="text-3xl font-extrabold text-[#2c4a1e] mb-3">
                Application Submitted! 🎉
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
                Thank you {user?.name.split(" ")[0]}! Our admin team will review 
                your document and get back to you within 24 to 48 hours. In Sha Allah!
              </p>
              <Link
                href="/"
                className="px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm hover:bg-green-800 transition-all"
              >
                Back to Home
              </Link>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}
