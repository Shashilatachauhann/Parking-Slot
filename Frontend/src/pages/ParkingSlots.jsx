import { Search, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const todayStr = () => new Date().toISOString().split("T")[0];

export default function ParkingSlots() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingModal, setBookingModal] = useState(null);
  const [date, setDate] = useState(todayStr());
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(11);
  const [occupied, setOccupied] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/slots")
      .then(({ data }) => setSlots(data))
      .catch((err) => console.error("Error fetching slots:", err));
  }, []);

  const filteredSlots = slots.filter((slot) => {
    const haystack = `${slot.venue?.name || ""} ${slot.venue?.location || ""}`.toLowerCase();
    return haystack.includes(searchQuery.toLowerCase());
  });

  const openBookingModal = (slot) => {
    setError("");
    setDate(todayStr());
    setStartHour(9);
    setEndHour(11);
    setBookingModal(slot);
    fetchOccupied(slot._id, todayStr());
  };

  const fetchOccupied = async (slotId, chosenDate) => {
    try {
      const { data } = await api.get(`/slots/${slotId}/availability?date=${chosenDate}`);
      setOccupied(data);
    } catch {
      setOccupied([]);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (bookingModal) fetchOccupied(bookingModal._id, newDate);
  };
  const handleStartHourChange = (value) => {
    const newStart = Number(value);
    setStartHour(newStart);
    if (Number(endHour) <= newStart) {
      setEndHour(newStart + 1);
    }
  };
  const hasClientSideConflict = occupied.some(
    (o) => Number(startHour) < o.endHour && o.startHour < Number(endHour)
  );

  const confirmBooking = async () => {
    setError("");
    try {
      await api.post("/bookings", {
        slotId: bookingModal._id,
        date,
        startHour: Number(startHour),
        endHour: Number(endHour),
      });
      alert(`✅ Slot ${bookingModal.slotNumber} successfully booked!`);
      setBookingModal(null);
      navigate("/reservations");
    } catch (err) {
      setError(err.response?.data?.message || "Error booking slot!");
    }
  };
  return (
    <div className="w-full p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black mb-6">Available Parking Slots</h1>

      <div className="mb-8 max-w-md">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] font-medium"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredSlots.length > 0 ? (
          filteredSlots.map((slot) => (
            <div key={slot.id} className="bg-white p-6 rounded-3xl border shadow-sm">
              <h3 className="text-xl font-black flex items-center gap-2">
                Slot {slot.slotNumber} {slot.isEV && <Zap size={18} className="text-green-600" />}
              </h3>
              <p className="text-gray-700 font-bold">{slot.venue?.name}</p>
              <p className="text-gray-500 text-sm">{slot.venue?.location} · {slot.floor}</p>
              <p className="text-2xl font-black text-[#8B1E3F] my-4">₹{slot.pricePerHour}</p>

              <button
                onClick={() => openBookingModal(slot)}
                disabled={slot.isBooked}
                className={`w-full py-3 rounded-xl font-bold ${slot.isBooked
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#8B1E3F] text-white hover:bg-[#A61E4D]"
                  }`}
              >
                {slot.isBooked ? "Closed" : "Book Now"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 font-medium col-span-3 text-center py-10">
            No slots found for "{searchQuery}" Oops!
          </p>
        )}
      </div>

      {bookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setBookingModal(null)}>
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-black text-xl mb-1">Book Slot {bookingModal.slotNumber}</h3>
            <p className="text-gray-500 text-sm mb-6">{bookingModal.venue?.name}</p>

            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              min={todayStr()}
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-[#8B1E3F] mb-4"/>

            <div className="grid grid-cols-2 gap-3 mb-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                <select
                  value={startHour}
                  onChange={(e) => handleStartHourChange(e.target.value)}
                  className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-[#8B1E3F]"
                >
                  {Array.from({ length: 24 }, (_, h) => (
                    <option key={h} value={h}>{h.toString().padStart(2, "0")}:00</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                <select
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-[#8B1E3F]"
                >
                  {Array.from({ length: 24 }, (_, h) => h + 1)
                    .filter((h) => h > Number(startHour))
                    .map((h) => (
                      <option key={h} value={h}>{h.toString().padStart(2, "0")}:00</option>
                    ))}
                </select>
              </div>
            </div>

            {occupied.length > 0 && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-3 text-sm text-red-600 font-semibold">
                Already booked: {occupied.map((o, i) => (
                  <span key={i}>{o.startHour}:00–{o.endHour}:00{i < occupied.length - 1 ? ", " : ""}</span>
                ))}
              </div>
            )}
            {hasClientSideConflict && (
              <p className="text-red-500 text-sm font-bold mb-3">⚠️ Your selected time overlaps an existing booking.</p>
            )}

            <p className="text-xs text-gray-400 mb-4">
              Peak-hour pricing (9-11 AM, 5-8 PM) may apply automatically at checkout.
            </p>

            {error && <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>}

            <div className="flex gap-3">
              <button onClick={() => setBookingModal(null)} className="w-full py-3 rounded-xl font-bold bg-gray-100">Cancel</button>
              <button
                onClick={confirmBooking}
                disabled={hasClientSideConflict}
                className="w-full py-3 rounded-xl font-bold bg-[#8B1E3F] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
