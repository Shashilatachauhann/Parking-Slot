import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import AuthLayout from "./components/AuthLayout"; 
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reservations from "./pages/Reservations.jsx";
import ParkingSlots from "./pages/ParkingSlots.jsx";
import Support from "./pages/Support.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Logout from "./pages/Logout.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Profile from "./pages/Profile.jsx";
import AboutUs from "./pages/AboutUs";
import FindParking from "./pages/FindParking.jsx";
import ManageSlots from "./pages/ManageSlots.jsx";
function App() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole") || "";
    
    setIsLoggedIn(loggedIn);
    setUserRole(role);
    setLoading(false); 
  }, [location]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8F8FA] font-bold text-[#8B1E3F]">
        Loading ParkMate...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8FA]">
      
      {!isLoggedIn ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/findparking" element={<FindParking />} />
        
          </Routes>
        </>
      ) : (
        <AuthLayout role={userRole}>
          <Routes>
            <Route path="/logout" element={<Logout />} />
            <Route path="/support" element={<Support />} />
            {userRole === "user" && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/slots" element={<ParkingSlots />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </>
            )}

            {userRole === "admin" && (
              <>
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/" element={<Navigate to="/admindashboard" replace />} />
                <Route path="*" element={<Navigate to="/admindashboard" replace />} />
                <Route path="/manageslots" element={<ManageSlots />} />

              </>
            )}
          </Routes>
        </AuthLayout>
      )}
    </div>
  );
}

export default App;