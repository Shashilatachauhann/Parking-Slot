import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// ✅ 'role' prop yahan add kiya hai
export default function AuthLayout({ children, role }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#F8F8FA] overflow-hidden font-sans">
      {/* According to the "role" side bar will open */}
      <Sidebar open={sidebarOpen} role={role} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}