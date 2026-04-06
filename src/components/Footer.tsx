import Link from "next/link"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"

export default function Footer() {
  const socials = [
    { label: "Facebook", href: "https://facebook.com/labisend", icon: FaFacebook },
    { label: "Instagram", href: "https://instagram.com/labisend", icon: FaInstagram },
    { label: "YouTube", href: "https://youtube.com/@labisend", icon: FaYoutube },
  ]

  return (
    <footer className="bg-[#181d17] text-white py-16 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Tagline */}
        <div className="col-span-1">
          <h2 className="text-2xl font-extrabold mb-3">
            LaBi<span className="text-[#f5c842]">_Send</span>
          </h2>
          <p className="text-green-300 text-sm leading-relaxed mb-6">
            Connecting travelers and senders across borders. Fast, affordable and community driven.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="w-10 h-10 rounded-full border border-green-700 flex items-center justify-center hover:bg-[#f5c842] hover:border-[#f5c842] hover:text-[#2c4a1e] text-green-300 transition-all"
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#f5c842] mb-5">
            Quick Links
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "Home", href: "/#home" },
              { label: "Find Travelers", href: "/trips" },
              { label: "How it Works", href: "/#how-it-works" },
              { label: "About Us", href: "/about" },
              { label: "Join as Traveler", href: "/become-traveller" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-green-300 text-sm hover:text-[#f5c842] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#f5c842] mb-5">
            Support
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "FAQ", href: "/faq" },
              { label: "Safety Guide", href: "/safety" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-green-300 text-sm hover:text-[#f5c842] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#f5c842] mb-5">
            Contact
          </h3>
          <div className="flex flex-col gap-3 text-green-300 text-sm">
            <p>📞 +220 3258735</p>
            <p>📧 support@labisend.com</p>
            <p>📍 Banjul, The Gambia</p>
            <p>🕐 Mon - Fri, 8am - 6pm GMT</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-green-900 flex items-center justify-between">
        <p className="text-green-500 text-xs">
          © 2025 LaBi_Send. All rights reserved.
        </p>
        <p className="text-green-500 text-xs">
          Made with ❤️ in The Gambia
        </p>
      </div>

    </footer>
  )
}