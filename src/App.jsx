import { Routes, Route, useLocation } from "react-router-dom";
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

function App() {

  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(

    localStorage.getItem("isLoggedIn") === "true"

  );


  useEffect(() => {

    setIsLoggedIn(

      localStorage.getItem("isLoggedIn") === "true"

    );

  }, [location]);


  return (

    <div className="min-h-screen bg-[#F8F8FA]">


      {/* Guest Navbar Only */}

      {!isLoggedIn && <Navbar />}


      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/admin-login" element={<AdminLogin />} />



        {/* User Pages */}

        <Route

          path="/dashboard"

          element={<Dashboard />}

        />


        <Route

          path="/reservations"

          element={<Reservations />}

        />


        <Route

          path="/slots"

          element={<ParkingSlots />}

        />


        <Route

          path="/support"

          element={<Support />}

        />


        <Route

          path="/logout"

          element={<Logout />}

        />
        <Route
  path="/admindashboard"
  element={
      <AdminDashboard />
  }
/>

      </Routes>


    </div>

  );

}

export default App;