import {
  LayoutDashboard,
  CalendarDays,
  Car,
  User,
  LifeBuoy,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";

export default function Sidebar({ open }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };
 const role = localStorage.getItem("role");

const userLinks = [

  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20}/>
  },

  {
    title: "Reservations",
    path: "/reservations",
    icon: <CalendarDays size={20}/>
  },

  {
    title: "Parking Slots",
    path: "/slots",
    icon: <Car size={20}/>
  },

  {
    title: "Profile",
    path: "/profile",
    icon: <User size={20}/>
  },

  {
    title: "Support",
    path: "/support",
    icon: <LifeBuoy size={20}/>
  }

];



const adminLinks = [

  {
    title: "Admin Dashboard",
    path: "/admindashboard",
    icon: <LayoutDashboard size={20}/>
  },

  {
    title: "Manage Slots",
    path: "/manage-slots",
    icon: <Car size={20}/>
  },

  {
    title: "Bookings",
    path: "/bookings",
    icon: <CalendarDays size={20}/>
  },

  {
    title: "Users",
    path: "/users",
    icon: <User size={20}/>
  },

  {
    title: "Support",
    path: "/support",
    icon: <LifeBuoy size={20}/>
  }

];


const links = role === "admin"
  ? adminLinks
  : userLinks;

  return (

    <div className={`bg-[#8B1E3F] text-white min-h-screen transition-all duration-300 ${open ? "w-72" : "w-0 overflow-hidden"}`}>
      <div className="p-6">
        <h1 className="text-3xl font-bold">ParkMate</h1>
        <p className="text-sm opacity-70">SMART PARK</p>
      </div>
      <div className="space-y-3 p-4">
        {links.map((item) => (
          <NavLink key={item.title} to={item.path} className={({ isActive }) =>

            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
          }>
            {item.icon}
            {item.title}
          </NavLink>
        ))}
        <button onClick={handleLogout} className="w-full mt-10 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">

          <LogOut size={20} />Logout
        </button>
      </div>
    </div>
  )

}