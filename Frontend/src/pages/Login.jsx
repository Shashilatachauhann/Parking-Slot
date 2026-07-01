import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
            localStorage.setItem("isLoggedIn", "true");
            const savedName = localStorage.getItem("username") || "User";
            localStorage.setItem("username", savedName);

            localStorage.setItem("userRole", "user");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError("Please enter a valid email format");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setError("");

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");
        localStorage.setItem("username", "Shashi");

        alert("✅ Login Successful! Welcome back to ParkMate.");

        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F8FA] px-4 relative overflow-hidden">

            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#8B1E3F]/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#8B1E3F]/10 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-4xl p-10 shadow-2xl border border-gray-100 relative z-10">

                <div className="flex flex-col items-center justify-center mb-8">
                    <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
                        <span className="border-[3px] border-[#550206] rounded-xl px-3 py-1 text-2xl font-bold text-[#550206]">
                            P
                        </span>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold text-[#550206] leading-tight"> ParkMate </h1>
                            <p className="text-[11px] tracking-[4px] text-gray-500">SMART PARK</p>
                        </div>
                    </Link>
                    <p className="text-gray-500 mt-5 font-medium text-center">
                        Welcome back! Please login to your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-gray-900 outline-none focus:bg-white focus:border-[#8B1E3F] focus:ring-4 focus:ring-[#8B1E3F]/10 transition-all"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <Link to="/support" className="text-sm font-bold text-[#8B1E3F] hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-gray-900 outline-none focus:bg-white focus:border-[#8B1E3F] focus:ring-4 focus:ring-[#8B1E3F]/10 transition-all"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[#8B1E3F] py-4 mt-2 font-bold text-white shadow-lg shadow-[#8B1E3F]/20 hover:bg-[#A61E4D] transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-500 font-medium">
                    Don't have an account?
                    <Link to="/signup" className="ml-2  text-[#8B1E3F] hover:underline transition-all">
                        Create an account
                    </Link>
                </p>

            </div>
        </div>
    );
}