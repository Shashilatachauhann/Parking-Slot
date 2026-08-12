import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AuthLayout from "./components/AuthLayout";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reservations from "./pages/Reservations.jsx";
import ParkingSlots from "./pages/ParkingSlots.jsx";
import Support from "./pages/Support.jsx";
import Logout from "./pages/Logout.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminProfile from "./pages/AdminProfile.jsx";
import AdminSupportTickets from "./pages/AdminSupportTickets.jsx";
import Profile from "./pages/Profile.jsx";
import AboutUs from "./pages/AboutUs";
import FindParking from "./pages/FindParking.jsx";
import ManageSlots from "./pages/ManageSlots.jsx";
import Bookings from "./pages/Bookings.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import GateControl from "./pages/GateControl.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  const { isLoggedIn, role } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8F8FA]">

      {!isLoggedIn ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/findparking" element={<FindParking />} />
          </Routes>
        </>
      ) : (
        <AuthLayout role={role}>
          <Routes>
            <Route path="/logout" element={<Logout />} />

            {role === "user" && (
              <>
                {/* Users submit complaints to a specific venue's admin */}
                <Route path="/support" element={<Support />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/slots" element={<ParkingSlots />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/findparking" element={<FindParking />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </>
            )}

            {role === "admin" && (
              <>
                <Route path="/support" element={<Support />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/" element={<Navigate to="/admindashboard" replace />} />
                <Route path="*" element={<Navigate to="/admindashboard" replace />} />
                <Route path="/manageslots" element={<ManageSlots />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/admin/gate" element={<GateControl />} />
                <Route path="/admin-tickets" element={<AdminSupportTickets />} />
                <Route path="/adminprofile" element={<AdminProfile />} />
              </>
            )}
          </Routes>
        </AuthLayout>
      )}
    </div>
  );
}

export default App;