import { useEffect, useState } from "react";
import { Building2, MapPin, Layers, Mail, Phone, User, LifeBuoy, Save } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function AdminProfile() {
  const { user } = useAuth();

  const [venue, setVenue] = useState(null);
  const [form, setForm] = useState({ name: "", location: "", capacity: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketSent, setTicketSent] = useState(false);

  useEffect(() => {
    api
      .get("/venues/mine")
      .then(({ data }) => {
        setVenue(data);
        setForm({ name: data.name, location: data.location, capacity: data.capacity });
      })
      .catch(() => setMessage("Could not load venue details"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const { data } = await api.put("/venues/mine", form);
      setVenue(data.venue);
      setMessage("Venue details updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update venue");
    } finally {
      setSaving(false);
    }
  };

  const handlePlatformTicket = async (e) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    try {
      await api.post("/support", { subject: "Other", message: ticketMessage });
      setTicketSent(true);
      setTicketMessage("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send message");
    }
  };

  if (loading) return <p className="text-gray-500">Loading profile...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto pb-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Profile</h1>
        <p className="text-gray-500 mt-2">Manage your account and venue details.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h2 className="font-bold text-lg flex items-center gap-2"><User size={20}/> Your Account</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600"><User size={16}/> {user?.name}</div>
          <div className="flex items-center gap-2 text-gray-600"><Mail size={16}/> {user?.email}</div>
          {user?.phone && <div className="flex items-center gap-2 text-gray-600"><Phone size={16}/> {user.phone}</div>}
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h2 className="font-bold text-lg flex items-center gap-2"><Building2 size={20}/> Venue Details</h2>

        <div className="relative">
          <Building2 className="absolute left-4 top-4 text-gray-400" size={18} />
          <input name="name" value={form.name} onChange={handleChange} placeholder="Venue Name"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3.5 pl-11 outline-none focus:bg-white focus:border-[#8B1E3F]" />
        </div>

        <div className="relative">
          <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3.5 pl-11 outline-none focus:bg-white focus:border-[#8B1E3F]" />
        </div>

        <div className="relative">
          <Layers className="absolute left-4 top-4 text-gray-400" size={18} />
          <input name="capacity" type="number" min="1" value={form.capacity} onChange={handleChange} placeholder="Capacity"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3.5 pl-11 outline-none focus:bg-white focus:border-[#8B1E3F]" />
        </div>

        {message && <p className="text-sm font-semibold text-[#8B1E3F]">{message}</p>}

        <button disabled={saving} className="flex items-center gap-2 bg-[#8B1E3F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#A61E4D] disabled:opacity-60">
          <Save size={18}/> {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Platform-level support — separate from venue support tickets */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h2 className="font-bold text-lg flex items-center gap-2"><LifeBuoy size={20}/> Contact ParkMate Platform Team</h2>
        <p className="text-sm text-gray-500">
          For platform bugs, account issues, or anything.
        </p>

        {ticketSent ? (
          <p className="text-sm font-semibold text-green-600">Message sent to the ParkMate!</p>
        ) : (
          <form onSubmit={handlePlatformTicket} className="space-y-3">
            <textarea
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full h-28 p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#8B1E3F]/20"
            />
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-black">
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
