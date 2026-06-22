import { UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = false;

  const navigate = useNavigate();

  const guestLinks = [
    { label: "Home", to: "/" },
    { label: "Parking Slots", to: "/slots" },
    { label: "Support", to: "/support" },
  ];

  const userLinks = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Reservations", to: "/reservations" },
    { label: "Parking Slots", to: "/slots" },
    { label: "Support", to: "/support" },
  ];

  const navLinks = isLoggedIn ? userLinks : guestLinks;

  return (
   <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-7 py-4 bg-white shadow-md border-b border-gray-200 ">

      <Link
        to={isLoggedIn ? "/dashboard" : "/"}
        className="text-2xl font-bold text-[#8B1E3F]"
      >
        ParkMate
      </Link>

      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="text-black hover:text-[#8B1E3F]"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {!isLoggedIn ? (
        <Link
          to="/login"
          className="px-6 py-2 bg-[#8B1E3F] text-white rounded-lg"
        >
          Login
        </Link>
      ) : (
        <button onClick={() => navigate("/profile")}>
          <UserCircle
            size={40}
            className="text-[#8B1E3F]"
          />
        </button>
      )}

    </nav>
  );
}