import { useState } from "react";
import { User, Shield, ShieldOff, Search, MoreVertical } from "lucide-react";

export default function UsersPage() {
  // Mock Data: Backend connect karte waqt yahan API call aayegi
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Kumar", email: "rahul@email.com", bookings: 15, status: "Active" },
    { id: 2, name: "Priya Singh", email: "priya@email.com", bookings: 8, status: "Active" },
    { id: 3, name: "Amit Verma", email: "amit@email.com", bookings: 2, status: "Blocked" },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u));
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">System Users</h1>
          <p className="text-gray-500">Manage, monitor, and control your platform's user base.</p>
        </div>
        <div className="bg-white p-2 rounded-2xl border flex items-center shadow-sm">
          <Search className="text-gray-400 ml-2" size={18} />
          <input placeholder="Search users..." className="p-2 outline-none w-full md:w-48" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['User', 'Email', 'Bookings', 'Status', 'Actions'].map(h => (
                <th key={h} className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-6 flex items-center gap-4">
                  <div className="bg-[#8B1E3F]/10 p-3 rounded-full text-[#8B1E3F]">
                    <User size={20} />
                  </div>
                  <span className="font-bold text-gray-800">{u.name}</span>
                </td>
                <td className="p-6 text-gray-500 font-medium">{u.email}</td>
                <td className="p-6 font-bold">{u.bookings}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase ${u.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-6">
                  <button 
                    onClick={() => toggleStatus(u.id)} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${u.status === 'Active' ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-green-600 bg-green-50 hover:bg-green-100'}`}
                  >
                    {u.status === 'Active' ? <ShieldOff size={16} /> : <Shield size={16} />}
                    {u.status === 'Active' ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}