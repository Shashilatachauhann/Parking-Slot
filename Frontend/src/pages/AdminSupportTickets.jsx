import { useEffect, useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";
import api from "../api/axios";

const STATUS_STYLES = {
  Open: "bg-red-100 text-red-900",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Resolved: "bg-green-100 text-green-700",
};

export default function AdminSupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/support/venue").then(({ data }) => setTickets(data))
      .catch(() => setTickets([]))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/support/${id}/status`, { status });
      setTickets(tickets.map((t) => (t._id === id ? { ...t, status } : t)));
    } catch (err) {
      console.error("Failed to update ticket:", err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Support Tickets</h1>
        <p className="text-gray-500 mt-1">Complaints submitted by users about your venue.</p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center text-gray-400">
          <MessageSquare className="mx-auto mb-3" size={32} />
          No tickets yet for your venue.
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div key={t._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-900">{t.sender?.name}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_STYLES[t.status]}`}>{t.status}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#8B1E3F]/10 text-[#8B1E3F]">{t.subject}</span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-2"><Mail size={14} /> {t.sender?.email}</p>
                  {t.sender?.phone && <p className="text-sm text-gray-600 flex items-center gap-2 mt-1"><Phone size={14} /> {t.sender.phone}</p>}
                  <p className="text-gray-700 mt-3">{t.message}</p>
                </div>

                <select
                  value={t.status}
                  onChange={(e) => updateStatus(t._id, e.target.value)}
                  className="text-sm font-semibold border border-gray-200 rounded-xl px-3 py-2 outline-none"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
