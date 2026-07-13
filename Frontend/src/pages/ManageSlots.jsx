import { useState, useEffect } from "react";
import { Plus, Trash2, Zap } from "lucide-react";
import api from "../api/axios";

export default function ManageSlots() {
  const [slots, setSlots] = useState([]);
  const [venue, setVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ slotNumber: "", floor: "", pricePerHour: "", isEV: false });
  const [error, setError] = useState("");

  const loadSlots = () => {
    api.get("/venues/mine").then(({ data }) => {
      setVenue(data);
      api.get(`/slots?venue=${data._id}`).then((res) => setSlots(res.data));
    });
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/slots", formData);
      setSlots([...slots, data]);
      setIsModalOpen(false);
      setFormData({ slotNumber: "", floor: "", pricePerHour: "", isEV: false });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create slot");
    }
  };

  const deleteSlot = async (id) => {
    try {
      await api.delete(`/slots/${id}`);
      setSlots(slots.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete slot");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Slot Inventory</h1>
          {venue && <p className="text-gray-500 mt-1">{venue.name} — {venue.location}</p>}
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#8B1E3F] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#A61E4D]">
          <Plus size={20} /> Add New Slot
        </button>
      </div>


      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-6 text-xs font-bold text-gray-400 uppercase">Slot Name</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase">Floor</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase">Rate</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase">Status</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slots.map((slot) => (
              <tr key={slot.id} className="hover:bg-gray-50">
                <td className="p-6 font-black text-gray-800 flex items-center gap-2">
                  {slot.slotNumber} {slot.isEV && <Zap size={16} className="text-green-600" />}
                </td>
                <td className="p-6 font-medium text-gray-600">{slot.floor}</td>
                <td className="p-6 font-bold text-gray-700">₹{slot.pricePerHour}</td>
                <td className="p-6">
                  <span className={`font-bold text-xs px-3 py-1 rounded-full ${slot.isBooked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {slot.isBooked ? "Occupied" : "Available"}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <button onClick={() => deleteSlot(slot.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Section (Inside same file) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAdd} className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-black mb-6">Add New Slot</h2>
            <div className="space-y-4">
              <input
                required placeholder="Slot Name (e.g. A-01)"
                value={formData.slotNumber}
                className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:border-[#8B1E3F]"
                onChange={(e) => setFormData({ ...formData, slotNumber: e.target.value })}
              />
              <input
                placeholder="Floor / Zone (e.g. Basement 1)"
                value={formData.floor}
                className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:border-[#8B1E3F]"
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
              />
              <input
                type="number" required placeholder="Hourly Price (₹)"
                value={formData.pricePerHour}
                className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:border-[#8B1E3F]"
                onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
              />
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-600 px-1">
                <input
                  type="checkbox"
                  checked={formData.isEV}
                  onChange={(e) => setFormData({ ...formData, isEV: e.target.checked })}
                  className="w-4 h-4 accent-[#8B1E3F]"
                />
                <Zap size={16} /> EV Charging Slot
              </label>
            </div>
            <div className="flex gap-3 mt-8">
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-3 rounded-xl font-bold bg-gray-100">Cancel</button>
              <button type="submit" className="w-full py-3 rounded-xl font-bold bg-[#8B1E3F] text-white">Create Slot</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}