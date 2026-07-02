import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.name || !formData.email || !formData.password) {
      return setError("All fields are required");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
      
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", formData.name);
        localStorage.setItem("userRole", formData.role);
        
        window.location.href = formData.role === "admin" ? "/admindashboard" : "/dashboard";
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server se connect nahi ho pa raha hai. Server chalu hai?");
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
            <input placeholder="Full Name" className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
            <input type="email" placeholder="Email Address" className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
            <input type="password" placeholder="Password" className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] transition-all" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <div className="relative">
            <ShieldCheck className="absolute left-4 top-4 text-gray-400" size={20} />
            <select className="w-full rounded-2xl border-2 border-gray-100 p-4 pl-12 outline-none focus:border-[#8B1E3F] bg-white appearance-none transition-all" onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

          <button disabled={loading} className="w-full bg-[#8B1E3F] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#A61E4D] active:scale-95 transition-all shadow-lg shadow-[#8B1E3F]/20">
            {loading ? "Signing up..." : <>Get Started <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          Already have an account? <Link to="/login" className="text-[#8B1E3F] hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}