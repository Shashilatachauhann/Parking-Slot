import { Link } from "react-router-dom";

export default function Footer() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Find Parking", path: "/findparking" },
    { name: "About Us", path: "/aboutus" }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 border-3 border-[#550206] rounded-2xl flex items-center justify-center text-[#550206] font-bold text-xl">P</div>
              <div>
                <h2 className="text-xl font-bold text-[#550206]">ParkMate</h2>
                <p className="text-[11px] tracking-[4px] text-gray-500">SMART PARK</p>
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed text-sm">
              Making parking effortless with a modern, secure, and smart experience for everyone.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#550206] mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 hover:text-[#8B1E3F] transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

  
          <div>
            <h3 className="font-bold text-[#550206] mb-6">Services</h3>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-[#8B1E3F] cursor-pointer transition-colors">Real-Time Slots</li>
              <li className="hover:text-[#8B1E3F] cursor-pointer transition-colors">Instant Booking</li>
              <li className="hover:text-[#8B1E3F] cursor-pointer transition-colors">Secure Payments</li>
              <li className="hover:text-[#8B1E3F] cursor-pointer transition-colors">Smart Navigation</li>
            </ul>
          </div>

          
          <div>
            <h3 className="font-bold text-[#550206] mb-6">Contact Us</h3>
            <div className="space-y-4 text-sm text-gray-500">
              <p className="hover:text-[#8B1E3F] transition-colors cursor-pointer">📧 support@parkmate.com</p>
              <p className="hover:text-[#8B1E3F] transition-colors cursor-pointer">📞 +91 98765 43210</p>
              <p>📍 Uttar Pradesh, India</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
          <p>© 2026 ParkMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}