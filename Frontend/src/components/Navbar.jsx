import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const guestLinks = [
    { label: "Home", to: "/" },
    { label: "Find Parkings", to: "/findparking" },
    { label: "About Us", to: "/aboutus" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#550206] shadow-sm shadow-[#410103] px-6 lg:px-10 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3">
          <span className="border-[3px] border-[#550206] rounded-xl px-3 py-1 font-bold text-[#550206]"> P</span>
          <div>
            <h1 className="text-xl font-bold text-[#550206]"> ParkMate </h1>
            <p className="text-[11px] tracking-[4px] text-gray-500">SMART PARK</p>
          </div>
        </Link>

        
        <div className="hidden md:flex items-center gap-10">
          {guestLinks.map((link) => (
            <NavLink key={link.label} to={link.to}
              className={({ isActive }) => `relative font-medium ${isActive ? "text-[#8B1E3F]" : "text-black hover:text-[#8B1E3F]"}
                after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#8B1E3F] after:transition-all after:duration-300 ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block relative">
          <Link to="/login"
            className="flex items-center gap-2 bg-[#8B1E3F] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#6d1731] transition">
            Login
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

       {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 border-t pt-4">
          {guestLinks.map((link) => (
            <NavLink key={link.label} to={link.to} className="block py-3 px-4 rounded-xl hover:bg-gray-100">
              {link.label}
            </NavLink>
          ))}
          <Link to="/login" className="block py-3 px-4 font-bold text-[#8B1E3F]">Login</Link>
        </div>
      )}
    </nav>
  );
}