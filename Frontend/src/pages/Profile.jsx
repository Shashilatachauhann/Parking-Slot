import { useState } from "react";
import { User, Mail, Phone, MapPin, Save, Camera } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : {
      name: localStorage.getItem("username") || "Shashilata",
      email: "shashi@example.com",
      phone: "+91 98765 43210",
      address: "Lucknow, Uttar Pradesh"
    };
  });

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    localStorage.setItem("username", user.name);
    window.dispatchEvent(new Event("storage"));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Profile</h1>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-24 h-24 bg-[#8B1E3F]/10 rounded-full flex items-center justify-center text-[#8B1E3F] text-3xl font-bold">
            {user.name.charAt(0)}
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border hover:bg-gray-50">
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 font-medium">Member since June 2026</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2"><User size={16}/> Full Name</label>
            <input 
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 disabled:bg-transparent"
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2"><Mail size={16}/> Email</label>
            <input 
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 disabled:bg-transparent"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2"><Phone size={16}/> Phone</label>
            <input 
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 disabled:bg-transparent"
              value={user.phone}
              onChange={(e) => setUser({...user, phone: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2"><MapPin size={16}/> Address</label>
            <input 
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 disabled:bg-transparent"
              value={user.address}
              onChange={(e) => setUser({...user, address: e.target.value})}
            />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-[#8B1E3F] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#A61E4D] transition-all"
            >
              Edit Profile
            </button>
          ) : (
            <button 
              onClick={handleSave}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 flex items-center gap-2 transition-all"
            >
              <Save size={18} /> Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}