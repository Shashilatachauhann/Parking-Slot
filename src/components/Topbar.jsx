import { Menu, UserCircle } from "lucide-react";

export default function Topbar({ toggleSidebar }) {
  const username = localStorage.getItem("username") || "Sashilata";

  return (
    <header className="sticky top-0 z-40 h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm px-6 md:px-8 flex items-center justify-between transition-all">
      
      <button 
        onClick={toggleSidebar}
        className="p-2.5 rounded-xl text-[#8B1E3F] hover:bg-[#8B1E3F]/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/30"
        aria-label="Toggle Sidebar"
      >
        <Menu size={28} />
      </button>

      <div className="flex items-center gap-3">
        <p className="text-sm font-bold text-gray-700 hidden sm:block">
          Hello, <span className="text-[#8B1E3F]">{username}</span>
        </p>
        <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/40 p-0.5">
          <UserCircle size={40} className="text-[#8B1E3F] transition-transform duration-300 hover:scale-110" />
        </button>
      </div>

    </header>
  );
}