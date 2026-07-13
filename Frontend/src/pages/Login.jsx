import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [role, setRole] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) return setError("Please fill in all fields");

        setLoading(true);

        try {
           const loggedInUser = await login(email, password, role);
           navigate(loggedInUser.role ==="admin" ? "/admindashboard" : "/dashboard");
        }
        catch(err){
            setError(err.response?.data?.message || err.message || "Invalid Email or Password");
        }
        finally{
           setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F8FA] px-4 relative overflow-hidden">

            <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-4xl p-10 shadow-2xl border border-gray-100 relative z-10">
                <div className="flex flex-col items-center justify-center mb-8">
                    <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
                        <span className="border-[3px] border-[#550206] rounded-xl px-3 py-1 text-2xl font-bold text-[#550206]">P</span>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold text-[#550206] leading-tight">ParkMate</h1>
                            <p className="text-[11px] tracking-[4px] text-gray-500">LOGIN</p>
                        </div>
                    </Link>
                </div>
                 <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-6">
                    <button
                        type="button"
                        onClick={() => setRole("user")}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            role === "user" ? "bg-white text-[#8B1E3F] shadow-sm" : "text-gray-500"
                        }`}
                    >
                        User
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("admin")}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            role === "admin" ? "bg-white text-[#8B1E3F] shadow-sm" : "text-gray-500"
                        }`}
                    >
                        Admin
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 outline-none focus:bg-white focus:border-[#8B1E3F]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 outline-none focus:bg-white focus:border-[#8B1E3F]"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm font-bold text-center">⚠️ {error}</p>}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full rounded-xl bg-[#8B1E3F] py-4 mt-2 font-bold text-white hover:bg-[#A61E4D] transition-all"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-500 font-medium">
                    Don't Have an Account? <Link to="/signup" className="text-[#8B1E3F] hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
}