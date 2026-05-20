import Link from "next/link"
import { XCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"

export default function PaymentErrorPage() {
  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      <section className="py-24 px-10 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-lg p-12 max-w-lg w-full text-center">
          
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <XCircle size={48} color="#ef4444" />
          </div>

          <h1 className="text-3xl font-extrabold text-[#2c2c2c] mb-3">
            Payment Failed
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Something went wrong with your payment. Your trip has not been submitted yet.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-extrabold text-red-700 mb-3">Common reasons:</h3>
            <div className="flex flex-col gap-2">
              {[
                "Insufficient Wave balance",
                "Incorrect Wave phone number",
                "Payment was cancelled",
                "Network connection issue",
              ].map((reason, index) => (
                <p key={index} className="text-red-600 text-sm">• {reason}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/trips/new"
              className="px-8 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm hover:bg-green-800 transition-all"
            >
              Try Again
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-gray-200 text-gray-500 rounded-full font-bold text-sm hover:border-[#2c4a1e] hover:text-[#2c4a1e] transition-all"
            >
              Contact Support
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}