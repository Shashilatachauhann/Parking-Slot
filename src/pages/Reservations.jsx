function Reservations() {


  return (

    <div className="min-h-screen mt-20">

      <main className="max-w-6xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold text-[#8B1E3F]">
          Reservations
        </h1>

        <p className="mt-3 text-gray-600">
          View and manage your parking reservations.
        </p>

        <div className="mt-10 space-y-6">

          {/* confirmed */}
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold text-[#8B1E3F]">
                Downtown Plaza
              </h2>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
                Confirmed
              </span>

            </div>

            <p className="mt-2 text-black">
              Slot: A1
            </p>

            <p className="text-gray-600">
              Date: 22 June 2026
            </p>

            <p className="text-gray-600">
              Time: 2:00 PM - 5:00 PM
            </p>

            <button className="mt-4 px-4 py-2 bg-[#8B1E3F] text-white rounded hover:bg-[#A61E4D] transition">
              Cancel Reservation
            </button>

          </div>



          {/* upcoming */}
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold text-[#8B1E3F]">
                City Mall Parking
              </h2>

              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-sm">
                Upcoming
              </span>

            </div>

            <p className="mt-2 text-black">
              Slot: B3
            </p>

            <p className="text-gray-600">
              Date: 25 June 2026
            </p>

            <p className="text-gray-600">
              Time: 10:00 AM - 1:00 PM
            </p>

            <button className="mt-4 px-4 py-2 bg-[#8B1E3F] text-white rounded hover:bg-[#A61E4D] transition">
              Cancel Reservation
            </button>

          </div>

         {/* completed */}
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold text-[#8B1E3F]">
                Business Hub Parking
              </h2>

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                Completed
              </span>

            </div>

            <p className="mt-2 text-black">
              Slot: C5
            </p>

            <p className="text-gray-600">
              Date: 18 June 2026
            </p>

            <p className="text-gray-600">
              Time: 9:00 AM - 11:00 AM
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Reservations;