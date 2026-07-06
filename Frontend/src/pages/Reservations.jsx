import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { XCircle, CheckCircle } from "lucide-react";

export default function Reservations() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetching data from booking.js(db.js)
  useEffect(() => {
    fetch('http://localhost:5000/api/bookings')
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error("Error fetching bookings:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}/cancel`, {
        method: 'PATCH'
      });

      if (res.ok) {
        setReservations(prev =>
          prev.map(r => (r.id === id ? { ...r, status: "Cancelled" } : r))
        );
      } else {
        alert("Failed to cancel booking!");
      }
    } catch (err) {
      console.error("Failed to cancel:", err);
    }
  };

  const filteredReservations = reservations
    .filter(res => {
      if (activeTab === "upcoming") return res.status !== "Cancelled" && res.status !== "Completed";
      return res.status === "Cancelled" || res.status === "Completed";
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // recent sabse upar

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">LIVE</span>;
      case "Upcoming":
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">UPCOMING</span>;
      case "Completed":
        return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={12} /> COMPLETED</span>;
      case "Cancelled":
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={12} /> CANCELLED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black mb-8">My Reservations</h1>

      <div className="flex gap-4 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-4 px-2 font-bold ${activeTab === "upcoming" ? "text-[#8B1E3F] border-b-2 border-[#8B1E3F]" : "text-gray-400"}`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`pb-4 px-2 font-bold ${activeTab === "history" ? "text-[#8B1E3F] border-b-2 border-[#8B1E3F]" : "text-gray-400"}`}
        >
          History
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">Loading reservations...</div>
      ) : filteredReservations.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredReservations.map((res) => (
            <div key={res.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex justify-between">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="bg-gray-100 text-xs font-bold px-3 py-1 rounded-lg">#{res.id.slice(-6)}</span>
                  {renderStatusBadge(res.status || "Upcoming")}
                </div>
                <h3 className="text-xl font-black">{res.location}</h3>
                <p className="text-gray-500 font-bold mt-2">Slot: {res.slotNumber}</p>
                <p className="text-gray-400 text-sm">{res.date}</p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="text-2xl font-black text-[#8B1E3F]">₹{res.price}</p>
                {res.status !== "Cancelled" && res.status !== "Completed" && (
                  <button
                    onClick={() => handleCancel(res.id)}
                    className="text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-xl transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <h2 className="text-2xl font-black">No {activeTab} reservations</h2>
          <Link to="/slots" className="mt-6 inline-block bg-[#8B1E3F] text-white px-8 py-3 rounded-xl font-bold">Book Now</Link>
        </div>
      )}
    </div>
  );
}
