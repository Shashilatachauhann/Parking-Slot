import { Link } from "react-router-dom";

export default function Footer() {

  const links = [
    { name: "Home", path: "/" },
    { name: "Parking Slots", path: "/slots" },
    { name: "Reservations", path: "/reservations" },
    { name: "Support", path: "/support" }
  ];

  return (
    <footer className="bg-[#F7F4F5] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12  border-2 border-[#8B1E3F] rounded-xl bg-[#F7F4F5] flex items-center justify-center text-[#8B1E3F] font-bold text-xl">P</div>

              <div>
                <h2 className="text-2xl font-bold text-black">ParkMate</h2>
                <p className="text-xs tracking-[4px] text-gray-500">SMART PARK</p>
              </div>
            </div>
            <p className="mt-6 text-gray-500 leading-8">
              Find, reserve and manage parking
              spaces effortlessly with a modern
              parking experience.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-xl">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link to={link.path}
                    className="text-gray-500 hover:text-[#8B1E3F] duration-300">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Services */}
          <div>
            <h3 className="font-semibold text-xl">Services</h3>
            <ul className="mt-6 space-y-4 text-gray-500">
              <li>Real-Time Slots</li>
              <li>Instant Booking</li>
              <li>Secure Payments</li>
              <li>Smart Navigation</li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-xl">Contact</h3>
            <div className="mt-6 space-y-4 text-gray-500">
              <p>📧 support@parkmate.com</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 New Delhi, India</p>
            </div>
          </div>
        </div>
        <hr className="my-12 border-[#8B1E3F]/10" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">© 2026 ParkMate. All rights reserved.</p>
          <p className="text-gray-500">Built with React & TailwindCSS</p>
        </div>
      </div>
    </footer>
  )
}