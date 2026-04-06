 import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import { FileText, User, Luggage, Package, CreditCard, ShieldX, AlertTriangle, LogOut, RefreshCw } from "lucide-react"

const terms = [
  {
    number: "01",
    icon: FileText,
    title: "Acceptance of Terms",
    highlight: "By using LaBi_Send you agree to these terms.",
    content: `By creating an account or using any part of the LaBi_Send platform, you confirm that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.

These terms apply to all users of LaBi_Send including customers, travelers, and administrators. LaBi_Send reserves the right to update these terms at any time with notice provided to users via email or platform notification.

You must be at least 18 years of age to create an account on LaBi_Send. By registering you confirm that you meet this requirement.`
  },
  {
    number: "02",
    icon: User,
    title: "User Accounts & Responsibilities",
    highlight: "You are responsible for your account and everything done through it.",
    content: `When you create an account on LaBi_Send you are responsible for:

- Providing accurate and truthful information during registration
- Keeping your login credentials secure and confidential
- All activity that occurs under your account
- Notifying us immediately if you suspect unauthorized access to your account
- Keeping your contact information up to date

LaBi_Send reserves the right to suspend or terminate accounts that provide false information or violate these terms. You may not create multiple accounts or share your account with others.`
  },
  {
    number: "03",
    icon: Luggage,
    title: "Traveler Obligations",
    highlight: "Travelers must be verified, honest, and responsible at all times.",
    content: `As a traveler on LaBi_Send you agree to:

- Submit accurate and valid identification documents for verification
- Only list trips you genuinely intend to take
- Accurately represent your available luggage capacity
- Physically inspect all packages before accepting them
- Never carry prohibited or restricted items as outlined in our Safety Guide
- Take reasonable care of all packages accepted through the platform
- Communicate promptly and professionally with customers
- Complete bookings you have accepted unless an emergency prevents you

Travelers who repeatedly cancel bookings, receive poor ratings, or violate safety guidelines may have their accounts suspended or permanently banned.`
  },
  {
    number: "04",
    icon: Package,
    title: "Customer Obligations",
    highlight: "Customers must be honest about package contents at all times.",
    content: `As a customer on LaBi_Send you agree to:

- Provide accurate and complete descriptions of package contents
- Never attempt to send prohibited or restricted items through the platform
- Package your items securely to prevent damage during transit
- Be available to hand over your package at the agreed time and location
- Pay the agreed amount to the traveler as confirmed through the platform
- Treat travelers with respect and professionalism
- Not misuse the tracking feature or contact travelers excessively

Customers who misrepresent package contents or attempt to send prohibited items will be immediately banned from the platform and may face legal consequences.`
  },
  {
    number: "05",
    icon: CreditCard,
    title: "Payments & Refunds",
    highlight: "All payments must be made through agreed channels on the platform.",
    content: `LaBi_Send facilitates payments between customers and travelers through Wave mobile money or cash as agreed between both parties.

Regarding payments:
- All agreed prices must be confirmed through the platform before departure
- Travelers charge their own rates per KG — LaBi_Send does not set prices
- Travelers pay a listing fee to publish trips on the platform
- LaBi_Send does not take commission from traveler earnings

Regarding refunds:
- Cancellations made more than 48 hours before departure qualify for a full refund
- Cancellations within 48 hours of departure may receive a partial refund
- Refund requests are reviewed by our admin team within 5 business days
- LaBi_Send listing fees are non-refundable once a trip is published`
  },
  {
    number: "06",
    icon: ShieldX,
    title: "Prohibited Items & Activities",
    highlight: "Violations of this section may result in criminal prosecution.",
    content: `The following are strictly prohibited on the LaBi_Send platform:

Prohibited items include but are not limited to:
- Illegal drugs and controlled substances
- Weapons, firearms, and explosive materials
- Counterfeit currency or goods
- Endangered animal products
- Any item that is illegal in the origin or destination country

Prohibited activities include:
- Creating fake accounts or impersonating others
- Manipulating ratings or reviews
- Using the platform to facilitate money laundering
- Harassing or threatening other users
- Attempting to bypass the platform for payments to avoid listing fees

LaBi_Send will cooperate fully with law enforcement in any investigation involving prohibited items or activities.`
  },
  {
    number: "07",
    icon: AlertTriangle,
    title: "Limitation of Liability",
    highlight: "LaBi_Send is a platform — we connect people but cannot guarantee outcomes.",
    content: `LaBi_Send acts as a marketplace connecting customers and travelers. We are not a courier service and do not physically handle packages.

LaBi_Send is not liable for:
- Loss or damage to packages during transit
- Delays caused by border control or airline issues
- Disputes arising between customers and travelers
- Packages seized by customs authorities
- Any losses resulting from a traveler's failure to complete a booking

We strongly recommend that customers photograph their packages before handover and that travelers photograph packages upon receipt. While we will assist in dispute resolution, our decisions are final and binding.

LaBi_Send's total liability to any user shall not exceed the value of the transaction in dispute.`
  },
  {
    number: "08",
    icon: LogOut,
    title: "Termination of Account",
    highlight: "We reserve the right to remove any user who violates these terms.",
    content: `LaBi_Send reserves the right to suspend or permanently terminate any account at our sole discretion for reasons including but not limited to:

- Violation of any part of these Terms of Service
- Providing false or misleading information
- Repeated cancellations or failure to complete bookings
- Receiving consistently poor ratings and reviews
- Engaging in prohibited activities on the platform
- Threatening or harassing other users or staff

Users may also delete their own accounts at any time through their profile settings. Upon deletion all personal data will be removed in accordance with our Privacy Policy within 30 days.`
  },
  {
    number: "09",
    icon: RefreshCw,
    title: "Changes to Terms",
    highlight: "We will always notify you before making significant changes.",
    content: `LaBi_Send reserves the right to modify these Terms of Service at any time. When we make significant changes we will:

- Send an email notification to all registered users
- Display a prominent notice on the platform
- Update the effective date at the top of this document
- Provide at least 14 days notice before changes take effect

Your continued use of LaBi_Send after the effective date of any changes constitutes your acceptance of the updated terms. If you do not agree with any changes you must stop using the platform and may request account deletion.

These Terms of Service were last updated on January 1, 2025 and are governed by the laws of The Gambia.`
  }
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="bg-[#1c1c1c] py-20 px-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
              <FileText size={40} color="#f5c842" />
            </div>
          </div>
          <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
            Legal Agreement
          </p>
          <h1 className="text-5xl font-extrabold mb-4">
            Terms of <span className="text-[#f5c842] italic">Service</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            These terms govern your use of LaBi_Send. Please read them carefully 
            before creating an account. By using our platform you agree to be 
            bound by these terms.
          </p>
          <p className="text-gray-500 text-xs mt-4">
            Effective Date: January 1, 2025
          </p>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-20 px-10 max-w-4xl mx-auto">
        <div className="relative">
          
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Terms Items */}
          <div className="flex flex-col gap-8">
            {terms.map((term) => {
              const Icon = term.icon
              return (
                <div key={term.number} className="relative flex gap-8">
                  
                  {/* Number Circle */}
                  <div className="shrink-0 w-16 h-16 rounded-full bg-[#1c1c1c] flex items-center justify-center z-10 border-4 border-[#fdfaf7]">
                    <span className="text-[#f5c842] font-extrabold text-sm">
                      {term.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl shadow-sm p-8 mb-2">
                    
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={20} color="#1c1c1c" />
                      <h2 className="text-xl font-extrabold text-[#1c1c1c]">
                        {term.title}
                      </h2>
                    </div>

                    {/* Highlight */}
                    <div className="bg-[#f5c842] rounded-xl px-4 py-3 mb-5">
                      <p className="text-[#1c1c1c] text-sm font-bold">
                        {term.highlight}
                      </p>
                    </div>

                    {/* Content */}
                    <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                      {term.content}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-10 bg-[#1c1c1c] text-center text-white">
        <h2 className="text-3xl font-extrabold mb-4">
          Ready to get started?
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          By creating an account you confirm that you have read and agreed 
          to these Terms of Service and our Privacy Policy.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/auth"
            className="px-8 py-3 bg-[#f5c842] text-[#1c1c1c] rounded-full font-bold text-sm hover:bg-yellow-400 transition-all"
          >
            Create Account →
          </a>
          <a
            href="/privacy"
            className="px-8 py-3 border-2 border-white text-white rounded-full font-bold text-sm hover:bg-white hover:text-[#1c1c1c] transition-all"
          >
            Privacy Policy
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}