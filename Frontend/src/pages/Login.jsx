import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) return setError("Please fill in all fields");

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.user.role !== 'user') {
                    return setError("Access Denied! it's a user login page.");
                }

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", data.user.name);
                localStorage.setItem("userRole", data.user.role);

                alert(`Welcome back, ${data.user.name}!`);
                navigate("/dashboard");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Could not connect to the server. Please try again later.");
        } finally {
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
                            <p className="text-[11px] tracking-[4px] text-gray-500">USER LOGIN</p>
                        </div>
                    </Link>
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
                    New here? <Link to="/signup" className="text-[#8B1E3F] hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
}