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
            setError("All fields are required");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError("Enter valid email");
            return;

        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;

        }

        setError("");

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "user");
        // Temporary Username
        localStorage.setItem("username", "Shashi");

        navigate("/dashboard");

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-[#8B1E3F]/10">
                <h1 className="text-3xl font-bold text-center text-[#8B1E3F]">Login</h1>
                <p className="text-center text-gray-500 mt-2">Welcome Back</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="block mb-2 font-medium">Email</label>
                        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border p-3 outline-none focus:border-[#8B1E3F]" />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Password</label>
                        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border p-3 outline-none focus:border-[#8B1E3F]" />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button type="submit" className=" w-full rounded-xlbg-[#8B1E3F] py-3 font-semibold text-white transition hover:bg-[#A61E4D]">Login</button>
                </form>
                <p className="mt-5 text-center text-gray-500">Don't have an account?
                    <Link to="/signup" className="ml-2 font-semibold text-[#8B1E3F]">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}