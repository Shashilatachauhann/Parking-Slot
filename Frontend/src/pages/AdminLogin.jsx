import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // 2. Backend API Call
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user.role !== 'admin') {
          setError("Access Denied! This is an admin login page.");
          setLoading(false);
          return;
        }
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("username", data.user.name);

        alert("✅ Admin Login Successful! Welcome back, Admin.");
        navigate("/admindashboard");
      } else {
        setError(data.message || "Invalid Admin Credentials");
      }
    } catch (err) {
      setError("Could not connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8FA] px-4 relative overflow-hidden">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-4xl p-10 shadow-2xl border border-gray-200 relative z-10">
        
        <div className="flex flex-col items-center justify-center mb-8">
          <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <span className="border-[3px] border-[#550206] rounded-xl px-3 py-1 text-2xl font-bold text-[#550206]">P</span>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-[#550206] leading-tight"> ParkMate </h1>
              <p className="text-[11px] tracking-[4px] text-gray-500">SMART PARK</p>
            </div>
          </Link>
          
          <div className="mt-6 text-center">
            <span className="bg-[#550206] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-sm">
              Admin Portal
            </span>
            <p className="text-gray-500 mt-3 text-sm font-medium">Secure login for authorized personnel only.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-800">Admin Email</label>
            <input 
              type="email" 
              placeholder="admin@parkmate.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-gray-900 outline-none focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all" 
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-800">Secure Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-gray-900 outline-none focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all" 
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <button 
            disabled={loading}
            type="submit" 
            className="w-full rounded-xl bg-[#550206] py-4 mt-2 font-bold text-white shadow-xl shadow-gray-900/20 hover:bg-red-900 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            {loading ? "Authenticating..." : "Authenticate Admin"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          Not an admin?
          <Link to="/login" className="ml-2 font-bold text-[#8B1E3F] hover:underline transition-all">Go to User Login</Link>
        </p>
      </div>
    </div>
  );
}