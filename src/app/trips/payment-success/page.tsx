import Link from "next/link"
import { CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      <section className="py-24 px-10 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-lg p-12 max-w-lg w-full text-center">
          
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} color="#2c4a1e" />
          </div>

          <h1 className="text-3xl font-extrabold text-[#2c4a1e] mb-3">
            Payment Successful! 🎉
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Your listing fee has been received. Your trip has been submitted for admin review.
          </p>

          <div className="bg-[#f5f0e8] rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-extrabold text-[#2c4a1e] mb-4">What happens next?</h3>
            <div className="flex flex-col gap-3">
              {[
                { icon: "📋", text: "Our admin team will review your flight ticket within 24-48 hours" },
                { icon: "✅", text: "If approved — your trip goes live and customers can start booking" },
                { icon: "💰", text: "If rejected — you will receive a full refund to your Wave account" },
                { icon: "📱", text: "You will be notified by email once a decision is made" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/traveler"
              className="px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm hover:bg-green-800 transition-all"
            >
              Go to My Dashboard
            </Link>
            <Link
              href="/trips/new"
              className="px-8 py-3 border-2 border-[#2c4a1e] text-[#2c4a1e] rounded-full font-bold text-sm hover:bg-[#2c4a1e] hover:text-white transition-all"
            >
              List Another Trip
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}