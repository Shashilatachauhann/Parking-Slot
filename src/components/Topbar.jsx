import { Menu, UserCircle } from "lucide-react";

export default function Topbar({ toggleSidebar }) {

  const username =
    localStorage.getItem("username") || "Shashi";

  return (

    <header className="sticky top-0 z-40 h-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm px-8 flex items-center justify-between">

      <button onClick={toggleSidebar}
        className="p-2 rounded-xl transition hover:bg-[#8B1E3F]/10">

        <Menu size={28} className="text-[#8B1E3F]" />

      </button>
      <div className="flex items-center gap-3">
        <p className="text-lg font-semibold text-gray-800">{username}</p>
        <UserCircle size={42}
          className="text-[#8B1E3F] transition duration-300 hover:scale-110 cursor-pointer" />
      </div>
    </header>
  );
}