import { Clapperboard } from "lucide-react";

function Dashboard() {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-6xl mx-auto px-4 py-35">

        <h1 className="text-4xl font-bold text-[#8B1E3F]">
          Welcome Back 
        </h1>

        <p className="mt-3 text-gray-600">
          Manage your parking reservations and find available parking slots.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mt-10">

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#8B1E3F] mb-2">
              Active Reservation
            </h2>

            <p className="text-3xl font-bold text-black">
              1
            </p>

            <p className="text-gray-600 mt-2">
              Current Booking
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#8B1E3F] mb-2">
              Available Slots
            </h2>

            <p className="text-3xl font-bold text-black">
              20
            </p>

            <p className="text-gray-600 mt-2">
              Nearby Parking
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#8B1E3F] mb-2">
              Total Reservations
            </h2>

            <p className="text-3xl font-bold text-black">
              12
            </p>

            <p className="text-gray-600 mt-2">
              This Month
            </p>
          </div>

        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mt-10">

          <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-4">
            Current Reservation
          </h2>

          <p className="text-black">
            <strong>Location:</strong> Downtown Plaza
          </p>

          <p className="text-black mt-2">
            <strong>Time:</strong> 2:00 PM - 5:00 PM
          </p>

          <p className="text-green-600 mt-3 font-medium">
            Confirmed
          </p>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <button className="px-6 py-3 rounded-lg border border-[#8B1E3F] text-[#8B1E3F]">
              Reserve Spot
            </button>

            <button className="px-6 py-3 rounded-lg border border-[#8B1E3F] text-[#8B1E3F]">
              View Reservations
            </button>

            <button className="px-6 py-3 rounded-lg border border-[#8B1E3F] text-[#8B1E3F]">
              Find Parking
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;