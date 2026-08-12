import { useState, useEffect } from "react";
import { LogIn, LogOut, CheckCircle2, XCircle } from "lucide-react";
import api from "../api/axios";

const todayStr = () => new Date().toISOString().split("T")[0];

export default function GateControl() {
  const [pin, setPin] = useState("");
  const [date, setDate] = useState(todayStr());
  const [message, setMessage] = useState(null); // { type: "success" | "error", text }
  const [checkingIn, setCheckingIn] = useState(false);
  const [parked, setParked] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadParked = () => {
    api
      .get("/bookings/venue/parked")
      .then(({ data }) => setParked(data))
      .catch(() => setParked([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadParked();
    const interval = setInterval(loadParked, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (!pin.trim()) return;

    setCheckingIn(true);
    setMessage(null);
    try {
      const { data } = await api.post("/bookings/checkin", { pin: pin.trim(), date });
      setMessage({
        type: "success",
        text: `Entry confirmed — Slot ${data.booking.slot?.slotNumber}, ${data.booking.user?.name || "Guest"}`,
      });
      setPin("");
      loadParked();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Check-in failed" });
    } finally {
      setCheckingIn(false);
    }
  };

  const handleCheckOut = async (id) => {
    setMessage(null);
    try {
      const { data } = await api.patch(`/bookings/${id}/checkout`);
      const overstayNote =
        data.overstayMinutes > 0 ? ` (overstayed by ${data.overstayMinutes} min)` : "";
      setMessage({
        type: "success",
        text: `Exit confirmed — Slot ${data.booking.slot?.slotNumber}${overstayNote}`,
      });
      setParked((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Check-out failed" });
    }
  };

  return (
    <div className="w-full p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black mb-2">Gate Control</h1>
      <p className="text-gray-500 mb-8">Check vehicles in and out using their booking PIN.</p>

      <div className="bg-white rounded-3xl border border-gray-100 p-6 mb-8 max-w-lg">
        <h3 className="font-black text-lg mb-4 flex items-center gap-2">
          <LogIn size={20} className="text-[#8B1E3F]" /> Check In
        </h3>
        <form onSubmit={handleCheckIn} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Booking PIN</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="6-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-[#8B1E3F] tracking-widest font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-[#8B1E3F]"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={checkingIn}
            className="bg-[#8B1E3F] text-white font-bold py-3 rounded-xl disabled:opacity-50"
          >
            {checkingIn ? "Checking in..." : "Confirm Entry"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 flex items-start gap-2 p-3 rounded-xl text-sm font-semibold ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            {message.text}
          </div>
        )}
      </div>

      <h3 className="font-black text-lg mb-4 flex items-center gap-2">
        <LogOut size={20} className="text-[#8B1E3F]" /> Currently Parked ({parked.length})
      </h3>

      <div className="bg-white rounded-3xl border overflow-hidden max-w-3xl">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : parked.length === 0 ? (
          <p className="p-6 text-gray-500">No vehicles currently checked in.</p>
        ) : (
          parked.map((b) => (
            <div key={b._id} className="flex justify-between items-center p-5 border-b last:border-b-0">
              <div>
                <p className="font-bold">
                  Slot {b.slot?.slotNumber} <span className="text-gray-400 font-normal">• {b.slot?.floor}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {b.user?.name || "Guest"} • Vehicle: <span className="font-bold text-gray-700">{b.vehicleNumber}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Checked in at {new Date(b.checkInTime).toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => handleCheckOut(b._id)}
                className="bg-[#8B1E3F] text-white font-bold text-sm px-4 py-2.5 rounded-xl"
              >
                Check Out
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
