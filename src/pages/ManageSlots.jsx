import { useState, useEffect } from "react";
import { Trash2, PlusCircle, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

export default function ManageSlots() {
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({ name: "", location: "", price: "" });

  useEffect(() => {
    const savedSlots = JSON.parse(localStorage.getItem("parkingSlots") || "[]");
    setSlots(savedSlots);
  }, []);


  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.price) return alert("Please fill all fields!");

   const newSlot = {
    name: formData.name, 
    location: formData.location,
    price: formData.price,
    id: Date.now(), 
    status: "Available"
  };
    const updatedSlots = [...slots, newSlot];
    setSlots(updatedSlots);
    localStorage.setItem("parkingSlots", JSON.stringify(updatedSlots));
    setFormData({ name: "", location: "", price: "" }); // Reset form
  };

 
  const handleDelete = (id) => {
    const filtered = slots.filter((slot) => slot.id !== id);
    setSlots(filtered);
    localStorage.setItem("parkingSlots", JSON.stringify(filtered));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Manage Slots</h1>
        <Link to="/admindashboard" className="flex items-center gap-2 text-[#8B1E3F] font-bold hover:underline">
          <LayoutDashboard size={20} /> Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleAddSlot} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-10 grid md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Slot Name</label>
          <input className="w-full p-3 border rounded-xl mt-1" placeholder="e.g. A-12" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="md:col-span-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Location</label>
          <input className="w-full p-3 border rounded-xl mt-1" placeholder="e.g. Hazratganj" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
        </div>
        <div className="md:col-span-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Price</label>
          <input className="w-full p-3 border rounded-xl mt-1" placeholder="e.g. ₹40/hr" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
        </div>
        <button className="bg-[#8B1E3F] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#A61E4D]">
          <PlusCircle size={20} /> Add
        </button>
      </form>

      <div className="space-y-4">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <div key={slot.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{slot.name}</h3>
                <p className="text-sm text-gray-500">{slot.location} • {slot.price}</p>
              </div>
              <button onClick={() => handleDelete(slot.id)} className="text-red-500 hover:bg-red-50 p-3 rounded-xl transition">
                <Trash2 size={20} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-10">No slots added yet. Start by adding one above!</p>
        )}
      </div>
    </div>
  );
}