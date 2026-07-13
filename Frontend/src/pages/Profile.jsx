import { useState } from "react";
import { User, Mail, Phone, MapPin, Save, Camera } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
   const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await updateProfile(form);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Profile</h1>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-24 h-24 bg-[#8B1E3F]/10 rounded-full flex items-center justify-center text-[#8B1E3F] text-3xl font-bold">
            {user?.name?.charAt(0)}
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border hover:bg-gray-50">
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500 font-medium capitalize">{user?.role} account</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2"><User size={16}/> Full Name</label>
            <input 
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 disabled:bg-transparent"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2"><Mail size={16}/> Email</label>
            <input 
              disabled
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 disabled:bg-transparent"
              value={user?.email}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2"><Phone size={16}/> Phone</label>
            <input 
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 disabled:bg-transparent"
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
            />
          </div>
        </div>
       {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}
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
            disabled={saving}
              onClick={handleSave}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 flex items-center gap-2 transition-all"
            >
              <Save size={18} /> {saving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}