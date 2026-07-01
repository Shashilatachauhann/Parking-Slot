import {LayoutDashboard, CalendarDays, Car, User, LifeBuoy, LogOut} from "lucide-react";
import { useNavigate, NavLink, Link } from "react-router-dom";

export default function Sidebar({ open, role }) { 
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  const userLinks = [
    { title: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20}/> },
    { title: "Reservations", path: "/reservations", icon: <CalendarDays size={20}/> },
    { title: "Parking Slots", path: "/slots", icon: <Car size={20}/> },
    { title: "Profile", path: "/profile", icon: <User size={20}/> },
    { title: "Support", path: "/support", icon: <LifeBuoy size={20}/> }
  ];

  const adminLinks = [
    { title: "Admin Dashboard", path: "/admindashboard", icon: <LayoutDashboard size={20}/> },
    { title: "Manage Slots", path: "/manageslots", icon: <Car size={20}/> },
    { title: "Bookings", path: "/bookings", icon: <CalendarDays size={20}/> },
    { title: "Users", path: "/users", icon: <User size={20}/> },
    { title: "Support", path: "/support", icon: <LifeBuoy size={20}/> }
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside className={`bg-[#8B1E3F] text-white min-h-screen transition-all duration-300 flex flex-col shadow-2xl ${open ? "w-72" : "w-0 overflow-hidden"}`}>
      
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <span className="border-[3px] border-white rounded-xl px-3 py-1 text-2xl font-bold text-white"> 
            P 
          </span>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-white leading-tight"> ParkMate </h1>
            <p className="text-[11px] tracking-[4px] text-white/70">SMART PARK</p>
          </div>
        </Link>
      </div>

      {/* links for Navigation */}
      <div className="flex-1 px-4 overflow-y-auto space-y-2">
        {links.map((item) => (
          <NavLink 
            key={item.title} 
            to={item.path} 
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium whitespace-nowrap ${
                isActive 
                  ? "bg-white text-[#8B1E3F] shadow-lg shadow-black/10" 
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </div>

      {/* logout */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}