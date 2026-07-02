import { useState } from "react";
import { Plus, Trash2, Edit2, CheckCircle2, XCircle, Search } from "lucide-react";

function AddSlotModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({ name: "", type: "Compact", price: "" });
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-sm rounded-4xl p-8 shadow-2xl">
        <h2 className="text-2xl font-black mb-6">Add New Slot</h2>
        <form onSubmit={(e) => { e.preventDefault(); onAdd(formData); onClose(); }} className="space-y-4">
          <input required placeholder="Slot Name (e.g. A-10)" className="w-full border p-3 rounded-xl outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
          <select className="w-full border p-3 rounded-xl outline-none" onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="Compact">Compact</option>
            <option value="SUV">SUV</option>
            <option value="EV">EV Charging</option>
          </select>
          <input type="number" required placeholder="Hourly Price (₹)" className="w-full border p-3 rounded-xl outline-none" onChange={e => setFormData({...formData, price: e.target.value})} />
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="w-full py-3 rounded-xl font-bold bg-gray-100">Cancel</button>
            <button type="submit" className="w-full py-3 rounded-xl font-bold bg-[#8B1E3F] text-white">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Page Component
export default function ManageSlots() {
  const [slots, setSlots] = useState([
    { id: 1, name: "A-01", type: "Compact", price: 50, status: "Available" },
    { id: 2, name: "B-05", type: "EV", price: 150, status: "Occupied" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNewSlot = (data) => {
    setSlots([...slots, { ...data, id: Date.now(), status: "Available" }]);
  };

  const deleteSlot = (id) => setSlots(slots.filter(s => s.id !== id));

  return (
    <div className="p-8 bg-[#FAFAFA] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Slot Inventory</h1>
          <p className="text-gray-500">Manage, add, and monitor your parking infrastructure.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#8B1E3F] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#A61E4D]">
          <Plus size={20} /> Add New Slot
        </button>
      </div>

      <div className="bg-white rounded- border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase">Slot Name</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase">Category</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase">Rate</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase">Status</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slots.map((slot) => (
              <tr key={slot.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-6 font-black text-gray-800">{slot.name}</td>
                <td className="p-6"><span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold">{slot.type}</span></td>
                <td className="p-6 font-bold">₹{slot.price}</td>
                <td className="p-6">
                  <div className={`flex items-center gap-2 text-xs font-bold ${slot.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                    {slot.status === 'Available' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {slot.status}
                  </div>
                </td>
                <td className="p-6">
                  <button onClick={() => deleteSlot(slot.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSlotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addNewSlot} />
    </div>
  );
}
