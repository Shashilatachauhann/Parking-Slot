import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AuthLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (

    <div className="flex min-h-screen bg-[#F8F8FA]">

      <Sidebar open={sidebarOpen} />

      <div className="flex-1 flex flex-col">

        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
         <main className="p-8 flex-1">{children}</main>

      </div>

    </div>

  );

}