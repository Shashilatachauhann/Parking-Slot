import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, email, password });

    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-50 p-6 border border-gray-300 shadow-2xl rounded-lg">

      <h1 className="text-2xl font-bold text-[#8B1E3F] mb-6 text-center">
        Create Account
      </h1>
      <label className="block text-lg font-medium text-[#7e0707] mb-2">Name</label>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />
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

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#8B1E3F] text-white p-2 rounded cursor-pointer"
      >
        Create Account
      </button>

      <p className="mt-4 text-center text-gray-600">
        Already have account?{" "}
        <Link to="/login" className="text-[#8B1E3F] font-semibold cursor-pointer">
          Login
        </Link>
      </p>

    </div>
  );
}

export default Signup;