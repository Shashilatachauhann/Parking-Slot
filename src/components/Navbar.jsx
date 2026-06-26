import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) return null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  const dropdownRef = useRef(null);

  const guestLinks = [
    { label: "Home", to: "/" },
    { label: "Parking Slots", to: "/slots" },
    { label: "Support", to: "/support" }
  ];

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowLoginMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (

    <nav
      className=" sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm px-6 lg:px-10 py-4 " >

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3">

          <span className=" border-[3px] border-[#550206] rounded-xl px-3  py-1 font-bold text-[#550206]"> P</span>

          <div>
            <h1 className="text-xl font-bold text-[#550206]"> ParkMate </h1>
            <p className="text-[11px] tracking-[4px] text-gray-500">SMART PARK</p>
          </div>

        </Link>
        {/* DESKTOP LINK */}
        <div className="hidden md:flex items-center gap-10">

          {guestLinks.map((link) => (
            <NavLink key={link.label} to={link.to}
              className={({ isActive }) => `relative font-medium ${isActive ? "text-[#8B1E3F]" : "text-black hover:text-[#8B1E3F]"}
                         after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#8B1E3F] after:transition-all after:duration-300 ${isActive ?
                  "after:w-full" : "after:w-0 hover:after:w-full"}`}>
              {link.label}
            </NavLink>
          ))
          }
        </div>
        {/* LOGIN OPTION */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          <button onClick={() => setShowLoginMenu(!showLoginMenu)}
            className="flex items-center gap-2 bg-[#8B1E3F] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#6d1731] transition">
            Login
            <ChevronDown size={18} />
          </button>
          {showLoginMenu && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border overflow-hidden">
              <Link to="/login"
                className="block px-5 py-3 hover:bg-gray-100 transition">
                👤 User Login
              </Link>
              <Link to="/admin-login" className="block px-5 py-3 hover:bg-gray-100 transition">
                👨🏻‍💻 Admin Login
              </Link>
            </div>
          )
          }
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ?
            <X size={28} /> : <Menu size={28} />
          }
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {guestLinks.map((link) => (
            <NavLink key={link.label} to={link.to} className="block py-3 px-4 rounded-xl hover:bg-gray-100">
              {link.label}
            </NavLink>
          ))
          }
          <Link to="/login" className="block py-3 px-4">
            👤 User Login
          </Link>
          <Link to="/admin-login" className="block py-3 px-4">👨🏻‍💻 Admin Login</Link>
        </div>
      )
      }
    </nav>
  );
}