import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, ShieldCheck, ArrowRight, Building2, MapPin, Layers } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    venueName: "",
    venueLocation: "",
    venueCapacity: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      return setError("Name, email, and password are required");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }
    if (formData.role === "admin" && (!formData.venueName || !formData.venueLocation || !formData.venueCapacity)) {
      return setError("Please fill in your venue's name, location, and capacity");
    }

    setLoading(true);
    try {
      const newUser = await signup(formData);
      navigate(newUser.role === "admin" ? "/admindashboard" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8FA] p-6">
      <div className="w-full max-w-lg bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100">

        <div className="flex flex-col items-center justify-center mb-8">
          <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <span className="border-[3px] border-[#8B1E3F] rounded-xl px-3 py-1 text-2xl font-bold text-[#8B1E3F]">P</span>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-[#8B1E3F] leading-tight">ParkMate</h1>
              <p className="text-[11px] tracking-[4px] text-gray-500">SMART PARK</p>
            </div>
          </Link>
          <p className="text-gray-500 mt-5 font-medium text-center">Create your account and start parking smarter.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="relative">
            <User className="absolute left-4 top-4 text-gray-400" size={20} />
            <input name="name" placeholder="Full Name" value={formData.name} className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] transition-all" onChange={handleChange} />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
            <input name="email" type="email" placeholder="Email Address" value={formData.email} className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] transition-all" onChange={handleChange} />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
            <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] transition-all" onChange={handleChange} />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
            <input name="password" type="password" placeholder="Password" value={formData.password} className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] transition-all" onChange={handleChange} />
          </div>

          <div className="relative">
            <ShieldCheck className="absolute left-4 top-4 text-gray-400" size={20} />
            <select name="role" value={formData.role} className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] bg-white appearance-none transition-all" onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Venue Admin</option>
            </select>
          </div>
          {formData.role === "admin" && (
            <div className="space-y-5 border-t-2 border-dashed border-gray-100 pt-5">
              <p className="text-sm font-bold text-gray-500">Your Venue Details</p>

              <div className="relative">
                <Building2 className="absolute left-4 top-4 text-gray-400" size={20} />
                <input name="venueName" placeholder="Venue Name (e.g. Wave Mall)" value={formData.venueName} className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] transition-all" onChange={handleChange} />
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                <input name="venueLocation" placeholder="Venue Location (e.g. Gomti Nagar)" value={formData.venueLocation} className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] transition-all" onChange={handleChange} />
              </div>

              <div className="relative">
                <Layers className="absolute left-4 top-4 text-gray-400" size={20} />
                <input name="venueCapacity" type="number" min="1" placeholder="Total Capacity (number of slots)" value={formData.venueCapacity} className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] transition-all" onChange={handleChange} />
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

          <button disabled={loading} className="w-full bg-[#8B1E3F] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#A61E4D] active:scale-95 transition-all shadow-lg shadow-[#8B1E3F]/20">
            {loading ? "Signing up..." : <> Sign up <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          Already have an account? <Link to="/login" className="text-[#8B1E3F] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
