import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // API Call: fetch('/api/bookings')
    setBookings([{ id: "B1", user: "Amit", slot: "A-01", status: "Active" }]);
  }, []);

  const updateStatus = (id, newStatus) => {
    // API Call: axios.patch(`/api/bookings/${id}`, { status: newStatus })
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-8">Live Bookings</h1>
      <div className="bg-white rounded-4xl border overflow-hidden">
        {bookings.map(b => (
          <div key={b.id} className="flex justify-between items-center p-6 border-b">
            <div>
              <p className="font-bold">{b.user}</p>
              <p className="text-sm text-gray-500">Slot: {b.slot} • Status: {b.status}</p>
            </div>
            {b.status === "Active" && (
              <div className="flex gap-2">
                <button onClick={() => updateStatus(b.id, "Completed")} className="bg-green-100 text-green-700 p-3 rounded-xl"><CheckCircle size={20}/></button>
                <button onClick={() => updateStatus(b.id, "Cancelled")} className="bg-red-100 text-red-700 p-3 rounded-xl"><XCircle size={20}/></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}