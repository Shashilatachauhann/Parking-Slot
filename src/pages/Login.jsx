import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);

    navigate("/dashboard");
  };

  return (
    <div className="p-10 max-w-md mx-auto mt-50 border border-gray-300 shadow-2xl rounded-lg">

      <h1 className="text-2xl text-center font-bold text-[#8B1E3F] mb-6">
        Login
      </h1>

      <label className="block text-lg font-medium text-[#7e0707] mb-2">Email</label>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />

      <label className="block text-lg font-medium text-[#7e0707] mb-2">Password</label>
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />

         <button
        onClick={handleSubmit}
        className="w-full bg-[#8B1E3F] text-white p-2 rounded hover:bg-[#710229] cursor-pointer"
      >
        Login
      </button>

      <p className="mt-4 text-center text-gray-600">
        Don't have account?{" "}
        <Link to="/signup" className="text-[#8B1E3F] font-semibold cursor-pointer">
          Sign Up
        </Link>
      </p>

    </div>
  );
}