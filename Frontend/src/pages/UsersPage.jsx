import { useEffect, useState } from "react";
import { User, Search, Mail, Phone } from "lucide-react";
import api from "../api/axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/venue")
      .then(({ data }) => setUsers(data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

    const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

   return (
    <div className="space-y-8">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Venue Users</h1>
          <p className="text-gray-500">Users who have booked a slot at your venue.</p>
        </div>
        <div className="bg-white p-2 rounded-2xl border flex items-center shadow-sm">
          <Search className="text-gray-400 ml-2" size={18} />
          <input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 outline-none w-full md:w-48"
          />
        </div>
      </div>

      <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading users...</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-gray-500">No users have booked at your venue yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["User", "Email", "Phone"].map((h) => (
                  <th key={h} className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6 flex items-center gap-4">
                    <div className="bg-[#8B1E3F]/10 p-3 rounded-full text-[#8B1E3F]">
                      <User size={20} />
                    </div>
                    <span className="font-bold text-gray-800">{u.name}</span>
                  </td>
                  <td className="p-6 text-gray-500 font-medium">
                    <span className="flex items-center gap-2"><Mail size={14}/> {u.email}</span>
                  </td>
                  <td className="p-6 text-gray-500 font-medium">
                    <span className="flex items-center gap-2"><Phone size={14}/> {u.phone || "—"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}