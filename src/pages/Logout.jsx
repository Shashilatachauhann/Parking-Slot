import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth state and redirect immediately to home
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-[#8B1E3F]/10 text-center">
        <h1 className="text-3xl font-bold text-[#8B1E3F]">Logged out</h1>
        <p className="mt-4 text-gray-500">
          You have been successfully signed out. Redirecting to the homepage...
        </p>
      </div>
    </div>
  );
}
