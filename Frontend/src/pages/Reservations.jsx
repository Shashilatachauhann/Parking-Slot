import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, CalendarDays, Clock, Car, XCircle, CheckCircle, AlertCircle } from "lucide-react";

export default function Reservations() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem("reservations");
    const initialValue = JSON.parse(saved);
    return initialValue || []; 
  });

  const filteredReservations = reservations.filter(res => {
    if (activeTab === "upcoming") {
      return res.status === "Active" || res.status === "Upcoming";
    }
    return res.status === "Completed" || res.status === "Missed" || res.status === "Cancelled";
  });

  const handleCancel = (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (confirmCancel) {
      const updated = reservations.map(res => 
        res.id === id ? { ...res, status: "Cancelled" } : res
      );
      setReservations(updated);
      localStorage.setItem("reservations", JSON.stringify(updated)); 
      setActiveTab("history");
    }
  };

  const renderStatusBadge = (status) => {
    switch(status) {
      case "Active": return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> LIVE</span>;
      case "Upcoming": return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">UPCOMING</span>;
      case "Completed": return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> COMPLETED</span>;
      case "Cancelled": return <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={12}/> CANCELLED</span>;
      case "Missed": return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><AlertCircle size={12}/> MISSED</span>;
      default: return null;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Reservations</h1>
      </div>

      <div className="flex gap-4 border-b border-gray-200 mb-8">
        <button onClick={() => setActiveTab("upcoming")} className={`pb-4 px-2 text-sm font-bold ${activeTab === "upcoming" ? "text-[#8B1E3F]" : "text-gray-400"}`}>Active & Upcoming</button>
        <button onClick={() => setActiveTab("history")} className={`pb-4 px-2 text-sm font-bold ${activeTab === "history" ? "text-[#8B1E3F]" : "text-gray-400"}`}>Past History</button>
      </div>

      {filteredReservations.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredReservations.map((res) => (
            <div key={res.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="flex justify-between mb-4">
                  <div className="bg-gray-50 text-xs font-bold px-3 py-1 rounded-lg">{res.id}</div>
                  {renderStatusBadge(res.status)}
                </div>
                <h3 className="text-xl font-bold mb-4">{res.location}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📅 {res.date}</p>
                  <p>⏰ {res.time}</p>
                  <p>🚗 Slot: {res.slot}</p>
                </div>
              </div>
              <div className="sm:border-l border-gray-100 sm:pl-6 pt-4 sm:pt-0 flex flex-col justify-between">
                <p className="text-2xl font-extrabold text-[#8B1E3F]">{res.amount}</p>
                <div className="mt-4 space-y-2">
                  {(res.status === "Active" || res.status === "Upcoming") && (
                    <button onClick={() => handleCancel(res.id)} className="w-full bg-white text-red-600 border border-red-200 py-2 rounded-xl text-sm font-bold hover:bg-red-50">Cancel</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">No {activeTab} reservations</h2>
          <Link to="/slots" className="mt-6 inline-block px-8 py-3 bg-[#8B1E3F] text-white rounded-xl font-bold hover:bg-[#A61E4D]">Book Now</Link>
        </div>
      )}
    </div>
  );
}