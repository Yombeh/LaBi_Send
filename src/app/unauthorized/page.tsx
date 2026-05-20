 import Link from "next/link"
import { ShieldX } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-[#fdfaf7] flex items-center justify-center px-10">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <ShieldX size={48} color="#ef4444" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#2c2c2c] mb-3">
          Access Denied
        </h1>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          You do not have permission to access this page. 
          Please log in with the correct account.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-[#2c4a1e] text-white rounded-full font-bold text-sm"
          >
            Go Home
          </Link>
          <Link
            href="/auth"
            className="px-6 py-3 border-2 border-[#2c4a1e] text-[#2c4a1e] rounded-full font-bold text-sm"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  )
}