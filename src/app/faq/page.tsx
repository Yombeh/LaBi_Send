 "use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    category: "For Customers",
    color: "#2c4a1e",
    questions: [
      {
        q: "Can I negotiate prices with the traveler?",
        a: "Yes! LaBi_Send allows open communication between customers and travelers before a booking is confirmed. You can message the traveler directly through the platform to discuss pricing. However, all final agreed prices must be confirmed through the platform for security and record purposes."
      },
      {
        q: "Will there be refunds if I decide to cancel?",
        a: "Yes, refunds are available depending on when you cancel. If you cancel more than 48 hours before the traveler's departure, you will receive a full refund. Cancellations within 48 hours of departure may be subject to a partial refund. All refund requests are handled through the platform and reviewed by our admin team."
      },
      {
        q: "How often will I be able to track the traveler's journey?",
        a: "LaBi_Send provides real-time tracking through Google Maps integration. You will be able to see your traveler's location at any point during their journey. You will also receive automatic notifications at key milestones — when your package is picked up, when the traveler departs, and when they arrive at the destination."
      },
      {
        q: "How do I know my package is safe with the traveler?",
        a: "Every traveler on LaBi_Send is verified by our admin team before they can accept any bookings. Their ID or passport is reviewed and approved. Additionally, our built-in safety guide ensures travelers are aware of what items are prohibited — protecting both you and them."
      },
      {
        q: "What payment methods are available?",
        a: "LaBi_Send currently supports two payment methods — Wave mobile money for online payments, and cash for in-person arrangements. Both options are designed to be accessible to every user regardless of their banking situation."
      },
      {
        q: "What happens if my package is lost or damaged?",
        a: "In the unfortunate event that a package is lost or damaged, our admin team will investigate the situation and work with both parties to reach a fair resolution. We strongly recommend customers photograph their packages before handing them over to the traveler as evidence."
      },
      {
        q: "Is there a weight limit for what I can send?",
        a: "The weight limit depends on the individual traveler and how much spare luggage capacity they have listed. Each traveler sets their own available KG on their profile. You can filter travelers by available weight when searching to find one that meets your needs."
      }
    ]
  },
  {
    category: "For Travelers",
    color: "#b8860b",
    questions: [
      {
        q: "Is there a limit to the KG I can take from a customer?",
        a: "You are in full control of your capacity. When listing your trip you set your own total available KG based on your actual spare luggage allowance. The platform will automatically prevent customers from booking more weight than you have available. We recommend being honest about your capacity to avoid issues at the airport."
      },
      {
        q: "How will LaBi_Send help with my security as a traveler?",
        a: "Your safety is our top priority. LaBi_Send provides a built-in safety guide that clearly outlines prohibited and restricted items so you never unknowingly carry illegal goods across a border. You also have the right to physically inspect any package before accepting it. All customers are registered on the platform, creating a trail of accountability that protects you."
      },
      {
        q: "Is this service paid? How much does it cost to list my trip?",
        a: "Yes, travelers pay a small listing fee to publish their trip on LaBi_Send. The fee is based on the duration your trip listing remains active on the platform and is kept at a reasonable and affordable rate. This fee helps maintain the platform and ensures only serious travelers list their trips. Full pricing details are available when you create your listing."
      },
      {
        q: "Will I have to share my earnings with LaBi_Send?",
        a: "No. The money you earn from customers is entirely yours. LaBi_Send only charges the listing fee upfront — we do not take a commission from your earnings. What you charge the customer is what you keep. This ensures you always know exactly how much you will make from each trip."
      },
      {
        q: "What happens if a customer's luggage is lost during my journey?",
        a: "We understand this is a serious concern. LaBi_Send requires travelers to take reasonable care of packages they accept. In the event of loss, our admin team will investigate and mediate between both parties. We strongly recommend travelers keep packages secure and separate from their personal belongings throughout the journey."
      },
      {
        q: "How do I get approved as a traveler?",
        a: "After signing up as a traveler, you will submit your ID or passport through the platform. Our admin team will review and verify your documents within 24 to 48 hours. Once approved you will receive a notification and can immediately set up your profile and list your first trip."
      },
      {
        q: "Can I accept bookings from multiple customers on one trip?",
        a: "Yes! As long as you have available KG capacity, you can accept bookings from multiple customers on a single trip. The platform automatically tracks your remaining capacity and closes bookings once your limit is reached."
      }
    ]
  },
  {
    category: "General",
    color: "#1a5276",
    questions: [
      {
        q: "Is LaBi_Send available outside of The Gambia?",
        a: "LaBi_Send is currently launching in The Gambia with routes connecting to popular diaspora destinations including the UK, Spain, Germany, and the USA. We have plans to expand across West Africa in the near future. Stay connected through our newsletter for expansion announcements."
      },
      {
        q: "How do I contact LaBi_Send if I have a problem?",
        a: "You can reach our support team at support@labisend.com or call us on +220 3258735 during working hours Monday to Friday 8am to 6pm GMT. You can also use the Contact Us page on our website to send us a message directly."
      },
      {
        q: "Is LaBi_Send free to use for customers?",
        a: "Creating an account and searching for travelers is completely free for customers. You only pay the agreed price to the traveler for carrying your package. There are no hidden fees or subscription costs for customers."
      }
    ]
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const toggle = (key: string) => {
    setOpenIndex(openIndex === key ? null : key)
  }

  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#2c4a1e]">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="bg-[#2c4a1e] py-20 px-10 text-white text-center">
        <p className="text-[#f5c842] text-sm font-bold uppercase tracking-widest mb-4">
          Got Questions?
        </p>
        <h1 className="text-5xl font-extrabold mb-4">
          Frequently Asked <span className="text-[#f5c842] italic">Questions</span>
        </h1>
        <p className="text-green-200 text-lg max-w-xl mx-auto">
          Everything you need to know about LaBi_Send — for customers, travelers, and everyone in between.
        </p>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 px-10 max-w-4xl mx-auto">
        {faqs.map((section) => (
          <div key={section.category} className="mb-14">
            
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-2 h-8 rounded-full"
                style={{ backgroundColor: section.color }}
              ></div>
              <h2 className="text-2xl font-extrabold text-[#2c2c2c]">
                {section.category}
              </h2>
            </div>

            {/* Questions */}
            <div className="flex flex-col gap-3">
              {section.questions.map((item, index) => {
                const key = `${section.category}-${index}`
                const isOpen = openIndex === key

                return (
                  <div
                    key={key}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="font-semibold text-[#2c2c2c] text-sm pr-4">
                        {item.q}
                      </span>
                      {isOpen 
                        ? <ChevronUp size={20} color="#2c4a1e" className="shrink-0" />
                        : <ChevronDown size={20} color="#2c4a1e" className="shrink-0" />
                      }
                    </button>

                    {/* Answer */}
                    {isOpen && (
                      <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                        {item.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-20 px-10 bg-[#2c4a1e] text-center text-white">
        <h2 className="text-3xl font-extrabold mb-4">
          Still have questions?
        </h2>
        <p className="text-green-200 text-sm mb-8 max-w-md mx-auto">
          Our support team is always ready to help. Reach out and we will get back to you as soon as possible.
        </p>
        <div className="flex items-center justify-center gap-4">
    
          <a  href="/contact"
            className="px-8 py-3 bg-[#f5c842] text-[#2c4a1e] rounded-full font-bold text-sm hover:bg-yellow-400 transition-all"
          >
            Contact Us →
          </a>
          
         <a   href="/auth"
            className="px-8 py-3 border-2 border-white text-white rounded-full font-bold text-sm hover:bg-white hover:text-[#2c4a1e] transition-all"
         >
            Join LaBi_Send
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}