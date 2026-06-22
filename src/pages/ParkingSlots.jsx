import { Car } from "lucide-react";

function ParkingSlots() {
  const slots = [
    { id: "A1", status: "available" },
    { id: "A2", status: "occupied" },
    { id: "A3", status: "reserved" },
    { id: "A4", status: "available" },

    { id: "B1", status: "occupied" },
    { id: "B2", status: "available" },
    { id: "B3", status: "available" },
    { id: "B4", status: "reserved" },

    { id: "C1", status: "occupied" },
    { id: "C2", status: "available" },
    { id: "C3", status: "available" },
    { id: "C4", status: "reserved" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-6xl mx-auto px-4 py-12 my-16">

        <h1 className="text-4xl font-bold text-[#8B1E3F]">
          Parking Slots
        </h1>

        <p className="mt-3 text-gray-600">
          Choose and reserve your preferred parking spot.
        </p>

        <div className="grid gap-6 md:grid-cols-4 mt-10">

          {slots.map((slot) => (
            <div
              key={slot.id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm shadow-red-950"
            >
              <div className="flex justify-center mb-4">
                <Car size={40} className="text-[#8B1E3F]" />
              </div>

              <h2 className="text-xl font-semibold text-center text-black">
                {slot.id}
              </h2>

              <p className="text-center text-gray-600 mt-2">
                Parking Slot
              </p>

              <div className="text-center mt-4">
                <span
                  className={`px-3 py-1 rounded text-sm ${
                    slot.status === "available"
                      ? "bg-green-100 text-green-700"
                      : slot.status === "occupied"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {slot.status}
                </span>
              </div>

              <button
                className="w-full mt-5 bg-[#8B1E3F] text-white py-2 rounded hover:bg-[#4a0404]"
              >
                Reserve Spot
              </button>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
}
export default ParkingSlots;